import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const ConfigEditor = () => {
  const [config, setConfig] = useState(null);
  const [activeTab, setActiveTab] = useState('agent');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // Load config from agent.config.json
    fetch('../agent.config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Failed to load config:', err));
  }, []);

  const handleSave = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agent.config.json';
    link.click();
    setIsDirty(false);
  };

  const updateConfig = (path, value) => {
    const newConfig = { ...config };
    const keys = path.split('.');
    let current = newConfig;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    setIsDirty(true);
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agent Configuration Editor</h1>
              <p className="text-sm text-gray-500">Visual editor for agent.config.json</p>
            </div>
            <div className="flex gap-3">
              {isDirty && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Unsaved changes
                </span>
              )}
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                💾 Download Config
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['agent', 'quickActions', 'knowledgeBases', 'customization'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow rounded-lg">
          {activeTab === 'agent' && <AgentSettings config={config} updateConfig={updateConfig} />}
          {activeTab === 'quickActions' && <QuickActionsEditor config={config} updateConfig={updateConfig} />}
          {activeTab === 'knowledgeBases' && <KnowledgeBasesEditor config={config} updateConfig={updateConfig} />}
          {activeTab === 'customization' && <CustomizationEditor config={config} updateConfig={updateConfig} />}
        </div>
      </div>
    </div>
  );
};

const AgentSettings = ({ config, updateConfig }) => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Agent Identity</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Agent Name</label>
          <input
            type="text"
            value={config.agent.name}
            onChange={(e) => updateConfig('agent.name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Display Name</label>
          <input
            type="text"
            value={config.agent.displayName}
            onChange={(e) => updateConfig('agent.displayName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={config.agent.description}
            onChange={(e) => updateConfig('agent.description', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Welcome Message</label>
          <textarea
            value={config.agent.welcomeMessage}
            onChange={(e) => updateConfig('agent.welcomeMessage', e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon</label>
            <input
              type="text"
              value={config.agent.icon}
              onChange={(e) => updateConfig('agent.icon', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              placeholder="🤖"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="color"
              value={config.agent.color}
              onChange={(e) => updateConfig('agent.color', e.target.value)}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const QuickActionsEditor = ({ config, updateConfig }) => {
  const [editingIndex, setEditingIndex] = useState(null);

  const addAction = () => {
    const newAction = {
      id: `action-${Date.now()}`,
      label: 'New Action',
      icon: 'lightning',
      prompt: 'Enter prompt here',
      category: 'general',
    };
    updateConfig('quickActions', [...config.quickActions, newAction]);
  };

  const removeAction = (index) => {
    const newActions = config.quickActions.filter((_, i) => i !== index);
    updateConfig('quickActions', newActions);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        <button
          onClick={addAction}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          + Add Action
        </button>
      </div>

      <div className="space-y-4">
        {config.quickActions.map((action, index) => (
          <div key={action.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Label</label>
                <input
                  type="text"
                  value={action.label}
                  onChange={(e) => {
                    const newActions = [...config.quickActions];
                    newActions[index].label = e.target.value;
                    updateConfig('quickActions', newActions);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <select
                  value={action.icon}
                  onChange={(e) => {
                    const newActions = [...config.quickActions];
                    newActions[index].icon = e.target.value;
                    updateConfig('quickActions', newActions);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                >
                  <option value="lightning">⚡ Lightning</option>
                  <option value="target">🎯 Target</option>
                  <option value="dollar">💰 Dollar</option>
                  <option value="brush">🎨 Brush</option>
                  <option value="chart">📊 Chart</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Prompt</label>
                <textarea
                  value={action.prompt}
                  onChange={(e) => {
                    const newActions = [...config.quickActions];
                    newActions[index].prompt = e.target.value;
                    updateConfig('quickActions', newActions);
                  }}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={action.category}
                  onChange={(e) => {
                    const newActions = [...config.quickActions];
                    newActions[index].category = e.target.value;
                    updateConfig('quickActions', newActions);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => removeAction(index)}
                  className="w-full px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const KnowledgeBasesEditor = ({ config, updateConfig }) => (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Knowledge Bases</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Folder Path</label>
        <input
          type="text"
          value={config.knowledgeBases.folder}
          onChange={(e) => updateConfig('knowledgeBases.folder', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Files</label>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {config.knowledgeBases.files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
              <span className="text-sm text-gray-700">{file}</span>
              <button
                onClick={() => {
                  const newFiles = config.knowledgeBases.files.filter((_, i) => i !== index);
                  updateConfig('knowledgeBases.files', newFiles);
                }}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Add/remove files directly in the Agent_Knowledge_Bases folder, then update this list.
        </p>
      </div>
    </div>
  </div>
);

const CustomizationEditor = ({ config, updateConfig }) => (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Theme Colors</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Color</label>
          <input
            type="color"
            value={config.customization?.theme?.primaryColor || '#6366f1'}
            onChange={(e) => updateConfig('customization.theme.primaryColor', e.target.value)}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
          <input
            type="color"
            value={config.customization?.theme?.secondaryColor || '#8b5cf6'}
            onChange={(e) => updateConfig('customization.theme.secondaryColor', e.target.value)}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Accent Color</label>
          <input
            type="color"
            value={config.customization?.theme?.accentColor || '#ec4899'}
            onChange={(e) => updateConfig('customization.theme.accentColor', e.target.value)}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Deployment</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Platform</label>
          <select
            value={config.deployment?.platform || 'Amazon Bedrock Agent Foundry'}
            onChange={(e) => updateConfig('deployment.platform', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          >
            <option>Amazon Bedrock Agent Foundry</option>
            <option>Custom API</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

// Mount the app
const root = createRoot(document.getElementById('root'));
root.render(<ConfigEditor />);

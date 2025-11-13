import React, { useState, useRef, useEffect } from 'react';

// Simple SVG Icons
const SendIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const LightningIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const TargetIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DollarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BrushIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const ChartIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CampaignChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your Campaign Strategist & Planner. I can help you develop comprehensive campaign strategies across Meta, Pinterest, Google Ads, and TikTok.\n\nUse the quick action buttons below to get started, or ask me anything about campaign planning!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Quick action prompts
  const quickActions = [
    {
      id: 1,
      icon: LightningIcon,
      label: "New Campaign Plan",
      prompt: "Help me plan a new digital marketing campaign. I need assistance with platform selection, budget allocation, and strategy development.",
      color: "#1e40af"
    },
    {
      id: 2,
      icon: TargetIcon,
      label: "Audience Strategy",
      prompt: "I need help developing an audience targeting strategy. Can you guide me through persona development and platform-specific targeting approaches?",
      color: "#7c3aed"
    },
    {
      id: 3,
      icon: DollarIcon,
      label: "Budget Allocation",
      prompt: "I need recommendations for budget allocation across platforms and funnel stages. Can you help me optimize my marketing spend?",
      color: "#059669"
    },
    {
      id: 4,
      icon: BrushIcon,
      label: "Creative Direction",
      prompt: "I need creative direction for my campaign including messaging, visual themes, and ad format recommendations for different platforms.",
      color: "#ea580c"
    },
    {
      id: 5,
      icon: ChartIcon,
      label: "Performance Analysis",
      prompt: "Help me set up a performance measurement framework including KPIs, benchmarks, and reporting structure for my campaign.",
      color: "#0891b2"
    },
    {
      id: 6,
      icon: TargetIcon,
      label: "Platform Strategy",
      prompt: "Which advertising platforms should I use for my campaign? I need platform-specific recommendations and tactics.",
      color: "#db2777"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Agent Foundry API endpoint with agent ID
      const AGENT_ID = '019a555a-2d62-7d98-89d7-0ec6dfcb0fdf';
      const API_ENDPOINT = `https://1/ea89d2d2294a812e542b0f52db328da3248c0a5f/agents/${AGENT_ID}`;

      // Real API call to Agent Foundry
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversation_history: messages
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage = {
        role: 'assistant',
        content: data.response || data.message || data.content || 'I apologize, but I encountered an error. Please try again.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling API:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error connecting to the service. Please check your connection and try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>

      {/* Header */}
      <div style={{
        padding: '20px 24px',
        backgroundColor: '#1e40af',
        color: 'white',
        borderBottom: '1px solid #1e3a8a'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SparklesIcon className="w-8 h-8" />
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
              Campaign Strategist & Planner
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
              Your AI-powered marketing campaign assistant
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions - Only show when no messages yet or just welcome message */}
      {messages.length <= 1 && (
        <div style={{
          padding: '24px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Quick Actions
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px'
          }}>
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.prompt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    backgroundColor: 'white',
                    border: `2px solid ${action.color}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${action.color}10`;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    padding: '8px',
                    backgroundColor: `${action.color}15`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent style={{ color: action.color }} />
                  </div>
                  <span>{action.label}</span>
                  <LightningIcon style={{ marginLeft: 'auto', color: action.color, opacity: 0.5 }} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        backgroundColor: '#f9fafb'
      }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '16px'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: message.role === 'user' ? '#1e40af' : 'white',
              color: message.role === 'user' ? 'white' : '#374151',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6'
            }}>
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#1e40af',
                  animation: 'bounce 1.4s infinite ease-in-out'
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#1e40af',
                  animation: 'bounce 1.4s infinite ease-in-out 0.2s'
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#1e40af',
                  animation: 'bounce 1.4s infinite ease-in-out 0.4s'
                }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '20px 24px',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end'
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your campaign planning question here..."
            style={{
              flex: 1,
              padding: '14px 16px',
              borderRadius: '8px',
              border: '2px solid #e5e7eb',
              fontSize: '15px',
              resize: 'none',
              minHeight: '52px',
              maxHeight: '150px',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1e40af'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            rows={1}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            style={{
              padding: '14px 24px',
              backgroundColor: input.trim() && !isLoading ? '#1e40af' : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (input.trim() && !isLoading) {
                e.currentTarget.style.backgroundColor = '#1e3a8a';
              }
            }}
            onMouseLeave={(e) => {
              if (input.trim() && !isLoading) {
                e.currentTarget.style.backgroundColor = '#1e40af';
              }
            }}
          >
            <SendIcon />
            Send
          </button>
        </div>

        {/* Compact Quick Actions Below Input (when messages exist) */}
        {messages.length > 1 && (
          <div style={{
            marginTop: '12px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '12px',
              color: '#6b7280',
              alignSelf: 'center',
              marginRight: '4px'
            }}>
              Quick:
            </span>
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.prompt)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'white',
                  border: `1px solid ${action.color}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: action.color,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = action.color;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = action.color;
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CampaignChatInterface;

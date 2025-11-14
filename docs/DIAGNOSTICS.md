# Diagnostic Guide - Why Am I Getting Demo Responses?

**Date:** November 13, 2025
**Issue:** Wizard shows demo responses instead of live AI

---

## 🔍 Quick Diagnostics

### **Step 1: Open Browser Console**

1. Open the wizard: `open index-ai.html`
2. Press **F12** (or **Cmd+Option+I** on Mac)
3. Click **Console** tab
4. Look for these messages when page loads:

**What you should see:**
```
🔍 Checking API key status...
  claudeAPI exists: true
  claudeAPI.hasApiKey(): true
  claudeAPI.apiUrl: http://localhost:3333/chat
✅ Live AI mode ENABLED
```

**If you see:**
```
❌ Live AI mode DISABLED - using demo mode
```
Then something is wrong!

---

### **Step 2: Check Variables in Console**

In the browser console, type these commands:

```javascript
// Check if claudeAPI exists
claudeAPI

// Check if it has API key
claudeAPI.hasApiKey()

// Check URL
claudeAPI.apiUrl

// Check live AI flag
useLiveAI
```

**Expected results:**
```javascript
claudeAPI.hasApiKey()  // Should return: true
claudeAPI.apiUrl       // Should return: "http://localhost:3333/chat"
useLiveAI              // Should return: true
```

---

### **Step 3: Send Test Message**

In the wizard, send this message:
```
Test localhost connection
```

**In the console, you should see:**
```
📤 Sending message: Test localhost connection
  useLiveAI: true
  claudeAPI exists: true
✅ Using LIVE AI mode
```

**If you see:**
```
❌ Using DEMO mode (useLiveAI=false)
```
Then live mode is not enabled!

---

## 🔧 Common Fixes

### **Fix 1: Hard Refresh**

**The browser might be caching old JavaScript:**

1. **Press:** `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. **Or:** `Cmd + Option + E` to clear cache, then refresh

---

### **Fix 2: Clear Session Storage**

**In browser console, type:**
```javascript
sessionStorage.clear();
location.reload();
```

---

### **Fix 3: Verify Proxy is Running**

**In terminal, check:**
```bash
curl http://localhost:3333/health
```

**Should return:**
```json
{"status":"ok","message":"Claude Code proxy is running","connectedToClaude":true}
```

**If not running, start it:**
```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
node claude-code-proxy.cjs
```

---

### **Fix 4: Check File Load Order**

**In browser console:**
```javascript
// These should all exist
typeof claudeAPI     // Should be: "object"
typeof useLiveAI     // Should be: "boolean"
typeof sendToAI      // Should be: "function"
```

**If claudeAPI is undefined:**
- Check if `claude-api.js` is loading
- Look for errors in Console tab
- Verify the HTML file loads scripts in correct order

---

### **Fix 5: Force Live Mode**

**In browser console, manually enable it:**
```javascript
useLiveAI = true;
console.log('Live AI manually enabled:', useLiveAI);
```

Then try sending a message again.

---

## 📊 Debug Checklist

Run through this checklist:

- [ ] Proxy is running (`curl http://localhost:3333/health`)
- [ ] Browser console shows no errors
- [ ] `claudeAPI` object exists
- [ ] `claudeAPI.hasApiKey()` returns `true`
- [ ] `claudeAPI.apiUrl` is `http://localhost:3333/chat`
- [ ] `useLiveAI` is `true`
- [ ] Hard refresh done (`Cmd+Shift+R`)
- [ ] Session storage cleared
- [ ] Console shows "✅ Live AI mode ENABLED"

---

## 🎯 Expected Console Output

**When page loads:**
```
🔍 Checking API key status...
  claudeAPI exists: true
  claudeAPI.hasApiKey(): true
  claudeAPI.apiUrl: http://localhost:3333/chat
✅ Live AI mode ENABLED
```

**When sending message:**
```
📤 Sending message: I want to build a campaign agent
  useLiveAI: true
  claudeAPI exists: true
✅ Using LIVE AI mode
```

**When receiving response:**
```
Response from localhost proxy
```

---

## 🆘 Still Not Working?

**Run this complete diagnostic in console:**

```javascript
console.log('=== DIAGNOSTIC REPORT ===');
console.log('claudeAPI exists:', typeof claudeAPI !== 'undefined');
if (typeof claudeAPI !== 'undefined') {
    console.log('claudeAPI.apiUrl:', claudeAPI.apiUrl);
    console.log('claudeAPI.hasApiKey():', claudeAPI.hasApiKey());
}
console.log('useLiveAI:', useLiveAI);
console.log('=== END REPORT ===');

// Test connection
fetch('http://localhost:3333/health')
    .then(r => r.json())
    .then(d => console.log('Proxy health:', d))
    .catch(e => console.error('Proxy error:', e));
```

**Copy the output and let me know what you see!**

---

## ✅ Success Indicators

**You'll know it's working when:**

1. Console shows: `✅ Live AI mode ENABLED`
2. Status indicator is 🟢 (green)
3. Chat shows: "🟢 Live AI Connected!"
4. Responses are NOT generic templates
5. Console shows: `✅ Using LIVE AI mode` when sending messages

---

**Version:** 1.0.0
**Date:** November 13, 2025

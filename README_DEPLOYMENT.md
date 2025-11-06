# Campaign Strategist Chat Interface - Deployment Guide

## 🚀 Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will open at http://localhost:3000

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

#### Method A: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

#### Method B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository or upload the folder
4. Vercel will auto-detect Vite configuration
5. Click "Deploy"

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/repository-name/',
     // ... rest of config
   });
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## ⚙️ Configuration

### API Endpoint

The API endpoint is configured in `Campaign_Chat_Interface.jsx`:

```javascript
const response = await fetch('https://1/ea89d2d2294a812e542b0f52db328da3248c0a5f', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: messageText,
    conversation_history: messages
  })
});
```

**To change the API endpoint:**
1. Open `Campaign_Chat_Interface.jsx`
2. Update the fetch URL on line 121
3. Adjust the request body format if needed

### Environment Variables (Optional)

For better security, you can use environment variables:

1. **Create `.env` file:**
   ```
   VITE_API_ENDPOINT=https://your-api-endpoint.com
   ```

2. **Update the code:**
   ```javascript
   const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
     // ...
   });
   ```

## 🔧 Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. **Backend Solution:** Add CORS headers to your API:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

2. **Vercel Proxy (if using Vercel):** The `vercel.json` file includes headers configuration

### Build Errors

If build fails:
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### API Response Format

The component expects this response format:
```json
{
  "response": "AI assistant response text here"
}
```

Alternative formats supported:
```json
{
  "message": "AI assistant response text here"
}
```

If your API uses a different format, update line 140 in `Campaign_Chat_Interface.jsx`:
```javascript
const assistantMessage = {
  role: 'assistant',
  content: data.your_field_name || 'Error message'
};
```

## 📁 Project Structure

```
Campaign_Strategist_Planner_Agent/
├── Campaign_Chat_Interface.jsx    # Main chat component
├── src/
│   └── main.jsx                   # React entry point
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── vercel.json                    # Vercel deployment config
├── .gitignore                     # Git ignore rules
└── README_DEPLOYMENT.md           # This file
```

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Quick action buttons work
- [ ] Messages send successfully
- [ ] API responses display properly
- [ ] Error handling works
- [ ] Mobile responsive design
- [ ] Loading states appear
- [ ] Auto-scroll functions
- [ ] Keyboard shortcuts work (Enter to send)

## 🌐 Custom Domain (Optional)

### Vercel
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to "Domain Settings" in your site
2. Add custom domain
3. Follow DNS configuration steps

## 📊 Monitoring

After deployment, monitor:
- API call success rate
- Response times
- Error logs
- User engagement metrics

## 🔐 Security Considerations

1. **API Keys:** Never commit API keys to Git
2. **Environment Variables:** Use `.env` for sensitive data
3. **HTTPS:** Ensure deployment uses HTTPS
4. **CORS:** Configure properly to prevent unauthorized access
5. **Rate Limiting:** Consider implementing on the backend

## 🆘 Support

For issues:
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check network tab for failed requests
4. Review Vercel/Netlify deployment logs

## 📝 License

MIT License - See project root for details

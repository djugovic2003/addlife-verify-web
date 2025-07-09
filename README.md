# AddLife Email Verification Web App

A simple React web app for email verification that works with your AddLife backend.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Update Backend URL
Before deploying, update the backend URL in `src/VerifyEmail.js`:
- Replace `https://YOUR-BACKEND-URL` with your actual backend URL
- Example: `https://your-backend.herokuapp.com` or `https://api.addlife.com`

### 3. Test Locally
```bash
npm start
```
Visit `http://localhost:3000/verify-email?token=test` to test the verification page.

### 4. Deploy to Railway (Recommended)

Since you're already using Railway for your backend, this is the easiest option:

#### Option A: Deploy via Railway CLI
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

#### Option B: Deploy via Railway Dashboard
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect it's a React app and deploy it

### 5. Alternative: Deploy to Vercel

#### Option A: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

#### Option B: Deploy via Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Deploy automatically

### 6. Update Your Backend
After deployment, you'll get a URL like:
- Railway: `https://addlife-verify-web-production.up.railway.app`
- Vercel: `https://addlife-verify-web.vercel.app`

Update your backend's `.env` file:
```
VERIFICATION_WEB_URL=https://your-deployed-url.com
```

### 7. Update Email Template
In your backend, update the verification email template to use the new URL:
```
https://your-deployed-url.com/verify-email?token=${token}
```

## How It Works

1. User receives verification email with link
2. User clicks link → goes to your verification web app
3. Web app reads token from URL
4. Web app calls your backend API: `/api/users/verify-email?token=${token}`
5. Shows success/error message to user

## Files Structure
- `src/VerifyEmail.js` - Main verification component
- `src/App.js` - App wrapper
- `public/index.html` - HTML template
- `package.json` - Dependencies and scripts
- `railway.json` - Railway deployment configuration

## Customization
- Update the styling in `VerifyEmail.js`
- Change the title in `public/index.html`
- Modify success/error messages as needed

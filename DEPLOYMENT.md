# 🚀 Deployment Guide

## Deploy to GitHub Pages

### 1. **Prepare Repository**
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/quant-roadmap.git
git branch -M main
git push -u origin main
```

### 2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

### 3. **Update package.json**
Add these scripts to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/quant-roadmap",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 4. **Deploy**
```bash
npm run deploy
```

## Deploy to Netlify

### 1. **Build the project**
```bash
npm run build
```

### 2. **Deploy to Netlify**
- Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
- Or connect GitHub repository for automatic deployments

### 3. **Custom Domain (Optional)**
- Add your custom domain in Netlify settings
- Update DNS records

## Deploy to Vercel

### 1. **Install Vercel CLI**
```bash
npm install -g vercel
```

### 2. **Deploy**
```bash
vercel --prod
```

### 3. **Or use GitHub Integration**
- Connect repository to Vercel
- Automatic deployments on push

## Environment Variables

### Production Settings
Create `.env.production` file:
```env
VITE_APP_TITLE=Quant Researcher Learning Roadmap
VITE_APP_VERSION=1.0.0
```

## Build Optimization

### 1. **Vite Configuration**
Update `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/quant-roadmap/', // For GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})
```

### 2. **Performance Optimization**
- Minimize bundle size
- Optimize images
- Use CDN for static assets
- Enable compression

## Domain Configuration

### Custom Domain Setup
1. Add `CNAME` file to `public` folder with your domain
2. Configure DNS records
3. Enable HTTPS

### Subdomain Setup
- Create subdomain DNS record
- Point to deployment URL
- Update base URL in config

## Monitoring & Analytics

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for user sessions
- Hotjar for user behavior

## SEO Optimization

### Meta Tags
Update `index.html`:
```html
<meta name="description" content="2-month learning roadmap for aspiring quantitative researchers">
<meta name="keywords" content="quantitative finance, learning roadmap, quant researcher">
<meta property="og:title" content="Quant Researcher Learning Roadmap">
<meta property="og:description" content="Comprehensive 2-month learning path for quant finance">
<meta property="og:image" content="https://yourdomain.com/og-image.png">
```

### Sitemap
Generate sitemap.xml for better SEO

## Security Considerations

### HTTPS
- Always use HTTPS in production
- Configure security headers
- Validate all user inputs

### Data Privacy
- No personal data collection
- Local storage only
- Privacy policy if needed

## Backup & Recovery

### Regular Backups
- Export user data regularly
- Backup deployment files
- Version control all changes

### Recovery Plan
- Document rollback procedures
- Test backup restoration
- Monitor deployment health

---

## Quick Deploy Commands

```bash
# GitHub Pages
npm run deploy

# Netlify
npm run build && netlify deploy --prod --dir=dist

# Vercel
vercel --prod

# Local testing
npm run preview
```

Choose the deployment method that best fits your needs and technical requirements!

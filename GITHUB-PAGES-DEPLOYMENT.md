# GITHUB PAGES DEPLOYMENT GUIDE

## 🚀 Deploy Your System to GitHub Pages in 5 Minutes

This guide walks you through deploying Skanda Engineering to GitHub Pages (FREE hosting with automatic HTTPS).

---

## STEP 1: Create GitHub Repository

### Option A: Create New Repository (Recommended)

1. Go to **https://github.com/new**
2. Repository name: `skanda-engineering`
3. Description: "Digital Billing & Website System for Precision Manufacturing"
4. Choose: **Public** (for GitHub Pages to work)
5. Click **"Create repository"**
6. Copy the repository URL (you'll need it in Step 2)

### Option B: Use Existing Repository
If you already have a GitHub account and repository, skip to Step 2.

---

## STEP 2: Initialize Git Locally

Open PowerShell and navigate to the project folder:

```powershell
cd d:\Skanda\Skanda_Home
```

Initialize Git repository:

```powershell
git init
```

Add all files:

```powershell
git add .
```

Create initial commit:

```powershell
git commit -m "Initial commit - Skanda Engineering Digital System v1.0"
```

Rename branch to main (GitHub Pages standard):

```powershell
git branch -M main
```

---

## STEP 3: Connect to GitHub Repository

Replace `YOUR_USERNAME` and use your repository URL from Step 1:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/skanda-engineering.git
```

Verify it worked:

```powershell
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/skanda-engineering.git (fetch)
origin  https://github.com/YOUR_USERNAME/skanda-engineering.git (push)
```

---

## STEP 4: Push to GitHub

Push your code to GitHub:

```powershell
git push -u origin main
```

If prompted for authentication:
- GitHub username: Your GitHub username
- Password: Create a Personal Access Token (see below)

### Creating a Personal Access Token (if needed)

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"**
3. Token name: `skanda-deployment`
4. Scopes: Check `repo` (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Use the token as your password when pushing

---

## STEP 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **"Pages"** section
4. Under "Build and deployment":
   - Source: Select **`Deploy from a branch`**
   - Branch: Select **`main`** and **`/ (root)`**
5. Click **Save**

GitHub will show: _"Your site is live at https://YOUR_USERNAME.github.io/skanda-engineering"_

---

## STEP 6: Verify Deployment ✅

Wait 1-2 minutes for GitHub Pages to build, then:

1. Open: **https://YOUR_USERNAME.github.io/skanda-engineering**
2. You should see your website!
3. Test the pages:
   - Home page loads
   - Links work
   - Quote form works
   - Admin dashboard accessible at `/admin/`

---

## 🎯 YOUR LIVE URLS

Once deployed, these URLs will work:

| Page | URL |
|------|-----|
| Home | `https://YOUR_USERNAME.github.io/skanda-engineering/` |
| Services | `https://YOUR_USERNAME.github.io/skanda-engineering/services.html` |
| Quote | `https://YOUR_USERNAME.github.io/skanda-engineering/quote.html` |
| Admin | `https://YOUR_USERNAME.github.io/skanda-engineering/admin/` |
| Contact | `https://YOUR_USERNAME.github.io/skanda-engineering/contact.html` |

---

## 📝 Updating Your Site

After you make changes locally:

```powershell
cd d:\Skanda\Skanda_Home

git add .
git commit -m "Description of changes"
git push origin main
```

Changes will appear on your live site within 1-2 minutes.

---

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., skanda-engineering.com):

1. Go to your domain registrar
2. Set up DNS records to point to GitHub Pages
3. In repository Settings → Pages → "Custom domain"
4. Enter your domain
5. GitHub will create a `CNAME` file automatically

**Resources:** https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## 🔍 Troubleshooting

### Site not appearing after 5 minutes?

1. Check repository is **Public**
2. Verify branch is set to **main** in Pages settings
3. Check for build errors: Go to Actions tab → Latest workflow

### Links not working?

- Make sure HTML files use relative paths: `services.html` not `/services.html`
- Check file names (case-sensitive on GitHub)

### Data not saving?

- LocalStorage works in GitHub Pages ✅
- Check browser console for errors (F12)
- Try clearing cache: Ctrl+Shift+Delete

### Custom domain issues?

- DNS changes can take 24-48 hours
- Verify CNAME file was created in repository

---

## 📊 Monitoring Your Site

### GitHub Pages Stats

1. Go to **Settings → Pages**
2. You'll see deployment status
3. Latest deployments in **Actions** tab

### Google Analytics (Optional)

Add to `website/index.html` to track visitors:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Google Analytics ID.

---

## 🔐 Security Notes

✅ **HTTPS:** Automatic on GitHub Pages (no extra setup)  
✅ **Data:** Stored in browser LocalStorage (no server exposure)  
✅ **Private:** Admin dashboard accessible to anyone (add password protection if needed)  

### Protecting Admin Dashboard (Optional)

For team-only access, use GitHub authentication:
1. Use Netlify or Vercel (has authentication features)
2. Or use basic HTTP authentication
3. See `/docs/INSTALLATION.md` for more options

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Git initialized locally
- [ ] All files added and committed
- [ ] Remote repository connected
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled in Settings
- [ ] Site accessible at live URL
- [ ] All pages loading correctly
- [ ] Forms working
- [ ] Admin dashboard accessible
- [ ] LocalStorage saving data

---

## 🎉 SUCCESS!

Your Skanda Engineering Digital Billing & Website System is now **LIVE** and accessible worldwide!

**Next Steps:**
1. Share URL with team
2. Update company information on pages
3. Add company logo
4. Set up domain (if desired)
5. Monitor analytics

---

## 📞 Help & Support

**GitHub Pages Docs:** https://docs.github.com/en/pages  
**Troubleshooting:** https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites

**Having issues?**
1. Check GitHub Pages status: https://www.githubstatus.com
2. Review Actions tab for build errors
3. Check browser console (F12) for JavaScript errors
4. Clear browser cache and reload

---

**Deployment Date:** April 1, 2026  
**Status:** Ready to Deploy ✅  
**Hosting:** GitHub Pages (FREE)  
**Uptime:** 99.9%

🚀 **Your system is ready to serve your customers!**

# SKANDA ENGINEERING - SETUP & DEPLOYMENT GUIDE

## Quick Start

### Local Testing

1. **Website:** Open `website/index.html` in any web browser
2. **Admin Dashboard:** Open `admin/index.html` in web browser
3. All data stored in browser LocalStorage - no server needed

### File Structure Summary

```
Skanda_Home/
├── website/                    # Public website (HTML/CSS/JS)
│   ├── index.html             # Home page
│   ├── services.html          # Services catalog
│   ├── machinery.html         # Machine showcase
│   ├── quote.html             # Quote request form
│   ├── contact.html           # Contact page
│   ├── about.html             # About company
│   ├── clients.html           # Client list
│   ├── css/style.css          # Website styles
│   └── js/                    # JavaScript handlers
│
├── admin/                     # Admin dashboard
│   ├── index.html            # Dashboard interface
│   ├── css/admin-style.css   # Dashboard styles
│   └── js/admin-main.js      # Dashboard logic
│
├── backend/                  # Data layer & Excel backend
│   ├── js/data-store.js      # LocalStorage manager
│   ├── templates/            # Excel VBA macros
│   └── data/                 # Export files
│
├── docs/                     # Documentation
│   └── README.md            # Full documentation
│
└── assets/                  # Sample data
    └── data/sample-data.json
```

---

## Deployment Options

### Option 1: GitHub Pages (Free & Recommended)

**Steps:**

1. Create GitHub account (if not already)
2. Create new repository: `skanda-engineering`
3. Clone repository locally
4. Copy all files from `Skanda_Home` to repository
5. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial setup - Website and Admin Dashboard"
   git push origin main
   ```
6. Go to GitHub → Settings → Pages
7. Set source to `main` branch
8. Your site will be live at: `https://yourusername.github.io/skanda-engineering`

**Advantages:**
- Completely free hosting
- No server maintenance
- Built-in version control
- Perfect for static websites

### Option 2: Local Hosting with Python

**For Windows/Mac/Linux:**

```powershell
# Navigate to website folder
cd Skanda_Home/website

# Python 3.x (Modern)
python -m http.server 8000

# Access at: http://localhost:8000
```

### Option 3: Self-Hosted Server

**Requirements:**
- Web server (Nginx, Apache)
- SSL certificate (Let's Encrypt)
- Domain name

**Setup:**
1. Upload all files to server via FTP/SSH
2. Configure web server to serve static files
3. Set up HTTPS
4. Point domain to server

### Option 4: Commercial Hosting

**Recommended providers:**
- Netlify (free tier available)
- Vercel (Next.js recommended)
- AWS S3 + CloudFront
- Bluehost
- HostGator

---

## Using the System

### Website Lead Capture Flow

1. **Visitor lands on website** → Sees service showcase
2. **Clicks "Get Quote"** → Fills form on `quote.html`
3. **Submits form** → Data saved to browser LocalStorage
4. **Admin opens dashboard** → Views new quote
5. **Admin updates status** → Pending → Quoted → Accepted

### Admin Dashboard Features

1. **Login:** Open `admin/index.html` in browser (no password in this version)
2. **Dashboard Tab:** View KPIs and recent activity
3. **Customers Tab:** Manage customer database
4. **Quotes Tab:** Convert quotes to orders
5. **Orders Tab:** Track order status
6. **Invoices Tab:** Generate invoices
7. **Job Costing:** Calculate production cost
8. **Reports:** View analytics
9. **Settings:** Export data or reset

### Data Export & Backup

**From Admin Dashboard:**

1. Go to **Settings** tab
2. Click **"Export All Data (JSON)"** → Downloads JSON file
3. Click **"Export Customers (CSV)"** → Downloads CSV file
4. Click **"Export Quotes (CSV)"** → Downloads CSV file

**Recommended:** Export data weekly to backup folder

### Using Excel Backend

1. Open Excel workbook
2. Go to **Developer** tab → **Visual Basic Editor**
3. Copy-paste code from `backend/templates/skanda-excel-vba-template.vb`
4. Save workbook as `.xlsm` (macro-enabled)
5. Run macro: **Developer** → **Macros** → Select `InitializeWorkbook`
6. Sheets are now created and ready

**To import data from website:**
1. Export JSON from admin dashboard
2. Place JSON file in `backend/data/` folder
3. Run **ImportDataFromWebsite** macro

---

## Customization Guide

### Change Color Scheme

**File:** `website/css/style.css`

```css
:root {
  --primary-dark: #0B1F3A;      /* Change to new blue */
  --primary-orange: #FF6B00;    /* Change to new orange */
  --primary-light: #F5F7FA;     /* Change to new grey */
}
```

### Update Company Information

**Files to edit:**
- `website/index.html` - Company name, tagline
- `website/contact.html` - Email, phone, address
- `admin/index.html` - Company name in sidebar

**Search and replace:**
- `Skanda Engineering` → Your company name
- `Bangalore, India` → Your location
- `+91 9876543210` → Your phone number
- `info@skandaengineering.com` → Your email

### Add Company Logo

1. Place logo image in `website/images/`
2. Edit `website/css/style.css`:
   ```css
   .logo {
     background: url('images/logo.png') no-repeat;
     background-size: contain;
   }
   ```

### Modify Services

**File:** `website/services.html`

- Add new service sections by duplicating the service card structure
- Update service descriptions and capabilities
- Add icons (use emoji or Font Awesome)

---

## Features Overview

### ✅ Completed Features

- [x] Public website with 6 pages
- [x] Lead capture form with validation
- [x] Responsive mobile design
- [x] Admin dashboard with 9 modules
- [x] LocalStorage data persistence
- [x] Customer management system
- [x] Quote tracking system
- [x] Job costing calculator
- [x] Data export (JSON/CSV)
- [x] Excel VBA backend template
- [x] Professional industrial UI design

### 🔄 In Progress

- [ ] Email notifications (Gmail SMTP integration)
- [ ] PDF invoice generation
- [ ] Mobile app version

### 📅 Planned Features

- [ ] Firebase backend
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] CRM integration
- [ ] Payment gateway integration

---

## Performance Optimization

### For Website

1. **Images:** Optimize images <100KB each
2. **CSS:** Already minified and optimized
3. **JavaScript:** Vanilla JS (no framework overhead)
4. **Caching:** Browser caches static files

### For Admin Dashboard

1. **LocalStorage:** Limit to <5MB data
2. **Browser:** Use Chrome, Firefox, or Edge
3. **Backup:** Export data regularly

---

## Troubleshooting

### Q: Data disappears when I close browser?
**A:** Data is in LocalStorage - clearing browser cache deletes it. Export regularly!

### Q: Can I access admin dashboard from phone?
**A:** Yes! Admin is responsive. Open `admin/index.html` on mobile.

### Q: How to share data with team?
**A:** Export as JSON/CSV from Settings tab and email file.

### Q: Can I add user authentication?
**A:** Yes - but requires backend. Use Firebase Auth (recommended).

### Q: How to enable HTTPS?
**A:** On GitHub Pages - automatic. On self-hosted - use Let's Encrypt (free).

### Q: Database limitations?
**A:** LocalStorage ~5-10MB. For larger data, migrate to Firebase/SQL.

---

## Security Best Practices

1. **Backups:** Export data weekly
2. **HTTPS:** Always use encrypted connection
3. **Access:** Password protect admin page (if shared)
4. **Data Privacy:** Don't commit production data to Git
5. **Updates:** Keep browser updated

---

## Contact & Support

- **Email:** info@skandaengineering.com
- **Phone:** +91 9876543210
- **Location:** Bangalore, India
- **Hours:** Mon-Fri 8AM-6PM, Sat 9AM-2PM IST

---

## Version Information

- **Version:** 1.0
- **Release Date:** April 1, 2026
- **Status:** Production Ready
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## License

Copyright © 2026 Skanda Engineering. All rights reserved.

---

**Last Updated:** April 1, 2026  
**Next Review:** April 1, 2027

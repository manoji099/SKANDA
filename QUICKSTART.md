# QUICK START GUIDE

## 30-Second Setup

### 1. Test Website Locally (RIGHT NOW!)

**Windows PowerShell:**
```powershell
cd "d:\Skanda\Skanda_Home\website"
python -m http.server 8000
```

Then open: **http://localhost:8000**

### 2. Test Admin Dashboard

Open in browser: **file:///d:/Skanda/Skanda_Home/admin/index.html**

(Or simply drag `admin/index.html` into browser)

### 3. Submit a Test Quote

1. Go to Quote page (http://localhost:8000/quote.html)
2. Fill out form with test data
3. Submit
4. Go to Admin Dashboard → Quotes
5. ✅ You'll see the quote!

---

## File Structure at a Glance

```
Skanda_Home/
├── website/          ← Public website (7 pages)
├── admin/            ← Admin dashboard (9 modules)
├── backend/          ← Data layer + Excel
├── docs/             ← Documentation
└── assets/           ← Sample data
```

---

## What Each Page Does

| Page | Purpose | URL |
|------|---------|-----|
| index.html | Home page | / |
| services.html | Service details | /services.html |
| machinery.html | Equipment showcase | /machinery.html |
| quote.html | **Lead capture** | /quote.html |
| contact.html | Contact form | /contact.html |
| about.html | Company info | /about.html |
| clients.html | Client testimonials | /clients.html |

---

## Admin Dashboard Modules

1. **Dashboard** - View KPIs
2. **Customers** - Manage customers
3. **Quotes** - Track quotes
4. **Orders** - Create orders
5. **Invoices** - Generate invoices
6. **Challans** - Delivery tracking
7. **Job Costing** - Cost calculation
8. **Reports** - Analytics
9. **Settings** - Export data

---

## Key Data Operations

### Save Quote from Website
```javascript
dataStore.saveQuote({
  fullName: "John Doe",
  company: "ABC Manufacturing",
  email: "john@abc.com",
  serviceType: "cnc"
  // ... more fields
});
```

### Get All Quotes
```javascript
const allQuotes = dataStore.getQuotes();
```

### Export Data
```javascript
// From admin: Settings → Export All Data
// Downloads JSON file with all quotes, customers, orders
```

---

## Customization Checklist

- [ ] Change company name (search "Skanda Engineering" in files)
- [ ] Update phone/email (in website files)
- [ ] Change colors in `website/css/style.css` (lines 5-10)
- [ ] Add company logo in `website/images/`
- [ ] Update service descriptions in `services.html`
- [ ] Update machinery details in `machinery.html`

---

## Deployment to GitHub Pages

```bash
# 1. Create GitHub repo

# 2. Go to repo folder
cd d:\Skanda\Skanda_Home

# 3. Initialize Git
git init

# 4. Add files
git add .
git commit -m "Initial commit - Skanda Engineering system"
git branch -M main

# 5. Add remote (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR_USERNAME/skanda-engineering.git

# 6. Push
git push -u origin main

# 7. Enable Pages in GitHub Settings
# Settings → Pages → Source: main branch
# 8. Your site is live! 🎉
```

---

## Troubleshooting

**Q: Admin dashboard doesn't load?**  
A: Clear browser cache (Ctrl+Shift+Delete), reload

**Q: Data not saving?**  
A: Check browser console (F12). Must allow LocalStorage

**Q: Website images not showing?**  
A: Place images in `website/images/` folder

**Q: Excel macros won't run?**  
A: Enable macros in Excel → Options → Trust Center

---

## Key Features

✅ **Website**
- 7 professional pages
- Mobile responsive
- Lead capture form
- Service showcase

✅ **Admin**
- 9 management modules
- Real-time dashboards
- Data export (CSV/JSON)
- Job costing calculator

✅ **Data**
- LocalStorage persistence
- No server needed
- Excel VBA integration
- Instant export

---

## Contact & Support

- **Documentation:** See `/docs/` folder
- **Sample Data:** `/assets/data/sample-data.json`
- **Excel Template:** `/backend/templates/`
- **Dev Guide:** `.github/copilot-instructions.md`

---

**Status:** ✅ Ready to Deploy  
**Version:** 1.0  
**Last Updated:** April 1, 2026

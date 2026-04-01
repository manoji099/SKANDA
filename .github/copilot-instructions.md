# SKANDA ENGINEERING - COPILOT INSTRUCTIONS

## Project Overview

**Skanda Engineering Digital Billing & Website System**

A complete web-based manufacturing management platform for precision manufacturing services (CNC, VMC, Fabrication, VTL, Laser Cutting).

- **Type:** Static Website + Admin Dashboard + Excel Backend
- **Technologies:** HTML5, CSS3, JavaScript (Vanilla), LocalStorage, Excel VBA
- **Architecture:** Client-side data persistence with no server required
- **Deployment:** GitHub Pages, Local Hosting, or Self-Hosted

## System Architecture

```
Public Website (Lead Generation)
    ↓ (Form Submission)
LocalStorage (Browser Client-Side)
    ↓ (Data Access)
Admin Dashboard (Management)
    ↓ (Export)
Excel Backend (Reporting & Analysis)
```

## Project Structure

### Core Folders

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `website/` | Public-facing website | index.html, services.html, quote.html, css/style.css |
| `admin/` | Admin dashboard | index.html, admin-style.css, admin-main.js |
| `backend/` | Data layer & Excel backend | data-store.js, skanda-excel-vba-template.vb |
| `docs/` | Documentation | README.md, INSTALLATION.md |
| `assets/` | Sample data | sample-data.json |

## Key Technologies & Patterns

### Frontend Stack
- **HTML5:** Semantic markup
- **CSS3:** Mobile-responsive (Flexbox/Grid)
- **JavaScript (ES6+):** Vanilla JS (no frameworks)
- **LocalStorage API:** Client-side data persistence
- **Colors:** Blue #0B1F3A, Orange #FF6B00, Grey #F5F7FA

### Data Management
- **DataStore Class:** Centralized data management (`backend/js/data-store.js`)
  - `saveQuote()`, `getQuotes()`, `updateQuoteStatus()`
  - `saveCustomer()`, `getCustomers()`, `getCustomerByEmail()`
  - `saveOrder()`, `getOrders()`
  - `exportQuotesAsCSV()`, `exportCustomersAsCSV()`, `exportAllDataAsJSON()`

### LocalStorage Keys
- `skanda_quotes` - Quote requests
- `skanda_contacts` - Contact submissions
- `skanda_customers` - Customer database
- `skanda_orders` - Orders

## Common Development Tasks

### Adding a New Website Page

1. Create new HTML file in `website/` folder
2. Include header navigation and footer from existing pages
3. Link to `css/style.css` and `js/main.js`
4. Update navigation links in all pages

### Modifying Admin Dashboard

1. Edit `admin/index.html` for new pages/sections
2. Update `admin/js/admin-main.js` for logic
3. Add styles to `admin/css/admin-style.css`
4. Use DataStore class for data operations

### Exporting/Importing Data

```javascript
// Get data
const dataStore = new DataStore();
const quotes = dataStore.getQuotes();

// Export
dataStore.exportQuotesAsCSV();
dataStore.exportAllDataAsJSON();

// Save
dataStore.saveQuote(quoteData);
dataStore.saveCustomer(customerData);
```

### Excel Integration

1. Copy VBA code from `backend/templates/skanda-excel-vba-template.vb`
2. Paste into Excel VBA editor (Alt+F11)
3. Run `InitializeWorkbook()` macro
4. Import JSON exports using `ImportDataFromWebsite()` macro

## Customization Points

### Color Scheme
- **File:** `website/css/style.css` (lines 5-10)
- **Variables:** `--primary-dark`, `--primary-orange`, `--primary-light`

### Company Information
- **Files:** `website/index.html`, `website/contact.html`, `admin/index.html`
- **Search:** "Skanda Engineering", "Bangalore", "+91 9876543210"

### Services & Machinery
- **Website Services:** `website/services.html` (fully customizable)
- **Machinery Page:** `website/machinery.html` (add/remove equipment)

### Admin Modules
- **Quote Status Values:** pending, quoted, accepted, rejected
- **Order Status Values:** pending, in_progress, ready, completed
- **Industry Values:** automotive, aerospace, machinery, electronics, medical, defense

## Deployment Instructions

### GitHub Pages (Recommended)

```bash
# Initialize git and push to GitHub
git add .
git commit -m "Initial Skanda Engineering setup"
git push origin main

# Enable Pages in GitHub Settings
# Site: https://username.github.io/skanda-engineering
```

### Local Testing

```bash
# Option 1: Python
cd website/
python -m http.server 8000

# Option 2: VS Code Live Server
# Right-click index.html → Open with Live Server
```

### Self-Hosted

1. Upload all files to web server via FTP/SSH
2. Configure web server for static file serving
3. Set up HTTPS with SSL certificate
4. Point domain DNS to server

## Testing Checklist

- [ ] Website loads on desktop, tablet, mobile
- [ ] All navigation links work
- [ ] Quote form submission saves to LocalStorage
- [ ] Admin dashboard loads without errors
- [ ] Data exports as CSV/JSON successfully
- [ ] Responsive design (test at 320px, 768px, 1200px widths)
- [ ] Contact form saves data
- [ ] No console errors in browser DevTools

## Future Enhancement Ideas

1. **Phase 2:** Firebase backend for cloud sync
2. **Phase 3:** User authentication (Firebase Auth)
3. **Phase 4:** Payment integration (Razorpay/PayPal)
4. **Phase 5:** Mobile app (React Native)
5. **Phase 6:** Full ERP system

## Performance Tips

- Keep exported JSON files <5MB
- Limit LocalStorage usage to essential data
- Clear old quotes/contacts periodically
- Cache images in browser
- Minify CSS/JS if needed

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (not supported)

## Support Resources

- **Documentation:** `/docs/README.md`, `/docs/INSTALLATION.md`
- **Sample Data:** `/assets/data/sample-data.json`
- **VBA Template:** `/backend/templates/skanda-excel-vba-template.vb`

## File Editing Guidelines

### When Editing HTML Pages
- Keep semantic structure (header, nav, section, footer)
- Maintain consistent class names for styling
- Update navigation in all pages simultaneously

### When Editing CSS
- Variables are at top of file (lines 1-10)
- Use responsive grid: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
- Mobile breakpoint: `@media (max-width: 768px)`

### When Editing JavaScript
- Use DataStore class for data operations
- Always validate form inputs before saving
- Include try-catch for error handling
- Export functions as `window.functionName` for global access

## Database Schema Reference

### Quote Object
```javascript
{
  id: "QUOTE_timestamp",
  fullName, company, email, phone,
  industry, serviceType, quantity,
  projectDescription, timeline, budget,
  status: "pending|quoted|accepted|rejected",
  createdAt, updatedAt
}
```

### Customer Object
```javascript
{
  id: "CUST_timestamp",
  fullName, company, email, phone,
  industry, source,
  createdAt, updatedAt
}
```

### Order Object
```javascript
{
  id: "ORD_timestamp",
  quoteId, customerId, customerName,
  serviceType, quantity, unitPrice, amount,
  status: "pending|in_progress|ready|completed",
  dueDate, createdAt
}
```

## Emergency Recovery

**Lost Data?**
1. Check browser LocalStorage: DevTools → Application → LocalStorage
2. Check if any exports were downloaded previously
3. Use sample-data.json as reference

**Reset System?**
1. Admin Dashboard → Settings → "Reset All Data"
2. All LocalStorage data will be cleared
3. Ready to start fresh

---

**Last Updated:** April 1, 2026  
**Project Status:** Production Ready v1.0

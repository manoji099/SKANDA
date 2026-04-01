# SKANDA ENGINEERING - DIGITAL BILLING & WEBSITE SYSTEM

## Project Overview

Complete digital platform for **Skanda Engineering** - a precision manufacturing company specializing in:
- CNC Machining
- VMC Operations  
- Sheet Fabrication
- VTL Services
- Laser Cutting

**System Architecture:** Website (HTML/CSS/JS) → LocalStorage → Admin Dashboard → Excel Backend

---

## System Components

### 1. PUBLIC WEBSITE (`/website`)

**Purpose:** Lead generation, service showcase, and quote capture

**Pages:**
- `index.html` - Home page with service overview
- `services.html` - Detailed service descriptions
- `machinery.html` - Machine fleet showcase
- `quote.html` - Quote request form (lead capture)
- `contact.html` - Contact information and inquiry form
- `about.html` - Company information
- `clients.html` - Client testimonials

**Technologies:**
- HTML5
- CSS3 (Responsive, Mobile-first)
- Vanilla JavaScript
- LocalStorage for data persistence

**Styling:**
- Primary Color: Industrial Blue `#0B1F3A`
- Accent Color: Orange `#FF6B00`
- Background: Light Grey `#F5F7FA`

**Key Features:**
- Responsive design (Desktop, Tablet, Mobile)
- Fast loading (static files on GitHub Pages)
- SEO-friendly structure
- Strong CTA buttons for quote requests
- Service showcase with machinery details

---

### 2. ADMIN DASHBOARD (`/admin`)

**Purpose:** Manage customers, quotes, orders, invoices, and reporting

**Modules:**
- **Dashboard** - Overview with KPIs
  - Total Customers
  - Pending Quotes
  - Active Orders
  - Total Revenue
  
- **Customer Management** - Add/Edit/View customers
  - Full contact information
  - Industry classification
  - Source tracking (Website, Email, Phone)

- **Quote Management** - Track and convert quotes
  - Quote status (Pending, Quoted, Accepted, Rejected)
  - Service type and requirements
  - Linked to customer database

- **Order Management** - Create and track orders
  - Link orders to quotes
  - Track order status (Pending, In Progress, Ready, Completed)
  - Amount and due date tracking

- **Invoice Generation** - Create invoices from orders
  - Automatic numbering
  - GST calculation (optional)
  - Customer details pre-filled
  - Export to PDF

- **Challan Management** - Generate delivery chalan
  - Item-wise tracking
  - Signature verification
  - Delivery confirmation

- **Job Costing** - Calculate production costs
  - Material cost
  - Machine hours
  - Labor cost
  - Overhead percentage
  - Profit margin calculation
  - Final selling price

- **Reports** - Analytics and insights
  - Sales summary
  - Customer acquisition
  - Order tracking
  - Revenue trends

- **Settings** - Data management
  - Export all data (JSON)
  - Export customers (CSV)
  - Export quotes (CSV)
  - Data reset

**Technologies:**
- Responsive admin UI
- Data visualization with statistics
- Real-time data updates
- Export functionality

---

### 3. DATA LAYER (`/backend`)

**Purpose:** Centralized data management and export

**Key Module: `DataStore` (JavaScript)**

```javascript
// Initialize
const dataStore = new DataStore();

// Quote Operations
dataStore.saveQuote(quoteData)
dataStore.getQuotes(email)
dataStore.updateQuoteStatus(quoteId, status)

// Customer Operations
dataStore.saveCustomer(customerData)
dataStore.getCustomers()
dataStore.getCustomerByEmail(email)

// Order Operations
dataStore.saveOrder(orderData)
dataStore.getOrders(customerId)

// Export Operations
dataStore.exportQuotesAsCSV()
dataStore.exportCustomersAsCSV()
dataStore.exportAllDataAsJSON()
```

**LocalStorage Keys:**
- `skanda_quotes` - Quote requests
- `skanda_contacts` - Contact form submissions
- `skanda_customers` - Customer database
- `skanda_orders` - Orders

---

### 4. EXCEL VBA BACKEND (`/backend/templates`)

**Purpose:** Advanced reporting, data analysis, invoicing

**VBA Functions:**
- `ImportDataFromWebsite()` - Import from JSON export
- `SetupCustomerSheet()` - Initialize customer sheet
- `SetupOrdersSheet()` - Initialize orders sheet
- `SetupInvoiceSheet()` - Initialize invoice sheet
- `CalculateInvoiceTotal()` - GST calculations
- `GenerateSalesReport()` - Monthly reports
- `ExportCustomersToCSV()` - Export customer data
- `InitializeWorkbook()` - Setup all sheets

**Excel Structure:**

| Sheet | Purpose | Columns |
|-------|---------|---------|
| Customers | Customer Database | ID, Name, Company, Email, Phone, Industry, Source, Date |
| Orders | Order Tracking | ID, Customer, Service, Qty, Price, Amount, Status, Due Date |
| Invoices | Invoice Records | ID, Order ID, Customer, Amount, GST%, GST Amount, Total, Date |
| Challans | Delivery Tracking | ID, Order ID, Items, Delivery Date, Signature |
| Reports | Analytics | Revenue, Orders, Customers, Trends |

---

## Data Flow

```
Website Form Submission
    ↓
LocalStorage (Client-Side)
    ↓
Admin Dashboard Display
    ↓
Export to JSON/CSV
    ↓
Excel VBA Backend
    ↓
Reports & Analysis
```

---

## File Structure

```
Skanda_Home/
├── website/
│   ├── css/
│   │   └── style.css              # Main website styles
│   ├── js/
│   │   ├── main.js                # Common functions
│   │   ├── quote-handler.js       # Quote form logic
│   │   └── contact-handler.js     # Contact form logic
│   ├── images/                    # Product images
│   ├── index.html                 # Home page
│   ├── services.html              # Services page
│   ├── machinery.html             # Machinery showcase
│   ├── quote.html                 # Quote request form
│   ├── contact.html               # Contact page
│   ├── about.html                 # About page
│   └── clients.html               # Client testimonials
│
├── admin/
│   ├── css/
│   │   └── admin-style.css        # Admin dashboard styles
│   ├── js/
│   │   └── admin-main.js          # Dashboard logic
│   ├── modules/                   # Module-specific JS
│   └── index.html                 # Admin dashboard
│
├── backend/
│   ├── js/
│   │   └── data-store.js          # LocalStorage management
│   ├── templates/
│   │   └── skanda-excel-vba-template.vb  # Excel VBA code
│   └── data/
│       └── (export files here)
│
├── assets/
│   └── data/
│       └── (sample data files)
│
├── docs/
│   ├── README.md                  # This file
│   ├── INSTALLATION.md            # Setup guide
│   ├── USER-GUIDE.md              # How to use
│   └── API-REFERENCE.md           # Data structure reference
│
└── .github/
    └── copilot-instructions.md    # Project instructions
```

---

## Setup Instructions

### 1. Website Deployment (GitHub Pages)

```bash
# Clone repository
git clone <repo-url>
cd Skanda_Home

# Push to GitHub
git add .
git commit -m "Initial website setup"
git push origin main

# Enable GitHub Pages
# Go to Settings → Pages → Source: main branch /root
# Your site will be available at: https://<username>.github.io/Skanda_Home
```

### 2. Admin Dashboard Setup

1. Open `/admin/index.html` locally in browser
2. All data is stored in browser LocalStorage
3. No server required for basic functionality

### 3. Excel Backend Setup

1. Open Excel workbook
2. Go to Developer Tab → Visual Basic Editor
3. Copy code from `backend/templates/skanda-excel-vba-template.vb`
4. Paste into Excel VBA editor
5. Run `InitializeWorkbook()` macro to setup sheets
6. Import JSON exports from website using `ImportDataFromWebsite()` macro

---

## Usage Guide

### Adding a Quote from Website

1. Customer fills quote form on `quote.html`
2. Data saved to browser LocalStorage
3. Customer receives confirmation
4. Admin can view in Dashboard → Quotes
5. Admin updates status (Pending → Quoted → Accepted/Rejected)

### Creating an Invoice

1. Go to Admin Dashboard → Orders
2. Click "Generate Invoice" for completed order
3. System calculates GST (if applicable)
4. Export to PDF or print directly

### Exporting Data

**From Admin Dashboard:**
- Settings → Export All Data (JSON)
- Settings → Export Customers (CSV)
- Settings → Export Quotes (CSV)

**From Excel:**
- Run macro → Export Customers to CSV

---

## Costing Formula

$$\text{Selling Price} = (Material + Machine + Labour) \times (1 + \frac{Overhead\%}{100}) \times (1 + \frac{Profit\%}{100})$$

**Example:**
- Material Cost: ₹500
- Machine Hours: 2 hrs @ ₹200/hr = ₹400
- Labour Cost: ₹300
- Overhead: 15%
- Profit Margin: 20%

$$\text{Total Cost} = 500 + 400 + 300 = ₹1200$$
$$\text{With Overhead (15\%)} = 1200 \times 1.15 = ₹1380$$
$$\text{Final Price (20\% profit)} = 1380 \times 1.20 = ₹1656$$

---

## Currency & Localization

- **Currency:** Indian Rupee (₹)
- **Number Format:** en-IN (123,456.78)
- **Date Format:** DD-MMM-YYYY

---

## Security & Data Backup

**Current Implementation:**
- LocalStorage (Browser)
- No server/database (fully client-side)

**Best Practices:**
1. **Regular Exports:** Admin dashboard provides CSV/JSON export
2. **Backup Schedule:** Export data weekly to local drive
3. **Password Protection:** Excel file should be password protected
4. **Local Backup:** Keep exported JSON files in secure folder

**Future Enhancement:**
- Firebase backend
- Cloud database
- Encrypted data transmission
- User authentication

---

## API Reference

### DataStore Class

#### Quote Methods
```javascript
saveQuote(quoteData)                    // Save new quote
getQuotes(email?)                       // Get all quotes or user's quotes
updateQuoteStatus(quoteId, status)      // Update quote status
```

#### Customer Methods
```javascript
saveCustomer(customerData)              // Save/update customer
getCustomers()                          // Get all customers
getCustomerByEmail(email)               // Find customer by email
```

#### Order Methods
```javascript
saveOrder(orderData)                    // Create order
getOrders(customerId?)                  // Get orders
```

#### Export Methods
```javascript
exportQuotesAsCSV()                     // Export quotes as CSV
exportCustomersAsCSV()                  // Export customers as CSV
exportAllDataAsJSON()                   // Export all data as JSON
downloadCSV(filename, content)          // Download CSV file
```

---

## Future Roadmap

1. **Phase 1 (Current):** Website + Admin Dashboard + Excel Backend
2. **Phase 2:** Firebase integration for cloud sync
3. **Phase 3:** Mobile app (React Native/Flutter)
4. **Phase 4:** Full ERP system
5. **Phase 5:** API for third-party integrations

---

## Troubleshooting

### Q: Data not saving in Admin Dashboard?
**A:** Check browser LocalStorage settings. Clear cache and reload.

### Q: How to backup data?
**A:** Go to Admin Dashboard → Settings → Export All Data (saves JSON file)

### Q: Excel macros not working?
**A:** Enable macros in Excel settings. File → Options → Trust Center

### Q: How to deploy to live server?
**A:** Use GitHub Pages or any static hosting. All functionality works offline.

---

## Support & Contact

**Company:** Skanda Engineering  
**Email:** info@skandaengineering.com  
**Phone:** +91 9876543210  
**Location:** Bangalore, India

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-01 | Initial release with website, admin, and Excel backend |

---

## License

Copyright © 2026 Skanda Engineering. All rights reserved.

---

**Last Updated:** April 1, 2026

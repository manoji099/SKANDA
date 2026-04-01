/**
 * SKANDA ENGINEERING - ADMIN DASHBOARD JS
 * Complete admin functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    // Set up page navigation
    const navItems = document.querySelectorAll('.sidebar-nav a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Load dashboard data
    loadDashboard();

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportAllData);

    // Job costing form
    const costingForm = document.getElementById('costingForm');
    if (costingForm) {
        costingForm.addEventListener('submit', calculateCosting);
    }

    // Quote status filter
    const quoteFilter = document.getElementById('quoteStatusFilter');
    if (quoteFilter) {
        quoteFilter.addEventListener('change', loadQuotesTable);
    }
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const page = document.getElementById(`${pageName}-page`);
    if (page) {
        page.classList.add('active');
        
        // Load page data
        switch(pageName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'customers':
                loadCustomersTable();
                break;
            case 'quotes':
                loadQuotesTable();
                break;
            case 'orders':
                loadOrdersTable();
                break;
            case 'reports':
                loadReports();
                break;
        }
    }

    // Update header title
    const headerTitle = document.querySelector('.admin-header h1');
    const titleMap = {
        'dashboard': 'Dashboard',
        'customers': 'Customers',
        'quotes': 'Quotes',
        'orders': 'Orders',
        'invoices': 'Invoices',
        'challans': 'Challans',
        'costing': 'Job Costing',
        'reports': 'Reports',
        'settings': 'Settings'
    };
    if (headerTitle) {
        headerTitle.textContent = titleMap[pageName] || 'Dashboard';
    }
}

// ============= DASHBOARD =============

function loadDashboard() {
    const customers = dataStore.getCustomers();
    const quotes = dataStore.getQuotes();
    const orders = dataStore.getOrders();

    // Update stats
    document.getElementById('totalCustomers').textContent = customers.length;
    document.getElementById('pendingQuotes').textContent = quotes.filter(q => q.status === 'pending').length;
    document.getElementById('activeOrders').textContent = orders.filter(o => o.status !== 'completed').length;
    
    // Calculate total revenue (mock calculation)
    const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0);
    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);

    // Recent quotes
    const recentQuotes = quotes.slice(-5).reverse();
    loadRecentQuotesTable(recentQuotes);

    // Recent orders
    const recentOrders = orders.slice(-5).reverse();
    loadRecentOrdersTable(recentOrders);
}

function loadRecentQuotesTable(quotes) {
    const tbody = document.getElementById('recentQuotesBody');
    tbody.innerHTML = '';

    if (quotes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No recent quotes</td></tr>';
        return;
    }

    quotes.forEach(quote => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${quote.id}</strong></td>
            <td>${quote.fullName}</td>
            <td>${quote.serviceType}</td>
            <td><span class="status-badge status-${quote.status}">${quote.status}</span></td>
            <td>${formatDate(quote.createdAt)}</td>
            <td>
                <button class="btn-sm btn-primary" onclick="editQuote('${quote.id}')">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadRecentOrdersTable(orders) {
    const tbody = document.getElementById('recentOrdersBody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No recent orders</td></tr>';
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customerName || 'N/A'}</td>
            <td>${formatCurrency(order.amount || 0)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>${formatDate(order.createdAt)}</td>
            <td>
                <button class="btn-sm btn-primary" onclick="editOrder('${order.id}')">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ============= CUSTOMERS TABLE =============

function loadCustomersTable() {
    const customers = dataStore.getCustomers();
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = '';

    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem;">No customers</td></tr>';
        return;
    }

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${customer.fullName}</strong></td>
            <td>${customer.company}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.industry}</td>
            <td>${formatDate(customer.createdAt)}</td>
            <td>
                <button class="btn-sm btn-primary" onclick="editCustomer('${customer.id}')">Edit</button>
                <button class="btn-sm btn-secondary" onclick="viewCustomerDetails('${customer.id}')">View</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ============= QUOTES TABLE =============

function loadQuotesTable() {
    let quotes = dataStore.getQuotes();
    const statusFilter = document.getElementById('quoteStatusFilter')?.value;
    
    if (statusFilter) {
        quotes = quotes.filter(q => q.status === statusFilter);
    }

    const tbody = document.getElementById('quotesTableBody');
    tbody.innerHTML = '';

    if (quotes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem;">No quotes found</td></tr>';
        return;
    }

    quotes.forEach(quote => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${quote.id}</strong></td>
            <td>${quote.fullName}</td>
            <td>${quote.serviceType}</td>
            <td>${formatCurrency(quote.estimatedAmount || 0)}</td>
            <td><span class="status-badge status-${quote.status}">${quote.status}</span></td>
            <td>${formatDate(quote.createdAt)}</td>
            <td>
                <button class="btn-sm btn-primary" onclick="editQuote('${quote.id}')">Edit</button>
                <button class="btn-sm btn-secondary" onclick="generateQuotePDF('${quote.id}')">PDF</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ============= ORDERS TABLE =============

function loadOrdersTable() {
    const orders = dataStore.getOrders();
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No orders</td></tr>';
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customerName || 'N/A'}</td>
            <td>${formatCurrency(order.amount || 0)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>${formatDate(order.dueDate || order.createdAt)}</td>
            <td>
                <button class="btn-sm btn-primary" onclick="editOrder('${order.id}')">Edit</button>
                <button class="btn-sm btn-secondary" onclick="generateInvoice('${order.id}')">Invoice</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ============= REPORTS =============

function loadReports() {
    const customers = dataStore.getCustomers();
    const quotes = dataStore.getQuotes();
    const orders = dataStore.getOrders();

    // Sales summary
    const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0);
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    document.getElementById('salesSummary').innerHTML = `
        Total Revenue: <strong>${formatCurrency(totalRevenue)}</strong><br>
        Completed Orders: <strong>${completedOrders}</strong><br>
        Total Orders: <strong>${orders.length}</strong>
    `;

    // Customer acquisition
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const newCustomersThisMonth = customers.filter(c => new Date(c.createdAt) >= thisMonth).length;
    document.getElementById('customerAcquisition').innerHTML = `
        New Customers This Month: <strong>${newCustomersThisMonth}</strong><br>
        Total Customers: <strong>${customers.length}</strong><br>
        Customer Retention Rate: <strong>${((customers.length > 0 ? completedOrders / customers.length * 100 : 0).toFixed(2))}%</strong>
    `;
}

// ============= JOB COSTING =============

function calculateCosting(e) {
    e.preventDefault();

    const materialCost = parseFloat(document.getElementById('materialCost').value) || 0;
    const machineHours = parseFloat(document.getElementById('machineHours').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    const labourCost = parseFloat(document.getElementById('labourCost').value) || 0;
    const overhead = parseFloat(document.getElementById('overhead').value) || 0;
    const profitMargin = parseFloat(document.getElementById('profitMargin').value) || 0;

    const machingCost = machineHours * hourlyRate;
    const totalCost = materialCost + machingCost + labourCost;
    const overheadAmount = totalCost * (overhead / 100);
    const costWithOverhead = totalCost + overheadAmount;
    const profit = costWithOverhead * (profitMargin / 100);
    const sellingPrice = costWithOverhead + profit;

    const result = `
        <div style="background-color: #D1FAE5; padding: 1.5rem; border-radius: 0.5rem; margin-top: 1.5rem;">
            <h3>Costing Summary</h3>
            <table style="width: 100%; margin-top: 1rem;">
                <tr><td><strong>Material Cost:</strong></td><td>${formatCurrency(materialCost)}</td></tr>
                <tr><td><strong>Machine Cost:</strong></td><td>${formatCurrency(machingCost)}</td></tr>
                <tr><td><strong>Labour Cost:</strong></td><td>${formatCurrency(labourCost)}</td></tr>
                <tr style="border-top: 2px solid #065F46;"><td><strong>Total Cost:</strong></td><td>${formatCurrency(totalCost)}</td></tr>
                <tr><td><strong>Overhead (${overhead}%):</strong></td><td>${formatCurrency(overheadAmount)}</td></tr>
                <tr style="border-top: 2px solid #065F46;"><td><strong>Cost with Overhead:</strong></td><td>${formatCurrency(costWithOverhead)}</td></tr>
                <tr><td><strong>Profit (${profitMargin}%):</strong></td><td>${formatCurrency(profit)}</td></tr>
                <tr style="border-top: 3px solid #065F46; font-size: 1.1rem;"><td><strong>Final Selling Price:</strong></td><td><strong>${formatCurrency(sellingPrice)}</strong></td></tr>
            </table>
        </div>
    `;

    document.getElementById('costingResult').innerHTML = result;
}

// ============= EXPORT FUNCTIONS =============

function exportAllData() {
    const json = dataStore.exportAllDataAsJSON();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', `skanda-data-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('Data exported successfully!');
}

function exportQuotesCSV() {
    const csv = dataStore.exportQuotesAsCSV();
    dataStore.downloadCSV(`skanda-quotes-${new Date().toISOString().split('T')[0]}.csv`, csv);
    alert('Quotes exported successfully!');
}

function exportCustomersCSV() {
    const csv = dataStore.exportCustomersAsCSV();
    dataStore.downloadCSV(`skanda-customers-${new Date().toISOString().split('T')[0]}.csv`, csv);
    alert('Customers exported successfully!');
}

// ============= UTILITY FUNCTIONS =============

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ============= PLACEHOLDER FUNCTIONS (to be implemented) =============

function openCustomerForm() {
    alert('Open customer form - to be implemented');
}

function openOrderForm() {
    alert('Open order form - to be implemented');
}

function openInvoiceForm() {
    alert('Open invoice form - to be implemented');
}

function editQuote(quoteId) {
    alert(`Edit quote ${quoteId} - to be implemented`);
}

function editOrder(orderId) {
    alert(`Edit order ${orderId} - to be implemented`);
}

function editCustomer(customerId) {
    alert(`Edit customer ${customerId} - to be implemented`);
}

function viewCustomerDetails(customerId) {
    alert(`View customer ${customerId} - to be implemented`);
}

function generateQuotePDF(quoteId) {
    alert(`Generate PDF for quote ${quoteId} - to be implemented`);
}

function generateInvoice(orderId) {
    alert(`Generate invoice for order ${orderId} - to be implemented`);
}

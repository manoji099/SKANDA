/**
 * SKANDA ENGINEERING - DATA STORAGE MODULE
 * LocalStorage management for quotes, contacts, and customer data
 */

class DataStore {
    constructor() {
        this.quotesKey = 'skanda_quotes';
        this.contactsKey = 'skanda_contacts';
        this.customersKey = 'skanda_customers';
        this.ordersKey = 'skanda_orders';
    }

    // QUOTE OPERATIONS
    saveQuote(quoteData) {
        const quotes = this.getQuotes();
        quoteData.id = `QUOTE_${Date.now()}`;
        quoteData.createdAt = new Date().toISOString();
        quoteData.status = 'pending';
        quotes.push(quoteData);
        localStorage.setItem(this.quotesKey, JSON.stringify(quotes));
        return quoteData;
    }

    getQuotes(email = null) {
        const quotes = JSON.parse(localStorage.getItem(this.quotesKey) || '[]');
        if (email) {
            return quotes.filter(q => q.email === email);
        }
        return quotes;
    }

    updateQuoteStatus(quoteId, status) {
        const quotes = this.getQuotes();
        const quote = quotes.find(q => q.id === quoteId);
        if (quote) {
            quote.status = status;
            quote.updatedAt = new Date().toISOString();
            localStorage.setItem(this.quotesKey, JSON.stringify(quotes));
            return quote;
        }
        return null;
    }

    // CONTACT OPERATIONS
    saveContact(contactData) {
        const contacts = this.getContacts();
        contactData.id = `CONTACT_${Date.now()}`;
        contactData.createdAt = new Date().toISOString();
        contacts.push(contactData);
        localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
        return contactData;
    }

    getContacts() {
        return JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
    }

    // CUSTOMER OPERATIONS
    saveCustomer(customerData) {
        const customers = this.getCustomers();
        if (!customerData.id) {
            customerData.id = `CUST_${Date.now()}`;
            customerData.createdAt = new Date().toISOString();
        }
        customerData.updatedAt = new Date().toISOString();
        
        const existingIndex = customers.findIndex(c => c.email === customerData.email);
        if (existingIndex >= 0) {
            customers[existingIndex] = customerData;
        } else {
            customers.push(customerData);
        }
        
        localStorage.setItem(this.customersKey, JSON.stringify(customers));
        return customerData;
    }

    getCustomers() {
        return JSON.parse(localStorage.getItem(this.customersKey) || '[]');
    }

    getCustomerByEmail(email) {
        const customers = this.getCustomers();
        return customers.find(c => c.email === email);
    }

    // ORDER OPERATIONS
    saveOrder(orderData) {
        const orders = this.getOrders();
        orderData.id = `ORD_${Date.now()}`;
        orderData.createdAt = new Date().toISOString();
        orderData.status = 'pending';
        orders.push(orderData);
        localStorage.setItem(this.ordersKey, JSON.stringify(orders));
        return orderData;
    }

    getOrders(customerId = null) {
        const orders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
        if (customerId) {
            return orders.filter(o => o.customerId === customerId);
        }
        return orders;
    }

    // EXPORT OPERATIONS
    exportQuotesAsCSV() {
        const quotes = this.getQuotes();
        return this.convertToCSV(quotes, ['id', 'fullName', 'company', 'email', 'phone', 'serviceType', 'quantity', 'timeline', 'status', 'createdAt']);
    }

    exportCustomersAsCSV() {
        const customers = this.getCustomers();
        return this.convertToCSV(customers, ['id', 'fullName', 'company', 'email', 'phone', 'industry', 'createdAt']);
    }

    exportOrdersAsJSON() {
        return JSON.stringify(this.getOrders(), null, 2);
    }

    convertToCSV(data, headers) {
        if (!data || data.length === 0) return '';
        
        const csv = [headers.join(',')];
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') 
                    ? `"${value}"` 
                    : value;
            });
            csv.push(values.join(','));
        });
        
        return csv.join('\n');
    }

    downloadCSV(filename, content) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // IMPORT/EXPORT JSON
    exportAllDataAsJSON() {
        return JSON.stringify({
            quotes: this.getQuotes(),
            customers: this.getCustomers(),
            orders: this.getOrders(),
            exportDate: new Date().toISOString()
        }, null, 2);
    }

    // RESET ALL DATA (Admin Use)
    resetAllData() {
        localStorage.removeItem(this.quotesKey);
        localStorage.removeItem(this.contactsKey);
        localStorage.removeItem(this.customersKey);
        localStorage.removeItem(this.ordersKey);
    }
}

// Initialize global DataStore instance
const dataStore = new DataStore();

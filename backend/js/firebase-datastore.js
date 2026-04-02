/**
 * SKANDA ENGINEERING - FIREBASE DATA STORE
 * Cloud data storage with Firebase Firestore + LocalStorage fallback
 */

class FirebaseDataStore {
    constructor(userId = null) {
        this.userId = userId;
        this.db = window.firebaseConfig?.db;
        this.useFirebase = !!this.db && !!userId;
        
        // LocalStorage fallback
        this.quotesKey = 'skanda_quotes';
        this.contactsKey = 'skanda_contacts';
        this.customersKey = 'skanda_customers';
        this.ordersKey = 'skanda_orders';
        this.productsKey = 'skanda_products';
    }

    // ========== CUSTOMER OPERATIONS ==========
    
    async saveCustomer(customerData) {
        if (!customerData.id) {
            customerData.id = `CUST_${Date.now()}`;
            customerData.createdAt = new Date().toISOString();
        }
        customerData.updatedAt = new Date().toISOString();

        if (this.useFirebase) {
            try {
                await this.db.collection('users').doc(this.userId)
                    .collection('customers').doc(customerData.id).set(customerData);
                return customerData;
            } catch (error) {
                console.error('Firebase save error:', error);
                return this.saveCustomerLocal(customerData);
            }
        } else {
            return this.saveCustomerLocal(customerData);
        }
    }

    saveCustomerLocal(customerData) {
        const customers = this.getCustomersLocal();
        const existingIndex = customers.findIndex(c => c.email === customerData.email);
        if (existingIndex >= 0) {
            customers[existingIndex] = customerData;
        } else {
            customers.push(customerData);
        }
        localStorage.setItem(this.customersKey, JSON.stringify(customers));
        return customerData;
    }

    async getCustomers() {
        if (this.useFirebase) {
            try {
                const snapshot = await this.db.collection('users').doc(this.userId)
                    .collection('customers').get();
                return snapshot.docs.map(doc => doc.data());
            } catch (error) {
                console.error('Firebase get error:', error);
                return this.getCustomersLocal();
            }
        } else {
            return this.getCustomersLocal();
        }
    }

    getCustomersLocal() {
        return JSON.parse(localStorage.getItem(this.customersKey) || '[]');
    }

    async getCustomerByEmail(email) {
        const customers = await this.getCustomers();
        return customers.find(c => c.email === email);
    }

    // ========== PRODUCT OPERATIONS ==========

    async saveProduct(productData) {
        if (!productData.id) {
            productData.id = `PROD_${Date.now()}`;
            productData.createdAt = new Date().toISOString();
        }
        productData.updatedAt = new Date().toISOString();

        if (this.useFirebase) {
            try {
                await this.db.collection('users').doc(this.userId)
                    .collection('products').doc(productData.id).set(productData);
                return productData;
            } catch (error) {
                console.error('Firebase save error:', error);
                return this.saveProductLocal(productData);
            }
        } else {
            return this.saveProductLocal(productData);
        }
    }

    saveProductLocal(productData) {
        const products = this.getProductsLocal();
        const existingIndex = products.findIndex(p => p.id === productData.id);
        if (existingIndex >= 0) {
            products[existingIndex] = productData;
        } else {
            products.push(productData);
        }
        localStorage.setItem(this.productsKey, JSON.stringify(products));
        return productData;
    }

    async getProducts() {
        if (this.useFirebase) {
            try {
                const snapshot = await this.db.collection('users').doc(this.userId)
                    .collection('products').get();
                return snapshot.docs.map(doc => doc.data());
            } catch (error) {
                console.error('Firebase get error:', error);
                return this.getProductsLocal();
            }
        } else {
            return this.getProductsLocal();
        }
    }

    getProductsLocal() {
        return JSON.parse(localStorage.getItem(this.productsKey) || '[]');
    }

    async deleteProduct(productId) {
        if (this.useFirebase) {
            try {
                await this.db.collection('users').doc(this.userId)
                    .collection('products').doc(productId).delete();
            } catch (error) {
                console.error('Firebase delete error:', error);
                this.deleteProductLocal(productId);
            }
        } else {
            this.deleteProductLocal(productId);
        }
    }

    deleteProductLocal(productId) {
        const products = this.getProductsLocal();
        const filtered = products.filter(p => p.id !== productId);
        localStorage.setItem(this.productsKey, JSON.stringify(filtered));
    }

    // ========== QUOTE OPERATIONS ==========

    async saveQuote(quoteData) {
        quoteData.id = `QUOTE_${Date.now()}`;
        quoteData.createdAt = new Date().toISOString();
        quoteData.status = 'pending';

        if (this.useFirebase) {
            try {
                await this.db.collection('users').doc(this.userId)
                    .collection('quotes').doc(quoteData.id).set(quoteData);
                return quoteData;
            } catch (error) {
                console.error('Firebase save error:', error);
                return this.saveQuoteLocal(quoteData);
            }
        } else {
            return this.saveQuoteLocal(quoteData);
        }
    }

    saveQuoteLocal(quoteData) {
        const quotes = this.getQuotesLocal();
        quotes.push(quoteData);
        localStorage.setItem(this.quotesKey, JSON.stringify(quotes));
        return quoteData;
    }

    async getQuotes() {
        if (this.useFirebase) {
            try {
                const snapshot = await this.db.collection('users').doc(this.userId)
                    .collection('quotes').get();
                return snapshot.docs.map(doc => doc.data());
            } catch (error) {
                console.error('Firebase get error:', error);
                return this.getQuotesLocal();
            }
        } else {
            return this.getQuotesLocal();
        }
    }

    getQuotesLocal() {
        return JSON.parse(localStorage.getItem(this.quotesKey) || '[]');
    }

    async updateQuoteStatus(quoteId, status) {
        if (this.useFirebase) {
            try {
                await this.db.collection('users').doc(this.userId)
                    .collection('quotes').doc(quoteId).update({
                        status: status,
                        updatedAt: new Date().toISOString()
                    });
            } catch (error) {
                console.error('Firebase update error:', error);
            }
        } else {
            const quotes = this.getQuotesLocal();
            const quote = quotes.find(q => q.id === quoteId);
            if (quote) {
                quote.status = status;
                quote.updatedAt = new Date().toISOString();
                localStorage.setItem(this.quotesKey, JSON.stringify(quotes));
            }
        }
    }

    // ========== ORDER OPERATIONS ==========

    async saveOrder(orderData) {
        orderData.id = `ORD_${Date.now()}`;
        orderData.createdAt = new Date().toISOString();
        orderData.status = 'pending';

        if (this.useFirebase) {
            try {
                await this.db.collection('users').doc(this.userId)
                    .collection('orders').doc(orderData.id).set(orderData);
                return orderData;
            } catch (error) {
                console.error('Firebase save error:', error);
                return this.saveOrderLocal(orderData);
            }
        } else {
            return this.saveOrderLocal(orderData);
        }
    }

    saveOrderLocal(orderData) {
        const orders = this.getOrdersLocal();
        orders.push(orderData);
        localStorage.setItem(this.ordersKey, JSON.stringify(orders));
        return orderData;
    }

    async getOrders() {
        if (this.useFirebase) {
            try {
                const snapshot = await this.db.collection('users').doc(this.userId)
                    .collection('orders').get();
                return snapshot.docs.map(doc => doc.data());
            } catch (error) {
                console.error('Firebase get error:', error);
                return this.getOrdersLocal();
            }
        } else {
            return this.getOrdersLocal();
        }
    }

    getOrdersLocal() {
        return JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    }

    // ========== EXPORT OPERATIONS ==========

    async exportAllDataAsJSON() {
        const [customers, products, quotes, orders] = await Promise.all([
            this.getCustomers(),
            this.getProducts(),
            this.getQuotes(),
            this.getOrders()
        ]);

        return JSON.stringify({
            customers,
            products,
            quotes,
            orders,
            exportDate: new Date().toISOString()
        }, null, 2);
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

    async resetAllData() {
        if (this.useFirebase) {
            try {
                await this.db.collection('users').doc(this.userId).delete();
            } catch (error) {
                console.error('Firebase delete error:', error);
            }
        }
        localStorage.clear();
    }
}

// Keep backward compatibility with old DataStore name
const dataStore = new FirebaseDataStore();

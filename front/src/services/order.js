const API_BASE_URL = 'http://localhost:3002';

async function makeRequest(url, method = 'GET', data = null) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };

        const options = {
            method,
            headers,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function findOrdersByCriteria(criteria) {
    const queryParams = new URLSearchParams(criteria).toString();
    const url = `${API_BASE_URL}/orders?${queryParams}`;
    return makeRequest(url);
}

export async function createOrder(orderData) {
    const url = `${API_BASE_URL}/orders`;
    return makeRequest(url, 'POST', orderData);
}

export async function findProductsByOrderId(orderId) {
    const url = `${API_BASE_URL}/orders/${orderId}/products`;
    return makeRequest(url);
}

export async function addProductToCart(orderId, product) {
    const url = `${API_BASE_URL}/orders/${orderId}/product`;
    return makeRequest(url, 'POST', product);
}
const API_BASE_URL = import.meta.env.VITE_BASE_URL

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

        if (method === 'DELETE') {
            return null;
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

export async function getOrderProducts(orderId) {
    const url = `${API_BASE_URL}/orders/${orderId}/products`;
    return makeRequest(url);
}

export async function findOrderById(orderId) {
    const url = `${API_BASE_URL}/orders/${orderId}`;
    return makeRequest(url);
}

export async function editQuantityOrderProduct(orderId, productId, quantity) {
    const url = `${API_BASE_URL}/orders/${orderId}/product/${productId}`;
    return makeRequest(url, 'PATCH', quantity);
}

export async function removeOrderProduct(orderId, productId) {
    const url = `${API_BASE_URL}/orders/${orderId}/product/${productId}`;
    return makeRequest(url, 'DELETE');
}

export async function findOrCreateOrder() {
    const url = `${API_BASE_URL}/orders/find-or-create-cart`;
    return makeRequest(url, 'POST');
}

export async function checkout(orderId) {
    const url = `${API_BASE_URL}/orders/${orderId}/checkout`;
    return makeRequest(url, 'POST');
}
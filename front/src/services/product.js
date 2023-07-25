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

        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function findProductsByCriteria(criteria) {
    const queryParams = new URLSearchParams(criteria).toString();
    const url = `${API_BASE_URL}/products?${queryParams}`;
    return makeRequest(url);
}

export async function findProductById(productId) {
    const url = `${API_BASE_URL}/products/${productId}`;
    return makeRequest(url);
}

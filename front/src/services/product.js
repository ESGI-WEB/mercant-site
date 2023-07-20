const API_BASE_URL = 'http://localhost:3002';

export async function findProductsByCriteria(criteria) {
    try {
        const queryParams = new URLSearchParams(criteria).toString();
        const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
}
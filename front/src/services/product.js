const API_BASE_URL = 'http://localhost:3002';

export async function getProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

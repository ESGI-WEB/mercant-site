const ValidationError = require('../errors/ValidationError');
const ServiceError = require('../errors/ServiceError');

module.exports = {
    createPayment: async function (data) {
        const response = await fetch(process.env.PAYLESS_BASE_URL + '/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.PAYLESS_PUBLIC_KEY,
                'merchant_id': process.env.PAYLESS_MERCHANT_ID
            },
            body: JSON.stringify(data)
        });

        if (response.status !== 201) {
            if (response.status === 422) {
                throw new ValidationError(await response.json());
            }
            throw new ServiceError(await response.text());
        }

        return await response.json();
    },
};

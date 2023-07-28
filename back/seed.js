// fill your database with test data, on every running tests, your db will be filled with these data
const {faker} = require('@faker-js/faker');
const {Product, User} = require('./db');

const seed = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('No seeding in production');
        }

        await User.create({
            lastname: "Admin",
            firstname: "Admin",
            email: "admin@payless.com",
            password: "Azerty1*",
            role: "Administrator",
        });

        // for tests only, use image uploader
        const images = [
            "https://media.vanityfair.fr/photos/61015014b811343f19f0e570/16:9/w_1280,c_limit/Valerie%203.jpg",
            "https://hospitality-on.com/sites/default/files/2022-09/four%20seasons%20yachts%20%281%29.jpg",
            "https://media.gqmagazine.fr/photos/60dd72a77498dd8ce617b881/4:3/w_748,h_561,c_limit/Somnio_Superyacht4.jpg",
            "https://www.flyingcharter.it/wp-content/uploads/2023/05/flying-charter-yacht.jpg"
        ];

        for (const image of images) {
            await Product.create({
                title: "Yacth "+faker.person.firstName(),
                description: faker.lorem.paragraph(),
                image,
                price: faker.commerce.price(),
            });
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seed().then(() => {
    console.log('Database seeded');
    process.exit(0);
});
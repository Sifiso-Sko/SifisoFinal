 const faker = require('faker');

 var database = { products: [] };

 for (var i = 1; i <= 300; i++) {
     database.products.push({
         id: i,
         name: faker.commerce.productName(),
         description: faker.lorem.sentence(),
         price: faker.commerce.price(),
         imageUrl: "https://source.unsplash.com/1600x900/?product",
         quantity: faker.datatype.number()
     });
 }

 console.log(JSON.stringify(database));
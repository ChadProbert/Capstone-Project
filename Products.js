//all the shop products are created in this .js file using the Product.js file object constructor
//Hats
let product1 = new Product(
	1,
	"hats",
	"Beige ice cream dad hat",
	100.0,
	"hats1.jpeg"
);
let product2 = new Product(
	2,
	"hats",
	"Faded-blue palm tree dad hat",
	100.0,
	"hats2.jpeg"
);
let product3 = new Product(
	3,
	"hats",
	"Unisex light-brown fedora hat",
	200.0,
	"hats3.jpeg"
);
let product4 = new Product(
	4,
	"hats",
	"Unisex Twine Fedora",
	100.0,
	"hats4.jpeg"
);
//Shirts
let product5 = new Product(
	5,
	"shirts",
	"Plain crew neck white T-shirt",
	150.0,
	"shirt1.jpeg"
);
let product6 = new Product(
	6,
	"shirts",
	"Floral button-up shirt",
	200.0,
	"shirt2.jpg"
);

//created an array for all the products
let myProducts = new Array();
myProducts.push(product1);
myProducts.push(product2);
myProducts.push(product3);
myProducts.push(product4);
myProducts.push(product5);
myProducts.push(product6);

let myCart = new Cart();

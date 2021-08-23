//this file is dedicated to be the object/product/item constructor
let Product = function (p_id, category, title, price, image) {
	let self = this;

	self.category = category;
	self.p_id = p_id;
	self.title = title;
	self.price = price;
	self.image = image;

	return self;
};

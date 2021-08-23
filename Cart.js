let lineItem = function (p_id, qty) {
	let self = this;

	self.product = myProducts.find(function (aProduct) {
		if (aProduct.p_id === p_id) {
			return true;
		}
		return false;
	});

	self.qty = qty;

	//calculates the price of a line item and include the vat and quantity of that item
	//rounded the number to 2 decimal places
	//toFixed() returns a string so i used 'Number()'
	self.lineTotal = function () {
		let ret = self.product.price * self.qty * 1.15;
		ret = Number(ret).toFixed(2);
		return Number(ret);
	};

	//calculates the vat of a line item including the quantity of that line item
	self.vat = function () {
		let ret = self.product.price * self.qty * 0.15;
		ret = Number(ret).toFixed(2);
		return Number(ret);
	};

	self.find = function (p_id) {
		if (p_id === self.product.p_id) {
			return true;
		}
		return false;
	};

	return self;
};

//set values of the cart totals to 0
let Cart = function () {
	let self = new Array();
	self.subtotal = 0;
	self.vat = 0;
	self.total = 0;
	self.discount = 0;
	self.delivery = 0;
	self.netTotal = 0;

	self.addToCart = function (p_id, qty) {
		let theLineITem = self.find(function (aLineItem) {
			return aLineItem.find(p_id);
		});

		//called function DoAlert to run if the quantity of a cart item changes
		if (theLineITem) {
			theLineITem.qty += qty;
			DoAlert();
			saveToStorage();
			return;
		}

		let newLineItem = new lineItem(p_id, qty);
		self.push(newLineItem);
		DoAlert();
		saveToStorage();
	};

	self.changeQty = function (p_id, qty) {
		let theLineITem = self.find(function (aLineItem) {
			return aLineItem.find(p_id);
		});

		//makes the quantity unable to be less than 1
		if (theLineITem) {
			if (qty <= 0) {
				qty = 1;
			}

			theLineITem.qty = qty;
			saveToStorage();
			return;
		}
	};

	//calculates all the totals
	self.calcTotals = function () {
		self.total = 0;
		self.vat = 0;

		self.forEach(function (aLineItem) {
			self.total += aLineItem.lineTotal();
		});

		self.forEach(function (aLineItem) {
			self.vat += aLineItem.vat();
		});

		self.subtotal = self.total - self.vat;
		self.netTotal = self.total - self.discount + self.delivery;

		//rounded totals and vat to the second decimal place
		//got help from https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/
		//made self.x = to a number value to be sure that it will return a number
		//toFixed() returns self.x as string so i made self.x a number after adding toFixed()
		self.total = Number(Number(self.total).toFixed(2));
		self.subtotal = Number(Number(self.subtotal).toFixed(2));
		self.vat = Number(Number(self.vat).toFixed(2));
		self.netTotal = Number(Number(self.netTotal).toFixed(2));
	};

	//generates a random order number when the user clicks on the 'CONFIRM ORDER' button
	self.checkOut = function () {
		let orderNum = Math.random() * 10000;
		orderNum = Math.round(orderNum, 0);

		//created a line break using '\r\n'
		alert(
			"Your order was successful! \r\n" + "Your order number is #" + orderNum
		);
	};

	//saves data to local storage
	//clearing browser history will remove saved data
	function saveToStorage() {
		let ls = window.localStorage;
		ls.setItem("cart", JSON.stringify(self));
	}

	//loads data from local storage
	function loadFromStorage() {
		self.length = 0;
		let ls = window.localStorage;
		let cart = ls.getItem("cart");
		if (cart) {
			cart = JSON.parse(cart);
			cart.forEach(function (item) {
				let newLineItem = new lineItem(item.product.p_id, item.qty);
				self.push(newLineItem);
			});
		}
	}

	/*when a user adds an item to their cart from Shop.html or Product.html the 
	cart total will calculate itself and return the value of the user's cart total as an alert*/
	function DoAlert() {
		self.calcTotals();
		alert("Your cart total is R" + self.total);
	}

	loadFromStorage();

	return self;
};

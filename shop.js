$(document).ready(function () {
	//created array 'myProducts' in Products.js file
	/*created a function that will add each product/object created in Products.js file 
	to the template in the .html file*/
	myProducts.forEach(function (aProduct) {
		let template = $("div.shop-item-template").clone();
		template.data("p_id", aProduct.p_id);
		$(".shop-item-title", template).html(aProduct.title);
		$(".shop-item-price", template).html("R " + aProduct.price);
		$(".shop-item-image", template).attr("src", "images/" + aProduct.image);

		/*when a user clicks on a product that product will become the selected product and the user 
		will be taken to the product.html page where the selected product will parse itself as a string*/
		$(".shop-item-a", template).click(function () {
			let ls = window.localStorage;
			ls.setItem("selected", JSON.stringify(aProduct));
		});

		/*adds the div.hats header if the products added to the template contain 
		'hats' in their properties*/
		$("button", template).click(addToCart);
		if (aProduct.category === "hats") {
			$("div.hats").append(template);
		}

		/*adds the div.shirts header if the products added to the template contain 
		'shirts' in their properties*/
		if (aProduct.category === "shirts") {
			$("div.shirts").append(template);
		}

		//removes the collpase class from the template
		template.removeClass("shop-item-template collapse").addClass("product");
	});

	function addToCart() {
		let target = this;
		let parentDiv = $(target).parents("div.product");
		let thePID = parentDiv.data("p_id");
		myCart.addToCart(thePID, 1);
	}
});

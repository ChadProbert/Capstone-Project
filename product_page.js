//parsing the string of properties of the clicked on item in Shop.html
let ls = window.localStorage;
let selected = ls.getItem("selected");
selected = JSON.parse(selected);

$(document).ready(function () {
	//creates the product that was clicked on using the string of properties
	function Paint() {
		$("span.shop-item-title").html(selected.title);
		$("img.shop-item-image").attr("src", "images/" + selected.image);
		$("span.shop-item-price").html("R " + selected.price);
		$("button.shop-item-button").click(function () {
			myCart.addToCart(selected.p_id, 1);
		});
	}

	//called the function to create the selected product on the page
	Paint();
});

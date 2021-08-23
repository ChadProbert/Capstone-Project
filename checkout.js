$(document).ready(function () {
	function PaintCart() {
		$("div.cart-items").empty();

		//removes the totals and recalculates them
		myCart.calcTotals();

		//paints the totals and corrects to 2nd decimal place
		myCart.forEach(PaintLineItem);
		$("span.cart-subtotal").html("R " + myCart.subtotal.toFixed(2));
		$("span.cart-vat").html("R " + myCart.vat.toFixed(2));
		$("span.cart-total").html("R " + myCart.total.toFixed(2));
		$("span.cart-discount").html("R " + myCart.discount.toFixed(2));
		$("span.cart-delivery").html("R " + myCart.delivery.toFixed(2));
		$("span.cart-nettotal").html("R " + myCart.netTotal.toFixed(2));
		$("button.btn-purchase").html(
			"CONFIRM ORDER FOR R " + myCart.netTotal.toFixed(2)
		);
	}

	function PaintLineItem(aLineItem) {
		//draws the items that are added to the cart and their quantity using the template
		let template = $("div.cart-item-template").clone();
		$("span.cart-item", template).html(aLineItem.product.title);
		$("input.cart-item-quantity", template)
			.val(aLineItem.qty)
			.change(function () {
				let newQty = Number($(this).val());
				myCart.changeQty(aLineItem.product.p_id, newQty);
				//recalculates the totals when the quantity is changed
				PaintCart();
			});

		//draws the item's price, vat and line total using the template
		//removed the collapse class to show the shopping cart items and quantities
		//corrected to 2nd decimal place
		$("span.cart-item-price", template).html(
			"R " + aLineItem.product.price.toFixed(2)
		);
		$("span.cart-item-vat", template).html("R " + aLineItem.vat().toFixed(2));
		$("span.cart-item-linetotal", template).html(
			"R " + aLineItem.lineTotal().toFixed(2)
		);

		template.removeClass("cart-item-template collapse").addClass("cart-row");
		$("div.cart-items").append(template);
	}

	PaintCart();

	//gave the coupon input form functionality
	$("button.redeem").click(function () {
		let voucher = $("input#inputCoupon").val();
		if (voucher === "AUG100") {
			myCart.discount = 100;
			//added PaintCart() so that the discount.total will immediately adjust when applied
			PaintCart();
			alert("Congratulations you got a R100 discount!");
			//added return false so that the form won't refresh the page on submit
			return false;
		}
		alert("Invalid coupon code! (Try 'AUG100')");
		myCart.discount = 0;
		PaintCart();
		return false;
	});

	//created a dropdown using Jquery
	let deliveryOptions = [
		{
			text: "Select",
			disable: true,
			value: null,
		},
		{
			text: "Collection",
			disable: false,
			value: 0,
		},
		{
			text: "Delivery",
			disable: false,
			value: 1,
		},
	];
	deliveryOptions.forEach(function (item) {
		let option = $("<option>")
			.attr("disabled", item.disable)
			.attr("value", item.value)
			.html(item.text);
		$("select#inputDelivery").append(option);
	});

	$("select#inputDelivery").change(function () {
		$("input[name='deliveryOption']").each(function (i, elem) {
			elem.checked = false;
		});
		if ($(this).val() === "1") {
			//show the delivery options
			$("div.deliveryOptions").show();
			return false;
		}
		//hide delivery options
		$("div.deliveryOptions").hide();
		//sets delivery total to R0 if the delivery options are hidden (collection is free)
		myCart.delivery = 0;
		PaintCart();
		return false;
	});

	//added chained animations
	$("input#checker").change(function () {
		let checked = this.checked;
		if (checked) {
			$("div#notifyUser").slideDown().fadeIn();
			return false;
		}
		if (!checked) {
			$("div#notifyUser").fadeOut().slideUp();
			return false;
		}
	});

	$("input[name='deliveryOption']").change(function () {
		let checked = this.checked;
		if (checked) {
			//sets the total delivery to the value of the checked radio button
			myCart.delivery = Number($(this).val());
			//recalculates totals immediately
			PaintCart();
			return false;
		}
		//if nothing is checked then total delivery = R0
		myCart.delivery = 0;
		PaintCart();
	});

	/*when the confirm order button is clicked on by the user checkOut() (line 112 in Cart.js) will be 
    called which will alert the user a generated order number for their purchase*/
	$("button.btn-purchase").click(function () {
		myCart.checkOut();
	});
});

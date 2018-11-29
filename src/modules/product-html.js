let _makeHtml = ({
	id,
	name,
	image_url,
	description,
	price,
	special_price
}) => {
	let $product = $(`<div class="card col-xs-10 col-sm-4 col-md-3  product text-center " data-product-id="${id}"  
		data-product-id="${id}" data-name="${name}"	data-img-url="${image_url}" data-price="${price}"data-special_price="${special_price}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="card-img-top product-image">`));
	$product.append($(`<span class=" card-title product-title">`).text(name));
	$product.append($('<div class="card1">'));
	$product.append($(`<div > <span class="badge card-title product-price">${price + "₴"}</span> 
		<span class="badge alert-warning card-title product-special_price"></span> 
		</div>`));
	$product.append($(`<div > <button class=" btn buy btn-success">Buy!</button>  
   		<button class="btn btn-primary info" type="button" data-toggle="collapse" data-target="#collapseExample${id}" aria-expanded="false" aria-controls="collapseExample">
   		info
   		</button>
	</div>`));
	if(special_price != null) {
	    $($product).find(".product-special_price").text(special_price + "₴");
	    $($product).find(".product-price").css('text-decoration','grey line-through');
  	};
  	$product.append($(`<div class="collapse scroll" id="collapseExample${id}">`).text(description));
	return $product;
};
 module.exports = _makeHtml;
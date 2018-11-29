let _makeHtml = ({
	id,
	ammount,
	name,
	image_url,
	price
}) => {
	let $product = $(`<div class="card  col-md-10  text-center cortitem" data-cortelemt-id="${id}" >`);
	$product.append($(`<div><button  class="btn btn-danger delete">×
	        </button></div>`))
	$product.append($(`<img src="${image_url}" alt="${name}" class="card-img-top product-image">`));
	$product.append($(`<span class=" card-title product-title">`).text(name));
	$product.append($(`<div > <span class="badge card-title product-price">${price + "₴"}</span> 
		</div>`));
	$product.append($(`<div > <button class=" btn minus">-</button>  
		<span class=" card-title">${ammount} </span>
   		<button class=" btn plus ">
   		+
   		</button>
	</div>`));
	return $product;
};
 module.exports = _makeHtml;
import './scss/main.scss';
import 'bootstrap';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
let _makeProduct = require('./modules/product-html');
jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});

let _makeCategory = require('./modules/category-html');
jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/category/list',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(product => $('.navbar-nav').append(_makeCategory(product)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
function getCartData(){
  return JSON.parse(localStorage.getItem('cart_products'));
}

$(document).on('click','[data-product-id] .buy',function(){
	var _cart_products=[];
	var $this = $(this);
	if(typeof window.localStorage.cart_products !== 'undefined' && window.localStorage.cart_products !== null){
		_cart_products=(getCartData());
	}
	var id = $this.closest('[data-product-id]').data('product-id');
    var name = $this.closest('[data-product-id]').data('name');
    var image_url = $this.closest('[data-product-id]').data('img-url');
    var price = $this.closest('[data-product-id]').data('price');
    var special_price = $this.closest('[data-product-id]').data('special_price');
    if(special_price!=null){price=special_price}
	var product = { id: id , ammount: 1, name:name ,image_url:image_url ,price:price };
	if(_cart_products.length == 0){
      _cart_products.push(product);
    }
    else{
      for (var i = 0; i< _cart_products.length;i++) {
        if(_cart_products[i].id == product.id){
          _cart_products[i].ammount++;
          break;
        }
        else if(i == (_cart_products.length -1)){
          _cart_products.push(product);
          break;
        }
      }
    }
    window.localStorage.setItem('cart_products' , JSON.stringify(_cart_products));
});


let _makeCartProducts = require('./modules/cortelem-html');
function makeCort(){
	$('.modal-body').empty();
	$('.errors').empty();
	$('.total').empty();
	var cart_products=getCartData();
	if(cart_products==null||cart_products.length==0){$('.modal-body').append(`<span> Cart is empty!!! Add new products</span>`)}
  	else{cart_products.forEach(product => $('.modal-body').append(_makeCartProducts(product)))
  	var res=result();
  	$('.d-flex').after(function() {
		  return "<div class="+'"'+"total text-center"+'"'+">" +"Total price: "+res+"грн"+ "</div>";
		})
  	};
}
$('.endcort').on('click',function(){
	makeCort();
});

$(document).on('click','[data-category-id] button',function(){
	var $this = $(this);
	$( ".card" ).remove();
	var id = $this.closest('[data-category-id]').data('category-id');
	var url1="https://nit.tron.net.ua/api/product/list/category/"+id;
	jQuery.ajax({
		url: url1,
		method: 'get',
	 	dataType: 'json',
	 	success: function(json){
			console.table(json);
	 		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});

});
$(document).on('click','[data-cortelemt-id] .minus',function(){
	var _cart_products=(getCartData());
	var id = $(this).closest('[data-cortelemt-id]').data('cortelemt-id');
      for (var i = 0; i< _cart_products.length;i++) {
        if(_cart_products[i].id == id){
        	if(_cart_products[i].ammount!=0){
        		_cart_products[i].ammount--;
        		 break;
        	}else{
        		break;
        	}
       	}
 	}
 	window.localStorage.setItem('cart_products' , JSON.stringify(_cart_products));
  	makeCort();
});
$(document).on('click','[data-cortelemt-id] .plus',function(){
		
	var _cart_products=(getCartData());
	var id = $(this).closest('[data-cortelemt-id]').data('cortelemt-id');
      for (var i = 0; i< _cart_products.length;i++) {
        if(_cart_products[i].id == id){
          _cart_products[i].ammount++;
          break;
      	}
 	}
 
 	window.localStorage.setItem('cart_products' , JSON.stringify(_cart_products));
  	makeCort();
});
function result(){
	var _cart_products=(getCartData());
	var sum=0;
  	for (var i = 0; i< _cart_products.length;i++) {
      	sum+=(_cart_products[i].price*_cart_products[i].ammount);
 	};
 	return sum;
};
$(document).on('click','[data-cortelemt-id] .delete',function(){
	var _cart_products=(getCartData());
	var id = $(this).closest('[data-cortelemt-id]').data('cortelemt-id');
	console.log(id);
      for (var i = 0; i< _cart_products.length;i++){
        if(_cart_products[i].id == id){
        	console.log(i);
          	_cart_products.splice(i, 1); 
      	}
 	}
 	window.localStorage.setItem('cart_products' , JSON.stringify(_cart_products));
  	makeCort();
});
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}
function isemail(c) {
  var re =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(c);
}
$(".formend").on('click',function(){
	$('.errors').empty();
	var _cart_products=getCartData();
	var token="PO88AItcUkIBq4_mDxdW";
	var name =$( "#name" ).val();
	var phone="+380"+$( "#phone" ).val();
	var email=$( "#email" ).val()+".com";
	var result =" name="+name+"&email="+email+"&phone="+phone;
    if(_cart_products==null) {
     $('.errors').append(`<span class="text-danger">Add products to the cart to make an odrer!</span>`)
      return;
    }
     if(!isLetter(name)){   	
    	$('.errors').append(`<span class="text-danger">Invalid name entered</span>`)
      return;
    };
    if(!isNumeric(phone)){
    	$('.errors').append(`<span class="text-danger">Incorrectly entered phone number!</span>`)
      return;
    };
   
     if(!isemail(email)){  
     $('.errors').append(`<span class="text-danger">Invalid email address entered!</span>`) 	
      return;
    };
    for(var i = 0; i < _cart_products.length ; i++){
      if(_cart_products[i].ammount > 0){
        result+="&products["+_cart_products[i].id+"]="+_cart_products[i].ammount;
      }
    }
    result+="&token="+token;
	localStorage.clear();
	makeCort();
	$.ajax({
    url: 'https://nit.tron.net.ua/api/order/add',
    method: 'post',
    data:result,
    dataType: 'json',
    success: function(json){
        console.log(json);
    },error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});
});

let _makeHtml = ({
	id,
	name,
}) => {
	let $product = $(`<li class="nav-item"  data-category-id="${id}"> <button class="nav-link categ btn" >${name}</button></li>`);
	return $product;
};
 module.exports = _makeHtml;
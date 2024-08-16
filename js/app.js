import { url } from "./common.js";
export const getCategories = async (limit = 6) => {
    let data = await fetch(`${url}/categories/?_sort=id&order=desc&_limit=${limit}`)
        .then((res) => res.json())
        .then((data) => data);
    let html = "";
    data.forEach((category, index) => {
        html += `<a class="nav-link ${index == 0 ? 'active' : ''}" id="v-pills-${category.id}-tab" data-toggle="pill" href="#v-pills-${category.id}" role="tab" aria-controls="v-pills-${category.id}" aria-selected="true">${category.name}</a>`;
    });
    return html;
};
export const getProducts = async (limit = 6) => {
    let categories = await fetch(`${url}/categories/?_sort=id&order=desc&_limit=${limit}`)
        .then((res) => res.json())
        .then((data) => data);
    let html = "";
    // Vòng lặp for cho phép bạn sử dụng await bên trong nó, đảm bảo rằng mỗi lần gọi fetch để lấy sản phẩm được hoàn thành trước khi tiếp tục với danh mục tiếp theo.
    let index = 0;
    for (const category of categories) {
        let products = await fetch(`${url}/products/?category_id=${category.id}`)
            .then((res) => res.json())
            .then((data) => data);
        html += `<div class="tab-pane fade ${index == 0 ? 'show active' : ''}" id="v-pills-${category.id}" role="tabpanel" aria-labelledby="v-pills-${category.id}-tab">
                    <div class="row">`;
        products.forEach((product) => {
            html += `<div class="col-md-3">
                        <div class="menu-entry">
                            <a href="product-single.html?id=${product.id}" class="img" style="background-image: url(./assets/images/${product.image});"></a>
                            <div class="text text-center pt-4">
                                <h3><a href="product-single.html?id=${product.id}">${product.name}</a></h3>
                                <p>${product.intro}</p>
                                <p class="price"><span>${product.price}</span></p>
                                <p><a href="cart.html" class="btn btn-primary btn-outline-primary">Add to Cart</a></p>
                            </div>
                        </div>
                    </div>`;
        });
        html += `</div>
                </div>`;
        index++;
    }
    return html;
};
// begin: chức năng hiển thị chi tiết sản phẩm ở trang chi tiết sản phẩm
export const getProductsById = async (id) => {
    // gọi API và đón nhận dữ liệu res và chuyển về dạng JSON, sau đó then lần nữa để trả về data
    let product = await fetch(`${url}/products/?id=${id}`)
        .then((res) => res.json())
        .then((data) => data[0]);
    let html = `<section class="ftco-section">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 mb-5 ftco-animate fadeInUp ftco-animated">
                                <a href="./assets/images/${product.image}" class="image-popup"><img src="./assets/images/${product.image}" class="img-fluid" alt="${product.name}"></a>
                            </div>
                            <div class="col-lg-6 product-details pl-md-5 ftco-animate fadeInUp ftco-animated">
                                <h3>${product.name}</h3>
                                <p class="price"><span>$${product.price}</span></p>
                                <p>${product.intro}</p>
                                <p>${product.desc}</p>
                                    <div class="row mt-4">
                                        <div class="col-md-6">
                                            <div class="form-group d-flex">
                                <div class="select-wrap">
                                <div class="icon"><span class="ion-ios-arrow-down"></span></div>
                                    <select name="" id="" class="form-control">
                                        <option value="">Small</option>
                                        <option value="">Medium</option>
                                        <option value="">Large</option>
                                        <option value="">Extra Large</option>
                                    </select>
                                </div>
                            </div>
                        </div>
					    <div class="w-100"></div>
					    <div class="input-group col-md-6 d-flex mb-3">
                            <span class="input-group-btn mr-2">
                                <button type="button" class="quantity-left-minus btn"  data-type="minus" data-field="">
                                <i class="icon-minus"></i>
                                </button>
                            </span>
                            <input type="text" id="quantity" name="quantity" class="form-control input-number" value="1" min="1" max="100">
                            <span class="input-group-btn ml-2">
                                <button type="button" class="quantity-right-plus btn" data-type="plus" data-field="">
                                <i class="icon-plus"></i>
                            </button>
                            </span>
	          	        </div>
          	        </div>
          	        <p><a href="cart.html" class="btn btn-primary py-3 px-5">Add to Cart</a></p>
    			    </div>
    		    </div>
    	    </div>
            </section>`;
    html += await getRelatedProducts(product.category_id);
    return html;
};
// begin: chức năng hiển thị sản phẩm liên quan ở trang chi tiết sản phẩm
const getRelatedProducts = async (category_id) => {
    // gọi API và đón nhận dữ liệu res và chuyển về dạng JSON, sau đó then lần nữa để trả về data
    let products = await fetch(`${url}/products/?category_id=${category_id}`)
        .then((res) => res.json())
        .then((data) => data);
    let html = `<section class="ftco-section"><div class="container">
    		<div class="row justify-content-center mb-5 pb-3">
			<div class="col-md-7 heading-section ftco-animate fadeInUp ftco-animated text-center">
				<span class="subheading">Discover</span>
				<h2 class="mb-4">Related products</h2>
				<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
			</div>
			</div>
			<div class="row">`;
    products.forEach((product) => {
        html += `<div class="col-md-3">
					<div class="menu-entry">
							<a href="#" class="img" style="background-image: url(./assets/images/${product.image});"></a>
							<div class="text text-center pt-4">
								<h3><a href="product-single.html?id=${product.id}">${product.name}</a></h3>
								<p>${product.intro}</p>
								<p class="price"><span>$${product.price}</span></p>
								<p><a href="#" class="btn btn-primary btn-outline-primary">Add to Cart</a></p>
							</div>
						</div>
				</div>`;
    });
    html += `</div>
    	</div>
        </section>`;
    return html;
};

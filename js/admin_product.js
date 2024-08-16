import { url } from "./common.js";
// begin: chức năng hiển thị danh sách sản phẩm
export const getProductList = async () => {
    // gọi API và đón nhận dữ liệu res và chuyển về dạng JSON, sau đó then lần nữa để trả về data
    let data = await fetch(`${url}/products`).then(res => res.json()).then(data => data);
    let arr = data;
    let html = ``;
    arr.forEach(product => {
        html += productHtml(product);
    });
    html = `<div id="product_list" class="listnhasx">
            <h2>
                <a href="add_product.html" class="float-end">Add product</a>
            </h2>
            <div id="data">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Tên Sản Phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Chức Năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${html}
                    </tbody>
                </table>
            </div>
            </div>`;
    return html;
};
const productHtml = (product) => {
    return `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>
                <img width="50" src="./assets/images/${product.image}">
                </td>
                <td>${product.price}</td>
                <td>${product.status == true ? "Show" : "Hide"}</td>
                <td>
                    <a href="edit_product.html?id=${product.id}" class="btn btn-warning px-3 me-1">Edit</a>
                    <button idpro="${product.id}" class="btn btn-danger px-3 btnxoa">Delete</button>
                </td>
            </tr>`;
};
// begin: chức năng thêm sản phẩm
export const form_add_product = async () => {
    // lấy danh sách nhà sản xuất
    let categories = await getAllCategories();
    let optionCategories = ``;
    categories.forEach(category => optionCategories += `<option value='${category.id}'>${category.name}</option>`);
    return `<h2>
                Add product
            </h2>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control border-primary" id="name">
                </div>
                <div class="mb-3">
                    <label for="category_id" class="form-label">Type</label>
                    <select id="category_id" class="form-control border-primary">${optionCategories}</select>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control border-primary" id="price">
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Image</label>
                    <input type="text" class="form-control border-primary" id="image">
                </div>
                <div class="mb-3">
                    <label for="created_date" class="form-label">Created date</label>
                    <input type="date" class="form-control border-primary" id="created_date">
                </div>
                <div class="mb-3">
                    <label for="intro" class="form-label">Intro</label>
                    <input type="text" class="form-control border-primary" id="intro">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control border-primary" id="description">
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="status" id="hide" value="0">
                    <label class="form-check-label" for="hide">
                        Hide
                    </label>
                    <input class="form-check-input" type="radio" name="status" id="show" value="1" checked>
                    <label class="form-check-label" for="show">
                        Show
                    </label>
                </div>
                <button id="btn" class="btn btn-primary px-3" type="button">Add</button>
            </form>`;
};
export const add_product = async () => {
    let name = document.querySelector('#name').value;
    let category_id = Number(document.querySelector('#category_id').value);
    let price = Number(document.querySelector('#price').value);
    let image = document.querySelector('#image').value;
    let intro = document.querySelector('#intro').value;
    let description = document.querySelector('#description').value;
    let created_date = document.querySelector('#created_date').value;
    let status = Number(document.querySelector('[name=status]:checked').value);
    let data = { name: name, category_id: category_id, price: price, image: image, intro: intro, description: description, created_date: created_date, status: status };
    let opt = { method: 'post', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } };
    let result = await fetch(url + `/products/`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_product.html';
};
// begin: chức năng sửa sản phẩm
export const form_edit_category = async (id) => {
    // gọi API và đón nhận dữ liệu res và chuyển về dạng JSON, sau đó then lần nữa để trả về data
    let category = await fetch(`${url}/categories/?id=${id}`).then(res => res.json()).then(data => data[0]);
    return `<h2>
                Edit category
            </h2>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control border-primary" id="name" value="${category.name}">
                </div>
                <div class="mb-3">
                    <label for="position" class="form-label">Position</label>
                    <input type="number" class="form-control border-primary" id="position" value="${category.position}">
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="status" id="hide" value="0" ${category.status == 0 ? 'checked' : ''}>
                    <label class="form-check-label" for="hide">
                        Hide
                    </label>
                    <input class="form-check-input" type="radio" name="status" id="show" value="1" ${category.status == 1 ? 'checked' : ''}>
                    <label class="form-check-label" for="show">
                        Show
                    </label>
                </div>
                <input type="hidden" id="id" value="${id}">
                <button id="btn" class="btn btn-primary px-3" type="button">Update</button>
            </form>`;
};
export const edit_category = async () => {
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let position = Number(document.querySelector('#position').value);
    let status = Number(document.querySelector('[name=status]:checked').value);
    let data = { name: name, position: position, status: status };
    console.log(id);
    let opt = { method: 'put', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } };
    let result = await fetch(url + `/categories/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_category.html';
};
// begin: chức năng xoá sản phẩm
export const deleteProduct = async (btn) => {
    let id = btn.getAttribute('idpro');
    let confirm = window.confirm('Are you sure?');
    if (confirm == false)
        return;
    let opt = { method: 'delete' };
    let result = await fetch(url + `/products/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_product.html';
};
const getAllCategories = async () => {
    // gọi API và đón nhận dữ liệu res và chuyển về dạng JSON, sau đó then lần nữa để trả về data
    return fetch(`${url}/categories`).then(res => res.json()).then(data => data);
};

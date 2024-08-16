import { url, TCategory } from "./common.js";

// begin: chức năng hiển thị danh sách danh mục
export const getCategoryList = async () => {
    // gọi API và đón nhận dữ liệu res và chuyển về dạng JSON, sau đó then lần nữa để trả về data
    let data = await fetch(`${url}/categories`).then(res => res.json()).then(data => data);
    let arr:TCategory[] = data as TCategory[];
    
    let html = ``;
    arr.forEach(category => {
        html += categoryHtml(category);
    });
    html = `<div id="category_list" class="listnhasx">
            <h2>
                <a href="add_category.html" class="float-end">Add Category</a>
            </h2>
            <div id="data">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Tên Sản Phẩm</th>
                            <th scope="col">Vị trí</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Chức Năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${html}
                    </tbody>
                </table>
            </div>
            </div>`
    return html;
}

const categoryHtml = (category:TCategory) => {
    return `<tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${category.position}</td>
                <td>${category.status == 1 ? "Show" : "Hide"}</td>
                <td>
                    <a href="edit_category.html?id=${category.id}" class="btn btn-warning px-3 me-1">Edit</a>
                    <button idnsx="${category.id}" class="btn btn-danger px-3 btnxoa">Delete</button>
                </td>
            </tr>`;
} 

// begin: chức năng thêm danh mục
export const form_add_category = () => {
    return `<h2>
                Add category
            </h2>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control border-primary" id="name">
                </div>
                <div class="mb-3">
                    <label for="position" class="form-label">Position</label>
                    <input type="number" class="form-control border-primary" id="position">
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
}

export const add_category = async () => {
    let name:string = (document.querySelector('#name') as HTMLInputElement).value;
    let position:number = Number((document.querySelector('#position') as HTMLInputElement).value);
    let status:number = Number((document.querySelector('[name=status]:checked') as HTMLInputElement).value);

    let data = { name: name, position: position, status: status}
    let opt = { method: 'post', body: JSON.stringify(data), headers: {'Content-type': 'application/json' }};
    let result = await fetch(url + `/categories/`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_category.html'
}

// begin: chức năng sửa danh mục
export const form_edit_category = async (id: number) => {
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
                    <input class="form-check-input" type="radio" name="status" id="hide" value="0" ${category.status==0?'checked':''}>
                    <label class="form-check-label" for="hide">
                        Hide
                    </label>
                    <input class="form-check-input" type="radio" name="status" id="show" value="1" ${category.status==1?'checked':''}>
                    <label class="form-check-label" for="show">
                        Show
                    </label>
                </div>
                <input type="hidden" id="id" value="${id}">
                <button id="btn" class="btn btn-primary px-3" type="button">Update</button>
            </form>`;
}

export const edit_category = async () => {
    let id:string = (document.querySelector('#id') as HTMLInputElement).value;
    let name:string = (document.querySelector('#name') as HTMLInputElement).value;
    let position:number = Number((document.querySelector('#position') as HTMLInputElement).value);
    let status:number = Number((document.querySelector('[name=status]:checked') as HTMLInputElement).value);

    let data = { name: name, position: position, status: status}
    console.log(id);
    let opt = { method: 'put', body: JSON.stringify(data), headers: {'Content-type': 'application/json' }};
    let result = await fetch(url + `/categories/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_category.html';
}

// begin: chức năng xoá danh mục
export const deleteCategory = async (btn: HTMLButtonElement) => {
    let id:string = btn.getAttribute('idnsx');
    let confirm: boolean = window.confirm('Are you sure?');
    if(confirm==false) return;

    let opt = { method: 'delete' }
    let result = await fetch(url + `/categories/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'admin_category.html'
}
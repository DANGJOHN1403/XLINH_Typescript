const url = `http://localhost:3000`;
class CProduct {
    id;
    category_id;
    name;
    price;
    image;
    description;
    status;
    created_date;
    constructor(id, category_id, name, price, image, description, status, created_date) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.status = status;
        this.created_date = created_date;
    }
}
export { url, CProduct };

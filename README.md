# Xây dựng website bán trà sữa XLinh

## Cài đặt

Nếu bạn chưa cài json-server thì tại terminal các bạn chạy dòng lệnh dưới đây để cài đặt json-server:

```
npm install -g json-server
```

## Tạo một file db.json và chạy Json Server: 

- Bước 1: Tạo file db.json tại thư mục /db, bạn có thể tham khảo file db.json đã tạo tại thư mục /db
- Bước 2: Chạy lệnh bên dưới:

```
json-server --watch db.json 
```
- Bước 3: Thử chạy API của Json Server tại địa chỉ:

```
http://localhost:3000/products
http://localhost:3000/categories
http://localhost:3000/users
```

## Viết code với TypeScript: 

- Bước 1: Tạo file *.ts trong thư mục /src để viết code
- Bước 2: Sau đó chạy lệnh `tsc` để dịch các file *.ts trong thư mục /src sang thư mục /js

## Run site:
- Mở file index.html và mở file với Live Server.

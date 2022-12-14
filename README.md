# Tesse-Entrance-Test

Đây là bài làm đầu tiên trong tổng 2 bài test đầu vào Backend mà Tesse đã đưa ra.

Chương trình được viết với techstacks như sau:\
  Framework: ExpressJS, NodeJS\
  Database: MongoDB, Mongoose\
  User authentication: JWT\
  RESTful API Documentation: SwaggerUI (Các path của API được lưu trong file swagger.yml)
  

Cách chạy chương trình:
  
  Cách 1: Chạy chương trình trên localhost
    Trong màn hình Command Line, tại đường dẫn của thư mục Tesse-Entrance-Test\
    Chạy lần lượt các câu lệnh sau\
    `cd src`\
    `node index.js`\
    Chương trình sẽ được mở ra tại localhost:3000 hoặc 127.0.0.1:3000\
    Để truy cập vào giao diện Swagger, thêm chuỗi '/api-docs' vào cuối đường dẫn
    
  Cách 2: Chạy chương trình bằng Docker\
    Trong màn hình Command Line, tại đường dẫn của thư mục Tesse-Entrance_Test\
    Chạy câu lệnh\
    `docker-compose up`\
    Docker sẽ tiến hành tạo ra một image từ file Dockerfile và tải về các tập tin image cần thiết để tạo ra container\
    Sau đó Docker sẽ tìm vào file docker-compose.yml và tạo ra 2 services đó là web và mongodb\
      + web sẽ là chương trình mà ta đã xây dựng sử dụng framework ExpressJS\
      + mongodb là cơ sở dữ liệu MongoDB\
    Chương trình đã được trong Docker sẽ được map vào port 3000, ta có thể truy cập chương trình qua đường dẫn localhost:3000 hoặc 127.0.0.1:3000\
    Tương tự như ở localhost, giao diện Swagger có thể được truy cập khi thêm '/api-docs' vào cuối đường dẫn chương trình

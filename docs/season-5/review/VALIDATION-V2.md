# Kiểm tra remake V2

Ngày 03/11/2026. Phạm vi: prototype HTML/CSS/JS local, không phải bản phát hành website chính.

Chrome DevTools, 8 viewport: 320×568, 375×667, 390×844, 768×1024, 1024×768, 1280×900, 1440×1080, 1920×1080. Dữ liệu đo: [v2-browser-checks.json](v2-browser-checks.json).

| Kiểm tra | Kết quả ở cả 8 viewport |
| --- | --- |
| Dashboard, Wiki, tài nguyên | Document không tràn ngang |
| CP | 15 giá trị / trạng thái CP trong khung riêng: 3 podium, 8 roster, 4 KE |
| Liên minh | Đủ 8 hàng / 8 cờ, thêm 3 huy hiệu podium; tổng CP tính từ JSON là 214,203,903,562 |
| Wiki | 7 chuyên mục + tất cả; `precision parts` có 3 kết quả trong manifest |
| Lọc kết hợp | Chọn archive S4 khi còn tìm `precision parts` có 0 kết quả; xóa từ khóa thấy đủ 8 bài S4 |
| Phân trang | Xem thêm chuyển 12 → 24 tài liệu |
| Hồ sơ | Chọn bài cập nhật tiêu đề và link chính xác tới Wiki hiện có |
| Không kết quả | Hiện trạng thái rỗng, ẩn hồ sơ cũ |
| Global search | 3 kết quả, dialog nằm trong viewport và không tràn ngang |
| Form | Dialog trong viewport, không tràn ngang, không trường thiếu label, 3 radio card |
| Assets | 4 nhóm / 8 link tải, tài nguyên giữ nguyên |

Kiểm tra tương tác thêm: gửi form rỗng focus vào tiêu đề bắt buộc; chọn loại giao diện và điền dữ liệu hợp lệ hiển thị trạng thái mô phỏng; Esc đóng dialog và trả focus về nút góp ý. Không gọi backend. Sau chỉnh phân trang, focus được chuyển tới bài đầu tiên vừa thêm.

Đã xem hình trực tiếp Dashboard desktop 1440 px và mobile 390 px, podium / roster mobile, Wiki desktop và mobile, form mobile. Console không có warning / error trong phiên kiểm tra. Không lưu được screenshot ra file bằng Chrome MCP do giới hạn đường dẫn của công cụ; hình đã được xem trực tiếp từ kết quả screenshot.

Node kiểm tra cú pháp script thành công. Các file production được Git theo dõi chưa thay đổi. Chưa kiểm thử nội dung markdown / calculator trong trình đọc mới, 6 locale, zoom 200%, contrast toàn bộ hay gửi góp ý thật; các phần đó nằm ở bước tích hợp production.

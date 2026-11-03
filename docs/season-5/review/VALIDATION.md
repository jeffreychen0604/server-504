# Kiểm tra prototype Season 5 V1

Ngày: 03/11/2026. Phạm vi: prototype local, không phải bản phát hành production.

## Kiểm tra trên trình duyệt

Chrome DevTools, các viewport 320×568, 375×667, 390×844, 768×1024, 1024×768, 1280×900, 1440×1080 và 1920×1080.

| Kiểm tra | Kết quả ở cả 8 viewport |
| --- | --- |
| Dashboard | Không tràn ngang document; 12 giá trị CP / trạng thái CP trong khung riêng |
| Roster | Đủ 8 liên minh, 8 cờ hiển thị; đọc từ JSON hiện có |
| Responsive art | Mobile chọn ảnh dọc, desktop chọn ảnh ngang; ảnh decode thành công |
| Wiki | Đủ 7 category hiện có, không tràn ngang document |
| Thư viện | 4 nhóm ảnh, không tràn ngang document |
| Tìm kiếm `precision parts` | 3 kết quả trong title / description manifest; không tràn hộp thoại |
| Form | Trong viewport, không tràn ngang, trường có label, dialog và nút đóng có tên |

Số kết quả tìm kiếm prototype có thể khác website production, vì prototype chỉ tra title / description trong manifest; production còn tìm trong nội dung bài.

Đã xem hình Dashboard thực tế ở desktop 1440 px và mobile 390 px; đã điều chỉnh để phần ghi chú nhỏ không đè lên tranh và tăng cỡ số CP mobile. Bảng số liệu giữ tên có thể wrap, CP không bị cắt.

Các chỉ số kiểm tra tự động của trình duyệt được lưu trong `browser-checks.json`.

## Kiểm tra tài nguyên và nguồn

- 8 bản xuất web: 457.259 bytes, khoảng 447 KiB; hash / kích thước trong manifest.
- Huy hiệu WebP có alpha từ 0 đến 255, pixel góc trong suốt; PNG gốc được giữ trong masters.
- Các tài nguyên raster là 4 hình tạo bằng built-in image_gen, có lưu toàn bộ prompt và vai trò ảnh tham chiếu.
- Các biểu tượng giao diện là SVG native; 6 symbol, không có chữ raster.
- `node --check` đạt cho script prototype và server preview.
- `validate-entrypoint.py` của website hiện tại đạt. Không sửa entrypoint, server-status JSON, các sửa lỗi UI hiện hữu hay workflow deploy.

## Giới hạn để tránh nhầm với kiểm định production

Prototype minh họa art direction, bố cục, responsive và thao tác cơ bản. Hiện dùng tiếng Việt và tìm kiếm manifest. Chưa tích hợp article reader, calculator, i18n 6 locale, dữ liệu Season 5 chính thức hoặc luồng gửi feedback thật. Không dùng kết quả prototype này để tuyên bố các phần production đó đã được kiểm định.

Giai đoạn triển khai phải thực hiện đầy đủ checklist trong PLAN.md, gồm focus / keyboard, contrast, zoom, bảng bài viết, Turnstile và các trạng thái gửi thực tế.

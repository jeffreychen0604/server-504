# Kiểm tra UI remake V3

Phạm vi: preview local dùng layout và runtime nội dung của website hiện tại. Không deploy và không gửi form thật.

## Bố cục được giữ

- Dùng shell, sidebar, route và thứ tự section từ `index.html` / `dashboard.js` production.
- Header và sidebar desktop giữ chiều rộng / vị trí; KE–liên minh giữ tỉ lệ cột và breakpoint xếp dọc cũ.
- Wiki giữ lưới category và browser bên dưới; form giữ đủ loại góp ý, tiêu đề, nội dung, danh tính và liên hệ.
- Không có lobby ngang, dock đáy, podium, mission board hoặc workspace Wiki V2.
- Kích thước chữ, gờ nút và viền có thể làm thay đổi chiều cao component; không đặt mục tiêu so khớp pixel với UI cũ.

## Trình duyệt

Chrome DevTools, 8 viewport: 320×568, 375×667, 390×844, 768×1024, 1024×768, 1280×900, 1440×1080, 1920×1080. [Số đo và locale smoke checks](v3-browser-checks.json).

| Kiểm tra | Kết quả |
| --- | --- |
| Dashboard / Wiki | Không tràn ngang ở cả 8 viewport |
| CP | 12 giá trị / trạng thái CP nằm trong ô riêng, không bị cắt |
| Roster | Đủ 8 liên minh / 8 cờ; 8 khiên thứ hạng; không thêm podium |
| Wiki | 7 chuyên mục + tất cả; 8 huy hiệu SVG; giữ grid hiện tại |
| Tìm kiếm | Query `precision parts` trả 16 kết quả từ search runtime production, dialog không tràn |
| Form | 5 trường hiển thị có label; hộp thoại trong viewport và không tràn ngang |
| 6 locale | EN / FR / ES / PT / KO / VI ở 1440 và 390 px: CP, cờ, Wiki và form không tràn; nút đóng có nhãn theo locale |
| Form rỗng | Native validation focus vào tiêu đề bắt buộc |
| Form hợp lệ | Hiện hoàn tất mô phỏng; feedback runtime thật không được nạp, guard ở capture phase chặn gửi |
| Esc / focus | Đóng dialog và trả focus về nút `mobileContribute` |
| Console | Không warning / error trong phiên cuối |

Đã xem hình trực tiếp Dashboard desktop, Wiki desktop / mobile và form mobile. Bản preview không tải stylesheet S4, sakura hoặc artwork runtime cũ; dùng stylesheet geometry riêng và bộ paint component V3. Đã kiểm cú pháp 3 script mới và validator entrypoint production. `git diff --exit-code` xác nhận các file tracked production chưa thay đổi.

Chưa phải full regression của toàn bộ bài Wiki / calculator, zoom 200%, contrast hoặc backend. Những kiểm tra này thực hiện khi tích hợp và phát hành. Nội dung S4 / sự kiện / số liệu vẫn theo nguồn gốc, không suy diễn thành dữ liệu Season 5.

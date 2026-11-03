# Kiểm tra component V3.2

Phạm vi: preview local. Không deploy, không gửi form thật. [Số đo trình duyệt](v3.2-browser-checks.json).

- 8 viewport: 320×568, 375×667, 390×844 (DPR 3), 768×1024, 1024×768, 1280×900, 1440×1080, 1920×1080. Dashboard, Wiki, form và tìm kiếm không tràn ngang. 12 giá trị / trạng thái CP nằm trong ô tương ứng, đủ 8 cờ liên minh.
- Wiki đủ 8 thẻ / 8 icon; chọn chuyên mục mở đúng một panel. Khung trang trí có `aria-hidden` và `pointer-events:none`, được tạo một lần trên mỗi component.
- 6 locale EN / FR / ES / PT / KO / VI kiểm ở 1440 và 390 px: Dashboard / Wiki / form không tràn, CP không bị cắt, nhãn đóng form đúng ngôn ngữ; nút đóng 44×44 px.
- Sau phản hồi khung lồng khung: Capital có 0 khung chạm bên trong và border 0; copy nằm giữa, không tràn ở 8 viewport. Tài sản dùng chung kiểm lại 6 locale ở 1440 / 390: text Capital / Armory không tràn; watermark cờ lặp đã ẩn.
- Đã xem trực tiếp Dashboard, phần Tài sản dùng chung, Wiki và form trên desktop / mobile. Khung ngoài co giãn theo 9 phần; các góc không bị kéo theo chiều dài panel. Panel có khoảng đệm bảo vệ dữ liệu khỏi hoa văn.
- Sửa vị trí dialog thành fixed: tìm kiếm nằm trong viewport sau khi trang cuộn, không theo tọa độ nội dung bên dưới. Mở bằng nút Tìm trong Wiki, từ khóa `precision parts` trả 16 kết quả trên mobile, không tràn ngang.
- Form rỗng focus vào `contributionTitle`; nhập hợp lệ trả trạng thái mô phỏng. Runtime feedback thật và Turnstile không tải trong preview.
- Bão cát giữ 1 canvas: desktop 780 hạt + 11 mảng bụi, mobile 300 + 6, DPR mobile 1. Mở form dừng vẽ, đóng tiếp tục; reduced-motion dừng frame counter và trả 0 animation.
- Hai WebP mới tổng 171.106 bytes, có alpha 0–255. Master PNG không sửa; chỉ resize / đổi định dạng. Export script và package xác minh kích thước / hash manifest; ZIP kiểm CRC.
- Console phiên kiểm cuối không có warning / error. Cú pháp script, entrypoint validator đạt. File production tracked và dữ liệu server không đổi.

Layout ở đây là vị trí / thứ tự section, không phải các tọa độ pixel của V3.1: panel có padding mới, header / thẻ Wiki cao hơn, hai Capital đổi cách xếp nội bộ thành bệ huy hiệu. Không có benchmark điện thoại thật, audit contrast / zoom 200%, full calculator regression hay kiểm backend góp ý thật trong lượt này. Handler tab ẩn đã có từ V3.1, chưa assert trực tiếp.

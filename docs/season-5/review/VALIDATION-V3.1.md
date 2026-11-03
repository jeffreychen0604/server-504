# Kiểm tra visual / animation V3.1

Phạm vi: preview local. [Số đo](v3.1-browser-checks.json). Không deploy hoặc gửi form thật.

- Giữ layout V3: đo 9 vùng ở desktop 1440 px / VI trước và sau cho cùng tọa độ / kích thước, sau khi entrance hoàn tất.
- Sau bổ sung animation: kiểm lại 8 viewport 320–1920 px, Dashboard / Wiki / search / form không tràn ngang; 12 giá trị / trạng thái CP nằm trong ô riêng, đủ 8 cờ và 8 biểu tượng Wiki.
- Sau yêu cầu phủ toàn trang: runtime dùng 1 canvas hiển thị và 1 nút ambient qua Dashboard / Wiki; đã bỏ canvas riêng của hero. Mật độ ở lượt này là 66 / 158 hạt, được tăng trong lượt bão cát dày bên dưới. Thử mobile DPR 3: canvas vẫn chỉ 390×844, DPR thực tế 1.
- Nút tắt làm frame counter đứng yên; bật tiếp tục vẽ. Tắt rồi reload vẫn giữ lựa chọn tắt. Mở form hoặc search dừng vẽ, đóng lại tiếp tục.
- Reduced-motion: frame counter không tăng và `document.getAnimations()` trả 0. Nút ambient vô hiệu theo cài đặt này.
- Đã thấy entrance 420 ms, CP 650 ms qua Web Animations API. Sau 1100 ms chỉ còn hai animation vành huy hiệu trong vùng nội dung. Chọn chuyên mục Wiki chạy transition riêng.
- Đã kiểm nhãn ambient đủ EN / FR / ES / PT / KO / VI và không tràn nút. Nút có vùng bấm 44 px, dùng được trong menu mobile.
- Đã xem trực tiếp Dashboard desktop và menu mobile. Console không có warning / error trong phiên cuối. Cú pháp script và validator entrypoint đạt; các file tracked production chưa sửa.

Handler `visibilitychange` dừng vẽ khi tab ẩn có trong runtime. Công cụ trình duyệt giữ target ở trạng thái visible khi chuyển target nên phần tab ẩn chưa được assert trực tiếp. Không có benchmark trên điện thoại thật, full contrast / zoom hoặc full regression calculator trong lần này.

Bộ hình raster được giữ nguyên. Gói thiết kế kiểm hash / kích thước manifest và CRC ZIP khi đóng gói lại.

## Bổ sung: gió cát toàn trang

- Đã xem Dashboard desktop 1440×1080 ở vùng bảng liên minh / Capital sau khi cuộn và Wiki mobile 390×844. Hạt gió hiển thị phía trên component, sidebar và header; chữ vẫn đọc được.
- Layer fixed tại (0,0), phủ vùng nội dung viewport cả trước và sau cuộn. Lấy mẫu pixel canvas thấy hiệu ứng trong cả ba dải trên / giữa / dưới; không còn giới hạn phía artwork của hero.
- `pointer-events:none`; hit testing đi xuyên lớp hiệu ứng đến nội dung bên dưới. Không tràn ngang ở hai viewport kiểm lại.
- Tắt bằng nút: frame counter đứng yên. Form góp ý và tìm kiếm đều tạm dừng / ẩn ambient, đóng lại tiếp tục. Reduced-motion: không vẽ, layer ẩn, 0 animation.
- Số đo 8 viewport và geometry V3.1 trong JSON trước đó thuộc lượt kiểm trước thay đổi này; lượt bổ sung tập trung vào coverage và lifecycle của ambient.

## Bổ sung: bão cát dày

- Tăng lên 780 hạt + 11 mảng bụi trên desktop, 300 + 6 trên mobile; thêm màn sương cát, 3 dải gió và biến thiên tốc độ theo đợt. Một bitmap bụi thủ tục nhỏ được tạo một lần để tái sử dụng, không thêm tài nguyên tải mạng.
- Đã xem Dashboard 1440×1080 và Wiki 390×844 với lớp bão mới. Không tràn ngang; canvas hiển thị vẫn chỉ một, DPR mobile giữ 1.
- Tắt bằng nút dừng frame counter. Form mở làm lớp bão ẩn / dừng, đóng lại tiếp tục. Reduced-motion ẩn lớp bão, frame counter đứng yên và 0 animation.
- Quan sát ngắn trên desktop đạt khoảng 25 lần vẽ / giây trong phiên kiểm; đây không phải benchmark điện thoại thật.

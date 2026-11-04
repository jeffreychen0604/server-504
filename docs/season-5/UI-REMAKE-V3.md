# UI remake V3 — game interface, layout hiện tại

**Bản hiện tại: V3.3.** Phòng chỉ huy sa mạc theo mockup được duyệt: mặt đá viền kim loại, bảng tên đồng rèn, bệ tượng Capital và ô Armory có số / trạng thái. Giữ cấu trúc section V3 và bão cát toàn trang.

V3.3 giữ cờ và dữ liệu thật; chữ / CP / nút là HTML, không nhúng screenshot vào giao diện. Ba asset mới ở `assets/season-5/command-ui/`, có manifest hash và prompt nguồn. Hình đá dùng 9-slice để giữ cạnh khi component đổi kích thước. KE tách hai mặt đá với VS ở giữa; metadata của đối thủ có nền chìm riêng. Điều hướng dùng icon SVG chức năng, active xanh ngọc; Wiki và Guides cùng hệ chất liệu. Tiêu đề lớn dùng serif để gần mockup, chữ đọc dài giữ font hệ thống có hỗ trợ sáu ngôn ngữ. Bụi vẫn phủ toàn trang và giữ số hạt nhưng giảm độ đục lớp sương để đọc dữ liệu rõ hơn. [Kết quả kiểm tra V3.3](review/VALIDATION-V3.3.md).

Yêu cầu: **giữ bố cục website cũ, remake component để có cảm giác giao diện game**. Bộ hình Season 5 đã được chọn và giữ nguyên.

## Phạm vi cố định

- Header / tìm kiếm / chọn ngôn ngữ ở trên; sidebar và menu mobile giữ vị trí.
- Dashboard giữ banner → status strip → sự kiện khi có dữ liệu hợp lệ → KE và liên minh → Capital / Armory → thông báo / migration → quick access.
- KE và liên minh giữ hai cột trên desktop và thứ tự xếp dọc cũ khi hẹp; không thêm podium.
- Wiki giữ header, bảng quy tắc đọc, lưới chuyên mục và danh sách bài bên dưới; không chia lại thành workspace.
- Form giữ loại đóng góp, tiêu đề, nội dung, danh tính, liên hệ và thao tác gửi; không đổi thành luồng nhiệm vụ.
- Giữ tên, dữ liệu, route và 6 locale; không đổi thông tin mùa từ ảnh tham chiếu.

## Thiết kế component

| Component | UI V3 |
| --- | --- |
| Panel | Khung đồng chạm rắn 9 phần bằng WebP có alpha; các góc điêu khắc giữ tỷ lệ, chỉ ray giữa co giãn. Nền đá khắc và huy chương đầu mục, khoảng đệm riêng tránh hoa văn che chữ |
| Nút | Mặt kim loại có gờ dày, hõm tối, phản sáng và cạnh chịu lực; nút chính vàng, nút phụ đồng / thép xanh, phản hồi nhấn và ánh kim |
| Điều hướng | Ô chọn dập nổi, dấu hình thoi, trạng thái active vàng; giữ cùng vị trí và nhãn |
| Chỉ số | Rãnh CP tối và thanh sáng bên trong; số đầy đủ nằm riêng, không bị rút gọn hoặc dính vào ornament |
| Xếp hạng | Khiên hạng vàng / bạc / đồng, các hạng sau dùng kim loại tối; cùng bảng dữ liệu cũ |
| KE | Hai mặt vật liệu khác màu, sống kim loại chia phe và huy hiệu VS dạng đồng xu nổi; số CP ở vùng riêng |
| Wiki | Thẻ đền cổ có phù hiệu lớn, khung đồng ở cấp thẻ độc lập, nội dung ở dưới có padding thoáng; category active có ánh xanh |
| Capital / Armory | Khung chạm chỉ ở panel ngoài. Capital là huy hiệu trên bệ đá không có viền hộp; bỏ watermark cờ lặp. Armory là rãnh inventory chìm với dấu khắc nhỏ, tránh lồng các khung đồng giống nhau |
| Form | Khung đồng, phù điêu cánh ở đầu, input chìm, CTA đúc nổi và nút đóng 44×44 px; hộp thoại fixed trong viewport kể cả khi trang đã cuộn |

Chất liệu V3.1: đá xanh đen `#0D1215`, mặt panel `#141E22`, đồng vàng và điểm sáng xanh ngọc; ánh vàng nối với artwork sa mạc Season 5. Có góc khung chạm khắc, vành huy hiệu nghi lễ, khiên hạng có mặt vát và thanh CP có vạch sáng.

V3.2 thêm hai asset raster được tạo bằng built-in Image Gen: khung đồng / đá đen chạm rắn và phù điêu cánh gắn đá xanh ngọc. [Prompt đầy đủ](relic-ui-prompts.json), [manifest](../../assets/season-5/relic-ui/manifest.json). Master PNG giữ nguyên; bản web chỉ đổi kích thước / định dạng và giữ alpha, khoảng 167 KiB cho cả hai. Pattern đá khắc và icon vẫn là SVG native. Phân cấp trang trí: khung lớn → vật liệu bên trong → dữ liệu; không áp cùng khung chạm lên mọi lớp lồng nhau.

## Animation và ambient V3.1

- Entrance 420 ms theo nhóm khi vào màn; thanh CP chạy 650 ms một lần, số CP không đếm giả hoặc bị ẩn.
- Chuyển chuyên mục Wiki fade / trượt 220 ms, hover card nhấc 3 px trên thiết bị có chuột.
- Ánh kim lướt nút khi hover / focus; nhấn nút có phản hồi 2 px.
- Vành huy hiệu quay chậm 48 giây và glow nhẹ 7 giây, đồng bộ với ambient đang bật.
- Gió cát phủ toàn viewport phía trên header, sidebar và nội dung, luôn theo viewport khi cuộn. Bản bão cát dày có hạt / vệt gió tăng khoảng 5 lần, 3 dải bụi uốn lượn, màn sương cát vàng và các mảng bụi cuộn nhiều lớp. Tốc độ gió thay đổi theo đợt thay vì chuyển động đều. Lớp trang trí không nhận thao tác chuột / chạm.
- Một canvas hiển thị dùng chung qua mọi route; một RAF loop giới hạn tối đa 30 lần vẽ / giây. Desktop 780 hạt + 11 mảng bụi, mobile 300 + 6; DPR tối đa 1.25 / 1. Mảng bụi dùng bitmap thủ tục 384×192 tạo một lần ở canvas rời, tái sử dụng khi vẽ; không blur / filter mỗi frame. Giảm số lớp bụi trên mobile, không có canvas riêng của hero.
- Nút GIÓ CÁT trong sidebar có label theo 6 locale và lưu lựa chọn. Reduced-motion tắt toàn bộ chuyển động; dialog mở tạm dừng ambient. Có handler dừng khi tab bị ẩn.
- Animation entrance không lặp lại do cờ hoặc dữ liệu con được bổ sung. Chuyển động dùng opacity / transform; không thay kích thước hay trật tự component.

## Cách triển khai preview

`preview.html` được dựng từ entrypoint production. `original-layout.css` giữ snapshot geometry / text metrics từ các stylesheet đang chạy; loại paint, hình S4 và animation. `ui-remake.css` tạo hệ component mới, không tải các stylesheet S4 cũ vào preview.

Giữ runtime route / Wiki / ngôn ngữ / bảng dữ liệu hiện có. Bản dẫn xuất enhancer Home bỏ nạp theme S4, parallax, tilt và reveal; phần dữ liệu / cờ / CP tiếp tục hoạt động. Bổ sung DOM gồm khung trang trí không nhận pointer, phù điêu, huy chương và khiên hạng. Không di chuyển section; kích thước và cách xếp nội bộ component được làm lại. Capital cần override giới hạn cho các rule padding / text-align cũ có `!important`, đặt trong một rule component duy nhất.

**Form preview không gửi thật:** guard chặn submit ở capture phase; bỏ feedback runtime / Turnstile và cấu hình thật. Có thể thử validation và trạng thái hoàn tất.

## Tích hợp production

`index.html` dùng `layout.css` làm baseline responsive (nguồn CSSOM cascade production ở commit `5db0ad7`, ghi trong header file), các stylesheet chức năng và một bộ skin V3.2. Bỏ runtime / stylesheet trang trí S4; Home runtime chỉ còn CP, Armory và phân cấp sự kiện. Guard CI được chuyển sang contract Season 5, kiểm asset hash, nguồn CSS, nhãn truy cập, form config và chặn việc nạp preview guard / lớp theme cạnh tranh vào production.

Form thật giữ `feedback-config.js`, `feedback.js` và Turnstile. Các note / title mô phỏng chỉ chạy khi có class `s5-preview`. Dữ liệu server chưa đổi: lịch Season 5 chưa được xác nhận nên nội dung S4 vẫn hiển thị theo nguồn. [Kiểm tra tích hợp](PRODUCTION-MIGRATION.md).

Mở: <http://127.0.0.1:8041/docs/season-5/preview.html#/home>

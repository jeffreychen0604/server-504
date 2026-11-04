# Bộ thiết kế Season 5 — Server 504 / UI remake V3.3

Bản V3.3 áp dụng mockup phòng chỉ huy sa mạc đã duyệt vào entrypoint website chính, giữ layout và dữ liệu hiện tại. [Bản chính](https://jeffreychen0604.github.io/server-504/) dùng form thật; [preview](preview.html) có nhãn thử nghiệm và chặn gửi form. [Chi tiết tích hợp](PRODUCTION-MIGRATION.md).

V3.3 bổ sung mặt đá 9-slice, bảng tên đồng rèn và bệ tượng Capital từ Image Gen; icon điều hướng SVG, trạng thái chọn xanh ngọc, huy chương hạng và thanh CP cùng hệ vật liệu. [Ba asset web mới](../../assets/season-5/command-ui/manifest.json) tổng 176,248 byte (khoảng 172 KiB). [Prompt gốc](command-ui-prompts.json) · [Kiểm tra V3.3](review/VALIDATION-V3.3.md). Chữ, số, cờ và nội dung vẫn được lấy từ runtime thật. Sương cát giảm độ đục, số hạt và phạm vi toàn trang giữ nguyên.

V3.1 nâng vật liệu sang đá tối / đồng / xanh ngọc, thêm vành huy hiệu, góc chạm khắc, thanh CP có vạch sáng và ambient gió cát. Các khối xuất hiện nhẹ khi vào trang, thanh CP chạy khi tải, chuyển chuyên mục Wiki có fade ngắn, nút có ánh kim và phản hồi nhấn. Số CP luôn hiển thị nguyên giá trị.

V3.2 thay đường viền HUD bằng khung đồng chạm nổi co giãn theo 9 phần, thêm phù điêu cánh xanh ngọc được tạo bằng Image Gen, huy chương đầu mục, nút kim loại dày và ô nhập chìm. Thẻ Wiki có mặt nền đền cổ và phù hiệu lớn. Khung chạm khắc dành cho lớp ngoài: Capital dùng bệ đá với cờ và ánh sáng, Armory là rãnh inventory, không lặp lại khung đồng bên trong. Bố cục và thứ tự section giữ nguyên; khoảng đệm / chiều cao component được chỉnh cho chất liệu mới.

Nút **GIÓ CÁT** ở dưới sidebar bật / tắt ambient và nhớ lựa chọn. Mobile mở menu để thấy nút. Bão cát dày phủ toàn trang, từ header / sidebar đến bảng Dashboard và danh sách Wiki, luôn theo viewport khi cuộn. Có nhiều lớp bụi cuộn, hạt cát dày và gió mạnh theo đợt. Lớp hiệu ứng không chặn thao tác; dừng khi mở dialog, khi tab ẩn hoặc bật reduced-motion. Chế độ giảm chuyển động cũng tắt animation component.

- [Kế hoạch thiết kế và triển khai](PLAN.md)
- [Đặc tả UI remake V3 — giữ layout cũ](UI-REMAKE-V3.md)
- [Preview UI trên layout website hiện tại](preview.html)
- [Prompt và nguồn tham chiếu](generation-prompts.json)
- Bản PNG gốc giữ trong thư mục `masters/` của archive local, không đưa lên Pages.
- [Manifest 8 bản xuất web](../../assets/season-5/draft-v1/manifest.json)
- [Kết quả kiểm tra UI / animation V3.1](review/VALIDATION-V3.1.md)
- [Kiểm tra component V3.2](review/VALIDATION-V3.2.md)
- [Hai asset component mới](../../assets/season-5/relic-ui/manifest.json) · [Prompt Image Gen](relic-ui-prompts.json)

## Mở bản xem trước

Cần Node.js. Tại thư mục gốc repo hoặc thư mục gốc gói ZIP đã giải nén, chạy:

```powershell
node scripts/preview-season5.cjs
```

Mở <http://127.0.0.1:8041/docs/season-5/preview.html>. Khi muốn tắt, nhấn Ctrl+C trong cửa sổ chạy server. Nếu cổng 8041 đang được dùng, đặt biến `S5_PREVIEW_PORT` sang một cổng khác.

Preview dùng lại header, sidebar, route, thứ tự khối Dashboard, lưới Wiki và form của website hiện tại. Không có lobby, dock đáy, podium hoặc workspace Wiki V2. Có 6 ngôn ngữ và nội dung thật đang có trong repo. Form được chặn gửi bằng guard riêng và chỉ mô phỏng trạng thái hoàn tất; không gọi backend hoặc mở GitHub issue.

Số CP, liên minh và ngày cập nhật được đọc từ `content/server-status.json`. Bản ZIP chứa snapshot của dữ liệu tại lúc đóng gói, nên mở trong repo sẽ đọc dữ liệu mới hơn nếu repo được cập nhật.

## Tài nguyên

4 PNG minh họa, 8 bản xuất WebP/PNG, 6 biểu tượng trong một SVG sprite và các token CSS. Bộ minh họa web khoảng 447 KiB. V3.2 thêm 2 PNG master component và 2 WebP có alpha (khoảng 167 KiB), tổng bản xuất ảnh web khoảng 614 KiB. Không dùng các PNG gốc làm ảnh tải ở trang public.

Ảnh được tạo bằng **built-in image_gen** dựa trên bộ ảnh người dùng cung cấp; chúng là minh họa đề xuất, không phải bản xuất nguyên gốc hoặc logo chính thức từ game. Huy hiệu mùa là concept, không thay cờ của các liên minh.

`layout.css` giữ geometry responsive đã được duyệt; `ui-remake.css` định nghĩa paint và hình dáng component. Website giữ các stylesheet chức năng của form / Wiki / công cụ / tìm kiếm / Guides và bỏ chuỗi trang trí S4. `home-runtime.js` chỉ giữ CP / Armory / phân cấp sự kiện, không nạp S4 artwork. `original-layout.css` và `preserved-home-runtime.js` lưu snapshot lịch sử của các lượt preview trước.

Các mô tả / ZIP V1 và V2 lưu lịch sử thiết kế. Hướng lobby V2 đã được thay bằng V3 theo phản hồi mới nhất.

## Dựng lại HTML preview

```powershell
python scripts/build-season5-ui-preview.py
```

Script đọc `index.html` production, dùng cùng presentation / runtime và chặn form thật; không ghi lại entrypoint production. Preview có scope riêng nên nhãn / note mô phỏng không ghi đè bản chính.

## Tái xuất tài nguyên

Cần Python và Pillow cho bước này; mở preview chỉ cần Node.js.

```powershell
python scripts/export-season5-assets.py --source-dir docs/season-5/masters
```

Chỉ đổi kích thước / định dạng và giữ alpha, không thay đổi bố cục ảnh gốc. Các hash và kích thước được cập nhật trong manifest.

Tái xuất hai asset component bằng Python có Pillow: `python scripts/export-season5-relic-ui.py`. Master local ở `docs/season-5/masters/relic-ui`; WebP ở `assets/season-5/relic-ui`. Script chỉ resize / đổi định dạng, giữ alpha, không sửa ảnh sinh ra. Master và ZIP được giữ local, không đưa lên Git / Pages; repository chứa bản web và prompt nguồn.

Tái xuất ba asset V3.3: `python scripts/export-season5-command-ui.py`, dùng master tại `masters/command-ui/`. Chỉ resize / đổi định dạng, giữ alpha.

## Đóng gói lại

```powershell
python scripts/package-season5.py
```

Script xuất `docs/season-5/season5-design-kit-v3.3.zip` khi được chạy; ZIP V3.2 cũ là bản lịch sử. Giữ nguyên các hình trong `draft-v1`; số phiên bản phản ánh UI remake. Gói chứa các runtime / nội dung cần để xem layout hiện tại với UI mới. Wiki dùng runtime Markdown qua CDN như website gốc nên cần mạng khi tải lần đầu. Khi giải nén, chạy lệnh Node.js tại thư mục gốc của gói.

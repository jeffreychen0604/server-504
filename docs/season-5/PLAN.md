# Server 504 — Kế hoạch giao diện Gaming / Season 5

Ngày chuẩn bị: 03/11/2026. Trạng thái: **UI remake V3.2, giữ layout production + tài nguyên Season 5 + prototype local**.

**Yêu cầu mới nhất:** giữ layout cũ, chỉ remake UI / component để có chất gaming. [Đặc tả V3](UI-REMAKE-V3.md) là hướng hiện tại, thay thế đề xuất lobby và đổi bố cục V2. Preview dùng chính shell và runtime của website đang chạy: header / sidebar, Dashboard, Wiki, form giữ cấu trúc. Thay hệ thống khung HUD, nút nổi, huy hiệu, thanh chỉ số và ô nhập; giữ nguyên bộ hình Season 5 đã chọn.

V3.2 đã thêm khung chạm rắn và phù điêu cánh bằng Image Gen. Hướng phân cấp mới: khung đồng cho panel ngoài, Capital dạng bệ đá và Armory dạng rãnh chìm để tránh lặp khung lồng khung. Bão cát dày toàn trang và các animation V3.1 tiếp tục hoạt động.

Mục tiêu: tạo cảm giác cổng cộng đồng của một game chiến thuật, với thế giới sa mạc cổ đại làm nhận diện cho mùa sắp tới. Dashboard là nơi điều hành; Wiki là kho tri thức; các bảng số liệu và biểu mẫu luôn rõ ràng.

## 1. Chốt hướng hình ảnh

**Desert Citadel — thành trì giữa bão cát.** Dùng nền đá tối, kiến trúc sa thạch, kim loại đồng vàng cũ, điểm nhấn xanh ngọc và ánh lửa ấm. Nhận diện chính là đền cổ, vòng nghi lễ và hình rắn. Đây là hướng nghệ thuật rút ra từ ảnh được cung cấp.

Tên `Conquest Season: Ragnarok` xuất hiện trong ảnh tham chiếu. Chỉ dùng như nhãn tham chiếu cho tới khi tên mùa của Server 504 được xác nhận. Không suy diễn chủ đề Bắc Âu, băng tuyết hoặc cơ chế gameplay từ tên Ragnarok.

| Tham chiếu người dùng | Chi tiết dùng cho thiết kế | Vị trí dự kiến |
| --- | --- | --- |
| 1 — Season Preview | Thành trì, vòng vàng, rắn khổng lồ, timeline | Hero, lộ trình chuyển mùa |
| 2 — Thành trì nguyên vẹn | Sa thạch, tầng bậc, phù điêu rắn, xanh ngọc | Nhận diện kiến trúc của Dashboard |
| 3 — Công trình đổ nát | Khối đá vỡ và chiều sâu sa mạc | Minh họa lưu trữ, trạng thái chờ; không dùng để ám chỉ sự cố server |
| 4 — Cổng biểu tượng rắn | Phù điêu vàng và đường nét đá | Header Wiki, huy hiệu mùa |
| 5 — Khu có cân vàng | Cân, sân nghi lễ, công trình cộng đồng | Council / Charter / Codex |
| 6–7 — Công trình giữa giao tranh | Bố cục đối đầu, ánh lửa, huy hiệu mục tiêu | KE và thẻ hoạt động chiến đấu; không đặt phía sau số CP |
| 8 — Giao diện nhánh kỹ năng | Nút tròn, đường nối và thứ bậc | Motif timeline / mục lục; chưa xây công cụ kỹ năng từ ảnh |
| 9 — Sands Catastrophe | Xác ướp, giáp vàng, không khí đe dọa | Hướng minh họa cho thẻ sự kiện mùa sau khi xác minh nội dung |
| 10 — Season Weekly Pass | Bồn nghi lễ xanh lam, vàng và đá sáng | Tham chiếu kiểu vật phẩm; chưa đưa tính năng bán pass lên website |

Ngày 20/07–07/09/2026, countdown, tên liên minh, HP, khoảng cách, cấp quái và mốc kỹ năng trong ảnh **chưa được xác nhận là dữ liệu áp dụng cho Server 504**. Không nhập chúng làm lịch, quy tắc hoặc trạng thái live của website.

## 2. Hệ thống giao diện

| Thành phần | Quy định |
| --- | --- |
| Nền | Obsidian `#100E0C`, panel `#1B1813`, panel nổi `#252017` |
| Viền | Đồng tối `#51412C`; viền trạng thái nổi bật dùng vàng |
| Nhấn chính | Ancient gold `#E7B967`, dùng CTA, tiêu đề phụ, số CP |
| Nhấn phụ | Turquoise `#85CABC`, dùng focus và trạng thái trung tính / đã xác minh |
| Nội dung | Parchment `#F5EDDF`, nội dung phụ `#C0B29D` |
| Cảnh báo | `#F2937C`, luôn kèm chữ hoặc biểu tượng; không chỉ dựa vào màu |
| Typography | Tiêu đề condensed / nét chắc, body dễ đọc và hỗ trợ tiếng Việt. Prototype dùng Bahnschrift với fallback; bước tích hợp chọn và self-host font có đủ ký tự cho 6 ngôn ngữ |
| Cỡ chữ production | Body 15–16 px, bảng tối thiểu 12–14 px, heading thích ứng. Prototype có microcopy nhỏ cho nhãn trang trí; kiểm lại khi tích hợp |
| Component V3 | Khung HUD góc vát, viền kim loại kép, huy hiệu, thanh CP, nút nổi và input chìm; giữ bố cục hiện tại |
| Chuyển động | Chỉ hover / focus và chuyển trạng thái nhẹ 120–180 ms. Hiệu ứng bụi nếu thêm chỉ ở hero, tắt khi reduced-motion; không video nền hoặc particle toàn trang |

Hình nền tạo không chứa chữ. Tiêu đề, nút, số CP, nhãn và trạng thái phải là HTML để hỗ trợ ngôn ngữ, zoom và trình đọc màn hình.

## 3. Chỉnh từng khu vực

### Dashboard

- Hero giữ vị trí và vai trò hiện tại, dùng đền / rắn và khung đồng; giữ nội dung lấy từ dữ liệu server.
- Trạng thái đầu trang là **chuẩn bị Season 5**. Chỉ chuyển trạng thái mùa đang diễn ra khi có dữ liệu xác nhận.
- Giữ status strip hiện tại. Lịch chưa xác nhận không hiện countdown và không thêm track chuyển mùa làm đổi layout.
- Đưa sức mạnh liên minh và KE thành khối điều hành chính. Cờ giữ đúng từng liên minh; giữ đủ 8 liên minh và toàn bộ giá trị CP hiện có.
- Tên liên minh có thể xuống dòng. Số CP không xuống dòng, không rút gọn và không dùng ellipsis. CP / xu hướng tách dòng nếu khung hẹp.
- KE dùng chiều rộng panel thực tế để chuyển bố cục. Dữ liệu cũ được ghi ngày và trạng thái lưu trữ, không được trình bày như đối thủ Season 5 đã xác nhận.
- Rà soát các event có ngày kết thúc trước hiện tại, đưa về archive theo dữ liệu; không đổi nhãn sự kiện cũ thành nội dung Season 5.

### Wiki

- Header “đền tri thức” nhỏ hơn hero Dashboard, kết hợp ô tìm kiếm nổi bật.
- Thẻ danh mục dùng biểu tượng, tên và mô tả ngắn; nội dung từ manifest hiện có, không tự tạo bài / chỉ số Season 5.
- Bài viết giữ nền tĩnh, dòng chữ 65–80 ký tự, heading và mục lục rõ. Không đặt tranh hoặc texture tương phản cao dưới nội dung.
- Kết quả tìm kiếm có track `minmax(0, 1fr)`, phần tử con `min-width: 0`, chuỗi dài được wrap. Nhãn loại tài liệu không ép hộp thoại vượt chiều rộng.
- Bảng nhiều cột trong bài có khung cuộn riêng, hướng dẫn cuộn và giữ tiêu đề; trang chính không tràn ngang.
- Season 4 giữ trong archive. Tạo hub Season 5 sau khi có tên và nội dung xác minh, tách nguồn / ngày kiểm chứng cho từng bài.

### Form góp ý và điều hướng

- Form như một “bảng thông tin gửi Council”: header có nhận diện nhỏ, các trường rõ, nền input đặc, CTA vàng.
- Giữ đầy đủ trường đang có, giới hạn nhập, honeypot, Turnstile và đường gửi thật khi tích hợp; prototype chỉ thử UI, không gọi backend.
- Giữ `aria-labelledby`, tên nút đóng theo locale, label trường, trạng thái gửi `aria-live`, focus trong hộp thoại, Esc và focus trở lại nút mở.
- Menu có `aria-controls` / `aria-expanded` đồng bộ. Nút đóng và thao tác trên mobile có vùng bấm tối thiểu 44 px.
- Header mobile bố trí logo / tìm kiếm / menu thành các vùng riêng, không để ô tìm kiếm đè lên logo.

### Charter, Codex và Guides

Áp dụng cùng màu, tiêu đề, trạng thái và biểu tượng; giữ vùng đọc bài phẳng, link và mục lục rõ. Cân vàng và scroll là motif dẫn hướng, không là nền xuyên suốt bài.

## 4. Bộ tài nguyên đã tạo

Tất cả hình raster được tạo bằng **built-in image_gen**, dựa vào ảnh người dùng; đây là minh họa đề xuất, không phải asset game được trích xuất chính xác.

| Tài nguyên | Bản web | Vùng an toàn |
| --- | --- | --- |
| Hero desktop | `hero-desktop.webp` 1760×880; bản 960×480 | Đặt chữ ở nửa trái, giữ vòng vàng ở bên phải; ưu tiên căn ảnh trên phải |
| Hero mobile | `hero-mobile.webp` 768×1152; bản 480×720 | Khoảng trên dành cho chữ; giữ đền và vòng ở nửa dưới; không crop ngang từ ảnh desktop |
| Wiki sanctuary | `wiki-sanctuary.webp` 1280×640; bản 640×320 | Chữ ở trái; cổng rắn và cân vàng ở phải |
| Serpent crest | `serpent-crest.webp` 512×512; PNG 128×128 | Giữ alpha, không đổ nền vuông; alt rỗng nếu chỉ trang trí |
| SVG UI | `ui-symbols.svg`, 6 symbol | Dashboard, Wiki, KE, Council, tài liệu và lịch mùa; nhận màu bằng `currentColor` |
| Tokens | `tokens.css` | Scope `.s5-preview`, chưa ảnh hưởng website chính |

Web exports và kích thước / hash chính xác: [manifest](../../assets/season-5/draft-v1/manifest.json). Prompt, tham chiếu và công cụ: [generation-prompts.json](generation-prompts.json). PNG gốc: [masters](masters/).

Tám bản xuất web tổng khoảng **447 KiB**; đây là toàn bộ lựa chọn, không phải tất cả đều tải ở trang đầu. `picture/srcset` chọn một hero phù hợp; crest nhỏ dùng 128 px; hình Wiki / gallery chỉ nên tải khi cần. Không tải PNG masters vào trang public.

## 5. Trình tự triển khai

| Giai đoạn | Việc làm | Điều kiện hoàn thành |
| --- | --- | --- |
| 1 — Art direction và prototype | Định hướng, tài nguyên, Dashboard / Wiki / form thử | **Đã chuẩn bị local trong lần này**, kiểm tra desktop / mobile trước bàn giao |
| 2 — Hợp nhất lớp theme | Tạo entry theme theo season; thay các lớp trang trí S4 hiện hữu, tách bố cục chức năng khỏi hình mùa | Một nguồn theme, không thêm chuỗi override cạnh tranh specificity; có switch quay lại S4 |
| 3 — Dashboard | Remake UI hero, status strip, roster, KE, Capital / Armory theo V3; giữ các khối cũ | So khớp CP / cờ; panel hẹp không cắt số; data và lịch không bị gán lại từ ảnh |
| 4 — Wiki và thành phần chung | Header, categories, search, bài viết, form, menu | 6 locale, keyboard, form states, bảng và search không hồi quy |
| 5 — Chuyển mùa và phát hành | Xác nhận dữ liệu Server 504, thay trạng thái mùa, kiểm tra, push và deploy theo yêu cầu triển khai | CI đạt; smoke test live, có commit quay lui |

Ước lượng thực hiện tích hợp: 3–5 phiên làm việc, phụ thuộc việc xác nhận lịch / nội dung Season 5 và mức thay đổi layout sau khi xem prototype. Đây là ước lượng phạm vi, không phải lịch đã cam kết.

### Hướng tích hợp phù hợp repo hiện tại

Website hiện dùng nhiều lớp CSS và script trang trí S4 (`sealed-island-theme`, `fancy-home`, `home-v2-*`, `home-ops-v2`, `seasonal-sakura`...). Không chỉ thêm một stylesheet ở cuối để đổi mọi màu bằng `!important`.

1. Kiểm kê selector và phân biệt layout chức năng với phần art / theme.
2. Giữ nguyên các sửa lỗi CP, tìm kiếm, accessibility ở commit `5db0ad7` và dữ liệu liên minh / cờ hiện có.
3. Gom phần nhận diện mùa vào entry theme. Những rule S4 phục vụ bố cục phải được chuyển rõ ràng trước khi bỏ link cũ.
4. Tắt nền torii, hoa anh đào và runtime sakura khi bật S5; thay đúng vai trò bằng tài nguyên S5.
5. Cho phép chọn theme ở cấu hình, không phụ thuộc tên mùa để bật / tắt hàng chục observer trang trí.
6. Cập nhật guard entrypoint để kiểm tra đúng theme đang chọn; không bỏ validator để vượt lỗi. Thử rollback về S4 trước khi phát hành.

## 6. Kiểm tra trước phát hành

- Kích thước: 320, 375, 390, 768, 1024, 1280, 1440, 1920 px; cả hai bên breakpoint / container breakpoint và zoom 200%.
- Kiểm tra hình thực tế và giới hạn từng panel. Không chỉ kiểm tra document có tràn ngang hay không.
- 8/8 cờ, CP từng liên minh khớp JSON, CP trong KE đầy đủ; tên dài và dữ liệu thiếu có trạng thái rõ.
- EN / FR / ES / PT / KO / VI, chuỗi dịch dài, font tiếng Việt và Hàn.
- Wiki index, bài text, bảng rộng, calculator, tìm kiếm có / không kết quả và điều hướng bằng keyboard.
- Form rỗng / sai, đang gửi / thành công / thất bại, Turnstile, focus trap / Esc / focus return. Thử backend bằng dữ liệu test được xác định khi triển khai.
- Contrast nội dung bình thường tối thiểu 4.5:1, thành phần tương tác 3:1, focus rõ và trạng thái không chỉ dựa màu.
- Hero dùng ảnh responsive, đặt kích thước để tránh nhảy layout; không video nền; không tải tất cả ảnh lớn trên mobile.
- Chạy `validate-entrypoint.py`, toàn bộ `validate-wiki.sh`, content audit; kiểm lại sau deploy.

## 7. Cách xem prototype

Từ thư mục repo chạy:

```powershell
node scripts/preview-season5.cjs
```

Mở <http://127.0.0.1:8041/docs/season-5/preview.html#/home>. V3 dùng lại màn Dashboard, Wiki, sidebar, ngôn ngữ, tìm kiếm và form hiện tại. Nội dung được đọc trong chính route của preview; form chỉ mô phỏng.

Đây là prototype độc lập. `index.html`, nội dung server và workflow deploy của website chính chưa được thay đổi bởi bộ thiết kế này. Các thao tác form trong prototype chỉ hiển thị trạng thái mô phỏng, không gửi dữ liệu.

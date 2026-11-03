# Server 504 / Remake V2 — Command Lobby

**Lưu lịch sử, đã thay thế:** người dùng yêu cầu giữ layout website cũ. Hướng hiện tại là [UI remake V3](UI-REMAKE-V3.md), không dùng cấu trúc lobby của tài liệu này.

## Quyết định thiết kế

Giữ bộ art **Desert Citadel** đã chọn. Thay cấu trúc website bằng một lobby của cộng đồng game chiến thuật: chiến dịch ở đầu, lực lượng ở giữa, kiến thức được tổ chức như hồ sơ tác chiến. V2 thay thế hướng layout / component V1; không đổi tên hoặc dữ liệu gameplay để tạo cảm giác gaming.

Ba nhiệm vụ chính của người dùng: biết server đang chuẩn bị gì, kiểm tra lực lượng liên minh, tìm kiến thức để ra quyết định. Giao diện xoay quanh ba nhiệm vụ này.

| Khu vực | V1 | Remake V2 đã dựng |
| --- | --- | --- |
| Điều hướng desktop | Sidebar cố định | Lobby ngang, mục đang chọn có vạch vàng, header nhận diện server và mùa |
| Điều hướng mobile | Menu mở / đóng | Thanh đáy 4 thao tác: chỉ huy, chiến thuật, tài nguyên, góp ý |
| Đầu Dashboard | Banner trong khung nội dung | Sân khấu chiến dịch chiếm phần lớn chiều ngang, bảng mục tiêu liền bên phải |
| Lộ trình mùa | Một panel riêng | Track 4 chặng gắn với khu chiến dịch; chỉ đánh dấu chuẩn bị, các chặng sau chờ lịch |
| Liên minh | Bảng trong card | Podium top 3, bảng đủ 8 liên minh, thanh tỷ lệ CP và tổng sức mạnh server |
| KE | Các card giống nhau | Cột tình báo, matchup kiểu đối đầu, ngày cập nhật và nhãn mùa cũ |
| Wiki | Banner và lưới card chuyên mục | Bộ lọc → danh sách hồ sơ → khung tóm tắt; tìm kiếm trực tiếp, xem thêm tài liệu |
| Form | Form select truyền thống | Phiếu gửi tình báo, 3 radio card chọn loại, trường nhập theo thứ tự và vùng hoàn tất |
| Ngôn ngữ thị giác | Panel bo góc cùng kiểu | Khung vuông, số thứ tự, thứ bậc typography, thanh chia khu vực, sắc vàng / ngọc có vai trò rõ |

## Cấu trúc màn hình

### Bàn chỉ huy

1. Header 504 / Dark War + huy hiệu mùa + tìm nhanh và góp ý.
2. Thanh lobby desktop. Breadcrumb là thông tin bối cảnh, không tạo thêm menu lồng.
3. **Campaign stage:** artwork và tiêu đề lớn bên trái; **Mission board:** trạng thái mùa, 3 điểm đến có thao tác thật bên phải. Không dùng checklist giả hoặc tiến độ do hệ thống tự bịa.
4. Track chuyển mùa: chuẩn bị → ghép trận → kết quả nhóm → Season 5. Chưa có ngày thì hiện chờ.
5. **Alliance league:** podium top 3, đầy đủ bảng xếp hạng bên dưới. Ở desktop, hạng nhất ở giữa và cao hơn; mobile hạng nhất thành thẻ ngang riêng, hạng 2–3 ở hàng dưới.
6. **Intel column:** tổng CP tính từ 8 liên minh trong JSON, hồ sơ KE mùa cũ, điểm gửi thông tin mới. Thanh vạch tổng CP chỉ trang trí; không có tỷ lệ tiến độ hoặc chỉ số online giả.

Các thanh dưới tên liên minh thể hiện tỷ lệ CP so với liên minh đứng đầu trong cùng snapshot. Số CP đầy đủ luôn là nội dung chính. Không dùng số rút gọn thay cho số thực.

### Kho chiến thuật

Desktop rộng: bộ lọc trái, danh sách giữa và hồ sơ tóm tắt bên phải. Tên bài, nhóm và mô tả đọc trực tiếp từ manifest 117 bài / 7 chuyên mục. Có thêm lựa chọn tất cả.

- Tìm trực tiếp trong chuyên mục đang chọn. Chuyển về tất cả để mở rộng phạm vi.
- Chọn bài cập nhật hồ sơ bên phải và trạng thái hàng đang chọn.
- Hiển thị 12 bài mỗi lần; xem thêm 12 bài, chuyển focus tới bài mới đầu tiên.
- Không có kết quả thì hiện thông báo và ẩn hồ sơ cũ để tránh hiểu nhầm.
- Khung hồ sơ có nút đọc bài đầy đủ trên Wiki đang chạy. Đây là tóm tắt, chưa phải trình đọc nội dung markdown mới.
- Global search có phím `/`; khi đang ở Wiki, `/` đưa focus vào tìm kiếm trực tiếp.

Mobile: các chuyên mục thành nút bấm xuống dòng; danh sách một cột. Chọn bài đưa người đọc tới hồ sơ phía dưới và focus vào nút đọc; có nút trở lại bài đang chọn. Không tạo carousel buộc phải vuốt ngang để thấy chuyên mục.

### Gửi tình báo / Góp ý

Ba loại đóng góp là radio thật có label và focus bàn phím: Season 5, Wiki, giao diện. Tiếp theo là tiêu đề, nội dung / nguồn, tên người chơi / liên minh tùy chọn.

Dialog có tên, mô tả, nút đóng tối thiểu 44 px, Esc và trả focus về nút mở. Form dùng kiểm tra required / minlength / maxlength của trình duyệt. Bản thử chỉ mô phỏng hoàn tất, không gọi API, không lưu nội dung.

## Quy tắc component và responsive

- Mỗi khu có cấu trúc riêng theo nhiệm vụ; không đưa tất cả nội dung vào một card component chung.
- Typography tiêu đề condensed, dòng ngắn, tương phản với số CP dùng tabular numerals. Font hiện là font hệ thống có sẵn; bước production cần kiểm đủ 6 ngôn ngữ.
- Trang tối đa 1600 px; phần đọc tài liệu giữ dòng chữ vừa phải. Artwork nằm ở campaign và bìa hồ sơ, không lót dưới dữ liệu.
- Trên 1200 px: Wiki 3 cột; hồ sơ sticky. Tới 1200 px: bộ lọc và danh sách 2 cột, hồ sơ ở dưới danh sách.
- Tới 950 px: bảng mục tiêu chuyển xuống dưới campaign, khu lực lượng thành một cột; tổng CP và KE chia khu riêng.
- Tới 600 px: điều hướng xuống đáy, campaign dùng ảnh dọc, podium sắp xếp lại, Wiki và tình báo thành một cột.
- CP giữ nguyên chuỗi đầy đủ. Cột CP có chiều rộng riêng; tên liên minh được xuống dòng. Không che lỗi bằng `overflow-x:hidden` trên trang.
- Input trên mobile 16 px; mục bấm chính tối thiểu 44 px. Không video nền, particle toàn trang, con trỏ tùy biến hoặc animation bắt buộc. Reduced-motion tắt chuyển động.

## Lộ trình tích hợp website thật

1. **Shell mới:** tách header, lobby / mobile dock và vùng nội dung khỏi bộ trang trí S4. Giữ đường dẫn, locale, chức năng search và form hiện hữu. Thử route và nút back trước khi đưa dữ liệu vào.
2. **Dashboard mới:** xây các component CampaignStage, MissionBoard, CampaignTrack, AlliancePodium, AllianceRoster, ServerPower, RivalBoard. Dùng cùng một nguồn dữ liệu cho podium và bảng. Chuyển cả Capital, Armory, thông báo và migration đang có sang các khu tác nghiệp phù hợp; prototype này chưa bao phủ các màn đó.
3. **Wiki mới:** tích hợp bộ lọc và hồ sơ vào index thật, rồi làm trình đọc bài / mục lục / bảng / calculator cùng hệ thống. Giữ nội dung và archive S4; không chỉ dán trang trí mới lên banner cũ.
4. **Form và thành phần chung:** đem bố cục phiếu mới vào form thật, giữ các trường / kiểm tra / honeypot / Turnstile / xử lý gửi. Đổi nhãn cho đủ 6 locale và kiểm trạng thái đang gửi / thất bại / thành công.
5. **Dọn CSS và phát hành:** chuyển rule chức năng cần giữ trước khi bỏ stylesheet / observer S4. Cập nhật entrypoint guard, chạy kiểm tra Wiki và nội dung, so sánh desktop / mobile, thử rollback, rồi push / deploy trong bước triển khai.

Trạng thái hiện tại: **prototype V2 local để đánh giá cấu trúc và tương tác**. Bộ asset không tạo lại. Chưa đổi production hoặc thông tin Season 4 trong JSON.

Mở bản thử: <http://127.0.0.1:8041/docs/season-5/preview.html#dashboard>. Chi tiết kiểm tra tại [VALIDATION-V2.md](review/VALIDATION-V2.md).

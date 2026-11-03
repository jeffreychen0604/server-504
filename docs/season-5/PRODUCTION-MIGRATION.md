# Tích hợp V3.2 vào website chính

Ngày: 03/11/2026. Phạm vi: giao diện đã duyệt và bão cát; không sửa dữ liệu / lịch mùa.

## Thay đổi

- Entry production dùng 10 stylesheet: token, baseline layout, 5 lớp chức năng (feedback / Wiki / calculator / search / Guides), component, ambient và cờ. Thay chuỗi trang trí S4 và các loader artwork cũ, không chồng thêm skin lên toàn bộ cascade trước.
- `layout.css` có nguồn ghi rõ từ geometry / text metrics CSSOM của production `5db0ad7`; giữ các layout hook cũ để các route và bảng hoạt động. Refactor sâu baseline này có thể làm riêng sau, không buộc đổi bố cục trong lần phát hành.
- Home runtime loại bỏ loader CSS / Lucky artwork / parallax / tilt cũ, giữ CP meter, phân cấp sự kiện và dữ liệu Armory.
- Skin giữ khung đồng ở lớp ngoài; Capital là bệ đá không khung lồng, Armory là rãnh chìm. Bitmap web có alpha và manifest hash; PNG master / ZIP chỉ lưu local.
- Bản chính giữ config / runtime feedback thật và Turnstile. Title / note mô phỏng chỉ áp trong `s5-preview`; không có preview guard trong entry production.
- Ambient dùng preference `server504-sandstorm` cho bản chính, tách preference preview; vẫn có nút tắt, dừng khi dialog / tab ẩn và giảm chuyển động.

## Kiểm tra trước phát hành

[Số đo trình duyệt](review/production-browser-checks.json).

- 8 viewport 320–1920 px: Dashboard / Wiki / search / form không tràn ngang, 12 CP / trạng thái nằm trong ô, 8 cờ; Capital không còn khung trong và Armory không tràn.
- 6 locale ở desktop / mobile: Home, Wiki và form không tràn, note thật và nhãn nút đóng đúng ngôn ngữ.
- Charter, Codex, Guides, guide Margaret, Game Overview, Quinn, APC Chips và Resource Calculators tải trên desktop / mobile. Công cụ Honor: 3 badge + 7 coin → 134; Chip: 4 × 800 − 1000 → 2200 còn thiếu, craftable 1. Tìm `precision parts` trả 16 kết quả, không tràn.
- Layout form trên localhost kiểm với Turnstile stub chỉ trong tab test để tránh site-key localhost; không sửa config và không gửi góp ý thật. Kiểm tải widget thật trên Pages sau deploy.
- Entrypoint guard đạt và chặn 4 trường hợp sai (mất layout, lẫn preview, mất feedback, nạp skin cạnh tranh). Validate Wiki / 6 locale / 18 Guides mỗi locale / search index / audit 117 bài đạt; các advisory ngôn ngữ cũ không đổi.

Không có benchmark thiết bị thật hoặc full contrast / zoom audit. Thông tin nguồn và các báo cáo preview trước được giữ để truy vết, không coi chúng là kết quả production mới.

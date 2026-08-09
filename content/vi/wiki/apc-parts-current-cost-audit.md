# APC Parts — Audit chi phí hiện tại

> **Xác minh gần nhất:** 8/8/2026  
> **Trạng thái:** có các bảng dữ liệu cũ, nhưng không an toàn để dùng làm calculator hiện tại cho Lv.1–66.

Nhiều bảng APC công khai được lập trước đợt đại tu Modified Vehicle cuối năm 2025. Để xem cấu trúc hiện tại ổn định, hãy dùng [APC & Modified Vehicle](#/wiki/apc-modified-vehicle), [APC Parts & Parts Set](#/wiki/apc-parts-and-sets) và [Tactical Modification](#/wiki/tactical-modification); bài này chỉ dùng để quyết định liệu các bảng chi phí số cũ có còn đủ an toàn để tái sử dụng hay không.

## Vì sao bảng cũ đã lỗi thời

Một bảng legacy của DarkWarData chỉ ghi Parts tới **Lv.42** và vẫn tính **Gears** trong chi phí nâng cấp.

Các patch note chính thức về sau đã thay đổi hệ thống:

- bổ sung bonus **Parts Set** khi nâng cả sáu part tới các level quy định;
- loại **Gears** khỏi chi phí nâng Parts và hoàn lại Gears đã tiêu trước đó;
- tăng giới hạn `Modify` của Modified Vehicle từ 300 lên **500**;
- sau đó Tactical Modification dùng điều kiện **cả sáu Parts đạt Lv.66** như một trong các đường mở khóa.

Vì vậy không thể lấy nguyên hàng chi phí cũ `Gears + Titanium Alloy + Design Blueprint` để dùng cho game hiện tại.

## Phần nào của dữ liệu cũ vẫn hữu ích

Dữ liệu cộng đồng vẫn giúp xác lập mối quan hệ vật liệu:

- giai đoạn Parts sớm sử dụng **Titanium Alloy**;
- **Design Blueprints** xuất hiện ở nhánh Parts nâng cao;
- Design Blueprint là tài nguyên APC/Parts, không phải cùng item với DX Blueprint.

Nếu cần nguồn nhận vật liệu thay vì claim về chi phí nâng cấp, xem [Equipment & APC Material Sources](#/wiki/equipment-and-apc-material-sources).

## Mô hình phụ thuộc chuẩn hiện tại

| Lớp progression | Kết luận hiện đáng tin cậy |
| --- | --- |
| Modified Vehicle | Cap chính thức hiện đã được tăng lên Lv.500 |
| Parts | Hệ sáu part với các mốc Parts Set |
| Gears | **Không còn bị tiêu hao khi nâng Parts** |
| Titanium Alloy | Vật liệu Parts/APC hiện tại |
| Design Blueprint | Vật liệu Parts/APC nâng cao |
| Parts Lv.66 | Một điều kiện mở Tactical Modification khi toàn bộ parts đạt mốc này |

## Dữ liệu vẫn còn thiếu

Wiki hiện chưa có bảng Server 504 đã xác minh cho:

- chi phí Titanium Alloy theo từng level Parts;
- chi phí Design Blueprint theo từng level;
- toàn bộ level sau dataset cũ Lv.42 tới Lv.66;
- các mốc Parts Set và bonus chính xác.

Cho đến khi có capture trong game, Wiki sẽ không tạo calculator mang cảm giác chính xác giả tạo.

## Phương pháp capture khuyến nghị

Khi một người chơi Server 504 nâng part, hãy ghi:

`Level hiện tại → level tiếp theo | Titanium Alloy | Design Blueprint | vật liệu khác | CP/stat tăng`

Sáu screenshot ở các level mốc hữu ích hơn việc sao chép một bảng cũ đầy đủ nhưng không còn khớp game.

## Nguồn

- DarkWarData legacy APC chart: https://darkwardata.com/charts/apc-modified-garage/
- DarkWarData Design Blueprint: https://darkwardata.com/items/design-blueprint/
- Apple App Store version history — Parts Set, Gear removal, Modify 500, Tactical Modification: https://apps.apple.com/app/dark-war-survival/id6670441558

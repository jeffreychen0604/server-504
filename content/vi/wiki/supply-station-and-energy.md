# Supply Station & Energy

> **Xác minh gần nhất:** 8 Aug 2026  
> **Phạm vi:** hồi/nhận Energy và chuẩn bị cho hoạt động ngoài world map  
> **Độ tin cậy:** CAO với cơ chế nhận trực tiếp hiện tại; COMMUNITY với lịch và lượng hồi

**Supply Station** là công trình tiện ích trong shelter liên quan đến việc hồi **Energy** dùng cho khám phá world map và các hoạt động liên quan.

## Cơ chế chính thức hiện tại

Một bản cập nhật chính thức gần đây cho phép **nhận trực tiếp** Energy khi một hoạt động báo cần thêm Energy, không còn phải quay lại Supply Station bằng tay.

Đây là thay đổi về tiện ích sử dụng, không phải bằng chứng rằng lịch hồi hoặc lượng Energy đã thay đổi.

## Lịch hồi theo nguồn cộng đồng

Trang cộng đồng hiện ghi Energy refresh vào:

- **00:00 server time**;
- **12:00 server time**;

với mỗi cửa sổ kéo dài 12 giờ.

Do lịch này chưa được nguồn chính thức hiện tại xác nhận, Wiki vẫn giữ ở trạng thái `VERIFY SERVER 504`.

## Liên hệ với Guy

Dữ liệu cộng đồng cũng gắn **Guy** với Energy hằng ngày bổ sung và cải thiện khả năng hồi Energy. Giá trị hiện tại phải đọc trực tiếp từ tooltip Hero trong game.

## Cách dùng thực tế

Trước một block hoạt động ngoài world map: kiểm tra Energy, nhận phần hồi đang khả dụng, xem event có chấm điểm hành động tiêu hao Energy hay không, tránh để free recovery chạm cap không cần thiết, và giữ các Energy consumable nếu sắp có event giá trị cao hơn.

## Nguồn / xác minh

- Version history / direct Energy claim: https://www.ipa4fun.com/history/835232/2/
- Supply Station: https://dark-war-survival.fandom.com/wiki/Supply_Station
- Structures: https://dark-war-survival.fandom.com/wiki/Structures

> **VERIFY SERVER 504:** lượng hồi chính xác, lịch 00:00/12:00 hiện tại, carry-over/cap và giá trị Energy hiện tại của Guy.
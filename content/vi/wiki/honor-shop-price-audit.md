# Honor Shop — Price & Limit Audit

> **Xác minh gần nhất:** 8 Aug 2026  
> **Confidence:** cao với shop merge và legacy-currency conversion; current item prices/weekly limits cần Server 504 verification.

Đối với shop model ổn định, xem [Honor Shop](#/wiki/honor-shop) và [Shops & Currencies Overview](#/wiki/shops-and-currencies-overview). Page này tồn tại để audit các claim về price/limit dễ drift sau rollout hoặc tuning; [Resource Calculators](#/wiki/wiki-calculators) chỉ sử dụng official historical currency-conversion formula.

Honor Shop thay thế ba shop surface cũ:

- Capital Shop;
- Black Gold Shop;
- Arena Shop.

Official patch notes cũng xác nhận currency từ State of Supremacy, Capital Clash và Black Gold Battlefield được thay bằng **Honor Points**.

## Official conversion

Tại thời điểm migration:

- **1 Capital Glory Badge → 40 Honor Points**;
- **1 Black Gold Coin → 2 Honor Points**.

Hai tỷ lệ này đủ an toàn để sử dụng cho historical conversion math.

## Vì sao Wiki chưa publish current price table

Community discussion cho thấy giá trị trong Honor Shop từng được điều chỉnh sau khi ra mắt, bao gồm cả Precision Parts pricing. Vì vậy screenshot từ State khác hoặc tháng khác không đủ tin cậy để lập kế hoạch weekly purchase cho Server 504 hiện tại.

### Có thể publish an toàn

- shop identity và merged legacy names;
- Honor Points là unified currency;
- official legacy conversion ratios;
- các class item hiếm từng gắn với Honor-family shops.

### Cần Server 504 capture

- current Precision Parts price;
- DX Blueprint price và weekly limit;
- Design Blueprint price và weekly limit;
- Orange Hero Fragment price và weekly limit;
- Orange equipment availability và price;
- Power Core price và limit;
- State-age hoặc VIP gating nếu có.

## Purchase-priority guidance

Community thường ưu tiên các item khó kiếm như DX Blueprint, Design Blueprint và late-game equipment hơn vật liệu có thể mua rẻ ở nơi khác. Đây là **strategy opinion**, không phải fixed shop rule.

Quyết định đúng phụ thuộc vào current Server 504 price, weekly cap, bottleneck của player và việc cùng item có rẻ hơn trong Alliance/VIP/Season/Trial hay không.

## Verification template

Chụp một screenshot cho mỗi Honor Shop tab và ghi:

`Item | Honor Point cost | quantity per purchase | weekly/monthly limit | unlock condition | refresh timer`

Khi có dữ liệu này, Wiki có thể thêm sortable price table và value-per-Honor comparison một cách an toàn.

## Sources

- Official version history — Honor Shop merge and conversion: https://apps.apple.com/app/dark-war-survival/id6670441558
- Community Honor Shop discussion: https://www.reddit.com/r/darkwarsurvival/comments/1knuym8/
- Community Honor Shop priorities: https://www.reddit.com/r/darkwarsurvival/comments/1m6a73o/

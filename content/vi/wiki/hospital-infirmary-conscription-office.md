# Hospital, Infirmary & Conscription Office

> **Xác minh gần nhất:** 8 Aug 2026  
> **Độ tin cậy:** Hospital/State modifiers official+community; Infirmary và Conscription details community-backed

Cả ba hệ thống đều liên quan đến recovery, nhưng không nên xem chúng là cùng một chức năng.

## Hospital

Hospital là hệ thống chính quản lý wounded-unit capacity. Community structure pages mô tả việc nâng Hospital sẽ tăng healing capacity. Official 2026 Origin Lands patch notes cũng từng áp dụng temporary modifiers trực tiếp lên **Hospital Capacity**, xác nhận đây vẫn là một combat-risk variable đang hoạt động.

Trong một số Origin Lands War Days, official patch notes từng cấp temporary bonuses gồm Healing Speed cao hơn, Healing Cost thấp hơn và **+10,000 Hospital Capacity**. Đây là **event modifiers**, không phải permanent base values.

## Infirmary

Public sources hiện conflict:

- một số community references mô tả Infirmary dùng để chữa **sick survivors**;
- một archived page cũ lại mô tả nó như additional wounded-unit healing capacity.

Vì terminology chưa thống nhất, Wiki không gộp Infirmary vào Hospital. Current Server 504 UI phải là bằng chứng quyết định canonical function.

## Conscription Office

Community documentation mô tả Conscription Office là một reserve-recovery layer dùng khi lượng wounded vượt Hospital Capacity. Hệ thống này được cho là sử dụng **Reserve Army Badges**, và reserve capacity được scale từ Hospital Capacity thay vì tự nâng level theo cách thông thường.

Về mặt chiến lược, đây không giống healing thông thường: nó là loss-mitigation/replacement system sau khi capacity bị overflow.

## Practical risk model

`incoming wounded → Hospital Capacity → overflow risk → reserve/recovery systems → permanent loss if unrecovered`

Trước heavy PvP, nên kiểm tra capacity thực tế thay vì đánh giá mức an toàn chỉ dựa trên troop count.

## VERIFY SERVER 504

- current English tooltip và exact function của Infirmary;
- Hospital Capacity theo level và Healing Speed modifiers;
- current reserve-cap formula của Conscription Office;
- Reserve Army Badge cost và recovery ratio.

## Sources / verification

- Official App Store patch history: https://apps.apple.com/us/app/dark-war-survival/id6670441558
- Fandom Hospital: https://dark-war-survival.fandom.com/wiki/Hospital
- Fandom Conscription Office: https://dark-war-survival.fandom.com/wiki/Conscription_Office
- Japanese shelter reference: https://w.atwiki.jp/darkwarsurvival/pages/17.html

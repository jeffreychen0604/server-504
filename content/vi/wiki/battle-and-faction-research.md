# Battle & Faction Research

> **Xác minh lần cuối:** 2026-08-08  
> **Độ tin cậy:** branch structure được community-backed; exact node values chờ capture UI hiện tại

Battle research chuyển progression của tài khoản thành sức mạnh chiến đấu trực tiếp cho troop. Khác với Development và Economy, các technology này nên được đánh giá dựa trên mức chúng cải thiện formation mà bạn thực sự sử dụng.

## Các chiều combat cốt lõi

Các nguồn cộng đồng hiện tại thường mô tả Battle research xoay quanh:

- troop ATK;
- troop DEF;
- troop HP;
- troop capacity / expansion;
- bonus riêng cho Fighter;
- bonus riêng cho Rider;
- bonus riêng cho Shooter;
- các combat modifier sâu hơn trong tree.

Exact node order và max level hiện tại vẫn chưa được Wiki công bố như canonical data.

## Logic theo main faction

Research nhìn chung nên củng cố faction và formation bạn dùng thường xuyên nhất thay vì chia đều tài nguyên cho mọi troop type ngay từ đầu.

Một sequence thực dụng:

1. universal troop capacity hoặc broad combat improvements;
2. main faction của formation mạnh nhất;
3. support cho formation thứ hai;
4. off-faction completion về sau khi chi phí hợp lý.

Điều này không có nghĩa bỏ qua counter system. Fighter, Rider và Shooter vẫn tương tác qua faction counters, nên broad account strength vẫn quan trọng về dài hạn. Câu hỏi là scarce research resource tiếp theo tạo ra immediate value lớn nhất ở đâu.

## Troop Expansion

Các strategy guide cộng đồng năm 2026 thường xác định **Troop Expansion** là mục tiêu Battle giá trị cao ở giai đoạn đầu vì formation capacity lớn hơn đồng nghĩa nhiều troop hơn được hưởng mọi stat bonus khác.

Đây là strategy recommendation, không phải universal official “best node” rule. Giá trị của nó phụ thuộc current capacity, hero formation, troop tier và research cost.

## Research CP không đồng nghĩa combat efficiency

Hai technology có CP gain tương đương có thể tạo practical effect rất khác. Khi đánh giá Battle research, cần xem:

- actual stat của main squad bị tác động;
- effect áp dụng toàn troop hay chỉ một faction;
- prerequisite cost;
- research time;
- có mở deeper key node hay không;
- có thể timing với scoring event hay không.

## Quan hệ với Battle Strategy

Không nhầm ordinary **Battle** tree với **Battle Strategy**.

Battle Strategy là advanced system riêng sử dụng Wisdom Medals cho competitive combat/event progression. Official patch history 2026 nhắc trực tiếp `Research Center → Battle Strategy → Kill Training`.

Xem [Battle Strategy & Kill Training](#/wiki/battle-strategy-and-kill-training).

## Dữ liệu cần xác minh

Để dựng current numeric Battle tree, Server 504 cần capture:

- full node names;
- prerequisite arrows;
- max levels;
- faction được áp dụng;
- effect mỗi level;
- resource/Wisdom Medal requirements nếu có;
- research time.

## Nguồn / xác minh

- Official App Store version history: https://apps.apple.com/us/app/dark-war-survival/id6670441558
- Current community research strategy: https://www.ldshop.gg/blog/dark-war-survival/strategy-for-f2p-players.html
- Community competitive research guide: https://www.packsify.com/blogs/dark-war-survival-research-guide

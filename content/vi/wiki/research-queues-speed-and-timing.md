# Research Queues, Speed & Timing

> **Xác minh gần nhất:** 2026-08-08  
> **Độ tin cậy:** mạnh cho timing principles; exact VIP/queue unlock values vẫn cần current UI verification

Research progression không chỉ là chọn đúng công nghệ. Nó còn là giữ Research Center luôn hoạt động và dùng speedups đúng thời điểm.

## Research Speed

Theo community structure data, bản thân Research Center tăng Research Speed khi lên level. Các bonus khác cũng có thể đến từ account progression, heroes, VIP hoặc technologies tùy phiên bản hiện tại.

Exact stacking formula chưa được coi là canonical trong Wiki này.

## Research queues

Community guides ghi nhận có thể mở thêm research queue thông qua VIP progression và các chiến lược temporary VIP activation. Vì exact VIP unlock wording có thể thay đổi, Wiki hiện không hard-code một VIP level cụ thể như official rule khi chưa có current in-game capture.

Practical rule vẫn là:

**một research queue bị idle là thời gian progression bị mất.**

Nếu có second queue, có thể tách:

- một long-duration strategic research;
- một shorter branch-clearing hoặc prerequisite research.

## Research Speedups

Research Speedups hiệu quả nhất khi giải quyết một trong ba vấn đề:

1. chạm một meaningful technology breakpoint;
2. giải phóng một queue nếu không sẽ bị blocked;
3. overlap progression với scoring event.

Dùng lượng lớn speedups chỉ để hoàn thành ngay một low-impact node thường là timing kém.

## Claim/completion timing

Khi event tính **Tech CP gained**, thời điểm chính xác progression được ghi nhận có thể quan trọng. Tùy cách event implement, hoàn thành hoặc claim research trong scoring window có thể quan trọng hơn lúc research được bắt đầu.

Trước khi stage một long research qua reset, hãy kiểm tra active event Rules page thay vì tự giả định scoring trigger.

## Double-dip logic

Research window giá trị nhất là khi nhiều scoring actions overlap, ví dụ:

- Tech CP gained;
- Research Speedups consumed;
- Wisdom Medals consumed.

Đây là cùng nguyên tắc Server 504 đang áp dụng cho các save-and-spend systems khác: giữ non-urgent resources tới lúc một action đáp ứng nhiều event objectives.

## Những gì không nên trì hoãn

Không nên delay research chỉ vì event points nếu điều đó block:

- Watchtower prerequisite;
- troop-tier unlock;
- key Formation/queue upgrade;
- major Duel Research reward breakpoint;
- essential Battle Strategy technology trước war.

Permanent progression bị mất vài ngày có thể giá trị hơn số event points thêm được.

## Research-time verification queue

Server 504 vẫn cần capture:

- current second-queue unlock condition;
- VIP research bonuses;
- Research Center speed effect theo level;
- Tech CP scoring trigger trong active events;
- current speedup point values.

## Sources / verification

- Research Center community structure table: https://dark-war-survival.fandom.com/wiki/Research_Center
- Current F2P research guide: https://www.ldshop.gg/blog/dark-war-survival/strategy-for-f2p-players.html
- Survival Preparedness scoring reference: https://darkwardata.com/events/survival-preparedness-event/

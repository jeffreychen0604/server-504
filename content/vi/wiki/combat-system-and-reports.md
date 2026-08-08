# Hệ thống Combat & Battle Report

> **Xác minh lần cuối:** 7/8/2026  
> **Độ tin cậy nguồn:** Cao đối với hành vi world battle/report hiện tại; trung bình đối với chi tiết damage engine được community test.

Dark War: Survival sử dụng cùng một hệ đầu tư account cho nhiều battle mode, nhưng cách các khoản đầu tư đó thể hiện không hoàn toàn giống nhau trong mọi trận đánh. Khi lập kế hoạch thực tế, nên tách **troop battle** khỏi **hero battle / Adventure-style combat**.

## Troop battle

Troop battle là chuẩn tham chiếu chính cho chiến tranh giữa người chơi. Nhóm này gồm World Map PvP, shelter attack/defense, Rally, nhiều trận Alliance và các giao tranh tạo Battle Report.

Battle Report hữu ích hơn banner thắng/thua vì nó cho thấy các nguồn sức mạnh thật của Formation, gồm:

- số troop và troop còn lại;
- đóng góp của Hero;
- Hero Equipment;
- Research/technology;
- bonus từ Modified Vehicle / APC;
- bonus theo Faction;
- combat round và thời điểm Skill kích hoạt.

Các test battle log của community cho thấy troop combat cộng nhiều bonus phần trăm vào một pool sức mạnh chung ở cấp Formation. Vì vậy một Formation có CP hiển thị thấp hơn đôi khi vẫn đánh tốt hơn nếu Faction Research, Hero passive và Vehicle bonus đồng bộ hơn.

## Hero battle / Adventure combat

Các encounter kiểu Adventure hiển thị combat xoay quanh từng Hero riêng lẻ. Community testing phân biệt rõ front-line defensive role với back-line damage role và cho thấy stat cá nhân cùng Gear allocation của Hero ảnh hưởng trực tiếp hơn so với troop battle.

Công thức ẩn chính xác không được nhà phát triển công bố, vì vậy Wiki Server 504 chỉ coi các damage formula cụ thể là **community-tested**, không phải hằng số chính thức.

## Cách dùng Battle Report để cải thiện đội hình

Khi xem một trận thua, nên kiểm tra theo thứ tự:

1. **Troop Tier và troop count** — Formation thiếu quân sẽ mất damage output và durability rất nhanh.
2. **Faction matchup** — counter giữa Fighter, Rider và Shooter có thể đảo chiều một trận gần cân bằng.
3. **Hero passive / Formation buff** — nhiều hiệu ứng scale cho toàn troop chứ không chỉ một Hero.
4. **Research** — đặc biệt ATK/DEF/HP/damage của Faction chính.
5. **Hero Equipment** — so sánh đóng góp thật trong report, không chỉ Equipment CP.
6. **Modified Vehicle và Chips** — late-game Vehicle bonus có thể là một trong các dòng lớn nhất trong report.
7. **Season, Alliance, Wonder, Skin và các account-wide bonus khác**.

## Lưu ý về damage cycle

Một số community test report mô tả chu kỳ lặp giữa normal attack và Skill activation, đồng thời cho thấy Skill kích hoạt ở các round tương đối dự đoán được. Vì developer không công bố công thức combat hoàn chỉnh, Wiki không nên biến các công thức round reverse-engineered thành hành vi chắc chắn nếu chưa có Battle Report hiện tại từ Server 504 để xác minh.

## Chuẩn evidence của Server 504

Với các bài phân tích combat formula sau này, nên lưu screenshot của:

- troop overview;
- trang Troop Buffs;
- so sánh Hero Equipment;
- round-by-round log;
- Formation của attacker và defender.

Nhờ vậy công thức có thể được test lại sau patch thay vì phụ thuộc vào guide cũ.

## Nguồn

- Apple App Store version history — thay đổi world battle chính thức: https://apps.apple.com/app/dark-war-survival/id6670441558
- Dark War community battle-system testing: https://dark-war.com/dps
- Dark War community combat-report walkthrough: https://dark-war.com/troop-battles
- Dark War community Hero Battle testing: https://dark-war.com/hero-battles

# Cơ sở dữ liệu Hero

> **Xác minh lần cuối:** 7/8/2026  
> **Phạm vi:** Hero hạng S / Orange có đủ bằng chứng công khai để xây dựng hồ sơ cơ bản ổn định.  
> **Chính sách nguồn:** Faction, specialty và nguồn sở hữu được lưu tách biệt khỏi meta ranking. Những điểm xung đột sẽ được giữ nguyên cho tới khi bằng chứng trong game của Server 504 giải quyết được.

Hero Database được xây dựng như một **lớp dữ liệu tra cứu**, không phải một tier list cố định. Một Hero vẫn có thể được phân loại đúng ngay cả khi meta chiến đấu thay đổi do Hero mới, Exclusive Equipment, Industrial progression hoặc các bản balance patch.

## Roster cơ bản đã xác minh

| Hero | Faction | Specialty / type | Nguồn sở hữu thường gặp | Trạng thái |
| --- | --- | --- | --- | --- |
| [Guy](#/wiki/hero-guy) | Fighter | Adventure / Combat | Radio Station, một số Radar fragment, first top-up | XUNG ĐỘT TYPE — cần kiểm tra trong game |
| [Tristan](#/wiki/hero-tristan) | Fighter | Combat | Elite Recruitment, Goodie Bazaar | Đã xác minh bằng dữ liệu cộng đồng |
| [Francis](#/wiki/hero-francis) | Fighter | Combat | Goodie Bazaar | Đã xác minh bằng dữ liệu cộng đồng |
| [Noah](#/wiki/hero-noah) | Fighter | Combat | Legend Battle Pass | Đã xác minh bằng dữ liệu cộng đồng |
| [Catherine & Rex](#/wiki/hero-catherine-and-rex) | Fighter | Radar | Legend Battle Pass / một số offer | Đã xác minh bằng dữ liệu cộng đồng |
| [Quinn](#/wiki/hero-quinn) | Rider | Alliance Duel | Radio Station | Đã xác minh bằng dữ liệu cộng đồng |
| [Corleone](#/wiki/hero-corleone) | Rider | Tech Research | Prime Recruitment, Goodie Bazaar | Đã xác minh bằng dữ liệu cộng đồng |
| [Cyrus](#/wiki/hero-cyrus) | Rider | Combat | Elite Recruitment, Goodie Bazaar | Đã xác minh bằng dữ liệu cộng đồng |
| [Marcia](#/wiki/hero-marcia) | Rider | Combat | Elite Recruitment, Goodie Bazaar | Đã xác minh bằng dữ liệu cộng đồng |
| [Katrina](#/wiki/hero-katrina) | Rider | Combat | Lucky Chest, Elite Recruitment | TÊN CẦN KIỂM TRA TRÊN UI |
| [Lucas](#/wiki/hero-lucas) | Rider | Combat | Legend Battle Pass, Elite Recruitment, offer | Đã xác minh bằng dữ liệu cộng đồng |
| [Evans](#/wiki/hero-evans) | Shooter | Vehicle Transformation | Radio Station | Đã xác minh bằng dữ liệu cộng đồng |
| [Natasha](#/wiki/hero-natasha) | Shooter | Combat | Elite Recruitment | Đã xác minh bằng dữ liệu cộng đồng |
| [Margaret](#/wiki/hero-margaret) | Shooter | Combat | Goodie Bazaar | Đã xác minh bằng dữ liệu cộng đồng |
| [Megan](#/wiki/hero-megan) | Shooter | Construction | Prime Recruitment | Đã xác minh bằng dữ liệu cộng đồng |
| [Darian](#/wiki/hero-darian) | Shooter | Combat | Legend Battle Pass, Lucky Chest | Đã xác minh bằng dữ liệu cộng đồng |
| [Rosa](#/wiki/hero-rosa) | Shooter | Combat | Legend Battle Pass | Đã xác minh bằng dữ liệu cộng đồng |

## Hồ sơ đang chờ xác minh

### [Lan Yan — Chờ xác minh](#/wiki/hero-lan-yan-pending)

Lan Yan có một hồ sơ riêng cho phần skill và acquisition tương đối ổn định, nhưng **chưa được đưa vào bảng faction canonical**. Một trang DarkWarData hiện tại mô tả cô là Fighter trong phần văn bản và có passive hướng Fighter, trong khi field faction có cấu trúc trên chính trang đó lại ghi Shooter.

Cho tới khi Hero Index của Server 504 hoặc một nguồn độc lập, hiện hành và rõ ràng giải quyết được mâu thuẫn này, Wiki không được tự ý chọn một bên.

## Hàng đợi xung đột dữ liệu

### Cách viết Katrina / Katerina

Các database cộng đồng nhất quán sử dụng **Katrina**, trong khi một patch note chính thức năm 2025 dùng **Katerina** khi nhắc tới việc tối ưu animation Exclusive Equipment cùng Darian. Đây có thể là khác biệt localization hoặc wording của patch note. UI tiếng Anh hiện tại của Server 504 nên là căn cứ quyết định cách viết canonical.

### Specialty của Guy

DarkWarData mô tả Guy là Hero Adventure trong phần giới thiệu nhưng field `Type` có cấu trúc lại ghi Combat. Passive về Adventure food/energy và khả năng dùng trong combat đều là dữ liệu có thật, vì vậy Wiki giữ trạng thái type chưa giải quyết thay vì loại bỏ một phía của bằng chứng.

## Vì sao specialty quan trọng

Không phải mọi Hero hạng S chỉ tồn tại để tăng damage trên chiến trường. Một số Hero đem lại utility lâu dài cho account:

- **Quinn** — Unit Training / Alliance Duel progression;
- **Corleone** — Research economy và speed;
- **Megan** — Construction economy và speed;
- **Evans** — Modified Vehicle / Gear progression;
- **Catherine & Rex** — Radar progression;
- **Guy** — Adventure food và energy utility.

Vì vậy một Hero vẫn có thể rất giá trị dù không nằm trong formation PvP mạnh nhất hiện tại.

## Quy tắc về Exclusive Equipment

Patch note chính thức cho biết hệ thống Hero Exclusive Weapon / Exclusive Equipment:

- mở khi State đạt đủ thời gian progression yêu cầu;
- áp dụng cho **Hero chất lượng Orange**;
- mở slot Exclusive Equipment khi Hero đạt **2 Stars**;
- bổ sung Troop Damage, Troop HP và tăng hiệu quả faction counter;
- mở thêm một special combat skill.

Các update sau đó bổ sung Red Star breakthrough, Hall of Honor progression và khả năng swap star level giữa các Red Star Exclusive Equipment bằng **Core of Rotation**.

Vì Exclusive Equipment có thể thay đổi đáng kể giá trị của Hero, Wiki phải tách **hero identity data** khỏi **current investment ranking**.

## Trạng thái hồ sơ cá nhân

Roster hạng S công khai hiện đã có trang riêng cho toàn bộ các entry đã xác minh, cùng một trang chờ xác minh cho Lan Yan. Mỗi trang tách dữ liệu identity/skill ổn định khỏi investment advice thay đổi nhanh theo meta.

## Nguồn

- Dark War Survival Data — Heroes archive: https://darkwardata.com/category/heroes/
- Dark War Survival community Fandom — factions: https://dark-war-survival.fandom.com/wiki/Factions
- Apple App Store — official version history / Exclusive Equipment rules: https://apps.apple.com/app/dark-war-survival/id6670441558

> Các archive Hero cộng đồng đã retired được chủ động loại khỏi nhóm nguồn có thẩm quyền hiện tại.

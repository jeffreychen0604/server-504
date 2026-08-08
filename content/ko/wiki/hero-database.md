# 영웅 데이터베이스

> **마지막 확인:** 2026년 8월 7일  
> **범위:** 안정적인 1차 프로필을 만들 수 있을 만큼 공개 근거가 확보된 S등급 / Orange 영웅.  
> **출처 정책:** 진영, 특화 분야, 획득처는 메타 순위와 분리해서 기록한다. 충돌하는 정보는 Server 504 인게임 근거로 해결될 때까지 그대로 표시한다.

Hero Database는 **참조용 데이터 레이어**이며 영구적인 tier list가 아니다. 신규 영웅, Exclusive Equipment, Industrial 진행도, 밸런스 패치로 전투 메타가 바뀌더라도 영웅의 기본 분류 자체는 올바르게 유지될 수 있다.

## 확인된 1차 로스터

| 영웅 | 진영 | 특화 / 타입 | 대표 획득 경로 | 상태 |
| --- | --- | --- | --- | --- |
| [Guy](#/wiki/hero-guy) | Fighter | Adventure / Combat | Radio Station, 일부 Radar 조각, 첫 top-up | TYPE 충돌 — 인게임 확인 필요 |
| [Tristan](#/wiki/hero-tristan) | Fighter | Combat | Elite Recruitment, Goodie Bazaar | 커뮤니티 데이터 확인 |
| [Francis](#/wiki/hero-francis) | Fighter | Combat | Goodie Bazaar | 커뮤니티 데이터 확인 |
| [Noah](#/wiki/hero-noah) | Fighter | Combat | Legend Battle Pass | 커뮤니티 데이터 확인 |
| [Catherine & Rex](#/wiki/hero-catherine-and-rex) | Fighter | Radar | Legend Battle Pass / 일부 상품 | 커뮤니티 데이터 확인 |
| [Quinn](#/wiki/hero-quinn) | Rider | Alliance Duel | Radio Station | 커뮤니티 데이터 확인 |
| [Corleone](#/wiki/hero-corleone) | Rider | Tech Research | Prime Recruitment, Goodie Bazaar | 커뮤니티 데이터 확인 |
| [Cyrus](#/wiki/hero-cyrus) | Rider | Combat | Elite Recruitment, Goodie Bazaar | 커뮤니티 데이터 확인 |
| [Marcia](#/wiki/hero-marcia) | Rider | Combat | Elite Recruitment, Goodie Bazaar | 커뮤니티 데이터 확인 |
| [Katrina](#/wiki/hero-katrina) | Rider | Combat | Lucky Chest, Elite Recruitment | 이름 UI 확인 필요 |
| [Lucas](#/wiki/hero-lucas) | Rider | Combat | Legend Battle Pass, Elite Recruitment, 상품 | 커뮤니티 데이터 확인 |
| [Evans](#/wiki/hero-evans) | Shooter | Vehicle Transformation | Radio Station | 커뮤니티 데이터 확인 |
| [Natasha](#/wiki/hero-natasha) | Shooter | Combat | Elite Recruitment | 커뮤니티 데이터 확인 |
| [Margaret](#/wiki/hero-margaret) | Shooter | Combat | Goodie Bazaar | 커뮤니티 데이터 확인 |
| [Megan](#/wiki/hero-megan) | Shooter | Construction | Prime Recruitment | 커뮤니티 데이터 확인 |
| [Darian](#/wiki/hero-darian) | Shooter | Combat | Legend Battle Pass, Lucky Chest | 커뮤니티 데이터 확인 |
| [Rosa](#/wiki/hero-rosa) | Shooter | Combat | Legend Battle Pass | 커뮤니티 데이터 확인 |

## 검증 대기 프로필

### [Lan Yan — 검증 대기](#/wiki/hero-lan-yan-pending)

Lan Yan은 스킬과 획득 정보가 비교적 안정적이기 때문에 별도 프로필이 있지만, 아직 **공식 진영 표에는 넣지 않는다**. 현재 DarkWarData의 같은 페이지에서 설명문은 Fighter라고 하고 Fighter 계열 패시브를 제시하는 반면, 구조화된 faction 항목은 Shooter라고 표시한다.

Server 504 영웅 인덱스나 독립적인 최신 자료가 이 충돌을 해결하기 전까지 Wiki가 임의로 한쪽을 선택해서는 안 된다.

## 충돌 정보 목록

### Katrina / Katerina 표기

커뮤니티 데이터베이스는 일관되게 **Katrina**를 사용하지만, 2025년 공식 패치 노트는 Darian과 함께 Exclusive Equipment 애니메이션 최적화를 언급하며 **Katerina**라고 표기했다. 현지화 또는 패치 노트 표기 차이일 수 있으므로 Server 504의 현재 영어 UI를 기준으로 최종 이름을 정해야 한다.

### Guy 특화 타입

DarkWarData 소개문은 Guy를 Adventure 타입으로 설명하지만 구조화된 `Type` 항목은 Combat으로 표시한다. Adventure 음식/에너지 패시브와 전투 활용 모두 실제로 존재하므로, Wiki는 어느 한쪽을 삭제하지 않고 공식 타입을 미확정 상태로 둔다.

## 특화 분야가 중요한 이유

모든 S등급 영웅이 전투 피해 증가만을 위해 존재하는 것은 아니다. 일부 영웅은 장기적인 계정 성장 가치를 제공한다.

- **Quinn** — 유닛 훈련 / Alliance Duel 성장;
- **Corleone** — 연구 비용 효율과 속도;
- **Megan** — 건설 효율과 속도;
- **Evans** — Modified Vehicle / Gear 성장;
- **Catherine & Rex** — Radar 성장;
- **Guy** — Adventure 음식 및 에너지 효율.

따라서 현재 최상위 PvP 편성에 들어가지 않더라도 충분히 가치 있는 영웅이 있을 수 있다.

## Exclusive Equipment 규칙

공식 패치 노트에 따르면 Hero Exclusive Weapon / Exclusive Equipment 시스템은:

- State가 필요한 진행 기간에 도달한 뒤 개방되고;
- **Orange 등급 영웅**에 적용되며;
- 영웅이 **2 Stars**가 되면 Exclusive Equipment 슬롯이 열린다;
- 병력 피해, 병력 HP, 진영 상성 효과를 강화하고;
- 추가 특수 전투 스킬을 개방한다.

이후 업데이트에서는 Red Star breakthrough, Hall of Honor 진행, 그리고 **Core of Rotation**을 사용한 Red Star Exclusive Equipment 별 등급 교환도 추가됐다.

Exclusive Equipment는 영웅 가치 자체를 크게 바꿀 수 있으므로 Wiki는 **영웅의 정체성 데이터**와 **현재 투자 우선순위**를 반드시 분리해야 한다.

## 개별 프로필 상태

현재 공개 S등급 로스터의 확인된 영웅은 모두 개별 페이지를 갖고 있으며 Lan Yan은 검증 대기 페이지로 분리되어 있다. 각 페이지는 안정적인 기본 정보와 빠르게 변하는 투자 조언을 분리한다.

## 출처

- Dark War Survival Data — Heroes archive: https://darkwardata.com/category/heroes/
- Dark War Survival community Fandom — factions: https://dark-war-survival.fandom.com/wiki/Factions
- Apple App Store — official version history / Exclusive Equipment rules: https://apps.apple.com/app/dark-war-survival/id6670441558

> 오래된 커뮤니티 영웅 아카이브는 현재 출처 권위에서 의도적으로 제외한다.

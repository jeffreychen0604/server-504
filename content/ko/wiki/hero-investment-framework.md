# 영웅 투자 프레임워크

> **마지막 확인:** 2026년 8월 7일  
> **목적:** 안정적인 영웅 데이터와 빠르게 변하는 메타 추천을 분리한다.

Dark War: Survival에서 영구적인 tier list는 적합하지 않다. 영웅 가치는 다음 요소에 따라 달라지기 때문이다.

- State 나이와 영웅 세대;
- 진영 연구 깊이;
- 별 단계와 조각 확보량;
- 일반 장비 품질;
- Exclusive Equipment 보유 및 breakthrough 단계;
- APC/chip 정렬;
- 이미 투입한 자원;
- PvP, boss, Adventure 또는 성장 목표.

따라서 Server 504 Wiki는 하나의 공개 tier list를 절대 기준으로 쓰지 않고 **투자 프레임워크**를 사용한다.

## 1. Combat-first인지 Progression-first인지 먼저 구분

### Combat-first 예시

현재 S등급 데이터에서는:

- Tristan, Francis, Noah;
- Cyrus, Marcia, Katrina, Lucas;
- Natasha, Margaret, Darian, Rosa.

이 영웅들은 주력 진영, 편성 역할, 별, 장비, Exclusive Equipment를 중심으로 평가해야 한다.

### Progression-first 예시

- **Quinn** — 훈련 및 Alliance Duel 가치;
- **Corleone** — 연구 가치;
- **Megan** — 건설 가치;
- **Evans** — Modified Vehicle 성장;
- **Catherine & Rex** — Radar 성장;
- **Guy** — Adventure 음식 / 에너지 가치.

성장형 영웅은 최고 PvP 슬롯에서 밀려나더라도 별을 올릴 가치가 남을 수 있다.

## 2. 개별 영웅 인기보다 주력 진영이 우선

잘못된 진영의 강한 영웅은 기존 투자를 증폭시키는 조금 약한 영웅보다 계정 가치가 낮을 수 있다.

- 병력 연구;
- 진영 패시브;
- 병력 tier 투자;
- APC chips;
- 장비 계획;
- 편성 presets.

대부분의 계정은 새 영웅이 tier list에 등장할 때마다 갈아타는 것보다 하나의 주력 진영에 깊게 투자하는 편이 효율적이다.

## 3. 이론적 강함보다 교체 비용을 비교

기존 영웅을 교체하기 전에 다음을 비교한다.

- 현재 별 차이;
- 조각 확보 가능성;
- 스킬 투자;
- 이미 배정한 장비;
- Exclusive Equipment 투자;
- 신규 영웅 때문에 진영 또는 편성 구조를 바꿔야 하는지.

신규 영웅이 동일 육성 기준으로 더 강하더라도 성숙한 계정에서는 즉시 교체가 비효율적일 수 있다.

## 4. Exclusive Equipment가 결론을 바꿀 수 있음

공식 패치 노트에 따르면 State가 필요한 진행 나이에 도달하고 Orange 영웅이 2 Stars가 되면 Exclusive Equipment를 사용할 수 있다. 전투 속성과 특수 전투 스킬이 추가된다.

이후 Red Star breakthrough, Hall of Honor, Red Star Exclusive Equipment 별 등급 교환이 추가됐다.

따라서 모든 메타 평가는 최소한 다음 두 상태를 분리해야 한다.

- **Exclusive Equipment 없음**
- **현재 Exclusive Equipment 상태 적용**

두 상태를 동일하게 보고 영웅을 평가하면 안 된다.

## 5. Hero Battle 역할은 진영과 별개

커뮤니티 테스트는 Hero Battles / Adventure에서 진영 외에 역할 기능이 존재한다고 설명한다. Tanker형 영웅은 전열 생존을 담당하고 Striker형 영웅은 스킬 사이 구간의 지속 피해를 담당한다.

따라서 진영이 맞더라도 frontline/backline 역할 구성이 나쁘면 편성이 실패할 수 있다.

향후 개별 영웅 페이지에서는 인게임 역할 아이콘을 진영 및 특화와 별도 필드로 기록해야 한다.

## 6. 영구 tier 대신 의사결정 라벨 사용

Server 504 권장 라벨:

- **Core now** — 현재 주력 편성에 중요;
- **Build if switching** — 해당 진영으로 전환할 때 좋은 후보;
- **Progression utility** — 경제/이벤트 가치 때문에 육성할 만함;
- **Keep invested** — 별/장비가 이미 높아 기존 투자를 유지하는 편이 효율적;
- **Replace only after breakpoint** — 정해진 별/장비 기준을 넘은 뒤에야 교체 효율이 생김;
- **Verification pending** — 공개 출처가 충돌하거나 최신 Server 504 데이터가 없음.

맥락 없는 `S+ / S / A`보다 실제 의사결정에 더 유용하다.

## 7. 업데이트 주기

이름, 진영, 특화처럼 안정적인 필드는 거의 변하지 않는다. 메타 관련 필드는 각각 별도의 날짜를 가져야 한다.

- `identity_verified_at`
- `skills_verified_at`
- `exclusive_equipment_verified_at`
- `meta_reviewed_at`

이렇게 하면 오래된 추천 때문에 전체 프로필이 최신처럼 보이는 문제를 막을 수 있다.

## 순위 판단에 중요한 공식 영웅 시스템 변화

공식 버전 기록은 오래된 영웅 가이드를 그대로 복사하기 위험하게 만드는 여러 변화를 확인해 준다.

- 영웅 스킬과 진영 시스템이 여러 차례 조정됨;
- Orange 영웅용 Exclusive Equipment 추가;
- 이후 Red Star와 Hall of Honor 추가;
- 2025년 Blue/Purple Exclusive Talents 재조정;
- 영웅 인덱스에 시즌 라벨 추가;
- Exclusive Equipment 비주얼과 시스템이 계속 업데이트됨.

## 출처

- Apple App Store — Dark War: Survival version history: https://apps.apple.com/app/dark-war-survival/id6670441558
- DarkWarData — hero database: https://darkwardata.com/category/heroes/
- Dark War Survival Guide — Hero Battles: https://www.dark-war.com/hero-battles
- Meta Instincts community guide — Hero system update: https://www.youtube.com/watch?v=Puu04O5qn7g

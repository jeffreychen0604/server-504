# 전투 시스템 & Battle Report

> **마지막 확인:** 2026년 8월 7일  
> **출처 신뢰도:** 현재 World Battle/Report 동작은 높음. 커뮤니티가 테스트한 세부 Damage Engine은 중간 수준.

Dark War: Survival은 여러 전투 모드에서 동일한 계정 성장 요소를 사용하지만, 모든 전투에서 그 효과가 같은 방식으로 나타나는 것은 아닙니다. 실전 계획에서는 **troop battle**과 **hero battle / Adventure-style combat**을 구분해 보는 것이 좋습니다.

## Troop battle

Troop battle은 서버 전쟁의 기본 기준입니다. World Map PvP, Shelter 공격/방어, Rally, 각종 Alliance 전투와 Battle Report가 생성되는 교전을 포함합니다.

Battle Report는 단순 승패 표시보다 Formation의 실제 강점을 확인하는 데 더 유용합니다. 주요 항목은 다음과 같습니다.

- troop 수와 남은 troop 수;
- Hero 기여도;
- Hero Equipment;
- Research/technology;
- Modified Vehicle / APC 보너스;
- Faction 관련 보너스;
- combat round와 Skill 발동.

커뮤니티 battle-log 테스트에 따르면 troop combat은 여러 퍼센트 보너스를 Formation 단위의 공통 전투 풀에 합산하는 형태를 보입니다. 따라서 표시 CP가 더 낮더라도 Faction Research, Hero passive, Vehicle bonus가 더 잘 맞는 Formation이 실제 전투에서 더 강할 수 있습니다.

## Hero battle / Adventure combat

Adventure 계열 전투는 개별 Hero 중심으로 진행되는 모습이 더 명확합니다. 커뮤니티 테스트에서는 front-line defensive role과 back-line damage role을 구분하며, troop battle보다 개별 Hero stat과 Gear 배치가 더 직접적으로 영향을 준다고 보고합니다.

정확한 내부 공식은 공식적으로 공개되지 않았으므로 Server 504 Wiki는 구체적인 Damage Formula를 **커뮤니티 테스트 결과**로 취급하며 공식 상수로 단정하지 않습니다.

## Battle Report로 개선하는 방법

패배를 분석할 때는 다음 순서로 격차를 확인하세요.

1. **Troop Tier와 troop count** — Formation이 덜 채워져 있으면 damage output과 durability가 빠르게 떨어집니다.
2. **Faction matchup** — Fighter, Rider, Shooter counter 관계는 근소한 전투 결과를 바꿀 수 있습니다.
3. **Hero passive / Formation buff** — 한 Hero가 아니라 전체 troop에 적용되는 경우가 많습니다.
4. **Research** — 특히 주력 Faction의 ATK/DEF/HP/damage 연구.
5. **Hero Equipment** — Equipment CP만 보지 말고 report의 실제 기여도를 비교합니다.
6. **Modified Vehicle과 Chips** — late game에서는 Vehicle bonus가 report에서 가장 큰 항목 중 하나가 될 수 있습니다.
7. **Season, Alliance, Wonder, Skin 및 기타 account-wide bonus**.

## Damage cycle 주의

여러 커뮤니티 테스트는 normal attack / Skill activation이 반복되는 cycle과 비교적 일정한 round에서 Skill이 발동하는 패턴을 보고합니다. 개발사가 전체 combat formula를 공개하지 않았기 때문에, 현재 Server 504 Battle Report로 재검증하지 않은 reverse-engineered round formula를 확정 규칙처럼 제시해서는 안 됩니다.

## Server 504 evidence 기준

향후 combat formula 문서에서는 다음 screenshot을 보존하는 것이 좋습니다.

- troop overview;
- Troop Buffs 페이지;
- Hero Equipment 비교;
- round-by-round log;
- attacker와 defender Formation 구성.

이렇게 해야 패치 이후에도 공식을 다시 테스트할 수 있으며 오래된 guide에만 의존하지 않게 됩니다.

## 출처

- Apple App Store version history — 공식 world battle 변경: https://apps.apple.com/app/dark-war-survival/id6670441558
- Dark War community battle-system testing: https://dark-war.com/dps
- Dark War community combat-report walkthrough: https://dark-war.com/troop-battles
- Dark War community Hero Battle testing: https://dark-war.com/hero-battles

# Rally, Reinforcement & Defense

> **마지막 확인:** 2026년 8월 7일  
> **출처 신뢰도:** 현재 Capital/Turret 및 Rally Restriction 기능은 높음. 상황별 커뮤니티 관찰은 중간 수준.

Rally와 Reinforcement는 Alliance 단위 전투 도구입니다. 현재 동작은 여러 패치를 거치며 바뀌었으므로 “Rally는 하나만 가능” 같은 오래된 안내나 과거 capacity 정보는 틀릴 수 있습니다.

## Rally

Rally는 한 플레이어가 Alliance 공격을 시작하고 다른 member가 참여하는 방식입니다. 시작한 플레이어가 target을 선택하며 기능이 활성화된 경우 Rally Restriction을 설정할 수 있습니다.

2026년 공식 world-battle notes는 **unit type 기준 Rally Restriction**을 확인해 줍니다. 게임은 troop에 따라 해당 restriction setting을 저장하므로 Faction별 Rally preset을 다시 사용하기도 쉬워졌습니다.

### Restriction이 중요한 이유

Rally 전략이 Fighter, Rider 또는 Shooter buff에 맞춰져 있다면 모든 Faction이 참여하도록 두는 것은 synergy를 약화시킬 수 있습니다. 따라서 Restriction은 단순 편의 기능이 아니라 실제 운영 도구입니다.

Rally initiator와 joiner의 정확한 전투 기여도는 Battle Report로 확인해야 합니다. Wiki는 검증 없이 “Rally Lead의 stat이 모든 것을 결정한다” 같은 보편 규칙을 게시하지 않습니다. 커뮤니티 토론에서는 이 메커니즘이 과도하게 단순화되는 경우가 많습니다.

## Capital 및 Turret 변경

2025년 12월 공식 notes는 Capital/Turret 전투를 크게 변경했습니다.

- **Capital**과 **Turret**의 Rally 수 제한 제거;
- 해당 target에 대한 Reinforcement 제한 제거;
- 여러 Rally를 동시에 시작하고 여러 Reinforcement squad를 독립적으로 보낼 수 있음;
- Capital/Turret에 Rally를 시작하거나 Reinforcement를 보낼 때 **40,000 troop capacity** 추가.

이 규칙들은 해당 patch 이전에 작성된 오래된 guide보다 우선합니다.

## Reinforcement

Reinforcement는 Formation을 다른 Shelter나 structure에 보내 방어하는 기능입니다. Alliance war, Zombie Siege, Territory defense, Capital/Turret control에 사용됩니다.

커뮤니티 관찰에서는 점령한 Alliance Territory 내부의 Reinforcement 이동이 미점령 구역보다 빠를 수 있다고 보고합니다. 이는 고정 multiplier로 단정하지 않고 live server에서 확인해야 하는 map/territory behavior로 취급합니다.

## City Gate Defense

공식 업데이트에서 **Defense Preset**이 추가되었습니다.

- 여러 defense squad를 미리 준비할 수 있음;
- 첫 preset의 Hero가 다른 곳에서 사용 중이면 다음 preset 사용;
- fallback preset이 없으면 사용 가능한 가장 강한 Hero가 자동 배치됨.

대규모 전투 전에는 Defense Formation이 현재 Rally, Gathering 또는 원거리 march에 참여 중인 Hero에 의존하고 있지 않은지 확인해야 합니다.

## Bio-Mutant 특수 규칙

2026년 공식 notes는 Bio-Mutant에 특별 규칙을 추가했습니다. Rally initiator의 Shelter가 Frankenstein으로부터 **20 tiles 이내**에 있으면 Rally force의 march time이 **3초**로 고정됩니다. 이는 Event 전용 메커니즘이며 일반 PvP Rally에 적용해서는 안 됩니다.

## Server 504 운영 체크리스트

중요한 Rally에서는:

1. Rally Lead가 target과 요구 Faction을 공지;
2. launch 전 Rally Restriction 확인;
3. joiner는 요청된 unit type을 사용하고 잘못된 troop이나 불완전한 squad를 피함;
4. 별도 지시가 없다면 핵심 Defense Preset에 필요한 Hero를 소모하지 않음;
5. 전투 후 report를 확인하고 실제 buff gap에 맞춰 조정.

## 출처

- Apple App Store version history — Capital/Turret Rally·Reinforcement 변경, Rally Restriction, Bio-Mutant timing: https://apps.apple.com/app/dark-war-survival/id6670441558
- Rally Restriction community walkthrough: https://www.lootbar.com/blog/en/rally-restriction-mechanic-in-dark-war-survival.html
- Community combat-report reference: https://dark-war.com/troop-battles

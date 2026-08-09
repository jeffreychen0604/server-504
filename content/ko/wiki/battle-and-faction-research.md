# Battle & Faction Research

> **마지막 확인:** 2026-08-08  
> **신뢰도:** branch 구조는 커뮤니티 자료 기반; 정확한 node 수치는 현재 UI 캡처 필요

Battle research는 계정 성장을 실제 병력 전투력으로 전환한다. Development와 Economy와 달리, 이 기술들은 실제로 출전하는 formation을 얼마나 강화하는지로 평가하는 것이 중요하다.

## 핵심 전투 항목

공개 커뮤니티 자료에서는 Battle 연구를 주로 다음 항목으로 설명한다.

- troop ATK
- troop DEF
- troop HP
- troop capacity / expansion
- Fighter 전용 보너스
- Rider 전용 보너스
- Shooter 전용 보너스
- 트리 후반부의 기타 전투 modifier

현재 node 순서와 최대 레벨 전체는 아직 이 Wiki의 canonical 데이터로 게시되지 않았다.

## 주력 진영 우선순위

연구는 초반부터 모든 병종에 균등 투자하기보다 가장 자주 사용하는 주력 faction과 formation을 우선 강화하는 편이 일반적으로 효율적이다.

실전 순서는 다음과 같다.

1. 범용 troop capacity 또는 광범위한 전투 보너스
2. 가장 강한 formation의 주력 faction
3. 두 번째 formation 지원
4. 비용 대비 가치가 생긴 뒤 off-faction 보완

그렇다고 faction counter를 무시하는 것은 아니다. Fighter, Rider, Shooter는 계속 상성 관계를 가지므로 장기적으로는 계정 전체 전력이 필요하다. 핵심은 다음 희소 연구 자원이 어디에서 가장 즉각적인 가치를 만드는가이다.

## Troop Expansion

현재 2026년 커뮤니티 전략 가이드에서는 **Troop Expansion**을 초기 Battle 연구의 높은 우선순위로 자주 추천한다. formation capacity가 늘면 다른 모든 전투 stat 보너스를 받는 병력 수 자체가 증가하기 때문이다.

다만 이는 전략 추천이지 공식적인 “항상 최고의 node” 규칙은 아니다. 현재 capacity, hero formation, troop tier, 연구 비용에 따라 실제 가치는 달라진다.

## Research CP와 전투 효율은 다르다

비슷한 CP를 주는 두 기술도 실전 효과는 크게 다를 수 있다. Battle research를 평가할 때는 다음을 본다.

- 실제 main squad에 적용되는 stat
- 전체 병력인지 특정 faction인지
- 선행 연구 비용
- 연구 시간
- 더 깊은 핵심 node를 여는지
- 이벤트 점수 창과 맞출 수 있는지

## Battle Strategy와의 관계

일반 **Battle** 트리와 **Battle Strategy**를 혼동하지 않는다.

Battle Strategy는 Wisdom Medals를 사용하는 별도 고급 경쟁 연구 시스템이다. 2026년 공식 패치 기록은 `Research Center → Battle Strategy → Kill Training` 경로를 직접 언급한다.

자세한 내용은 [Battle Strategy & Kill Training](#/wiki/battle-strategy-and-kill-training)을 참고한다.

## 검증에 필요한 데이터

현재 Battle 트리를 수치화하려면 Server 504 캡처에 다음이 필요하다.

- 전체 node 이름
- prerequisite 화살표
- 최대 레벨
- 적용 faction
- 레벨별 효과
- 필요한 자원/Wisdom Medals
- 연구 시간

## 출처 / 검증

- Official App Store version history: https://apps.apple.com/us/app/dark-war-survival/id6670441558
- Current community research strategy: https://www.ldshop.gg/blog/dark-war-survival/strategy-for-f2p-players.html
- Community competitive research guide: https://www.packsify.com/blogs/dark-war-survival-research-guide

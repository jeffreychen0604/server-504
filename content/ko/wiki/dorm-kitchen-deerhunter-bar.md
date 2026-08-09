# Dorm, Kitchen & Deerhunter Bar

> **최종 확인:** 2026년 8월 8일  
> **신뢰도:** 커뮤니티 기반; 정확한 해금 레벨과 수치 효과는 현재 UI 검증 필요

이 세 건물은 Shelter의 기본 생존자 지원 계층인 **주거, 음식, 기분**을 담당한다.

## Dorm

커뮤니티 자료는 Dorm이 생존자 인구 수용력을 늘리는 건물이라고 일관되게 설명한다. 공개 문서끼리 정확한 해금 레벨이 충돌하므로 Wiki는 아직 해금 조건을 고정하지 않는다.

## Kitchen

초기 게임의 과거 자료는 Kitchen이 생존자 그룹을 위한 음식을 준비하는 건물임을 보여준다. 일본 커뮤니티 자료는 생존자 음식과 탐험 관련 활동에 쓰이는 canned food도 생산한다고 설명한다.

현재 공개 영어 구조 페이지에는 신뢰할 수 있는 효과표가 없으므로 정확한 식사 생산량, 저장량, worker slot 수는 잠정 상태다.

## Deerhunter Bar

커뮤니티 자료는 Deerhunter Bar를 생존자의 기분/행복도를 회복하거나 높이는 기능과 연결한다. 이는 행복도가 생산성에 영향을 준다는 공식 규칙과 일치하지만, 레벨별 정확한 효과는 Server 504에서 아직 검증되지 않았다.

## 의존 관계

세 건물은 다음 체인으로 이해하면 된다.

`Dorm이 인구 증가 → Kitchen이 인구를 지원 → Deerhunter Bar가 행복도/생산성 유지 지원`

음식과 기분 지원을 따라올리지 않고 Dorm 수용력만 늘리면 인구는 늘어도 Shelter 효율이 같은 비율로 증가하지 않을 수 있다.

## 검증할 데이터

- Dorm의 정확한 Watchtower 해금 조건
- 진행 단계별 허용 Dorm 수
- Kitchen 레벨별 생산량
- 현재 클라이언트에서 canned food가 여전히 Kitchen과 직접 연결되는지
- Deerhunter Bar의 행복도 증가량, cooldown, 레벨 scaling

## 출처 / 검증

- Fandom Dorm: https://dark-war-survival.fandom.com/wiki/Dorm
- Fandom Structures: https://dark-war-survival.fandom.com/wiki/Structures
- 일본 커뮤니티 Shelter 자료: https://w.atwiki.jp/darkwarsurvival/pages/17.html

> 폐기된 초기 게임 커뮤니티 페이지는 역사적 조사 메모로만 보존하며 공개 Wiki 링크에는 포함하지 않는다.

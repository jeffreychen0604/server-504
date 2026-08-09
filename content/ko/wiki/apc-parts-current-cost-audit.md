# APC Parts — 현재 비용 감사

> **최종 확인:** 2026년 8월 8일  
> **상태:** 과거 비용표는 존재하지만 현재 Lv.1–66 계산기에 그대로 사용할 수 없음.

여러 공개 APC 표는 2025년 말 Modified Vehicle 대규모 개편 이전에 작성되었습니다. 현재의 안정적인 구조는 [APC & Modified Vehicle](#/wiki/apc-modified-vehicle), [APC Parts & Parts Set](#/wiki/apc-parts-and-sets), [Tactical Modification](#/wiki/tactical-modification)을 참고하세요. 이 페이지는 과거 숫자표를 현재 데이터로 재사용해도 되는지 판단하기 위한 감사 문서입니다.

## 기존 표가 오래된 이유

과거 DarkWarData 표는 Parts를 **Lv.42**까지만 기록하며 업그레이드 비용에 **Gears**를 포함합니다.

이후 공식 패치에서 시스템이 변경되었습니다.

- 6개 parts를 지정 레벨까지 올리면 추가 능력치를 주는 **Parts Set** 도입;
- Parts 업그레이드 비용에서 **Gears** 제거 및 기존 사용분 환급;
- Modified Vehicle `Modify` 최대 레벨을 300에서 **500**으로 상향;
- 이후 Tactical Modification의 해금 경로 중 하나로 **6개 Parts 모두 Lv.66**을 사용.

따라서 기존의 `Gears + Titanium Alloy + Design Blueprint` 비용 행을 현재 게임에 그대로 적용할 수 없습니다.

## 과거 데이터에서 아직 유용한 부분

커뮤니티 데이터는 재료 관계를 파악하는 데는 여전히 도움이 됩니다.

- 초기 Parts 진행에는 **Titanium Alloy** 사용;
- **Design Blueprints**는 고급 Parts 진행 구간에 사용;
- Design Blueprint는 APC/Parts 재료이며 DX Blueprint와 다른 아이템.

업그레이드 비용이 아니라 획득처 맥락은 [Equipment & APC Material Sources](#/wiki/equipment-and-apc-material-sources)를 참고하세요.

## 현재 표준 의존 구조

| 진행 요소 | 현재 신뢰 가능한 설명 |
| --- | --- |
| Modified Vehicle | 공식 현재 cap은 Lv.500으로 상향됨 |
| Parts | 6개 parts와 Parts Set 마일스톤 구조 |
| Gears | **Parts 업그레이드에 더 이상 소모되지 않음** |
| Titanium Alloy | 현재 Parts/APC 재료 |
| Design Blueprint | 고급 Parts/APC 재료 |
| Parts Lv.66 | 모든 parts가 도달하면 Tactical Modification 해금 조건 하나 충족 |

## 아직 부족한 데이터

현재 Wiki에는 다음 Server 504 검증표가 없습니다.

- Parts 레벨별 Titanium Alloy 비용;
- Parts 레벨별 Design Blueprint 비용;
- 과거 Lv.42 이후 Lv.66까지 전체 비용;
- Parts Set 마일스톤과 정확한 보너스.

게임 내 캡처가 확보되기 전까지 Wiki는 잘못된 정밀도를 가진 비용 계산기를 만들지 않습니다.

## 권장 캡처 방식

Server 504 플레이어가 part를 업그레이드할 때 다음 형식으로 기록하세요.

`현재 레벨 → 다음 레벨 | Titanium Alloy | Design Blueprint | 기타 재료 | CP/stat 증가`

현재 게임과 맞지 않는 오래된 전체 표를 복사하는 것보다 주요 마일스톤 6장의 스크린샷이 더 유용합니다.

## 출처

- DarkWarData legacy APC chart: https://darkwardata.com/charts/apc-modified-garage/
- DarkWarData Design Blueprint: https://darkwardata.com/items/design-blueprint/
- Apple App Store version history — Parts Set, Gear removal, Modify 500, Tactical Modification: https://apps.apple.com/app/dark-war-survival/id6670441558

# APC Parts — Auditoria de custos atuais

> **Última verificação:** 8 ago 2026  
> **Status:** existem tabelas antigas, mas elas não são seguras para um calculador atual Lv.1–66.

Várias tabelas públicas de APC foram criadas antes da grande revisão de Modified Vehicle no fim de 2025. Para a estrutura atual estável, use [APC & Modified Vehicle](#/wiki/apc-modified-vehicle), [APC Parts & Parts Set](#/wiki/apc-parts-and-sets) e [Tactical Modification](#/wiki/tactical-modification); esta página existe apenas para decidir se tabelas numéricas antigas podem ser reutilizadas.

## Por que a tabela antiga está desatualizada

Uma tabela antiga do DarkWarData registra Parts apenas até **Lv.42** e inclui **Gears** no custo de upgrade.

Patch notes oficiais depois alteraram o sistema:

- adicionaram bônus de **Parts Set** ao elevar as seis parts a níveis específicos;
- removeram **Gears** dos custos de upgrade de Parts e reembolsaram Gears gastos anteriormente;
- elevaram o máximo `Modify` do Modified Vehicle de 300 para **500**;
- mais tarde Tactical Modification passou a reconhecer **todas as seis Parts em Lv.66** como uma rota de desbloqueio.

Portanto, uma linha antiga `Gears + Titanium Alloy + Design Blueprint` não pode ser usada sem alterações no jogo atual.

## O que ainda é útil nos dados antigos

Dados comunitários ainda ajudam a estabelecer a relação entre materiais:

- a progressão inicial de Parts usa **Titanium Alloy**;
- **Design Blueprints** entram no caminho avançado de Parts;
- Design Blueprint é um recurso APC/Parts e não é o mesmo item que DX Blueprint.

Para contexto de obtenção, e não para custos de upgrade, use [Equipment & APC Material Sources](#/wiki/equipment-and-apc-material-sources).

## Modelo canônico atual

| Camada de progressão | Afirmação atualmente confiável |
| --- | --- |
| Modified Vehicle | O cap oficial atual foi elevado para Lv.500 |
| Parts | Sistema de seis parts com marcos de Parts Set |
| Gears | **Não são mais consumidos em upgrades de Parts** |
| Titanium Alloy | Material atual de Parts/APC |
| Design Blueprint | Material avançado de Parts/APC |
| Parts Lv.66 | Uma condição de Tactical Modification quando todas as parts atingem esse nível |

## O que ainda falta

O Wiki ainda não possui uma tabela verificada do Server 504 para:

- custo de Titanium Alloy por nível de Parts;
- custo de Design Blueprint por nível;
- todos os níveis além do antigo conjunto Lv.42 até Lv.66;
- marcos de Parts Set e bônus exatos.

Até que isso seja capturado no jogo, o Wiki não criará um calculador com falsa precisão.

## Método de captura recomendado

Quando um jogador do Server 504 melhorar uma part, registre:

`Nível atual → próximo nível | Titanium Alloy | Design Blueprint | outro material | ganho de CP/stat`

Seis screenshots em níveis de marco são mais úteis que copiar uma tabela antiga completa que já não corresponde ao jogo.

## Fontes

- DarkWarData legacy APC chart: https://darkwardata.com/charts/apc-modified-garage/
- DarkWarData Design Blueprint: https://darkwardata.com/items/design-blueprint/
- Apple App Store version history — Parts Set, Gear removal, Modify 500, Tactical Modification: https://apps.apple.com/app/dark-war-survival/id6670441558

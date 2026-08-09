# Hospital, Infirmary & Conscription Office

> **Última verificación:** 8 ago 2026  
> **Confianza:** Hospital/modificadores de State oficial+comunitario; Infirmary y Conscription con respaldo comunitario

Los tres sistemas intervienen en la recuperación, pero no deben tratarse como equivalentes.

## Hospital

Hospital es el sistema principal de capacidad para unidades heridas. Las páginas comunitarias indican que sus mejoras aumentan la capacidad de curación. Las notas oficiales de Origin Lands de 2026 también aplican modificadores temporales directamente a **Hospital Capacity**, confirmando que sigue siendo una variable activa de riesgo de combate.

En determinados War Days de Origin Lands, los parches oficiales concedieron temporalmente mayor Healing Speed, menor Healing Cost y **+10,000 Hospital Capacity**. Son modificadores de evento, no valores base permanentes.

## Infirmary

Las fuentes públicas entran en conflicto:

- algunas describen Infirmary como tratamiento de **supervivientes enfermos**;
- una página archivada antigua lo describe como capacidad adicional para unidades heridas.

Por ello el Wiki no fusiona Infirmary con Hospital. La UI actual de Server 504 debe decidir su función canónica.

## Conscription Office

La documentación comunitaria describe Conscription Office como una capa de recuperación de reservas que actúa cuando las bajas heridas exceden Hospital Capacity. Se indica que consume **Reserve Army Badges** y que su capacidad de reserva escala a partir de Hospital Capacity en lugar de mejorarse normalmente por sí misma.

Estratégicamente es distinto de curar: es un sistema de mitigación/reposición tras desbordar la capacidad.

## Modelo práctico de riesgo

`heridos entrantes → Hospital Capacity → riesgo de overflow → sistemas de reserva/recuperación → pérdida permanente si no se recupera`

Antes de PvP intenso, verifica la capacidad en vez de valorar la seguridad solo por el número de tropas.

## VERIFY SERVER 504

- tooltip inglés actual de Infirmary y función exacta;
- Hospital Capacity por nivel y modificadores de Healing Speed;
- fórmula actual de capacidad de reserva de Conscription Office;
- coste de Reserve Army Badges y ratio de recuperación.

## Fuentes / verificación

- Historial oficial de parches App Store: https://apps.apple.com/us/app/dark-war-survival/id6670441558
- Fandom Hospital: https://dark-war-survival.fandom.com/wiki/Hospital
- Fandom Conscription Office: https://dark-war-survival.fandom.com/wiki/Conscription_Office
- Referencia comunitaria japonesa: https://w.atwiki.jp/darkwarsurvival/pages/17.html

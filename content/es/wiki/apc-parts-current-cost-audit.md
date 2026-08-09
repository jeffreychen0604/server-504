# APC Parts — Auditoría de costes actuales

> **Última verificación:** 8 ago 2026  
> **Estado:** existen tablas heredadas, pero no son seguras para un calculador actual Lv.1–66.

Varias tablas públicas de APC se crearon antes de la gran revisión de Modified Vehicle de finales de 2025. Para la estructura estable actual, usa [APC & Modified Vehicle](#/wiki/apc-modified-vehicle), [APC Parts & Parts Set](#/wiki/apc-parts-and-sets) y [Tactical Modification](#/wiki/tactical-modification); esta página existe solo para decidir si las tablas numéricas antiguas se pueden reutilizar.

## Por qué la tabla antigua está desactualizada

Una tabla heredada de DarkWarData registra Parts solo hasta **Lv.42** e incluye **Gears** en el coste de mejora.

Las notas oficiales cambiaron después el sistema:

- añadieron bonos **Parts Set** al mejorar las seis parts a determinados niveles;
- eliminaron **Gears** de los costes de mejora de Parts y devolvieron los Gears gastados anteriormente;
- elevaron el máximo `Modify` de Modified Vehicle de 300 a **500**;
- más tarde Tactical Modification reconoció **las seis Parts en Lv.66** como una vía de desbloqueo.

Por tanto, una fila antigua `Gears + Titanium Alloy + Design Blueprint` no puede reutilizarse sin cambios en el juego actual.

## Qué sigue siendo útil de los datos heredados

Los datos comunitarios todavía ayudan a establecer la relación entre materiales:

- la progresión temprana de Parts usa **Titanium Alloy**;
- **Design Blueprints** entran en la ruta avanzada de Parts;
- Design Blueprint es un recurso de APC/Parts y no es el mismo objeto que DX Blueprint.

Para contexto de obtención y no para costes de mejora, consulta [Equipment & APC Material Sources](#/wiki/equipment-and-apc-material-sources).

## Modelo canónico actual de dependencias

| Capa de progresión | Afirmación actualmente fiable |
| --- | --- |
| Modified Vehicle | El cap oficial actual se elevó a Lv.500 |
| Parts | Sistema de seis parts con hitos Parts Set |
| Gears | **Ya no se consumen al mejorar Parts** |
| Titanium Alloy | Material actual de Parts/APC |
| Design Blueprint | Material avanzado de Parts/APC |
| Parts Lv.66 | Una condición de Tactical Modification cuando todas las parts llegan a ese nivel |

## Qué falta todavía

El Wiki no dispone aún de una tabla verificada del Server 504 para:

- coste de Titanium Alloy por nivel de Parts;
- coste de Design Blueprint por nivel;
- todos los niveles posteriores al antiguo conjunto Lv.42 hasta Lv.66;
- hitos Parts Set y bonos exactos.

Hasta que se capture en el juego, el Wiki no generará un calculador de falsa precisión.

## Método de captura recomendado

Cuando un jugador del Server 504 mejore una part, registra:

`Nivel actual → siguiente nivel | Titanium Alloy | Design Blueprint | otro material | ganancia CP/stat`

Seis capturas en niveles clave son más útiles que copiar una tabla antigua completa que ya no coincide con el juego.

## Fuentes

- DarkWarData legacy APC chart: https://darkwardata.com/charts/apc-modified-garage/
- DarkWarData Design Blueprint: https://darkwardata.com/items/design-blueprint/
- Apple App Store version history — Parts Set, Gear removal, Modify 500, Tactical Modification: https://apps.apple.com/app/dark-war-survival/id6670441558

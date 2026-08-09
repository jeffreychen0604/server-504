# APC Parts — Audit des coûts actuels

> **Dernière vérification :** 8 août 2026  
> **Statut :** des tables historiques existent, mais elles ne sont pas sûres pour un calculateur actuel Lv.1–66.

Plusieurs tables APC publiques ont été créées avant la refonte Modified Vehicle de fin 2025. Pour la structure actuelle stable, utilisez [APC & Modified Vehicle](#/wiki/apc-modified-vehicle), [APC Parts & Parts Set](#/wiki/apc-parts-and-sets) et [Tactical Modification](#/wiki/tactical-modification) ; cette page sert uniquement à déterminer si les anciennes tables numériques peuvent être réutilisées.

## Pourquoi l'ancienne table est obsolète

Une table DarkWarData historique ne couvre les Parts que jusqu'au **Lv.42** et inclut des **Gears** dans le coût d'amélioration.

Les patch notes officielles ont ensuite :

- ajouté les bonus **Parts Set** pour l'amélioration des six parts à certains niveaux ;
- retiré les **Gears** du coût des Parts et remboursé ceux déjà dépensés ;
- relevé le maximum `Modify` du Modified Vehicle de 300 à **500** ;
- utilisé plus tard **les six Parts au Lv.66** comme l'une des voies de déblocage de Tactical Modification.

Une ancienne ligne `Gears + Titanium Alloy + Design Blueprint` ne peut donc pas être utilisée telle quelle dans le jeu actuel.

## Ce qui reste utile dans les anciennes données

Les données communautaires permettent encore d'établir la relation entre matériaux :

- les premiers niveaux de Parts utilisent **Titanium Alloy** ;
- les **Design Blueprints** entrent dans la progression avancée des Parts ;
- Design Blueprint est une ressource APC/Parts distincte de DX Blueprint.

Pour les sources d'acquisition plutôt que les coûts d'amélioration, utilisez [Equipment & APC Material Sources](#/wiki/equipment-and-apc-material-sources).

## Modèle canonique actuel

| Couche de progression | Affirmation actuellement fiable |
| --- | --- |
| Modified Vehicle | Le cap officiel actuel a été relevé au Lv.500 |
| Parts | Système à six parts avec paliers Parts Set |
| Gears | **Ne sont plus consommés pour améliorer les Parts** |
| Titanium Alloy | Matériau actuel Parts/APC |
| Design Blueprint | Matériau avancé Parts/APC |
| Parts Lv.66 | Une condition de Tactical Modification si toutes les parts l'atteignent |

## Ce qui manque encore

Le Wiki ne possède pas encore de table Server 504 vérifiée pour :

- le coût Titanium Alloy par niveau ;
- le coût Design Blueprint par niveau ;
- tous les niveaux après l'ancien jeu de données Lv.42 jusqu'au Lv.66 ;
- les paliers Parts Set et leurs bonus exacts.

Sans captures en jeu, le Wiki ne produira pas de calculateur donnant une fausse précision.

## Méthode de capture recommandée

Lorsqu'un joueur du Server 504 améliore une part, noter :

`Niveau actuel → niveau suivant | Titanium Alloy | Design Blueprint | autre matériau | gain CP/stat`

Six captures aux niveaux jalons sont plus utiles que la copie d'une ancienne table complète qui ne correspond plus au jeu.

## Sources

- DarkWarData legacy APC chart: https://darkwardata.com/charts/apc-modified-garage/
- DarkWarData Design Blueprint: https://darkwardata.com/items/design-blueprint/
- Apple App Store version history — Parts Set, Gear removal, Modify 500, Tactical Modification: https://apps.apple.com/app/dark-war-survival/id6670441558

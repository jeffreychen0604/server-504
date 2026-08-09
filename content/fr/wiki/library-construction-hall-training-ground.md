# Library, Construction Hall & Training Ground

> **Dernière vérification :** 8 août 2026  
> **Confiance :** Library/Construction Hall soutenus par la communauté ; l'effet exact du Training Ground nécessite une vérification dans l'UI actuelle

Ces bâtiments doivent surtout être compris comme des **multiplicateurs de débit** plutôt que comme des producteurs directs de ressources.

## Library

Les références communautaires décrivent la Library comme augmentant la **Research Speed**. Un ancien tableau d'effets montre une progression du bonus avec le niveau du bâtiment, mais les pourcentages exacts dépendent de la version et ne sont pas considérés comme canoniques ici.

## Construction Hall

Des guides communautaires récents de 2026 décrivent le Construction Hall comme réduisant le temps de construction / augmentant le débit de construction. Comme les timers deviennent extrêmement longs plus tard, même une petite augmentation permanente de vitesse peut se cumuler sur des mois d'améliorations.

## Training Ground

Les références publiques sont beaucoup plus faibles pour le Training Ground. Des guides de stratégie communautaires indiquent qu'il apporte seulement une augmentation relativement faible de la vitesse d'entraînement des troupes par rapport au node de recherche `Efficient Training`, mais le tooltip et le tableau d'effets actuels du bâtiment ne sont pas documentés proprement.

Donc :

- **Fonction de Library :** support de Research Speed — confiance communautaire élevée.
- **Fonction de Construction Hall :** support de vitesse de construction — consensus communautaire actuel.
- **Fonction/valeur du Training Ground :** reste provisoire jusqu'à capture de l'UI Server 504 actuelle.

## Logique de priorité

Les bâtiments de vitesse ont une valeur cumulative lorsqu'ils sont améliorés **avant** une longue série de timers. Mais ils ne doivent pas bloquer des prérequis obligatoires ou une progression basée sur des matériaux rares pour un faible gain en pourcentage.

Utiliser cette séquence :

`prérequis obligatoire → multiplicateur permanent de débit → longue amélioration/recherche`

## À vérifier sur Server 504

- Research Speed de Library par niveau.
- Nom et valeur exacts de l'effet du Construction Hall par niveau.
- Effet exact de vitesse d'entraînement du Training Ground et son scaling.
- Coûts/effets des niveaux Industrial pour les trois bâtiments.

## Sources / vérification

- Fandom Library: https://dark-war-survival.fandom.com/wiki/Library
- Recent building-priority guide: https://www.lootbar.com/blog/en/dark-war-survival-building-upgrades-what-to-prioritize-first.html
- Training strategy guide: https://www.lootbar.com/blog/en/dark-war-ultimate-survival-troop-guide-for-top-4-formations.html

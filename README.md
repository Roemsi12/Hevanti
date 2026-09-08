# Hevanti

Website voor Hevanti, een (fictief) vloerenbedrijf: PVC, laminaat, parket, tapijt,
egaliseren en herstelwerk. In de geest van De Woonzaken en vergelijkbare
vloerenleggers.

Dit is voorlopig een **demo**: een statische one-pager zonder backend. Alle
bedrijfsgegevens, prijzen, projecten en reviews zijn verzonnen en dienen alleen
om de opzet te laten zien.

## Draaien

Geen buildstap en geen npm-pakketten nodig. Start de meegeleverde ontwikkelserver
met Node:

```bash
node scripts/dev-server.mjs
```

Daarna te bekijken op http://localhost:8123. Een andere poort kan met
`node scripts/dev-server.mjs 3000`.

`app/index.html` rechtstreeks openen werkt ook, maar via de server zit je dichter
bij hoe het later online staat.

## Structuur

```
app/
  index.html              de hele pagina
  css/
    design-tokens.css     kleur, ruimte, typografie, schaduw — pas hier aan
    style.css             opmaak van de secties
  js/
    main.js               menu, scroll-effecten, formuliervalidatie
scripts/
  dev-server.mjs          lokale ontwikkelserver, zonder dependencies
```

De teksten en klassenamen zijn Nederlands, in lijn met de doelgroep.

### Secties op de pagina

Held · Diensten · Werkwijze · Ons werk · Ervaringen · Offerteformulier · Voettekst

De vloer in de held-afbeelding en de projecttegels zijn met CSS getekend, zodat de
demo geen fotobestanden nodig heeft. Bij echte foto's kunnen die weg.

## Plannen voor later

- Echte foto's van projecten, met een galerij per project
- Aparte pagina's per dienst in plaats van één blok, beter voor vindbaarheid
- Offerteformulier daadwerkelijk laten versturen (mail of een klein backend'je)
- Prijsindicatie-tool: type vloer × m² → richtprijs
- Reviews inladen vanuit Google in plaats van hardcoded
- Meta-tags, sitemap en gestructureerde data (LocalBusiness) voor SEO
- Cookie-/privacyverklaring zodra er iets van bezoekers wordt opgeslagen

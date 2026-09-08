# Hevanti

Website voor Hevanti, een (fictief) vloerenbedrijf: PVC, laminaat, parket, tapijt,
egaliseren en herstelwerk. In de geest van De Woonzaken en vergelijkbare
vloerenleggers.

Dit is voorlopig een **demo**: een statische one-pager zonder backend. Alle
bedrijfsgegevens, prijzen, projecten en reviews zijn verzonnen en dienen alleen
om de opzet te laten zien.

## Draaien

Geen buildstap nodig. Open `app/index.html` rechtstreeks in de browser, of start
een lokale server vanuit de map `app`:

```bash
python -m http.server 8000
```

Daarna te bekijken op http://localhost:8000.

## Structuur

```
app/
  index.html              de hele pagina
  css/
    design-tokens.css     kleur, ruimte, typografie, schaduw — pas hier aan
    style.css             opmaak van de secties
  js/
    main.js               menu, scroll-effecten, formuliervalidatie
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

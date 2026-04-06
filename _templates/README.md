# LC Page Templates — Complete Set

All templates share the same nav, footer, and CSS via `/assets/css/lc-standard.css`.  
Copy the template, replace placeholders, add page-specific styles inline.

## Template Index

| # | Template | Use For | File |
|---|----------|---------|------|
| 1 | **Journal Landing** | Women's Health, In Her Name, The Blueprint landing pages | `01-journal-landing.html` |
| 2 | **Sub-Journal / Column** | Individual columns within journals (EmpowerHer, The Dossier, etc.) | `02-sub-journal.html` |
| 3 | **Article / Essay** | Individual articles, essays, reports with full body text | `03-article.html` |
| 4 | **Intelligence Report** | IR13-style research/clinical reports with gold accent | `04-intelligence-report.html` |
| 5 | **Intelligence Landing** | Intelligence hub, Clinical stream, Research stream | `05-intelligence-landing.html` |
| 6 | **Product Landing** | The Signal, Viva Voce, Journals hub, Join/Membership | `06-product-landing.html` |
| 7 | **Utility Page** | About, FAQ, Start Here, Community Guidelines, Privacy, Terms | `07-utility-page.html` |

## Shared Components

Every template uses:
- **CSS:** `<link rel="stylesheet" href="/assets/css/lc-standard.css">`
- **Nav:** 5-link (The Signal / Journals / Intelligence / Viva Voce / Join)
- **Footer:** 5-column (Brand / Journals / Products / Intelligence / Organization)
- **Mobile toggle script** (same on all pages)

## Journal Color Map

| Journal | `--accent-color` | Circle Initial |
|---------|-----------------|----------------|
| The Signal | `var(--copper)` | S |
| Women's Health | `var(--rose)` | W |
| In Her Name | `var(--teal)` | I |
| The Blueprint | `var(--forest)` | B |
| Intelligence | `var(--gold)` | I |
| Viva Voce | `var(--blue)` | V |

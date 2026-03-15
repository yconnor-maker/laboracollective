# LC Page Templates

Three HTML templates for the Labora Collective website. Each is a self-contained, browser-renderable file using the LC Design System v2 (CSS variables, Cormorant Garamond + DM Sans typography, warm espresso/copper palette).

## Templates

### `base-page.html`
Standard content page. Use for: About, Contact, landing pages, any general content.

**Structure:** Nav → Page Hero (overline + title + subtitle) → Content area (820px) → Brand Strip CTA → Footer

**Placeholders to replace:**
- `{{PAGE_TITLE}}`, `{{PAGE_DESCRIPTION}}`, `{{PAGE_SUBTITLE}}`, `{{SECTION_LABEL}}`

---

### `article-template.html`
Article/post layout optimized for long-form reading. Use for: journal articles, newsletter web versions, essays.

**Structure:** Nav → Article Header (journal tag + title + author/date/reading time) → Article Body (720px) → Author Bio + Related Articles → Brand Strip CTA → Footer

**Placeholders to replace:**
- `{{ARTICLE_TITLE}}`, `{{ARTICLE_DESCRIPTION}}`, `{{JOURNAL_NAME}}`, `{{PUBLISH_DATE}}`, `{{READING_TIME}}`
- `{{RELATED_1_URL}}`, `{{RELATED_1_TITLE}}`, etc.
- Journal tag class: change `wh` to `ihn` or `bp` for different journal colors

---

### `special-report-template.html`
Report page with sidebar table of contents. Use for: domain reports, special reports, data-heavy intelligence.

**Structure:** Nav → Report Header (badge + title + metadata) → Two-column layout (sticky TOC sidebar + content) → Report Navigation (prev/next) → Brand Strip CTA → Footer

**Placeholders to replace:**
- `{{REPORT_TITLE}}`, `{{REPORT_DESCRIPTION}}`, `{{REPORT_TYPE}}`, `{{PUBLISH_DATE}}`, `{{DOMAIN_NUMBER}}`
- `{{PREV_URL}}`, `{{PREV_TITLE}}`, `{{NEXT_URL}}`, `{{NEXT_TITLE}}`
- Section IDs and TOC links

**Special features:**
- `.data-callout` — Highlighted statistic box with copper left border
- `.interactive-embed` — iFrame container for interactive figures (teal badge)
- TOC auto-highlights on scroll via IntersectionObserver

---

## Shared Components

Reusable HTML snippets live in `_components/`:

| File | What it is |
|------|-----------|
| `nav.html` | Sticky navigation bar with mobile hamburger menu |
| `footer.html` | Five-column footer with journal/intelligence/organization links |
| `brand-strip.html` | Membership/newsletter CTA strip (espresso bg, copper border) |
| `journal-panel.html` | Reusable journal card with icon, tag, sub-journals, and CTA |

Each component file includes inline documentation and commented-out CSS. The templates already have these components baked in — use the standalone component files when building custom pages.

## How to Use

1. Copy the desired template file
2. Rename it to your page name (e.g., `about.html`)
3. Find/replace all `{{PLACEHOLDER}}` values
4. Add your content inside the appropriate content area
5. Adjust asset paths if your page is nested (or use absolute `/assets/...` paths)

## Design System Reference

All templates use these CSS custom properties (defined in `:root`):

| Token | Value | Usage |
|-------|-------|-------|
| `--espresso` | `#362511` | Dark backgrounds, nav, footer |
| `--copper` | `#D48662` | Primary accent, links, CTAs |
| `--rose` | `#E7817F` | In Her Name accent |
| `--teal` | `#1D6B78` | Blueprint accent |
| `--bg-warm` | `#F7F3EE` | Page background |
| `--body-text` | `#2C1A0E` | Body copy |
| `--muted` | `#8A7060` | Secondary text |

**Fonts:** Cormorant Garamond (headings), DM Sans (body/UI)

---

*Created by Lumen (Claude Cowork) — 2026-03-14 | Task W3 + W4*

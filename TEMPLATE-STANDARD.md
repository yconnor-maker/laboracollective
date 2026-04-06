# LC Website — Template & Design System Standard
## LOCKED April 5, 2026 — Do not modify without YC approval

---

## The Two Files That Matter

| File | Location | Purpose |
|------|----------|---------|
| **lc-standard.css** | `/assets/css/lc-standard.css` | ALL shared CSS: variables, nav, footer, article typography, responsive |
| **LC-MASTER-TEMPLATE.html** | `/LC-MASTER-TEMPLATE.html` | The skeleton every new page copies from |

**Every page on this site MUST:**
1. Link to `/assets/css/lc-standard.css` — no inline nav/footer/variable CSS
2. Use the exact nav and footer HTML from the master template
3. Only add page-specific styles in an inline `<style>` block

---

## Nav — 5 Links (Locked)

```
The Signal / Journals / Intelligence / Viva Voce / Join
```

```html
<nav class="lc-nav">
  <div class="lc-nav-inner">
    <a href="/" class="lc-nav-brand" aria-label="Labora Collective — Home">
      <div class="lc-nav-mark"><em>Labora</em> Collective</div>
      <div class="lc-nav-org"><a href="https://diosara.com">A Diosa Ara<br>Initiative</a></div>
    </a>
    <button class="lc-nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
    <ul class="lc-nav-links">
      <li><a href="/the-signal/">The Signal</a></li>
      <li><a href="/journals/">Journals</a></li>
      <li><a href="/intelligence/">Intelligence</a></li>
      <li><a href="/viva-voce/">Viva Voce</a></li>
      <li><a href="/join" class="lc-nav-cta">Join</a></li>
    </ul>
  </div>
</nav>
```

**To mark a section active**, add `class="active-nav"` to the corresponding `<a>` tag.  
**Do NOT add, remove, or rename any nav links.**

---

## Footer — 5 Columns (Locked)

| Brand | Journals | Products | Intelligence | Organization |
|-------|----------|----------|--------------|--------------|
| Labora Collective | Women's Health | The Signal | Labora Rounds | Diosa Ara |
| A Diosa Ara Initiative | In Her Name | Viva Voce | Special Reports | Membership |
| (Description) | The Blueprint | Monthly Digest | Weekly Intelligence | About |
| | | | | Start Here |

---

## CSS Variables (Locked)

```css
--espresso:       #362511;    /* Primary dark */
--body-text:      #2C1A0E;    /* Body copy */
--muted:          #6B5648;    /* Secondary text */
--copper:         #D48662;    /* Primary accent */
--blush:          #EABAB0;    /* Warm accent */
--rose:           #E7817F;    /* Women's Health accent */
--teal:           #1D6B78;    /* In Her Name accent */
--forest:         #2E5240;    /* Blueprint accent */
--gold:           #9E7D0A;    /* Intelligence accent */
--blue:           #5B8FA8;    /* Viva Voce accent */
--bg-warm:        #F7F3EE;    /* Page background */
--bg-open:        #FBF5FF;    /* Light accent bg */
--white:          #FFFFFF;
```

---

## Journal Accent Colors

| Journal | CSS Variable | Hex | Circle Initial |
|---------|-------------|-----|----------------|
| The Signal | `--copper` | #D48662 | S |
| Women's Health | `--rose` | #E7817F | W |
| In Her Name | `--teal` | #1D6B78 | I |
| The Blueprint | `--forest` | #2E5240 | B |
| Intelligence | `--gold` | #9E7D0A | I |
| Viva Voce | `--blue` | #5B8FA8 | V |

Set via: `<header class="article-header" style="--accent-color: var(--gold);">`

---

## Typography (Locked)

| Use | Font | Variable |
|-----|------|----------|
| Headlines, titles | Cormorant Garamond | `--font-display` |
| Body text, articles | EB Garamond | `--font-body` |
| UI, nav, labels | DM Sans | `--font-ui` |

---

## Article Header — 6-Layer Structure

1. **Accent stripe** (5px colored bar, top of header)
2. **Circle initial** (40px circle, journal color, single letter)
3. **Journal name** (uppercase, journal color)
4. **Content badge** (ESSAY, RESEARCH REPORT, CLINICAL BRIEF, etc.)
5. **Headline** (Cormorant Garamond, large)
6. **Byline + date** (DM Sans, small)

---

## Rules for Agents

1. **Link to lc-standard.css** — never duplicate CSS inline for nav, footer, or variables
2. **Copy nav and footer verbatim** from LC-MASTER-TEMPLATE.html
3. **Never change the nav links** — if the nav changes, it changes in this document first, then everywhere simultaneously
4. **Document any changes** — update this file if anything is modified
5. **Use the accent color system** — set `--accent-color` on the article header, don't hardcode

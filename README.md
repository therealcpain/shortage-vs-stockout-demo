# Shortage vs Stockout

**Type a drug name → one shareable card:**  
FDA national shortage **YES / NO / UNKNOWN** · status + first-posted / last-update when listed · plain-English **“pharmacy empty ≠ national shortage”** · what to ask your pharmacist / prescriber · FDA deep links.

Brand on the surface: **Shortage vs Stockout** only.

Not a multi-pharmacy finder (Medfinder owns that). Not Drugs.com SEO lists. **Not medical advice** and **not a substitute for your pharmacist, prescriber, or the FDA Drug Shortage Database.**

## Hypothesis

Patients panic-hop stores when one pharmacy is empty and misread that as a national shortage (or the reverse). Success = a caregiver texts the status card instead of arguing screenshots — “FDA says YES — ask for NDC alternatives” or “not on FDA Current list — ask pharmacist to check other packages.”

## How to test (local)

```bash
cd kb/mde/shortage-vs-stockout
npm run build          # copies assets → dist/
# either open the file:
open index.html        # or dist/index.html
# or serve (needed for live openFDA):
npm start              # http://localhost:4193
```

Manual checklist:

1. Open the page → click **Adderall · YES** (prefer-live off for labeled seed).
2. Confirm huge **YES** badge, FDA Current status, literacy strip, ask-lines, medical disclaimer.
3. Click **metformin · NO** → **NO** badge (not Current in snapshot) + local-stockout literacy.
4. Check prefer-live → type **Vyvanse** → live openFDA when network allows; label live vs seed on the face.
5. Unknown / failed live with no seed → **UNKNOWN** (never invent YES/NO).
6. **Copy summary** → clipboard has badge + literacy + FDA links.
7. **Share link** → `#p=` restores the card.
8. **Export PNG** → dark share card with huge YES/NO/UNKNOWN badge.
9. Surface brand is **Shortage vs Stockout** only (no Conglomerate / personal names).

### GitHub Pages

This folder is static-ready. Point Pages at `/` of a dedicated repo (or `/docs` after copying `dist/`), with `index.html` at the site root. Relative paths (`styles.css`, `app.js`) work on project pages.

```bash
npm run build   # optional artifact in dist/
```

Do **not** create the public repo or post from this build step — Steward handles Pages + distro. Distro stays product-linked only (e.g. ADHD / pharmacy threads). **No sock accounts.**

## Seed cohort (MVP)

Labeled snapshot from the openFDA Drug Shortages download (Public Domain / CC0). Dataset `last_updated` shown on the page (seed face). Never invent rows.

| Chip | National | Teaching point |
|------|----------|----------------|
| Adderall | **YES** | Ongoing stimulant wave — national ≠ every store empty |
| Vyvanse capsules | **YES** | Brand patients recognize; NDC detail on FDA DB |
| Concerta / methylphenidate ER | **YES** | ADHD ER presentations |
| Lidocaine / lorazepam / heparin inj. | **YES** | Sterile injectable wave |
| Albuterol sulfate solution | **NO** | FDA **Resolved** — local empty still possible |
| Metformin / sertraline / atorvastatin | **NO** | No Current rows in snapshot — stockout ≠ national |

## Live data path

| Step | Source | Notes |
|------|--------|--------|
| Drug → shortage rows | `api.fda.gov/drug/shortages.json` | CORS `*` · no key required for light use · Public Domain / CC0 |
| Status mapping | `Current` → **YES** · no Current (incl. Resolved / absent) → **NO** when query succeeds · fetch fail + no seed → **UNKNOWN** | Never invent |
| Official deep-links | FDA Drug Shortages hub · FAQs · searchable DB · openFDA | Always on the card |

If live openFDA is blocked or errors, labeled seeds remain available. Manual refresh of seeds is OK for v0.

## Ads pathway (ad-only free utility — do not spend yet)

| Path | Notes |
|------|--------|
| **Revenue (primary)** | **AdSense / display on the status card + short “how shortages are defined” explainer** (not inside the PNG). Inventory is steady on chronic shortage drugs with spikes on news. Justified when refill-week sessions cover hosting. Free card forever — **no paywall**, no Gumroad. |
| **Brand-safe** | Cite FDA. **Not medical advice** / not a substitute for pharmacist or FDA. No pharma lead-gen that undermines trust. Ads **not** inside PNG. |
| **Sponsorship / affiliate (later)** | Optional disclosure-first pharmacy locator affiliate only if brand-safe — not in MVP. |
| **Acquisition (gated)** | Google “is Adderall still in shortage FDA” / “[drug] shortage or out of stock”. Creative = “National shortage vs your pharmacy — one card”. Max CPA abort ~$0.40–0.70 without card complete. Debit/cash only. **Spend only after one organic ADHD/pharmacy thread test.** |
| **UTM** | Example: `?utm_source=reddit&utm_medium=organic&utm_campaign=shortage_vs_stockout_mvp` |
| **Tracking** | Drug lookups + share clicks (GoatCounter path when Pages is live). |
| **Abort sketch** | Pause paid if CPA exceeds band without completes / shares. |

**No spend from this ready_for_pages step.** Ads are the monetization path (**ad-only OK**).

## Product constraints

- Single static site (no backend).
- **Never invent shortage status.** Label live vs seed vs unknown on the face.
- Brand: **Shortage vs Stockout** only on surface.
- Medical disclaimer always visible.
- Share = URL hash + PNG + copy summary.
- Not Medfinder / GoodRx / Drugs.com. No UPC scrape of chains. No PHI.

## Files

| Path | Role |
|------|------|
| `index.html` | App shell (GitHub Pages entry) |
| `app.js` | Typeahead, openFDA live, seeds, status badge card, share hash, PNG |
| `styles.css` | Shortage vs Stockout UI |
| `scripts/build.js` | `npm run build` → `dist/` |
| `package.json` | build / start / preview scripts |

## Opportunity

Internal card: `opp_health_shortage_vs_stockout` (health / civic-adjacent).  
Experiment stub: `institutions/mde/experiments/exp_shortage_vs_stockout.md`.

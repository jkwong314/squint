# Squint — Design Spec

**Date:** 2026-04-17
**Status:** Approved, ready for implementation plan

## Summary

**Squint** is a browser-based visual hierarchy trainer. (Named after what designers actually do to check hierarchy — squint at a page, strip away content, see pure weight.) The user is shown a UI mockup and clicks its elements in order of visual importance. Their ranking is scored against a hand-curated "expert" answer and they receive per-element rationale explaining why each element holds the weight it does.

Built as a React + Vite static app with no backend, no AI, no accounts. All content (mockups, rankings, rationales) is hand-authored and ships in the bundle.

## Goals

- **Teach visual hierarchy** through repeated practice + opinionated commentary, not passive reading.
- **Feel like a senior designer wrote it** — visual craft and written voice both carry the claim.
- **Ship without external dependencies** — no API calls, no model inference, no auth provider, no database. A static site.
- **Be authorable** — adding a new mockup is three files and no build-step magic.

## Non-Goals (v1)

- No user accounts, backend, or DB.
- No leaderboards, streaks, timers, or gamification gating.
- No analytics / telemetry.
- No mobile layout — desktop/tablet only. Viewports below 768px see a friendly "please use a larger screen" card.
- No internationalization.
- No user-authored mockups or in-app mockup editor.
- No adaptive difficulty / ML-driven anything.
- No shareable score cards.

## Core Mechanic

A scenario consists of:
- A rendered HTML/CSS **mockup** (a real React component, not a screenshot).
- 5–8 **rankable elements** inside that mockup, hand-picked by the author. Other elements are present visually but not interactive.
- A canonical **expert order** for those rankable elements.
- A one-line **rationale** per element explaining its position.

The user clicks the elements in the order they believe is correct. Each click assigns the next rank number (1, 2, 3, …). Clicking a ranked element un-ranks it (and shifts higher numbers down). When all slots are filled, **Submit** enables. Submission reveals the expert order overlaid on the mockup, the user's score, and the rationales.

### Why curated subsets (not "rank everything visible")

Ranking trivial elements is busywork and dilutes scoring. A senior designer would say the first job of hierarchy is *choosing what matters*. 5–8 ranked elements keeps each scenario a focused lesson.

### Why strict order (not tiered buckets)

Linear ordering produces unambiguous right/wrong moments for teaching. Tiered ranking is a v2 candidate for scenarios where strict order is genuinely ambiguous.

## User Flow

1. **Home** — grid of 4 category tiles (Marketing · Dashboard · Settings · Pricing). Each tile shows category best score and scenarios-completed count. Clicking a tile navigates to the Category view.
2. **Category view** — dedicated screen listing the 3 scenarios in that category, each with its own best score and an "Enter" affordance. Includes a back link to Home.
3. **Scenario screen** — split view (see Layout below).
4. **Review screen** — same split view, now annotated with expert order and rationales.
5. **Category complete screen** — shown after the third scenario in a category is reviewed. Shows category best + average and links to sibling categories.

### Layout (scenario + review)

- Left pane (~65% viewport): `<MockupFrame>` renders the mockup. Rankable elements show a hairline outline on hover and a rank chip overlay when assigned.
- Right pane (~35% viewport):
  - **Scenario mode:** numbered list (1..n). Filled slots show the element label. Bottom: `Undo` (secondary), `Submit` (primary, disabled until full).
  - **Review mode:** score (e.g. `72 / 100`), user ranking vs. expert ranking side-by-side with per-row position deltas, 1–2 "Biggest misses" bullets derived from the highest-penalty pair inversions. Primary: `Next scenario`. Secondary: `Back to categories`.

### Keyboard

- `1`–`9`: assign rank to hovered element.
- `Backspace`: undo last rank assignment.
- `Enter`: submit (when full).
- `Esc`: exit to category view.

## Data Model

```js
// src/data/scenarios.js
{
  id: 'marketing-saas-hero',
  category: 'marketing',      // 'marketing' | 'dashboard' | 'settings' | 'pricing'
  title: 'SaaS landing hero',
  // mockup component is looked up in the registry by scenario `id` — no separate field
  rankedElements: [
    { id: 'cta-primary', label: 'Primary CTA' },
    { id: 'headline', label: 'Headline' },
    // ... 5–8 total
  ],
  expertOrder: ['cta-primary', 'headline', 'subhead', 'logo', 'nav-pricing', 'trust-bar'],
  rationales: {
    'cta-primary': 'Only solid-fill button. Warm color against neutral field. Largest click target.',
    'headline':    'Largest type on the page. Carries the promise.',
    // ... one per ranked element
  }
}
```

Invariants (enforced by tests / authoring checks):
- `expertOrder.length === rankedElements.length`.
- `expertOrder` is a permutation of the ids in `rankedElements`.
- Every id in `expertOrder` has a matching entry in `rationales`.

## Scoring

**Weighted Kendall tau**, normalized to 0–100. Every pair of elements (i, j) where i appears before j in the expert order contributes to the score; if the user has them in the opposite order, a penalty is added. Pairs where either element is in the expert top 3 carry double weight (top-of-hierarchy mistakes cost more).

```js
// src/scoring/score.js
export function score(userOrder, expertOrder) {
  const n = expertOrder.length;
  let penalty = 0, maxPenalty = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const weight = (i < 3 || j < 3) ? 2 : 1;
      maxPenalty += weight;
      const a = expertOrder[i], b = expertOrder[j];
      if (userOrder.indexOf(a) > userOrder.indexOf(b)) penalty += weight;
    }
  }
  return Math.round(100 * (1 - penalty / maxPenalty));
}
```

"Biggest misses" in the review screen = the 1–2 inverted pairs with the highest contributed penalty.

Scoring function is pure and gets unit tests: perfect match → 100, full reverse → 0, single top swap vs. single bottom swap, duplicate-guard.

## Stack & Architecture

- **React 18 + Vite** (matches LogoForge). No Tailwind. Plain CSS with CSS variables.
- **No router library** for v1. Root component holds a `view` state: `'home' | 'category' | 'scenario' | 'review' | 'categoryComplete'`. A router becomes worth it in v2 only if deep-linkable scenarios become a requirement.
- **State:** React context for the active scenario's ranking. `localStorage` for per-scenario best scores via a tiny `useProgress` hook. No global store library.

### File Layout

```
src/
  App.jsx                        // root view switcher
  state/
    RankingContext.jsx           // provider + useRanking hook (assign/unassign/clear)
    useProgress.js               // localStorage-backed best-score map
  components/
    Home.jsx
    CategoryView.jsx
    Scenario.jsx                 // orchestrates mockup + RankingPanel
    MockupFrame.jsx              // scoped style reset; renders registered mockup by id
    RankableElement.jsx          // reads RankingContext; renders outline + chip
    RankingPanel.jsx             // numbered slots, undo, submit
    Review.jsx                   // score + deltas + biggest misses
    CategoryComplete.jsx
    mockups/
      registry.js                // id -> component map
      marketing-saas-hero.jsx
      marketing-product-announce.jsx
      marketing-pricing-cta.jsx
      dashboard-analytics.jsx
      dashboard-ops.jsx
      dashboard-empty-state.jsx
      settings-profile.jsx
      settings-billing.jsx
      settings-danger-zone.jsx
      pricing-three-tier.jsx
      pricing-comparison.jsx
      pricing-enterprise.jsx
  data/
    scenarios.js                 // array of scenario metadata
  scoring/
    score.js
    score.test.js
  styles/
    tokens.css
    app.css
```

### Key Component Contracts

**`<RankableElement id label as?>...</RankableElement>`**
Wraps any mockup element to make it participate in ranking. Reads ranking state from context; no prop-drilling from mockups. Handles:
- Hover outline (trainer mode).
- Click → `assign(id)` or `unassign(id)`.
- Rank chip overlay (top-right corner of element) when assigned.
- Review mode: outline color reflects correct-position (green) vs. wrong-position (red), shows rationale pill on hover/focus.

**`<MockupFrame scenarioId>`** — looks up the registered component and renders it inside a style-reset boundary. This is important because each mockup can have its own aesthetic (a pricing page can use a serif, a dashboard can use its own color system) without leaking into the trainer chrome.

**`RankingContext`** — holds `{ order: string[], assign(id), unassign(id), clear() }`. `order` is the array of ids in user-assigned order; `order.indexOf(id) + 1` gives the rank chip number, or null if not ranked.

## Design System (the Trainer Chrome)

Swiss / editorial. Chrome is austere on purpose so the mockups inside can vary.

**Tokens (`styles/tokens.css`):**

```css
:root {
  --font-sans: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  --fs-display: 3.5rem;
  --fs-h1: 1.75rem;
  --fs-h2: 1.25rem;
  --fs-body: 1rem;
  --fs-meta: 0.8125rem;
  --fs-micro: 0.6875rem;   /* all-caps eyebrows */

  --fw-regular: 400;
  --fw-bold: 700;

  --ink: #111111;
  --ink-60: #5a5a5a;
  --ink-30: #bcbcbc;
  --ink-10: #e7e7e7;
  --paper: #fafaf7;
  --accent: #d7263d;
  --correct: #2a6f3d;
  --wrong: var(--accent);

  --s-1: 4px;  --s-2: 8px;  --s-3: 16px;  --s-4: 24px;
  --s-5: 32px; --s-6: 48px; --s-7: 64px;  --s-8: 96px;

  --rule: 1px solid var(--ink);
  --rule-soft: 1px solid var(--ink-10);
}
```

**Enforced constraints:**
- No border-radius except `2px` on rank chips.
- No box-shadows. Depth from whitespace and rules.
- No gradients.
- Accent red used only in: selected rank chip, primary CTA, review "wrong" markers, active nav underline.
- All-caps eyebrows (`--fs-micro`, `letter-spacing: 0.12em`) for category labels and meta.
- Two weights only: 400 and 700.

**Mockups opt out** of these constraints inside `MockupFrame` — they need visual variety for hierarchy lessons to generalize.

## Content Authoring

Adding a new mockup post-v1:

1. Create `src/components/mockups/<id>.jsx` — real JSX, real CSS. Wrap 5–8 elements in `<RankableElement id="..." label="...">`.
2. Add an entry to `src/data/scenarios.js` (rankedElements, expertOrder, rationales).
3. Register the component in `src/components/mockups/registry.js`.

The friction is intentional. Every mockup is hand-authored, hand-opinionated, and hand-reviewed.

## v1 Content

12 hand-authored mockups across 4 categories, 3 per category:

- **Marketing:** SaaS landing hero · Product announcement · Pricing CTA
- **Dashboard:** Analytics overview · Ops monitoring · Empty state
- **Settings:** Profile · Billing · Danger zone
- **Pricing:** Three-tier · Feature comparison · Enterprise contact

## Testing

- `scoring/score.test.js` — unit tests for the scoring function. Edge cases: perfect match, full reverse, single top-swap, single bottom-swap, 2-element and 3-element minimum sizes, guards against duplicate or missing ids.
- `RankingContext` assign/unassign/clear logic — unit tests covering: assign to empty, unassign from middle (higher ranks shift), unassign from tail, double-assign guard, clear resets.
- No end-to-end tests for v1. Manual QA of all 12 scenarios is the gate before deploy.

Test runner: Vitest (Vite-native, minimal config).

## Persistence (localStorage)

Single key `squint:progress:v1` holding:
```js
{
  scenarios: { [scenarioId]: { bestScore: number, attempts: number } },
  lastVisited: scenarioId | null,
}
```
`useProgress` hook exposes `getBest(id)`, `record(id, score)`, and derived `categoryBest(category)` / `categoryCompleted(category)`.

Version the key (`:v1`) so a future schema change can migrate or discard cleanly.

## Deployment

- New GitHub repo `squint` under the user's `jkwong314` account.
- Vercel project with auto-deploy on push to `main`.
- Live URL returned to the user.

## v2 Parking Lot (not in scope)

Priority order, each independently valuable:

1. **Explanation mode** — read-only annotated gallery.
2. **Tiered ranking scenarios** — Primary/Secondary/Tertiary buckets for ambiguous-order cases.
3. **"Fix the hierarchy" mode** — user adjusts constrained properties to repair a broken hierarchy.
4. **More mockups** — expand categories; add Email, Data Viz, Mobile.
5. **Accessibility lens** — re-rank by a11y weight rather than designer weight.
6. **Shareable result cards** — Swiss-poster-style PNG export.
7. **Expert commentary audio** — voice notes per element.

## Open Questions

None blocking. Implementation can begin.

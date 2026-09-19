# Measured finding — a wrapped error-summary link has no target at its own centre

Measured by the Orchestrator against the running dev server at `http://localhost:5179/#/payment`
in a 390x844 viewport on 2026-09-16, after a refused submit.

## What happens

The error-summary entries are inline links inside list items. At 390 CSS px two of the three wrap
onto a second line. An inline box that wraps produces one rectangle per line with a gap between
them, but a single bounding box spanning both. The bounding box's centre falls **in that gap**,
where the hit target is the list item, not the link.

| Summary entry                                     | Lines | Box height | Element at the box centre | Centre reaches the link |
| ------------------------------------------------- | ----- | ---------- | ------------------------- | ----------------------- |
| `Customer number is required.`                    | 2     | 47 px      | `LI`                      | **no**                  |
| `Invoice number is required.`                     | 1     | 21 px      | `A`                       | yes                     |
| `Invoice amount must be a positive dollar amount.`| 2     | 47 px      | `LI`                      | **no**                  |

The two wrapped entries have line rectangles at `top 248 (h 21)` and `top 273 (h 21)`; the box
centre sits at roughly `top 271`, between them.

## Why it matters twice

**For a person.** Tapping the visual middle of a two-line error link does nothing. On a touch
device that middle is where a thumb lands.

**For the proof.** Playwright clicks an element's bounding-box centre. At 390 that centre is not on
the link, so the click misses, focus never moves, and the journey reports
`expected '' to be 'payment-customer'`. At 1280 the same text fits on one line, the centre is on the
link, and the journey passes. That is the whole reason this failure is narrow-only.

## What this corrects

Two earlier diagnoses of this failure were wrong and are struck:

- The Orchestrator's, that blur revalidation replaces the input node under `focusNode`. Unit 2
  instrumented the DOM and found the input still connected and still the identical node. The
  committing-revalidation defect in `finding-validation-commits.md` is real and independently
  reproduced, but it is **not** the cause of this failure.
- Unit 2's, that a scaled tester frame yields incorrect pointer coordinates. Declaring
  `viewport: { width: 390, height: 844 }` on the browser instance in `vite.config.ts` changed
  nothing — the same failure reproduced — so the frame is not the cause. Unit 2's recorded parent
  events at `(302, 9)` remain unexplained and are not relied on here.

## What the fix must establish

Give each summary entry a contiguous target whose centre lies on it — making the link a block-level
target inside its list item is the smallest change that does it. The proof is the measurement above:
for every summary entry at 320 and 390 CSS px, `document.elementFromPoint` at the link's box centre
resolves to the link.

Check the same property wherever an inline link can wrap, not only on this form. The capture run's
`Search markets` interception at light-390 is an unexplained failure of the same family and is worth
re-measuring this way.

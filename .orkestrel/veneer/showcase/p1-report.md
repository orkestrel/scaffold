Committed as `0df5a3b7535a96c2679c586fd15b5958dbab53f0` — **Polish showcase spacing and specimen contrast across variants**. Both requested trailers are present. Working tree is clean; nothing was pushed.

The baseline and final portfolios each contain 304 images. I viewed the 158 required baseline captures and 272 after-captures, covering every changed state in all four variants.

All findings below are **RENDERED-PROVEN**. Capture filenames resolve under both:

- Before: [`/home/user/veneer/tmp/captures/p1-before/`](/home/user/veneer/tmp/captures/p1-before)
- After: [`/home/user/veneer/tmp/captures/p1-after/`](/home/user/veneer/tmp/captures/p1-after)

| Finding | Change that closed it | Before/after capture filenames |
|---|---|---|
| Crowded grid and gutter digits at 390 px | Padded matrix headings establish sufficient column width; added sideways-scroll hints. | `grid--dark-390.png`, `gutters--dark-390.png` |
| Column and offset labels overlapped narrow bars | Moved intact class labels above the bars. | `columns--dark-390.png` |
| Float specimens crowded their text | Gave matrix columns sufficient width. | `float--dark-390.png` |
| Background matrices produced excessive empty space | Made each background matrix span the row. | `background--light-1280.png` |
| Overflow specimen labels were cramped | Made overflow matrices span the row. | `overflow--light-1280.png` |
| Mismatched figure heights created large empty bodies | Paired similar card specimens; reorganized alerts; gave stretched-link examples separate rows. Retained equal-height figure cards. | `card--light-1280.png`, `alerts--light-1280.png`, `stretched-link--light-1280.png` |
| Fixed outline controls were faint | Placed color demonstrations on contrasting fixed surfaces. | `buttons--dark-390.png`, `button-group--dark-390.png`, `checks-radios--dark-390.png` |
| Ancillary outline controls were faint in dark mode | Used neutral outlines with theme-aware emphasized text. | `badge--dark-390.png`, `clearfix--dark-390.png`, `collapse--dark-390.png`, `engine-states--dark-390.png`, `input-group--dark-390.png`, `modal--dark-390.png`, `navbar--dark-390.png`, `offcanvas--dark-390.png`, `spinners--dark-390.png`, `tailwindcss--dark-390.png`, `tooltips--dark-390.png`, `visually-hidden--dark-390.png` |
| Fixed text colors lacked contrast | Added contrasting light or dark specimen surfaces. | `text--dark-390.png`, `text--light-390.png` |
| Low-opacity examples lost readable identification | Added normal-contrast class labels above the demonstrations. | `text--dark-390.png`, `link-utilities--dark-390.png` |
| Shadows disappeared against dark surfaces | Added padded white frames; strengthened existing light specimen frames. | `shadows--dark-390.png`, `borders--dark-390.png` |
| Success-colored icon link was faint | Added a white specimen surface. | `icon-link--dark-390.png` |
| Blockquote attribution was faint | Used theme-aware secondary text. | `typography--dark-390.png` |
| Carousel arrows disappeared against dark imagery | Fixed those carousel specimens to the light control theme. | `carousel--dark-390.png` |
| Narrow stack toolbar squeezed the input | Allowed wrapping below the small breakpoint. | `stacks--dark-390.png` |
| Captions repeated lengthy narration | Shortened static-preview and fixed-color explanations. | `modal--dark-390.png`, `offcanvas--dark-390.png`, `popovers--dark-390.png`, `tooltips--dark-390.png`, `carousel--dark-390.png`, `engine-states--dark-390.png`, `buttons--dark-390.png`, `badge--dark-390.png` |

The two requested rulings are closed:

- **Row-cols 5 and 6:** [before](/home/user/veneer/tmp/captures/p1-before/grid--dark-390.png) → [after](/home/user/veneer/tmp/captures/p1-after/grid--dark-390.png). Geometry tests failed against the original grid/gutter implementation and passed after the fix, including the 390 px page-width assertion.
- **Paired figure bottoms:** [before](/home/user/veneer/tmp/captures/p1-before/card--light-1280.png) → [after](/home/user/veneer/tmp/captures/p1-after/card--light-1280.png). Similar-height pairing reduces empty bodies while preserving aligned bottoms.

Every required gate was run directly and its exit code collected:

| Gate | Final exit | Count/result |
|---|---:|---|
| `npm run format:check` | 0 | 355 files |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | 10 TypeScript project checks |
| `npm run build:showcase` | 0 | 112 modules; rebuilt `showcase/browser.html` |
| `npm run test:app:browser` | 0 | 219 passed, 8 files |
| `npm run test:setup:browser` | 0 | 72 passed, 2 files |
| Locked ordinary journey | 0 | 48 passed, 4 files |
| `npm run test:policy` | 0 | 119 passed, 1 skipped, 1 file |

Baseline and final capture journeys also exited 0 with 48 passing tests each. Registry census checks passed. Each variant reported zero stylesheet-face departures across 79 blocks.

Deviations, with evidence:

- The brief named `grid.html` and previously removed `h-100`. Grid specimens are generated in `factories.ts`; baseline source already contained `h-100`. The fix therefore widened generated matrices and changed figure pairing.
- Several initial commands ended with SIGTERM, exit 143, without diagnostics. Terminal-session reruns passed; the termination source remains unconfirmed.
- Initial lint reported four import-shadowing warnings; renaming the browser-page import fixed them. An initial policy run timed out; subsequent runs passed.
- One capture lookup used `link` instead of `link-utilities`; I reported the failed lookup and viewed the correct images before further edits. A missing optional Pillow dependency was handled with existing raw-byte comparison; nothing was installed.
- Builds retained compiler-version and chunk-size warnings but exited 0.
- Implementation and review were performed by me, as explicitly requested; no independent agents were used.

All 27 changed files are within the permitted scope. No stylesheet changes, added inline styles, network access, installs, or registry-leaf removals.

CONVERGED
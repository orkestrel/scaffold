Implemented U3. **Acceptance remains blocked by U2’s reverse-Tab dismissal defect**: the drawer stays open after focus reaches Dark. The brief forbids `app/` edits, so the [proposed repair](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-u2-focusout.patch) remains unapplied. No commit made.

[Full diff](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3.diff): four files, 415 insertions, 46 deletions.

Header heights, identical in Light and Dark:

| Face | 390 | 768 | 1280 |
|---|---:|---:|---:|
| Bootstrap | 116 px | 48 px | 48 px |
| Tailwind, no layer | 116 px | 48 px | 48 px |
| Tailwind + layer | 116 px | 48 px | 48 px |

After picking Accordion, the next Tab lands on **“Shipping and delivery”**, `button.accordion-button` inside `section#accordion`.

| Final gate | Run folder | Exit | Result |
|---|---|---:|---|
| Format | `redesign-u3-format-check` | 0 | Correct format |
| Lint | `redesign-u3-lint-check` | 0 | No diagnostics |
| Typecheck | `redesign-u3-typecheck-2` | 0 | No diagnostics |
| Setup | `redesign-u3-setup-2` | 0 | 203 passed |
| Application | `redesign-u3-app-2` | 1 | 242 passed; focusout failed |
| Full journey | `redesign-u3-journey-2` | 0 | 94 passed; four variants |
| Compare | `redesign-u3-journey-2` | 67 | 669 differences |

[Every compare difference is individually classified here](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-differences.md):

- **474 predicted:** partition/signature readings, Component preservation lines, and J1–J3 Journal changes.
- **195 outside the literal set:** 168 preservation rows, three row-order flags, and 24 partition-control lines. The [evidence report](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-report.md) attributes these to U1/U2. The diagnostic identifies exactly two additional panel-padding violations at 1280 and four at 390 in the unexcluded control.
- No forbidden contrast, engine, Tailwind-reading, 390-header, or Header-statechart differences.

The [complete gate and deviation ledger](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-report.md) includes **every command, folder, exit, result, expected/found deviation, evidence, action, and hypothesis**, including failed initial runs and the restored diagnostic.

`git diff --check` passes. Final `git status --porcelain`:

```text
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```
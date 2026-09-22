# CL10 fix round — terrain

The single home for this round's measurements. The brief `cl10-brief-2.md` states rulings and
obligations and restates none of this. Where the brief and this record disagree, this record and the
tree win, and the unit stops rather than resolving it.

Every reading here was taken by the Orchestrator on 2026-09-22 against the CL10 working tree, before
the fix round was dispatched. Cite each site by its symbol; the line numbers move under a landing.

## The selector-boundary defect

The admission expression in `collectGridVocabulary`, in `tests/setupStyles.ts`, uses a negated
character class as its word boundary. The class is ASCII-only, so it treats a non-ASCII letter as a
boundary when CSS treats it as an identifier continuation.

Instrument: the expression copied verbatim into a standalone script, run under Node with the same
`u` flag. Retained as `cl10-boundary-probe.mjs`.

| Selector | Current | Correct |
| --- | --- | --- |
| `.ratio` | admit | admit |
| `.ratio-21x9` | admit | admit |
| `.ratio::before` | admit | admit |
| `.icon-link > .bi` | admit | admit |
| `.icon-link-hover:hover > .bi` | admit | admit |
| `.vr` | admit | admit |
| `.ratios` | refuse | refuse |
| `.icon-linkage` | refuse | refuse |
| `.vrs` | refuse | refuse |
| `.ratio_x` | refuse | refuse |
| `.vr_x` | refuse | refuse |
| **`.ratioé`** | **admit** | refuse |
| **`.icon-linké`** | **admit** | refuse |
| **`.vré`** | **admit** | refuse |
| **`.tableé`** | **admit** | refuse |
| **`.colé`** | **admit** | refuse |
| **`.ratio中`** | **admit** | refuse |
| **`.ratio\78`** | **admit** | refuse |
| **`.vr\5f x`** | **admit** | refuse |

The rows in bold are the defect. Two properties of it matter for scoping:

- **It predates CL10.** The `table`, `col`, `row`, `offset`, `g`, `gx`, `gy`, and `caption-top`
  prefixes carry it too, as the `.tableé` and `.colé` rows show. CL10 extended a defective boundary; it
  did not introduce the fault.
- **It is latent.** No selector matching any bold row exists in the built cascade or in Bootstrap's
  distribution, so nothing false ships today. A false surplus would need such a selector to appear.

What CSS counts as an identifier continuation, and therefore what the boundary must refuse: an ASCII
letter, a digit, `_`, `-`, any character at or above U+0080, and an escape sequence introduced by a
backslash. What the boundary must still admit: `-` as the family-member separator, the end of the
selector, and any genuine non-identifier character such as `:`, a space, `>`, `,`, `[`, or `.`.

## The nested reader

`tests/src/styles/components/icon-link.test.ts`, in the case
`shifts the icon on hover and on keyboard focus only while the hover class is present`, assigns an
arrow function to a `const` inside the case body. It reads an icon's inline painted offset from its
parent link's own box, and the case calls it three times.

No other styles proof in the tree declares a local helper this way. Swept
`tests/src/styles/**/*.test.ts` for a `const` bound to an arrow or async arrow: the CL10 icon-link
proof is the only match.

`policy/no-nested-functions` is registered in `.oxlintrc.json`, and its `overrides` entry scopes it to
the published and application trees only. So the lint gate cannot see this, and a green
`lint:check` is not evidence of compliance.

## The setup-module findings carried in from CL9

`setupstyles-carry.md` assigned three findings to this round as their first opportunity. All three sit
in `tests/setupStyles.ts` or its proof.

- **A vacuous portion of the freeze assertion.** Part of the loop iterates containers whose entries are
  strings. Every primitive reports frozen, so that portion cannot fail under any mutation. The same
  loop carries the object-bearing tables, where the assertion is real.
- **The even-child equivalence is exact-text at depth zero.** It does not equate an uppercase or spaced
  spelling, nor one nested inside a functional pseudo-class. **This needs no change**: the condition is
  unreachable in this cascade and the doc block states exactly the narrow rule the code implements, so
  nothing drifts. Recorded so the unit does not invent work here.
- **The normalizer regression case reads its rows from the guide's default path.** Unrelated guide state
  could redden it for a reason unconnected to the normalizer. It reds loudly rather than passing
  silently, so this is robustness rather than a hole.

## The icon-shift proof, already settled

Do not re-derive this. The Orchestrator's probe `cl10-shift-probe-2.sh` mutated the fallback distance
from a quarter to a half of the font size, rebuilt, and read the proof:

```text
AssertionError: expected 7 to be close to 3.5, received difference is 3.5, but expected 0.05
```

The failure landed on the painted-offset assertion. The preceding transform-string assertion PASSED
under that mutation, which is the measured reason the case reads geometry rather than the computed
transform string. The comment in the case stating that reason is correct and stays.

## The compatibility-row granularity is NOT this round's

The subjective lane found the compatibility table now carries a row per family for the generated
families and a row per key for the fixed-selector keys, and ruled the per-key form the better
contract. Settling that means rewriting rows for keys landed in earlier units, which changes a
campaign convention. It is carried by the cross-cutting reconciliation unit, not here. Leave every
compatibility row's granularity alone.

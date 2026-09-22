# CL13 — the Content/layout portfolio verdict

Subject: what Veneer's container, row, table, and link keys **render**, judged by capture against
Bootstrap 5.3.8's own rendering of the same markup. The closing unit of the Content/layout family.

Brief: `units/cl13-verdict-brief.md`, six seeded candidates. **No fix was authorized in this round**,
per `orkestrel-polish-surface` § Select the scope, and CL13 owns nothing in the Veneer tree.

**Terminal: the verdict is complete. No second verdict round is called.** Reasoning under § The
terminal ruling.

## The portfolio

| Side | Source | Content |
| --- | --- | --- |
| Veneer | the journey suite's own capture run | 32 element frames over four keys, eight states, four variant projects |
| Bootstrap 5.3.8 | a spawned harness the Orchestrator owns, `units/cl13-capture-2.mjs` | 16 element frames, 16 page frames, 16 accessibility snapshots, 16 step logs |

Both sides mirror the same markup and differ in stylesheet. Both passed a blank-frame check proven
able to fail.

**The harness took two rounds, and the first brief is why.** Round 1 did everything its brief named —
mirrored markup, read Bootstrap's theme mechanism from its own distribution, proved its control red and
green — and shot whole viewports while Veneer shoots lifted elements. The brief fixed markup and
stylesheet and never fixed capture scope. Caught by the Orchestrator's own eyeballing before any lane
saw it, which is the step `orkestrel-polish-surface` puts first and the reason it does.

## Lanes

| Lane | Role and engine | Terminal |
| --- | --- | --- |
| Subjective design fit | `reviewer`, native Opus 5 | `CONVERGED` |
| Objective state truth | `analyst`, gpt-6-astra, journal `tmp/codex/cl13-verdict-analyst.jsonl` | `ANOTHER ROUND(2, 6, 7)` |
| Mechanical inventory | `checker`, native cheap tier | `ANOTHER ROUND(3, 4)` |

Three lanes, blind to each other, in parallel, on one portfolio.

## The seeded candidates, ruled

The candidates were the Orchestrator's own readings, offered to be killed. **Three of six were wrong or
overstated, and the lanes corrected all three.** That is the seeding working, not failing.

1. **The container cap matches Bootstrap exactly — CONFIRMED.** 1140 wide inside a 1280 viewport and
   390 at 390, on both sides, by PNG header and by eye.
2. **The row stacks at the same breakpoint — REFUTED as stated.** The portfolio samples 390 and 1280
   and never brackets the `md` boundary the record names. Two endpoint images are consistent with many
   breakpoint placements. What is confirmed is the same behaviour at both sampled widths, which is a
   weaker claim. **Cost:** a maintainer could accept a misplaced breakpoint that still produces these
   two images.
3. **Veneer renders systematically shorter for the font-size departure "and nothing else" — REFUTED in
   part.** Container and row hold the ratio exactly, 24→21 and 48→42. The table does not: 163 × 0.875
   is 142.6, not 149. Two lanes found the second cause by **looking**: Veneer places its table caption
   **above** the grid where Bootstrap places it **below**, at a smaller size with different padding.
   Both are recorded departures, so the difference is a decision — but "uniform" and "nothing else"
   were false. **Cost of the wording:** a maintainer would file a future caption-driven height change
   under font size.
4. **32 frames carry 14 distinct images — CONFIRMED.** The objective lane ran SHA-256 itself and found
   every same-state, same-width project pair byte-identical. Structural, not a defect. The mechanical
   lane correctly refused to confirm a digest claim it had no tool to check, and said so.
5. **The link frames are width-invariant on both sides — CONFIRMED.** An inline anchor does not reflow
   between those widths. Not a Veneer defect, and not a Bootstrap one.
6. **A lane cannot judge the role palette from this portfolio — CONFIRMED for Veneer, REFUTED for the
   portfolio.** The conclusion held and the cause did not, and the correction decides where the repair
   goes. **Bootstrap's side can show the palette**: its page frame renders all nine roles legibly and
   its snapshot names each. Veneer's cannot — its element frame shows one anchor, it registers no page
   frame for the key, and its only whole-page frame is 1280×8204, where the link row is unreadable.
   **The gap is one-sided, so the carrier is Veneer's capture registry alone.**

## Findings

**1. The frame grammar means opposite things on the two sides, and this is the round's most
consequential finding.** Verified first-party:

```text
476b04ee8f  table-base-rest--light-390.png
476b04ee8f  table-base-rest--dark-390.png      ← same image, both LIGHT
f19ef0d1a0  table-base-rest-dark--light-390.png
f19ef0d1a0  table-base-rest-dark--dark-390.png ← same image, both DARK
```

On Veneer's side the rendered mode lives in the **state** token before the separator; the token after
it names the project that shot the frame and says nothing about what rendered. On Bootstrap's side
that same position names the theme. So `--dark-390` renders light on one side and dark on the other.

The grammar is internally consistent, which is what makes it misread. The obvious comparison method —
sort both directories, match `--dark` to `--dark` — pairs a light frame against a dark one.

**Scope is family-wide, not CL13's.** The Button family's frames carry the same grammar.

**Cost:** a reviewer pairing by filename reports a dark-mode failure that does not exist, and every
later family's verdict round pays the same misreading.

**2. The two sides share no filename token for the same specimen.** Bootstrap's stems match the
registry's specimen names verbatim; Veneer's invert them and prepend the selector's element. The two
directories cannot be sorted into aligned rows, so every pairing is assembled by hand — which is the
condition finding 1 exploits.

**3. The caption position is a decision whose consequence is unrecorded.** Every Veneer table frame
captions above; every Bootstrap frame captions below, at both widths and both themes. The cause is in
the departures table. What is not recorded: Veneer's base table already captions at top, so the shipped
top-caption class has nothing left to change, and no class restores Bootstrap's bottom caption.
**Cost:** a consumer porting Bootstrap table markup gets every caption relocated with no named opt-out.
The class's redundancy is **NOT-EVIDENCED** — the portfolio registers no specimen for it.

**4. The accessibility artifacts are not comparable across the sides.** Bootstrap's are per-specimen
ARIA snapshots; Veneer's are per-variant whole-page dumps in a different format. What is comparable
came back clean — the link names match exactly and in order. What is not: whether Veneer's captioned
table carries an accessible name. Both lanes reached this independently and both ruled it **UNPROVEN
rather than failed**, because the formats cannot separate a cascade difference from a dump-format one.

*A correction to the mechanical lane's evidence:* it reported Veneer carries no accessibility data,
having searched only the frame directory. Veneer's variant artifacts do carry a full tree and a
22-entry interaction log. Its conclusion survives in narrowed form — the data is per-variant, not
per-specimen, so the comparison the brief asked for is still not possible.

**5. "Both sides mirror the same markup and differ only in stylesheet" is not shown by the portfolio.**
Bootstrap's frames come from a blank page carrying the specimen alone; Veneer's are lifts out of a full
showcase. The hosts are not the same document, so inherited context is not proven identical. No symptom
appeared — cap geometry, gutters, and the column split matched across every pair opened. **Cost: nil
today.** It bounds what a future unexplained difference may be attributed to.

**6. The registry-to-frame mapping is exact.** Eight declared states each appear at exactly four
variants; no frame carries an undeclared state and no declared state lacks a frame.

**7. The link key's dark twin adds no information on either side.** The element crop captures the
inline anchor with no surrounding background, so the light and dark frames render alike on Veneer and
on Bootstrap. The container, row, and table twins differ clearly.

## What this portfolio cannot show

Stated rather than passed: Veneer's link roles other than primary; the container's caps between the two
sampled widths; the `md` boundary itself; the table variants beyond base; and any non-rest state for
these keys — the last a deliberate registry exclusion rather than a gap.

## The terminal ruling

Two lanes called another round; one converged. **The Orchestrator rules the verdict complete.**

Every item those calls name — the unbracketed breakpoint, the role palette, the accessibility
comparison — needs the **capture registry to change**. This round does not authorize a fix, and CL13
owns nothing in the tree. A second verdict round over the same portfolio would re-read the same frames
and reach the same conclusions: the evidence gaps are properties of what was captured, not of how it
was read.

The lanes' calls are therefore **converted to carriers rather than to a round**. That is the
distinction between a finding that needs more looking and one that needs different evidence.

Candidates 2, 3, and 6 are settled on the record with the evidence that corrected them, and need
nothing further.

## Carriers

| Finding | Carrier |
| --- | --- |
| 1, the frame grammar | **The next family's capture work**, and it is urgent: it corrupts the reading method rather than the subject, and ships with every family's frames. Name it at that dispatch. |
| 2, the unaligned stems | The same carrier as finding 1 |
| 6 from the candidates, the one-sided palette gap | Veneer's capture registry, in the family that next revises it |
| 3, the caption opt-out | The guide, in the unit that next revises the table rows; the class-redundancy half needs a specimen before it can be ruled |
| 4, accessibility comparability | The capture registry, together with candidate 6 |
| 5 and 7 | Recorded, no carrier: neither changes what the tree does, and assigning them to a unit that cannot reach them is how a carrier goes stale |

## Verdict

**Accept.** Across all four keys Veneer renders as one deliberate surface, and every visual difference
from Bootstrap resolves to a recorded departure. Nothing in the rendered cascade reads as drift.

Every defect this round found is in **the portfolio** — what it names, what it aligns, and what it can
show — not in what ships. That is the correct outcome for a closing verdict on a family whose
implementation units were each audited to acceptance.

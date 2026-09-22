# CL12 terrain — the guide

The single home for CL12's measurements. Its brief states rulings and obligations and restates none
of this. Where the brief and this record disagree, this record and the tree win, and the unit stops
rather than resolving it.

Every reading was taken by the Orchestrator on 2026-09-22 against the **post-CL11 tree**, Veneer
`eb1cd71`. Cite each site by its symbol or its section heading; the line numbers move.

## The carry files are partly historical. Verify before acting.

`units/u7c-guide-bounds.md` carries ten guide bounds addressed to **U7e**. **U7e ran, landed at Veneer
`7f6d5f6`, and its verdict is accept.** Those ten are closed. Do not re-open them.

`units/prose-bounds-carry.md` carries bounds for several carriers, some of them U7e's and some
addressed to units that have since run. **Read each entry against the tree before treating it as open.**

This matters more than the individual rows: three carried claims checked before this brief was written
turned out stale or false. Treat every entry in both files as a hypothesis about the guide, not a
finding.

## One carried claim is FALSE and must not reach the guide

A round-1 checker on CL11 reported that the browser setup module's new exports leave the guide out of
parity, citing the rule that every public export is documented.

**That is wrong.** The rule touching `tests/setup*.ts` exports is a name-collision check in
`tests/setupPolicy.ts`: it compares setup declarations against names hosted fleet guides own and
raises `surface name belongs to one package` on a collision. It does not require a test helper to
appear in this package's guide, and the documentation parity rule governs the package's published
exports rather than its test modules. CL11 verified the collision check green and the policy project
passes.

**Write no guide row for a test helper.**

## What guide parity does and does not gate

`npm run test:guides` passes today: 18 tests.

The gate compares each backticked API against a real export, each `Summary` cell against its doc
block's description, each titled example against its guide fence, and the README pitch against the
tagline. **It does not gate the token table's completeness.** A shipped token with no guide row leaves
every gate green, which is why the gap below has survived several units.

## Two parity gaps measured, both real and both open

### Seven shipped tokens have no guide row

`--vn-container-sm`, `--vn-container-md`, `--vn-container-lg`, `--vn-container-xl`,
`--vn-container-xxl`, `--vn-gutter-x`, and `--vn-gutter-y` are declared in the built cascade and
carried in the registry in `src/core/constants.ts`. None has a row in the guide's token table.

The table's rows carry a name, a light value, a dark value, a source, and a Bootstrap alias. CL7 landed
the container tokens and CL8 the gutter tokens; neither added rows, and no gate noticed.

### A sentence promises work that may never land

Under the token table, the raised-surface paragraph ends: "The component surfaces that also consume it
land with their components." That promise was written before the token carried the code block's
reading. **Measure whether any shipped component reads it** before deciding what the sentence should
say — the answer decides whether this is a correction or a deletion.

## Two deferral grammars still stand, and only one is reader-bound

`### Deferred selectors` under the styles section takes `Name | Owner | Reason`. `### Deferred names`
under the tokens section takes `Name | Waiting on`. One idea, two shapes.

**Only the selector table has a machine reader.** `readDeferrals` in `tests/setupConformance.ts` parses
it and refuses a guide missing the `Styles / Deferred selectors` subsection. Nothing in the tree parses
`### Deferred names` or its `Waiting on` column: a sweep of `tests/` and `src/` for both strings
returns one doc comment and no reader.

So the constraint is one-sided. Changing the **names** table's shape reaches nothing. Changing the
**selectors** table's shape reaches `tests/setupConformance.ts`, which is off-limits to this unit, so
that direction stops and reports.

**A correction to this record, stated because the campaign's own discipline requires it.** An earlier
draft of this section claimed both tables have readers and named a "tokens reader" for the second. That
claim came from a retained carry file rather than from the code, and it is false. It was caught by the
scope read before dispatch. The lesson is the one this record's own opening states: a claim in a
retained artifact is a hypothesis until the code answers it — including when the Orchestrator is the
one carrying it forward.

## What the design criterion requires, and what is already true

The design row requires that the guide's § Departures carry the fixed heading scale, the `[hidden]`
layer placement, the table row tints, and the `--bs-body-text-align` fallback.

**All four are present.** Measured by reading the section rather than by pattern:

- the fixed heading scale appears as the `h1`–`h6` row and again as the `.h1`–`.h6` row, each naming
  the `36/30/24/20/18/16px` scale against Bootstrap's fluid sizes;
- `[hidden]` appears as its own row, naming the reset layer's important suppression;
- `--bs-body-text-align` appears as its own row, naming the fallback;
- the table row tints appear in the stripe percentage's token row with its source, in the layering
  paragraph that orders base, stripe, and accent backgrounds, and in the compatibility rows for the
  striped, striped-columns, active, and hover families.

**A pattern search reported two of these absent.** Reading the section found all four. Read the
section.

## The compatibility table's two granularities are NOT this unit's

The table carries one row per selector family for the generated families — the table key alone has
rows for its striped, striped-columns, active, and hover families — and one row per key for the
fixed-selector keys. CL11's round 1 ruled the per-key form the better contract.

Settling it rewrites rows for keys landed across several units, which changes a campaign convention.
It is carried by the cross-cutting reconciliation unit, whose proposal lives in the Orchestrator's
campaign folder rather than in this checkout — you cannot open it and do not need to.

**Leave every compatibility row's granularity alone.** That is the whole of this unit's obligation
here.

## The guide's size

1065 lines, with 89 token rows. The sections are: the styles axis and its workspace departures, the
tokens section with its Bootstrap departures and deferred names, the compatibility table, the
showcase, and the tests.

---

## Correction, added 2026-09-22 after CL12's round-1 audit

**The token list in this record was short by two.** The section "Seven shipped tokens have no guide
row" names the container and gutter tokens. `--vn-text-mark` and `--vn-surface-mark` were in the same
state: declared in `src/styles/_tokens.scss`, registered in `src/core/constants.ts`, and named nowhere
in the guide. Nine tokens were missing rows, not seven.

CL12 found them by running a registry sweep rather than reading this list, added rows for all nine
under the objective's own wording, and flagged the widening rather than absorbing it. Both audit lanes
confirmed the correction and confirmed that widening was right.

This is the second correction this record carries, and both have the same cause: a measurement taken
once and then trusted. The first was a claim carried from a retained artifact without checking it
against the code. This one was a sweep that stopped at the names the Orchestrator happened to check.
**A terrain record's number is only as good as the instrument that produced it; name the instrument
and prefer one that enumerates the population over one that checks a list.**

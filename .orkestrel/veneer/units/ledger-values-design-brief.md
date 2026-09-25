# LEDGER-VALUES design round — brief

One brief for both lanes of the design round, run blind to each other: the subjective lane on `planner` (Opus 5.5)
and the objective lane on `analyst` (GPT-6 Astra). Each lane performs the assignment directly, spawns nothing, edits
nothing, and returns a proposal. The Orchestrator reconciles.

## Law

Read, in order: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,documentation,architecture,quality}.md`;
Veneer's `ROADMAP.md` § Tenets, § Rulings, and § Exit criterion (items 2, 3, 6, 8, and 12) at
`/home/user/veneer-probe/ROADMAP.md`. No skill applies.

## The gaps, measured

The X-TENETS-STYLES audit (`tenets-styles/tenets-styles-audit-verdict.md` claims 8, 9, and 10, with the identity lens's
and the objective lane's verdicts beside it) found, on Veneer `main` at `0865c67` (read in `/home/user/veneer-probe`),
where the ledger is `guides/veneer.md` § Tokens › § Departures and § Additions, read by `readDepartures` and
`readAdditions` and measured by `collectLedger`, `collectAdditions`, `collectValueGaps`, `classifyDeparture`, and
`scanLedgerDrift` in `tests/setupServer.ts`, and gated in `tests/conformance.test.ts` (`describe('cascade ledger')`):

- **Retune against routing.** `classifyDeparture` labels a departure `tokenized` whenever the value names a `--vn-*`
  token, whatever the token resolves to. `.btn`'s `--bs-btn-font-size: var(--vn-size-2)` changes the look (the token
  carries Elements' `0.875rem`), while `.accordion`'s `--bs-accordion-btn-padding-y: var(--vn-space-8)` does not
  (`1rem`). The guide's definition of `tokenized` says it "routes the release value through a Veneer token". The primary
  fill carries Elements' value with no row saying so. § Outside the ledger states the ledger compares no canonical
  value; the § Reference map's `Source` cell (read by `collectReferenceRows`) names each token's origin.
- **Addition values.** An § Additions row records a name, not a value, so the objective lane's in-memory plants (the
  blockquote border at `97px`, a doubled radius) left the ledger empty.
- **The membership boundary.** `collectAdditions` skips a rule no shipped key claims, so the objective lane's plant
  `@layer components { .audit-unrecorded { color: red } }` left the ledger empty.
- **The shipped key list.** `tests/conformance.test.ts` writes the shipped list by hand; it equals the pinned
  inventory's keys today (the objective lane's executed mutations), and a re-pinned inventory that adds a key reddens
  nothing (the identity lens).
- **Source provenance.** No gate checks that a § Reference map row whose `Source` is `bootstrap` carries the release's
  value.

Constraints that bind: the guide stays the only machine-read record (exit criterion 12); the ledger stays textual,
because rows that differ only in notation are recorded on purpose (the guide's § Departures preamble); no second
parser (`AGENTS.md` § Project model); every gate reddens on a planted mutation.

## Question

Propose the ledger change that closes each gap, and the units that land it: how a retune is told from a routing (a new
`departure` member, a derived column, or a check against the § Reference map), how an addition's value is held, how an
unattributed emitted rule is refused, how the shipped list derives from the inventory, and how a `bootstrap` Source is
held to the release value. For each, name the reader or collector that changes, the table shape that changes, the
plant that proves the gate, and the rows the change makes false (the guide's tables are large; derive the set by the
collectors, not by reading the tables).

## Output

A proposal under 1500 words: the rulings with citations; the table and reader changes; the units (name, role and
engine, owned files, acceptance criteria, order); the risks. State no count.

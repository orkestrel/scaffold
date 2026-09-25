# LEDGER-RETUNE audit round 2 — claims

Subject: LEDGER-RETUNE round 2 in `/home/user/veneer-lret` (branch `unit/lret`), committed as `23b659b` over round 1's
`7952712`, which sits over Veneer `73326c7`. Briefed by `ledger-retune-brief-2.md` and, after its stop
(`lret-r2-stop-report.md`), by the Orchestrator's ruling in `ledger-retune-brief-3.md`. Written by `opus` on Opus 5.5 and
reported in `ledger-retune-report-3.md`. The round-1 verdict it answers is `lret-audit-verdict.md`. Evidence:
`lret-instruments/r2/lret-2.diff` (`git diff 7952712`), `lret-instruments/r2/lret-2-full.diff` (`git diff 73326c7`),
`lret-instruments/r2/lret-2-status.txt`, and every driver, probe, and log under `lret-instruments/r2/`. All paths sit
under `/home/user/scaffold/.orkestrel/veneer/units/`. The live change reads with
`git -C /home/user/veneer-lret diff 73326c7 23b659b`. A mutation counts as a kill only when its log shows an
`AssertionError` for the case it is paired with. Rule every claim.

1. **The resolver is faithful (round-1 claim 2, Item 1).** `ValueResolver` decides a pair alike only where both sides
   compute alike under every setting in `RESOLVER_SETTINGS` and, for a regular property, under the parent value
   `PARENT_VALUES` supplies; `normalizeResolvedColors` leaves every quoted string and every `url()` alone;
   `inferScopeMode` reads the mode from the target and its ancestors only; each element `collectContextElements` builds
   matches its compound, and a pair whose elements do not all match is undecided; and a pair is undecided where a side
   calls a function `UNVARIED_FUNCTIONS` names, or where a regular property's side is a CSS-wide keyword and no parent
   value varies the property. Name any pair for which this construction reports a difference Chromium does not render
   under some context a consumer's page can set, or hides one it does.
2. **Canonical values and witnesses (round-1 claim 4, R3, Item 2; ruling 2).** `scanCanonicalValues` compares a
   declaration outside every mode scope with the cell of each mode it applies in, and one inside a scope with that mode
   alone; where both sides resolve to nothing it compares their written text; `scanWitnesses` counts a row as a witness
   only where `var(<token>)` alone resolves alike to the row's release value; and `--vn-shadow-inset`, written in px as
   ruling 2 states, keeps its witness under every setting while `--vn-shadow-1` to `-3` keep rem.
3. **Every repaint pair is decided (R1, Item 3).** The conformance setup keeps both repaint results' `undecided` lists,
   and the case "decides every repainted value difference, with the theme key shipped and withheld" fails when either
   list holds a pair.
4. **The names and the retirements (round-1 claim 7, F1, Items 4 and 5).** `ContextElement.nested` is an assertion true
   where the element sits inside the one before it; `normalizeDeclaration` and `matchesDarkScope` leave no consumer; the
   resolver case compares `150ms` with `0.15s` and `15%` with `15.0%` alike and `15%` with `16%` apart; every new type,
   constant, and helper (`ResolverSetting`, `RESOLVER_SETTINGS`, `PARENT_VALUES`, `UNVARIED_FUNCTIONS`,
   `extractMatchedCompound`, `inferScopeMode`) lives in its centralized file, is exported, is pinned in the export list,
   and is proved; and each satisfies `.claude/rules/names.md`.
5. **The rows.** Every § Departures row's `Departure` cell equals the member the gate prints; the member drift after the
   ruling is exactly the `.col-form-label`, `.display-1` to `.display-6`, and `legend` `font-size` rows, each from
   `tokenized` to `retuned` (`lret-conformance-drift3.log.txt`); and the `.btn` `--bs-btn-font-size`, `.accordion`
   `--bs-accordion-btn-padding-y`, and `theme` `--bs-primary` rows read `retuned`, `tokenized`, and `retuned`.
6. **The proofs (round-1 claim 6, Item 6).** Each case in `describe('ValueResolver')` and in `describe('cascade ledger')`
   fails with an `AssertionError` under the mutation or plant the report's table pairs with it, as its log shows; the
   canonical and witness detection cases fail under the `radius`, `initial`, `scoped`, `witness`, and `pill` plants;
   the probe-syntax case fails when any one syntax in `PROBE_SYNTAXES` is removed; and every mutation and plant restores
   its file byte-identically. For each proof, name the mutation that would make it fail and whether its assertions
   distinguish that mutation from the passing case. Rule separately on the report's statement that each syntax it removed
   from `PROBE_SYNTAXES` computes values the same way as a kept syntax or the `font-family` rung.
7. **Timing.** `LEDGER_TIMEOUT = 24_900` follows the `ORACLE_TIMEOUT` rule from the contended readings the report names
   (`lret-instruments/r2/probe/timing.txt`, `lret-timing-contended-*.log.txt`), and no case the change adds relies on a
   duration the resolver's load can exceed.
8. **The guide (round-1 claim 9, F2, Item 7).** Each guide sentence the report lists under "Guide sentences changed" is
   true of the gate as written and reads once, and no other guide sentence the change makes false remains, the § Tokens
   legend, § Departures preamble, § Reference map preamble and comparison paragraph, § Outside the ledger, and § Tests
   included.
9. **Scope and gates.** The status names only the files `ledger-retune-brief-2.md` and `ledger-retune-brief-3.md` own;
   the only `src/**` change is the `--vn-shadow-inset` declaration; and the check, lint, format, setup, build,
   conformance, tokens, guides, and policy logs in `lret-instruments/r2/` exit 0.

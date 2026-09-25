# LEDGER-RETUNE audit — claims

Subject: LEDGER-RETUNE in `/home/user/veneer-lret` (branch `unit/lret`, uncommitted over Veneer `73326c7`), briefed by
`ledger-retune-brief.md`, which carries Rulings 1 to 3 and 7 of `/home/user/scaffold/.orkestrel/veneer/ledger-values-design-verdict.md`.
Written by `opus` on Opus 5.5 and reported in `ledger-retune-report.md`. Evidence: `lret.diff` (`git diff 73326c7`),
`lret-status.txt`, and `lret-instruments/` (the gate, mutation, and plant drivers, the timing probe, the drift member
list, and every log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only
when the failing case's message names an assertion failure. Rule every claim.

1. **Ruling 1: resolution decides, never the Source cell.** `classifyDeparture` returns `retuned` exactly where the
   resolver reports the two sides' computed values differ, and otherwise the text-only member; it never reads the
   § Reference map `Source` cell; and a pair the resolver cannot decide takes no member and is named by the gate, never
   routed to a text-only member.
2. **The resolver is faithful.** `ValueResolver` computes each side in Chromium in the row's mode at the default factors
   and in a context built from the row's selector; the custom-property probes (`PROBE_SYNTAXES`, then
   `PROBE_PROPERTIES`) accept a value exactly where Chromium parses it; a regular value whose variable is missing is
   treated as Chromium treats a declaration invalid at computed-value time; and `normalizeResolvedColors` equates only
   values Chromium renders alike. Name any pair for which this construction reports a difference Chromium does not
   render, or hides one it does.
3. **Ruling 2: the union and the rows.** `retuned` joins `Departure` and outranks every member but `dropped`, `declared`
   is renamed `restated` everywhere it appears, and every § Departures row's member equals what the gate prints
   (`lret-drift-members.txt`, `lret-conformance.log.txt`); the three verdict rows read `retuned`, `tokenized`, and
   `retuned`.
4. **Ruling 3: canonical values.** `scanCanonicalValues` compares each canonical token's resolved value with its
   § Reference map cell at every site that declares it, in each mode; the `radius` plant fails it with an assertion; and
   the retired `tokens.test.ts` reference-map case and both retained-alias cases compared nothing the gate does not.
5. **Ruling 7: witnesses.** `scanWitnesses` names each `bootstrap`-sourced token that no departure row reads at the
   release value, the `witness` plant fails it with an assertion, and the scan names none on the tree.
6. **The proofs.** Each case in `describe('ValueResolver')` and in `describe('cascade ledger')` fails on the mutation the
   report pairs with it (`lret-mutation-*.log.txt`) with an assertion, and the `undecided` plant fails its case. For each
   proof, name the mutation that would make it fail and whether its assertions distinguish it from the passing case.
7. **The API shape.** `collectLedger` staying synchronous and returning unclassified `gaps`, with `classifyValueGaps`
   classifying them asynchronously, satisfies `.claude/rules/names.md`, `.claude/rules/typescript.md`, and
   `.claude/rules/architecture.md`; every new type, constant, and helper lives in its centralized file, is exported,
   and is proved; and every retired export (`RETAINED_COLOR_ALIASES`, `RETAINED_LENGTH_ALIASES`) leaves no consumer.
8. **Timing.** `LEDGER_TIMEOUT` follows the `ORACLE_TIMEOUT` rule from the report's contended reading
   (`lret-instruments/probe/timing.txt`), and no case the change adds relies on a duration the resolver's load can
   exceed.
9. **The guide.** § Departures' preamble and legend, the § Reference map preamble and comparison paragraph, § Outside
   the ledger, § Tests, and the other sentences the report names are true of the gate as written and read once, and no
   other guide sentence the change makes false remains.
10. **Scope and gates.** The status names only owned files and the files the report's ancillary choices name; the
    check, lint, format, setup, build, conformance, tokens, guides, and policy logs exit 0 in `lret-instruments/`.

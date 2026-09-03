# Absorption lane — reconcile the refuter's rulings for pool

## Role and engine

`grok` on the Cursor bench (GPT-5.6 Luna while Grok 4.6's quota is spent), read-only, in `/home/user/fleet/pool`. Perform the assignment directly and spawn nothing. Return evidence with `file:line` pointers; rule nothing, edit nothing, run no command that changes a tree.

## Question

From `/home/user/work/reports/conform-pool.json` (the refuter's rulings under `refuter.rulings`, the finders' findings under `objective.findings` and `subjective.findings`, matched by `id`), map every ruling whose `verdict` is `CONFIRMED` against the four fixed reconciliation rules, and sweep the fleet for the real consumers of every breaking row. The Orchestrator applies the marks; you report what each rule would catch and quote the sentence it rests on.

## Evidence to return

For every CONFIRMED ruling, one block with its `id`, its `breaking` flag, and:

1. **Fold candidate (rule 1).** Where another CONFIRMED ruling's `repair` or `ground` names one carrier for the same defect (the same site and the same operative change), name the carrier `id` and quote the clause that names it; otherwise write `none`.
2. **Off-limits repair (rule 2).** Where the ruling's `repair` requires editing `package.json` dependency or version fields, `package-lock.json`, `node_modules`, an npm install, or any of `.claude/**`, `.codex/**`, `.cursor/**`, `AGENTS.md`, `CLAUDE.md`, `.agents/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/**`, `.mcp.json`, `.oxlintrc.json`, `.oxlintignore`, `.oxfmtrc.json`, `.prettierignore`, `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, quote the clause of the repair that requires it and name the path; otherwise `none`.
3. **Consumer-only repair (rule 3).** Where the repair is entirely an edit to another package's checkout, name the consumer and quote the clause; otherwise `none`.
4. **Breaking sweep.** Where `breaking` is true, name each identifier the repair renames or removes, then grep it at a word boundary across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/fleet/*/guides/pool.md`, `/home/user/fleet/*/README.md`, `/home/user/scaffold/src`, and `/home/user/scaffold/tests`, excluding every `node_modules`, excluding `/home/user/fleet/pool` itself, and marking a hit inside a vendored mirror `guides/pool.md` of another checkout as `mirror`; list every hit as `checkout path:line`, or `no source consumer`.

Then a closing block: the list of CONFIRMED ids, the ids each rule flagged, the checkouts that hit as source consumers, and the sites the sweep could not read.

## Output

Sections `Question`, `Evidence` (the blocks above in the rulings' order), `Distillate` (the closing block), `Unknowns` (what you could not read, by path), `Journal` (leave for the driver), and `Deviation` (any tree change you observed, or `none`). No process diary.

## Deviation contract

Stop and report the path when the rulings file is unreadable or a sweep path does not exist.

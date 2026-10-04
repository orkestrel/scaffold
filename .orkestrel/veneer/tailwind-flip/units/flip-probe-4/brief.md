# Unit flip-probe-4 — P4 fixed point over the documented specimens, with serialized `resolved` tuples and the copy-induced check

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`. You are the sole writer, and you write only under the folder tmp/probes/flip5 of `/home/user/veneer` (create it). No other unit writes while you run. A nested `git` may report "not a git repository": do not diagnose; your own `git status --porcelain` is the authority.

## Objective

Re-run the curation fixed point of `flip-probe-3` from a copy of its code in tmp/probes/flip5, over the page that `flip-specimens` rebuilt with Bootstrap's documented markup, with exactly the changes in § Changes. Write out/p4.json, `curation.json`, and `report.md` there. The derived table decides which of the corpus's expected rows the fold (`flip-fold-2`) takes; the serialized `resolved` tuples close the audit's hold on copy-induced departures.

## State at launch

This unit launches after `flip-header`, `flip-fix-a`, and `flip-specimens` are accepted and committed. Read `git log --oneline -3` and `git status --porcelain` first; the tree is clean apart from the ignored `tmp/`. The served page folder dist/app/browser was rebuilt by `flip-specimens` (`npm run build:app:browser`) at that commit: confirm the 12 added figure titles appear in the served page before the first iteration, and stop if any is absent. Every line number below is "(re-read at launch)".

## Context

- **Probe-3 code and result (read-only).** `/home/user/veneer/tmp/probes/flip4/`: `p3.ts`, `lib.ts`, `browser.ts`, `declarations.ts`, `types.ts`, the Sass copy under its sass folder (`/home/user/veneer/tmp/probes/flip4/sass/bootstrap/_mixins.scss` with the scoped mode of `curate` and the `scope` mixin, `/home/user/veneer/tmp/probes/flip4/sass/bootstrap/_reset.scss`), `report.md`, `curation.json`, `summary.json`. Its archive: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-probe-3/` (`brief.md`, `report.md`, `p3.ts`, `lib.ts`, `browser.ts`, `sass-mixins.scss`). Its brief owns the three refinements (the `resolved` kind, the widened component elements, the scoped form); probe-2's brief `/home/user/scaffold/tmp/codex/flip-probe-2-brief.md` owns the host method, the corrected `utility` rule, the empty seed, the `curate` exclusions, the exclusions list, and the iteration bound. Copy into tmp/probes/flip5; never edit flip4, flip3, or flip2.
- **Evidence.**
  1. The audit `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-curation-audit/last.md`: the hold on copy-induced departures (lines 12 to 26: probe-3 counted 646 `resolved` departures in the final 1280 light closed condition and saved no tuple; `browser.ts:173` assigns `resolved`, `browser.ts:182` saves only `preflight`, `unattributed`, and `admitted` records), item 1, and item 2 (the scoped `.table tr` and `.table tbody` copies at (0,1,1) outranking `.table-VARIANT` and `.table-group-divider`).
  2. The corpus `/home/user/scaffold/tmp/codex/documented-markup.md`: § 1 The 12 breaking classes (the expected readings), § 2 S1 to S11 and § Rows the fixed point is expected to derive (13 rows), § 3 (the bare-descendant rulings, `.navbar-text a`, the `.card > hr` residual), and § Orchestrator rulings on the corpus at its end.
  3. The design verdict `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`: R5 (the attribution kinds `utility`, `resolved`, `preflight`, `inherited`, `unattributed`; the exclusions), § 4, and every § 12 entry on curation and the partition (the scoped form `:where(.ROOT) TAG`; the witness rules; the precedence invariant; the signature dedupe).
  4. The current table: `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet, 46 rows (30 `reboot`, 10 `restore`, 6 `scoped`), equal to `$curated`, `$restored`, and `$scoped` in `/home/user/veneer/src/tailwindcss/_tokens.scss` (names as `flip-fix-a` leaves them; re-read at launch).
  5. The journey's signature reader in `/home/user/veneer/tests/setupBrowser.ts` and its use in `/home/user/veneer/tests/app/browser/integration.test.ts` (the partition case, near :1082 and :1110; re-read at launch): the key (tag, sorted classes, nearest `data-bs-theme`, open state).
- **Inputs.** Shared names: the 192 shared utility names plus the `TAILWIND_CLASSES` members in `/home/user/veneer/app/browser/constants.ts`; `CLASS_NAMES.bootstrap.components` from `/home/user/veneer/src/core/constants.ts`. Lifted sheet: `/home/user/veneer/dist/src/bootstrap/index.css`. Served page: `/home/user/veneer/dist/app/browser/index.html` and its folder (read as served). Recipe candidates: `/home/user/veneer/app/browser/recipe.json`.
- **Host.** Linux. Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Chromium: `chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })`; record `browser.version()`. Playwright, sass, tailwindcss from `/home/user/veneer/node_modules`. Loopback `node:http` server on port 0. No network.
- **Law.** Scripts are TypeScript run by `node path/file.ts`; no `any`, no `as`, no `!`, no `@ts-*`; add no package; import nothing from the checkout source trees. Report prose: plain, lead with the finding, numbers only with their run (`/home/user/scaffold/AGENTS.md` § Writing).

## Scope

- **Owned.** The folder tmp/probes/flip5 under `/home/user/veneer` (create it).
- **Off-limits.** Every other file. Write no tracked file. Run no npm script. Never rebuild `dist/`. No install, commit, push, credential, destructive command, `git stash/add/reset/checkout`, or tree-wide mutating gate.

## Changes from probe-3 (exactly these)

1. **Serialize every `resolved` tuple.** Per iteration and condition, save each `resolved` departure as (classes, tag, pseudo, longhand, A, F, the Bootstrap rule that declares it: selector text, layer or `unlayered`, and specificity), beside the `preflight`, `unattributed`, and `admitted` records probe-3 already saves. out/p4.json carries them with a stable key order.
2. **The copy-induced check, as a pass after each iteration.** For each `resolved` departure on a component element, test whether F equals the declared value of a curated, restored, or scoped copy rule in the iteration's tuned sheet that matches the element and declares the longhand, while no component rule (a `bootstrap`-layer rule whose selector names a `CLASS_NAMES.bootstrap.components` class) that matches the element and declares the longhand outranks that copy (layer, specificity, source order). Report every hit: element key, longhand, A, F, the copy rule, and the nearest component rule with both specificities. Zero hits is the expected finding; a hit is a copy-induced break that `resolved` hid.
3. **One element per signature.** Read one element per signature (tag, sorted classes, nearest `data-bs-theme`, open state), as the journey's partition does, and report per condition the signature count against the element count. The baseline and the recipe reading take the same representative element.
4. **The scoped form emits `:where(.ROOT) TAG`** at (0,0,1), in `bootstrap` after the restore rows and before the component partials, as the production `scope` mixin does (patch the flip5 Sass copy only, never flip4's); a scoped row is named `:where(.ROOT) TAG` in `curation.json`.

Everything else stays as probe-3 did it: the empty seed; the corrected `utility` rule with the withheld Bootstrap rule's longhands; the `resolved`, `preflight`, `inherited`, `unattributed` order; the widened component elements; the `curate` exclusions; the exclusions (geometry, `position-area`, the scrollspy state arranged as probe-3 arranged it); the three-iteration bound (recompile the flip5 Sass copy to sheets/tuned.iN.css and the recipe to sheets/recipe.iN.css each iteration); the 14 conditions at 1280 and 390 in light and dark with the open states; and two runs whose out/p4.json is byte-identical.

## Outputs

- out/p4.json under tmp/probes/flip5 (stable key order, no timestamps or durations).
- `curation.json` there: rows with form `reboot`, `restore`, or `scoped`, class or selector, longhands, witness markup, A, F, iteration.
- `report.md` there:
  - the derived table beside the current 46 rows: each row marked reproduced, outside the current table, or current row not reproduced; a current row the fold dropped as redundant or invisible that the fixed point re-derives (the `focus-ring-*` modifiers, `icon-link-hover`, the variant-scoped table rows, the border-only anchor restores, `.carousel-indicators button`) is marked as such;
  - the derived table beside the corpus's 13 expected rows: each reproduced, derived with other longhands (name them), or not reproduced with the A and F the probe read on its specimen element;
  - the corpus rulings applied as marks, not as edits to the derivation: `row`, `col-sm-9`, and `col-sm-8` (no row; the S7 departure the consumer owns) and `:where(.navbar-text) a` (decided by this measurement: the reboot's underline against preflight's `inherit`);
  - the residual `preflight` and `unattributed` groups after the last iteration, grouped by (classes, tag, pseudo, longhand, A, F) with counts;
  - per-iteration attribution counts including `resolved`; the `resolved` tuples grouped by the declaring rule with counts;
  - the copy-induced hits of change 2;
  - the signature and element counts per condition;
  - the Chromium version; the duration of each run and of each iteration; two-run byte identity of out/p4.json (run the entry twice, `cmp`); `git status --porcelain`.

## Acceptance criteria (cheap first)

1. The 12 added figure titles appear in the served page.
2. The entry under tmp/probes/flip5 exits 0 twice with byte-identical out/p4.json.
3. `report.md` and `curation.json` exist.
4. No tracked file changed by this unit.

Observations, not criteria: the residual counts, the copy-induced hits, and the row list.

## Return shape

Final message: finding first (rows derived, reproduced, outside the current table, current rows not reproduced; the corpus's 13 rows reproduced, outside, not reproduced; residual `preflight` and `unattributed` counts against probe-3's 0 and 18 in the 1280 light closed condition; `resolved` counts and their largest groups; copy-induced hits; signature counts; durations), the paths of `report.md`, `curation.json`, and out/p4.json, the byte-identity result, and anything not run with the exact error. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); Chromium cannot launch from the pinned path; the served page lacks an added specimen; a write outside tmp/probes/flip5 would be needed; the fixed point does not converge in three iterations (report the residual for the Orchestrator's ruling). Settle ancillary choices yourself and record them in the report: the entry name (`p4.ts` or the copied `p3.ts`), helper names, the tuple layout.

## Rulings appended before launch

- **Launch order.** After `flip-specimens` is accepted and committed; `flip-fold-2` follows this unit and folds what it derives under the corpus rulings.
- **Sandbox** `danger-full-access`, as every Chromium-reading lane of this flip ran.
- **Cap.** 7000 s: probe-3 ran 1403 s and 1429 s; the population grows by 12 figures and the signature read cuts it.

## Launch

From `/home/user/scaffold`:

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/flip-probe-4.jsonl --errors tmp/codex/flip-probe-4.err --cap 7000 --status -- codex exec --json -C /home/user/veneer --sandbox danger-full-access --model gpt-6-astra -c model_reasoning_effort="high" --output-last-message /home/user/scaffold/tmp/codex/flip-probe-4-last.md "Read /home/user/scaffold/tmp/codex/flip-probe-4-brief.md from disk and execute it exactly. Your final message is the report it specifies."
```

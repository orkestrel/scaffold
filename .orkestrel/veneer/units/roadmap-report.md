# Unit F0 ROADMAP — report

`/home/user/veneer/ROADMAP.md` is written, 376 lines, untracked. Both scoped checks exit 0, and a
planted banned term proves the policy sweep reads the file. No stop; no shared-file patch.

## The file, section by section

- `# ROADMAP — @orkestrel/veneer` and its opening paragraph — names what Veneer is and fixes the
  phase order the user ruled: foundation, Bootstrap baseline, build-on.
- `## Tenets` — reproduced from `/home/user/scaffold/.orkestrel/veneer/tenets.txt` from
  `## Product tenets` onward, byte-identical except that the two `##` headings are demoted to
  `###`.
- `## Rulings` — the standing set from `units/g1-record-report.md` § C and the design set from
  `realign-design-verdict.md`, one line each, with the verdict named as the winner on disagreement.
- `## Routing` — a lane table naming role, engine, and transport; `gpt-6-astra` and
  `grok-4.7-high` written as identifiers; the Sonnet driver hop recorded as omitted; one lane per
  bench; each Codex lane's thread id recorded beside its report; the objective audit lane given to
  an engine that did not write the unit.
- `## Standing conditions` — the npm 10.9.7 host against the npm `>=11.6.0` pin, the vendored Test
  tip, Chromium 141 with downloads disabled, the `codex exec` sandbox, the Cursor shell allowlist,
  the `scaffold repair` restore set and content-owned configs, the Markdown policy sweep, and the
  Bootstrap pin — each with its consequence and the file it was taken from.
- `## Exit criterion` — the verdict's, verbatim, including the closing sentence on publication.
- `## Phases and units` — the verdict's ledger as a table with role and engine, checkout,
  dependencies, and what each unit closes, under the `F`/`B`/`E`/`X` phase letters.
- `### The family queue` — each `B` family's key set from the ledger's Units table, grouped by
  `units/remaining-surface.md`, with the instruction to read shipped status from the conformance
  run rather than the queue.
- `## Protocol` — the verdict's ruling 12 as per-family obligations, per-unit obligations, and the
  rounds to refuse.
- `## Carriers` — every open item from the planner's § 13 table and the analyst's § Tensions 13
  table, merged onto the verdict's unit names, each with a unit or a recorded drop; the reviewer's
  F1, F2, and F3 rows included; one line recording that the objective audit lane has not returned
  and that a successor edit folds it and the checker's unresolved claims in.
- `## Decisions` — D1 to D9 as open rows, each with its recommendation and the units that wait.
- `## Records` — the guide's sections and the oracle fixture as the machine-read record,
  `/home/user/scaffold/.orkestrel/veneer/` as the campaign record home, the rule that this file
  states no status a run recomputes, and the promotion obligation before the prune.

## Scoped validation

The criterion names `cd /home/user/veneer && npm run test:policy`. The bare form cannot run on this
host, which is the standing condition the brief states:

```text
$ cd /home/user/veneer && npx oxfmt --config .oxfmtrc.json --check README.md
npm error code EBADDEVENGINES
npm error Invalid semver version ">=11.6.0" does not match "10.9.7" for "packageManager"
exit=1
```

Both checks were therefore run the way the standing condition prescribes: the package script
through the npm 11 binary in the scratchpad, and the formatter through `node_modules/.bin`.

```text
$ node <scratchpad>/npm11/node_modules/npm/bin/npm-cli.js run test:policy
> vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
 Test Files  1 passed (1)
      Tests  109 passed | 1 skipped (110)
policy-exit=0

$ ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check ROADMAP.md
Checking formatting...
All matched files use the correct format.
oxfmt-exit=0

$ git status --porcelain
?? ROADMAP.md

$ wc -l ROADMAP.md
376 ROADMAP.md
```

The formatter's first run exited 1 on Markdown table column padding. Its own `--write` output was
applied to the owned file, and the re-check exits 0. Nothing else in the checkout was formatted.

### The sweep reads this file

A planted banned term reddens the policy suite and names the path, so the file is inside the
sweep's population rather than outside it:

```text
$ printf '\nA unit should read this line.\n' >> ROADMAP.md
$ node <npm11> run test:policy
+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",
+     "path": "ROADMAP.md",
      Tests  1 failed | 108 passed | 1 skipped (110)
planted-exit=1
```

The plant was removed in the same turn by restoring the pre-plant copy, and the re-run exits 0
(recorded earlier).

### Own sweeps

- Unconditional rows, case-insensitive, over `ROADMAP.md`:
  `\b(should|simply|easy|easier|just|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|slave|currently|above|below)\b`
  — no hit.
- Judged rows, same file: `\b(now|new|latest|once|since|master)\b` — two hits, both `new`, both
  inside the verbatim tenets ("every new capability Veneer supplies", "a new parser"), both in the
  permitted sense of a thing that does not exist yet. Ruled permitted.
- Every backticked path token in the file was extracted and resolved: each Veneer-relative path
  resolves from `/home/user/veneer`, each campaign path is absolute under `/home/user/scaffold`,
  and `/opt/pw-browsers/chromium-1194` resolves on this host. `orkestrel/test` reads as a
  repository name and is written as one.

## Disagreements between inputs, and how they were settled

1. **The tenets file's navigation sentence** points at `.orkestrel/veneer/plan.md` and
   `prompt.txt`. Neither resolves from `/home/user/veneer`, and this file replaces the plan.
   Reproduction starts at `## Product tenets`, so the sentence and the source file's own title line
   are not carried. Every tenet bullet is verbatim.
2. **Grok 4.6 inside a verbatim tenet.** Criterion 1 requires the tenets verbatim; criterion 2 bars
   Grok 4.6 from the routing. The tenet stays verbatim, and § Routing carries the directive that
   reads it superseded: the absorption engine is Grok 4.7 (`grok-4.7-high`).
3. **G1 § C's routing ruling** names Cursor for Grok 4.6 only. The verdict's user ruling names Grok
   4.7. The verdict wins; the standing ruling defers the engine names to § Routing instead of
   restating them.
4. **`index.rtl.css`.** G1 § C keeps it emitted and unexported; the reviewer's F2 and D5 recommend
   stopping the emission. D5 is open, so the standing ruling is written to hold until D5 rules.
5. **The forced-colours axis.** The planner put it in the Test unit landing in `0.0.19`; the
   analyst routed it TEST-RELEASE → VENEER-PIN → CAPTURE. The verdict's ruling 2 excludes it from
   this release and carries it to the Test release after `0.0.19`, so the carrier row records it as
   outside this ledger.
6. **Portfolio findings 5 and 7.** The planner kept the existing drop; the analyst assigned them to
   CAPTURE. The verdict's ruling 13 enumerates the drops it endorses and does not include these, so
   they carry to F7 CAPTURE.
7. **Vendor prefixes the build drops.** The planner recorded an accepted difference needing no
   action; the analyst assigned ACCOUNTING and BROWSER-RECEIPTS. The verdict's `departure` union
   carries `dropped`, so F5 ACCOUNTING records them as `dropped` rows with the supported-host
   consequence.
8. **The grid reference.** The planner closed it as unreachable; the analyst kept it on
   ELEMENTS-EVIDENCE. The verdict's ruling 7 keeps the grid judged against Bootstrap's page and
   requires the record to say so with the search pattern, so the row reads closed with E-ELEMENTS
   recording the closure.
9. **Family grouping.** `units/remaining-surface.md` groups `breadcrumb`, `pagination`,
   `btn-group`, `btn-toolbar`, and `btn-close` under disclosure and navigation, and `badge`,
   `progress`, and `spinner` under overlays. The ledger's `Passive` family and the verdict's
   B-PASSIVE row hold them instead. The verdict wins; the queue follows it.
10. **`transition`.** The ledger's Units table gives it to Overlays/feedback; the verdict's B-CROSS
    row takes it as a mechanism. The verdict wins.
11. **Carrier names.** The analyst's carrier names (ELEMENTS-EVIDENCE, IDENTITY, CLASS-CONTROL,
    CLASS-RULING, ACCOUNTING, CAPTURE, FOUNDATION, BROWSER-RECEIPTS, TOOLING-RULING,
    RETENTION-PREPARE, RETENTION, UTILITIES, NAVBAR) and the planner's `R` numbers were merged onto
    the verdict's ledger names. Every row landed on a ledger unit or on a verdict decision row
    (CLASS-RULING → D7, TOOLING-RULING → D8), so the deviation contract's stop condition did not
    fire.

## Ancillary choices recorded

- The mirror instrument's base-name comparison goes to F6 FOUNDATION with path identity, following
  the analyst; the planner had it with the capture work. F7 CAPTURE keeps the frame-grammar items.
- The "specimen" term collision and the stripe light-scope assertion go to F4 HOST-OBSERVATIONS,
  which owns the browser setup module's surface and that table test in the planner's owned-file
  list; the analyst had the collision with CAPTURE.
- D6 lists F6 FOUNDATION and B-UTILITIES as its waiting units: the guide sentence is F6's and any
  removal reaches the utility roots.
- Section headings and wording follow the criteria's names; the phase letters `F`, `B`, `E`, and
  `X` are introduced in one sentence before the ledger.

## Deviation state

No stop. No off-limits file was read for writing and none was edited. `/home/user/veneer/ROADMAP.md`
is the only file written in the Veneer checkout; the scratchpad holds the assembly parts and the
pre-plant copy.

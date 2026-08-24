# Unit SD2-FIX-2 — the scripts region writes per script

Role: sol implementer. Engine: GPT-5.6 Sol. You perform this unit directly and spawn nothing.
Queued behind SD3; start only from a clean committed tree (verify `git status --porcelain`).

## The falsifying run (real html, scaffold packed from 85f8df3)

`replaceManifestScripts` refuses the WHOLE region when any single writable script's declared
value is neither planned nor accepted (`src/core/compilers.ts` — the precheck loop returning
`undefined` before any write, commented "Rule on every named script before any of them is
written"). Reproduced against real html: `test:guides` declares
`vitest run --config vite.config.ts --reporter=dot --project guides` while planned carries
`--no-cache`; `accepted: []`; the single difference refuses everything, so `test:probe`,
`test:bench`, and `prepack` never append. The recorded ruling
(`.orkestrel/campaign/d2d-reconciliation.md` ruling 6) states: "For html: audit names
`test:probe` and `test:bench`; repair appends both; intentional extra scripts survive
byte-for-byte." The transactional coupling is an implementation artifact that defeats the
ruling fleet-wide: one drifted script blocks every append, so birth-cohort staleness can never
heal.

## The Orchestrator's ruling (binding)

- **Invariant:** the scripts region write is per-script. An absent planned writable script
  appends. An existing value equal to planned stands; a value in `accepted` upgrades to
  planned. A DIFFERING value stays byte-identical and is reported by name.
- **Constraint:** no write ever changes a differing value; extra (unplanned) scripts survive
  byte-for-byte; a structurally invalid region (a non-record `scripts`, a non-string value at a
  planned key) still refuses the whole write with `undefined`.
- **Interface:** the write's outcome distinguishes appended, upgraded, retained-differing, and
  the verb's scripts question names the DIFFERING scripts (declared vs planned) distinctly from
  the absent list — today the question names only absent scripts, so the refusal's cause is
  invisible to the operator. Keep the `#dependencyQuestion` vocabulary.

## Objective

In `/home/user/scaffold`:

1. Rework `replaceManifestScripts` (and whatever return shape the callers need) to the
   per-script semantics above. Type changes first in the owning `types.ts`.
2. Surface the differing-script report through `repair`/`overwrite` outcomes and the audit
   question per the interface above.
3. Red-first pin: the REAL html vector — an html-shaped fixture whose `test:guides` lacks
   `--no-cache` and whose `test:probe`/`test:bench`/`prepack` are absent. Red today (nothing
   appends); green after (all absent scripts append, `test:guides` stays byte-identical, the
   question names it as differing). Drive the REAL verb like the existing html-shaped CLI test.
4. Reconcile the SD2-FIX pins: "repairs other paths while a customized script region stays
   reported" changes meaning — the fixture's removed `test:distribution` now APPENDS while the
   customized release-proof variant stays and is named differing; the scripts-region
   byte-identity assertion narrows to the differing script's line. Name every flip.
5. `guides/scaffold.md`: the audit/write boundary passage states per-script semantics (append
   absent, upgrade accepted, retain and report differing). Regenerate `host.json` last
   (`npm run build:inventory`).

## Environment and limits

Sandbox denies network, git index writes, loopback listeners, and child spawns; the CLI suite
spawns — record its command as a host observation; scoped non-spawning runs pass. No commits.

## Scope

- Owned: `src/core/compilers.ts`, `src/core/types.ts`, `src/bin/CLI.ts`, `src/bin/types.ts`
  (if the outcome shape moves), `tests/src/core/compilers.test.ts`, `tests/src/bin/CLI.test.ts`,
  `guides/scaffold.md` (the one passage), `host.json` (through `npm run build:inventory` only).
- Off-limits: `tests/config.test.ts` (SD3 owns it), `src/core/templates.ts`, everything else.

## Acceptance criteria (cheap-first)

1. Scoped oxfmt/oxlint clean; `npm run check:src:core` and `check:src:bin` green;
   `npx tsc --noEmit` green.
2. The html-vector pin recorded red then green; every flipped pin named with its reason.
3. The differing-script question pinned (its message names the script and both values).

## Output

Final message = report: the new write semantics (file:line), the outcome/question shapes,
red/green records, flipped pins, gate tails, `git diff --stat`, `git status --porcelain`,
deviations or none.

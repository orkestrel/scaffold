# Orchestrator probe unit: target pre-flight against scaffold 0.0.65

Engine: the Orchestrator's own probe unit. Instrument: `evidence/linux-gate/preflight-run.sh`.
Scratch copies only; the real checkouts of toolbox and ollama were never touched.

## Question

When `@orkestrel/scaffold@0.0.65` is on the registry and each target re-pins to it and runs its
visit, does the target stay green? The contract warns a vendored release can turn a green target
red, because `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`. Answer it before
the version is spent, not after.

## Method

Per `wave.md` § Visit a repository: stage the unpublished tarball with `npm install --no-save`
(packed with `--ignore-scripts` from a `dist/` no source file postdates), run `repair --offline`,
prove the sweep with `audit --offline`, then run every gate with each project invoked singly.

## Readings

| target  | staged | repair | audit                | gates |
| ------- | ------ | ------ | -------------------- | ----- |
| toolbox | `0.0.65` | exit 0 | exit 0, `0 of 39 planned paths drifted` | format:check, lint:check, check, build, test:src, test:policy, test:config, test:guides, test:setup, release-mode distribution — every one exit 0 |
| ollama  | `0.0.65` | exit 0 | exit 0, `0 of 36 planned paths drifted` | the same set plus test:conformance — every one exit 0 |

What `repair` changed, against each real checkout: toolbox `.claude/settings.json` (the Ollama hook
guarded behind `CLAUDE_CODE_REMOTE`) and `scripts/ollama.sh`; ollama nothing, because it already
carries both at their `0.0.65` bytes. `tests/setupPolicy.ts`, `tests/policy.test.ts`, and
`tests/config.test.ts` are unchanged in both, so the mechanism the contract warns about does not fire.

## A false red, and the instrument defect behind it

The first pass reported `test:policy` red on both targets. The failing rule was
`portability: path segments avoid the characters Windows refuses`, and the offending paths were
`gate-format:check.log`, `gate-test:policy.log`, and their siblings — the instrument's own per-gate
logs, written into the root of the copy being measured with a colon in each name. The target's
policy sweep reads its whole workspace and refused them correctly.

Ruling: an instrument defect, not a release finding. The instrument now writes every log outside the
measured tree, under `logs/preflight-<target>/`, with the colon replaced. With the polluting files
removed, `test:policy` on the same repaired trees reads `90 passed | 1 skipped (91)`, exit 0, on both.

## The mirrored guide, and which verb refreshes it

`guides/scaffold.md` is vendored and U-floor changed its floor text, yet `repair --offline` left both
targets' mirrors untouched and `audit --offline` reported nothing drifted. The CLI's own help settles
which verb owns it: `catalog` is what "regenerate[s] the package table and refresh[es] the guide
mirrors", `repair` "write[s] each planned path the target is missing or has let drift", and
`overwrite` "do[es] everything repair and catalog do". `--offline` skips the catalog step because it
reads the registry. So the mirror refreshes at the online post-publish visit, which `wave.md`
already prescribes as the full `scaffold overwrite` after the release. By design, not a defect.

`overwrite` also refuses a target with no git repository (`The git query for target at . failed
with exit code 128`) — the scratch copies exclude `.git` — so the online visit runs in the real
checkouts, after the preparation commit `wave.md` requires.

## Consequence for the release

Publishing `0.0.65` obliges each target to a development-only re-pin, an online `overwrite`, an
`audit`, and a green gate run. Every byte-owned change is benign and every gate stays green on the
staged tarball. No target bumps and no target republishes.

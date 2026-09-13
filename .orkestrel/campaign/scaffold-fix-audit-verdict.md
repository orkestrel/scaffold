# Audit verdict — scaffold-fix-audit

Subject: `@orkestrel/scaffold@0.0.65` at `23eca02`, the fix chain `a371cea..23eca02`. Brief:
`scaffold-fix-audit-brief.md` with `scaffold-fix-audit-addendum.md` and
`scaffold-fix-audit-dispatch-note.md`. Lanes: `reviewer` on Opus 5 (native, subjective) and
`analyst` on GPT-5.6 Sol (`codex exec`, thread `01a09938-6c28-78e2-97df-91f3b80db63a`, objective).
Both opened one identical brief file, blind, in parallel. Lane reports retained verbatim under
`lanes/`.

The brief carried fourteen numbered claims under an Output line asking for fifteen; the dispatch
note records that defect and its custody ruling. The subjective lane ruled a claim 15 on the subject
the brief stated in prose; the objective lane declined to invent one. Both readings were correct.

## Reproduced before ruling

Every sharp finding was run by the Orchestrator on this host before it entered a carrier.

| finding | reproduction | result |
| --- | --- | --- |
| claim 8, stuck-`false` predicate undetectable | body replaced with `return false`, both `mapped loopback` cases run | `2 passed` — **confirmed BROKEN**; restored, `git diff --exit-code` clean |
| claim 7, real `ollama` reachable from the script | read `executeOllamaSetup`; `command -v ollama` | clears `CI` and `CLAUDE_CODE_REMOTE`, leaves `PATH`; `/usr/local/bin/ollama` resolves — **confirmed BROKEN** |
| claim 12, transitive range excludes early Node 24 | lock walk from each generated devDependency; semver | `@orkestrel/probe → queue → database → sqlite@0.0.11`, engines `^22.18.0 \|\| >=24.4.0`; `24.0.0` false, `24.4.0` true — **confirmed, bounded**: no `engine-strict`, so a warning, not a refusal |
| Sol F1, README floor | `sed -n 12p README.md` | "Node 22.12 or later" — **confirmed**; ships in the tarball |
| Sol F2, lock root engines | `packages[""].engines.node` | `>=22.12.0` — **confirmed** |
| claim 13, pre-flight evidence | re-run under the corrected instrument, per-target status captured | both targets `repair` 0, `audit` 0 nothing drifted, every gate 0 — **settled** (`evidence/linux-gate/preflight-*.status.txt`, `preflight-2.log.txt`) |
| claim 15a, "11.0.0 through 11.5.0 never run" | each version's own install log re-read | every one of `11.0.0`–`11.5.0` crashed — the range **was** measured; the defect was retention, now `evidence/linux-gate/npm-boundary-readings.log.txt` |

## Reconciled rulings

| claim | subjective | objective | reconciled |
| --- | --- | --- | --- |
| 1 | CONFIRMED | BROKEN | **brief defect**: the claim said `engines.node` is exactly `>=22.18.0`; a blueprint with an explicit `engines` emits that value, correctly. Split: the emit equals `blueprint.engines`, and the default is `>=22.18.0`. Subject correct; no carrier. |
| 2 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 3 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 4 | CONFIRMED, bounded | CONFIRMED | **CONFIRMED**; the depth instrument is `path-prepend.log.txt` with its negative control, now retained |
| 5 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 6 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 7 | CONFIRMED with a referral | BROKEN | **BROKEN** — Sol right on the mechanism the reviewer referred. Carrier: fix item B. |
| 8 | BROKEN | CONFIRMED | **BROKEN** — reviewer right on falsifiability; Sol right that the instrument is independent. Take both: keep the instrument, assert the reason. Carrier: fix item A. |
| 9 | CONFIRMED, mechanical only | CONFIRMED | **CONFIRMED** on its rows; prose ruled under 15 |
| 10 | CONFIRMED | CONFIRMED | **CONFIRMED** |
| 11 | CONFIRMED, bounded | CONFIRMED | **CONFIRMED**; Sol's in-memory reconstruction matched `host.json` byte for byte with a mutated control |
| 12 | CONFIRMED | BROKEN | **bounded**: a transitive `engines` warning on Node `24.0.0`–`24.3.x`, from a fleet package, not a refusal. Carrier: fix item H (a ROADMAP row); the guide states only the verified floor. |
| 13 | UNRESOLVED | CONFIRMED | **CONFIRMED** on the re-run's captured evidence; the reviewer was right that the first record was prose |
| 14 | BROKEN | BROKEN | **BROKEN** — the Orchestrator's brief placed an installing case in the `setup` project. Carrier: fix item C. |
| 15 | BROKEN | not ruled | **15a dropped** on retained evidence; **15b and 15c BROKEN**. Carrier: fix item H. |

Findings outside the claims, each with one carrier: reviewer F1 guide → item F; F2 `TestNpmInterface`
→ item D; F3 `host` → item D; F4 `resolveNpm` → item D; F5 `DEFAULT_DEV_ENGINES` → item E; F6
module-scope reading → item C; F7 `supports*` split → item H (successor row); F8 `target: 'node22'`
→ item H. Sol F1 README → item G; Sol F2 lock → landed by the Orchestrator in the baseline commit,
by hand, because npm `10.9.7`'s regeneration strips the `libc` selectors a newer npm wrote.

## Which engine was right, on what

Sol on the `PATH` hazard, the README, the lock, and the transitive range — the constraint half. The
reviewer on falsifiability, placement, naming, the guide gap, and prose — the shape half. Neither
verdict was usable alone; the fix carries both.

## Bounds

Not broken: the emitted manifest and its fixed point; the contract shape; the release proof and its
provisioning; the mapped-address gate; `host.json`; the Node 22 line end to end; the targets'
readiness against the staged tarball. Every finding is in test infrastructure, documentation, or a
name — none in the bytes `dist/src`, `dist/bin` publish. `guides/scaffold.md` and `README.md` do
ship, and item F and item G are why the upload waits for this round.

VERDICT: FAIL 7, 8, 14, 15; outside the claims: F1, F2, F3, F4, F5, F6, F7, F8, Sol-F1, Sol-F2

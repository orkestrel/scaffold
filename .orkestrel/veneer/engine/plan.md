# J-ENGINE — the engine session's plan

The executable plan of record is Veneer's `ROADMAP.md` (§ Protocol › § The engine session, the J-ENGINE row of § Phases and units, and the carrier rows this session appends), read in the session's integration checkout `C:/Users/mikes/WebstormProjects/veneer` on `main` of `https://github.com/mikesaintsg/veneer` (E4: the session works on `main` in both repositories, with no session branch), pushed at every gated landing (D43). This folder holds only what the open units read; git history archives every closed round, and each prune commit's message is the promotion record.

## What the folder holds

- `decisions.md`: the session's rulings `E1` onward (D44).
- `units/j-engine-terrain-record.md`: the terrain record every brief points at — host, benches, the platform readings, and the reads it indexes. Its instruments sit beside it (`j-engine-terrain-platform.test.ts`, `j-engine-terrain-platform.config.ts`, the run log, the bench probe logs).
- `units/j-engine-terrain-brief.md` and `units/j-engine-terrain-distillate.md`: the Grok absorption of Elements and Mailbox. `units/j-engine-orkestrel-2-brief.md` and `units/j-engine-orkestrel-2-map.md`: the installed candidate map.
- `units/j-engine-design-brief.md`, the two lane proposals (`units/j-engine-design-planner-proposal.md`, `units/j-engine-design-objective-proposal.md`), and `j-engine-design-verdict.md` at this folder's root: the design round, whose § Units and routing is the unit table every brief derives from and whose § Exit criterion ends the campaign.
- `units/unit-worktree.sh`: the unit worktree instrument (E4): `new`, `commit`, `land`, `drop`.
- `units/<unit>-brief.md` and `units/<unit>-report.md` per writing unit (`j-types`, `j-seed`, then `j-binder`, `j-collapse`, and the W2 to W5 units the verdict names), with each unit's audit claims, lane briefs, verdicts, diffs, and status files beside them while the unit is live.
- A live unit's brief, report, audit claims, lane briefs, verdicts, launchers, diffs, and status files sit under `units/` by unit prefix until the unit lands on Veneer `main`, and the prune commit that follows removes them.

## Intersession state

**Marker.** Veneer `origin/main` `a658879` (the baseline's disclosure landing: `1945ba5` the roadmap fold and `a658879` its merge of this session's `376d84a`), scaffold `origin/main` `3ad6cfa9`, read 2026-09-23 at J-SEED's landing; this session's Veneer `main` is at `97ac9ab` (J-SEED), pushed after the gate chain reads green. Previous marker: Veneer `e4e6a40`, scaffold `c9309885`, read after the design round's launch. The baseline's marker at that reading (its `plan.md` at scaffold `cd50fcb5`): Veneer `e4e6a40`, scaffold `e5d9ab6`; its landings since the session's start are `746d3e9` (the gap utilities through the utility mixins) and `e4e6a40` (the UTIL-SPACER fold into the roadmap and the guide's gap-steps sentence), touching `src/styles/**`, `tests/src/styles/**`, `tests/setupStyles.ts`, `ROADMAP.md`, `guides/veneer.md` outside the engine sections, and `prompt.txt`, and no engine-owned file. Its units in flight: NAV round 2, DROPDOWN round 2, COLLAPSE round 2, UTIL-SPACER round 2, CONDITIONS (landed `8ca1609`), ALERT, CAROUSEL, each returning report-only patches over `tests/setup.ts`, `tests/setupStyles.ts`, `tests/conformance.test.ts`, the showcase, and the guide. Its pending shared changes: `tests/setup.ts` registry rows appended per landing; `guides/veneer.md` gains a `plugin` row with `Owner: J-ENGINE.` for Collapse, Dropdown, Tab, ScrollSpy, Alert, and Carousel as those families land, later Modal, Offcanvas, Tooltip, Popover, and Toast. Its decisions read through D44. This session's own landing on Veneer `main` since the marker: `376d84a`, the removal of `prompt.txt` (E4).

**In flight (this session).** J-TYPES (`opus`, worktree `veneer-types` on `unit/types` from `376d84a`; owns `src/browser/types.ts` and the guide's § Surface rows and § Methods tables of the added contracts), writing. J-SEED (`opus`, worktree `veneer-seed` on `unit/seed` from `376d84a`; owns `src/browser/ColorMode.ts`, its test, and the guide's § Surface post-destroy sentence) returned (`units/j-seed-report.md`, `j-seed.diff`, `j-seed-status.txt`) and is in its audit round 1 on `units/j-seed-audit-claims.md`: `analyst` on Astra (thread `01a0cf16-e8cf-7150-a72b-6b00bc4c474b`, journal `tmp/codex/j-seed-audit.jsonl`, launched through `units/launch-codex.ps1`), `reviewer` on Opus 5.5 (native), and `checker` on Sonnet, blind; its landing message is `units/j-seed-landing-message.txt`. The design round is closed: `j-engine-design-verdict.md` at this folder's root, with both proposals under `units/`. The `veneer-engine` worktree and the `claude/j-engine` branches are gone (E4).

**Cascade availability (read at Veneer `a658879`, the baseline's disclosure landing, 2026-09-23).** Landed: `collapse`, `dropdown`, `nav` (`src/styles/components/_collapse.scss`, `_dropdown.scss`, `_nav.scss`, with their guide sections, registry rows in `tests/setup.ts`, and conformance rows). Still absent: `navbar`, `accordion`, `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, `carousel`, `transition`. An engine unit whose key has landed adds the shipped-cascade reading beside its test-local stylesheet; a unit whose key is absent proves motion against the test-local stylesheet alone; each `plugin` row's flip to `shipped` waits for its cascade (D43). Re-read this line at every boundary and report each key's arrival to the user.

**Pending shared changes.** None recorded. A change to `tests/setup.ts`, `tests/setupBrowser.ts`, the `package.json` exports map, or `README.md` is recorded here before the landing that applies it.

## Routing ledger

| Lane | Role | Engine | Transport | Liveness |
| --- | --- | --- | --- | --- |
| Creative design | `planner` | Opus 5.5 (the alias's served model recorded per lane) | native subagent | native |
| Design-fit review | `reviewer` | Opus 5.5 | native subagent | native |
| Objective design and audit | `analyst` | GPT-6 Astra (`gpt-6-astra`) | `codex exec` from a file brief, read-only, `-C C:/Users/mikes/WebstormProjects --skip-git-repo-check` | `READY` 2026-09-23 15:32 UTC, thread `01a0cee5-83f9-7fe2-aa97-6c31ea69355d` |
| Implementation | `opus` | Opus 5.5 | native subagent in a unit worktree | native |
| Absorption, distillation | `grok` | Grok 4.7 (`grok-4.7-high`) | versioned Cursor entry, `-p --trust --mode=ask`, detached through `tmp/cursor/<unit>.ps1` | `READY` 2026-09-23 15:32 UTC, session `3e59bf7c-1fc4-4fb7-b9fa-69b306b2e778` |
| Mechanical unit, gates, conformance, package map | `builder`, `verifier`, `checker`, `orkestrel` | Sonnet | native subagent | native |

## Landing procedure

Per D43 and ROADMAP § Protocol › § The engine session: a unit lands from its worktree onto `claude/j-engine` by cherry-pick; before every landing, `git fetch origin main` in Veneer and scaffold, read `git log --oneline <marker>..origin/main` in both, read the baseline's `plan.md` § Intersession state and `units/decisions-round-2.md`, move the marker; merge `origin/main` into `claude/j-engine` (a merge commit), run the gate chain on the merge result through one independent `verifier` (`npm run format:check`, `lint:check`, `check`, `build`, `test`, `test:service`), push `claude/j-engine`, fast-forward `main`; a non-fast-forward push means the baseline landed first, so merge again, re-run, push again. A conflict in `guides/veneer.md` or `ROADMAP.md` resolves in favour of the owning session. A records commit in scaffold pushes `claude/j-engine`, then fetches and merges `origin/main` and fast-forwards scaffold `main`.

## Exit criterion

The kickoff brief's § Acceptance criteria, items 1 to 6, on evidence; the design verdict enumerates the capabilities whose closure ends the campaign.

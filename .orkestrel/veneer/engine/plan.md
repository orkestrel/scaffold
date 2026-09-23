# J-ENGINE — the engine session's plan

The executable plan of record is Veneer's `ROADMAP.md` (§ Protocol › § The engine session, the J-ENGINE row of § Phases and units, and the carrier rows this session appends), read in the session's integration worktree `C:/Users/mikes/WebstormProjects/veneer-engine` on branch `claude/j-engine` of `https://github.com/mikesaintsg/veneer`, pushed to `main` at every gated landing (D43). This folder holds only what the open units read; git history archives every closed round, and each prune commit's message is the promotion record.

## What the folder holds

- `decisions.md`: the session's rulings `E1` onward (D44).
- `units/j-engine-terrain-record.md`: the terrain record every brief points at — host, benches, the platform readings, and the reads it indexes. Its instruments sit beside it (`j-engine-terrain-platform.test.ts`, `j-engine-terrain-platform.config.ts`, the run log, the bench probe logs).
- `units/j-engine-terrain-brief.md` and `units/j-engine-terrain-distillate.md`: the Grok absorption of Elements and Mailbox. `units/j-engine-orkestrel-2-brief.md` and `units/j-engine-orkestrel-2-map.md`: the installed candidate map.
- `units/j-engine-design-brief.md`, the two lane proposals, and `j-engine-design-verdict.md` at this folder's root: the design round (written when the round runs).
- A live unit's brief, report, audit claims, lane briefs, verdicts, launchers, diffs, and status files sit under `units/` by unit prefix until the unit lands on Veneer `main`, and the prune commit that follows removes them.

## Intersession state

**Marker.** Veneer `origin/main` `746d3e9`, scaffold `origin/main` `e5d9ab69`, read 2026-09-23 (the session's start). The baseline's marker at that reading: Veneer `54db757`, scaffold `c622cb4`; its landing since then is `746d3e9` (the gap utilities through the utility mixins), touching `src/styles/**`, `tests/src/styles/**`, `tests/setupStyles.ts`, and no engine-owned or shared file. Its units in flight: NAV round 2, DROPDOWN round 2, COLLAPSE round 2, UTIL-SPACER round 2, CONDITIONS (landed `8ca1609`), ALERT, CAROUSEL, each returning report-only patches over `tests/setup.ts`, `tests/setupStyles.ts`, `tests/conformance.test.ts`, the showcase, and the guide. Its pending shared changes: `tests/setup.ts` registry rows appended per landing; `guides/veneer.md` gains a `plugin` row with `Owner: J-ENGINE.` for Collapse, Dropdown, Tab, ScrollSpy, Alert, and Carousel as those families land, later Modal, Offcanvas, Tooltip, Popover, and Toast. Its decisions read through D44.

**In flight (this session).** J-ENGINE-TERRAIN (`grok`, read-only, over Elements and Mailbox) and J-ENGINE-ORKESTREL-2 (`orkestrel`, read-only). No writing unit is dispatched; no Veneer file is owned by a live unit.

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

# Unit E-ID-ANCHOR round 4 — the dropdown's Chromium 141 exception names the press before the show

Successor to `e-id-anchor-brief-3.md`, which stays in place unedited. What changed: round 3 was checked in
`anchor-audit-3-verdict.md` (FAIL 2). The Orchestrator's round-3 wording said a pointer press "opened the menu"; in the
probe the engine shows the menu after a trusted pointer press on the toggle, and that press-before-show is the
condition. Round 3 is committed on `unit/anchor` as `ebce3fe`; this round writes over it. Every Item is exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-anchor` (branch `unit/anchor` at
`ebce3fe`). Start every shell command with `cd /home/user/veneer-anchor &&` and give every file tool an absolute path
under it. Read `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/writing.md`. No skill applies.
Perform the assignment directly and spawn nothing. No git command that writes, no install, no `npm run format`; format
with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. Write logs and backups under `tmp/units/r4/`.

## Scope

**Owned.** The three texts the Items name. **Off-limits.** Every other line and path.

## Items

1. In `src/styles/components/_dropdown.scss`, in the comment above `@include anchor-visibility(dropdown-menu);`, replace
   "except Chromium 141 when a pointer press on the toggle opened the menu" with "except Chromium 141 when the engine
   showed the menu after a trusted pointer press on its toggle", and re-wrap the comment at 100 columns without
   changing another word.
2. In `guides/veneer.md`, in the Dropdown classes paragraph, replace "except Chromium 141 when a pointer press on the
   toggle opened the menu" with "except Chromium 141 when the engine showed the menu after a trusted pointer press on
   its toggle", and re-wrap the paragraph at 100 columns without changing another word.
3. In `guides/veneer.md` § Tokens › § Additions, replace the Reason cell of both `dropdown` rows with "The open menu
   computes `anchors-visible` on Chromium 141 and 153. Neither paints it while a scroll container clips its toggle
   entirely, except Chromium 141 when shown after a trusted pointer press on the toggle, unanchored." Run oxfmt on the
   guide; each changed row must keep the length of the unchanged rows beside it.

## Execution

Re-take the three current texts and stop if any differs from the quoted text. Apply the Items. Run
`npm run format:check`, `npm run lint:check`, `npm run test:guides`, and `npm run test:policy`, each logged to
`tmp/units/r4/anchor-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` appended.

## Output

Write `tmp/units/r4/anchor-report-4.md` and return the same text: each Item's before and after, the row lengths of the
two changed rows and of an unchanged row beside them, the gate table, `tmp/units/r4/anchor-4.diff` (`git diff ebce3fe`),
and `tmp/units/r4/anchor-4-status.txt`.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when a quoted text
differs, when a changed row's length differs from its neighbours, or when a gate reads red. Settle nothing yourself.

## Acceptance criteria

1. Each Item is applied verbatim, and nothing else changes.
2. The four gates exit 0.

## Review evidence

The diff and the gate logs. `analyst` on GPT-6 Astra rules the three texts against the probe and the diagnosis.

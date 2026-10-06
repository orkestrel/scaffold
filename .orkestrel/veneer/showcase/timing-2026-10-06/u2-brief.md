# Unit task75-U2 — name the preservation stray (probe; lands nothing)

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI, in the scratch worktree `/home/user/.wave/veneer-u2` (veneer at `90b96bb`, `node_modules` installed, `dist` built by the Orchestrator). You are its sole writer. Edit only `tests/app/browser/integration.test.ts` in that worktree; the edit is a probe and lands nowhere: commit nothing, push nothing, touch no other file.

## Objective

Name the three extra elements that make the preservation case's tooltip row read `excluded` 10766 at 390 px instead of 10763, and rule which branch unit U3 takes. Context: the task 75 design verdict (`/home/user/scaffold/tmp/claude/task75-design-verdict-draft.md` § Rulings 3 and § Units U2, amended by the Astra check `/home/user/scaffold/tmp/codex/task75-check-last.md` § 2 and § 7 U2: read both sections first). Across nine full runs, every 1280 px tooltip row reads 10763 and 15 of 18 rows at 390 px read 10766; the J-B2 pair is split (light 10763, dark 10766). `buildJourney` mounts a fresh showcase (`tests/setupBrowser.ts:1417-1424`, `:1398-1404`, `:1494-1500`; `src/browser/Tip.ts:279`, `:289`), so the prior state's panel is not the source; the mount, theme, boot, arrange, and act steps of the same iteration are all candidates.

## Context

- The case: `tests/app/browser/integration.test.ts:1225` `attributes every component departure of the tailwindcss face to a declared cause other than preflight at $width px`; themes loop `:1232`, states `:1233-1241`, `buildJourney(reading, true)` `:1248`, scenario pick `:1249-1261`, arrange, act, assert `:1265-1267`, panel binding `:1278-1297`, `collected = collectComponentSignatures(document.body, …)` `:1317`, `signatures` `:1323-1334`, `excluded = collected − signatures` `:1335-1337`, summary `:1442-1464`. Re-locate every line by its text before editing.
- Engine tip panels append to `document.body` (`src/browser/Tip.ts:203`); `app/browser` sets no container. Static tooltip and popover specimens sit inside `main` (`app/browser/sections/tooltips.html:57`, `:67`, `:76`, `:84`, `:112`; `popovers.html:50`, `:76`, `:99`, `:121`, `:146`). The tip exposes `panel` (`Tip.ts:141-143`) and `phase` (`:127-135`); `phase` can read `hidden` while the panel stays connected (`:312-320`).
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u2-NAME --kind command --cwd /home/user/.wave/veneer-u2 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --project 'journey:dark-390*' -t 'attributes every component departure'`; a fresh NAME per run (a reused folder exits 65); the command's stdout lands in `FOLDER/stdout.log`; another lane may hold the lock for minutes. Never `cd`; absolute paths; no scripts in bash, PowerShell, or Python.

## Scope

- **Change (the probe).** In the preservation case, add `console.info` entries, each a JSON object carrying `width`, `theme`, `state`, and a `point` field naming the moment, at four points: after `buildJourney` returns (`point: 'built'`), after `arrange` (`'arranged'`), after `act` and `assert` (`'acted'`), and immediately before the `collected` count (`'counting'`). Each entry carries `strays`: every direct child of `document.body` whose class list has the tooltip or popover base class (read the names from `CLASS_NAMES` in `tests/setupBrowser.ts`; never hard-code them) other than the bound `panel`, with for each: `id`, `classes`, the trigger whose `aria-describedby` or `aria-controls` names it (its `id`, tag, and text, or none), that tip's `phase` through the engine (the `Tip` instance reachable from the showcase's veneer; if unreachable, say so and record the class list only), whether the trigger matches `:hover`, and whether it is `document.activeElement`. Each entry also carries `outside`: the class lists of the collected elements that lie outside `main` and outside the population (at the `counting` point only). Name the entry `Preservation stray probe`.
- **Runs.** Run the dark-390 project filtered to the case as the Host rule states, until a tooltip row at 390 px reads `excluded` 10766 or three consecutive runs read 10763 at both themes; record every run's folder and its four tooltip-state probe entries at 390 px (light and dark).
- **Off-limits.** Every other file; the landing checkouts `/home/user/veneer` and `/home/user/.wave/veneer-containment`; commits.

## Acceptance criteria

1. Every run names its folder and prints the `Component preservation` tooltip rows at 390 px for both themes with their `excluded` values.
2. For a run that reads 10766, the probe names the stray elements (id, classes, trigger, phase, hover, focus) at each of the four points, so the report states at which point the stray appears and what holds it.
3. The report rules the U3 branch from the evidence: a hover holder (`:hover` true on the trigger) means U3 parks the pointer and then waits; a tip panel with no hover holder means U3 waits only; a stray that is not a tip panel means stop, with its classes, for the Orchestrator.
4. When three consecutive runs read 10763 at both themes, the report says so with the folders and the probe entries, and rules nothing.

## Output

Final message: the run table (folder, 390 px tooltip `excluded` light and dark, wall time from `end.json`), the probe entries of the decisive run verbatim (the four points at 390 px for the theme that read 10766), the ruling for U3 with its evidence, `git -C /home/user/.wave/veneer-u2 status --porcelain` and `git diff --stat`, and every deviation in the expected, found, evidence, done or not, one hypothesis form. No process diary.

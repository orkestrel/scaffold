# Unit S1: component statecharts for the veneer showcase

## Role and engine

GPT-6 Astra implementation lane through `codex exec`, sandbox `danger-full-access` on the Linux cloud host (the journeys need Chromium, a loopback server, and grandchild processes). Perform the work yourself and spawn nothing.

## Objective

Prove every live component on the showcase page as a statechart driven through its own controls, the way a person drives it, so each announced state, each door between states, and each door that leaves a state unchanged has a row that fails when the component breaks.

## Context

- **Checkout.** `/home/user/.wave/veneer-wt-sc`, a git worktree of veneer on the branch `sc/statecharts` at `a443edf`, clean, with its own `node_modules`. You are its only writer. Before every `npm` or `node` command, run `export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true`. Run vite and vitest through `./node_modules/.bin/`. Run `npm run build` before any journey, because the page reads `dist/src/bootstrap/index.css`.
- **A second lane runs beside you** in `/home/user/veneer` and also starts Chromium. Wrap every journey run, scoped or full, in `flock /home/user/.wave/journey.lock`, for example `flock /home/user/.wave/journey.lock ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project journey:light-390 -t PATTERN`. Never run a journey outside the lock, and keep each locked run scoped while you iterate.
- **Evidence.** `/home/user/.wave/cursor/g2-result.md` is a cited read-only map at `42685f7`: the live families with their controls and targets (§ 1), each family's states, doors, events, and refusals (§ 2), what J8 proves (§ 3), a review of the partial patch (§ 4), and an order (§ 5). The journey files changed after it (unit J0b made each variant project prove its own variant); verify every citation you use. `/home/user/.wave/statecharts-partial.patch` is unverified scaffolding against `42685f7`; take from it only what G2 § 4 says to keep, and never apply it whole.
- **Canon.** `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/tests.md`, `names.md`, `writing.md`, `typescript.md`, and `/home/user/scaffold/.agents/skills/orkestrel-journey/SKILL.md` with every file under its `references/`; `statechart.md` and `layer.md` rule the tables, the phases, the harness, and which verbs a phase may call.
- **The engine belongs to another session.** Drive every component through the page's DOM contract (Bootstrap markup, `data-bs-*` attributes, ARIA states, and Bootstrap's events), never through `src/browser` internals, and boot the engine through the one path the page and J8 already use, so an engine API change reaches one place.
- **Known host failures, out of scope.** Three `tests/integration.test.ts` cases (near :324, :339, :595) and six `tests/src/browser` cases fail on Chromium 141; do not touch them.

## Do

1. **Tables.** In `tests/setupBrowser.ts`, one table per family, typed on the entity's own unions where the page or the engine exports them, never on a union invented only to type a table, built by one shared builder over one mount, with region-scoped verbs that take accessible names. Each table carries every door G2 § 2 lists for its family that the page offers, plus the row whose event leaves the state where it found it, plus every refusal row a specimen on the page can exercise (the static modal's Escape and backdrop, a click on the selected tab, the current carousel indicator, Escape on a hidden dropdown). Reach an unselected tab through the arrow keys from the selected one, because Bootstrap sets `tabindex="-1"` on it. Never pass a held element to a verb and never call the provider's pointer or keyboard from a phase.
2. **Run each table once** through the harness, which reports the whole table (`statechart.md` § Mount the harness), the way the header face and theme tables run after J0b, in `tests/app/browser/integration.test.ts`, under one `describe` for the component statecharts.
3. **Variants.** A table whose readings depend on neither theme nor viewport runs once, on the Bootstrap face; spread those tables across the four variant projects so the projects finish close together, using the per-test times of `/home/user/.wave/codex/j0b-last.md` (the 390 projects run longest, mostly J3), with one comment that says why. A row that depends on the viewport (the navbar togglers, the responsive offcanvas drawers, the scrollspy box) runs in every width it depends on, 1280 and 390.
4. **Order**, committing after each group is green in its scoped run: (a) button, then alert, remounting after a dismiss removes a node; (b) collapse, then accordion; (c) tab, pill, and list as one table over three specimens; (d) the section dropdowns; (e) tooltip, then popover; (f) toast, shown through its `aria-controls` button; (g) carousel; (h) the offcanvas edge panels, then the modals, including `#modal-live-static` and the live dialog that nests the menu and the hint; (i) the navbar togglers and the responsive drawers; (j) the scrollspy, by scrolling `#engine-demo`.
5. **Prove each table red first.** For each group, break one door in the table's expectation, read the failure, and restore; quote the failing excerpt in the report.
6. **Gates** after the last group, each read bare with its exit code: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:app:browser`, `npm run test:setup:browser`, `flock /home/user/.wave/journey.lock npm run test:journey` (all four variants green, with the per-project wall times), and `npm run test:policy`.
7. **Commits** in the repository's message style with the trailers `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV` on their own lines. Never push. No installs after the worktree's `npm ci`, no network, no edits outside `tests/app/browser/`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts`.

## Output

Your final message is the report: one row per family with its states, doors, refusal rows, variant, and the red-first excerpt; each gate with its exit code and counts; the per-project journey wall times before and after; the commit hashes; and any deviation (expected, found, evidence), including every door G2 lists that the page cannot drive.

## Deviation contract

When a gate fails, find the cause and fix it inside the owned files. Stop and report when a door needs a page change in `app/browser/`, when a component departs from Bootstrap's documented behaviour (that is an engine finding for the other session; record it with the evidence and leave the row out), or when the sandbox refuses an action. Never work around a refusal with another write mechanism.

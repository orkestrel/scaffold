# Unit R1: close the open rigor findings of the veneer showcase journeys

## Role and engine

GPT-6 Astra implementation lane through `codex exec`, sandbox `danger-full-access` on the Linux cloud host (the journeys need Chromium, a loopback server, and grandchild processes). Perform the work yourself and spawn nothing.

## Objective

Make five showcase claims provable in both directions: each reading the journeys take can fail when the page or the recipe breaks, and each number a caption states is bound to a reading.

## Context

- **Checkout.** `/home/user/veneer`, branch `ccr-d15a48b1-yyyll6` at `a443edf`, clean. You are its only writer. Before every `npm` or `node` command, run `export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true`. Run vite and vitest through `./node_modules/.bin/`. Run `npm run build` before any journey, because the page reads `dist/src/bootstrap/index.css`.
- **A second lane runs beside you** in another checkout and also starts Chromium. Wrap every journey run, scoped or full, in `flock /home/user/.wave/journey.lock`, for example `flock /home/user/.wave/journey.lock ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project journey:light-390 -t PATTERN`. Never run a journey outside the lock.
- **Evidence.** `/home/user/.wave/cursor/g1-result.md` is a cited read-only map of all five findings at `42685f7`; verify each citation you use against the tree, because the journey files changed after it (unit J0b made each variant project prove its own variant). Read `tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts` whole before editing.
- **Canon.** `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/tests.md`, `names.md`, `writing.md`, `typescript.md`, and `/home/user/scaffold/.agents/skills/orkestrel-journey/SKILL.md` with its `references/`.
- **Known host failures, out of scope.** Three `tests/integration.test.ts` cases (near :324, :339, :595) and six `tests/src/browser` cases fail on Chromium 141; do not touch them.

## Do

1. **Pin the face-invariance population.** Replace the check that only two image blocks are present with an equality: the ids `collectBootstrapGroups` returns equal the expansion of `GROUPS` without the `tailwindcss` group, each group as `group-ID` followed by its `SECTIONS` ids in order (`app/browser/constants.ts`). Prove it red first: drop one section from the expected expansion, read the failure, restore.
2. **Derive the pseudo list.** `collectPseudos` derives its candidate pseudos from `collectPreflightPseudos` (`tests/setupStyles.ts`) over the preflight text the tree already reads, keeps a candidate only when the mounted element generates it, and keeps `::marker` for a `list-item`, which preflight never yields. Measure in Chromium that `::-webkit-search-decoration` is readable on the page's two search fields (`app/browser/sections/navbar.html`, `input-group.html`) before relying on it; if it is not, report the reading and keep the candidate out with a one-line comment. Extend the proof in `tests/setupBrowser.test.ts` with a search field and assert the candidate list against `collectPreflightPseudos`.
3. **Make the unexcluded-compile control cover every reading.** Give every `TAILWIND_READINGS` row the value it reads under the unexcluded compile (the recipe without the Veneer import, the field the journeys already adopt), per variant width where it differs, as G1's table measured: `.collapse` `visibility` moves to `collapse`, `.container` `max-width` moves to `1280px` at 1280 and stays `none` at 390, `img` `display` moves to `block`, `ul` `list-style-type` moves to `none`; the others hold. Measure every value in Chromium before you pin it; G1 read them from records. The control reads every row under the unexcluded compile and asserts the pinned values, so a row whose exclusion or mirror is lost reddens. Keep the `.mt-3` and `.gap-4` rows as readings of their caption numbers, and state in the `tailwindcss.html` caption that Bootstrap's spacing utilities hold through their own `!important`, not through the exclusion.
4. **Assert the face and theme pairs.** Add the cross-product to the statechart: every pair of face and theme is reached through the header buttons and reads both axes (pressed buttons, the status sentence, the padding witness, the body background), in the variant the existing face and theme tables run in.
5. **Bind or drop every caption number** in `app/browser/sections/tailwindcss.html`. G1 § 5 lists the unchecked ones (the Tailwind-alone `12 px` and `16 px`, the three figures and columns, the three stacked blocks, `48 px`, `1 px` and `8 px`). Bind each to a reading the journeys take, or rewrite the caption without the number; keep the page simple and calm, one concept per caption. Rebuild the page with `npm run build:showcase` and commit `showcase/browser.html`.
6. **Gates**, each read bare with its exit code: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:app:browser`, `npm run test:setup:browser`, `flock /home/user/.wave/journey.lock npm run test:journey` (all four variants green), `flock /home/user/.wave/journey.lock env CAPTURE=1 npm run test:journey` (list the capture file set; it equals the set before your change unless a caption change renames none), and `npm run test:policy`.
7. **Commit** as one unit in the repository's message style with the trailers `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV` on their own lines. Never push. No installs, no network, no edits outside `tests/app/browser/`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `app/browser/sections/tailwindcss.html`, and `showcase/browser.html`.

## Output

Your final message is the report: each finding with the change, the red-first evidence (command, failing excerpt, then green), and where the claim is proved; every measured value you pinned; each gate with its exit code and counts; the commit hash; and any deviation (expected, found, evidence).

## Deviation contract

When a gate fails, find the cause and fix it inside the owned files. Stop and report when the fix needs a file outside them, when a measured value contradicts G1 in a way that changes a claim, or when the sandbox refuses an action. Never work around a refusal with another write mechanism.

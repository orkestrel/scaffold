# Unit scaffold-defects — the scaffold defects found in the veneer campaign of 2026-10-03

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. You are the sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-defects`, on the branch `scaffold-defects` from scaffold `main`. Commit once on that branch at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Law

`AGENTS.md` at the worktree root and the rules it maps; for skill scripts, `.claude/rules/documentation.md` § Workflow skills (a script obeys the TypeScript, names, and portability rules, has a mirrored proof under `tests/agents/skills/<skill>/scripts/`, and its `SKILL.md` names its arguments and exit codes) and `.claude/rules/portability.md`. Types first where a public type changes; no `any`, `as`, `!`, suppression, or nested function.

## Defects

Repair each with a regression that fails before the repair and passes after; record both commands and counts.

1. **S1, discovery's listing.** `.agents/skills/orkestrel-harden/scripts/discovery.ts` runs `vitest list --config <config> --json` and parses stdout from its first `[` (`discovery.ts:95-100`). Vite's dependency optimizer prints `[vite] (client) [optimizer] ...` on stdout before the JSON, so the parse throws `SyntaxError: Unexpected token 'v'` (measured on veneer on 2026-10-03). Write the listing to a file with Vitest's `--json=FILE` (as scaffold `a8dcfb8` did for the emitted-workspace proof) and read the file. Also pass each project named by `--projects` to the listing (`--project NAME` per project), so a scoped census lists only those projects and does not collect a project the caller excluded: collecting `distribution` runs its module's staging code (see S6). Keep the script's arguments, output, and exit codes as `SKILL.md` names them, and extend its proof with a fixture whose stdout carries a bracketed log line before the JSON and a case that scopes the listing.
2. **S2, publishing from a linked worktree.** npm reads `gitHead` from `<git root>/.git/HEAD` as a file path and skips the field when `.git` is a file, which it is in a linked worktree (`@npmcli/package-json/lib/normalize.js:492-539`); scaffold 0.0.88 shipped without `gitHead` for that reason. Make `.agents/skills/orkestrel-publish/scripts/window.ts --publish DIR...` refuse, before any upload, a directory whose `.git` entry is a file, naming the primary clone the worktree belongs to (read from the file's `gitdir:` line) and exiting with the script's documented refusal code. Name the rule in the skill's `references/window.md` and its proof.
3. **S3, a resting cursor in browser tests.** A browser test that moves the real pointer through CDP (`Input.dispatchMouseEvent`) leaves the cursor resting over the page, and Chromium hovers whatever a later file renders under it: veneer's hovered-tip case paused the carousel cases that ran after it (`test:src:browser` failed 5 of 770 twice; veneer `959ed49` moves the cursor to `(-1, -1)` in the case's `finally`). Add the rule to `.claude/rules/tests.md` § Browser tests as one directive line.
4. **S4, the provider's CDP types in scoped checks.** `cdp()` from `vitest/browser` returns a `CDPSession` whose `send` exists only under `@vitest/browser-playwright`'s type augmentation. The root `tsconfig.json` sees it through `configs/browsers.ts`, but a scoped browser check that compiles `tests/setupBrowser.ts` (veneer's `check:app`) does not, so a setup helper calling `cdp().send` fails TS2339 there (veneer added `/// <reference types="@vitest/browser-playwright" />` to its harness). Decide the fix in scaffold's generated configuration or canon: give every generated scoped browser tsconfig the provider's types, or state the reference rule in `.claude/rules/tests.md`, whichever the generated workspaces can honor without a per-workspace edit; prove it with the generated-workspace tests.
5. **S5, packing on Windows.** A pack made on Windows records no executable bit: scaffold 0.0.88's Windows pack stored `dist/host/scripts/codex.sh`, `cursor.sh`, `deps.sh`, and `ollama.sh` as `644` where git tracks `100755`, while every size and hash matched the Linux pack. Scaffold writes `0o755` itself when it vendors an executable file (`src/server/helpers.ts`, `src/server/WriteTransaction.ts`), so a workspace gets the same files either way. State in `.agents/skills/orkestrel-publish/references/wave.md` or `window.md` where to pack and what the integrity comparison between hosts reads, in one or two directive lines; change no code unless a check can make the pack host-independent.
6. **S6, collection side effects in the distribution proof.** Collecting veneer's `distribution` project (a `vitest list` without the temporary-directory override) installed a packed consumer under the system temporary directory (`%TEMP%\distribution-*\consumer`), because the module stages its consumer at import time. Find whether scaffold's generated `tests/distribution.test.ts` (from `src/core/templates.ts` or `src/core/constants.ts`) does work at module scope; if it does, move the staging into the suite's setup so that collection performs no install, and prove that `vitest list` of a generated workspace's `distribution` project creates no directory. If the generated proof is clean and only veneer's authored proof stages at import, report that and change nothing here.

## Acceptance

After the last edit, in order, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test`, `npm run build`. Then `git diff --check`, one commit on `scaffold-defects`, and an empty `git status --porcelain`.

## Output

Write the report to `tmp/codex/scaffold-defects-report.md` in the worktree and return it as your final message: each defect with its repair or its finding, the red-before and green-after commands with counts, the acceptance table, the commit hash, and any deviation. No process diary.

## Deviation contract

On any conflict with this brief, the law, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.

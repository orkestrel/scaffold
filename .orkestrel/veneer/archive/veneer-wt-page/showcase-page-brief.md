# Unit showcase-page — the page's fixes from the showcase audit

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-page`, on the branch `showcase-page` from veneer `main` at `8707cb9`. Commit once on that branch at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Law and records

- The worktree's `AGENTS.md` and the rules it maps; `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\browser.md` and `styles.md` for the page.
- The ruling: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase-audit-verdict.md` § Carried, the `showcase-page` bullet and its bound. The two lane verdicts it cites, with the file and line of every finding: `C:\Users\mikes\WebstormProjects\veneer\tmp\codex\showcase-audit-verdict.md` and `C:\Users\mikes\WebstormProjects\veneer\tmp\units\showcase-subjective-verdict.md`.
- The page's design of record: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\proposal.json`, and its rulings in `showcase/status.md` § Rulings the showcase works under (one concept per matrix, readable captions, no raw dumps, every specimen interactive, a calm and professional page).
- Owned: `app/browser/**`, `tests/app/browser/factories.test.ts`, `tests/app/browser/constants.test.ts`, `tests/app/browser/Showcase.test.ts`, and the rebuilt `showcase/browser.html`. The journey and statechart code (`tests/setupBrowser.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/main.test.ts`) belongs to the next unit; edit it only where a markup change you make breaks an existing assertion, and name each such edit.

## Work

Implement every item of the `showcase-page` bullet. For each new specimen, give it a stable `id` and record the ids in the report, because the next unit writes rows against them: the disabled trigger per refusing family (alert, toast, modal, and offcanvas dismiss; offcanvas toggle; tab, pill, and list; dropdown) and the frozen dismissible alert. Keep the specimens' Bootstrap markup exact; a disabled trigger is disabled by the `.disabled` class and stays focusable (a link carries an `href` or `tabindex="0"`; a `button` uses the class, not the attribute). For `Showcase` (claim 9), record whether `#notify` created the toast and destroy only those it created; prove it in `Showcase.test.ts` against a toast the engine registered first.

## Acceptance

After the last edit, in order, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:app:browser`, `npm run test:setup:browser`, `npm run test:journey` (a statechart or journey row this unit's markup moves is a defect of this unit unless you name it and its cause in the report), `npm run test:guides`, `npm run test:policy`, then `npm run build:showcase` and `git diff --check`. One commit; an empty `git status --porcelain`. Read the dark and light captures of every section you changed after a `CAPTURE=1 npm run test:journey` run, and say in the report what each shows.

## Output

Write the report to `tmp/codex/showcase-page-report.md` and return it as your final message: per carried item, the change and its evidence; the new specimen ids; the gate table; the captures you read; the commit hash; any deviation. No process diary.

## Deviation contract

On any conflict with the verdict, the law, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.

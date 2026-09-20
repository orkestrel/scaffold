# U1-conform audit round 3 — numbered claims (both lanes and the checker)

Subject: the U1-conform working tree in `C:/Users/mikes/WebstormProjects/veneer` on `d8b0e65`
after brief 4 (`.orkestrel/veneer/units/u1-conform-brief-4.md`, report `units/u1-conform-report-4.md`),
on top of the round-2 tree that `u1-conform-audit-verdict-2.md` ruled on. Native Sonnet (`builder`)
wrote brief 4, so the `analyst` on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the
SUBJECTIVE lane; neither engine wrote the work. This file alone fixes the claim numbers. The
Orchestrator rendered the diff over `d8b0e65` including every untracked file at
`units/u1-conform-diff-3.patch.txt` and the status at `tmp/audit/u1-conform-status-3.txt`. Rule on
every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line`
or exact text); read the rendered diff and the live files, never the report alone. Rounds 1 and 2
confirmed everything outside the files brief 4 owns (`tests/setupConformance.ts`,
`tests/setupConformance.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`app/browser/Showcase.ts`); re-read other sites only where a claim names them. The five untracked
files (`app/browser/Showcase.ts`, `src/browser/ColorMode.ts`, `tests/app/browser/Showcase.test.ts`,
`tests/setupListeners.ts`, `tests/src/browser/ColorMode.test.ts`) are rendered with
`git diff --no-index` and carry no `index` blob line, so compare their hunks between rounds rather
than a blob pair. Law: scaffold's `AGENTS.md`, `.claude/rules/typescript.md`, `tests.md`,
`writing.md`, read from `C:/Users/mikes/WebstormProjects/scaffold`.

1. **The type import first.** `tests/setupConformance.ts` line 7 is
   `import type { ESTree } from 'vite'`, ahead of every value import, per `typescript.md`
   ("Place `import type` declarations before value imports"); `format:check` and `lint:check`
   are green with it there.
2. **Parentheses reach the visitor.** `extractSpecifiers` calls
   `parseSync('module.ts', text, { preserveParens: false })` (line 124) and its doc block says a
   parenthesized argument or callee reaches the visitor as the expression it wraps; executed
   against the live module with the installed parser: ``require((`bootstrap`))``,
   `require(("bootstrap"))`, ``import((`bootstrap`))``, and ``(require)(`bootstrap`)`` each extract
   `['bootstrap']`; ``require(`${name}`)``, `require(name)`, the comment case, and the string case
   extract nothing; `import {` throws; each of the four parenthesized forms is an assertion in
   `tests/setupConformance.test.ts`; report 4 records the red run (`1 failed, 83 passed`,
   `expected [] to deeply equal [ 'bootstrap' ]` at the first parenthesized form) before the option
   and the green run (`84 passed`) after.
3. **The thrown text names the sheets.** `collectLayer` in `tests/setupBrowser.ts` throws
   `The named sheets carry no Veneer cascade` and its `@throws` line says the same in the same
   words; the old text appears nowhere in that file; `tests/setupBrowser.test.ts` carries one
   `toThrow` on the new text and none on the old; the old text's remaining occurrences under
   `tests/` are `requireValue` messages in `tests/src/styles/index.test.ts`, `tokens.test.ts`, and
   `tests/setupBrowser.test.ts` line 212, each that file's own message and unchanged.
4. **One spelling.** `app/browser/Showcase.ts` carries no `behaviour`; line 45 reads `behavior`;
   nothing else in the file changed between the round-2 and round-3 renderings.
5. **Law over the diff.** Across the five owned files: no `any`, non-null assertion, type
   assertion, `@ts-` directive, `eslint-disable`, default export, or nested function; the added
   doc-block sentence sweeps clean under `writing.md`.
6. **Scope honesty.** `tmp/audit/u1-conform-status-3.txt` equals the round-2 status row for row;
   the blob pairs that differ from `units/u1-conform-diff-2.patch.txt` are exactly
   `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/setupBrowser.ts`, and
   `tests/setupBrowser.test.ts`, and among the untracked hunks only `app/browser/Showcase.ts`
   differs, by the one word.
7. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:distribution` green; `test:src`, `test:app`, `test:src:styles`, and
   `test:setup:browser` exit 0 on Edge; `scaffold audit` exits 0 with the `setup` question for
   `tests/setupListeners.ts` and the three advisory dependency lines alone.

# Absorption brief — D7.n terrain: every fleet package under the equality gate

## Role and engine

`grok` (Cursor Grok, bridge). Read-only. Return distilled evidence with `file:line` pointers, never raw dumps. Perform the assignment directly and spawn nothing; the driver carries the brief across unaltered and returns the journal path and session id with the distillate.

## The question

For every package checkout under `/home/user/fleet/` except `guide` (which is done), what does adopting the equality gate scaffold and guide now carry require? The gate: every `## Surface` and `## Methods` table heads `Summary` and each cell equals its doc block's description paragraph; each titled `@example` equals the guide fence under the heading of that title; the README's H1 blockquote equals the guide's H1 blockquote; `tests/guides.test.ts` carries the equality case, the population pin, and the README case in the shape `/home/user/fleet/guide/tests/guides.test.ts:94-127` and `:196-204` landed (read them first as the reference).

## Per package, report

1. The manifest rows in `guides/README.md` (`## By concept`): spec, source, tests.
2. For each spec: every table header row under `## Surface` and `## Methods` (verbatim, with line), and every `###` entity heading written as a backticked name with no table row for it.
3. The H1 blockquote of each spec (present or absent; its first line), and the README's H1 blockquote (present or absent; its first line). Whether the two are equal.
4. Whether any `@example` tag in `src/**` carries title text (`grep -rn "^\s*\*\s*@example[ \t]\+[^ \t]" src/`), and how many `### ` headings sit under `## Patterns` in each spec.
5. `tests/guides.test.ts`: which readers it imports and from where (`@orkestrel/guide` or `@src/*`), whether `findDrift` appears, whether a case reads `README.md`, and the file's line count.
6. `package.json`: `version`, the `@orkestrel/guide` and `@orkestrel/scaffold` ranges, whether a `docs` script exists, and whether `scripts/docs.ts` exists.
7. Whether the package's `src/**` doc blocks open verb-first (sample the first ten exported declarations' description paragraphs and report each opener word).

## Also report

- Whether `/home/user/scaffold/src/core/templates.ts` carries a `tests/guides.test.ts` template and whether it includes the equality case, the pin, or the README case (`grep -n "findDrift\|pairs at least one\|tagline" src/core/templates.ts`).
- The catalog layer of each package from `/home/user/scaffold/.claude/agents/orkestrel.md` (the `Layer` column).

## Output

One Markdown distillate: a table per item where rows compare, with `file:line` pointers; a closing section naming the packages whose tables already head `Summary` throughout, the packages with a non-`Summary` compared column, the packages whose README carries no blockquote, the packages with H3-documented classes lacking rows, and the packages with any titled `@example`. No process diary, no raw file dumps.

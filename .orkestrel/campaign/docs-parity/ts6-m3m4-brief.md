# Brief — ts6-m3m4 (the `tsc --pretty false` text shapes on 6.0.3 and 7.0.2)

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Scratch folder: `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m3m4/` (create it). Read `/home/user/scaffold/tmp/units/ts6-common-host.md` first and follow it.

## Objective

Record, verbatim and side by side for typescript 6.0.3 and 7.0.2, the stdout, stderr, and exit code of `tsc --noEmit --pretty false -p <project>` and of `tsc --showConfig -p <project>` for each case below, so a parser can be written that maps every line to an `Issue` (file, 1-based line and column, code, message, elaboration lines, related-information lines) or to a project-level fault, on either major.

## Setup

1. Obtain 7.0.2 without touching any checkout: `cd <scratch> && npm pack typescript@7.0.2 && tar xzf typescript-7.0.2.tgz` (the package folder is `package/`); its command is `node <scratch>/package/bin/tsc`. Record its `--version` output. 6.0.3 is `node /home/user/scaffold/node_modules/typescript/bin/tsc`; record its `--version` too.
2. Build one scratch project per case under `<scratch>/cases/<case>/` with its own `tsconfig.json` (`"compilerOptions": { "strict": true, "module": "nodenext", "moduleResolution": "nodenext", "target": "esnext", "types": [], "noEmit": true }`, `"include": ["src/**/*.ts"]` unless the case says otherwise) and a `package.json` with `"type": "module"`.

## Cases

- `plain`: `src/a.ts` = `export const n: number = 'x'`.
- `elaborated`: `src/a.ts` = an interface `Shape { size: { width: number } }` and `export const s: Shape = { size: { width: 'wide' } }` (a diagnostic with indented elaboration lines).
- `related`: a function `take(shape: Shape)` called with `{ size: { width: 'wide' } }` (a diagnostic followed by related-information lines naming another position).
- `nonbmp`: `src/a.ts` = one line `const 😀 = 1; export const n: number = 'x'` (does the reported column count UTF-16 units or code points; state which by counting).
- `crlf`: `src/a.ts` with `\r\n` line endings and the error on line 3.
- `twofiles`: errors in `src/a.ts` and `src/b.ts` (ordering and the path form printed: relative to the cwd, to the project, or absolute; run once with cwd = the case folder and once with cwd = `<scratch>`).
- `noinputs`: `tsconfig.json` with `"files": []` and `"include": []`.
- `malformed`: `tsconfig.json` containing `{ "compilerOptions": {` (truncated JSON).
- `unknownoption`: `"compilerOptions": { "bogus": true }`.
- `missingextends`: `"extends": "./absent.json"`.
- `missingproject`: `-p <scratch>/cases/absent/tsconfig.json`.
- `mixed`: `unknownoption`'s config plus `plain`'s source (does a config fault suppress the file diagnostic, and which comes first).

## Commands per case and major

`tsc --noEmit --pretty false -p <case>/tsconfig.json > out.txt 2> err.txt; echo "exit=$?"` and `tsc --showConfig -p <case>/tsconfig.json > cfg.txt 2> cfgerr.txt; echo "exit=$?"`. Keep every output file under `<scratch>/results/<major>/<case>/`.

## Output

`report.md` with: the two `--version` lines; one section per case showing, for 6.0.3 and 7.0.2, the exact stdout and stderr (fenced) and the exit code for both commands; a table `case × major → exit code, stream, first line's shape`; the answers to the nonbmp, crlf, and path-form questions with the count or path that proves each; the differences between the majors, listed; and `Unknowns`. Retain the case generator as `<scratch>/make-cases.sh` and the runner as `<scratch>/run.sh`, both written before you run them.

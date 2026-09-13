# Implementation brief — U-fix-5

## Role and engine

`builder`, native Claude subagent on Sonnet, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. This unit is fully specified: every
replacement is prescribed, and your judgment load is the wrap and the gates.

## Objective

Land the sentence-level bounds the U-fix-4 audit ruled (`.orkestrel/campaign/u-fix-4-audit-verdict.md`)
in the guide and the README, and the token forms across the ROADMAP rows the campaign edited.
Plus one deletion in the published doc block. Nothing else.

## Items

**A. `guides/scaffold.md`, the toolchain paragraph after the artifact list in § Generated
workspace.** Three replacements, each exact:

1. The sentence

   ```
   A generated workspace therefore meets an npm that ignores the record only where a developer
   installed such an npm in place of the bundled npm.
   ```

   becomes

   ```
   A generated workspace on Node 22.18.0 or later therefore meets an npm that ignores the record
   only under an npm other than the bundled one.
   ```

2. The sentence

   ```
   Run a generated workspace on npm 11.6.0 or later, because 11.6.0 is the first release that
   installs a generated workspace.
   ```

   becomes

   ```
   Run a generated workspace on npm 11.6.0 or later: every release from 10.9.0 up to 11.6.0 refuses
   it, and 11.6.0 installs it.
   ```

3. The sentence

   ```
   Raise it with the `npm install --global npm@11.6.0` command, or a later release, before the
   first install; that command installs an npm that reports 11.6.0.
   ```

   becomes

   ```
   Raise it with the `npm install --global npm@11.6.0` command before the first install; that
   command installs an npm that reports 11.6.0.
   ```

The line breaks inside each quoted sentence are wraps; match the text across them.

**B. `README.md` § Notes, the npm-floor paragraph.** One replacement: the sentence

```
Raise it with the `npm install --global npm@11.6.0` command, or a later release, before the first
install.
```

becomes

```
Raise it with the `npm install --global npm@11.6.0` command before the first install.
```

Do not write the phrase `Node <version> or later` anywhere in the file.

**C. `ROADMAP.md`, the scaffold rows under § The next conformance matrix's rows that the campaign
edited** — the crash row ("npm 10.9.7 and every npm from 11.0.0 through 11.5.0 crash …"), the
proof row ("the proof launches the npm the generated manifest names …"), the Node-floor row
("node floor 22.18.0 …"), the `&&` row, the `@types/node` row, the transitive-dependencies row,
the `supportsMappedLoopback` row, and the 0.0.65 successor row. In those rows only, apply the
token rule and the direction vocabulary exactly as follows, and change nothing else:

- `vitest` alone → "the `vitest` package alone".
- the `npm-boundary-readings.log.txt` path with no noun → "the
  `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt` file".
- "carries `devEngines.packageManager` at `>=11.6.0` with `onFail` error" → "carries the
  `devEngines.packageManager` record at the `>=11.6.0` range with the `onFail` key set to the
  `error` value".
- "`engines.npm` and `engine-strict` were measured" → "the `engines.npm` field and the
  `engine-strict` setting were measured".
- "An npm from 10.9.0 on reads" → "An npm at 10.9.0 or later reads".
- "beneath the floor" → "earlier than the floor" (line 448 and any other in these rows).
- Every other backticked file, constant, helper, or field token in these rows that is not followed
  by a noun gets its noun: a path ending in `.ts` or `.md` or `.txt` takes "file"; a constant in
  UPPER_SNAKE takes "constant"; a camelCase helper takes "helper"; a manifest key takes "field";
  a package name takes "package". Leave a token already followed by a noun as it is.

Add, after the `supportsMappedLoopback` row, one row:

```
- **scaffold**: the `matchesEngines` summary cell in `guides/scaffold.md` reads "at or above the
  supported minimum"; the direction vocabulary is `earlier` and `later`, and the parity contract
  ties the cell to the export's description paragraph in the `src/core/` tree, so the repair
  moves the source and re-emits the `dist/src` tree. Ruled on 2026-09-13.
```

**D. `src/core/constants.ts`, the `@remarks` block of `WORKSPACE_DEV_ENGINES`.** Delete the
sentence

```
An npm that does not read the record fails inside dependency resolution instead.
```

and nothing else; re-wrap the block to the file's width. The description paragraph
("Holds the `devEngines` record every generated manifest carries.") stays byte-identical.

## Owned files

`guides/scaffold.md`, `README.md`, `ROADMAP.md`, `src/core/constants.ts`.

## Off-limits

Every other file, in particular `tests/guides.test.ts`, `host.json` (the Orchestrator's `build`
regenerates it after you exit), `package.json`, `.orkestrel/**`, `tmp/**`.

## Execution

Perform this assignment directly and spawn no agent. Write only the owned files. Run no `git`
command that discards a working-tree change. Run no tree-wide `format` or `lint --fix`; keep each
code span on one line when you re-wrap.

## Deviation contract

Stop and report if a replacement target is not found verbatim across its wrap, if `test:guides`
reddens, or if a file outside the owned list must change. Report, without stopping, any token in
item C's rows whose noun the rule above does not name.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run test:policy` exits 0.
4. `npm run check` exits 0.
5. `npm run test:guides` exits 0.
6. `grep -c 'does not read the record' src/core/constants.ts` reads 0, and
   `grep -c 'Holds the `devEngines` record every generated manifest carries.' src/core/constants.ts`
   reads 1.
7. `grep -c 'only under an npm other than the bundled one' guides/scaffold.md` reads 1;
   `grep -c 'every release from 10.9.0 up to 11.6.0 refuses it' guides/scaffold.md` reads 1;
   `grep -c 'or a later release' guides/scaffold.md README.md` reads 0 for each file;
   `grep -c 'first release that installs' guides/scaffold.md` reads 0.
8. `grep -c 'Node [0-9.]* or later' README.md` reads 1.
9. `grep -n -i -E '\b(below|above|older|newer|beneath)\b|from 10\.9\.0 on' ROADMAP.md` prints no
   line inside the rows item C names.
10. `grep -c 'matchesEngines' ROADMAP.md` reads 1.
11. `git diff --stat` names only the owned files.

## Output

Return, as structured data: each criterion with its exact reading; the three final guide
sentences, the final README sentence, and the final doc block verbatim; every ROADMAP token you gave a noun, as a list
of before → after; the deviation state. No process diary.

I'll read the brief and the repository contracts first, then follow the brief exactly and stay read-only.The brief is a read-only evidence map. Next I’ll load the unit brief, audit claims, report, and diffs, then sweep the tree per row.Inputs are loaded. I’ll read the cited rules, current sites, the unit diff, and proof files next.I have the diff. Next I’ll pin current line numbers, run the old-form sweeps, and read the proof files.Checking a few remaining line citations and whether `tests/setup.test.ts` exists under another name.## Question

For every row of unit conform-codec, what does the tree at `/home/user/fleet/codec` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law sentences the rows cite:

- codec-obj-1: `/home/user/scaffold/.claude/rules/tests.md:13-14` “Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`.” and `:43` “Do not create test files solely for `constants.ts`, barrels, error definitions, or `types.ts`.”
- codec-subj-2: `/home/user/scaffold/.claude/rules/documentation.md:37` “Falsify a prose claim the way you falsify a code claim.”
- codec-subj-3: `/home/user/scaffold/.claude/rules/documentation.md:35` “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.”
- codec-subj-4: `/home/user/scaffold/AGENTS.md:65` “**Named discriminants.** Name the axis that varies (`relationship`, `command`, `category`), never `kind` or `type`.”
- fleet-F2: `/home/user/scaffold/.claude/rules/architecture.md:183-185` “`#` private fields: context, options, state/result, child managers.” / “Constructor: initialize context/options and instantiate child managers.” / “Public interface: getters, then methods.”

### codec-obj-1

1. **Site now.** Where names `src/core/validators.ts:1` (absent mirror `tests/src/core/validators.test.ts`). Brief `:1` is still `:1`:

```1:3:/home/user/fleet/codec/src/core/validators.ts
import {
	decodeBase64,
	decodeBase64URL,
```

(no line before `:1`). Guards still at `src/core/validators.ts:27` `isBase64`, `:47` `isBase64URL`, `:68` `isHex`, `:104` `isUTF8`, `:126` `isLatin1`, `:148` `isWindows1252`, `:173` `isUTF16LE`. The mirror now exists:

```1:3:/home/user/fleet/codec/tests/src/core/validators.test.ts
import { describe, expect, it } from 'vitest'
import { createHostileValues } from '@orkestrel/test'
import {
```

Moved `describe` titles now at `tests/src/core/validators.test.ts:31`, `:42`, `:53`, `:94` (file ends `:140`). Brief’s `helpers.test.ts:195-204` / `:206-215` / `:812-851` / `:853-899` no longer hold those blocks; after the deletion the next remaining describe is `tests/src/core/helpers.test.ts:191` (`the measure law`). Guide Tests: helpers row still `guides/codec.md:415`; new validators row `guides/codec.md:471-477` (before `tests/policy.test.ts` at `:478`).

2. **Diff at the site.** `tests/src/core/validators.test.ts` `@@ -0,0 +1,140 @@`; first `+` `+import { describe, expect, it } from 'vitest'`. Operative repair text present in `+` lines: amended import `+import { createHostileValues } from '@orkestrel/test'` (no `requireValue`); four `+describe(...)` titles match the moved blocks. `guides/codec.md` `@@ -468,6 +468,13 @@`; first `+` `+- [`tests/src/core/validators.test.ts`](../tests/src/core/validators.test.ts) — the guard-family`. `helpers.test.ts` `@@ -1,5 +1,5 @@` first `+` `+import { requireValue } from '@orkestrel/test'`; `@@ -32,11 +32,8 @@`, `@@ -45,7 +42,6 @@`, `@@ -192,28 +188,6 @@`, `@@ -808,92 +782,3 @@` are deletion hunks (no `+` body). Verbatim: `createHostileValues` alone on the new-file `+` import; `requireValue` kept on the helpers `+` import.

3. **Old form sweep.** Paths: `src`, `tests`, `guides/codec.md`, `guides/README.md`, `README.md` (no `node_modules`). Removed from `helpers.test.ts`: `createHostileValues`, `FOREIGN`, `FOREIGN_BYTES`, `HEX_MEMBERSHIP`, `MEMBERSHIP`.

- `\bcreateHostileValues\b`: `tests/src/core/validators.test.ts:2`, `:113`. Inflections `createHostileValues(s|ed|ing)`: no hit. `helpers.test.ts`: no hit.
- `\bFOREIGN\b`: `tests/setup.ts:184`, `tests/src/core/validators.test.ts:22`, `:96`. `helpers.test.ts`: no hit.
- CI `\bforeign(s|ed|ing)?\b` extra: `tests/src/core/validators.test.ts:97-100`, `:106-108`; `tests/guides.test.ts:180`; `guides/codec.md:75`, `:420`, `:476`; `README.md:18`.
- `\bFOREIGN_BYTES\b`: `tests/setup.ts:641`, `tests/src/core/validators.test.ts:23`, `:105`. `helpers.test.ts`: no hit.
- `\bHEX_MEMBERSHIP\b`: `tests/setup.ts:92`, `:311`; `tests/src/core/validators.test.ts:24`, `:43`. `helpers.test.ts`: no hit.
- `\bMEMBERSHIP\b`: `tests/setup.ts:48`, `:145`, `:303`; `tests/src/core/validators.test.ts:26`, `:32`. `helpers.test.ts`: no hit.
- CI `\bmembership(s|ed|ing)?\b` extra in named prose/tests (excluding vendored fixture fields): `guides/codec.md:85`, `:148`, `:228`, `:235`, `:422`, `:432`, `:472`, `:473`; `README.md:83`; `tests/src/core/helpers.test.ts:295`; `tests/src/core/validators.test.ts:33`, `:44`; `tests/guides.test.ts:177`, `:229`, `:252`. Same pattern also hits `tests/setupPolicy.ts:49` and the `membership:` fixture fields from `:1986` through `:2867`, plus `tests/policy.test.ts` and `tests/config.test.ts` membership labels (vendored/off-limits files still under `tests/`).
- Moved describe titles in `helpers.test.ts`: no hit.

4. **Report reading.** Table: `applied`. Sentence: “Created `/home/user/fleet/codec/tests/src/core/validators.test.ts` with the four moved blocks … under the refuter's amended import list.” File exists; `:2` is `createHostileValues` alone; `requireValue` absent from that file. “Added a `tests/src/core/validators.test.ts` row to `guides/codec.md` § Tests beside the `helpers.test.ts` row.” Row present at `guides/codec.md:471`; helpers row still `:415`.

5. **Proof reading.** Behavioural. Report: planted `expect(true).toBe(false)`, `npm run test:src`, red `/home/user/work/evidence/codec-proofs/codec-obj-1-red.txt` `1 failed | 157 passed (158)`; green `codec-obj-1-green.txt` `2 passed (2)` files, `157 passed (157)` tests; baseline `codec-obj-1-baseline.txt`. Files exist. Red `Tests` lines: `Test Files  1 failed | 1 passed (2)` / `Tests  1 failed | 157 passed (158)`. Green: `Test Files  2 passed (2)` / `Tests  157 passed (157)`. Baseline: `Test Files  1 passed (1)` / `Tests  157 passed (157)`.

### codec-subj-2

1. **Site now.** Where `guides/codec.md:305` (brief `:305` still `:305`):

```304:306:/home/user/fleet/codec/guides/codec.md
encodeBase64(new Uint8Array([105])) // 'aQ=='
decodeBase64('AQ D') // undefined — whitespace
decodeBase64('A') // undefined — a length off the group boundary
```

Repair sites now: `README.md:76` `decodeBase64('AQ D') // undefined — whitespace`; `tests/guides.test.ts:276` `expect(decodeBase64('AQ D')).toBeUndefined()`; `tests/setup.ts:70` `{ text: 'AQ D', standard: false, url: false, reason: 'whitespace' }`; `tests/setup.ts:76-81` `'AAAA\n'` with `reason: 'a trailing newline, refused at the length residue'`.

2. **Diff at the site.** `guides/codec.md` `@@ -302,7 +302,7 @@`; `+decodeBase64('AQ D') // undefined — whitespace` — operative vector verbatim. Same `+` text in `README.md` `@@ -73,7 +73,7 @@`; `tests/guides.test.ts` `@@ -273,7 +273,7 @@` `+		expect(decodeBase64('AQ D')).toBeUndefined()`; `tests/setup.ts` `@@ -67,13 +67,18 @@` `+	{ text: 'AQ D', standard: false, url: false, reason: 'whitespace' }` and `+		reason: 'a trailing newline, refused at the length residue',`. Finder’s `'AA A'` not in any `+` line.

3. **Old form sweep.** `\bAQ ID\b` / `AQ ID` across named paths: no hit. `AA A`: no hit. Phrase `a trailing newline`: `tests/setup.ts:80` (extended reason), `tests/setup.ts:104` (hex row `reason: 'a trailing newline, refused at the odd length'`). Inflections of `AQ ID`: no hit.

4. **Report reading.** `applied`. “Replaced the vector `'AQ ID'` with `'AQ D'` in `guides/codec.md:305`, `README.md:76`, `tests/guides.test.ts:276`, and `tests/setup.ts` … Reworded the `'AAAA\n'` reason at `tests/setup.ts` to `'a trailing newline, refused at the length residue'`.” Cited `guides/codec.md:305`, `README.md:76`, `tests/guides.test.ts:276` now carry that text. `tests/setup.ts:70` and `:80` carry the MEMBERSHIP / reason edits (report gave no new line for those two).

5. **Proof reading.** Documentation. Report sweep: “Old-vector sweep for `AQ ID` … no matches.” Field 3 agrees (`AQ ID`: no hit). Extra proof files exist (`codec-subj-2-src.txt` Tests `157 passed (157)`; `codec-subj-2-guides.txt` Tests `25 passed (25)`) and are not named in the report’s failing-first table.

### codec-subj-3

1. **Site now.** Where `guides/codec.md:68-75` and `:111-121` (those numbers still hold those rows). `:68` `encodeBase64` Behavior starts `` `bytes` spelled in the RFC 4648 §4 alphabet ``; `:69` `Exactly what `encodeBase64` writes, read back.`; `:71` spelled; `:72` read back; `:74` spelled; `:75` read back; `:111` spelled; `:112` read back; `:114` `Each code unit written as the byte`; `:115` `Each byte read as the code point`; `:117` `The inverse of the mapping `decodeWindows1252` reads.`; `:118` unchanged Identity; `:120` `Each code unit written low byte first`; `:121` `Two bytes read per code unit`. README recast in place: `:11`, `:12`, `:14`, `:15`, `:17`, `:18`, `:30`, `:31`, `:33`, `:34`, `:36`, `:39`, `:40`; `:37` `decodeWindows1252` still `Identity for 0x00-0x7F and 0xA0-0xFF, the written-out high table between them; bytes 0x81, 0x8D, 0x8F, 0x90, and 0x9D are `undefined``.

2. **Diff at the site.** `guides/codec.md` `@@ -63,17 +63,17 @@` and `@@ -108,17 +108,17 @@`. Operative worked cells verbatim on `+` lines, e.g. `+… `bytes` spelled in the RFC 4648 §4 alphabet (`+`, `/`) with `=` padding — the canonical form, and the only form `decodeBase64` accepts. Total: encoding cannot fail.` and `+… Exactly what `encodeBase64` writes, read back. …`. `README.md` `@@ -6,38 +6,38 @@` recasts README’s own wording (`encodeUTF8` README `+` lacks the guide’s “lone surrogate” clause). `is*` / `measure*` / `decodeWindows1252` cells not in the `-`/`+` pair as reworded bodies (`decodeWindows1252` context-only).

3. **Old form sweep.** Report patterns `| Spells`, `| Reads back`, `| Writes each`, `| Inverts` over `guides/codec.md` and `README.md`: no hit. `\bSpells\b`: no hit. CI `\bspell(s|ed|ing)?\b` hits the new cells `guides/codec.md:68`, `:71`, `:74`, `:111` and `README.md:11`, `:14`, `:17`, `:30`, plus pre-existing “spelling/spells” prose (`guides/codec.md:9`, `:30`, `:49`, `:154`, `:156`, `:161`, `:167-168`, `:172`, `:183-184`, `:234`, `:241`, `:303`, `:348`, `:369`, `:372-373`, `:410`; `README.md:61-62`, `:74`). `Reads back`: no hit; new form `read back` at `guides/codec.md:69`, `:72`, `:75`, `:112` and `README.md:12`, `:15`, `:18`, `:31`. `Writes each`: no hit; new `written` at `guides/codec.md:114`, `:120` and `README.md:33`, `:39`. `Inverts`: no hit; new `inverse` at `guides/codec.md:117` and `README.md:36`.

4. **Report reading.** `applied`. “Recast the thirteen verb-led Behavior cells in `guides/codec.md` … left every `is*`, `measure*`, and `decodeWindows1252` cell unchanged. In `README.md`, recast the file's own abridged wording in place …” Ancillary: brief README `:37` left unchanged as already a noun phrase. Tree: `guides/codec.md:118` and `README.md:37` are the Identity cells; `README.md:30` vs `guides/codec.md:111` still differ (README shorter).

5. **Proof reading.** Documentation. Report: “Old-form sweep for the verb-led Behavior cells (`| Spells`, `| Reads back`, `| Writes each`, `| Inverts`) … no matches.” Field 3 agrees on those four patterns; inflection `spelled` / `written` / `read back` / `inverse` remain as the recast.

### codec-subj-4

1. **Site now.** Where brief `tests/setup.ts:270` was `const kind = …`. Current `:270` is the loop, not the binding:

```269:276:/home/user/fleet/codec/tests/setup.ts
let mutantCursor = 0
for (let length = 1; length <= MUTANT_PREFIX; length += 1) {
	const bytes = OCTETS.slice(0, length)
	for (const base of [encodeBase64(bytes), encodeBase64URL(bytes), encodeHex(bytes)]) {
		MUTANT_SET.add(base)
		for (let round = 0; round < MUTANT_ROUNDS; round += 1) {
			const mutation = (MUTANT_DRAWS[mutantCursor] ?? 0) % 3
			const position = (MUTANT_DRAWS[mutantCursor + 1] ?? 0) % base.length
```

Readers now `:281` `if (mutation === 0)` and `:283` `else if (mutation === 1)`. Comment now `:257` `// The draws per mutant are the mutation, the position, and the character, over every base.` Brief `:252` is now `/** The mutants drawn per base encoding. */`.

2. **Diff at the site.** `tests/setup.ts` `@@ -249,7 +254,7 @@` `+// The draws per mutant are the mutation, the position, and the character, over every base.` — verbatim. `@@ -267,14 +272,15 @@` `+			const mutation = (MUTANT_DRAWS[mutantCursor] ?? 0) % 3` — verbatim; `+			if (mutation === 0)` and `+			else if (mutation === 1) {`.

3. **Old form sweep.** `\bkind\b` / CI `\bkind(s|ed|ing)?\b` across named paths:

- `src/core/validators.ts:93`, `:136`, `:162` (“sibling view kind”)
- `guides/codec.md:66`, `:93`, `:109` (table header `Kind`); `:113` (“sibling view kind”)
- `README.md:9`, `:28` (table header `Kind`)
- `tests/guides.test.ts:171` `symbol.kind === 'function'`
- `tests/setup.ts:636` “sibling view kinds” (`kinds` inflection only; `\bkind\b` in this file: no hit)
- `tests/setupPolicy.ts:127`, `:346`, `:598`, `:606`, `:745`
- `const kind`: no hit. `guides/README.md`: no hit.

4. **Report reading.** `applied`. “Renamed `kind` to `mutation` at `tests/setup.ts:270` (now `const mutation = (MUTANT_DRAWS[mutantCursor] ?? 0) % 3`) and its two readers … and reworded the comment at `tests/setup.ts:252` to …” Cited `:270` now carries `for (let length = 1; …`; the mutation binding is `:275`. Cited `:252` now carries `/** The mutants drawn per base encoding. */`; the comment is `:257`.

5. **Proof reading.** Naming. Report: `grep -n "\bkind\b" tests/setup.ts` — no matches. Field 3 agrees for that file+pattern. Broader named-path sweep still has the hits listed above. Extra `codec-subj-4-src.txt` Tests `157 passed (157)`.

### fleet-F1

1. **Site now.** Where: `tests/setup.ts` declares `isBrowserVuePath`. Header `tests/setup.ts:1` `import { encodeBase64, encodeBase64URL, encodeHex } from '@src/core'` — no `isBrowserVuePath`. Glob `tests/setup.test.ts`: no file (only `tests/setup.ts`, `tests/setupPolicy.ts`). Glob `src/browser/**`, `app/browser/**`, `tests/setupBrowser.ts`: no files.

2. **Diff at the site.** No hunk removes `isBrowserVuePath` (identifier absent before and after).

3. **Old form sweep.** `isBrowserVuePath` and inflections across named paths: no hit. Workspace-wide including `guides/*`: no hit.

4. **Report reading.** `noop`. “`tests/setup.ts` declares no `isBrowserVuePath`; grep … returns no matches. The workspace has no `src/browser`, `app/browser`, or `tests/setupBrowser.ts` either …” Those glob reads match.

5. **Proof reading.** Placement/naming. Report: `grep -rn isBrowserVuePath /home/user/fleet/codec` — no matches. Field 3 agrees.

### fleet-F2

1. **Site now.** Where: public `readonly id: string` ahead of `#` fields. `grep` `^class ` / `class ` under `src/`: no hit. No implementation class file.

2. **Diff at the site.** No class-order hunk. No `src/**` file in the diff.

3. **Old form sweep.** `readonly id: string`: `tests/setupPolicy.ts:2882` `content: 'export interface TaskInterface { readonly id: string }\n'` (string inside a planted fixture). `JSON.stringify` of a class instance in `src/` or `guides/codec.md`: no hit in `src/`; test `JSON.stringify` hits are text/row labels, not class instances.

4. **Report reading.** `noop`. “Grep for `readonly id: string` … one hit, at … `tests/setupPolicy.ts:2882` … `grep 'class '` under `src/` returns no files … No implementation class …” `tests/setupPolicy.ts:2882` is that fixture string. `src/` still has no `class `.

5. **Proof reading.** Report sweep matches field 3 (`readonly id: string` one hit at `:2882`; no `src/` class files).

### Scope

Status (`/home/user/work/evidence/conform-codec.status`):

| path | tag |
| --- | --- |
| `README.md` | owned |
| `guides/codec.md` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/src/core/helpers.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned (`A`) |

No status path is shared or off-limits.

Diff hunks whose file no row’s Where names (Where files: `src/core/validators.ts`, `tests/src/core/validators.test.ts`, `guides/codec.md`, `tests/setup.ts`):

- `README.md @@ -6,38 +6,38 @@` first `+`: `+| Name               | Kind     | Signature                                                | Behavior                                                                                                                                                              |`
- `README.md @@ -73,7 +73,7 @@` first `+`: `+decodeBase64('AQ D') // undefined — whitespace`
- `tests/guides.test.ts @@ -273,7 +273,7 @@` first `+`: `+		expect(decodeBase64('AQ D')).toBeUndefined()`
- `tests/src/core/helpers.test.ts @@ -1,5 +1,5 @@` first `+`: `+import { requireValue } from '@orkestrel/test'`
- `tests/src/core/helpers.test.ts @@ -32,11 +32,8 @@` — no `+` line
- `tests/src/core/helpers.test.ts @@ -45,7 +42,6 @@` — no `+` line
- `tests/src/core/helpers.test.ts @@ -192,28 +188,6 @@` — no `+` line
- `tests/src/core/helpers.test.ts @@ -808,92 +782,3 @@` — no `+` line

### Residue

Diff `+` lines vs `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hit.

Tree `src` and `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`: no hit (`src/`: no hit; `tests/src/**`, `tests/guides.test.ts`, `tests/setup.ts`: no hit). Excluded files do contain `timeout` / `skip` / `TODO` / `console.` / `debugger` (e.g. `tests/distribution.test.ts:44`, `:684`; `tests/config.test.ts:687`, `:945`; `tests/setupPolicy.ts` TODO/debugger fixtures).

### Parity

Diff touches no `src/**/types.ts` and no class file. Glob `src/**/types.ts`: no file. `src/` has no `class `. `guides/codec.md` has no `## Methods` heading. Surface tables (not Methods) at `guides/codec.md:66-76`, `:93-98`, `:109-122` list functions; no readonly data-property interface members.

Barrel `src/core/index.ts:1-2`: `export * from './validators.js'` / `export * from './helpers.js'`.

Backticked identifiers in guide `+` sentences (Tests row `guides/codec.md:471-477` plus recast Behavior cells):

| identifier | barrel |
| --- | --- |
| `tests/src/core/validators.test.ts` | path, not an export |
| `isHex` | yes, via `validators.js` (`src/core/validators.ts:68`) |
| `decodeHex` | yes, via `helpers.js` (`src/core/helpers.ts:183`) |
| `isUTF8` | yes (`src/core/validators.ts:104`) |
| `isWindows1252` | yes (`:148`) |
| `isUTF16LE` | yes (`:173`) |
| `isLatin1` | yes (`:126`) |
| `encodeLatin1` | yes (`src/core/helpers.ts:488`) |
| `bytes` / `text` / `undefined` | not exports |
| `encodeBase64` `:37`, `decodeBase64` `:69`, `encodeBase64URL` `:109`, `encodeHex` `:156`, `encodeUTF8` `:383`, `decodeWindows1252` `:583` | yes via `helpers.js` |

`AGENTS §` in `guides/codec.md`, `README.md`, `tests/**`: no hit.

### Gates

Report § Gates quoted:

1. `npm run format:check` — exit 0 (after formatting only the five touched files with `npx oxfmt --write` scoped to their paths, never tree-wide).
2. `npm run lint:check` — exit 0, no diagnostics.
3. `npm run check` — exit 0.
4. `npm run build` — exit 0.
5. `npm test` — exit 0. `test:src` 157/157, `test:policy` 111/111, `test:config` 46/46, `test:guides` 25/25 (all under this unit's own exec; the Orchestrator's deciding run is the authoritative reading per § Standing conditions).

Named files exist. `gate-format.txt`: `All matched files use the correct format.` `gate-lint.txt`: command header only, no diagnostics. `gate-test.txt` Tests summaries: `157 passed (157)`, `111 passed (111)`, `46 passed (46)`, `25 passed (25)`. None of the gate files print an `exit_code` line.

### Breaking

Report § Breaking: “None. Every row is non-breaking per its own heading, touches no published symbol's name or signature, and the diff carries no `src/**` edit.” Diff has no `src/**` file. No renamed/removed published symbol to sweep; fleet/scaffold old-name sweep therefore has no symbol to search. `kind` was loop-local (`tests/setup.ts`), not a published export (`src/core/index.ts:1-2` re-exports helpers and validators only).

### Writing sweep

Over diff `+` lines in `guides/**`, `README.md`, `src/**` doc comments (none in diff), and test titles/comments in `tests/**`:

- CI `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`: no hit in that population. (`new` appears in `tests/src/core/validators.test.ts` `+` *bodies* as `new Uint8Array` / `new ArrayBuffer` at `:45`, `:58`, `:84`, `:132-134`, outside titles/comments. `guides/codec.md:238` `now` is not a `+` line.)
- CI `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit. (`tests/setup.ts:410` `two tables` is not a `+` line.)

## Distillate

- codec-obj-1: site now `src/core/validators.ts:1` unchanged; mirror now `tests/src/core/validators.test.ts:1` (`describe` at `:31,:42,:53,:94`); guide row `guides/codec.md:471` \| diff present yes \| old form hits 0 in `helpers.test.ts` for `createHostileValues`/`FOREIGN`/`FOREIGN_BYTES`/`HEX_MEMBERSHIP`/`MEMBERSHIP`; those names live in `validators.test.ts`/`setup.ts` \| report matches yes on file+imports+Tests row
- codec-subj-2: site now `guides/codec.md:305` `decodeBase64('AQ D')` \| diff present yes (`'AQ D'` verbatim) \| old form hits 0 for `AQ ID` \| report matches yes on cited `:305`, `:76`, `:276`
- codec-subj-3: site now `guides/codec.md:68-75,:111-121` noun-phrase cells; `README.md:37` still Identity \| diff present yes (guide cells verbatim; README recast in place) \| old form hits 0 for `\| Spells`/`\| Reads back`/`\| Writes each`/`\| Inverts` \| report matches yes including ancillary `:37`
- codec-subj-4: site now binding `tests/setup.ts:275` (brief/report `:270` is the `for` loop); comment `:257` (report `:252` is `MUTANT_ROUNDS` doc) \| diff present yes \| old form hits 0 for `\bkind\b` in `tests/setup.ts`; 16 CI `kind(s)?` hits on named paths as listed \| report matches no on cited `:270` and `:252`
- fleet-F1: site now helper absent; no `tests/setup.test.ts`, no browser tree \| diff present no \| old form hits 0 \| report matches yes (`noop`)
- fleet-F2: site now no `src/` class; `readonly id: string` only `tests/setupPolicy.ts:2882` fixture string \| diff present no \| old form hits 1 (`:2882`) \| report matches yes (`noop`)

Scope tags: all six status paths **owned**.

Residue: diff `+` no hit; non-excluded `src`/`tests` no hit.

Writing: named `+` prose population no hit.

Parity: no `types.ts`, no class, no `## Methods`; Tests-row backticks `isHex`/`decodeHex`/`isUTF8`/`isWindows1252`/`isUTF16LE`/`isLatin1`/`encodeLatin1` are barrel-exported via `src/core/index.ts:1-2`.

## Unknowns

- Gate proof files do not record an in-band exit code; report’s “exit 0” is not a line in those files.
- Live `git status` / containment `git diff --stat` was not run: the Shell tool rejected the read-only status command in this session.
- Case-insensitive `membership` under vendored `tests/setupPolicy.ts` / `tests/policy.test.ts` / `tests/config.test.ts` is a large fixture population; identifier `\bMEMBERSHIP\b` hits are fully listed; every vendored `membership:` line number is not re-copied here beyond the Grep ranges named above.
- No `src/**/types.ts` exists, so the types-side of the parity table has no interface call-signatures to pair.
- Breaking fleet sweep has no published old name to search (report § Breaking is empty).
- `codec-subj-2-src.txt`, `codec-subj-2-guides.txt`, `codec-subj-4-src.txt` exist and were not claimed as failing-first controls in the report.

## Journal


## Deviation

This lane created, edited, and deleted no file. The Shell containment `git status` call was rejected, so this lane did not independently re-read the worktree against HEAD; the evidence status file still lists the same six Owned paths as the conversation-start snapshot. Every named input file was readable. Sweeps used Read/Grep/Glob only; no tree-changing command ran.
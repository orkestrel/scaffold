# Unit report — U-fix-4 (Opus `implementer`, native, returned 2026-09-13)

All criteria are measured. Here is the unit result.

## Touched files

| File | Reason |
| --- | --- |
| `guides/scaffold.md` | Item A: replaced the toolchain paragraph (lines 1451-1466) whole with the closed set, placement kept. |
| `README.md` | Item B: replaced the § Notes npm-floor paragraph (lines 61-69) with the README subset. |
| `src/core/constants.ts` | Item C: rewrote the `WORKSPACE_DEV_ENGINES` `@remarks` block; the description paragraph is outside the hunk and byte-identical. |
| `ROADMAP.md` | Item D: token-rule corrections in the arborist row, the proof row, the 0.0.65 row, and the R-4 clause; nothing else. |

Diffstat (`git diff --stat`, baseline `8de1c3a`):

```
 README.md             | 13 ++++++++-----
 ROADMAP.md            | 28 +++++++++++++++-------------
 guides/scaffold.md    | 27 +++++++++++++++------------
 src/core/constants.ts | 10 +++++-----
 4 files changed, 43 insertions(+), 35 deletions(-)
```

## Criteria, with exact readings

| # | Command | Reading |
| --- | --- | --- |
| 1 | `npm run format:check` | exit 0 — "All matched files use the correct format. Finished in 10306ms on 225 files" |
| 2 | `npm run lint:check` | exit 0, no output |
| 3 | `npm run check` | exit 0 (root, `check:src:core`, `check:src:server`, `check:src:bin`) |
| 4 | `npm run test:policy` | exit 0 — `Test Files 1 passed (1)`, `Tests 91 passed (91)` |
| 5 | `npm run test:guides` | exit 0 — `Test Files 1 passed (1)`, `Tests 23 passed (23)` |
| 6 | `grep -c 'Node [0-9.]* or later' README.md` | `1` (README.md:12, untouched) |
| 7 | `grep -n -i -E '\b(below\|above\|older\|newer\|beneath)\b' README.md src/core/constants.ts` | README.md: no hit. `src/core/constants.ts`: 6 pre-existing hits at 121, 161, 170, 225, 240 (`beneath`, path containment) and 459 (`above`, a numeric bound) — all outside the `WORKSPACE_DEV_ENGINES` block, all baseline text (my only constants hunk is `@@ -492,11 +492,11 @@`). Guide paragraph range 1451-1466: no hit (`rc=1`). |
| 8 | `grep -n '`[0-9][0-9.]*`' README.md` | no hit (`rc=1`). Same pattern over guide 1451-1466: no hit (`rc=1`). |
| 9 | `grep -n 'path-prepend\|10\.9\.7' guides/scaffold.md` | one line, the whole `npm run` sentence: `1457:npm 10.9.7 refuses an `npm run` command in such a workspace with the same code. The releases`. `grep -c 'npm run' README.md` → `1`, the hit being README.md:72 in the Windows note (`avoid `npm run scaffold -- …``), pre-existing and outside item B's paragraph; my README hunk is `@@ -62,5 +62,8 @@`. |
| 10 | three `grep -c` over `ROADMAP.md` | `the `@npmcli/arborist` package` → `1`; `the `setsid` command or the `timeout` command` → `1`; `the `0.0.65` fix audit` → `0`. |
| 12 | `grep -n -E 'older than\|earlier than 10\.9\.0' README.md guides/scaffold.md` | three hits, none claiming a failure of every earlier release: `README.md:64` (names 10.5.0 and 10.8.3), `README.md:66` (the "No Node release … bundles" anchored form), `guides/scaffold.md:1458` (names 10.5.0 and 10.8.3). No `older than` anywhere. |
| 11 | `git diff --stat` | names `README.md`, `ROADMAP.md`, `guides/scaffold.md`, `src/core/constants.ts` and nothing else; `git status --porcelain` shows those four as ` M` and no other entry. |

## Guide paragraph, verbatim (`guides/scaffold.md:1451-1466`)

```
Every generated manifest declares the toolchain it is gated on. The `engines.node` field carries
the blueprint's `engines` value, which defaults to the `>=22.18.0` range. The
`devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set to
the `error` value, and no blueprint field varies that record. An npm at 10.9.0 or later reads that
record. Such an npm earlier than 11.6.0 refuses the `npm install` command in a generated workspace
with the `EBADDEVENGINES` code, before resolving the dependency graph.
npm 10.9.7 refuses an `npm run` command in such a workspace with the same code. The releases
measured earlier than 10.9.0, npm 10.5.0 and npm 10.8.3, ignore the record and fail inside
dependency resolution instead. Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or
later. A generated workspace therefore meets an npm that ignores the record only where a developer
installed such an npm in place of the bundled npm. Run a generated workspace on npm 11.6.0 or
later, because 11.6.0 is the first release that installs a generated workspace. Read the ambient
version with the `npm --version` command. Raise it with the `npm install --global npm@11.6.0`
command, or a later release, before the first install; that command installs an npm that reports
11.6.0. The npm readings come from a Linux host on Node 22.22.2, on 2026-09-13, and the bundled
versions come from the Node release index read that day.
```

Sentence-by-sentence annotation:

| Sentence as written | § Sentences entry |
| --- | --- |
| "Every generated manifest declares the toolchain it is gated on." | 1 |
| "The `engines.node` field carries the blueprint's `engines` value, which defaults to the `>=22.18.0` range." | 2 |
| "The `devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set to the `error` value, and no blueprint field varies that record." | 3 |
| "An npm at 10.9.0 or later reads that record." | 4 |
| "Such an npm earlier than 11.6.0 refuses the `npm install` command in a generated workspace with the `EBADDEVENGINES` code, before resolving the dependency graph." | 5 ("Such an npm" carries sentence 4's "at 10.9.0 or later" bound) |
| "npm 10.9.7 refuses an `npm run` command in such a workspace with the same code." | 6 (stated of 10.9.7 alone) |
| "The releases measured earlier than 10.9.0, npm 10.5.0 and npm 10.8.3, ignore the record and fail inside dependency resolution instead." | 7 (bounded to the measured releases) |
| "Every Node release at 22.18.0 or later bundles an npm at 10.9.0 or later." + "A generated workspace therefore meets an npm that ignores the record only where a developer installed such an npm in place of the bundled npm." | 8, split for one idea per sentence |
| "Run a generated workspace on npm 11.6.0 or later, because 11.6.0 is the first release that installs a generated workspace." | 9 |
| "Read the ambient version with the `npm --version` command." + "Raise it with the `npm install --global npm@11.6.0` command, or a later release, before the first install; that command installs an npm that reports 11.6.0." | 10, split |
| "The npm readings come from a Linux host on Node 22.22.2, on 2026-09-13, and the bundled versions come from the Node release index read that day." | 11 |

## README paragraph, verbatim (`README.md:61-69`)

```
The `scaffold new` command generates a workspace that declares an npm floor of 11.6.0 in its
`devEngines` record. An npm at 10.9.0 or later and earlier than 11.6.0 refuses the `npm install`
command there with the `EBADDEVENGINES` code, before resolving the dependency graph.
npm 10.5.0 and npm 10.8.3, the releases measured earlier than 10.9.0, ignore the record and fail
inside dependency resolution instead.
No Node release the executable supports bundles an npm earlier than 10.9.0. Read the ambient
version with the `npm --version` command. Raise it with the `npm install --global npm@11.6.0`
command, or a later release, before the first install.
These readings come from a Linux host, on 2026-09-13.
```

| Sentence as written | § Sentences entry |
| --- | --- |
| "The `scaffold new` command generates a workspace that declares an npm floor of 11.6.0 in its `devEngines` record." | 5, the floor half, with `scaffold new` as the opening subject |
| "An npm at 10.9.0 or later and earlier than 11.6.0 refuses the `npm install` command there with the `EBADDEVENGINES` code, before resolving the dependency graph." | 5, the refusal half |
| "npm 10.5.0 and npm 10.8.3, the releases measured earlier than 10.9.0, ignore the record and fail inside dependency resolution instead." | 7, no wider |
| "No Node release the executable supports bundles an npm earlier than 10.9.0." | 8, in the form the brief names; carries no `Node <version> or later` phrase, so the pin at README.md:12 stays the only match |
| "Read the ambient version with the `npm --version` command." + "Raise it with the `npm install --global npm@11.6.0` command, or a later release, before the first install." | 10 |
| "These readings come from a Linux host, on 2026-09-13." | 11, without the Node version |

## Doc block, verbatim (`src/core/constants.ts:491-502`)

```ts
/**
 * Holds the `devEngines` record every generated manifest carries.
 *
 * @remarks
 * Every generated manifest names npm at the {@link MINIMUM_NPM_VERSION} floor with the `onFail`
 * key set to the `error` value, and no blueprint field varies that record. An npm at 10.9.0 or
 * later reads the `devEngines` record. Such an npm earlier than the floor refuses an install in a
 * generated workspace rather than resolving its dependency graph. An npm that does not read the
 * record fails inside dependency resolution instead.
 * The neighbouring `DEFAULT_ENGINES` constant is the Node range, and a blueprint's `engines`
 * field does replace that one.
 */
```

| Sentence as written | § Sentences entry |
| --- | --- |
| "Every generated manifest names npm at the {@link MINIMUM_NPM_VERSION} floor with the `onFail` key set to the `error` value, and no blueprint field varies that record." | 3 |
| "An npm at 10.9.0 or later reads the `devEngines` record." | 4 |
| "Such an npm earlier than the floor refuses an install in a generated workspace rather than resolving its dependency graph." | 5, refusal only, no error code |
| "An npm that does not read the record fails inside dependency resolution instead." | 7, narrowed to name no release |
| "The neighbouring `DEFAULT_ENGINES` constant is the Node range, and a blueprint's `engines` field does replace that one." | Baseline cross-reference to the sibling constant, retained unchanged; it carries no npm claim. |

The description paragraph is byte-identical and sits outside the hunk (`@@ -492,11 +492,11 @@` starts at the `@remarks` prose), so the guide `Summary` cell at `guides/scaffold.md:168` still matches and `test:guides` reads exit 0.

## Deviation state

No stop condition fired: every fact came from § Sentences, `test:guides` is green, item C was written without touching the description paragraph, and no file outside the owned list changed.

Two ancillary conflicts I decided and carried on from, both because a pattern the brief wrote against the edited region also admits pre-existing text outside it:

1. **Criterion 7 over `src/core/constants.ts`** cannot read empty without editing prose item C does not assign. The six hits (lines 121, 161, 170, 225, 240, 459) use `beneath` for path containment and `above` for a numeric bound — neither is a version direction, so `.claude/rules/writing.md` § Code tokens, references, and links does not reach them, and rewriting them would falsify accurate prose. Reported with the exact reading rather than edited.
2. **Criterion 9's `grep -c 'npm run' README.md` reads 1, not 0.** The hit is README.md:72, the Windows PowerShell note (`avoid `npm run scaffold -- …``), which is baseline text outside item B's paragraph and outside my owned edit. The npm-floor paragraph itself carries no `npm run` sentence, which is what the criterion exists to check.

One observation, not a criterion: `host.json` carries the pre-edit SHA-256 digest of the vendored `guides/scaffold.md` file, so `npm run test:config` reddens until the Orchestrator's `build` regenerates the inventory. I left `host.json` untouched as the brief directs.
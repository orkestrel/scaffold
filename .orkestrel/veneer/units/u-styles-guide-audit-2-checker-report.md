<!-- workflow wf_68bc33ec-62a, agent a5d23d2f27006dcda, retained 2026-09-20 -->

No hits anywhere in the file. PASS for check 9.

Now compiling the final table.

## Checker verdict

| Check | PASS/FAIL | Site |
|---|---|---|
| The count | PASS | `guides/veneer.md:75` — "Veneer publishes its cascade through a standalone stylesheet subpath, `./styles`." contains `./styles` and not "one standalone". |
| The tokens | FAIL | `guides/veneer.md:75` `` `./styles` `` followed by `.`; `guides/veneer.md:135` `` `tests/src/styles/fixtures/mixins.scss` `` followed by `,`; `guides/veneer.md:164` `` `src:core` `` followed by `,`; `guides/veneer.md:164` `` `src:browser` `` followed by `,`; `guides/veneer.md:182` `` `configs/src/tsconfig.styles.json` `` followed by `,`. |
| The list form | PASS | `guides/veneer.md:145,151,157,163,169,175` — every departure line under `### Departures from the workspace rows` begins with `- **`; no digit-period line. |
| The attribution | PASS | `guides/veneer.md:157-160` — "The root's `srcBrowser` and `appBrowser` factories plant the `environmentBoundary` plugin on the `src/browser` and `app/browser` environments, and the `configs/src/vite.core.config.ts` wrapper plants it on the `src/core` environment." contains both required paths and both factory names. |
| The proof subject | PASS | `guides/veneer.md:131-136` — sentence after the scripts table contains "mixin" (134) and "fixture" (134-135); no "every case" substring anywhere in that sentence. |
| The replaced fields | PASS | `guides/veneer.md:110-111` — "The wrapper replaces the plugins, the output directory, the library entry, the build options (keeping the root's build-log handler and dropping the browser externals and output paths)…" contains "build options" and "build-log handler". |
| The rows | PASS | `guides/veneer.md:140-143` — opening sentence contains "`src/styles/`" and "`@src/styles`" and does not contain the string `` `src:styles` row``. |
| The diff's population | PASS | `guides/README.md` blob pair identical in both patches (`index f6fe025..b3e8e39` in `u-styles-guide-diff-2.patch.txt:2` and `.orkestrel/veneer/units/u-styles-guide-diff.patch.txt:2`); `guides/veneer.md` pair differs (`dc69f19..ac1708e` vs `dc69f19..a5fcca3`, round-2 diff line 27 vs round-1 line 27); `tmp/audit/u-styles-guide-status-2.txt` is byte-identical to `.orkestrel/veneer/units/u-styles-guide-status.txt` (both ` M guides/README.md` / ` M guides/veneer.md`); every `+` line in `guides/veneer.md`'s round-2 hunk (`u-styles-guide-diff-2.patch.txt:30-148`) sits between the added `## Styles` heading and the untouched `## Tokens` heading. |
| `rtl` | PASS | Case-insensitive grep of `guides/veneer.md` for `rtl` returns no matches anywhere in the file, including lines 73–187. |

The tokens list (full population, one row per hit):

| Line | Token | Followed by |
|---|---|---|
| 75 | `` `./styles` `` | `.` (period) |
| 135 | `` `tests/src/styles/fixtures/mixins.scss` `` | `,` (comma) |
| 164 | `` `src:core` `` | `,` (comma) |
| 164 | `` `src:browser` `` | `,` (comma) |
| 182 | `` `configs/src/tsconfig.styles.json` `` | `,` (comma) |

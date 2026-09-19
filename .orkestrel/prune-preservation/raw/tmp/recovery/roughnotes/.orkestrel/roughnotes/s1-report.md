# Unit S1 report — showcase workspace and the single-file page

Done. Every acceptance criterion closed. `demo/showcase.html` is self-contained: `dist/showcase`
holds that page and nothing else, and the Bootstrap Icons font files are inlined as data URIs.

## Touched files

| File                                  | Change                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `configs/app/vite.showcase.config.ts` | New. The trigger wrapper, byte-identical to the scaffold plan                               |
| `vite.config.ts`                      | Ported scaffold's `appShowcase` body and corrected the doc block; added the plugin import   |
| `package.json`                        | Added the `showcase`, `build:showcase`, and `show` scripts verbatim                         |
| `tests/conformance.test.ts`           | Replaced the superseded showcase assertions with the new truth and its controls         |
| `guides/README.md`                    | Ruled on the showcase sentence and added `## The single-file page`                          |
| `demo/showcase.html`                  | New. Build output, 1,076,089 bytes                                                          |

```text
 guides/README.md          | 30 +++++++++++++-
 package-lock.json         | 99 +++++++++++++++++++++++++++++++++++++++++++++++
 package.json              |  6 ++-
 tests/conformance.test.ts | 49 ++++++++++++++++++++---
 vite.config.ts            | 59 +++++++++++++++++++++++-----
 5 files changed, 224 insertions(+), 19 deletions(-)
```

`configs/app/vite.showcase.config.ts` and `demo/showcase.html` are untracked additions and carry no
diffstat row.

`package-lock.json` and the `vite-plugin-singlefile` line in `package.json` are the Orchestrator's
pre-existing install, kept as the dispatch directed.

## Failing-first proof

The brief's substantive change invalidated a plugin-list assertion and an inline-limit assertion in
`tests/conformance.test.ts`. I ran each against the ported configuration, in a throwaway
`tmp/probe/showcase-supersede.test.ts`, before rewriting them.

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project probe`

Failing names and readings:

- `superseded showcase assertions > carried the browser plugin list unchanged` — the showcase list
  carries `vite:singlefile` and `orkestrel-showcase-html` the browser list does not.
- `superseded showcase assertions > carried the browser inline limit unchanged` —
  `AssertionError: expected 4096 to be +0`.

Result before the rewrite: `Tests 2 failed | 4 passed (6)`. The 4 passing are a pre-existing
`tmp/probe` workbench file, not mine. I deleted my probe file after reading it.

Result after the rewrite: `npx vitest run --config vite.config.ts --no-cache --reporter=dot
--project conformance` → `Test Files 1 passed (1)`, `Tests 12 passed (12)`. Baseline before any
edit was the same count, so the file's proof count is unchanged and its content is not.

## Criteria

1. **Done.** `configs/app/vite.showcase.config.ts` exists at that exact path and casing, with the
   quoted content and LF endings. `scaffold audit` reads it `configs | content | aligned`, so its
   bytes match the plan.
2. **Done.** `package.json` carries `showcase`, `build:showcase`, and `show` verbatim, placed after
   `dev` where `src/core/compilers.ts` writes them.
3. **Done.** `npm run format:check` → exit 0, "All matched files use the correct format", 130 files.
4. **Done.** `npm run lint:check` → exit 0.
5. **Done.** `npm run check` → exit 0 across `tsc --project tsconfig.json`,
   `tsc -p configs/app/tsconfig.core.json`, and `vue-tsc -p configs/app/tsconfig.browser.json`. The
   root project has no `include`, so the new wrapper is typechecked.
6. **Done.** `npm run show` → exit 0. `demo/showcase.html` is 1,076,089 bytes.

   Complete `dist/showcase` listing, in bytes:

   ```text
   1076089  dist/showcase/index.html
   ```

   That is the whole directory. `cmp dist/showcase/index.html demo/showcase.html` reports the files
   identical.
7. **Done.** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project
   conformance` → `Test Files 1 passed (1)`, `Tests 12 passed (12)`.
8. **Done.** `npm run test:journey` → exit 0, `Test Files 4 passed (4)`,
   `Tests 76 passed | 4 skipped (80)`. `npx vitest list --project 'journey:*'` collects
   `journey:dark-1280`, `journey:dark-390`, `journey:light-1280`, and `journey:light-390`, which is
   the same set the pre-edit baseline collected.
9. **Done.** `npm run build` → exit 0. `dist/app/browser/assets/index-hhVhdyP4.css` is 323.24 kB,
   unchanged. The build also emits `bootstrap-icons-mSm7cUeB.woff2` at 134.04 kB,
   `bootstrap-icons-BeopsB42.woff` at 180.28 kB, `index-ysrKK32X.js` at 337.83 kB, and `index.html`
   at 0.40 kB — the ordinary build still writes every asset as its own file.
10. **Done with the standing rows only.** See § Audit rows.
11. **Done.** `git status --short` shows `guides/README.md`, `package.json`,
    `tests/conformance.test.ts`, `vite.config.ts`, `configs/app/vite.showcase.config.ts`, and
    `demo/` — every one owned — plus `package-lock.json` and `.orkestrel/roughnotes/s1-brief.md`,
    which are the Orchestrator's and which I did not touch.

## Is `demo/showcase.html` self-contained?

Yes. Measured on the built page, not inferred from the configuration:

- `<link>` tags: none. The stylesheet is an inline `<style rel="stylesheet" crossorigin>`.
- `<script>` tags: one, `<script type="module" crossorigin>`, with its body inline. No `src`
  attribute appears anywhere in the file.
- `url()` references: every one is a data URI. The Bootstrap and Bootstrap Icons images appear as
  `url("data:image/svg+xml,…")`, and the font files appear as `url(data:font/woff2;base64,…)`
  and `url(data:font/woff;base64,…)`. The external-font failure mode the brief flagged did not
  occur.
- No `/assets/` path and no relative asset path survives in the page.

The font inlining is not the `assetsInlineLimit: 4096` line. `vite-plugin-singlefile` sets
`config.build.assetsInlineLimit = () => true` while `useRecommendedBuildConfig` stays on, which
inlines every asset whatever its size. The 4096 line is inert in this workspace, exactly as the
ported comment says.

The page does carry external `https://` URLs, and none of them is an asset it loads to render. They
are the application's own outbound destinations — the `roughnotes.com` media kit documents, the
`shoppingcart.roughnotes.com` cart and billing pages — plus the `www.w3.org` XML namespace strings
inside the inlined SVG data URIs and a `vuejs.org` error-reference string inside the Vue runtime.

## Does it render?

Not judged here, as the brief directs. The reading for the Orchestrator: 1,076,089 bytes, one file,
one inline module script, one inline stylesheet, `<html lang="en" data-bs-theme="light">`, title
`Rough Notes`, and a `build-id` meta tag reading `2026-09-17T14:01:24.390Z`.

## Audit rows

`npx scaffold audit` exits 1. Every path row:

```text
1 of 41 planned paths drifted from the plan.
vite.config.ts | configs | content | stale
```

`vite.config.ts` stale is the brief's standing condition. Every other planned path reads `aligned`,
including `configs/app/vite.showcase.config.ts | configs | content | aligned`.

**The new config file reads as planned, not foreign.** `content` ownership means scaffold compared
its bytes against the plan and they matched, which also confirms scaffold derives this workspace
as a showcase workspace.

Every non-path question, each ruled:

| Field          | Message                                                     | Ruling                                                                                   |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `guides`       | `guides/test.md` differs from the hosted guide              | Standing condition named in the brief. Not mine                                          |
| `projects`     | The manifest names `journey:*`, which the plan does not register | Pre-existing. `git show 8f55c6d:package.json` carries `test:journey` at line 28         |
| `setup`        | `tests/setupBrowser.ts` has no covering proof               | Pre-existing. `git log -1 -- tests/setupBrowser.ts` is `c983a62`, not this unit          |
| `dependencies` | `@vitest/browser-playwright` declares major 4, registry serves 5 | Registry drift. This unit declared no dependency                                     |
| `dependencies` | `typescript` declares major 6, registry serves 7            | Registry drift. Not mine                                                                 |
| `dependencies` | `vitest` declares major 4, registry serves 5                | Registry drift. Not mine                                                                 |

The brief named the `guides` question as a standing condition. The `projects`, `setup`, and
`dependencies` questions it did not name are pre-existing by subject, with the evidence in the
preceding table. **Nothing newly drifted.**

## The guide ruling

**Ruling: this workspace has a single-file projection of the application, not a showcase of a public
API. The concept index's showcase column stays absent, and the reason it states stays true.**

`.claude/rules/documentation.md` defines a showcase as executable proof of public API, and pairs
that definition with the parity obligation: a missing demonstration is a missing feature. This
workspace publishes no library — no `src`, `"private": true`, no exports — so it has no exported
symbol to demonstrate and no parity obligation the column could carry. Adding the column would give
every row an empty cell, which the brief forbids and which would misreport what
`demo/showcase.html` proves.

What the sentence made false was narrower than the ruling: "The workspace builds no showcase" reads,
as of this unit, as "the workspace builds nothing called a showcase", which is false the moment
`show` exists and writes a file with that name. I rewrote the preamble to separate the column's subject
from the artifact's:

> Each row runs spec ↔ source ↔ tests. A showcase column proves public API, and this workspace
> publishes none, so that column is absent. The `demo/showcase.html` page the `show` script builds
> projects the application rather than demonstrating an exported symbol; see
> [The single-file page](#the-single-file-page) for what it is and what it carries.

I added `## The single-file page` before `## Directory index`, carrying what the `show` script does,
what the page contains and what it does not, the projection-versus-showcase distinction with its
rule citation, and how `appShowcase` composes. It states the inline-limit line is inert under
`useRecommendedBuildConfig`, because a reader who finds the 4096 otherwise concludes the fonts
inlined by size.

`npm run test:policy` → `Tests 101 passed | 1 skipped (102)`, so the prose sweep accepts the new
text.

## Choices I settled

- **The doc block wording.** The summary is "Builds the browser application as one page with its
  script and style inlined, written to its own output directory." — a third-person `-s` opening that
  does not name the symbol and is not a plural noun. I kept the boundary-replacement remark, which
  is still true, replaced the "restates neither the aliases, the plugins, nor the build options"
  clause with the list of what the projection actually declares and what still arrives from
  `appBrowser`, and replaced "No wrapper selects this configuration" — false as of this unit — with
  the wrapper that does select it and the `show` script that drives it. I added a paragraph for the
  `build-id` stamp.
- **How `tests/conformance.test.ts` expresses the new expectations.** I did not loosen anything. The
  plugin-list equality became a prefix-and-tail pair: every browser plugin reaches the showcase in
  the browser's own order, and the tail is exactly `SHOWCASE_PLUGINS`. That states composition more
  strictly than the equality it replaced, because it also pins the order. The inline-limit equality
  became the differing pair, 0 against `SHOWCASE_INLINE_LIMIT`. I added a loop proving the browser
  configuration carries neither showcase plugin, which is criterion 9's concern written as a test. I
  updated the existing `restated` control so it still discriminates both new readings, and I widened
  the plugin-count test's title to match what it already asserted before adding the showcase
  machinery counts to it.
- **The guide rewrite.** Covered in the preceding section.

## Observations, not criteria

- **The build stamp changes the committed file on every build.** `demo/showcase.html` carries
  `<meta name="build-id" content="…" />` with the build's ISO timestamp, so every `npm run show`
  produces a diff even where no source moved. The stamp is fixed-length, so the file size does not
  move with it. I ran `show` twice: once for the criterion-6 reading and once at the end, after
  `npm run build` had cleaned `dist/`, so the committed page and `dist/showcase/index.html` are
  identical as I leave them. The committed stamp is `2026-09-17T14:01:24.390Z`.
- **`npm run build` deletes `dist/showcase`.** The `clean` script removes the whole `dist` tree, so
  an ordinary build wipes the showcase output. `demo/showcase.html` is unaffected, which is why that
  copy is the artifact rather than the build directory.
- **`npm test` exits 1 on the standing vendored case, and only that one.** Per-project readings:
  `test:app` 43 files / 192 tests passed; `test:journey` 4 files / 76 passed, 4 skipped;
  `test:policy` 101 passed, 1 skipped; `test:config` 1 failed, 170 passed, 2 skipped, the failure
  being `configuration helpers > reads the compiler scope and fixed extractor override a declaration
  roll-up requires` throwing `The workspace declares no face project` at
  `tests/config.test.ts:2161`. The `&&` chain stops there, so I ran the rest alone: `test:setup`
  3 passed, `test:conformance` 12 passed.
- **`tests/config.test.ts` validates the new wrapper and passes on it.** Its
  `requires and validates every selected target wrapper` proof loads
  `configs/app/vite.showcase.config.ts` and checks the resolved output is `dist/showcase`.
- **No `deprecat` line in any log.** Checked `s1-show.log.txt`, `s1-show2.log.txt`,
  `s1-build.log.txt`, `s1-journey.log.txt`, and `s1-test.log.txt`.
- **The showcase build transforms 135 modules against the ordinary build's 136.** Both builds
  succeed and `enforceBuildLog` accepted both.

## Deviation state

No deviation. No off-limits file was read into a change, and no stop condition fired. Nothing is
left open inside this unit's scope.

Logs retained under `.orkestrel/roughnotes/`: `s1-show.log.txt`, `s1-show2.log.txt`, `s1-build.log.txt`,
`s1-journey.log.txt`, `s1-test.log.txt`, `s1-audit.log.txt`, `s1-audit-rows.txt`.

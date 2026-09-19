I'll read the brief first, then collect the evidence it asks for.The brief is a read-only map of original Roughnotes edits onto the recovery checkout. I’ll load the required law files, then compare the named original and recovery paths.Named reports are in place; the adopt metadata path is still missing. Next I’ll take scoped git status/diffs and compare the original dirty files to their recovery counterparts.Shell git was denied in this sandbox. I’ll keep going with source reads: git refs, the named reports, and the original vs recovery files.## Question

Map exact original Roughnotes edits onto the accepted recovery checkout, and name the records and paths final registry adoption must preserve.

## Evidence

Live `git status` / `git diff` / `git log` in this sandbox were **denied** (empty rejection). HEAD and branch came from git refs. Recovery dirty set came from retained status files, not a live porcelain run.

**Repositories.** Original `C:/Users/mikes/WebstormProjects/roughnotes/.git/HEAD` is `refs/heads/main`; `refs/heads/main` is `86a9ef6bc4620fdf36c47af1f4c530693357eb86`. Recovery `.git` is a worktree pointer to `C:/Users/mikes/WebstormProjects/roughnotes/.git/worktrees/roughnotes`; that HEAD is `refs/heads/recovery/journey-20260918`, and that ref is the same `86a9ef6bc4620fdf36c47af1f4c530693357eb86`.

**Original dirty paths the brief named still exist** under original `app/browser/`, `guides/README.md`, and `tests/app/browser/`. Recovery retained status (`tmp/recovery/roughnotes/tmp/units/r-b-status-11.txt`, `tmp/units/r-b-gates-evidence/final-status.log.txt`) carries those application files and a larger test/config set: `package.json`, `vite.config.ts`, the component test files, `integration.test.ts`, `conformance.test.ts`, deleted `tests/app/browser/setup.ts` and `setup.test.ts`, modified `tests/setupBrowser.ts`, untracked `tests/setupBrowser.test.ts`. `package-lock.json` and `configs/` are absent from that dirty list.

### Original edit → recovery counterpart

| Original path | Recovery counterpart | Content relationship |
| --- | --- | --- |
| `app/browser/App.vue` | same path | **Not preserved byte-for-byte.** Original menu Get started announces `buildName(COPY.started, COPY.menu)` (`App.vue:248`). Recovery announces `buildName(COPY.started, COPY.site)` (`App.vue:242`). Original keeps the journey-layer name-split comment (`App.vue:55-59`) and the older `hideMenu` comment (`App.vue:70-73`); recovery drops the split comment (`App.vue:55`) and rewrites `hideMenu` (`App.vue:65-67`). Masthead `startedLabel` still uses `COPY.site` in each tree. |
| `app/browser/components/HomeView.vue` | same path | Read texts matched. Get started names stay `COPY.introduction` and `COPY.join`. Hash not computed (shell denied). |
| `app/browser/components/MagazineView.vue` | same path | Read texts matched. |
| `app/browser/components/MediaView.vue` | same path | Read texts matched. |
| `app/browser/components/ProductsView.vue` | same path | Read texts matched. |
| `app/browser/constants.ts` | same path | Read texts matched. `NAV_ITEMS` / `MENU_ITEMS` / `COPY` are the same. |
| `guides/README.md` | same path | **Superseded prose on the same path.** Original documents `Get started, Site` vs `Get started, Menu` and `tests/app/browser/setup.ts` (`guides/README.md:141-155`, `:412`). Recovery documents every copy as `Get started, Site`, `tests/setupBrowser.ts`, `CAPTURE=1`, awaited theme, and the rejection recorder (`guides/README.md:141-159`, `:407-484`). Governing Roughnotes guide is this file; there is no `guides/roughnotes.md`. |
| `tests/app/browser/App.test.ts` | same path | **Same path, recovery rewrite.** Original imports from `./setup.js` and local `readRefusal` (`App.test.ts:22-40`). Recovery imports from `../../setupBrowser.js` and published `readHit` / `readPerception` / `readRefusal` (`App.test.ts:4-41`). Get started rank proof remains; recovery uses `control.matches('.btn-primary')` (`App.test.ts:155-165`) where original uses `classList.contains` (`App.test.ts:177-187`). |
| `tests/app/browser/helpers.test.ts` | same path | **Same path, recovery rewrite of the storage stub.** `buildName(COPY.started, COPY.site)` is `'Get started, Site'` in each (`helpers.test.ts:51`). Original constructs `new PermissionStorage` from `./setup.js` (`helpers.test.ts:30`, `:83`). Recovery uses published `createStorage` from `@orkestrel/test/browser` (`helpers.test.ts:1`, `:83-87`). |
| `tests/app/browser/setup.ts` | **superseding path** `tests/setupBrowser.ts` | Original helper is still at `tests/app/browser/setup.ts` and still lists `'Get started, Menu'` in `SHELL_NAMES` (`setup.ts:1003`). Recovery **deletes** that path (`r-b-status-11.txt:39-40`) and relocates/evolves the helper into `tests/setupBrowser.ts`, where `SHELL_NAMES` uses `'Get started, Site'` for the menu action (`setup.ts:593`). Original committed `tests/setupBrowser.ts` is only the Bootstrap/CSS stub (`tests/setupBrowser.ts:1-5`); recovery keeps that stub as the prefix (`tests/setupBrowser.ts:1-3`) then appends the helper. |
| `tests/app/browser/setup.test.ts` (present in original; not in the brief’s dirty list) | **superseding path** `tests/setupBrowser.test.ts` | Original `setup.test.ts` is a short `readRefusal` / `buildMarkControl` file. Recovery deletes it and adds untracked `tests/setupBrowser.test.ts` (direct `applyTheme`, menu lifecycle). |

Recovery also rewires every `tests/app/browser/**` consumer from `./setup.js` / `../setup.js` to `../../setupBrowser.js` / `../../../setupBrowser.js`. That set is recovery-only relative to the original dirty list.

`vite.config.ts` is original-clean in the brief and recovery-dirty: recovery adds `setupBrowser()` and the `setup:browser` project (`vite.config.ts:266-282`, `:325`). Original `setup()` already excludes `tests/setupBrowser.test.ts` (`vite.config.ts:254`) but has no `setupBrowser` factory (`vite.config.ts:301-306`). `configs/app/vite.journey.config.ts` read texts matched; recovery status does not mark `configs/`.

### Package pins (declared / resolved / installed)

**Original `package.json`:** `@orkestrel/scaffold` `^0.0.74`, `@orkestrel/test` `^0.0.17`. No `test:setup:browser`.

**Recovery working `package.json` (dirty):** `@orkestrel/scaffold` `^0.0.74`, `@orkestrel/test` `^0.0.18`. Adds `test:setup:browser` and chains it in `test` (`package.json:24`, `:35`, `:53-54`).

**Tracked `package-lock.json` (original and recovery lock `packages[""]`):** still `@orkestrel/scaffold` `^0.0.74` and `@orkestrel/test` `^0.0.17` (`package-lock.json:20-21`). Node versions: scaffold `0.0.74` resolved `https://registry.npmjs.org/@orkestrel/scaffold/-/scaffold-0.0.74.tgz` integrity `sha512-t4tBPBRq1NXIJaEJwdE7NK8xff7yNqihmL44fFwaqyhotC9K5LlcXWe2oGEWRkY+GQ0Vnr9nL11iQ25oUZEuBg==`; test `0.0.17` resolved `…/test-0.0.17.tgz` integrity `sha512-+t/IBca6LhypfLMWMVTaW5Dz6hB3cajJltq6IhEd0If6lrcYSDOs4IMTnkFOCL6QYwRcB1jRl+nOibQkpMPSXg==`. Recovery lock has **no** `0.0.75` or `0.0.18` version rows. Recovery status does not list the lockfile as modified.

**Original installed:** `node_modules/@orkestrel/scaffold/package.json` version `0.0.74`; `node_modules/@orkestrel/test/package.json` version `0.0.17`. Original `node_modules/.package-lock.json` matches the registry 0.0.74 / 0.0.17 resolved URLs.

**Recovery installed:** `node_modules/@orkestrel/scaffold/package.json` version `0.0.75` (its own `devDependencies.@orkestrel/test` is `^0.0.18`). `node_modules/@orkestrel/test/package.json` version `0.0.18`. Recovery `node_modules/.package-lock.json`: scaffold `0.0.75` resolved `file:../../release/packages/orkestrel-scaffold-0.0.75.tgz` integrity `sha512-PiLyCAO4q6hpZnpUH3SDS4KFqhYpTc7A3x0BjsVOfWILMiqJJXOaKKG6d81ezLOFmwwjwyhn99/gK+jkYdobqg==`; test `0.0.18` resolved `https://registry.npmjs.org/@orkestrel/test/-/test-0.0.18.tgz` integrity `sha512-G2i/aAxCWgydoDhvQdv77ziU2mGAzR5XvV5skfGuH0EDZV5/e5Ze9r4iP4Es6S7CUlikTbl4eIr0QyHQ0yPrNw==`. Matching versions are not matching package bytes: this installed scaffold is a local file tarball, not the lockfile’s registry 0.0.74 tarball.

**Named adopt file** `tmp/release/adopt-scaffold-0.0.75.metadata.json` **does not exist**. Present instead: `tmp/release/adopt-scaffold-0.0.75-metadata.json` with `range: ^0.0.74`, `installed: 0.0.74`, `archive: 6815C4CA8145E2073B2E51C7E93F3105ABA5D6F9FFAA0DC2CD10E3A23FE7CBFC`. That `installed: 0.0.74` field does not match recovery’s installed `package.json` version `0.0.75`. Campaign `refreshed-pack-unit/acceptance.md` names that SHA256 as the historical `c50efef0` archive. `tmp/release/packages/` returned no files to this search.

**Refreshed (not installed in recovery) pack:** `tmp/release/refreshed-pack/metadata.json` commit `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`, SHA256 `3FEB4860C55C64BB1136FA366757B99CD0F34C169D842E46C46A9BF53787A9A3`, `bytes: 2505962`. Distinct from the historical archive hash. No publication was read.

Gates report (`r-b-gates-report.md:11-16`) records installed scaffold `0.0.75` and test `0.0.18` against frozen successor11. Final audit (`r-b-final-audit-verdict.md:7-9`) leaves registry pin/lock restoration open. Recovery checkpoint (`recovery-checkpoint.md:5`) says the checkout still uses the historical local `c50efef0` archive.

### Preservation records adoption must keep

- Original working tree `C:/Users/mikes/WebstormProjects/roughnotes` (user-owned dirty `App.vue` Menu name, `guides/README.md` Menu split, `tests/app/browser/setup.ts`).
- Recovery worktree `C:/Users/mikes/WebstormProjects/scaffold/tmp/recovery/roughnotes` on `recovery/journey-20260918`.
- Frozen successor11: `tmp/recovery/roughnotes/tmp/units/r-b-report-11.md`, `r-b-status-11.txt`, `r-b-diffstat-11.txt`, `r-b-frozen-hashes-11.tsv`, `r-b-actual-11.diff`, `r-b-new-setup-proof-11.diff`, `r-b-shared-11.diff`, `r-b-gates-report.md`, `r-b-gates-evidence/`.
- Canonical: `.orkestrel/campaign/r-b-final-audit-verdict.md`, `r-b-final-capture-report.md`, `recovery-checkpoint.md`.
- Adopt/pack identity: `tmp/release/adopt-scaffold-0.0.75-metadata.json`, `adopt-scaffold-0.0.75.log.txt`, `tmp/release/refreshed-pack/metadata.json`.
- Capture portfolio path named by checkpoint: `tmp/capture-retained/r-b-final-capture` (PNGs unread; off-limits).

`AGENTS.md` in original and recovery are the same scaffold pointer (`AGENTS.md:1-27`).

## Distillate

Recovery is the same commit as original `main` (`86a9ef6`) with a **different working tree**. Home, Magazine, Media, Products, and `constants.ts` matched on read. `App.vue` did not: original still names the menu Get started `Get started, Menu`; recovery replaced that with `Get started, Site` and rewrote the guide and `SHELL_NAMES` to match. The original helper `tests/app/browser/setup.ts` is not copied aside; recovery deletes it and supersedes it with `tests/setupBrowser.ts` plus `tests/setupBrowser.test.ts`. `App.test.ts` and `helpers.test.ts` keep their paths but recovery rewrote imports and the permission-storage stub onto published `@orkestrel/test` APIs.

Declared scaffold remains `^0.0.74` in each manifest. Declared test is `^0.0.17` in original and `^0.0.18` in recovery working `package.json`. Resolved lock in each tree is still registry scaffold `0.0.74` and test `0.0.17`. Installed original is registry `0.0.74` / `0.0.17`. Installed recovery is local-file scaffold `0.0.75` plus registry test `0.0.18`, which disagrees with the tracked lock. The dotted adopt metadata path is missing; the hyphenated file and campaign reports identify the historical archive as SHA256 `6815C4CA…`, distinct from refreshed-pack `3FEB4860…`. Registry adoption still has to restore pin/lock without treating those version labels as byte identity, and without overwriting the original Menu-named `App.vue` unless a later unit explicitly chooses the recovery replacement.

## Unknowns

- Live original and recovery `git status` / `git diff` (shell denied). Original dirty set is the brief plus source reads; recovery dirty set is retained `r-b-status-11.txt` / `final-status.log.txt`.
- Byte hashes for the view/`constants.ts` pairs that matched on read.
- Whether original `package.json` / `vite.config.ts` / lock / `configs/` are dirty (brief omitted them; live status unread).
- Presence of `tmp/release/packages/orkestrel-scaffold-0.0.75.tgz` on disk (search returned no files).
- Registry packuments (brief: do not infer publication).
- Journal file was not written (ask/read-only).

## Journal

`tmp/cursor/roughnotes-integration-map.jsonl` — **not written**. Ask/read-only session; no mutation.

## Deviation

Shell git was denied; mapping continued from refs, source reads, lockfiles, installed manifests, and retained reports. Named path `tmp/release/adopt-scaffold-0.0.75.metadata.json` is missing; hyphenated `adopt-scaffold-0.0.75-metadata.json` was read instead. No model/auth failure. No mutation required beyond the unwritten journal.
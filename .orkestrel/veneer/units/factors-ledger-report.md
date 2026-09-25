# Unit FACTORS-LEDGER report

## Item 1 — before and after

Before:
> ratio give, which is the release's duration wherever Veneer keeps that duration. § Departures
> records each scaled duration that differs from the release's, such as the `.icon-link` transform's.

After:
> ratio give, which is the release's duration wherever Veneer keeps that duration. § Departures or §
> Additions records each scaled duration that differs from the release's, such as the `.icon-link`
> transform's in § Departures and the modal host's in § Additions.

Edited in `/home/user/veneer/guides/veneer.md` (around line 7182-7183). No other word in the paragraph changed; the re-wrap at 100 columns only reflows the sentence's line breaks.

## Gate table

| Gate | Command | Log | Exit |
| --- | --- | --- | --- |
| oxfmt check | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check guides/veneer.md` | `/home/user/veneer/tmp/units/fl-oxfmt.log.txt` | 0 |
| test:guides | `npm run test:guides` (26 tests passed) | `/home/user/veneer/tmp/units/fl-test-guides.log.txt` | 0 |
| test:policy | `npm run test:policy` (109 passed, 1 skipped) | `/home/user/veneer/tmp/units/fl-test-policy.log.txt` | 0 |

## Delta

`/home/user/veneer/tmp/units/fl-delta.diff` (against backup `/home/user/veneer/tmp/units/fl-veneer.md.bak`):

```diff
--- tmp/units/fl-veneer.md.bak
+++ guides/veneer.md
@@ -7179,8 +7179,9 @@
 release's literals as their own sections record. A scaled duration reads a `--vn-motion-*` token,
 alone or scaled by a fixed ratio, so it doubles from its own resting value at a factor of `2` and
 starts no transition at a factor of `0`. At a factor of `1`, it resolves to the value its token and
-ratio give, which is the release's duration wherever Veneer keeps that duration. § Departures
-records each scaled duration that differs from the release's, such as the `.icon-link` transform's.
+ratio give, which is the release's duration wherever Veneer keeps that duration. § Departures or §
+Additions records each scaled duration that differs from the release's, such as the `.icon-link`
+transform's in § Departures and the modal host's in § Additions.
 
 A factor takes effect where the scale it multiplies is declared. Veneer declares the scales on the
 `:root` selector, so a factor set on the root element rescales the document. A subtree that sets a
```

Full report also written to `/home/user/veneer/tmp/units/fl-report.md`.

No deviation. Evidence readings matched the brief before editing: the closing sentence named only § Departures with the `.icon-link` example, and § Tokens › § Additions held the `modal` row's `.modal { transition }` with the Veneer value referencing `--vn-motion-panel`. Only the owned sentence and its paragraph re-wrap changed; no other line touched.

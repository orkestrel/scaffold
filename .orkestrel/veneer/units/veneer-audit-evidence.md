# Review evidence — `@orkestrel/veneer` at `a04fb7c` (rendered 2026-09-22)

## Status

```text
HEAD a04fb7c03e5d6f108193fa12221fd966df432f1a
(empty status = clean)
```

## Diffstat of the rebuilt package against the deletion commit `2a8a58d` (its parent `fc36cec` held the legacy tree)

```text
 217 files changed, 156987 insertions(+), 1803 deletions(-)
 105 files changed, 11807 insertions(+), 199 deletions(-)
```

## Tracked files

```text
app/browser/Showcase.ts
app/browser/constants.ts
app/browser/index.html
app/browser/index.ts
app/browser/main.ts
app/browser/public/favicon.svg
app/browser/public/icons.svg
app/browser/sections/ButtonSection.ts
app/browser/sections/ContentSection.ts
app/browser/sections/LayoutSection.ts
app/browser/sections/LinkSection.ts
app/browser/sections/MediaSection.ts
app/browser/sections/SpecimenSection.ts
app/browser/sections/TableSection.ts
app/browser/sections/TypeSection.ts
app/browser/styles/_shell.scss
app/browser/styles/index.scss
app/browser/types.ts
configs/app/tsconfig.browser.json
configs/app/vite.browser.config.ts
configs/app/vite.journey.config.ts
configs/app/vite.showcase.config.ts
configs/browsers.ts
configs/helpers.ts
configs/policy.ts
configs/src/tsconfig.browser.json
configs/src/tsconfig.core.json
configs/src/tsconfig.styles.json
configs/src/vite.browser.config.ts
configs/src/vite.core.config.ts
configs/src/vite.styles.config.ts
guides/README.md
guides/guide.md
guides/scaffold.md
guides/veneer.md
src/browser/Button.ts
src/browser/ColorMode.ts
src/browser/Delegate.ts
src/browser/constants.ts
src/browser/helpers.ts
src/browser/index.ts
src/browser/types.ts
src/browser/validators.ts
src/core/constants.ts
src/core/errors.ts
src/core/index.ts
src/core/types.ts
src/styles/_mixins.scss
src/styles/_reset.scss
src/styles/_theme.scss
src/styles/_tokens.scss
src/styles/components/_button.scss
src/styles/components/_container.scss
src/styles/components/_grid.scss
src/styles/components/_icon-link.scss
src/styles/components/_image.scss
src/styles/components/_link.scss
src/styles/components/_list.scss
src/styles/components/_quote.scss
src/styles/components/_ratio.scss
src/styles/components/_table.scss
src/styles/components/_type.scss
src/styles/components/_vr.scss
src/styles/elements/_a.scss
src/styles/elements/_abbr.scss
src/styles/elements/_address.scss
src/styles/elements/_b.scss
src/styles/elements/_blockquote.scss
src/styles/elements/_body.scss
src/styles/elements/_button.scss
src/styles/elements/_code.scss
src/styles/elements/_details.scss
src/styles/elements/_dl.scss
src/styles/elements/_fieldset.scss
src/styles/elements/_figure.scss
src/styles/elements/_heading.scss
src/styles/elements/_hr.scss
src/styles/elements/_html.scss
src/styles/elements/_iframe.scss
src/styles/elements/_img.scss
src/styles/elements/_input.scss
src/styles/elements/_kbd.scss
src/styles/elements/_label.scss
src/styles/elements/_mark.scss
src/styles/elements/_ol.scss
src/styles/elements/_optgroup.scss
src/styles/elements/_output.scss
src/styles/elements/_p.scss
src/styles/elements/_pre.scss
src/styles/elements/_progress.scss
src/styles/elements/_samp.scss
src/styles/elements/_select.scss
src/styles/elements/_small.scss
src/styles/elements/_strong.scss
src/styles/elements/_sub.scss
src/styles/elements/_sup.scss
src/styles/elements/_svg.scss
src/styles/elements/_table.scss
src/styles/elements/_textarea.scss
src/styles/elements/_tr.scss
src/styles/elements/_ul.scss
src/styles/elements/_var.scss
src/styles/index.scss
src/styles/index.ts
src/styles/utilities/_gap.scss
tests/app/browser/Showcase.test.ts
tests/app/browser/index.test.ts
tests/app/browser/integration.test.ts
tests/app/browser/sections/ButtonSection.test.ts
tests/app/browser/sections/ContentSection.test.ts
tests/app/browser/sections/LayoutSection.test.ts
tests/app/browser/sections/LinkSection.test.ts
tests/app/browser/sections/MediaSection.test.ts
tests/app/browser/sections/SpecimenSection.test.ts
tests/app/browser/sections/TableSection.test.ts
tests/app/browser/sections/TypeSection.test.ts
tests/conformance.test.ts
tests/distribution.test.ts
tests/fixtures/oracle/button.json
tests/fixtures/oracle/inventory.json
tests/guides.test.ts
tests/setup.test.ts
tests/setup.ts
tests/setupBrowser.test.ts
tests/setupBrowser.ts
tests/setupConformance.test.ts
tests/setupConformance.ts
tests/setupListeners.ts
tests/setupStyles.test.ts
tests/setupStyles.ts
tests/src/browser/Button.test.ts
tests/src/browser/ColorMode.test.ts
tests/src/browser/Delegate.test.ts
tests/src/browser/helpers.test.ts
tests/src/browser/index.test.ts
tests/src/browser/validators.test.ts
tests/src/core/errors.test.ts
tests/src/core/index.test.ts
tests/src/styles/components/button.test.ts
tests/src/styles/components/container.test.ts
tests/src/styles/components/grid.test.ts
tests/src/styles/components/icon-link.test.ts
tests/src/styles/components/image.test.ts
tests/src/styles/components/link.test.ts
tests/src/styles/components/list.test.ts
tests/src/styles/components/quote.test.ts
tests/src/styles/components/ratio.test.ts
tests/src/styles/components/table.test.ts
tests/src/styles/components/type.test.ts
tests/src/styles/components/vr.test.ts
tests/src/styles/elements/a.test.ts
tests/src/styles/elements/abbr.test.ts
tests/src/styles/elements/address.test.ts
tests/src/styles/elements/b.test.ts
tests/src/styles/elements/blockquote.test.ts
tests/src/styles/elements/body.test.ts
tests/src/styles/elements/button.test.ts
tests/src/styles/elements/code.test.ts
tests/src/styles/elements/details.test.ts
tests/src/styles/elements/dl.test.ts
tests/src/styles/elements/fieldset.test.ts
tests/src/styles/elements/figure.test.ts
tests/src/styles/elements/heading.test.ts
tests/src/styles/elements/hr.test.ts
tests/src/styles/elements/html.test.ts
tests/src/styles/elements/iframe.test.ts
tests/src/styles/elements/img.test.ts
tests/src/styles/elements/input.test.ts
tests/src/styles/elements/kbd.test.ts
tests/src/styles/elements/label.test.ts
tests/src/styles/elements/mark.test.ts
tests/src/styles/elements/ol.test.ts
tests/src/styles/elements/optgroup.test.ts
tests/src/styles/elements/output.test.ts
tests/src/styles/elements/p.test.ts
tests/src/styles/elements/pre.test.ts
tests/src/styles/elements/progress.test.ts
tests/src/styles/elements/samp.test.ts
tests/src/styles/elements/select.test.ts
tests/src/styles/elements/small.test.ts
tests/src/styles/elements/strong.test.ts
tests/src/styles/elements/sub.test.ts
tests/src/styles/elements/sup.test.ts
tests/src/styles/elements/svg.test.ts
tests/src/styles/elements/table.test.ts
tests/src/styles/elements/textarea.test.ts
tests/src/styles/elements/tr.test.ts
tests/src/styles/elements/ul.test.ts
tests/src/styles/elements/var.test.ts
tests/src/styles/fixtures/mixins.scss
tests/src/styles/index.test.ts
tests/src/styles/integration.test.ts
tests/src/styles/mixins.test.ts
tests/src/styles/reset.test.ts
tests/src/styles/theme.test.ts
tests/src/styles/tokens.test.ts
tests/src/styles/utilities/gap.test.ts
```

## Gate readings (Orchestrator, this host)

From the lockfile alone (`.orkestrel/veneer/units/veneer-baseline.log.txt`): format:check 0, lint:check 0, check 2, build 0, test 1 (Test helpers missing).

With the Test tip tarball (`.orkestrel/veneer/units/veneer-baseline-2.log.txt`, `veneer-projects.log.txt`):

```text
format:check exit=0 (12:56:15)
lint:check exit=0 (12:56:17)
check exit=0 (12:56:28)
build exit=0 (12:56:38)
test exit=1 (12:56:53)
test:src:core exit=0 (12:57:48)
test:src:browser exit=1 (12:58:02)
test:src:styles exit=0 (12:58:56)
test:app exit=0 (12:59:16)
test:journey exit=0 (13:00:01)
test:policy exit=0 (13:00:04)
test:config exit=0 (13:00:10)
test:setup exit=0 (13:00:20)
test:setup:browser exit=0 (13:00:36)
test:conformance exit=0 (13:00:42)
test:guides exit=0 (13:00:44)
```

The two `src:browser` failures: `tests/src/browser/Button.test.ts` "dispatches the completed state once as a bubbling non-cancelable event" and `tests/src/browser/helpers.test.ts` "dispatches the supplied type and detail synchronously through the parent", both `expect(event.target).toBe(host)` receiving `null` after dispatch on a detached host (`.orkestrel/veneer/units/event-target-probe.md`).

## Executed probes

See `probe-engine.log.txt` (claims 3, 4, 5, 10) and `important-census.log.txt` (claim 8) beside this file.

# Writes the round-1 audit lane briefs and the Astra launcher for PAGE-FRAME (`pf`) and BCF (`bcf`), derived from
# cl-audit-briefs.py with every subject field rewritten for the units cut from dc92a09.
# Usage: python3 pb-audit-briefs.py <unit keys>; the keys are pf, bcf, xo, ct, fr, fo, fu, ff, fp, lc, and pl
import pathlib, sys

U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
UNITS = {
    'pf': dict(
        name='PAGE-FRAME', worktree='/home/user/veneer-pf', base='dc92a09',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the design verdict `pf-design-verdict.md` (R1 to R9) and the two design proposals beside it, the brief `b-cross-pf-brief.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base `FrameManager` class in `tests/setupBrowser.ts` and the installed `captureFrame`, `measureContent`, `stagePane`, and `releasePane` functions (`node_modules/@orkestrel/test/dist/src/browser/index.js`)',
        evidence='`pf.diff`, `pf-status.txt`, `pf-shared.patch`, `b-cross-pf-report.md`, `pf-instruments/` (`pf-mutations.log.txt`, `pf-mutations.sh`, `pf-mutate.py`, the `pf-mutation-*.log.txt` logs, `pf-red-setup-browser.log.txt`, `pf-green-setup-browser.log.txt`, `pf-gates.sh` and `pf-gates.log.txt`, `pf-capture.sh` and the `pf-capture-*.log.txt` logs, `pf-frames.log.txt`, `pf-png.py`, and the `pf-heights-*` readings and probe copies), and the frames under `/home/user/veneer-pf/tmp/capture/states/` (`bottom-offcanvas--light-390.png`, `showcase--light-1280.png`, `primary-hover--light-1280.png`, `page-strip-focus--light-390.png`, `range-focus--light-390.png`, and any other frame a claim names)',
        subject='the harness mechanism, the proofs, the placements, and the prose against the design verdict and the base class it changes',
        analyst='claims 2, 3, 4, and 6 (the bounding and its restoration, the settled geometry, the area guard, and the capture readings against the mutations and logs)',
        reviewer='claims 5 (the placements, and whether each frame shows what the scenario claims — open the frames), 6 (the frames the report names), and 7 (every rewritten TSDoc, comment, and guide sentence against what ships, and the writing rule)',
        checker='claims 1, 7, and 8'),
    'bcf': dict(
        name='BCF', worktree='/home/user/veneer-bcf', base='dc92a09',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,documentation,writing,architecture,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (rows V2 to V6, V14, and V18) with the lens returns `bc-verify-lenses.json` and `bc-verify-lenses-2.json`, the brief `b-collapse-bcf-brief.md`, the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts`, and the `dropdown-menu-hover` and `dropdown-menu-focus` scenarios in `tests/app/browser/integration.test.ts`',
        evidence='`bcf.diff`, `bcf-status.txt`, `bcf-shared.patch`, `b-collapse-bcf-report.md`, `bcf-instruments/` (`bcf-mutations.log.txt`, `bcf-mutate.py`, the `bcf-mutation-*.log.txt` and `bcf-mutate-*.out.txt` logs, the V2 probe logs and instruments, the `bcf-v14-*` readings, `bcf-red-sections.log.txt`, `bcf-green-sections.log.txt`, `bcf-gates.sh` and `bcf-gates.log.txt`, `bcf-capture.sh` and the `bcf-capture-*.log.txt` logs, and `bcf-guide-searches.txt`), and the frames under `/home/user/veneer-bcf/tmp/capture/states/` (the `navbar-scroll`, `navbar-inverted`, `navbar-inverted-class`, `nav-tabs`, `dropdown-*`, `accordion-last-expanded`, `navbar-with-open-menu`, `nav-underline-hover`, and `nav-underline-focus` frames at each variant)',
        subject='the specimens, the driven scenarios, the frames, and the guide against the verify verdict\'s rows',
        analyst='claims 2, 3, 4, 5, 6, and 7 (the V2 probe and its red runs, each proof against its mutation, the V14 readings, and the derivation)',
        reviewer='claims 2 to 5 and 8 (open every frame the report names and rule whether it shows the row it closes; the specimens\' and labels\' fit), and the guide sentences',
        checker='claims 1, 8, and 9'),
    'xo': dict(
        name='CLOSE-OUT', worktree='/home/user/veneer-xo', base='ec98064',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the brief `b-close-out-brief.md`, the Veneer `ROADMAP.md` § Carriers rows naming CLOSE-OUT (read at `ec98064`), the B-MODAL design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (its CLOSE-OUT row), and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base `tests/setupStyles.ts`, `src/styles/_mixins.scss` and its `breakpoint` functions, the base `CarouselSection.test.ts` and `ToastSection.test.ts`, and the base `tests/guides.test.ts`',
        evidence='`xo.diff`, `xo-status.txt`, `xo-shared.patch`, `xo-unscoped.patch`, `b-close-out-report.md`, and `xo-instruments/` (`xo-mutations.log.txt` and every `xo-mutation-*` log, the `xo-red-*` and `xo-green-*` logs, `xo-byte-equality.log.txt` and `xo-dist-base.sha256.txt`, `xo-ledger-obligation-key.log.txt`, the `xo-gate-*` and `xo-scratch-*` logs, `xo-field-scan.py` with its readings, and the instruments beside them)',
        subject='the retired deferral, the heading function, the derived and frozen case populations, the ledger assertion, the region order, and the prose against the brief',
        analyst='claims 2, 3, 4, 5, and 6 (each proof against its mutation, the byte equality, and the ledger premise against the proof steps)',
        reviewer='claims 3 (the function\'s name and placement), 6 (the premise ruling), 7 (the order rule and the regions it moves), and 8 (the prose)',
        checker='claims 1, 7, and 8'),
    'ct': dict(
        name='THEME', worktree='/home/user/veneer-ct', base='2bf1142',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (X1, X2, X3, X11, X12), the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V10 to V12), the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (P4), the briefs `b-cross-ct-brief.md` and `b-cross-ct-brief-2.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base `src/styles/_tokens.scss` and `_theme.scss`, the base `collectAdditions` function in `tests/setupServer.ts`, the release stylesheet `node_modules/bootstrap/dist/css/bootstrap.css`, and the base section classes under `app/browser/sections/`',
        evidence='`ct.diff`, `ct-status.txt`, `ct-shared.patch`, `ct-unscoped.patch`, `b-cross-ct-report.md`, and `ct-instruments/` (`ct-mutations.log.txt`, `ct-mutations-round-1.log.txt`, the `ct-mutation-*` logs and instruments, the `ct-red-*`, `ct-v13-red-theme.log.txt`, and `ct-fix-*` logs, `ct-gates.sh` and the `ct-gate-*` logs, the ledger print and dump, the X12 instruments and readings, the V11 and V13 probes and their logs, `ct-color.mjs.txt`, and `ct-rebuild.py`)',
        subject='the dark roles, the role tiers, the link hover, the theme key and its ledger, the registry rule, and the Color modes section against the briefs and the release',
        analyst='claims 2, 3, 4, 5, and 6 (each resolved value against the release stylesheet, each proof against its mutation, the ledger against the gate, and the X12 measurement)',
        reviewer='claims 4 (the literals and their comments), 7 (the section, its specimens, and its frame), and 8 (the prose, the repeated walk, and the V11 ruling)',
        checker='claims 1, 7, and 8'),
    'fr': dict(
        name='FORMS-FRAMES', worktree='/home/user/veneer-fr', base='e4a6d7c',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P10 and P15) with the lens returns `pv-forms-lenses.json`, the brief `b-forms-frames-brief.md`, the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base forms specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), and the installed `driveHold` and `traverseAccessible` functions (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`)',
        evidence='`fr.diff`, `fr-status.txt`, `fr-shared.patch`, `b-forms-frames-report.md`, `fr-instruments/` (`fr-mutations.log.txt`, `fr-mutate.sh`, `fr-mutate-scratch.sh`, `fr-p10-readings.log.txt`, the `fr-p10-red` and `fr-p10-green` logs, the `fr-sections-red` and `fr-sections-green` logs, `fr-journey-red.log.txt`, the `fr-gate-*` logs, the `fr-capture-*-final` logs, `fr-conformance.log.txt`, and `fr-cases.ts.txt`), and the frames under `/home/user/veneer-fr/tmp/capture/states/` (`form-check-switch-focus`, `form-check-box-active`, `range-active`, `form-control-file-hover`, `form-floating-empty-textarea-focus`, `input-group-buttons-focus`, `valid-select-focus`, `invalid-select-focus`, `valid-check-focus`, `invalid-check-focus`, and the resting specimens the report names, each at `light-1280` and `dark-390`)',
        subject='the specimens, the driven scenarios, the frames, and the guide against the portfolio verdict\'s P10 and P15 rows',
        analyst='claims 2, 3, 4, 5, and 7 (each proof against its mutation and its red run, the pixel reading, and the derived populations)',
        reviewer='claims 3, 5, 6, and 8 (open every frame the report names and rule whether it shows the state it closes; the specimens\' labels and fit), and the guide sentences',
        checker='claims 1, 7, and 9'),
    'fo': dict(
        name='OVERLAY-FRAMES', worktree='/home/user/veneer-fo', base='cf5e447',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P11, P12, and P16) with the lens returns `pv-overlays-lenses.json`, the brief `b-overlay-frames-brief.md`, the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V7), the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base overlay specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), the base `CarouselSection.test.ts`, and the release markup in `node_modules/bootstrap/`',
        evidence='`fo.diff`, `fo-status.txt`, `fo-shared.patch`, `b-overlay-frames-report.md`, `fo-instruments/` (`fo-mutations.log.txt`, `fo-mutate.py`, `fo-plant-carousel.py`, `fo-chevrons.py` and its `fo-chevrons-*` logs, `fo-probe-readings.log.txt`, the probe copies `fo-strip-probe.test.ts.txt`, `fo-hover-probe.test.ts.txt`, and `fo-reach-probe.test.ts.txt`, and the gate and capture logs), and the frames under `/home/user/veneer-fo/tmp/capture/states/` (`captioned-carousel`, `fading-carousel`, `inverted-carousel`, `advancing-carousel`, `captioned-carousel-hover`, `fading-carousel-hover`, `fading-carousel-focus`, and `plain-alert`, each at `light-1280` and `dark-390`)',
        subject='the specimens, the driven scenarios, the frames, the carousel proof, and the guide against the portfolio verdict\'s P11, P12, and P16 rows',
        analyst='claims 2, 4, 5, 6, and 7 (each proof against its mutation and its red run, the scroll cause, the reach probe, and the strip reading)',
        reviewer='claims 2, 3, 5, 6, 7, and 8 (open every frame the report names and rule whether it shows the state it closes; the specimens\' fit), and the guide sentences',
        checker='claims 1, 6, and 9'),
    'fu': dict(
        name='UTIL-FRAMES', worktree='/home/user/veneer-fu', base='cf5e447',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P17 and P18; P9 dropped from this unit) with the lens returns `pv-utilities-lenses.json`, the brief `b-util-frames-brief.md`, the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base utility specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts` and its mode-word refusal in `tests/setup.test.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), and `app/browser/Showcase.ts` (the mount order)',
        evidence='`fu.diff`, `fu-status.txt`, `fu-shared.patch`, `b-util-frames-report.md`, `fu-instruments/` (`fu-mutations.log.txt`, `fu-mutate.sh`, `fu-mutate.py`, `fu-hover-reach.log.txt`, the `fu-red-*`, `fu-gate-*`, `fu-capture-*`, and `fu-scratch-*` logs, and the dropped P9 logs under `fu-p9-dropped/`), and the frames under `/home/user/veneer-fu/tmp/capture/states/` (every scenario the report lists under Frames, at `light-1280` and `dark-390`)',
        subject='the specimens, the driven scenarios, the frames, and § Showcase against the portfolio verdict\'s P17 and P18 rows',
        analyst='claims 1, 2, 3, 4, and 5 (each proof against its mutation and its red run, the reach log, and the derived populations)',
        reviewer='claims 2, 3, 4, 6, and 7 (open every frame the report names and rule whether it shows the state it closes; the specimens\' fit; the § Showcase prose against the mount order)',
        checker='claims 1, 5, and 8'),
    'ff': dict(
        name='FOCUS-FRAME', worktree='/home/user/veneer-ff', base='e4a6d7c',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P1, P2, and P3) with the ring lens return `pv-focus-lenses.json`, the brief `b-focus-frame-brief.md`, the page-frame note `pf-design-verdict.md` (R7), the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V1), and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base focus placements in `tests/app/browser/integration.test.ts`, the `nav-underline-focus` case there (the lift pattern), the `FrameManager` class in `tests/setupBrowser.ts`, and the release stylesheet `node_modules/bootstrap/dist/css/bootstrap.css`',
        evidence='`ff.diff`, `ff-status.txt`, `ff-shared.patch`, `b-focus-frame-report.md`, `ff-instruments/` (`ff-mutations.log.txt`, the `ff-baseline/` and `ff-final/` frames and manifests, the probes under `ff-probes/` with their `ff-out-*` readings, the `ff-capture-final4-*` logs, `ff-guides.log.txt`, and the gate logs), and the frames under `/home/user/veneer-ff/tmp/units/ff-final/` and `/home/user/veneer-ff/tmp/capture/states/` (every scenario in the report\'s P1 table, and `vertical-group` and `check-group-focus`, at `dark-1280` and `light-390`)',
        subject='the placements, the ring and crop readings, the capture-drive fixes, and the P2 ruling against the portfolio verdict\'s P1, P2, and P3 rows',
        analyst='claims 2, 3, 4, 5, and 6 (each proof against its mutation and its red run, the helpers against their proofs, and the P2 probe against the release)',
        reviewer='claims 2, 6, and 7 (open every before and after frame the report names and rule whether each shows its ring whole; the P2 ruling), and the § Tests sentences',
        checker='claims 1, 3, and 8'),
    'fp': dict(
        name='PASSIVE-FRAMES', worktree='/home/user/veneer-fp', base='cf5e447',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (row P14) with the lens returns `pv-passive-lenses.json`, the brief `b-passive-frames-brief.md`, the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V7), the page-frame note `pf-design-verdict.md`, FOCUS-FRAME\'s `auto`-outline finding in `b-focus-frame-report.md` (P2), and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base passive specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts` and its laws in `tests/setup.test.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), and the Button, Spinner, List group, and Placeholder partials under `src/styles/components/`',
        evidence='`fp.diff`, `fp-status.txt`, `fp-shared.patch`, `b-passive-frames-report.md`, `fp-instruments/` (`fp-mutations.log.txt`, `fp-mutate.py`, the `fp-red-*` and `fp-green-*` logs, the gate logs, `fp-capture.sh`, and the `fp-capture-*` logs), and the frames under `/home/user/veneer-fp/tmp/capture/states/` (every frame the report lists, at `light-1280` and `dark-390`)',
        subject='the specimens, the driven scenarios, the frames, and the guide against the portfolio verdict\'s P14 row',
        analyst='claims 2, 3, 4, 5, 6, and 7 (each proof against its mutation and its red run, the paused keyframe reading, and the derived populations)',
        reviewer='claims 3, 4, 5, 6, and 8 (open every frame the report names and rule whether it shows the state it closes; the specimens\' labels and fit), and the guide sentences',
        checker='claims 1, 7, and 9'),
    'lc': dict(
        name='LABEL', worktree='/home/user/veneer-lc', base='ac74459',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the design verdict `/home/user/scaffold/.orkestrel/veneer/label-contrast-design-verdict.md` (L1 to L9) and the two design proposals beside it (`label-contrast-design-planner-proposal.md`, `label-contrast-design-analyst-proposal.md`), THEME\'s verdicts `ct-audit-verdict.md` and `ct-audit-subjective-verdict.md` (F1 and F2), the brief `b-label-lc-brief.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`, and `components/_button.scss`, the release functions `node_modules/bootstrap/scss/_functions.scss` (`color-contrast`) and `helpers/_colored-links.scss`, the release stylesheet `node_modules/bootstrap/dist/css/bootstrap.css`, and the build configuration `vite.config.ts` (its `cssMinify` setting)',
        evidence='`lc.diff`, `lc-status.txt`, `lc-shared.patch`, `b-label-lc-report.md`, and `lc-instruments/` (`lc-mutations.log.txt`, `lc-mutate.py`, the `lc-mutation-M*.log.txt` logs, `lc-red.sh` and the `lc-red-*.log.txt` logs, the `lc-green-*.log.txt` logs, the `lc-probe-*.log.txt` readings, `lc-compare.mjs` and the `lc-compare-*.log.txt` logs, `lc-base-index.css`, `lc-gates.sh`, `lc-gates.log.txt` and the `lc-gate-*.log.txt` logs, `lc-styles-final.log.txt`, `lc-theme-owned.patch` and `lc-theme-owned-check.log.txt`, `lc-journey-link.patch`, and `lc-ledger.py`)',
        subject='the contrast functions and their names, the label and direction per role, the root color scheme, the proofs\' shape, and the guide prose',
        analyst='claims 2, 3, 4, 5, and 6 (the rule against the release function, each resolved pick and direction against the design verdict\'s table, the byte comparisons, each proof against its mutation, and the lowering reading behind the root scheme)',
        reviewer='claims 3 (the direction and the named exceptions), 6 (the root scheme against its alternative, and the set of files the change makes false), and 7 (the function names, the comments, the guide prose against what ships, and the writing rule)',
        checker='claims 1 and 7'),
    'pl': dict(
        name='PREFLIGHT-HOST', worktree='/home/user/veneer-pl', base='fc3ddfe',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,styles,typescript,names,architecture,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the rule D45 in `decisions-round-2.md`, the engine session\'s reading `/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md` (the preflight row), the brief `b-preflight-host-brief.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`',
        precedent='the base `tests/service/tailwind/preflight.test.ts`, the base `readPreflightDepartures` reader in `tests/setupStyles.ts`, the installed Tailwind preflight `node_modules/tailwindcss/preflight.css`, and the base guide rows in `guides/veneer.md`',
        evidence='`pl.diff`, `pl-status.txt`, `pl-shared.patch`, `b-preflight-host-report.md`, and `pl-instruments/` (`pl-mutations.log.txt`, `pl-mutations.sh`, `pl-scratch.sh`, `pl-mutation-run.log.txt`, `pl-mutations-driver.log.txt`, `pl-mutation-build.log.txt`, `pl-classify-probe.test.ts.txt` and `pl-classify.out.txt`, `pl-red-baseline.log.txt`, `pl-green.log.txt`, `pl-worktree-unpatched.log.txt`, `pl-setup.log.txt`, `pl-test-guides.log.txt`, `pl-test-service.log.txt`, and the `pl-gate-*.log.txt` logs), and the patched guide copy `/home/user/veneer-pl/tmp/probe/pl-guide-patched.md`',
        subject='the comparison\'s shape, the tables\' and helper\'s names and placement, the emulation\'s honesty, and the guide prose',
        analyst='claims 2, 3, 4, 5, and 6 (the classification against the profile, the comparison against both builds, the emulation and its control, each proof against its mutation, and the helper)',
        reviewer='claims 3 (the case\'s shape and title), 4 (whether the emulation stands in for the real build as the report says), 6 (the names and placement), and 7 (every guide sentence against what ships, and the writing rule)',
        checker='claims 1, 6, and 8'),
}
for key in sys.argv[1:]:
    u = UNITS[key]
    claims = f'{key}-audit-claims.md'
    title = f"Audit round 1 — {u['name']} (`{key}`)"
    (U / f'{key}-audit-analyst-brief.md').write_text(f"""# {title}: objective lane on GPT-6 Astra

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at `{u['worktree']}`. You are the engine behind the CLI: perform the audit directly and spawn nothing. You hold the **objective** lane over the numbered claims in `/home/user/scaffold/.orkestrel/veneer/units/{claims}`: correctness, constraints, and what the code, the logs, and the contracts permit. The unit was written by `opus` on Opus 5.5, so you are an auditor engine that did not write it; the subjective lane (`reviewer` on Opus 5.5) and the checker (Sonnet) run blind beside you. Bound: rule within 25 minutes.

Law: {u['law']}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; {u['family']}; the worktree `{u['worktree']}` (the owned files over `{u['base']}`; read them, never edit them; `git -C {u['worktree']} show {u['base']}:<path>` reads any base file; the inventory is `tests/fixtures/oracle/inventory.json`; `node_modules/bootstrap/` there is Bootstrap 5.3.8, its source under `scss/` and its compiled stylesheet under `dist/css/`).

Standing conditions: the sandbox runs no Vitest project and no browser, and denies the network, a loopback listener, and a nested install; `git show`, `git diff`, `git apply --check` against a scratch extract under the system temporary directory, `grep`, `sha256sum`, and `node -e` that writes nothing are allowed; rule every proof claim from the code's assertions and the retained logs, naming for each mutation whether the assertions distinguish it from the passing case, and say which log you read. Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Focus: {u['analyst']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) with `file:line` (for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, the counts the report states listed under the last claim, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
""")
    (U / f'{key}-audit-reviewer-brief.md').write_text(f"""# {title}: subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, {u['subject']}, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: {u['law']}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; {u['family']}; the worktree `{u['worktree']}` (the owned files over `{u['base']}`; read them, never edit them; `git -C {u['worktree']} show {u['base']}:<path>` reads any base file, including {u['precedent']}; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: {u['reviewer']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
""")
    (U / f'{key}-audit-checker-brief.md').write_text(f"""# {title}: checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on {u.get('checker', 'claims 1, 6, and 8')} of the claims file by reading alone: the status and diff file lists, the patch's file set against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: {u['law']}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; `w2-w3-note-1.md`; the worktree `{u['worktree']}` (the owned files over `{u['base']}`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for {u.get('checker', 'claims 1, 6, and 8')} only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
""")
    (U / f'{key}-audit-analyst.sh').write_text(f"""#!/bin/bash
# {title}, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at {u['worktree']}.
# Written by pb-audit-briefs.py. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/{key}-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/{claims}  Journal: tmp/codex/{key}-audit-analyst.jsonl  Last message: tmp/codex/{key}-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C {u['worktree']} --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\\"high\\"" --output-last-message /home/user/scaffold/tmp/codex/{key}-audit-analyst-last.md "Your working directory is {u['worktree']}. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/{key}-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/{claims} holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/{key}-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
""")
    print(key, 'written')

# F8a PROFILES — `analyst` verdict (GPT-6 Astra, objective lane)

Journal `tmp/codex/f8a-audit-analyst.jsonl` (swept at acceptance), thread `01a0cacf-7498-76a3-bf8e-521dfe4b8390`, exit 0. Brief: `.orkestrel/veneer/units/f8a-audit-analyst-brief.md`; claims `.orkestrel/veneer/units/f8a-audit-claims.md`.

1. **CONFIRMED** — [vite.tailwind.config.ts:24](/home/user/veneer-f8/configs/src/vite.tailwind.config.ts:24) writes the derived candidates during `configResolved`; its configuration matches the requested project and setup order. [package.json:61](/home/user/veneer-f8/package.json:61) reaches the build-first Tailwind script after styles. Independently regenerating the candidate text matched the existing file. The unexcluded compile emitted `.container` and `.table`. The root configuration and helpers are unchanged.

2. **CONFIRMED** — [setup.css:8](/home/user/veneer-f8/tests/setup.css:8), [preflight.css:3](/home/user/veneer-f8/tests/fixtures/tailwind/preflight.css:3), and [unexcluded.css:4](/home/user/veneer-f8/tests/fixtures/tailwind/unexcluded.css:4) carry the required directives. Parsing their rules confirmed the explicit exclusion names, correctly resolved candidate paths, and absence of a cascade import.

3. **BROKEN** — The measured arrays at [profiles.test.ts:113](/home/user/veneer-f8/tests/tailwind/profiles.test.ts:113) are accurate, but they do not provide the claimed stronger proof of the composable imports. Read-only compilation after removing either import—or every Tailwind import—from `tests/setup.css` retained the opening order and produced the same empty blocks, selectors, and properties. The remaining assertions use independently imported fixtures, so they do not distinguish that broken profile.

   The named controls do hold: removing `col-7` independently emitted `.col-7`, which the completeness assertion rejects; an empty candidate population fails the `.container` floor at [profiles.test.ts:129](/home/user/veneer-f8/tests/tailwind/profiles.test.ts:129). Keep those checks and add a positive, theme-dependent utility case that fails when either composable import disappears. Host command for the import-removal control: `npm exec -- vitest run --config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot tests/tailwind/profiles.test.ts`.

4. **CONFIRMED** — [setupBrowser.ts:862](/home/user/veneer-f8/tests/setupBrowser.ts:862) searches nested rules and requires a `--vn-` declaration inside a `theme` block. The exports are inventoried and tested. Reverting to theme-block-only selection returns the rival sheet where [setupBrowser.test.ts:922](/home/user/veneer-f8/tests/setupBrowser.test.ts:922) requires `undefined`; the assertions distinguish the named mutation. Existing `PROBE_CASCADE` cases are unchanged. The browser settling command is `npm run test:setup:browser`.

5. **BROKEN** — The standalone isolation checks and planted foreign sheet distinguish the named contamination, but [index.test.ts:45](/home/user/veneer-f8/tests/src/styles/index.test.ts:45) also requires a minifier implementation detail. Independently compiling the same Sass with installed Lightning CSS targeting Chromium 141 produced `['--bs-', '--vn-']`, with no `--tw-` declaration. The equality rejects that Tailwind-free output solely because `--lightningcss-` is absent.

   Permit that generated namespace without requiring it; retain the foreign-namespace rejection, cascade identity, and sheet isolation checks. Loading the excluded profile correctly changes the layered-sheet reading despite declaring no custom properties. The browser settling command is `npm exec -- vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/index.test.ts`.

6. **BROKEN** — The subsection, recipes, departure rows, version, command, and links are present, but the layer descriptions at [veneer.md:283](/home/user/veneer-f8/guides/veneer.md:283) are incomplete. Installed Tailwind 4.3.3, given the candidate control `px-8 translate-x-1 font-bold`, emitted `theme`, `utilities`, and **`properties`** for the composable imports; the bare import additionally emitted `base`. It also prepended `@layer properties;` before the supplied order statement. Theme emission itself depends on the generated utilities.

   Describe the conditional emission and generated `properties` layer, and add a consumer-candidate proof. Preserve the relative order of Veneer’s named layers; this finding does not establish a reset or shared-name precedence failure.

7. **CONFIRMED** — [f8a-status.txt:1](/home/user/scaffold/tmp/audit/f8a-status.txt:1) matches the live status. The tracked diff contains only the claimed tracked paths; the untracked paths match the claim. Direct comparison against `6e74ec9` found no changes to the named protected files or `src`. The obsolete Tailwind directory and `tmp/probe` are absent; searching `guides`, `tests`, `configs`, and `package.json` found no `tests/src/tailwind` reference.

8. **CONFIRMED** — The log records successful formatting, lint, checking, build, and every invoked test project. [f8a-gates.log.txt:4292](/home/user/scaffold/tmp/audit/f8a-gates.log.txt:4292) records `test:src:tailwind exit=0`; [f8a-gates.log.txt:4498](/home/user/scaffold/tmp/audit/f8a-gates.log.txt:4498) contains the terminal `=== gates done` marker. Green gates do not resolve the proof and documentation defects above.

Outside the claims:

- **F-INFRA — BROKEN.** [profiles.test.ts:30](/home/user/veneer-f8/tests/tailwind/profiles.test.ts:30) declares reusable stylesheet readers locally, alongside `loadProfile`, `readExcluded`, and case data. TypeScript AST inspection confirmed these are non-exported module functions. This violates [tests.md:185](/home/user/scaffold/.claude/rules/tests.md:185) and [architecture.md:49](/home/user/scaffold/.claude/rules/architecture.md:49). Move reusable infrastructure into the permitted setup module, export and test it, and inline trivial single-use readings. Test registration remains in the proof file.

Attacked and held: claims 1, 2, 4, 7, and 8 held against the checks recorded in their verdicts. The empty excluded emission is legitimate; its inability to establish retained imports is the separate defect in claim 3. The minifier namespace is legitimate when emitted; requiring its presence is the defect in claim 5.

VERDICT: FAIL 3, 5, 6; outside the claims: F-INFRA
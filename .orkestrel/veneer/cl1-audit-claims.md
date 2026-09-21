# CL1 audit claims

Subject: unit CL1, the Content/layout proof contract, in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), written by `sol` on Astra under
`units/cl1-brief.md` (retained under `.orkestrel/veneer/units/`), report
`units/cl1-report.md`, over the U7f-fix landing `060ce02`. Evidence rendered by the
Orchestrator: `units/cl1-diff.patch.txt` (`git diff 060ce02`) and `tmp/audit/cl1-status.txt`.
Rule on the diff and the live files, never on the report's word alone. Scope: implementation
only, by the user's ruling. Astra wrote the unit, so the Opus reviewer holds the objective lane
and the Astra analyst the subjective lane. Claims marked `[mechanical]` are the checker's; every
other lane rules on every claim. An extra finding is an implementation defect with a site and a
one-line failure scenario, numbered from 8.

1. Exclusions (`tests/setupConformance.ts`): `readDeferrals` keeps its `Name | Owner | Reason`
   reader and its incomplete-row refusal; the scanner treats `Excluded` as a terminal owner,
   validates the excluded name against the pinned inventory (before its component has a guide
   row), requires it absent from every selector of the parsed cascade (nested rules included),
   names the offender, and subtracts exclusions from shipped obligations; ordinary deferrals keep
   their component-row bound; the proofs in `tests/setupConformance.test.ts` cover the reader,
   nested presence, membership, and valid absence, and the two plants (a present excluded name;
   a name outside the inventory) reddened with the recorded messages and are gone.
2. Property-free keys (`tests/setupConformance.ts`): `collectShippedComponents` admits a shipped
   selector row with no variable row only when the key's official property set is empty (an
   optional inventory argument, the pinned fixture otherwise); Button is still withheld when
   its variable row is missing or reads `accepted`; the scratch `reboot` case proves the
   property-free admission; `tests/conformance.test.ts` is unchanged and `listed` reads
   `['btn']`.
3. Oracle root scoping (`tests/setupBrowser.ts`): `driveOracle(root, prefix)` keeps its
   signature and passes the root into the acting rows; `resolveOracleButton` bounds the target
   under the root with the reachability refusal kept; `pressOracleKeys` focuses the bounded
   target before sending keys; `holdOraclePointer` resolves the element under the root and holds
   it through the installed protocol and pointer marker (the installed hold verb accepts only
   document-wide names), the installed release verb keeping cleanup; the duplicate-section proof
   in `tests/setupBrowser.test.ts` shows target activation, the neighbour's attributes and
   clicks unchanged, keyboard redirection from foreign focus, and held-pointer isolation, red on
   the document-wide drive and green after; the journey's two `driveOracle` calls compile and
   stay green.
4. Breakpoints (`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.test.ts`):
   the frozen `BREAKPOINT_CASES` table carries 375, 576, 768, 992, 1200, and 1400 with
   boundary-minus-one, boundary, and boundary-plus-one readings; `visitBreakpoint` imports
   `page` dynamically (so the host-independent module stays loadable in Node), preserves the
   starting height, and restores width and height in `finally`; the Node proof checks the table
   and its frozen nested values; the browser proof checks actual viewport sizes, media
   conditions, successful returns, synchronous and asynchronous failures, nested visits, and a
   following case at the original size, red on the deliberately unrestored helper (the following
   case at 576 instead of 414) and green after; the measured leakage reading (a setter file
   ending at 1400×800, the next file reading 414×896) is recorded and the probe files are gone.
5. `[mechanical]` Scope and law: the diff touches `tests/setupConformance.ts`, its proof,
   `tests/setupBrowser.ts`, its proof, `tests/setupStyles.ts`, its proof, and one sentence in
   `guides/veneer.md`; `tests/conformance.test.ts`, `src/**`, `app/**`,
   `tests/app/browser/integration.test.ts`, `tests/fixtures/**`, `package.json`, `configs/**`,
   and the vendored files are absent; in the diff no `any`, no assertion outside `as const`, no
   non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter
   property, no skipped case other than `it.runIf`, no case named for a control, no plant or
   probe residue (`cl1-viewport-set`, `cl1-viewport-read`, the two exclusion plant cases);
   every new helper is exported from the setup file its host dependence selects, named
   `{verb}{Noun}`, and cased in the matching proof; the export-inventory assertions in
   `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts` equal the live export sets and
   the one in `tests/setupConformance.test.ts` is unchanged.
6. `[mechanical]` The guide: the one changed sentence introduces the `### Deferred selectors`
   table with the `Excluded` owner's meaning; no other guide line changed; `test:guides` and
   `test:policy` are green.
7. Gates: the report records `format:check`, `lint:check`, `check`, `test:setup`,
   `test:setup:browser`, `test:conformance`, `test:src:styles`, `test:guides`,
   `test:app:browser`, `test:journey`, and the two Edge runs exit 0 (the last verified runs,
   after corrections inside owned files); the verifier lane re-runs the chain on the host and
   its reading rules this claim.

**Subjective lane — GPT-5.6 Sol substituting for unavailable Opus.** Recommend a measured omission attempt before adding a preservation mechanism. Don’t treat the historical list as a product requirement.

The existing browser wrapper has no durable customization contract. `src/core/compilers.ts:1065` content-owns it, and `src/core/templates.ts:832` seeds `appBrowser()` without an override. `guides/scaffold.md:1094` describes replacement of stale content-owned bytes; `guides/scaffold.md:1270` requires local configuration outside those files. The root factory accepts an override (`src/core/templates.ts:316`, `:346`), but that callable seam doesn’t preserve application edits through CLI repair.

The journey wrapper preserves application variants (`guides/scaffold.md:973`, `src/core/compilers.ts:1086`). Putting the list there would misplace a dev-server setting: Roughnotes’ `dev` and browser build scripts use the browser wrapper, while its ordinary browser tests use the generated root (`tmp/recovery/roughnotes/package.json:27`, `:38`, `:39`). `appJourney` itself calls plain `appBrowser()` (`src/core/templates.ts:356`). A journey green therefore cannot establish dev-server equivalence.

**Bounded proof and implementation:** In an isolated Roughnotes copy, use the generated plain browser wrapper and run:

```text
npm run dev -- --force --host 127.0.0.1
```

Drive the actual application through Chromium. Record successful arrival, route navigation, and a Bootstrap interaction through visible controls, with browser errors and failed module requests recorded. Compare that reading against the same application with the historical include list under equivalent cold-start conditions. This is the smallest independent run that can refute omission. A server-ready message alone doesn’t settle it.

If the application reading remains equivalent, retain the canonical wrapper and remove the historical-list assertion at `tmp/recovery/roughnotes/tests/conformance.test.ts:108`. Keep the generic override composition assertions beside it. Run the scoped conformance proof and browser build afterward. This path costs a dev-entry measurement and a local correction; it avoids adding an ownership obligation for an unproved need.

**If omission produces a reproducible dependency-loading failure, preserve only the demonstrated override.** The narrow upstream correction I recommend is **presence ownership for `configs/app/vite.browser.config.ts`**, with Roughnotes as its first consumer. Presence fits a required build entry better than birth: repair restores an absent wrapper while preserving present application bytes. Keep the template as `appBrowser()` and keep shared factories content-owned. Don’t add Roughnotes packages to Scaffold defaults.

That upstream change must document its preservation rule and cost: present wrappers stop receiving template updates through repair. Its falsifiable proof must materialize a browser application, customize its wrapper, run real configs repair, and verify unchanged custom bytes; deleting the wrapper must make repair restore the canonical seed. The root must still update independently. The owning locations are `src/core/compilers.ts:1063`, compiler and real CLI ownership proofs, and `guides/scaffold.md`’s configuration ownership prose. The existing `Ownership` type already supplies presence (`src/core/types.ts:31`).

**Unresolved:** No dev-entry comparison was supplied or executed. Necessity of each include entry remains unproved. I ran no tests and made no edits. This recommendation is a bounded design argument, not behavioral acceptance.

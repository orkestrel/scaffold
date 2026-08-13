1. **BROKEN** — `readInventory(root, [absoluteContainedDirectory])` now throws, while the pre-centralization site accepted that contained absolute path. Relative input remains valid. Fix the call site by converting the requested directory to a root-relative target before `resolveContained`.

2. **CONFIRMED** — Symlink refusal held for bare strings, repeated trailing separators, URLs with and without trailing slashes, relative strings, `.`/`..` roots, and empty traversal from `/`. Real-directory controls remained readable.

3. **BROKEN** — After renaming the allocated directory, `destroy()` leaves that owned directory behind, contradicting the stated cleanup contract. If birth time is unavailable or equal and a replacement reuses the device/inode, the current comparison deletes the replacement. Use a portable ownership marker when timestamps cannot distinguish identity, and define or support rename behavior explicitly.

4. **BROKEN** — On supported Node v22.22.2, a compiler-accepted `JSONValue` from `JSON.rawJSON('1e400')` bypasses the replacer and `roundTripJSON` returns `Infinity`. An ordinary nested `Infinity` control throws. Validate the parsed result for non-finite numbers or reject raw JSON values.

5. **BROKEN** — The threat model says the package operates on directories the test created, but its own shipped usage calls `readInventory(resolveRoot(import.meta), ...)` on the workspace checkout. Split the boundary: scratch directories are allocated by the test; inventory roots may be existing workspaces. State that neither surface detects hard links.

6. **CONFIRMED** — `createClock` and `ClockInterface` remain only in the `## Limits` exclusion row. Source, tests, examples, and installable surface no longer depend on them, and the two-member fleet count remains below the rule.

7. **CONFIRMED** — Fleet source and manifests matched the stated rows: recorder map 13; fixture server 3 with `router`/`server` clustered and `middleware` independent; browser groups 2; timer 2 clustered; clock 2 independent; hostile-data groups 2–3 inside the stated cluster. The 11-member error wrapper, 8-member gate family, and 4-member seed correctly clear the threshold but remain excluded for separate reasons.

8. **CONFIRMED** — `__proto__`, `constructor`, `prototype`, `toString`, `hasOwnProperty`, `0`, `01`, `2`, and `10` remained own, bracket-readable properties. Empty filenames cannot enter through the filesystem. Numeric-looking keys expose an ordering defect under claim 9, not a property-loss defect here.

9. **BROKEN** — Three universals fail. `roundTripJSON` returns `Infinity` from raw JSON, returns `null` inside a value still typed `number[]` for a sparse array, and returns a string from an object whose hidden `toJSON` changes its representation. `readInventory` also enumerates integer-index filenames numerically (`0, 2, 10`), not sorted by root-relative key. The `hasSymbolicLink` example claims `true` without creating its link. Change the generic return contract or reject transforming inputs, qualify key ordering, and construct the documented symlink state.

10. **CONFIRMED** — The two exports form a usable pair: `resolveContained` establishes lexical containment and `hasSymbolicLink` checks the resulting absolute path. Keeping either declaration private would violate centralized-helper and barrel rules; inlining would restore duplication.

11. **BROKEN** — Coverage is not regression-complete. `createRecorder` reassignment is caught; `resolveRoot` moving an extra parent is caught; `resolveContained` losing absolute rejection is caught. The suite misses excessive `waitForDelay`, `captureError` losing thrown `null`, `requireValue` rejecting `NaN`, swallowed `collect` and `collectStream` failures, raw/sparse JSON transformations, `hasSymbolicLink` losing root-link detection, `readInventory` rejecting formerly accepted absolute-contained directories, and `createScratch` leaking a moved allocation. Add those behavioral cases as permanent tests.

12. **BROKEN** — The dry-run package contains `README.md`, `dist/src`, `LICENSE`, and `package.json`, but no guide. The README links to absent `guides/test.md`, uses an undeclared `loader`, and only names several exports without enough contract or examples to use them correctly. Ship the guide and a valid link, or make the README self-contained.

13. **BROKEN** — The package should not ship to 41 repositories with the raw-JSON bypass, unsound generic JSON result, changed inventory input behavior, non-lexical numeric-key ordering, moved-allocation leak, test gaps, and absent registry guide.

VERDICT: FAIL — 8 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims
1. **CONFIRMED** — Relative, absolute, `..`, empty, `.`, root-prefix, symlink, drive-relative, cross-drive, and UNC attacks found no lexical escape. The parent disjuncts reject direct and nested ancestor paths; `isAbsolute(contained)` rejects cross-volume Windows paths. Neither detects physical symlink escapes, as documented.

2. **CONFIRMED** — Arrays and object values with 300,000 entries copied successfully. A JSON-parsed own `__proto__` key remained data without prototype mutation. Raw non-finite output was rejected while `1e308` passed. Depth 20,000 produced the same `RangeError` in native `JSON.stringify`, before the repaired loops run.

3. **BROKEN** — A dangling symlink makes `exists('dangling-link')` return `true`, then makes `read('dangling-link')` throw raw `ENOENT`. This is neither `undefined` nor a documented throw. Direct and symlinked directories receive the package-authored error, and symlinked files read correctly. `src/server/types.ts` also omits the new directory throw. Return `undefined` for a missing symlink target, preserve the directory error, and update the authoritative TSDoc.

4. **CONFIRMED** — Three required mutations bound independently. Changing the default `requireValue` message produced 1 failure; removing `reader.releaseLock()` produced 1 failure; changing the timer to `ms / 2` produced 1 failure at 10.304 ms against the 18 ms floor. Each source mutation was restored immediately.

5. **CONFIRMED** — Across 150 samples, the minimum real 20 ms delay was 19.257 ms against an 18 ms floor. The half-delay control reached 10.180 ms and failed the floor. Slower scheduling increases elapsed time; the 10% margin covers the observed early clock slop on the configured Linux CI host.

6. **CONFIRMED** — Rule 7 now promises lexical containment and explicitly permits symbolic-link traversal. A probe wrote through an internal directory link to an outside directory, matching the threat model. The mode statement no longer supports the containment ruling, and the prose names same-UID workers and code under test as admitted actors.

7. **CONFIRMED** — README alone supplies both imports, a valid root, the required directories argument, extension filtering, exact-key exclusion, returned key shape, and link-refusal boundaries. Nothing required to call `readInventory` is missing. Absolute-directory acceptance and integer-like key ordering remain advanced guide-only details.

8. **BROKEN** — `guides/test.md:137` still says `write` “Writes a file below the directory.” The executed symlink attack wrote `directory-link/written.txt` physically outside the allocation. Replace that pre-fix physical-containment wording with “writes through a lexically contained path.”

9. **BROKEN** — The workflow reaches every declared proof project except the intentionally ungated probe project, and its Node versions satisfy the engine floor. However, it runs only on `ubuntu-latest`. This filesystem package has no OS restriction and claims host-independent separators, case probing, drive-relative paths, and UNC containment. Native Windows filesystem behavior is never exercised. Add a Windows runner matrix and run the same gates there.

10. **BROKEN** — Publication remains blocked by the dangling-link `read` outcome, incomplete authoritative TSDoc, stale physical-containment guide row, and missing Windows CI. Closing them costs one bounded source/test/types repair, one prose edit, and one workflow matrix expansion. `git status --porcelain` was empty, and no `sol4a` probe remains.

VERDICT: FAIL — 4 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims
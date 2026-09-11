Objective lane held with the accepted Guide API context reused.

## Queue

**ENTRY — CONFIRMED**

`queue/tests/guides.test.ts:5-60` directly composes `GuideCommand`, `readInventory`, and `createVitest`. `PACKAGE_NAME` binds the module map at lines 14-18 and the parsed manifest assertion at lines 66-90. Contract, Guide, Queue, Test, and Vitest runtime imports occur inside the anonymous callback. No alternate launcher, local helper, parser, or public API was introduced.

**PRESERVATION — CONFIRMED**

The native entry retains the predecessor paths:

- Input, own-row, title, pitch, and fence checks: lines 69-97.
- Surface, barrel, internal, and hidden checks: lines 99-122.
- Existing method-group population, interface membership, and implementing-class extras: lines 124-149.
- Drift and function examples: lines 151-167.
- Per-group method examples through `findUnexampled`: lines 169-188.
- Encountered fence imports: lines 190-200.
- Encountered relative and test links: lines 202-215.
- Queue’s guards, helpers, and real memory-store behavior: lines 220 onward.

The whitespace-insensitive diff against `1ae3fa1a:tests/guides.test.ts` shows no substantive flagship change. The migration changes registration and matching aggregate channels only. Empty method, import, and link encounter populations keep predecessor behavior. No `report.sections`, `report.imports`, `report.links`, `report.tests`, `report.declarations`, or finding-text filter exists.

**SCOPE — CONFIRMED**

`d7n-queue-upper-native-green/status-before.txt` and `status-after.txt` record only `tests/guides.test.ts` modified in the author freeze. HEAD, manifest hashes, index bytes, and complete diff bytes remain unchanged across that execution. Later package/config/setup-policy edits are separately recorded root preparation. The author changed no source, contract, guide, metadata, dependency, or unrelated test.

**PROOF — CONFIRMED**

`d7n-queue-upper-native-red/action.exit.txt` records exit `1`, with `ERR_MODULE_NOT_FOUND` on the former static `@src/core` import before collection. `d7n-queue-upper-native-green/action.exit.txt` records the returned native entry at exit `0`. `d7n-queue-native-preserved-prepublish/action.exit.txt` records exit `0` and includes the native `test:guides` command. Its before/after diff, index, HEAD, and manifest evidence match.

**Queue source verdict: PASS.**

## Rater

**ENTRY — CONFIRMED**

`rater/tests/guides.test.ts:5-73` directly composes the accepted native command and host ports. `PACKAGE_NAME` binds the module map at lines 14-18 and manifest assertion at lines 79-103. Contract, Guide, Test, Rater, Reason, and Vitest runtime imports occur inside the callback. No alternate entry or duplicated mechanism exists.

**PRESERVATION — CONFIRMED**

The successor retains:

- Input, own-row, title, pitch, and fence checks: lines 82-110.
- Surface, barrel, internal, and hidden checks: lines 112-135.
- Existing method-group population and membership checks: lines 137-162.
- Drift and function examples: lines 164-180.
- Per-group method examples through the predecessor’s `findUnexampled` composition: lines 182-201.
- Encountered imports and links: lines 203-228.
- Rating, error, validator, definition, evidence, worksheet, total, and overload behavior: lines 233 onward.

The whitespace-insensitive diff against `76fab91d:tests/guides.test.ts` shows no substantive flagship change. Empty encounter populations retain predecessor semantics. The forbidden aggregate channels, declaration channel, and finding-text filters are absent.

**SCOPE — CONFIRMED**

`d7n-rater-upper-native-green` records only `tests/guides.test.ts` modified in the author freeze. Its HEAD, manifest, index, and diff evidence remain stable. Root’s later package/config/setup-policy repair is separate. No authored source, public contract, guide, metadata, dependency, or unrelated test changed.

**PROOF — CONFIRMED**

`d7n-rater-upper-native-red/action.exit.txt` records exit `1` before collection on the static `@src/core` import. `d7n-rater-upper-native-green/action.exit.txt` records exit `0`. `d7n-rater-native-preserved-prepublish/action.exit.txt` records exit `0`, including native `test:guides`, with matching before/after preservation evidence.

**Rater source verdict: PASS.**

Population equivalence rests on the exact predecessor/source comparison. No mutation-based negative-control or Probe receipt is claimed.

**VERDICT: PASS**

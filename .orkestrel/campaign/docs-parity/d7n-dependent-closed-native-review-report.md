# Independent corrected native-source review

VERDICT: PASS

Lane held: owner-selected independent Astra reviewer. The active objective lane remained unread. This verdict covers Brief, Middleware and Worker native-source acceptance, including root's comment correction. It does not reopen their accepted package closures or establish final registry readiness.

The alignment and hardening workflows set the dependency and preservation checks. Falsify supplied the claim-by-claim attack. No target files, installations, gates or refs were changed. Only this report was written.

## Shared preservation evidence

I compared the actual predecessor-to-current test diffs, the complete current tests, the author-only freezes and the corrected root freezes. I challenged the replacements against installed Guide's `dist/src/server/index.js`, especially its `GuideCommand` and embedded `Parity` implementations, and the published Guide/Test declarations. The inspected installed Guide server implementation and Guide/Test declaration files match across these targets.

| Predecessor assertion | Counterpart and attack result |
| --- | --- |
| Manifest parsing and missing-guide refusal | `GuideCommand` still calls `parseManifest` on `guides/README.md`. `report.input`, non-empty `rows` and the required own row prevent a missing guide from disappearing silently during row joining. Each row still constructs `Guide` and `Source` with the entry's source scope. |
| Titled-example population pin | The own-spec `report.examples.titles` channel requires an intersection between guide fence titles and top-level source example titles. I checked the apparent empty-title difference: source extraction omits an empty title, so it cannot have supplied a predecessor pair. |
| README/tagline equality | The parsed manifest name must equal the package's `PACKAGE_NAME`, which also keys `MODULES`. The required own guide has the matching bare-name path that `selectGuidePitch` selects. The installed pitch check refuses absent inventory and missing blockquotes; it cannot accept missing blockquotes as equality. |
| Fence languages | The per-spec `report.fences` channel calls the same `findUnlisted` over the same guide fences and language policy. |
| Summary/example equality | The per-spec `report.drift` channel calls the same `findDrift`. Formatting its findings as records does not discard a disagreement. Filtering uses the spec identity, not finding text. |
| Surface-function examples | `report.examples.functions` applies `findUnexampled` to documented function names, matching-language fence bodies and top-level source example names, exactly the predecessor inputs. |
| Remaining package policy | Surface/barrel/internal/hidden checks, documented method traversal, interface/class membership, method examples and encountered import/link/test-link traversals retain their public Guide leaves. No aggregate `sections`, `imports`, `links`, `tests` or `declarations` assertion was substituted. Native no-argument execution runs the package's guides project; it does not impose every computed report channel as policy. |

## Brief

Baseline: `2660b0a6bd89d7f11884451a644b82fab1a52d95`.

| Claim | Result | Attempted attack and decisive evidence |
| --- | --- | --- |
| ENTRY | CONFIRMED | Inspected `brief/tests/guides.test.ts:53` and its imports for a launcher, eager source loading or an unbound pitch. It directly supplies `readInventory` and `createVitest` to `GuideCommand`; source and Vitest runtime imports occur inside the anonymous registration callback. Manifest identity and own-row checks bind the pitch. |
| PRESERVATION | CONFIRMED | Compared changed assertion inputs with the installed counterparts above. The retained block at `tests/guides.test.ts:145` keeps declaration and method policy. Inventory pins, Phantom/wrong-keyword and unexampled controls, owner-scoped options detection, the `turns` control, FOREIGN exemptions and TSDoc controls remain. The compile, builder/projection, blocking and store examples at `:427` retain executable tokens and teardown; wrapping-induced line breaks do not change calls or values. |
| SCOPE | CONFIRMED | `tmp/pass/d7n-brief-dependent-native-green/status-before.txt`, `status-after.txt` and `diff-after.txt` contain only `tests/guides.test.ts`. Current extra changes are the separately recorded root repair described below. |
| PROOF | CONFIRMED | Root's `d7n-brief-dependent-native-red` records `ERR_MODULE_NOT_FOUND` for `@src/core`, exit 1, before collection. `d7n-brief-dependent-native-green` records direct native success, exit 0. The corrected `d7n-brief-dependent-comment-prepublish` records exit 0 and includes the native guides invocation. Its final diff and metadata match the current checkout. |
| COMMENT | CONFIRMED | Compared the frozen author test patch with the corrected test patch. Differences are the named docs-command, guide/source and missing-blockquote comments, plus `OTHER` to `other`. No executable import, assertion, resource or lifecycle change appears. No `npm run docs` pointer remains. |

## Middleware

Baseline: `5747e3f325e3dbbc216c45bbe94b89eed9944121`.

| Claim | Result | Attempted attack and decisive evidence |
| --- | --- | --- |
| ENTRY | CONFIRMED | Inspected `middleware/tests/guides.test.ts:35` and the static import boundary. `IdentifierState` is type-only; runtime source, `compose`, test support and Vitest imports occur in the callback. Direct host ports, package identity and own-row binding satisfy the native contract without a launcher or local helper. |
| PRESERVATION | CONFIRMED | The shared substitutions preserve their inputs. The retained block at `:94` keeps `MultipartParser` internal, the existing module map, documented-group/class checks and encountered import/link checks. The flagship at `:229` retains the real boundary/security composition, response/body/header assertions and fence-line guards unchanged apart from indentation. No missing behavioral control from the historical closure was silently added or claimed. |
| SCOPE | CONFIRMED | `tmp/pass/d7n-middleware-dependent-native-green` freezes only `tests/guides.test.ts`; source, types, guides and metadata remain outside the author delta. The later generated repair is separately attributable and matches installed host files. |
| PROOF | CONFIRMED | The native-red receipt records the unresolved `@src/core` import and exit 1; native-green records exit 0. `d7n-middleware-dependent-comment-prepublish` records exit 0 for the corrected checkout, including native guides execution, with a stable snapshot matching current content. |
| COMMENT | CONFIRMED | Author-to-corrected test-patch differences contain only the named comment replacements. The executable callback, battery options, request, assertions and support imports are unchanged. The obsolete docs-command pointer is absent. |

## Worker

Baseline: `021c8ad05dc62bb8a05c3143f17fee7b54055e7b`.

| Claim | Result | Attempted attack and decisive evidence |
| --- | --- | --- |
| ENTRY | CONFIRMED | Inspected `worker/tests/guides.test.ts:35` for raw-Node source/support loading and policy invention. Only native-safe runtime imports precede the command. Source, server fixtures and Vitest load inside registration. The supplied host ports and parsed package identity are direct. |
| PRESERVATION | CONFIRMED | The shared assertion mapping holds. The server-barrel exclusion at `:95`, `NodeWorker`/`Thread` INTERNAL policy and original module map remain. The examples at `:232` retain direct-thread dispatch, reply controls, NodeWorker, reopened JSON persistence, thread-pool execution and the full drain/pause/resume/clear/stop/start/abort/destroy sequence. Fixture selection, resource options, promise handling, termination and scratch cleanup are unchanged. |
| SCOPE | CONFIRMED | `tmp/pass/d7n-worker-dependent-native-green` records only the owned guide test. Current policy/package changes belong to root's separate repair, not the native author. |
| PROOF | CONFIRMED | Native-red records the original `@src/core` refusal and exit 1; native-green records exit 0. The corrected `d7n-worker-dependent-comment-prepublish` records exit 0, including the native guides test, and its final snapshot matches the current checkout. |
| COMMENT | CONFIRMED | Comparing the author and corrected test patches exposes only the requested comments. Thread, store and lifecycle executable tokens remain intact, and no obsolete docs-command pointer remains. |

## Receipt binding and root repair

For every reviewed package, native-green and comment-prepublish before/after HEAD, branch, status, index, diff and manifest-hash receipts are unchanged. The current `git diff HEAD --binary` matches the corrected receipt's diff as Git text. Current package and lock SHA-256 values match that receipt's manifest hashes. The earlier source-prepublish receipts are historical, not the final binding.

Current `tests/guides.test.ts` SHA-256 observations:

| Package | SHA-256 |
| --- | --- |
| Brief | `9F0A203087897C4A29781917D7A0C2456F54681BEDF293B312FB7F484AD3674A` |
| Middleware | `98CC8A644CDDE42B52CC427C315B6620D70B0AFBD0C524F591094B1BD7D5604B` |
| Worker | `89F6D267E52CB53373E2080DFF9517770A05295CA9B51ABB095E3BB40CE4861A` |

The `d7n-<pkg>-dependent-tooling` receipts record successful installation and complete Guide/Scaffold distribution equality without manifest changes. Each root config-red receipt names the stale `policy(no-mocking)` diagnostic expectation. The repair receipt records generated replacement and the known foreign `scripts/docs.ts` finding, exit 1; that is not represented as a green audit. The corresponding isolated config-green receipt exits 0. Current `tests/config.test.ts` and `tests/setupPolicy.ts` are byte-identical to installed Scaffold's host files. The package diff changes only `test:guides` to the native entry. Retired `scripts/docs.ts` remains within the explicitly deferred final-overwrite boundary.

These are source-equivalence findings supported by recorded execution. No new mutation control or successful compiler Probe is claimed. No correction or missing evidence remains within this source-review scope. Root alone accepts the unit.

VERDICT: PASS

# Objective falsification verdict

Lane: objective correctness, native Sol analyst.

## Claim 1

`CONFIRMED` — The attack used an undeclared sibling name, an occupied output path, and an
inaccessible-path reading. The population is the fixed `PACKAGES` value and the collection loop
derives every checkout from that value (`tmp/pass/layer-inventory.mjs:7`,
`tmp/pass/layer-inventory.mjs:705`). `validateOutputPath` admits only an `ENOENT` result and
propagates every other `lstat` failure; `mkdir` then refuses a late occupant
(`tmp/pass/layer-inventory.mjs:734`, `tmp/pass/layer-inventory.mjs:761`). Every `writeFile` target
is a fixed package filename or `summary.json` beneath that directory
(`tmp/pass/layer-inventory.mjs:724`, `tmp/pass/layer-inventory.mjs:729`). Repository reads use Git,
JSON, and npm inspection only. The registry request supplies only the explicit `accept` header and
an abort signal (`tmp/pass/layer-inventory.mjs:580`, `tmp/pass/layer-inventory.mjs:586`). No install,
Git mutation, project-source import, authentication-file read, authorization header, or cookie path
exists in the instrument.

## Claim 2

`BROKEN` — A registry payload can carry a foreign or absent root `name` field while its `latest`
release carries the requested identity. `projectRegistryPayload` never reads `payload.name`; it
validates only the selected release and returns the caller-supplied `name` as if the registry had
reported it (`tmp/pass/layer-inventory.mjs:534`, `tmp/pass/layer-inventory.mjs:558`,
`tmp/pass/layer-inventory.mjs:566`). The concrete input is a payload with root
`name: '@orkestrel/foreign'`, `dist-tags.latest: '0.0.16'`, and a `versions['0.0.16']` manifest named
`@orkestrel/contract`, passed with requested name `@orkestrel/contract`. The projection reports
`valid: true` and retains the requested identity in place of the observed root identity. That
breaks the required packument identity retention.

The HTTP failure projection has a related evidence loss. `fetchPackument` decodes JSON before it
checks `response.ok`; when a non-success response carries a non-JSON body, the catch result omits
the already-observed HTTP status (`tmp/pass/layer-inventory.mjs:590`,
`tmp/pass/layer-inventory.mjs:591`, `tmp/pass/layer-inventory.mjs:603`). The original collection
contract requires the status on every registry reading.

The smallest correct fix is to retain and validate the payload root identity independently of the
requested package, and to retain the response status before body decoding so the failure record can
carry it. The adjacent release check is sound: an absent `latest` tag, an absent selected release,
or a release identity/version disagreement makes the projection invalid
(`tmp/pass/layer-inventory.mjs:546`, `tmp/pass/layer-inventory.mjs:554`,
`tmp/pass/layer-inventory.mjs:556`, `tmp/pass/layer-inventory.mjs:560`).

## Claim 3

`CONFIRMED` — The attack supplied a dependency node whose identity exists only in its parent key,
a foreign package nested beneath an Orkestrel lock entry, an installed manifest version
disagreement, and an absent optional node. The npm projection carries the parent key into the child
projection and recursively retains dependencies (`tmp/pass/layer-inventory.mjs:183`,
`tmp/pass/layer-inventory.mjs:214`). It retains the unhealthy-node fields declared in `NPM_FIELDS`
(`tmp/pass/layer-inventory.mjs:100`, `tmp/pass/layer-inventory.mjs:199`). Lock identity inference
matches only an Orkestrel package at the end of a lock path, so foreign descendants are excluded
(`tmp/pass/layer-inventory.mjs:310`, `tmp/pass/layer-inventory.mjs:321`). Installed attestations
compare the disk manifest name and version with the npm node, retain dependency metadata through
`selectManifest`, hash each present declared distribution entry, and report optional absence with
`observed: false` (`tmp/pass/layer-inventory.mjs:398`, `tmp/pass/layer-inventory.mjs:419`,
`tmp/pass/layer-inventory.mjs:444`, `tmp/pass/layer-inventory.mjs:453`). Recursive failures enter
the attestation reasons, and `readNpmTree` makes any such result incomplete
(`tmp/pass/layer-inventory.mjs:469`, `tmp/pass/layer-inventory.mjs:524`).

## Claim 4

`CONFIRMED` — The attack changed each compared snapshot field and separately used ancestry exit
`1`. `validateSnapshotReading` requires the manifest digest, lockfile digest, and valid Git readings
from each snapshot (`tmp/pass/layer-inventory.mjs:645`). `compareSnapshots` invalidates changed
manifest bytes, changed lockfile bytes, or changed status output
(`tmp/pass/layer-inventory.mjs:659`). `validateGitReading` admits ancestry exit `1` as a successful
negative relation while refusing other exits, signals, timeouts, and truncation
(`tmp/pass/layer-inventory.mjs:611`, `tmp/pass/layer-inventory.mjs:628`).
`evaluateCompleteness` supplies the component name when an invalid component returns no usable
reason (`tmp/pass/layer-inventory.mjs:682`). The cached-origin statement is explicit in the summary,
and the Git reader performs no fetch (`tmp/pass/layer-inventory.mjs:294`,
`tmp/pass/layer-inventory.mjs:702`).

## Claim 5

`BROKEN` — The Windows cleanup-failure path is unobservable. `executeCommand` derives
`termination.observed` only from the root child's `code` or `signal`, and the translated result has
no tree-kill outcome (`tmp/pass/layer-inventory.mjs:229`, `tmp/pass/layer-inventory.mjs:240`,
`tmp/pass/layer-inventory.mjs:249`). The installed process implementation returns `false` when
`taskkill` fails, is unavailable, or is cut off
(`node_modules/@orkestrel/process/dist/src/server/index.js:579`,
`node_modules/@orkestrel/process/dist/src/server/index.js:597`). Its `stopChild` path then falls back
to a direct root kill (`node_modules/@orkestrel/process/dist/src/server/index.js:683`). The
`execute` function discards the `stopChild` return before it builds its public result
(`node_modules/@orkestrel/process/dist/src/server/index.js:843`).

The falsifying Windows interleaving is: `taskkill` returns false, the direct fallback ends the root,
and a descendant remains. The instrument reports `termination.observed: true` because it observed
the root exit, while no field reports the failed tree cleanup. The process implementation itself
states that a descendant surviving the root is beyond its tree-discovery mechanism
(`node_modules/@orkestrel/process/dist/src/server/index.js:584`).

The smallest correct fix is to use a boundary that exposes the tree-termination outcome, retain
that outcome separately from root exit observation, and make a false tree outcome incomplete. The
adjacent timeout and buffer behavior held: `execute` bounds retained output and post-termination
settlement, the wrapper retains partial text, and `fetchPackument` clears its abort timer
(`node_modules/@orkestrel/process/dist/src/server/index.js:737`,
`tmp/pass/layer-inventory.mjs:241`, `tmp/pass/layer-inventory.mjs:580`,
`tmp/pass/layer-inventory.mjs:606`).

## Claim 6

`BROKEN` — The permanent controls do not bind the broken registry-identity and Windows
tree-cleanup paths, and they do not exercise final snapshot comparison. The registry family admits
only absent-tag and absent-release payloads (`tmp/pass/layer-inventory.test.mjs:113`). Its
membership rule is direct calls to `projectRegistryPayload` with inert JSON; it excludes root-name
disagreement, response decoding, HTTP status retention, fetch abort, and network behavior. The
child family admits a normally exiting flood child and a waiting child whose Windows termination
succeeds (`tmp/pass/layer-inventory.test.mjs:287`). Its membership rule is a real Node child driven
through `executeCommand`; it excludes `taskkill` failure, a surviving descendant, and unobserved
native exit. No control calls `compareSnapshots`, so changed manifest bytes, lockfile bytes, and Git
status have no permanent mutation pin.

The remaining control families have these bounds:

- The npm family directly calls the real projection with object payloads and excludes the npm CLI,
  parsing, nonzero exits, and the raw-to-attestation composition
  (`tmp/pass/layer-inventory.test.mjs:85`).
- The local and attestation families use real temporary files and the real readers. They exclude
  unreadable files, distribution digest failures, and recursive attestation-key collisions
  (`tmp/pass/layer-inventory.test.mjs:146`, `tmp/pass/layer-inventory.test.mjs:210`).
- The output family uses the real `lstat` preflight for absence and occupancy. It excludes dangling
  links, access denial, and a late-arrival race (`tmp/pass/layer-inventory.test.mjs:279`).
- The Git family calls the validator with inert command records. It excludes actual child execution
  and final snapshot comparison (`tmp/pass/layer-inventory.test.mjs:260`).
- The completeness family changes only the registry component of a prepared reading. It proves the
  empty-reason fallback for that component, not production of every component's `valid` field
  (`tmp/pass/layer-inventory.test.mjs:270`).
- The structure family matches named legacy exports and one parenthesized arrow-assignment spelling.
  It excludes nested function declarations, assigned function expressions, and bare-parameter
  arrows (`tmp/pass/layer-inventory.test.mjs:72`).

The retained red and green runs do use the same command, and root's independent run exits `0`
(`tmp/pass/d7n-layer-inventory-instrument-3/red.txt:1`,
`tmp/pass/d7n-layer-inventory-instrument-3/green.txt:1`,
`.orkestrel/campaign/docs-parity/d7n-layer-inventory-instrument-3-root.log.txt:1`). Those readings
do not cover the excluded failure paths. Add controls for the registry root mismatch, status
retention after body-decoding failure, final snapshot changes, and Windows tree-cleanup failure.

## Claim 7

`CONFIRMED` — Direct source inspection found no assigned nested function, rename-only legacy
wrapper, parser duplication, host filesystem separator algorithm, or unauthorized dependency. The
instrument keeps constants uppercase and frozen, exports reusable helpers, uses `node:path` for host
paths, and treats slash-delimited lock keys as storage-format data
(`tmp/pass/layer-inventory.mjs:7`, `tmp/pass/layer-inventory.mjs:132`,
`tmp/pass/layer-inventory.mjs:310`). `executeCommand` adds error containment and evidence-shape
translation to the declared `@orkestrel/process` primitive rather than renaming it
(`tmp/pass/layer-inventory.mjs:229`). The package declares that dependency
(`package.json:101`). The no-index diffs contain the instrument, controls, and child fixture only;
the stored status identifies the owner manifest/lock changes and campaign records separately
(`tmp/pass/d7n-layer-inventory-instrument-3/instrument.diff.txt:1`,
`tmp/pass/d7n-layer-inventory-instrument-3/controls.diff.txt:1`,
`tmp/pass/d7n-layer-inventory-instrument-3/fixture.diff.txt:1`,
`tmp/pass/d7n-layer-inventory-instrument-3/status.txt:1`). Naming taste and ergonomic fit belong to
the blind subjective lane.

## Findings fitting no claim

None.

## Attacked and held

- Claim 1 held against an undeclared sibling, an occupied path, and a non-`ENOENT` preflight error.
  A late occupant is correctly refused by the atomic `mkdir` call.
- Claim 3 held against keyed npm identity, foreign lock ancestry, installed identity/version
  disagreement, and optional absence. A foreign declared package nested under an Orkestrel ancestor
  is correctly excluded, while an exact Orkestrel lock path remains included.
- Claim 4 held against ancestry exit `1`, failed Git readings, changed digests, changed status, and
  an invalid component with an empty reason list. Negative ancestry is correctly evidence rather
  than a command failure.
- Claim 7 held against the predecessor's legacy helper names, assigned nested callback, process
  recursion, and path wrappers. The surviving process wrapper adds a translation boundary.
- Live registry behavior, npm CLI output across the fleet, inaccessible filesystem states, and a
  failed Windows `taskkill` were not executed in this lane. The source and retained controls cannot
  establish those external behaviors beyond the bounds stated in the verdicts.

VERDICT: FAIL 2, 5, 6; outside the claims: none

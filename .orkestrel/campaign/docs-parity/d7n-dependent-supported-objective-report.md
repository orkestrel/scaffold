# Dependent supported-major objective review

I held the reused objective correctness lane. I attempted to falsify the released
helper and carriers against the retained recovery contract. I did not execute a
carrier or mutate a target checkout.

## MAJOR — CONFIRMED

Attack: I checked whether the helper applied the fleet-name validator to external
tools, followed the registry latest tag across a declared major, lost the advisory,
depended on the caller's working directory, or leaked its Upstream instance.

Evidence:

- `tmp/pass/read-supported-toolchain.mjs:1-2` imports published Scaffold core and
  server entry points through paths resolved from the helper in `tmp/pass`, not from
  the target working directory.
- `tmp/pass/read-supported-toolchain.mjs:10-18` validates the full dependency with
  `isDependency`, derives the declared major with `extractRangeMajor`, and supplies
  `^<major>` to `Upstream.lookup`.
- `tmp/pass/read-supported-toolchain.mjs:19-26` records the full release observation,
  refuses a non-`found` result, independently verifies the returned version's major,
  and emits only the supported release for the caller to adopt.
- `tmp/pass/read-supported-toolchain.mjs:27-28` destroys Upstream through `finally`.
- The live helper and retained corrected snapshot share SHA-256
  `A94FD2501181B115DF6B1743351929C60057CF5A5206A3BE941C5EB1A4B2C7C0`.
- Root's real readings under `tmp/pass/d7n-dependent-supported-lookup-input` returned
  TypeScript `6.0.3` with advisory major `7`, Vitest `4.1.11` with advisory major `5`,
  and Oxfmt `0.67.0` with advisory major `0`; each exited `0`. These results refute
  latest-major adoption and cover Scaffold's deliberate major-zero selector.
- The retained predecessor TypeScript reading exited `1` at `isDependencyName`, so
  the correction is bound to the observed pre-network failure rather than a
  speculative change.

## FRESH — CONFIRMED

Attack: I looked for an unbound source state, an undeclared package-field mutation,
loss of package-specific metadata, bypass of supported overwrite/audit, or a final
artifact not tied to the reviewed authored bytes.

Evidence:

- `tmp/pass/prepare-dependent-registry-supported.sh:100-157` requires the retained
  source verdict, source HEAD, campaign branch, clean index and tree, exact package
  identity, and captures the starting state before mutation.
- `tmp/pass/prepare-dependent-registry-supported.sh:159-204` checks prior declared
  ranges, registry prerequisites, peer metadata, and the existing toolchain keys
  before asking the corrected helper for a supported release.
- The selected manifests carry every base toolchain key. MCP and Workflow also carry
  `@vitest/browser-playwright` and `playwright`. MCP carries
  `@modelcontextprotocol/conformance`; Middleware carries optional Database peer
  metadata. The carrier's package arrays match those existing declarations.
- `tmp/pass/prepare-dependent-registry-supported.sh:213-243` limits its direct field
  writes to declared runtime, development, and package-specific fields, restricts
  installation changes to the manifests, and commits the preparation before the
  generated-host pass.
- `tmp/pass/prepare-dependent-registry-supported.sh:245-315` uses installed Scaffold
  overwrite and audit, verifies retired scripts and guide mirrors, preserves authored
  guide/test hashes and peer metadata, binds final tool ranges to helper readings,
  refuses local resolutions and prior pins, runs format/prepublish/pack, and captures
  the exact final state without moving the prepared HEAD.
- The stopped Brief receipts already show overwrite, audit, lock, install, and the
  installed Guide/Scaffold checks exiting `0`. Its authored hashes are identical
  before and after overwrite. These receipts corroborate the preserved prefix of the
  fresh flow; they do not claim that the released fresh carrier has run.

## RESUME — CONFIRMED

Attack: I tried to admit another package or state, replay a completed mutation,
overwrite stopped evidence, or produce labels the closure carrier cannot consume.

Evidence:

- `tmp/pass/resume-dependent-registry-supported.sh:10-22` hard-codes Brief, pending
  version `0.0.8`, preparation HEAD
  `aeea7a504f9cff8342797bd26b35213536df73f1`, its dependency arrays, and the stopped
  visit label supplied as the only argument.
- `tmp/pass/resume-dependent-registry-supported.sh:72-98` refuses another label,
  absent stopped/install evidence, any prior resume/final evidence, a moved prepared
  HEAD, or a failed completed overwrite/audit/lock/install/tool receipt.
- `tmp/pass/resume-dependent-registry-supported.sh:106-119` requires the canonical
  campaign branch and HEAD, an empty index, no untracked input, exact equality with
  the completed-install status, binary diff, index, manifest hashes, and reviewed
  authored hashes before recording the resume boundary.
- The retained install receipt has action exit `0`; its manifest hashes are present,
  and its status, binary diff, and full index provide the exact dirty-state binding
  used by those comparisons.
- `tmp/pass/resume-dependent-registry-supported.sh:121-167` starts after installation.
  It revalidates installed Guide/Scaffold identity, peer metadata, supported-major
  observations and final ranges, then runs only the remaining final checks and pack.
  It retains stopped files, uses new `resume-*`, `external-registry-*`, and
  `external-final-*` receipts, and writes the parent visit's final capture expected by
  closure.

## CLOSE — CONFIRMED

Attack: I looked for commit-before-proof ordering, broad staging, undeclared guide
mirrors, missing package-specific metadata, tool ranges detached from accepted
observations, incomplete ref convergence, or an authentication/upload action.

Evidence:

- `tmp/pass/close-dependent-registry-supported-release.sh:70-99` binds the package,
  version, visit label, prepared verdict, source and packed HEAD, clean input, green
  prepublish/pack receipts, exact manifest hashes, binary diff and index before
  checking packed manifest, full dist, archive checksum and native manifest.
- `tmp/pass/close-dependent-registry-supported-release.sh:101-153` validates runtime,
  development, MCP/Middleware peer fields, retired scripts, installed Guide/Scaffold
  identities, peer metadata, registry-backed toolchain observations and final ranges.
  MCP conformance must equal its before, final-visit, and current readings.
- `tmp/pass/close-dependent-registry-supported-release.sh:156-176` permits only the
  named metadata/generated-host paths and admits a changed guide mirror only when its
  name is present in the package's declared runtime, development, or field arrays.
- `tmp/pass/close-dependent-registry-supported-release.sh:177-210` stages each approved
  path explicitly, commits only after those checks, pushes the campaign and main refs,
  makes canonical local main a clean fast-forward of `origin/main`, compares every
  release ref, and rechecks final manifest and full dist.
- No preparation, resume, or closure carrier contains an npm authentication,
  credential, or publish command.

## Measurement limit

Root has executed the corrected helper and preserved the stopped Brief prefix. Root
has not executed the released resume, fresh preparation, or closure carrier. This
verdict establishes that their source and retained inputs satisfy the bounded
recovery contract and are ready for root execution. It does not claim package gates,
Git transitions, registry publication, or upload results from those carriers.

VERDICT: PASS

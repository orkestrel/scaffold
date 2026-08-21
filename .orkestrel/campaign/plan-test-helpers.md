# Reconciled plan — test-helper consolidation into `@orkestrel/test` 0.0.9

Reconciled 2026-08-21 from the subjective lane (`planner`, Opus 5) and the objective lane
(`analyst`, GPT-5.6 Sol, thread `01a0255c`), both run blind on one brief. Probes settled every
disagreement the lanes could not; each probe carried a negative control that failed where planted.

## Probe rulings

| Question | Winner | Evidence |
| --- | --- | --- |
| Can the recorder factory avoid the `Partial` accumulator without `as`? | Opus — yes; `isTotal` dies | direct construction compiles under `--strict`; control failed at the planted line |
| Does bare `Reflect.apply` replace `invokeRaw`? | Opus — no; adopt the wrapper | `Reflect.apply` returns `any`, banned at call sites; the wrapper is the typed boundary |
| `findRule` return type at the sites | Neither as stated | all sites return `boolean`; adopt `CSSStyleRule \| undefined` under the contract name |
| Does the destination `style` trim? | — | no (`src/browser/helpers.ts:1230`); the trim is a behavior change carried to the guide unit |
| `router` root URL defect | Refuted | `new URL('..')` and `new URL('../')` resolve identically |

## Naming ruling

The style-primitive vocabulary in `.claude/rules/tests.md` § Style primitives is a standing fleet
contract, and it is vendored. Keeping the contract names (`mount`, `render`, `build`, `style`,
`token`, `rootToken`, `pixels`, `rgba`, `colorEqual`, `findRule`, `typeInput`, `createPointerEvent`,
`createDragEvent`) avoids a `scaffold` vendored release inside this campaign. The subjective lane's
renames are recorded as a candidate for a later rules campaign, not adopted.

## Adopted surface

Core (`@orkestrel/test`):

| Symbol | File | Note |
| --- | --- | --- |
| `EventSourceInterface<TMap>` | `src/core/types.ts` | declares only `on`; `EmitterInterface` satisfies it structurally; no runtime dependency |
| `RecorderMap<TMap, TName>` | `src/core/types.ts` | replaces the fleet's pluralized `EmitterRecorders` |
| `createRecorders(source, events)` | `src/core/factories.ts` | direct construction, no guard, no throw path; absorbs sixteen sites |
| `SignalInterface`, `createSignal` | `src/core/types.ts`, `factories.ts` | abort-listener tally on a real `AbortController`; the once-listener desync is fixed and proven |
| `ResourceFactoryInterface`, `createResourceFactory` | `src/core/types.ts`, `factories.ts` | numeric allocator with created/destroyed recorders; keeps the fleet name — the entity is a factory |
| `waitForAbort(signal)` | `src/core/helpers.ts` | already-aborted fast path is the invariant `waitForEvent` cannot express |
| `invokeUnchecked`, `readProperty` | `src/core/helpers.ts` | the sanctioned no-assertion boundary; contains the `any` in one audited place |
| `flattenHeaders(init)` | `src/core/helpers.ts` | normalizes through `new Headers(init)` |
| widen `createHostileValues` | `src/core/factories.ts` | absorb revoked array proxy, cyclic array, sparse array, non-enumerable own key, named throwing getter; dedupe against the existing set |
| widen `createRecorder` | `src/core/factories.ts` | `TArgs` defaults to `readonly unknown[]` |
| widen `retryUntil` | `src/core/helpers.ts` | exhaustion message names the last produced value |

Browser (`@orkestrel/test/browser`):

| Symbol | File | Note |
| --- | --- | --- |
| `mount(element)` | `src/browser/helpers.ts` | contract name; append and return; flagged for the audit round's wrapper attack |
| widen `render` | `src/browser/helpers.ts` | tag-and-class overload with the class argument required, beside `render(markup)` |
| `build(tag, options?)`, `ElementOptions` | `src/browser/helpers.ts`, `types.ts` | unmounted construction; classes, text, attributes |
| widen `style` | `src/browser/helpers.ts` | trim the returned value; behavior change, guide fence moves with it |
| `token(element, name)`, `rootToken(name)` | `src/browser/helpers.ts` | contract names; `rootToken` kept as the contract's named form |
| `pixels`, `rgba`, `colorEqual` | `src/browser/helpers.ts` | contract names; `rgba` resolves through a probe element, `parseColor` stays pure |
| `findRule(selector)`, `findKeyframes(name)` | `src/browser/helpers.ts` | return the rule or `undefined`; sites migrate their boolean asserts |
| `removeDatabase(name)` | `src/browser/helpers.ts` | raw `indexedDB` deletion with explicit blocked semantics; no Orkestrel type |
| `typeInput`, `commitInput` | `src/browser/helpers.ts` | bubbling `input`; `commitInput` adds the bubbling `change` |
| `createPointerEvent`, `createDragEvent` | `src/browser/factories.ts` (new) | named by the tests rule as centralized event factories |

Server (`@orkestrel/test/server`):

| Symbol | File | Note |
| --- | --- | --- |
| `UpgradeResult` | `src/server/types.ts` | claim, status, selected protocol |
| `requestUpgrade` | `src/server/helpers.ts` | real `node:http` upgrade; settles once across `upgrade`, `response`, `error`; always releases the socket |
| `supportsDirectoryLinks`, `supportsFileLinks`, `supportsMode`, `supportsCase`, `supportsBytes` | `src/server/helpers.ts` | host-capability probes as functions, never import-time constants |

## Rejections — the load-bearing refusals

- **Manual clocks and timers** — `AGENTS.md` names fake clocks in the non-negotiables; an injected
  `advance`/`set` clock simulates time whatever seam receives it. The objective lane's strict
  reading wins over the subjective lane's missing-seam argument.
- **The database family** — schema and lifecycle knowledge of `@orkestrel/indexeddb` and
  `@orkestrel/database`; adopting it inverts the dependency or re-declares a foreign contract.
- **`WORKSPACE_ROOT`** — a package constant resolves against `node_modules`; `resolveRoot(meta)` is
  the mechanism and one binding line per repo is not duplication.
- **`uniqueName`** — a template literal over `crypto.randomUUID()`; fails the wrapper test.
- **`EXTREME_NUMBERS`, `HOSTILE_KEYS`** — the site corpora disagree because they test different
  things; membership is coverage policy.
- **Vue mount helpers, `waitForBootstrap`** — would add a framework peer to a package that peers
  only on `vitest`.
- **`isBrowserVuePath` (seventeen repositories) and the guide-parity machinery** — fleet policy
  vocabulary whose home is the vendored `scaffold` set; recorded as a `scaffold` finding.
- **Every `assert*` calling `expect` in setup, every SCSS/Markdown analyzer, every foreign-interface
  recorder, every framework widget builder, `createGate`, `deepEquals`, deep-nest builders, `env`.**

## Deferred, recorded for the next campaign

Store-contract scenario battery; SSE fixtures; `duplexPair`/`flushSocket`; `postJSON`; multipart
builders; `installDisposeHarness` (needs a prototype-patching ruling); the subjective lane's
style-primitive renames and the vendored `tests.md` edit they would force.

## Units and routing

Writers run strictly serialized in `/home/user/test`, one at a time from a committed baseline.

| Unit | Role | Engine | Owns | Delivers |
| --- | --- | --- | --- | --- |
| U1 core | `sol` | GPT-5.6 Sol (journaled exec, workspace-write) | `src/core/{types,factories,helpers}.ts`, `tests/src/core/{factories,helpers}.test.ts` | core adopted surface and widenings |
| U2 browser | `implementer` | Opus 5 (native) | `src/browser/{types,helpers,factories,index}.ts`, `tests/src/browser/*` | browser adopted surface |
| U3 server | `sol` | GPT-5.6 Sol (journaled exec, workspace-write) | `src/server/{types,helpers,index}.ts`, `tests/src/server/*` | server adopted surface |
| U4 guide | `implementer` | Opus 5 (native) | `guides/test.md` | Surface, Methods, Patterns parity in the package-guide voice |
| A1 audit | `reviewer` + `analyst` | Opus audits U1/U3; Sol audits U2/U4 | read-only | falsify round; auditor engine never audits its own writer's unit |
| V gates | `verifier` | Sonnet (native) | read-only | `format:check → lint:check → check → build → test` exit-code truth |

## After green

1. Bump `@orkestrel/test` to 0.0.9, build, pack the tarball under `tmp/`.
2. Adoption wave across the **Orkestrel repositories only** (user instruction 2026-08-21: the
   mikesaintsg repositories are excluded from propagation): install the tarball, delete local
   duplicates of adopted helpers, re-point imports, prove each repo's own gates, serialized per
   repo and parallel across disjoint repos.
3. Restore registry ranges before any distribution proof; surface the publish approval to the user
   — publishing is the user's decision and credential.
4. After publish: consumers re-pin `package.json` and `package-lock.json` on `main` with no version
   bump unless a consumer's own published surface materially moved (the dist comparison decides).

## Exit criterion

The campaign closes when: `@orkestrel/test` 0.0.9 exports the adopted surface with gates green and
guide parity green; every Orkestrel repository that carried a duplicate of an adopted helper
imports it from `@orkestrel/test` with its own gates green, proven first against the tarball;
the publish approval has been surfaced; and the deferred list and `scaffold` findings are recorded.
Excluded on evidence: the mikesaintsg repositories (user instruction), the vendored policy set, and
every rejected family named earlier.

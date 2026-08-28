# Fix dossier: test

Verified fix-producing findings for the `test` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s11-30 — DRIFT-RESHAPE

30. package=test file=/home/user/fleet/test/src/core/helpers.ts:51-56 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: The budget-and-interval bound validation is written out six times, identical but for the noun in the message: `waitForCondition` (`core/helpers.ts:51-56`), `retryUntil` (`:99-104`), `waitForEvent` (`:239-244`), `waitForSocketClose` (`server/helpers.ts:312-317`), `destroyScratch` (`:388-393`), `requestUpgrade` (`:452-457`). Every member of the wait family therefore has its own copy of one contract.
    repair: Export one leaf from `core/helpers.ts` — `checkBounds(subject: string, options?: WaitOptions): void` — and call it from all six, passing `'Wait'`, `'Retry'`, `'Event'`, `'Socket'`, `'Scratch'`, `'Upgrade'`. Unit-test it once.

### Verification

**Judge (DRIFT-RESHAPE/high):** The duplication is exact and nothing defends it, but the subjective lane caught a defect in the repair that would ship a regression, and I verified it at every site. Each member of the wait family resolves its own defaults before validating — `const budget = options?.budget ?? 1000` then the bound c

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: export `checkBounds(subject: string, budget: number, interval: number): void` from `src/core/helpers.ts` — taking the RESOLVED values, not `WaitOptions` — and call it after each caller applies its own defaults, passing 'Wait', 'Retry', 'Event', 'Socket', 'Scratch', 'Upgrade'. Unit-test it once. `retryUntil`'s `attempts` check (core/helpers.ts:105-107) stays at its own site.

## s11-31 — DRIFT

31. package=test file=/home/user/fleet/test/src/core/helpers.ts:124-131 rule=.claude/rules/typescript.md § Errors and outcomes ("Use the existing outcome contract … do not redeclare it at each call site") verdict=CONFIRMED
    wrong: `retryUntil` declares an anonymous `{ success: false; error } | { success: true; value }` union inline as a local annotation — the `Result<T, E>` shape the rule names, redeclared at a call site rather than defined once in the owning `types.ts`.
    repair: Declare `Success<T>`, `Failure<E>`, and `Result<T, E>` in `src/core/types.ts` exactly as the rule's block states, and annotate `produced` with `Result<T, unknown>`.

## s11-32 — DRIFT-RESHAPE

32. package=test file=/home/user/fleet/test/src/core/helpers.ts:115-123 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `retryUntil` constructs the same exhaustion error twice — the elapsed check at `:116-122` and the identical block at `:153-159`, sharing the message template, the `last` interpolation, and the `cause`. A message edit has to land in two places.
    repair: Fold the two into one check. The loop-top guard at `:115-123` is reachable only after the loop-bottom guard at `:153-159` already ran, so delete the loop-top copy and keep one construction.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: keep both guards and extract the exhaustion-error construction into one exported leaf in `src/core/helpers.ts` (unit-tested once), called from both sites

**Lane DRIFT-RESHAPE/high:** amend: keep both elapsed checks and route their throws through one exported leaf in `src/core/helpers.ts` — `buildRetryExhausted(description: string, budget: number, elapsed: number, last: string | undefined, cause: unknown): Error` — called from :118 and :155, unit-tested once. Do not delete the loop-top guard.

## s11-33 — DRIFT

33. package=test file=/home/user/fleet/test/src/server/helpers.ts:99-105 rule=.claude/rules/architecture.md § Kind purity ("non-trivial or reusable → extract, export, unit-test, and route every duplicate through it") verdict=CONFIRMED
    wrong: The six-line narrowing that reads a `code` off an unknown thrown value is written identically in `createLink` (`:99-105`) and `removeTree` (`:135-141`).
    repair: Export `readErrorCode(error: unknown): string | undefined` from `src/server/helpers.ts`, call it from both, and unit-test it against a plain object, an `Error` with a non-string `code`, and a null prototype.

## s11-34 — DRIFT

34. package=test file=/home/user/fleet/test/src/server/factories.ts:47-51 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `createScratch` builds the same `ScratchIdentity` from a `Stats` three times (`:47-51`, `:140-144`, `:154-158`), and opens seven of its nine members with the same `resolveContained` call followed by the same `${outside}: ${target}` throw (`:70-71,80-81,91-92,102-103,112-113,124-125,133-134`).
    repair: Export two leaves from `src/server/helpers.ts` — `statusToIdentity(status): ScratchIdentity` and `requireContained(root, target): string` — and route all three and all seven sites through them.

## s11-35 — DRIFT-RESHAPE

35. package=test file=/home/user/fleet/test/src/core/factories.ts:224-229 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice") and § Functions and orchestration verdict=CONFIRMED
    wrong: Inside `createSignal`, the deregistration sequence — find the registration by its installed listener, splice it out, abort its cleanup controller — is written at `:224-229` (the one-shot path) and again at `:249-255` (the scope-abort path). The whole instrumented entity is 110 lines of closure state inside one factory, which is what makes the duplication invisible.
    repair: Promote the instrumentation to a `Signal` class in `src/core/signals/Signal.ts` with `#registrations` and a `#drop(installed)` private method both paths call, and have `createSignal` return `new Signal()` as `SignalInterface`.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: extract the shared find-splice-abort sequence into one exported, unit-tested leaf in `src/core/helpers.ts` and call it from both paths; keep `createSignal` instrumenting a real `AbortController`'s own `signal` and do not introduce a `Signal` class in its place

**Lane DRIFT-RESHAPE/high:** amend: keep `createSignal` returning the real controller and its real instrumented signal. Extract the shared sequence — find the registration by its installed listener, splice it out, abort its cleanup controller — into one named routine both paths call, leaving the scope-abort path's extra `remove(type, installed, { capture })` at its own site. Do not introduce a `Signal` class as `SignalInterface`.

## s11-36 — DRIFT-RESHAPE

36. package=test file=/home/user/fleet/test/src/browser/types.ts:81 rule=AGENTS.md § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: `states` names two different sets one call apart. `PortfolioOptions.states` (`:62`) is the registry of every name the run may place; `PortfolioInterface.states` (`:81`) is only what has been placed so far. A consumer who writes `createPortfolio({ states })` and then reads `portfolio.states` gets a different set under the same word, and `createPortfolio` (`browser/factories.ts:111,119-121`) keeps both under `registry` and `placed` internally — the two names the API should have exposed.
    repair: Rename `PortfolioInterface.states` to `placed`, matching the factory's own internal vocabulary, and update the guide's surface row.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: split the two names with nouns — rename `PortfolioOptions.states` to `registry` (the factory's own word at browser/factories.ts:111), or rename `PortfolioInterface.states` to `placements`; do not use `placed`, which reads as a boolean

**Lane DRIFT-RESHAPE/medium:** amend: rename `PortfolioInterface.states` to `placements` — a plural noun matching its siblings `paths` and `files`, derived from the `place` method that fills it — rather than to `placed`. Update `src/browser/factories.ts:119-121`, the guide's surface row, and every fence. Leave `PortfolioOptions.states` as the declared registry.

## s11-37 — DRIFT

37. package=test file=/home/user/fleet/test/src/browser/helpers.ts:1593 rule=.claude/rules/names.md § Standalone helpers ("default to `{verb}{Noun}`"; "A one-word helper is valid only when its meaning and arguments are unmistakable") verdict=CONFIRMED
    wrong: The browser layer runs one `read*` family of readers — `readPerception`, `readPage`, `readFocus`, `readValue`, `readText`, `readRole`, `readName`, `readStates`, `readLayers`, `readBackdrop`, `readRing`, `readRows`, `readCascade`, `readRules` — and then names six more readers as bare nouns: `style` (`:1593`), `token` (`:1621`), `rootToken` (`:1642`), `pixels` (`:1669`), `contrast` (`:1307`), `rgba` (`:1092`). `style(element, 'padding-left')` is the sharpest of these: read as a verb it means to apply styling, and the file next door does stage and mutate the page. `contrast` also duplicates the term `measureContrast` (`:1202`) already owns, and `rgba` names its output format where its documented pair `parseColor` names the action. `guides/test.md:412` groups these as a family but states no exception to the naming rule.
    repair: Rename to `readStyle`, `readToken`, `readRootToken`, `readPixels`, `readContrast`, and `resolveColor`, so one prefix means one thing and `measure*` stays with the two pure color computations. Update the guide's surface tables and every fence.

## s11-38 — DRIFT

38. package=test file=/home/user/fleet/test/src/browser/helpers.ts:1128 rule=.claude/rules/names.md § Standalone helpers ("A helper prefix has one project-wide meaning: … `matches*` is a predicate") verdict=CONFIRMED
    wrong: `colorEqual` is noun-first with an adjective tail, in a file whose other color functions are all verb-first (`blendColor`, `measureLuminance`, `measureContrast`, `parseColor`).
    repair: Rename to `matchesColor`, which is the project's declared predicate prefix, and update the guide surface row and fences.


# Ollama retained candidate review

## O-ACCEPT — CONFIRMED

The retained diff closes the named documentation corrections without changing executable source or public declarations. This is a source review of the documentation delta, not an executed behavioral audit or release verdict.

I attacked the shape cells for lost optionality, mutable collections, wrong return types, and mistaken class contracts. In `ollama/guides/ollama.md:66`, the `createOllama` signature matches `src/server/factories.ts:79`. The `mapMessages`, `buildResult`, extraction, and `joinThinking` signatures match their declarations in `src/server/helpers.ts:28`. The `parseBody` row preserves the promise and optional record return declared at `src/server/parsers.ts:24`. The guard row names the predicate target at `src/server/errors.ts:56`. The error constructor cell preserves its optional options parameter at `src/server/errors.ts:38`; the provider cell names its implemented interface at `src/server/OllamaProvider.ts:81`.

The interface cells retain the declared property names and optional markers. The function-valued `fetch` and `headers` properties in `src/server/types.ts` remain data members under the governing shape convention. They do not require a method list after `plus`. The constants use the widened primitive types that Ruling 21 requires; their literals remain in the descriptions. Narrowing those cells to literal types would contradict that ruling.

I compared the source hunks in `scaffold/tmp/pass/d7n-ollama-release-initial/diff-before.txt` and the retained `d7n-ollama-converge-fix-return.diff.txt` with the implementations. The changes remain within comments and doc blocks. The constant descriptions retain the configured defaults and the error-body cap. The provider still obtains context framing from its constructor option, forwards structured output from the per-call schema, and merges dynamic headers in the request path. Lowercasing the emphasis does not reverse those distinctions. The replacement parser reference names the imported factory used by the stream.

The guide corrects its opening subject, sentence capitalization, and package-token formatting. Its shape convention precedes the mixed table. The guide's fences have lead-in prose, and the carried member-link correction has no applicable site. The README exception remains governed by Ruling 24. Existing behavioral claims outside the named corrections are not re-certified by this review.

## O-TEST — CONFIRMED

The supplied test diff contains the named commentary changes and the diagnostic wording change at `ollama/tests/setup.test.ts:140`. The guard remains `if (!isAbortError(value))`, the thrown class remains `Error`, and the surrounding assertions remain unchanged. The diagnostic replaces `above` with `earlier`.

I attacked the assertion-preservation claim by reading the complete enclosing case and its imported guard. The case constructs an `Error`, sets its name to `AbortError`, asserts the guard result, and checks the message `aborted`. The guard at `ollama/tests/setupServer.ts:107` checks the error class and name. The diagnostic text does not participate in that decision or either assertion. The service-test hunks change comments alone; they change no inputs, assertions, retries, or timeouts.

The original comment-only description was inaccurate at the diagnostic site. The successor brief explicitly admits that wording correction. This finding supports that bounded exception and does not endorse the writer's broader claim that every runtime token was preserved.

## O-HOST — CONFIRMED

The header hunk changes no guide-test execution. The package retains the titled-example population assertion at `ollama/tests/guides.test.ts:73`, the README tagline assertion at `:102`, summary and example comparison at `:182`, and the flagship provider and framing assertions at `:265`. The surrounding export, method, example, import, and link checks also remain intact.

I attacked whether native adoption would require retiring these assertions. The installed `GuideCommand` declaration at `ollama/node_modules/@orkestrel/guide/dist/src/server/index.d.ts:78` accepts a package assertion callback. Its context exposes fresh files, joined rows, and the parity report. That contract can carry the retained package assertions. Rulings 34 and 35 explicitly preserve package ownership while moving command mechanics into Guide.

This confirms preservation and compatibility of the baseline. It does not confirm an implemented native entry. The top-level `@src/server` import at `ollama/tests/guides.test.ts:6` remains present; moving package imports and assertion registration behind the worker callback belongs to native adoption. That successor still owes direct-entry execution, explicit rewrite directions, fresh-byte assertions, and the retained flagship behavior. The obsolete drop-in-byte and `scripts/docs.ts` criteria cannot require keeping a superseded host design.

## O-CUSTODY — CONFIRMED

The actual status in `scaffold/tmp/pass/d7n-ollama-release-initial/status-before.txt` lists only the guide, source documentation, guide-test header, and named test sites admitted by the landing allowlist. The corresponding diff changes no manifest, lockfile, vendored configuration, barrel, or production implementation. The Ollama-specific exception in `scaffold/tmp/pass/land-p2.sh:60` names the service and setup test paths; the following stage allowlist admits the guide, source, and guide-test paths. That script checks path admission, not token preservation.

I attacked whether the writer's return or historical green evidence was being substituted for acceptance. The retained `d7n-ollama-fix-return-status.md` explicitly records the candidate as unaccepted and identifies the diagnostic discrepancy. The successor brief resolves that discrepancy expressly. The historical docs and guide logs under `evidence/d7n-ollama-host-readonly` record their own commands, not native-entry or release completion. The supplementary isolated config result at `scaffold/tmp/pass/d7n-ollama-return-config-alone/action.exit.txt` is `1`; it cannot support a final green claim. Native adoption, supported repair, live-service execution, and final registry/prepublish verification remain separate obligations.

## Outside findings

No substantiated finding outside these claims requires changing this candidate. Historical report prose and its inaccurate no-deviation conclusion remain annotations to the retained record, not authority to broaden the source edit.

## Attacked and held

The verdicts record the attacks and their evidence. The adjacent distinctions remain explicit: a function-valued property is not a method-syntax member; a widened constant cell is not a changed declaration; a diagnostic wording exception is not a general test-behavior exception; and an available native registration contract is not completed native adoption.

VERDICT: PASS

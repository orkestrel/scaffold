# Fix report: abort

## Dispositions

- **s18-28** applied (src/core/factories.ts): Re-verified: the `createAbort` `@example` still imported from `@src/core` at src/core/factories.ts:23 while `helpers.ts` (`linkSignal`) and `validators.ts` (`isAbortSignal`) import from `@orkestrel/abort`. Changed the specifier to `@orkestrel/abort`. Non-breaking: TSDoc content only. The guides parity test maps both specifiers to `src/core`, so the fence still resolves.
- **s18-36** applied (src/core/types.ts): Re-verified: `AbortInterface` members carried no TSDoc. Added a one-line description to `id`, `signal`, and `aborted`, and a block on `abort` with `@param reason` stating that a defined reason is kept verbatim (including a falsy `null`, `0`, `''`, or `false`) while `undefined` defaults `signal.reason` to an `AbortError` `DOMException` — the behavior the `Abort` class TSDoc already describes. Third-person voice per the fleet ruling. Non-breaking: documentation only, no type or signature change. Ancillary choices mine: exact wording and the decision to leave `AbortOptions.id` alone, which the finding scopes out.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1893ms on 39 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no output)
- npm run build: pass — dist/src/core/index.js 8.17 kB | gzip: 2.65 kB; dist/src/core/index.cjs 8.65 kB; built in 3.44s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — Test Files 4 passed (4) / Tests 51 passed (51); 111 passed; 46 passed; setup 2 passed; guides 18 passed

## Diffstat

```text
 src/core/factories.ts |  2 +-
 src/core/types.ts     | 10 ++++++++++
 2 files changed, 11 insertions(+), 1 deletion(-)
```

- dist moves: true

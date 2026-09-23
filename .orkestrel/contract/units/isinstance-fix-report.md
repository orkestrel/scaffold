# ISINSTANCE-FIX — the unit's report (sol on GPT-6 Astra)

Thread `01a0d017-6e12-73e3-9e1a-74f2e8a4bf22`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/isinstance-fix.jsonl` (launch copy under `tmp/codex/`); 24 commands; 355 s; usage {"input_tokens":1631329,"cached_input_tokens":1519872,"cache_write_input_tokens":0,"output_tokens":8425,"reasoning_output_tokens":814}. Retained verbatim from the exec's last message.

---

Implemented ISINSTANCE-FIX. All acceptance commands exited 0.

- **F1:** Changed `isInstance` to narrow to `InstanceType<C>` with the specified constructor constraint. Preserved the executable body verbatim, corrected the internal comment, and expanded `@remarks`.
- **F2:** Added compile-time proofs for `Date`, an abstract class, required constructor arguments, `Map`, nullable base/derived branches, non-constructor refusal, and parity with `instanceOf(Date)`. Every added case includes a runtime assertion.
- **F3:** Preserved the guide unchanged. Its Summary already equals the description paragraph, and its Shape is already `InstanceType<C>`. The section contains no prose, so the conditional prose addition does not apply. Guide parity passed.

The exact signature, TSDoc, comment, and body are:

```ts
/**
 * Determines whether a value is an instance of a constructor, contained against
 * a throwing `instanceof` check.
 *
 * @remarks
 * The low-level total helper every `instanceof`-based guard in this file (and
 * the `instanceOf` combinator) routes through. A bare `value instanceof X` is
 * NOT total, which `.claude/rules/patterns.md` § Validation and contracts
 * requires: it invokes `getPrototypeOf` on `value` — which a
 * revoked `Proxy` or a `getPrototypeOf`-trap `Proxy` throws from — and, when
 * `X[Symbol.hasInstance]` is user-defined, can throw from arbitrary code. This
 * wraps the check in {@link holds} (see ./helpers.js) so any such throw
 * yields `false` instead of escaping.
 *
 * Narrows `value` to `InstanceType<C>`, which reads the constructor's last
 * construct signature. Accepts the same constructors as `instanceOf`: a public
 * or abstract construct signature returning an object. A class with a private
 * or protected constructor, a `Function`-typed value, and the bare `AnyConstructor`
 * are refused at the call. When checking a base-class value against a derived
 * constructor, the false branch keeps the declared type. Constructors whose
 * instance types admit primitives structurally, including `Object` and
 * `Function`, can make the false branch unsound; use `isObject` and `isFunction`
 * for those checks instead.
 *
 * @param value - The value to test
 * @param ctor - The constructor to test against
 * @returns True if `value instanceof ctor`; false otherwise, including on a
 *          contained throw
 *
 * @example
 * ```ts
 * isInstance(new Date(), Date) // true
 * isInstance({}, Date)          // false
 * ```
 */
export function isInstance<C extends abstract new (...args: never) => object>(
	value: unknown,
	ctor: C,
): value is InstanceType<C> {
	// Narrow `ctor` through `isFunction` inside `holds`: a generic right-hand side
	// loses TypeScript's `instanceof` leniency inside another generic call.
	const target: unknown = ctor
	return holds(() => isFunction(target) && value instanceof target)
}
```

The measured answers to the Unknowns are:

- `InstanceType<MapConstructor>` is exactly `Map<unknown, unknown>`. The guarded branch passes equality assertions against each type under the root project.
- The root project accepts `Expect<Equal<{} extends Parameters<typeof isInstance>[1] ? true : false, false>>`. No fallback form was needed. Against the published signature, this assertion produced TS2344; after F1, it produced no diagnostic.

The red-first run used the added proofs with the published signature unchanged. `npm.cmd run check` exited 1 with 10 diagnostics. Its output was:

```text
npm notice run @orkestrel/contract@0.0.17 check
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
tests/src/core/combinators.test.ts(1008,66): error TS2344: Type 'Date' does not satisfy the constraint '{ valueOf: "Expected: function, Actual: never"; [toPrimitive]: "Expected: function, Actual: never"; getTime: "Expected: function, Actual: never"; toDateString: "Expected: function, Actual: never"; ... 40 more ...; toLocaleString?: "Expected: function, Actual: never"; }'.
  Types of property 'valueOf' are incompatible.
    Type '() => number' is not assignable to type '"Expected: function, Actual: never"'.
tests/src/core/validators.test.ts(698,66): error TS2344: Type 'Date' does not satisfy the constraint '{ valueOf: "Expected: function, Actual: never"; [toPrimitive]: "Expected: function, Actual: never"; getTime: "Expected: function, Actual: never"; toDateString: "Expected: function, Actual: never"; ... 40 more ...; toLocaleString?: "Expected: function, Actual: never"; }'.
  Types of property 'valueOf' are incompatible.
    Type '() => number' is not assignable to type '"Expected: function, Actual: never"'.
tests/src/core/validators.test.ts(710,67): error TS2344: Type 'Shape' does not satisfy the constraint '{ area: "Expected: number, Actual: never"; }'.
  Types of property 'area' are incompatible.
    Type 'number' is not assignable to type '"Expected: number, Actual: never"'.
tests/src/core/validators.test.ts(722,67): error TS2344: Type 'Point' does not satisfy the constraint '{ x: "Expected: number, Actual: never"; }'.
  Types of property 'x' are incompatible.
    Type 'number' is not assignable to type '"Expected: number, Actual: never"'.
tests/src/core/validators.test.ts(729,38): error TS2344: Type 'Map<unknown, unknown>' does not satisfy the constraint '{ [iterator]: "Expected: function, Actual: never"; [toStringTag]: "Expected: string, Actual: never"; forEach: "Expected: function, Actual: never"; ... 10 more ...; getOrInsertComputed: "Expected: function, Actual: never"; }'.
  Types of property '[iterator]' are incompatible.
    Type '() => MapIterator<[unknown, unknown]>' is not assignable to type '"Expected: function, Actual: never"'.
tests/src/core/validators.test.ts(730,38): error TS2344: Type 'Map<unknown, unknown>' does not satisfy the constraint '{ [iterator]: "Expected: function, Actual: never"; [toStringTag]: "Expected: string, Actual: never"; forEach: "Expected: function, Actual: never"; ... 10 more ...; getOrInsertComputed: "Expected: function, Actual: never"; }'.
  Types of property '[iterator]' are incompatible.
    Type '() => MapIterator<[unknown, unknown]>' is not assignable to type '"Expected: function, Actual: never"'.
tests/src/core/validators.test.ts(744,39): error TS2344: Type 'Derived' does not satisfy the constraint '{ base: true; derived: "Expected: literal boolean: true, Actual: never"; }'.
  Types of property 'derived' are incompatible.
    Type 'true' is not assignable to type '"Expected: literal boolean: true, Actual: never"'.
tests/src/core/validators.test.ts(746,39): error TS2344: Type 'Base | null' does not satisfy the constraint '"Expected: null, Actual: never" | "Expected: ..., Actual: never"'.
  Type 'null' is not assignable to type '"Expected: null, Actual: never" | "Expected: ..., Actual: never"'.
tests/src/core/validators.test.ts(753,11): error TS2344: Type 'false' does not satisfy the constraint 'true'.
tests/src/core/validators.test.ts(754,21): error TS2344: Type 'true' does not satisfy the constraint '"Expected: literal boolean: true, Actual: literal boolean: false"'.
```

After F1, the same `npm.cmd run check` command exited 0 with no diagnostics:

```text
npm notice run @orkestrel/contract@0.0.17 check
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
npm notice run @orkestrel/contract@0.0.17 check:src
npm notice run npm run check:src:core
npm notice run @orkestrel/contract@0.0.17 check:src:core
npm notice run tsc --noEmit -p configs/src/tsconfig.core.json
```

`npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts guides/contract.md` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts guides/contract.md
```

`npx.cmd oxfmt --config .oxfmtrc.json --check src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts guides/contract.md` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts guides/contract.md
Checking formatting...

All matched files use the correct format.
Finished in 676ms on 4 files using 16 threads.
```

`npm.cmd run test:src` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 test:src
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/contract

·····························································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································

 Test Files  19 passed (19)
      Tests  1357 passed (1357)
   Start at  17:10:00
   Duration  4.87s (transform 9.39s, setup 9.79s, import 6.08s, tests 10.41s, environment 3ms)

```

`npm.cmd run test:guides` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/contract

················································

 Test Files  1 passed (1)
      Tests  48 passed (48)
   Start at  17:10:00
   Duration  1.94s (transform 350ms, setup 613ms, import 1.12s, tests 20ms, environment 0ms)

```

`npm.cmd run build:src:core` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 build:src:core
npm notice run vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts
vite v8.3.0 building client environment for production...
transforming...
✓ 22 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.js  398.11 kB │ gzip: 91.31 kB │ map: 758.65 kB

transforming...
✓ 22 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.cjs  403.60 kB │ gzip: 92.06 kB │ map: 758.65 kB

✓ built in 561ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
npm notice run @orkestrel/contract@0.0.17 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/core/index.d.ts dist/src/core/index.d.cts
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

The emitted declaration at `dist/src/core/index.d.ts:2884` is:

```ts
export declare function isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>;
```

`git status --short` returned:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M src/core/validators.ts
 M tests/src/core/combinators.test.ts
 M tests/src/core/validators.test.ts
```

`git diff --stat` returned:

```text
 src/core/validators.ts             | 21 ++++++++----
 tests/src/core/combinators.test.ts |  9 ++++++
 tests/src/core/validators.test.ts  | 66 ++++++++++++++++++++++++++++++++++++++
 3 files changed, 89 insertions(+), 7 deletions(-)
```

`git diff --check` exited 0 without output. No off-limits files changed. No install, commit, or push ran.

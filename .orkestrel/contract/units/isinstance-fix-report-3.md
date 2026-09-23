# ISINSTANCE-FIX round 3 — the unit's report (sol on GPT-6 Astra, codex exec workspace-write in the contract checkout, 2026-09-23)

Thread `01a0d03b-2f7e-7501-9015-325285abec33`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/isinstance-fix-3.jsonl` (launch copy under `tmp/codex/`); 25 commands; 274 s; usage {"input_tokens":1632798,"cached_input_tokens":1534208,"cache_write_input_tokens":0,"output_tokens":5569,"reasoning_output_tokens":330}. Retained verbatim from the exec's last message.

---

Implemented H1–H3. All required gates exited 0.

- **H1:** Changed the false-branch remark from assignability to subtyping and stated the optional-member exception.
- **H2:** Changed “its own” to “its”; added “(or `any`)”; moved the `instanceOf` import into the `@src/core` barrel import.
- **H3:** Added the `Tagged` case beside `Same`, including `const assignable: Tagged = new Base()`, the false-branch `Base | null` assertion, and runtime assertions.

The exact changed sentences are:

```text
The false branch drops each member of the declared union that is a subtype
of the instance type and keeps the rest, so a subclass that adds no member
narrows its base out as well (and a subclass that adds only an optional member
does not).

Accepts the same constructors as `instanceOf`: a public
or abstract construct signature returning an object (or `any`).

Keep the published runtime behaviour: `isFunction` makes a non-callable
right-hand side return `false` without consulting its `Symbol.hasInstance`
or causing a contained `TypeError`.
```

The negative control asserted `null` in the `Tagged` false branch. `npm.cmd run check` exited 1 with:

```text
npm notice run @orkestrel/contract@0.0.17 check
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
tests/src/core/validators.test.ts(781,39): error TS2344: Type 'null' does not satisfy the constraint '"Expected: null, Actual: ..."'.
```

After changing that assertion to `Base | null`, `npm.cmd run check` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 check
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
npm notice run @orkestrel/contract@0.0.17 check:src
npm notice run npm run check:src:core
npm notice run @orkestrel/contract@0.0.17 check:src:core
npm notice run tsc --noEmit -p configs/src/tsconfig.core.json
```

The scoped oxlint check exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts
```

The scoped oxfmt check exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts
Checking formatting...

All matched files use the correct format.
Finished in 6ms on 3 files using 16 threads.
```

`npm.cmd run test:src` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 test:src
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/contract

····················································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································································

 Test Files  19 passed (19)
      Tests  1362 passed (1362)
   Start at  17:48:20
   Duration  4.92s (transform 8.23s, setup 9.27s, import 5.58s, tests 10.57s, environment 3ms)

```

`npm.cmd run test:guides` exited 0:

```text
npm notice run @orkestrel/contract@0.0.17 test:guides
npm notice run node --experimental-strip-types tests/guides.test.ts

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/contract

················································

 Test Files  1 passed (1)
      Tests  48 passed (48)
   Start at  17:48:29
   Duration  1.39s (transform 304ms, setup 547ms, import 676ms, tests 20ms, environment 0ms)

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
dist/src/core/index.js  398.42 kB │ gzip: 91.39 kB │ map: 759.00 kB

transforming...
✓ 22 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.cjs  403.90 kB │ gzip: 92.14 kB │ map: 759.00 kB

✓ built in 583ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
npm notice run @orkestrel/contract@0.0.17 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/core/index.d.ts dist/src/core/index.d.cts
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
```

The emitted signature at `dist/src/core/index.d.ts:2888` matches the round-1 signature recorded in `isinstance-fix-gates.log.txt`:

```ts
export declare function isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>;
```

The equivalent `rg` search for the forbidden wording and relative import returned no hits, exit 1. `git diff --check` returned no diagnostics.

`git status --short` reported:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M src/core/validators.ts
 M tests/src/core/combinators.test.ts
 M tests/src/core/validators.test.ts
```

`git diff --stat` reported the cumulative uncommitted edits:

```text
 src/core/validators.ts             |  26 +++++---
 tests/src/core/combinators.test.ts |   9 +++
 tests/src/core/validators.test.ts  | 124 ++++++++++++++++++++++++++++++++++++-
 3 files changed, 151 insertions(+), 8 deletions(-)
```

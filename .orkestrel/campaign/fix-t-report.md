## T1

The predicate is:

```ts
entry.required &&
isRecord(entry.mapping) &&
Object.hasOwn(entry.mapping, 'require') &&
!entry.commonjs
```

Observed classifications:

```text
types/import/default, no require → []
same shape with explicit require → ['.']

require + .d.mts over .cjs → ['.']
require + .d.cts over .cjs → []
```

The targeted `src:core` run exited `0`:

```text
Test Files  1 passed
Tests       2 passed
```

## Firing-control transcripts

Old `required && !commonjs` predicate:

```text
expected [ [ '.' ], [ '.' ] ] to strictly equal [ [], [ '.' ] ]
exit_code=1
```

Replacing the own-key check with `Object.hasOwn(entry.mapping, 'imports')`:

```text
expected [ [], [] ] to strictly equal [ [ '.' ], [] ]
exit_code=1
```

## Guide sentence

> The mirror assertion reports a CommonJS typing defect only when the entry's own mapping declares an explicit `require` condition, the Node `require` resolver reaches the entry, and the selected declaration refuses a CommonJS consumer. A `default` branch that merely resolves under the require condition set makes no CommonJS claim.

## Gate results

- `npm run build && npm run build:inventory` — exit `0`.

  ```text
  build-host: staged 108 file(s) into dist/host
  build-inventory: staged 108 file(s) into host.json
  host.json | 4 ++--
  ```

  Guide digest: `c953ee…42ac` → `b3dec0…630f`  
  Root digest: `2b1b37…0120` → `d9f1ee…8c80`

- Owned TypeScript Oxlint — exit `0`, no output.

- Owned TypeScript oxfmt — exit `0`.

  ```text
  All matched files use the correct format.
  ```

- `npm run check` — exit `0`.

- `npm run test:guides` — exit `0`.

- Explicit `src:core` template project — exit `1`; the sandbox denied grandchild processes:

  ```text
  FAIL configuration templates > is an oxfmt fixed point across the emitted content corpus
  Error: spawnSync /opt/node22/bin/node EPERM
  ```

  Settling command for a host session:

  ```sh
  npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
  ```

## Unclosed and weak claims

The formal `mcp__probe__prove` instrument issued no receipt:

```text
MCP tool call requires approval, but approval policy is never
```

Re-run the same predicate case and runtime control in an approval-enabled session.

I do not claim the explicit template-project gate is green. The targeted predicate tests are supporting evidence and do not replace that gate.

Only [templates.ts](/home/user/scaffold/src/core/templates.ts), [templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts), [scaffold.md](/home/user/scaffold/guides/scaffold.md), and [host.json](/home/user/scaffold/host.json) changed. `tmp/fix-t/` is absent.
---

## Orchestrator's integration note

**Host readings.** The unit's sandbox denied the template project again; on the host it reports
**27 passed**, exit 0 — one more than the previous revision, which is the bounded-predicate test. Gate
chain clean: `format:check`, `lint:check`, `check`, `test:guides`.

**The end-to-end reading, which is what this unit exists for.** The previous revision failed here on
this exact assertion. Regenerated from the rebuilt candidate into the same real target:

```text
1 written, 121 unchanged, 0 removed in /home/user/orkestrel/indexeddb.
 Test Files  1 passed (1)
      Tests  6 passed | 2 skipped (8)
exit: 0
```

**The predicate is the bound, and its own-key check is load-bearing.** The second firing control
swapped `Object.hasOwn(entry.mapping, 'require')` for a different key and the assertion went silent
where it should speak. That control matters more than the first: it proves the own-key test is what
does the work, rather than something the other conjuncts already imply.

**The shape that caused the failure is now covered by a permanent test**, so the gap that produced it —
a unit testing the manifests scaffold generates while the fleet holds manifests it does not — is
closed for this predicate rather than left to the next single-target run.

## A note on the run that took the reading

The worker process was killed at exit 137 taking the first host reading: memory pressure from the
full template project. Nothing was lost — the unit's edits were already on disk and the tree came back
intact. The command now caps the heap. Recorded because an exit 137 reads like a test failure and is
not one, and the next reader of this record should not diagnose it as the subject's fault.

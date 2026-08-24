## SD2-FIX-2 report

### Write semantics

- [src/core/types.ts:134](/home/user/scaffold/src/core/types.ts:134) defines differing scripts as retained; they no longer block sibling appends or upgrades.
- [src/core/compilers.ts:1739](/home/user/scaffold/src/core/compilers.ts:1739) implements per-script writes:
  - absent → appended;
  - accepted predecessor → upgraded;
  - planned value → unchanged;
  - differing string → retained byte-identically;
  - non-string planned key or invalid `scripts` object → whole write returns `undefined`;
  - unplanned scripts remain byte-identical.
- [guides/scaffold.md:608](/home/user/scaffold/guides/scaffold.md:608) documents the same boundary.

### Outcome and question shapes

- `replaceManifestScripts` returns the compiled manifest for structurally valid regions, including regions with retained differences. It returns `undefined` only for structural refusal.
- [src/bin/CLI.ts:1229](/home/user/scaffold/src/bin/CLI.ts:1229) reports absent scripts and differing scripts separately.
- A differing entry names the script, declared command, and planned command.
- `audit` returns this as `{ field: 'scripts', blocking: false, message }`.
- `repair` and `overwrite` surface retained differences through their terminal `audit.questions`.

### Red and green records

Command:

```text
npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/sd2-fix2.test.ts
```

Red before implementation:

```text
Test Files  1 failed (1)
Tests       1 failed (1)
AssertionError: expected package.json to contain "test:probe"
```

Green after implementation:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
```

The reconciled HTML and release-proof vectors then passed together:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
```

The throwaway probe was deleted after promotion to [tests/src/bin/CLI.test.ts:1823](/home/user/scaffold/tests/src/bin/CLI.test.ts:1823).

### Flipped pins

- The core customized-value pin now retains `prepublishOnly` and appends `test:distribution`.
- The HTML pin now appends `test:probe`, `test:bench`, and `prepack`; retains the older `test:guides` command; and reports its declared and planned commands.
- “Repairs other paths while a customized script region stays reported” now appends the removed `test:distribution`, retains the customized `prepublishOnly`, and narrows byte identity to that differing line at [tests/src/bin/CLI.test.ts:3384](/home/user/scaffold/tests/src/bin/CLI.test.ts:3384).
- Structural-refusal and extra-script preservation pins retain their prior meaning.

### Gate tails

```text
oxfmt: exit 0
All matched files use the correct format.

oxlint: exit 0
(no diagnostics)

npm run check:src:core: exit 0
tsc --noEmit -p configs/src/tsconfig.core.json

npm run check:src:bin: exit 0
tsc --noEmit -p configs/src/tsconfig.bin.json

npx tsc --noEmit: exit 0
(no diagnostics)

src:core compilers:
Test Files  1 passed (1)
Tests       91 passed (91)

test:guides:
Test Files  1 passed (1)
Tests       17 passed (17)

build:inventory:
build-inventory: staged 108 file(s) into host.json

git diff --check: exit 0
(no diagnostics)
```

### Diff stat

```text
guides/scaffold.md               | 18 +++++++++--------
host.json                        |  4 ++--
src/bin/CLI.ts                   | 36 +++++++++++++++++++++++++---------
src/core/compilers.ts            | 36 +++++++++++++++++-----------------
src/core/types.ts                |  6 ++++--
tests/src/bin/CLI.test.ts        | 42 ++++++++++++++++++++++++++++------------
tests/src/core/compilers.test.ts | 14 +++++++++-----
7 files changed, 100 insertions(+), 56 deletions(-)
```

### Status

```text
 M guides/scaffold.md
 M host.json
 M src/bin/CLI.ts
 M src/core/compilers.ts
 M src/core/types.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
```

### Deviations

- The promoted CLI suite could not collect: `listen EPERM: operation not permitted 127.0.0.1`; Vitest reported `0 test`.
- `npm run test:config` reached and passed the host-inventory assertion (`host-inventory: entries=108`) but ended with exit `1` because the sandbox denied `spawnSync /opt/node22/bin/node` and the Vite WebSocket listener. Its remaining result was `45 passed`, `1 failed`.
- No scope deviation or off-limits edit occurred.
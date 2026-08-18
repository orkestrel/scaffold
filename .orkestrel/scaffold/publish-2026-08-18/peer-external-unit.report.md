# External peer unit report

**Status: STOPPED — acceptance criterion 1 failed.**

Expected:

```text
RESULT test UNMOVED
```

Found:

```text
RESULT test MOVED material=1 only_published=0 only_rebuilt=0
  MATERIAL package.json
```

The rebuilt non-map `dist` files matched. Only `package.json` differed: published pins include `@orkestrel/guide@^0.0.11` and `@orkestrel/scaffold@^0.0.38`; the clean checkout declares `^0.0.12` and `^0.0.40`. Per the deviation contract, no criterion was adjusted and later gates were not run.

## Implementation

Updated:

- [templates.ts](/home/user/scaffold/src/core/templates.ts)
- [compilers.ts](/home/user/scaffold/src/core/compilers.ts)
- [vite.config.ts](/home/user/scaffold/vite.config.ts)
- [compilers.test.ts](/home/user/scaffold/tests/src/core/compilers.test.ts)
- [templates.test.ts](/home/user/scaffold/tests/src/core/templates.test.ts)

A pre-existing modification to `.claude/agents/orkestrel.md` was untouched.

## Import-attribute probe

```text
npx tsc --noEmit --project tmp/peer-import-probe.json
exit 0
```

Negative control:

```text
npx tsc --noEmit --project tmp/peer-import-control.json
exit 2
TS2307: Cannot find module '../missing-package.json'
```

## Final predicates

Core:

```ts
external: (id: string) =>
	id.startsWith('node:') ||
	id.startsWith('@orkestrel/') ||
	peers.some((peer) => id === peer || id.startsWith(peer + '/'))
```

Browser with core:

```ts
external: (id: string) =>
	id === '@src/core' ||
	id.startsWith('@orkestrel/') ||
	peers.some((peer) => id === peer || id.startsWith(peer + '/'))
```

Server with core:

```ts
external: (id: string) =>
	id === '@src/core' ||
	id.startsWith('node:') ||
	id.startsWith('@orkestrel/') ||
	peers.some((peer) => id === peer || id.startsWith(peer + '/'))
```

Bin:

```ts
external: (id: string) =>
	id.startsWith('node:') ||
	id.startsWith('@orkestrel/') ||
	id.startsWith('@src/') ||
	peers.some((peer) => id === peer || id.startsWith(peer + '/'))
```

The no-core browser and server variants omit only the existing `@src/core` clause. App predicates remain unchanged.

## Red/green record

Red:

```text
1 failed | 54 skipped
exit 1
Missing package.json manifest import
```

Green:

```text
1 passed | 54 skipped
exit 0
```

Malformed-manifest proof:

```text
1 passed | 12 skipped
exit 0
```

Compiler suite:

```text
55 passed
exit 0
```

## Acceptance commands

| Criterion | Result |
|---|---|
| Comparator | **Failed criterion:** `MOVED material=1`; only `package.json` |
| Peer regression proof | Red then green as recorded above |
| `npm run check` | Exit 0 |
| `npx vitest run --project src:core` before | 288 passed, 6 sandbox-blocked, 294 total; exit 1 due `spawnSync … EPERM` |
| Full `src:core` after | Not run after mandatory stop |
| Policy and guides | Not run after mandatory stop |
| Oxlint | Not run after mandatory stop |
| Oxfmt acceptance check | Not run after mandatory stop; scoped formatting write exited 0 |
| Generated-manifest digest | Passed within the 55-test compiler suite |
| Root-config byte identity | Passed within the 55-test compiler suite |
| Artifact-count pins after change | Not rerun after mandatory stop |

Direct rebuilding under `/workspace/test` was sandbox-blocked by read-only filesystem `EROFS`. A writable staging copy was proven byte-identical to the newly generated root/core configuration and rebuilt successfully. Its browser artifact retained:

```js
import { page, userEvent } from "vitest/browser";
```
## Comments
- `src/server/Server.ts:408` — `// This branch is unreachable through \`listen(port)\` and exists for the other members of \`address()\`'s union.`
- `src/server/helpers.ts:1487` — same comment.

## O1 and nested-function sweep
`tests/guides.test.ts:238-242` passes the anonymous middleware directly to `server.use(...)`. All lifecycle assertions remain.

The prescribed sweep returned no hits. The anonymous callback at `tests/guides.test.ts:238` is permitted because it is passed directly as an argument.

## Report passages
`conform-server-report.md:92`:

> **server-obj-10 has no natural red, and that is the row's own finding.** Invariant: a listener bound to a numeric port yields an `AddressInfo`, so the `isAddressInfo` guards in `Server.#listen` and `probePort` narrow Node's `address()` union (`string | AddressInfo | null`) and throw a `TypeError` for the members this path cannot produce, in place of the removed `0` sentinel. Constraint: no listener-injection seam is added to fake Node's return, because the rule against coordination machinery for a requirement nobody wrote binds. Interface: a comment at each guard states that the branch is unreachable through `listen(port)` and exists for the union's other members, while the members retain their `@throws` rows. Claim 4 reads the branch as an exempt, documented gap. The row's evidence is the reachability argument and the live-path control: inverting the guards reddens 55 cases across `helpers.test.ts`, `Server.test.ts`, and `factories.test.ts`.

`conform-server-report.md:110`:

> `tests/distribution.test.ts:60` is permitted: `ESM-only` has the declaration-file sense in a vendored file outside this unit.

## git status --short
```text
 M README.md
 M guides/README.md
 M guides/server.md
 M src/server/Server.ts
 M src/server/Stream.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/types.ts
 A src/server/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/server/Negotiator.test.ts
 M tests/src/server/Stream.test.ts
 M tests/src/server/helpers.test.ts
 A tests/src/server/validators.test.ts
```

## Exit codes
- `npm run format:check`: `0`
- `npm run lint:check`: `0`
- `npm run check`: `0`
- `npm run test:guides`: `0`
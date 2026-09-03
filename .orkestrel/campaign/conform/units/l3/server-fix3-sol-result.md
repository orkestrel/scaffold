## Sweep

Pattern: `AGENTS[^\n]*§|§ ?[0-9]+`

Paths: `src`, `tests/src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/setupServer.ts`, `guides/server.md`, `guides/README.md`, `README.md`

Result: no hit.

## Rewrites

- `src/server/helpers.ts:126`: `never as (AGENTS.md § Non-negotiable rules), and total` → `never as, and remains total`
- `src/server/helpers.ts:459`: removed the `AGENTS.md § Non-negotiable rules` parenthetical; retained the `isRecord`, `typeof`, and `never as` substance.
- `src/server/helpers.ts:512`: removed the section citation; retained `without as`.
- `src/server/helpers.ts:828`: `RFC 7232 §2.3.2 WEAK comparison` → `RFC 7232 WEAK comparison`
- `src/server/helpers.ts:860`: `RFC 7232 §2.3.2 weak comparison` → `RFC 7232 weak comparison`
- `src/server/helpers.ts:877`: `RFC 7232 §2.3.2 WEAK comparison` → `RFC 7232 WEAK comparison`
- `src/server/constants.ts:4`: removed the `AGENTS.md § Design laws` parenthetical; retained the real-consumer rule.
- `tests/src/server/helpers.test.ts:703`: `matches weak-vs-strong per RFC 7232 §2.3.2` → `matches weak-vs-strong per RFC 7232`
- `guides/server.md:11`: removed the `AGENTS.md § Design laws` parenthetical; retained `mechanism, not product policy`.
- `guides/server.md:650`: removed the split-line `AGENTS.md § Design laws` citation; retained `mechanism, not product policy`.

## Git status

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

- `npm run format:check`: 0
- `npm run lint:check`: 0
- `npm run check`: 0
- `npm run test:guides`: 0
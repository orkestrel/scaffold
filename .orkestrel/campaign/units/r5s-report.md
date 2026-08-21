Delivered

- Updated `isPolicyMethod` to admit object-literal getters and setters.
- Added accessor, variable-held function expression, nested-getter function, and class-accessor proofs.

Validation

- `npm run format:check` — exit 0
- `npm run lint:check` — exit 1; tracked off-limits `.orkestrel/campaign/units/u4-instruments/*.ts` files fail existing array-style rules.
- `node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings configs/policy.ts tests/config.test.ts` — exit 0
- `npm run check` — exit 0
- `npm run test:config -- -t no-nested-functions` — exit 0
- `npm run test:config` — exit 1; the real-binary proof cannot spawn `/opt/node22/bin/node` under this sandbox (`EPERM`).
- `git diff --check` — exit 0
- `git status --short` — exit 0; reports only `configs/policy.ts` and `tests/config.test.ts`.

Controls

- The variable-held function expression reports at `2:18`.
- The function nested inside the getter reports at `5:21`.
- The surrounding getter and setter emit no diagnostics.
- Class accessors remain admitted through `MethodDefinition`.

Decisions

- Added the parser’s external `kind` field to `PolicyExpression`.
- Limited the new admission to `Property` nodes with `get` or `set`.
- Preserved method shorthand and class-member handling.

Deviations

- Full lint repair requires changes outside the owned paths.
- Full config validation requires a host that permits the suite’s nested process.

Flags

- The orchestrator must rerun `npm run test:config` outside the executor sandbox.
- The tracked campaign-instrument lint failures remain outside this unit.
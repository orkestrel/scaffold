# Unit absorb-ecosystem — returned distillate

Consumers depending on `@orkestrel/contract` at runtime, from the catalog table in `.claude/agents/orkestrel.md`:

- L1: `@orkestrel/abort` `^0.0.13`, `@orkestrel/budget` `^0.0.13`, `@orkestrel/csv` `^0.0.13`, `@orkestrel/emitter` `^0.0.13`, `@orkestrel/html` `^0.0.13`, `@orkestrel/indexeddb` `^0.0.13`, `@orkestrel/ndjson` `^0.0.13`, `@orkestrel/sqlite` `^0.0.13`, `@orkestrel/timeout` `^0.0.13`, `@orkestrel/tool` `^0.0.13`
- L2: `@orkestrel/console` `^0.0.13`, `@orkestrel/database` `^0.0.13`, `@orkestrel/form` `^0.0.13`, `@orkestrel/middleware` `^0.0.13`, `@orkestrel/process` `^0.0.13`, `@orkestrel/reason` `^0.0.13`, `@orkestrel/router` `^0.0.13`, `@orkestrel/table` `^0.0.13`, `@orkestrel/template` `^0.0.13`
- L3: `@orkestrel/browser` `^0.0.13`, `@orkestrel/guide` `^0.0.13`, `@orkestrel/interpret` `^0.0.13`, `@orkestrel/lsp` `^0.0.13`, `@orkestrel/mcp` `^0.0.13`, `@orkestrel/qualifier` `^0.0.13`, `@orkestrel/queue` `^0.0.13`, `@orkestrel/rater` `^0.0.13`, `@orkestrel/relation` `^0.0.13`, `@orkestrel/scaffold` `^0.0.13`, `@orkestrel/sea` `^0.0.13`, `@orkestrel/server` `^0.0.13`, `@orkestrel/terminal` `^0.0.13`, `@orkestrel/workspace` `^0.0.13`
- L4: `@orkestrel/brief` `^0.0.13`, `@orkestrel/probe` `^0.0.13`, `@orkestrel/program` `^0.0.13`, `@orkestrel/worker` `^0.0.13`, `@orkestrel/workflow` `^0.0.13`
- L5: `@orkestrel/agent` `^0.0.13`, `@orkestrel/supervisor` `^0.0.11` (older pin, see Risks)
- L6: `@orkestrel/ollama` `^0.0.13`, `@orkestrel/toolbox` `^0.0.13`

Every listed range is `^0.0.13`, resolving to exactly `0.0.13`, which matches the installed `@orkestrel/contract` version 0.0.13 in `/home/user/contract/package.json`. This is catalog-declared data, not a live registry reading; the role file's catalog may lag the registry.

A contract release still publishes in layer order: `contract` (L0) first, then every L1 package re-pins and republishes, then L2, then L3, then L4, then L5, then L6, each round waiting on the round before it because each pin is exact.

**Obligations**

- Runtime-visible change (for example, altering `createContract`'s returned shape or `ContractCompiler`'s public behavior): every consumer named above re-pins to the new `@orkestrel/contract` version, re-runs its gates, and republishes, cascading through L1 → L2 → L3 → L4 → L5 → L6 in that order, per `.agents/orchestration.md` § What a bump obliges.
- Behavior-preserving internal change (for example, switching eager compilation to lazy resolution while `schema`, `is`, `parse`, `audit`, `explain`, and `generate` keep identical external behavior and enumeration): this is a development-surface concern only if it moves `dist/`. Where the rebuilt `dist/` differs materially from the published artifact (excluding sourcemaps and whitespace), `@orkestrel/contract` itself bumps and publishes, and the runtime-visible cascade above then applies to its dependents. Where the rebuilt `dist/` matches the published artifact, no package bumps and no consumer is obliged.

**Risks**

- `@orkestrel/supervisor` declares `@orkestrel/contract` `^0.0.11` in the catalog table, while every other consumer declares `^0.0.13`. This is a disagreeing pin: `npm ls @orkestrel/contract` in any install graph containing both `supervisor` and a `^0.0.13` consumer installs two copies, and the compiler reads them as distinct types. Report this as a defect, not drift to tidy later; `npm ls @orkestrel/contract` against the actual install graph is the evidence that would confirm it, and this unit has no such graph to inspect.
- No destructuring or spread consumption site for the contract bundle is visible from the evidence supplied to this unit (only `/home/user/contract/package.json` and the catalog table). Whether any catalog package consumes `createContract`'s output by destructuring or spread — which a lazy-member redesign could break even where the public method surface stays identical — is unresolved here.

**Unknowns**

- Whether any consumer destructures or spreads the `createContract` bundle rather than calling its methods. Settle this by reading each consumer's source import sites (a `grok` or `scout` sweep across the fleet checkouts), which this unit's evidence slice does not include.
- Whether `@orkestrel/supervisor`'s `^0.0.11` pin against `contract` is current in its own `package.json`, or whether the catalog row lags a re-pin already made. Settle this by reading `package.json` in the `supervisor` checkout directly.
- Whether the catalog table itself is current against the npm registry for any listed range. Settle this with a live `npm view` or `npm ls` reading, which this unit had no network access to take.

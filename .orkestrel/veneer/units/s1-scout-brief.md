# Read-only scouting brief: map published-library environment generation

Checkout: C:/Users/mikes/WebstormProjects/scaffold
Mode: read-only. Do not edit, write, or run any mutating command. Do not read under
node_modules, tmp/, or .orkestrel/.

Goal: map how @orkestrel/scaffold generates a published-library environment (src/core,
src/browser, src/server), as groundwork for later adding a src/styles environment the way
.claude/rules/workspace.md documents it (src/styles/ row of Environments, @src/styles alias,
dist/src/styles, src:styles Vitest project with setupStyles.ts, configs/src/tsconfig.styles.json).

Return file:line pointers with a one-paragraph shape summary per item. No design proposals,
no raw file dumps.

1. Where --src environments core, browser, server are declared, typed, and validated:
   constants, types, CLI argument parsing.
2. Every compiler or template that emits per-environment artifacts: generated tsconfig.json
   paths; root vite.config.ts project factories and its projects list; configs/src/*.config.ts
   wrappers and configs/src/tsconfig.*.json scopes; package.json scripts (build:src:*,
   check:src:*, test:src:*) and the exports map; tests/setup*.ts selection; src/<environment>/
   index.ts seeds.
3. tests/config.test.ts cases that pin those shapes per environment.
4. guides/scaffold.md section "Reading a target" and every other guide sentence about
   environments.
5. Every place "styles" or "scss" already appears under src/, configs/, tests/, guides/.
6. How repair decides content-owned versus birth-owned per planned path.

Return shape: Question, Evidence (file:line facts), Distillate (smallest context needed),
Unknowns (input rows not reached), Journal (path + session id), Deviation (any).

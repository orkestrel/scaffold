# Unit prepack-manifests: the fleet takes the key

## Role and engine

Role `builder`, engine Sonnet, native subagent. You perform the assignment directly and spawn
nothing. You are the sole writer in each checkout you visit, and you visit them ONE AT A TIME,
strictly serially.

## Objective

Design round 3 (S1, user-decided) adds `"prepack": "npm run build"` to every publishing fleet
manifest. Scaffold's compiler emits it for future births in a separate unit; existing manifests
are birth-owned, so each takes the key by direct edit. Additionally, the distribution proofs in
brief and process run `npm pack` without `--ignore-scripts`, which would re-run the build inside
`prepublishOnly` once `prepack` exists — each gains the flag.

## The visits, in this order

In each of these checkouts under `C:/Users/mikes/WebstormProjects/`:
`brief`, `browser`, `mcp`, `middleware`, `process`, `queue`, `router`, `sea`, `supervisor`,
`toolbox`, `worker`, `workflow` — edit `package.json` only: add `"prepack": "npm run build"`
into `scripts`, alphabetically ordered against the existing keys if the file orders keys that
way, otherwise directly before `"prepublishOnly"`. Change nothing else in the file.

Then, in `brief` and `process` only: in `tests/distribution.test.ts`, find the `npm pack`
invocation (near `brief/tests/distribution.test.ts:79-85` and
`process/tests/distribution.test.ts:22-33`) and add `--ignore-scripts` to its argument list,
matching how `scaffold/tests/distribution.test.ts:578` passes it (read that file first,
read-only, for the idiom). Change nothing else.

DO NOT visit: `agent`, `qualifier`, `contract`, `program`, `probe`, `test`, `scaffold` — each
has a live or queued writer; their manifests take the key later.

## Standing conditions

- `queue` carries ` M package-lock.json` from a fleet install — leave it.
- `mcp` and `brief` and every other visit target is otherwise clean; if a target's
  `git status --porcelain` shows anything else, SKIP that target, record it, and continue.
- Every checkout has `node_modules` installed.

## Scope

- Owned per visit: `package.json`; plus `tests/distribution.test.ts` in brief and process only.
- Off-limits: everything else, everywhere.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, per visit, before moving to the next

1. `git status --porcelain` in that checkout shows exactly the owned file(s) added to its
   standing entries.
2. The JSON parses: `npx.cmd tsc --version` is NOT the check — run
   `node -p "JSON.parse(require('node:fs').readFileSync('package.json','utf8')).scripts.prepack"`
   and it prints `npm run build`.
3. In brief and process additionally:
   `npx.cmd oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts` exits 0 and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings tests/distribution.test.ts` exits 0.
   Do NOT run the distribution suite (it packs and installs; the verifier owns it later).

## Output

Per visit: the diff and the criterion outputs. Then one summary table: target, edited files,
result. Any skipped target with its status. No process diary.

## Deviation contract

Stop the WHOLE unit only if an edit cannot be expressed as specified (a manifest with no
`scripts`, a distribution test with no pack invocation). A dirty target is skipped and
recorded, never fixed.

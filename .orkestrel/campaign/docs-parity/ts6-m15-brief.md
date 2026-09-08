# Brief — ts6-m15 (the type-system distribution proof's diagnostics)

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Scratch folder: `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m15/` (create it). Read `/home/user/scaffold/tmp/units/ts6-common-host.md` first and follow it.

## Objective

Prove which consumer shape makes `tsc --noEmit --pretty false` name the offending member when an installed package's declared value exports and its runtime value exports disagree, in each direction, under the `bundler`, `node16`, and `nodenext` resolutions. The plan replaces a checker walk with this shape; a proof whose failure names nothing is a proof nobody can act on.

## Setup

`<scratch>/consumer/` with `package.json` `{ "name": "consumer", "type": "module", "private": true }` and `node_modules/@orkestrel/contract` as a symlink to `/home/user/scaffold/node_modules/@orkestrel/contract` (create `node_modules/@orkestrel/` first; if that package's declarations import another package, symlink it the same way and record which). Read the runtime keys once: `node -e "import('@orkestrel/contract').then((m) => console.log(JSON.stringify(Object.keys(m).sort())))"` from `consumer/`, and keep the list as `published.json`. Read the type-only names from `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` (an `export interface` or `export type` name) and pick one as `TYPE_NAME`.

## Consumer files (one per case, each importing `import * as entry from '@orkestrel/contract'`)

- `all.ts`: `const published = { <every runtime key>: true } as const` (generated from `published.json`), then `const declared: Record<keyof typeof entry, true> = published` and `const surfaced: Record<keyof typeof published, true> = declared` (both directions).
- `missing.ts`: the same with one runtime key omitted from `published`.
- `extra.ts`: the same with one invented key `EXTRA_NAME` added to `published`.
- `typeonly.ts`: the same with `TYPE_NAME` added to `published`.
- `fresh-extra.ts`: `const declared: Record<keyof typeof entry, true> = { <every key>: true, EXTRA_NAME: true }` (a fresh object literal, so the excess-property check applies).
- `single.ts`: the subjective lane's original one-direction shape, `const declared: Record<keyof typeof entry, true> = published` alone, with `EXTRA_NAME` added to `published` (does one direction miss a runtime extra).

## Runs

Three `tsconfig.<resolution>.json` files in `consumer/`, each `"compilerOptions": { "strict": true, "noEmit": true, "types": [], "target": "esnext", "module": <"esnext" | "node16" | "nodenext">, "moduleResolution": <"bundler" | "node16" | "nodenext">, "skipLibCheck": false }` and `"files": ["<case>.ts"]` (write one config per case and resolution, or pass `--files`; keep whichever you used). Run `node /home/user/scaffold/node_modules/typescript/bin/tsc --noEmit --pretty false -p <config> ; echo "exit=$?"` for each case and resolution from `consumer/`.

## Output

`report.md` with the exact commands and outputs; a table `case × resolution → exit code and the member the diagnostic names (or none)`; a ruling on which shape (`both directions`, `fresh literal`, `single`) names the member in each direction; the generator shape a test can use to write `published` from the runtime keys; and `Unknowns`. Retain the consumer folder and a `make.sh` that regenerates it.

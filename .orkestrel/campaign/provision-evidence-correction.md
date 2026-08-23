# Correction — what the fleet actually carries

Measured 2026-08-23 from published manifests on `registry.npmjs.org`, all 48 `@orkestrel`
packages readable, none unreadable. The instrument is `provision.mjs`, committed beside this
file. It reads each package's latest published `package.json` and tests which proof-derived
scripts it declares. `package.json` ships in every tarball, and `src/core/compilers.ts` emits
each of these scripts solely from its proof's presence, so the published manifest reports the
proof without needing a checkout.

`.orkestrel/campaign/provision-gap-evidence.md` states a different table. That table is wrong on
every row except distribution, and the rows are replaced here.

## What the registry reports

| Script              | Packages declaring it                                    |
| ------------------- | -------------------------------------------------------- |
| `test:setup`        | `ollama`, `process`                                       |
| `test:distribution` | `brief`, `mcp`, `probe`, `process`, `scaffold`            |
| `test:integration`  | `mcp`, `sea`, `terminal`, `websocket`                     |
| `test:conformance`  | `mcp`, `ollama`                                           |
| `test:guides`       | every package                                             |

The distribution row is unchanged, so the distribution design round rests on sound ground.

The setup row named `mcp` and `terminal`. Both were cloned from `origin/main` at 2026-08-22 and
checked directly: neither carries a file matching `tests/setup*.test.ts`, and neither declares
`test:setup`. The guides row named `supervisor` as a single-target gap; `supervisor` declares
`test:guides`.

## What the setup gap actually is

`src/bin/CLI.ts:970` sets `Blueprint.setup` from a file in `tests/` whose name starts with
`setup` and ends with `.test.ts`. `src/core/compilers.ts:788` gates the `setup` Vitest project on
that field, and `:371` gates the `test:setup` script on it. Scaffold emits no such file:
`blueprintToTestArtifacts` seeds `tests/setup.ts` and the per-face setup modules, never a proof
over them. So the field is self-fulfilling in exactly the way `Blueprint.distribution` is, and
the `setup` project branch is unreachable in 46 of 48 packages.

`ollama` and `process` reached it by hand-writing the file.

## What the prior art asserts

`process/tests/setup.test.ts` is 42 lines over `resolveChildFixture` and `childCommand` from
`tests/setupServer.ts`: that the fixture path resolves independently of the working directory and
exists, that the spawned file is `process.execPath`, and that each call returns its own argument
vector. Its `tests/setup.ts` exports nothing at all.

`ollama/tests/setup.test.ts` is 533 lines over the helpers, fixtures, recorders, and guards
exported by `tests/setup.ts` and `tests/setupServer.ts`, including a real `createWorkspace` and a
recorder from `@orkestrel/test`.

Both prove package-specific behaviour of package-owned helpers. Neither contains an assertion
scaffold could have derived from the workspace shape.

## Coverage

The population is the 48 names in `fleet-census.json`, read as published manifests. A published
manifest lags an unpublished commit, so a package that added a proof and has not republished
reads here as lacking it. The checkout readings for `mcp`, `terminal`, `ollama`, and `process`
are `origin/main` at 2026-08-22 and agree with the registry on all four.

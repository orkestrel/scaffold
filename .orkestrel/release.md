# Release record

Each round lists its packages in publish order: the layer, the version it replaced, the version the registry serves, the bump ruling with its evidence, and the `gitHead` the registry records. A row's ruling is the visit's (`.agents/skills/orkestrel-publish/scripts/wave.ts --visit`).

The rounds of 2026-10-04 to 2026-10-06 and the 2026-10-07 re-pin check closed and were swept on 2026-10-08; read them at scaffold `5aff2b245`. The rounds of 2026-10-07 to the scaffold 0.0.112 publication of 2026-10-29 closed and were swept on 2026-10-29; read them at scaffold `456b1f382`.

## 2026-10-29 fleet wave

The wave `.orkestrel/plan.md` plans: every catalog package re-pinned to the scaffold release that plan's § Scaffold pin names and to the highest `@orkestrel` versions the registry serves, realigned, and published layer by layer.

| Layer | Package | Prior | Published | Ruling | gitHead |
| --- | --- | --- | --- | --- | --- |
| L3 | scaffold | 0.0.112 | 0.0.113 | patch: § Scaffold release rows 1 to 10 of `.orkestrel/plan.md`, published ahead of the layers it pins | `60740d379` |
| L0 | contract | 0.0.19 | 0.0.20 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `8c52caffe` |
| L1 | abort | 0.0.13 | 0.0.14 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `cc35149e6` |
| L1 | budget | 0.0.14 | 0.0.15 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `5a5375a5d` |
| L1 | codec | 0.0.6 | 0.0.7 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `fd639d520` |
| L1 | csv | 0.0.10 | 0.0.11 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `b1d39040e` |
| L1 | emitter | 0.0.12 | 0.0.13 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `392c5902a` |
| L1 | html | 0.0.12 | 0.0.13 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `e91e3a182` |
| L1 | indexeddb | 0.0.14 | 0.0.15 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `9b8751cd9` |
| L1 | msg | 0.0.13 | 0.0.14 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `d3c7eb736` |
| L1 | ndjson | 0.0.12 | 0.0.13 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `8bb32b166` |
| L1 | sqlite | 0.0.14 | 0.0.15 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `09dec10ac` |
| L1 | sse | 0.0.10 | 0.0.11 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `e16d2d457` |
| L1 | test | 0.0.30 | 0.0.31 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `fdc001d38` |
| L1 | timeout | 0.0.13 | 0.0.14 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `a2e8a2e70` |
| L2 | console | 0.0.16 | 0.0.17 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `2ba07f99e` |
| L2 | database | 0.0.18 | 0.0.19 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `d1ff0697f` |
| L2 | form | 0.0.13 | 0.0.14 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `283fdce15` |
| L2 | markdown | 0.0.17 | 0.0.18 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `314ca247b` |
| L2 | pool | 0.0.17 | 0.0.18 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `1eb2f4498` |
| L2 | process | 0.0.15 | 0.0.16 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `4ad04c7bf` |
| L2 | reason | 0.0.13 | 0.0.14 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `526f185d0` |
| L2 | router | 0.0.17 | 0.0.18 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `1985de514` |
| L2 | table | 0.0.12 | 0.0.13 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `e4fb5337d` |
| L2 | template | 0.0.10 | 0.0.11 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `83e8a8a11` |
| L2 | tool | 0.0.19 | 0.0.20 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `202e5aba0` |
| L2 | websocket | 0.0.15 | 0.0.16 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `8864580c4` |
| L3 | capture | 0.0.1 | 0.0.2 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `a4e94abd6` |
| L3 | guide | 0.0.25 | 0.0.26 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `18a9c0a99` |
| L3 | interpret | 0.0.16 | 0.0.17 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `f8c7548cc` |
| L3 | lsp | 0.0.11 | 0.0.12 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `2f19aac87` |
| L3 | qualifier | 0.0.17 | 0.0.18 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `dde0d33ee` |
| L3 | queue | 0.0.17 | 0.0.18 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `a7bb0b922` |
| L3 | rater | 0.0.17 | 0.0.18 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `8ac258200` |
| L3 | relation | 0.0.16 | 0.0.17 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `70fb9c66a` |
| L3 | sea | 0.0.19 | 0.0.20 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `453a6c58c` |
| L3 | server | 0.0.23 | 0.0.24 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `3457087fd` |
| L3 | terminal | 0.0.20 | 0.0.21 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `cdfc6a4a9` |
| L3 | workspace | 0.0.12 | 0.0.13 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `7c9b78554` |
| L4 | brief | 0.0.11 | 0.0.12 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `78704e97d` |
| L4 | mcp | 0.0.39 | 0.0.40 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `be9edaca0` |
| L4 | middleware | 0.0.25 | 0.0.26 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `adc0340b1` |
| L4 | program | 0.0.16 | 0.0.17 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `898725977` |
| L4 | worker | 0.0.17 | 0.0.18 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `33db274df` |
| L4 | workflow | 0.0.23 | 0.0.24 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `d1e76c3cb` |
| L5 | agent | 0.0.32 | 0.0.33 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `b9d3fa86b` |
| L5 | browser | 0.0.29 | 0.0.30 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `70fd980a6` |
| L5 | probe | 0.0.25 | 0.0.26 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `b12ca1702` |
| L6 | ollama | 0.0.26 | 0.0.27 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `48b97d5a3` |
| L6 | toolbox | 0.0.21 | 0.0.22 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `3dc9dad63` |
| L7 | study | 0.0.6 | 0.0.7 | patch: `compare.ts` exit 3 at the scaffold 0.0.113 re-pin visit (the dist moved) | `fc00f6720` |
| L2 | reason | 0.0.14 | 0.0.15 | patch: `compare.ts` exit 3 after reason drops its `iterateIndices` for contract's, closing the fleet name collision scaffold's catalog refresh found after L7 | `6aeb47c4a` |
| L3 | interpret | 0.0.17 | 0.0.18 | patch: the runtime range `@orkestrel/reason` `^0.0.15` moved (`compare.ts` exit 0) | `cd42deed0` |
| L3 | qualifier | 0.0.18 | 0.0.19 | patch: the runtime range `@orkestrel/reason` `^0.0.15` moved (`compare.ts` exit 0) | `abb02bb90` |
| L3 | rater | 0.0.18 | 0.0.19 | patch: the runtime range `@orkestrel/reason` `^0.0.15` moved (`compare.ts` exit 0) | `8cba5ec2d` |
| L4 | brief | 0.0.12 | 0.0.13 | patch: the runtime ranges `@orkestrel/reason` `^0.0.15` and `@orkestrel/interpret` `^0.0.18` moved (`compare.ts` exit 0) | `b6f1a3ab6` |
| L4 | program | 0.0.17 | 0.0.18 | patch: the runtime ranges `@orkestrel/reason` `^0.0.15`, `@orkestrel/qualifier` `^0.0.19`, and `@orkestrel/rater` `^0.0.19` moved (`compare.ts` exit 0) | `ad10db3c1` |
| L3 | scaffold | 0.0.113 | 0.0.114 | patch: § Sequence step 7 of `.orkestrel/plan.md`, the re-pin onto the served fleet, the catalog refresh, and the scaffold-owned rows of § Deferred | `416d329ac` |
| L3 | scaffold | 0.0.114 | 0.0.115 | patch: the refinements of `.orkestrel/debrief.md` moved the vendored canon (scaffold `4379ff5ed`) | `12820b441` |

## Standing readings

- browser 0.0.30 published on a Windows release host. Its release-mode distribution proof refuses 5 host-bound cases there: 4 require a `/proc` process table and 1 requires a filesystem FIFO. By the precedent of browser Release 0.0.28 and Release 0.0.29, the chain ran the default-mode distribution proof (15 passed, 9 host-bound skips) and `test:service` (257 passed, 6 skipped), as browser `70fd980` records. The reading stands until a release runs on a host with a process table and filesystem FIFOs.

# Unit template-setup — report

## Rows

1. **template-setup-1** — applied. `tests/setup.ts` no longer declares `isBrowserVuePath` or its
   doc comment; the header comment is the file's whole content, and it names no helper.
2. **template-setup-2** — applied. `tests/setup.test.ts` matches the exemplar byte for byte: the
   `import * as setup from './setup.js'` form, the header comment, and the single `adds no export`
   test asserting `Object.keys(setup)` equals `[]`.
3. **template-setup-3** — applied. `/home/user/scaffold/tmp/units/conform/conform-template-report.md`
   now reads `template-obj-5` and `fleet-F1` as `applied` with the notes given, and carries the new
   `## Ruling on template-obj-5 and fleet-F1` section after `## Deviations`.

## Gates

| Command                                                    | Exit code | Reading                                                                                                       |
| ------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------- |
| `npm --prefix /home/user/fleet/template run test:setup`      | 0         | 1 passed (1)                                                                                                   |
| `npm --prefix /home/user/fleet/template run format:check`    | 0         | `All matched files use the correct format.` over 44 files                                                     |
| `npm --prefix /home/user/fleet/template run lint:check`      | 0         | no output                                                                                                      |
| `npm --prefix /home/user/fleet/template run check`           | 0         | root `tsc` then `check:src:core`, both clean                                                                  |
| `npm --prefix /home/user/fleet/template run build`           | 0         | `dist/src/core/index.js` and `index.cjs` emitted, declarations bundled, `index.d.cts` copied                  |
| `npm --prefix /home/user/fleet/template test`                | 0         | `src:core` 128 passed, `policy` 111 passed, `config` 46 passed, `setup` 1 passed, `guides` 31 passed           |
| `cd /home/user/fleet/template && npx scaffold audit --offline` | 0       | `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`   |

`node /home/user/scaffold/tmp/work/evidence.mjs template` wrote `/home/user/work/evidence/conform-template.diff` (933 lines) and `/home/user/work/evidence/conform-template.status` (17 entries).

## Paths touched

- `/home/user/fleet/template/tests/setup.ts` — `isBrowserVuePath` and its doc comment removed; header comment kept as the whole file.
- `/home/user/fleet/template/tests/setup.test.ts` — rewritten as the export-free proof, matching the exemplar.
- `/home/user/scaffold/tmp/units/conform/conform-template-report.md` — `template-obj-5` and `fleet-F1` rows set to `applied` with the specified notes; `## Ruling on template-obj-5 and fleet-F1` section added after `## Deviations`.

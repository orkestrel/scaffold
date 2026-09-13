# Design brief — the scaffold 0.0.65 fix

## Subject

`@orkestrel/scaffold` at `c439685` on branch `claude/compassionate-knuth-5e0gyu`, local version
`0.0.65`, registry serving `0.0.64`. The package is prepared and bumped but was **held out of this
session's release window** on the ruling in `.orkestrel/campaign/linux-gate-audit-verdict.md`, whose
terminal line is `VERDICT: FAIL 4, 5, 6, 7, 9; outside the claims: F1, F2, F3, F4`.

Its sibling packages published from the same window and are live:
`@orkestrel/toolbox@0.0.13` and `@orkestrel/ollama@0.0.15`. Both pin the published
`@orkestrel/scaffold@^0.0.64`, so neither needs `0.0.65` and neither is blocked by this fix.

This round designs the fix. No code has been written for it yet.

## What the round decides

Which fix lands in `@orkestrel/scaffold@0.0.65` before it is uploaded to the public npm registry,
where the version is spent and cannot be withdrawn. Specifically it decides whether the package's
declared `engines` floor moves, how far, and whether a public contract shape changes to express an
npm floor. That decision reaches every workspace `scaffold new` will ever generate, so it is a
product decision rather than a repair.

## Measured facts — established by the Orchestrator, do not re-derive

Every row was measured on this host by the Orchestrator running the command and reading the output.
Instruments retained under `.orkestrel/campaign/evidence/linux-gate/`.

**Host:** Linux `6.18.44-fc-v24`, `node v22.22.2`, `npm 10.9.7`, no IPv6 stack, four CPUs.

**F-npm — the npm resolution boundary.** A scaffold-generated workspace ships no lockfile, so its
first `npm install` resolves from ranges. Instruments `npm-matrix.sh` and `npm-bisect.sh`, each run
on a pristine cache against the two-package input `vite@^8.2.2` and `vitest@^4.1.11`:

```text
npm 10.9.7  CRASH      npm 11.3.0  CRASH
npm 11.0.0  CRASH      npm 11.4.0  CRASH
npm 11.1.0  CRASH      npm 11.5.0  CRASH
npm 11.2.0  CRASH      npm 11.6.0  clean   <- first clean
                       npm 11.6.2  clean
                       npm 12.0.2  clean
```

The crash is `TypeError: Cannot read properties of null (reading 'edgesOut')` at
`@npmcli/arborist/lib/arborist/build-ideal-tree.js:1289:38` in `#loadPeerSet`. It needs no Orkestrel
package present and no `file:` specifier: leave-one-out across every declared devDependency crashes
in every row, `@orkestrel/scaffold` removed included. A committed lockfile avoids it entirely —
`npm install --dry-run` in scaffold, toolbox, and ollama each exit `0`.

**F-node — the Node type-stripping boundary.** From primary sources, tagged release notes and
`deps/npm/package.json` at each tag:

| Node    | unflagged `.ts` | bundled npm |
| ------- | --------------- | ----------- |
| 22.12.0 | no, needs `--experimental-strip-types` | `10.9.0` |
| 22.18.0 | **yes**, semver-minor backport | `10.9.3` |
| 23.11.0 | yes | `10.9.2` |
| 24.0.0  | yes | `11.3.0` |
| 25.0.0  | yes | `11.6.2` |
| 26.0.0  | yes | `11.12.1` |

`22.6.0` introduced the flag; `22.18.0` unflagged it on the 22.x line. The 22.x line never carries
npm 11. **The lowest Node whose bundled npm clears the F-npm boundary is `25.0.0`**, and the lowest
even-numbered line is `26.0.0`.

**F-oxlint — the plugin loads through Node's own module system.** The research lane left this open;
the Orchestrator closed it from field evidence. `ERR_UNKNOWN_FILE_EXTENSION` is a Node module-loader
error, it fired on Ubuntu Node `22.12.0` loading `./configs/policy.ts`, and on this host's
`22.22.2` the plugin loads and emits: a planted `simply` comment and a `public` class member drew
`policy(no-banned-term)` and `typescript(explicit-member-accessibility)` at exit `1`, and the plant
was removed with `git status --porcelain` empty afterwards. So Node `22.18.0` genuinely repairs this
half.

**F-contract — what the code models today.**

- `src/core/constants.ts:480` — `MINIMUM_NODE_VERSION = '22.12.0'`, documented as "the oldest Node
  version the generated toolchain supports".
- `src/core/constants.ts:486` — `DEFAULT_ENGINES = ` >=${MINIMUM_NODE_VERSION}`.
- `src/core/constants.ts:400` — `ENGINES_PATTERN = /^>=(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/`.
- `src/core/types.ts:217` — `readonly engines: string` on `Blueprint`. A single string, Node only.
- `src/core/compilers.ts:579` — emits `engines: { node: blueprint.engines }`.
- `src/core/compilers.ts:2328` — rejects a blueprint whose `engines` fails `matchesEngines`.
- `src/core/helpers.ts:918` — `matchesEngines` tests the pattern then compares against
  `MINIMUM_NODE_VERSION`.
- `src/core/constants.ts:141,146` — `configs/policy.ts` and `.oxlintrc.json` are both vendored into
  every target, so the floor and the plugin travel together.
- `package.json:118-120` — scaffold's own `engines` is `{"node":">=22.12.0"}`.

There is **no npm field anywhere in the model**.

## The seams the fix owns

Two block the upload and two do not. The round rules on all four, and on whether the two
non-blocking ones ride this version or a later one.

- **S1 blocking — the floor promises a toolchain that cannot run.** At the declared floor a
  generated workspace's `lint:check` cannot load its own vendored plugin.
- **S2 blocking — the generated workspace cannot be installed** by the npm bundled with every Node
  the declared floor admits. `ROADMAP.md:370-375` already carries this as an unruled question:
  "rule whether the proof launches the npm the `engines` field names or the field names npm 11".
  That ROADMAP line predates this round and its npm-11 framing is **falsified** by F-npm, because
  npm `11.0.0` through `11.5.0` crash.
- **S3 non-blocking — the `test` script's `&&` composition hides projects.** One failing project
  suppressed five in this session's own run: `scaffold/package.json:74`,
  `toolbox/package.json:67`, `ollama/package.json:56`. All five suppressed projects pass when
  invoked singly.
- **S4 non-blocking — a test hard-codes a host capability.**
  `tests/src/server/helpers.test.ts:214-224` assumes `[::ffff:127.0.0.1]` is reachable, with no
  runtime probe and no guard citing a mechanism, while the same file imports `supportsFileLinks`
  and `supportsMode` and gates on them at `:1142` and `:1811`. `scripts/ollama.sh` is not defective
  and is byte-identical to its published vendored copy.

## Candidate directions — rule on each, and propose better ones

These are the Orchestrator's framing, not a menu to pick from. Attack the framing itself where it
is wrong, and name a direction it missed.

- **A. Floor `22.18.0`, express an npm floor separately.** Closes S1 on the current LTS line. Needs
  a way to say "npm >= 11.6.0" that the model cannot express today, so it implies a contract change
  to `Blueprint.engines`, `ENGINES_PATTERN`, `matchesEngines`, and the compiler's emit — or a
  constant emitted beside the node range without touching the blueprint shape.
- **B. Floor `26.0.0`.** One value change closes S1 and S2 with no shape change, and drops every
  consumer on Node 22 and 24.
- **C. Floor `22.18.0` only.** Closes S1, records S2 as a known exposure with a documented
  workaround, and ships.
- **D. Leave the floor and change what is generated** — ship a lockfile, pin the toolchain ranges
  the peer graph resolves through, or emit an `.npmrc`. Rule on whether any of these is sound or
  whether each trades a real defect for a worse one.

## Unknowns, named as unknowns

- **U1.** Whether an `engines.npm` floor is enforced by anything a consumer runs by default. npm
  warns rather than fails on an unsatisfied `engines` unless `engine-strict` is set, so an npm
  floor may document rather than prevent. Report what it actually does, and whether that changes the
  ranking of direction A.
- **U2.** Whether the crash is reachable with a lockfile absent but the peer graph pinned to exact
  versions rather than carets, which would make direction D's pinning variant viable.
- **U3.** Whether raising `MINIMUM_NODE_VERSION` is a breaking change for `@orkestrel/scaffold`'s
  own consumers under this fleet's `0.0.x` convention, where a caret pins one exact release, and
  what that implies for the version this fix ships under.

## Scope

Design only. Propose no edit, write no file, and run no gate. Name owned files as a plan, not as a
diff. The fix will be implemented by a separate writing unit against whatever this round rules.

## Authority

Read before ruling: `AGENTS.md` (its design laws and the writing rules it names),
`.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
`.claude/rules/patterns.md`, `.claude/rules/quality.md`, `.agents/orchestration.md`
§ What a bump obliges, `.agents/skills/orkestrel-publish/references/wave.md`, `guides/scaffold.md`,
and `ROADMAP.md:365-378`. Every one of those paths exists in the tree you are rooted in; report a
path that does not open as a deviation rather than ruling around it.

`AGENTS.md` § Design laws binds the shape you propose — single-word entity APIs, types first,
absence is `undefined`, no compatibility shims, minimal public API with its first real consumer.
A shape change to `Blueprint` is a public contract change and `*/types.ts` is authoritative for it.

## Output

Return:

- **Ruling** — the direction you propose, stated first, in one paragraph.
- **Per-direction verdict** — A, B, C, D each ruled with its cost, and any direction you add.
- **Contract** — if a shape changes, the exact `*/types.ts` declaration you propose and every
  consumer it moves.
- **Units** — the bounded writing units the fix decomposes into, each with owned files and an
  independently checkable acceptance criterion, ordered by dependency.
- **Unknowns** — U1, U2, U3 answered or named unresolved with what would settle each.
- **Risk** — what your own ruling breaks, and the legitimate caller pattern that would notice.

No process diary.

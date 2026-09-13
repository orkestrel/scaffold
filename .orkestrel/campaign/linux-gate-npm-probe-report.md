# Orchestrator probe unit: npm arborist crash scope

Engine: Opus 5 (Orchestrator's own probe unit). Host: Linux 6.18.44-fc-v24, node v22.22.2,
npm 10.9.7 at `/opt/node22`.

## Question

Does the `npm install` failure at `tests/distribution.test.ts:912` in `@orkestrel/scaffold` indicate a
defect in what that package publishes, and does it reach a consumer of the published package?

## Instruments

Retained beside this report under `evidence/linux-gate/`:
`dist-repro.sh`, `u3-probe.sh`, `bisect.sh`, `lockfile-probe.sh`, `fresh-pair.sh`.

## Readings

| probe | input | result |
| ----- | ----- | ------ |
| `dist-repro.sh` | generated workspace, `@orkestrel/scaffold` as `file:` packed tarball | exit `1`, `Cannot read properties of null (reading 'edgesOut')` at `@npmcli/arborist/lib/arborist/build-ideal-tree.js:1289:38` in `#loadPeerSet` |
| `u3-probe.sh` variant A | same workspace, `@orkestrel/scaffold` as registry range `^0.0.64` | exit `1`, same crash |
| `u3-probe.sh` variant B | same workspace, `file:` tarball | exit `1`, same crash |
| `bisect.sh` | leave-one-out across every declared devDependency, `@orkestrel/scaffold` included | exit `1` with the crash in every row |
| `lockfile-probe.sh` | `vite@^8.2.2` and `vitest@^4.1.11` only, no lockfile | exit `1`, same crash |
| `lockfile-probe.sh` | `npm install --dry-run` in `/home/user/scaffold`, `/home/user/toolbox`, `/home/user/ollama`, each against its committed lockfile | exit `0`, no crash, all three |
| `fresh-pair.sh` | the two-package pair on a pristine npm cache under npm `10.9.7` | exit `1`, same crash |
| `fresh-pair.sh` | the same pair on a pristine npm cache under npm `12.0.2` | exit `0`, no crash |

## Rulings

- The crash is a defect in npm `10.9.7` peer-set resolution. It reproduces from two public packages
  with no Orkestrel code present, and the identical inputs resolve under npm `12.0.2`.
- The crash is not scaffold's dependency graph. Removing `@orkestrel/scaffold` from the set does not
  stop it.
- A committed lockfile avoids it. Every one of the three packages under release ships a lockfile and
  resolves clean, so none of their own installs is exposed.
- A workspace `scaffold new` materializes ships no lockfile, so its first `npm install` resolves from
  ranges and is exposed. The generated manifest declares `node >=22.12.0` and no npm range, and Node
  `22.22.2` bundles npm `10.9.7`.
- Cache state is not the cause: the pristine-cache runs separate npm `10.9.7` from npm `12.0.2`
  cleanly.

## Correction to an earlier Orchestrator reading

The Orchestrator's first diagnosis scoped the crash to the test's `file:` tarball specifier. Variant A
falsifies that scoping: the registry range crashes identically. The claim that the crash is not
scaffold's artifact survives; the claim that it cannot reach a consumer does not.

## Bump confirmation and downstream obligation

Instrument: `evidence/linux-gate/host-diff.sh`. It fetches published `@orkestrel/scaffold@0.0.64` and
compares it against the `dist/` this session's gate chain built.

`@orkestrel/scaffold@0.0.65` is bump-owed on both of the contract's triggers, confirmed independently
of the prior campaign's ruling:

- The vendored `dist/host` surface moved. The path set grew from 122 files to 124, adding
  `agents/skills/enterprise-bootstrap/references/color-modes.md` and `responsive-layout.md`. Content
  moved in `claude/rules/workspace.md`, `claude/settings.json`, `claude/skills/enterprise-bootstrap/SKILL.md`,
  `guides/scaffold.md`, `manifest.json`, `scripts/ollama.sh`, and the `enterprise-bootstrap` reference set.
- `dist/src` moved materially, maps excluded: `core/index.js`, `core/index.cjs`, `core/index.d.ts`,
  and `core/index.d.cts` all differ.

The only change to the vendored `claude/settings.json` guards the Ollama SessionStart hook behind
`CLAUDE_CODE_REMOTE`:

```text
< "command": "\"$CLAUDE_PROJECT_DIR\"/scripts/ollama.sh",
> "command": "if [ \"${CLAUDE_CODE_REMOTE:-}\" = \"true\" ]; then \"$CLAUDE_PROJECT_DIR\"/scripts/ollama.sh; fi",
```

`/home/user/ollama/.claude/settings.json` already matches the `0.0.65` vendored copy.
`/home/user/toolbox/.claude/settings.json` still matches the `0.0.64` copy, so `repair` there moves it
to the guarded form after the release.

The contract obliges each target to re-pin `@orkestrel/scaffold`, run `repair`, and re-prove its gates
after a vendored release, and warns that a vendored release can turn a green target red because
`repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`. That mechanism does not fire for
this release: both files are byte-identical between `0.0.64` and `0.0.65`. Neither target carries a
`.claude/rules` directory, so the moved `claude/rules/workspace.md` does not reach either one. Neither
target carries `.claude/settings.local.json`, so no operator grant is at risk of reversion.

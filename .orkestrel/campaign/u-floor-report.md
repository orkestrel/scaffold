Implemented the Node `22.18.0` floor and generated npm `>=11.6.0` `devEngines` guard. All acceptance criteria pass.

### Touched files

- [src/core/constants.ts](/home/user/scaffold/src/core/constants.ts:480) — defines the Node and npm minimums and frozen `DEFAULT_DEV_ENGINES`.
- [src/core/compilers.ts](/home/user/scaffold/src/core/compilers.ts:579) — emits `devEngines.packageManager`.
- [src/core/factories.ts](/home/user/scaffold/src/core/factories.ts:47) — updates the blueprint example.
- [src/core/helpers.ts](/home/user/scaffold/src/core/helpers.ts:913) — updates `matchesEngines` examples.
- [package.json](/home/user/scaffold/package.json:119) — raises scaffold’s own Node floor without adding `devEngines`.
- [guides/scaffold.md](/home/user/scaffold/guides/scaffold.md:33) — documents the floors, constants, and blueprint value.
- [guides/mcp.md](/home/user/scaffold/guides/mcp.md:548) — updates the referenced scaffold Node floor.
- [tests/guides.test.ts](/home/user/scaffold/tests/guides.test.ts:142) — updates the guide transcription.
- [tests/src/core/compilers.test.ts](/home/user/scaffold/tests/src/core/compilers.test.ts:487) — pins the emitted Node and npm guards.
- [tests/src/core/helpers.test.ts](/home/user/scaffold/tests/src/core/helpers.test.ts:617) — pins values on each side of the Node floor.
- [source-manifest.txt](/home/user/scaffold/tests/src/core/fixtures/source-manifest.txt:76) — records the generated manifest.
- [setup-false-manifest.txt](/home/user/scaffold/tests/src/core/fixtures/setup-false-manifest.txt:76) — records the alternate generated manifest.

### Acceptance criteria

| Criterion | Exit |
| --- | ---: |
| `npm run format:check` | `0` |
| `npm run lint:check` | `0` |
| `npm run check` | `0` |
| In-process compiled manifest proof | `0` |
| `git diff --stat` scope inspection | `0` |
| Off-limits-file diff check | `0` |

The compiled manifest fragment was:

```json
{
  "engines": {
    "node": ">=22.18.0"
  },
  "devEngines": {
    "packageManager": {
      "name": "npm",
      "version": ">=11.6.0",
      "onFail": "error"
    }
  }
}
```

Direct boundary calls returned:

```json
{"old":false,"floor":true}
```

### Diffstat

```text
 guides/mcp.md                                    |  2 +-
 guides/scaffold.md                               |  6 ++++--
 package.json                                     |  2 +-
 src/core/compilers.ts                            |  2 ++
 src/core/constants.ts                            | 14 +++++++++++++-
 src/core/factories.ts                            |  2 +-
 src/core/helpers.ts                              |  4 ++--
 tests/guides.test.ts                             |  2 +-
 tests/src/core/compilers.test.ts                 | 11 +++++++++++
 tests/src/core/fixtures/setup-false-manifest.txt |  9 ++++++++-
 tests/src/core/fixtures/source-manifest.txt      |  9 ++++++++-
 tests/src/core/helpers.test.ts                   | 11 ++++++-----
 12 files changed, 58 insertions(+), 16 deletions(-)
```

### Sandbox observations

| Command | Exit | Reading |
| --- | ---: | --- |
| `npm run test:src:core` | `1` | 16 failed, 394 passed. Failures follow inner process denial; guide-entry assertions receive empty child output. |
| `npm run test:guides` | `0` | 22 passed. |
| `npm run test:src:bin` | `1` | 1 failed suite; 5 failed, 113 passed. Inner Git/Node processes and loopback listeners are denied. |
| `npm run test:policy` | `0` | 91 passed. |
| `npm run test:config` | `1` | 4 failed, 168 passed, 1 skipped. Spawn denials occur; the real non-sandbox finding is stale `host.json` bytes for `guides/scaffold.md`. |
| `npm run test:setup` | `1` | 10 failed, 68 passed. Spawn/listener denials occur; the same stale host inventory also surfaces. |
| `npm run test:src:server` | `1` | 64 failed, 381 passed. Loopback listeners and inner Git are denied; the stale host inventory also surfaces. The IPv6-specific case does not run because listener setup fails earlier. |

### Deviation state

No unit deviation. `Blueprint.engines` remains a string, `src/core/types.ts` is unchanged, and no rejected `engines.npm` or `engine-strict` mechanism was added. `package-lock.json`, `host.json`, configs, and other off-limits files are unchanged.

Carry-forward findings: `host.json` needs regeneration outside this unit, and [README.md](/home/user/scaffold/README.md:12) retains the out-of-scope “Node 22.12” wording.
---

## Orchestrator integration record

The unit's report above is its own reading inside a bench sandbox. These are the Orchestrator's
findings and edits after it exited, recorded separately because they are not the unit's work.

**The authoritative host run overturned the unit's green.** The unit cleared every criterion it was
given, all of which were non-spawning by design. The host run then reported `test:src:core` at
`1 failed | 409 passed`, where the pre-change baseline was `409 passed (409)`. The failing case is
`tests/src/core/templates.test.ts` > `configuration templates` >
`is an oxfmt fixed point across the emitted content corpus`.

The cause: `blueprintToManifest` emitted `engines` before `devEngines`, and the formatter normalises
to the reverse order, so every generated manifest failed its own `format:check` on a developer's
first run. Inside the bench that case sat among spawn-denial failures and could not be read as a
genuine signal; on the host it stands alone. This is the split the contract predicts, and it is why
the authoritative run belongs to the Orchestrator rather than to the unit.

**Orchestrator edits, which are integration work and are audited like any other part:**

- `src/core/compilers.ts` — swapped the emit so `devEngines` precedes `engines`.
- `tests/src/core/fixtures/source-manifest.txt` and `setup-false-manifest.txt` — reordered to follow
  the emit. `tests/src/core/compilers.test.ts` needed nothing, because `toMatchObject` is key-order
  independent.

**Host gate readings after those edits**, each project invoked singly, instrument
`evidence/linux-gate/verify-ufloor.sh`, status `evidence/linux-gate/ufloor.status.txt`:

```text
build(regenerates host.json) 0    test:src:bin 0    test:setup  0
format:check 0                    test:policy  0    test:guides 0
lint:check   0                    test:config  0
check        0                    test:src:core 0
test:src:server 1 — 1 failed | 444 passed, the baseline IPv6 case at helpers.test.ts:223
```

`build` runs first because the change edits a vendored guide and `host.json` digests the vendored
set. The unit surfaced that staleness itself, correctly separating it from the sandbox denials, and
the first brief had failed to name the regeneration step.

Landed as `a371cea`.

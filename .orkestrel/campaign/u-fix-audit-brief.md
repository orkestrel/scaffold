# Claims brief — U-fix, the fix round for scaffold 0.0.65

## Subject

`@orkestrel/scaffold` on `claude/compassionate-knuth-5e0gyu` at tip `373d29e`, local
`0.0.65`, registry `0.0.64`. This is the **successor** to `scaffold-fix-audit-brief.md`. That round
ruled `FAIL 7, 8, 14, 15` with ten findings outside the claims (`scaffold-fix-audit-verdict.md`);
every carrier landed in the U-fix unit at `373d29e`, implemented by the native Opus 5
`implementer` from brief `u-fix-brief.md`. The fix round's writer engine is Opus 5; the objective
lane on Sol is the engine that did not write it.

Chain: `linux-gate` (held the version) → `scaffold-fix-design` (ruled the fix) → U-floor (`a371cea`)
→ U-dist, U-probe, U-record (`23eca02`) → `scaffold-fix-audit` (this round's predecessor) → U-fix.

Review evidence by path, relative to `/home/user/scaffold`: `tmp/evidence/u-fix.diff.txt` (the
diff `c2a42a1..373d29e`, campaign records excluded), `tmp/evidence/u-fix.diffstat.txt`,
`tmp/evidence/u-fix.status.txt` (empty at dispatch), `.orkestrel/campaign/u-fix-report.md` (the
unit's structured return), `.orkestrel/campaign/evidence/linux-gate/final2.status.txt` and
`final-verify2.log.txt` (the authoritative host run after the fix), and the predecessor round's
verdict and lane reports.

## What the round decides

Whether `@orkestrel/scaffold@0.0.65` uploads. The predecessor round's ruling was that the upload
waits on items F and G — the guide and the README ship — and on the two proofs that could not fail
for the defect they name. This round decides whether those carriers closed what they were briefed to
close and introduced nothing.

## Already established — verified by the Orchestrator on this host

Each row was run by the Orchestrator on this host, or read from the unit's structured return
(`u-fix-report.md`) and then re-run in the authoritative host verification whose rows appear last.

**Predecessor reproductions** (`scaffold-fix-audit-verdict.md` § Reproduced before ruling): claim 8's
stub passed both proofs; `executeOllamaSetup` inherited `PATH` and `/usr/local/bin/ollama` resolved;
`@orkestrel/sqlite@0.0.11` declares `^22.18.0 || >=24.4.0` through `probe → queue → database`;
`README.md:12` read "Node 22.12 or later"; the lock's root `engines` read `>=22.12.0` and was patched
by hand to preserve the `libc` selectors npm 10.9.7 strips.

**U-fix, the unit's readings:**
- Item A. The briefed stub control (`return false`) did **not** redden on this host, because the
  predicate's true answer here is `false` — the stub is behaviourally identical. The unit's
  substitute control did: with the `::ffff:` request replaced by one failing for a different reason,
  the pre-change assertion passed (`2 passed`) and the post-change assertion failed (`1 failed`,
  `refusal: undefined` against `'EAFNOSUPPORT'`). Plant removed, file restored with
  `git diff --exit-code`. The assertion reads `{ delivered, refusal }` against
  `{ delivered: false, refusal: 'EAFNOSUPPORT' }`, with the `127.0.0.1` control at `200` first.
- Item B. Tool list enumerated from `scripts/ollama.sh`: `curl`, `dirname`, `mkdir`, `mktemp`,
  `node`, `rm`, `setsid`, `sh`, `sleep`, `timeout`, `uname`; the interpreter is resolved separately
  and launched by path. **Before the fix** the pinned case timed out at 5000 ms and the run launched
  this host's real daemon (`tmp/ollama-service.log` gained `bind: address already in use`). **After**:
  exit 0 in 109 ms, `result.code` 127, stderr `ollama.sh: ollama is required to start an unreachable
  loopback endpoint`, fixture recorded exactly `['/api/version']`. Whole `Ollama setup` block: 11
  passed.
- Item C. `test:distribution -- --mode release` 6 passed, 77.9 s, the moved provisioning case
  running there at 4021 ms; `test:setup` reaches the registry in no case — the sole `provisionNpm`
  call passes `floor: ambient` and asserts the prefix holds no `node_modules`.
- Items D, E. `test:src:core` 410 passed after the rename; `git diff --stat` names only owned files,
  316 insertions and 97 deletions.
- Item G. `test:guides` 23 passed with the README pin, which reads the floor from `package.json`
  rather than from the constant.
- Item H. `test:policy` 91 passed over the edited `ROADMAP.md`.
- D2. Four projects each failed one case on the stale vendored digest of `guides/scaffold.md`
  because `host.json` was off-limits to the unit; with the guide alone at its committed bytes those
  four projects exit 0. The Orchestrator's verification runs `build` first.

**Authoritative host run after the fix** (`evidence/linux-gate/final2.status.txt`):

```text
build	exit=0	elapsed=11s
format:check	exit=0	elapsed=10s
lint:check	exit=0	elapsed=1s
check	exit=0	elapsed=12s
test:src:core	exit=0	elapsed=27s
test:src:server	exit=0	elapsed=5s
test:src:bin	exit=0	elapsed=19s
test:policy	exit=0	elapsed=2s
test:config	exit=0	elapsed=14s
test:setup	exit=0	elapsed=3s
test:guides	exit=0	elapsed=3s
distribution(release)	exit=0	elapsed=80s
prepublishOnly(literal)	exit=0	elapsed=191s
```

## Numbered falsifiable claims — attack the predecessor's rulings first

1. **Item A closed claim 8.** With `supportsMappedLoopback` stubbed to `return false`, the HTTP
   comparison case in `tests/setupServer.test.ts` now **fails**, because it asserts the `::ffff:`
   request rejected with `EAFNOSUPPORT` when the predicate reports `false`; with the stub removed
   it passes; the plain-`127.0.0.1` control still returns `200`.
2. **Item B closed claim 7.** `executeOllamaSetup` hands `scripts/ollama.sh` a `PATH` under which
   `command -v ollama` fails, while every tool the script invokes still resolves; and the new case
   in `tests/src/server/helpers.test.ts` drives a loopback fixture whose `/api/version` answers a
   non-2xx status into the script's startup branch and observes exit `127` with the "ollama is
   required" message, in well under the script's 60-second startup window, with no daemon
   process created.
3. **Item B widened nothing.** Every pre-existing `Ollama setup` case still passes under the
   scrubbed `PATH` — none depended on a tool the scrub removed.
4. **Item C closed claim 14 and F6.** `npm run test:setup` reaches the registry in no case on any
   host; the provisioning case now lives in `tests/distribution.test.ts` with its `skipIf` gate and
   timeout intact and ran there on this host; the module-scope `readNpmVersion()` binding is gone
   from `tests/setupServer.test.ts` and a host with no npm on `PATH` would fail one case, not the
   project's collection.
5. **Item D's renames are complete and consistent.** No occurrence of `TestNpmInterface`,
   `resolveNpm`, or an npm-version binding named `host` remains in `tests/`; `TestNpm`,
   `provisionNpm`, and `ambient` are used at every site; nothing else was renamed.
6. **Item E's rename is complete across the published surface.** `DEFAULT_DEV_ENGINES` appears
   nowhere in `src/`, `tests/`, or `guides/`; `WORKSPACE_DEV_ENGINES` is exported from
   `src/core/constants.ts`, imported at the emit in `src/core/compilers.ts`, and its guide parity
   row and TSDoc state that every generated manifest carries it and no blueprint field varies it;
   `DEFAULT_ENGINES` is unchanged.
7. **Item F is true and sufficient.** `guides/scaffold.md` § Generated workspace now states the
   `engines.node` floor `>=22.18.0`, the `devEngines.packageManager` floor `>=11.6.0` with
   `onFail` set to `error`, and that npm refuses an install in a generated workspace beneath that
   floor — in the guide's voice, with no count, no banned term, and every code token followed by a
   noun.
8. **Item G is true and pinned.** `README.md` states "Node 22.18.0 or later"; `tests/guides.test.ts`
   asserts the README's stated floor equals `package.json`'s `engines.node` floor; and that pin
   **fails** if `README.md` is edited back to `22.12` (state the control's reading).
9. **Item H's ROADMAP rows are true prose.** No count remains in the `&&` row; no possessivized
   code token remains; the `@types/node` row names `target: 'node22'` in `src/core/templates.ts`
   as part of its subject; a `supportsMappedLoopback` row proposes the `@orkestrel/test/server`
   home; a row records `@orkestrel/sqlite@0.0.11`'s `^22.18.0 || >=24.4.0` range reached through
   `probe → queue → database` as a warning on Node `24.0.0`–`24.3.x`, not a refusal; the measured
   npm range claim is kept and cites `npm-boundary-readings.log.txt`.
10. **`host.json` follows the vendored guide edit.** `npm run build` regenerated `host.json`, its
    `guides/scaffold.md` entry digest matches the file's bytes, and `test:config`'s inventory case
    passes.
11. **The authoritative host run is green.** `build`, `format:check`, `lint:check`, `check`, every
    test project singly, `test:distribution -- --mode release`, and the literal
    `npm run prepublishOnly` each exit `0` on this host after the fix.
12. **Nothing outside the carriers moved.** The diff `c2a42a1..373d29e` touches only the
    files `u-fix-brief.md` owns, and `dist/src` and `dist/bin` are byte-identical before and after
    the fix except where item E's rename reaches an exported identifier.
13. **The package is coherent to ship.** Read the whole tree at the tip as a consumer would: the
    README, the guide, the generated manifest, and the refusal a developer meets on the wrong npm
    agree with each other and with the code.

## Unknowns

- **U1.** Whether item B's scratch `PATH` is complete on a host whose `curl`, `setsid`, or `timeout`
  lives somewhere the enumeration did not look — the tool list was enumerated from this host. Name
  what a portable enumeration would read instead.
- **U2.** Whether the moved provisioning case, now in `distribution`, still skips correctly on a
  host at or above the npm floor — unmeasurable here; name the settling command.

## The threshold

A finding is worth more than a clean pass; `0.0.65` is spent on upload. Attack claims 1, 2, and 8
hardest — each is a proof that was briefed to fail for a specific defect, and a proof that cannot
fail is the finding the predecessor round existed to catch.

## Output

The `orkestrel-falsify` verdict shape: numbered verdicts 1–13, findings outside the claims,
attacked-and-held, the two unknown observations, exactly one terminal line.

I'll read the brief and the orchestration files that govern how this session should act on it.The brief is a read-only mechanical check: falsify the successor script’s delta claims. I’ll load the named rules, the candidate script, and the prior-run evidence next.Mechanical check of the successor staging delta. Subject is `tmp/pass/prepare-scaffold-path-final-2.sh`. The isolated `package.json` `clean` script and the predecessor run log were read. The successor itself was not executed.

## 1 — CONFIRMED

Attack: cleanup runs before the isolated cwd, git root, baseline, or ordinary `dist` pins; or the script issues its own recursive delete; or `npm run clean` is not the isolated relative-`dist` script.

It held.

- Pins before any `npm run`: `target=/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path` (`prepare-scaffold-path-final-2.sh:8`); `test "$SCR/scaffold-path" = "$target"` (`:13`); `test "$(cd "$target" && pwd -P)" = "$target"` (`:15`); `test -z "$(git -C "$target" rev-parse --show-prefix)"` (`:16`); `HEAD` equals `c87021bdc6367d27463139b293287a586de18240` (`:9`, `:17`). `pass-env.sh:4` sets `SCR` in the same `/c/` language.
- Ordinary non-linked `dist` and `dist/host` inside that target: `test -d`, `test ! -L`, `readlink -f` equals the same Bash path (`:21-26`).
- Mutation order: `cd "$target"` then `npm run clean` (`:34-35`). No `rm`, `git clean`, install, publish, or credential path in the script.
- Isolated `clean` is `rmSync('dist',{recursive:true,force:true})` with no `pre-clean` or `post-clean` (`tmp/pass/scaffold-path/package.json:62`). Relative `dist` from that cwd is the isolated generated tree, not source, a fleet consumer, primary scaffold, or `package.json` / `package-lock.json`. The predecessor already proved that same `cd` then `npm run` lands in the isolated tree (`d7n-scaffold-path-final-prepare.CFfNxy/build-host.log.txt:3`).

## 2 — CONFIRMED

Attack: build order changes; a failed `clean` or later step can still print success; manifest, guide-dist, status, or untracked-test captures are dropped.

It held.

- After `clean`: `build:src`, `build:host`, `build:inventory` (`prepare-scaffold-path-final-2.sh:36-38`). Isolated `package.json:86` already declares that same `clean` then those three names.
- `set -euo pipefail` (`:4`). Success `printf` is only after every check (`:51-52`). Redirected `npm run` still returns the npm exit to the shell.
- Guide dist file and digest still run before `cd` (`:20`, `:31-32`). Manifest/lock `sha256sum` then `sha256sum -c` (`:30`, `:40`). Status, tracked diffs, and the `git diff --no-index` capture of `tests/setupPolicy.test.ts` remain (`:29`, `:41-49`). The only swallowed git status is `--no-index` equal to `1`.

Predecessor failure this delta answers: `ScaffoldError TARGET` at `dist/host` (`d7n-scaffold-path-final-prepare.CFfNxy/build-host.log.txt:7-11`). That is sequence evidence, not a run of this successor.

## 3 — CONFIRMED

Attack: the live delta also rewrites a previously checked guard or capture; or a prepare-2 mktemp evidence directory shows a completed build.

It held.

- Recorded delta (`tmp/pass/d7n-scaffold-path-final-prepare-2/predecessor-delta.diff`): successor header comments (`:2-3` in the candidate), evidence prefix `d7n-scaffold-path-final-prepare-2.XXXXXX` (`:28`), and `npm run clean` with `clean.log.txt` (`:35`). Direct read of `prepare-scaffold-path-final.sh` against the candidate matches that bound. Previously checked pins, `--show-prefix`, dist link refusal, digest, manifest check, status, diffs, and `--no-index` `if` are unchanged.
- No `tmp/pass/d7n-scaffold-path-final-prepare-2.<suffix>` mktemp directory exists. Authoring residue is `status.txt`, `predecessor-delta.diff`, and empty `bash-n.log.txt`. Predecessor run dir `.CFfNxy` is still the last staging execution. Empty `bash-n.log.txt` is not a build. This claim is the authored sequence, not a completed staging run.

## Findings outside the claims

None at the `BROKEN` standard. Isolated `dist` remains from the failed predecessor `build:src`. Root still owns the capped successor execution.

## Attacked and held

- Cleanup before the physical/`dist` pins, or a handmade recursive delete — failed: guards occupy `:13-26`; first mutation is `npm run clean` at `:35` after `cd`.
- Isolated `clean` reaching source, primary scaffold, a fleet consumer, or owner manifests — failed: relative `dist` `rmSync` at isolated `package.json:62`; manifests re-checked at `:40`.
- Success `printf` reachable after a failed `clean` or later npm/hash/`test` — failed: `set -euo pipefail` and success lines only at `:51-52`.
- Extra successor edits beyond header, evidence prefix, and the clean call/log — failed: `predecessor-delta.diff` plus side-by-side script read.
- A silent completed prepare-2 run — failed: no mktemp successor evidence directory; last host log is still the predecessor `TARGET` refusal.
- Adjacent and correct: `build:inventory` still regenerates isolated `host.json` after a vacant `dist/host`. That is the declared build, not the `clean` script. `git diff` of tracked files still omits untracked `tests/setupPolicy.test.ts`; that file remains the `--no-index` capture.

```text
VERDICT: PASS
```

Provenance: brief `tmp/cursor/d7n-scaffold-path-final-prepare-2-check-brief.md`; journal `tmp/cursor/d7n-scaffold-path-final-prepare-2-check.jsonl`; session `82274061-3301-4f60-a4ec-fbf4b590db69`; candidate `tmp/pass/prepare-scaffold-path-final-2.sh`.

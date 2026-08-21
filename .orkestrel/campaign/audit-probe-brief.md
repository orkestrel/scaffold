# Audit round: probe's campaign chain

## Subject

The uncommitted working tree of `C:/Users/mikes/WebstormProjects/probe`, carrying this
campaign's chain on top of an earlier session's accepted Windows fixes:

| Round | Claimed to close |
| --- | --- |
| Earlier session (accepted) | `RuntimeStage` invalidation spelling; specification-identifier eviction; `TypeStage` diagnostic translation; separator assertions; TTY and closed-input skips |
| Unit B | `isRefusedName` + the claimant/`refused` classification at the final create; the `REFUSED_RUNTIME_TARGETS` gate |
| Unit C | The config-read seam normalized (`readConfigFile`, `parseJsonConfigFileContent`); the malformed-project refusal proof; the caller-named diagnostic proof |
| Unit P-host | `DIRECTORY_LINKS` junction fixtures for the symbolic-link proofs; the FIFO path-not-exit-code gate; the four bin signal skips with a measured control |
| Unit M6 | The `stop()` `process.stdin` listener pin |

Engine authorship: units B, C, P-host, and M6 were written by Opus-side executors. The
`analyst` lane's own engine wrote NONE of this chain; the `reviewer` lane's engine (Opus)
wrote ALL of it — reviewer, attack your own engine's work the harder for it; a clean pass on
your own engine's work is the least valuable result you can return.

## What the round decides

Whether probe's chain is accepted into the campaign's release preparation. probe is 0.0.1 on
the registry; this decides whether its tree is fit to bump and publish when the user asks.

## Already established, by the Orchestrator directly — do not re-run

- The tarball-installed `@orkestrel/test` (the manifest's `file:` reference) is deliberate
  campaign state; the replaced range `^0.0.7` is recorded.
- Host measurements (2026-08-21): junction semantics; the bad-name `ENOENT` collapse;
  `readConfigFile`'s `Debug Failure` on a native path; `child.kill` running no handler here;
  Git's `mkfifo.exe` exiting 0 while creating nothing.
- The suite state after the chain, run by the Orchestrator: `src:server` exits 0 at
  `140 passed | 2 skipped`; `src:bin` exits 0 at `5 passed | 6 skipped`.

## Review evidence

The diff and status are the working tree: run `git status --porcelain` and
`git -C . diff` yourself (the whole modified set is the subject; the baseline is HEAD).
`.orkestrel` campaign records live in the scaffold repo, not here.

## Numbered falsifiable claims

1. `isRefusedName` returns `true` for exactly the host-refusal set — a code of
   `ENAMETOOLONG`, `ERR_INVALID_ARG_VALUE`, or `ENOENT` whose file's parent stats as a
   directory — and `false` for a missing parent, a non-error value, and an error without a
   code. CONFIRMED requires naming the attack inputs you tried that failed to confuse it.
2. The `RuntimeStage` claimant/`refused` throw fires only on a final-create failure outside
   the `creating` branch; a missing or refused PARENT still classifies workspace-origin, and
   the instrument-issue fallback still exists for other write failures.
3. `REFUSED_RUNTIME_TARGETS` reads the property it gates: on a host that accepts a
   300-character component, the probe reads false and the proof skips rather than fails.
   Attack the probe's rule, not its output: name a host state it would misread.
4. Unit C re-keyed no cache: `#services`, `#options`, `#files`, and `#diagnostics` still key
   on the native `path`, and the digest and service-recycling proofs pass for the same
   reason they did before the change.
5. The malformed-project refusal carries the workspace-relative project in its message with
   neither `Debug Failure` nor a backslash, and a WELL-FORMED project's resolution is
   byte-identically unaffected.
6. Each junction-converted proof still proves ITS OWN subject: the refusal or classification
   it asserts arises from the link crossing, not from an incidental host error. Pick the one
   you consider most likely vacuous and attack it.
7. The FIFO gate cannot report a usable gate for a path the host did not create, and its
   in-proof control (the absent-directory case) cannot pass vacuously.
8. The four bin signal skips weaken no assertion: the killed shape is never accepted as the
   graceful outcome, and each skip's citation names a mechanism reading taken through the
   same door the proof uses, with a control that discriminates.
9. The `stop()` pin binds: it asserts against the recorded pre-start reading (never a
   literal zero), and its intermediate assertion proves `start()` raised the count, so the
   return-to-baseline reading cannot pass on a server that never listened.
10. The remaining skips across `src:server` and `src:bin` each cite a mechanism this host
    lacks, and no skip hides a failure a different fixture could express here.
11. The tree is coherent as a whole: guides parity, policy, and the projects you can run
    agree with the sources. Would you ship this tree (campaign state aside)?

## Unknowns, named

- POSIX behaviour of every adapted proof is out of this host's reach; a claim that turns on
  it is `UNRESOLVED` with the settling command named, never guessed.

## Probes

The repository declares the `probe` Vitest project over `tmp/probe/**/*.test.ts` — write
runtime probes there and delete them before returning. Distinct filenames per lane:
the reviewer lane uses `tmp/probe/audit-reviewer-*.test.ts`, the analyst lane
`tmp/probe/audit-analyst-*.test.ts`. No whole-project gate runs while you hold probes.

## Verdict

Per the `orkestrel-falsify` skill (`.agents/skills/orkestrel-falsify/SKILL.md` in the
scaffold repo — its verdict-shape section owns the value set and the single terminal line).
The Falsification law is `.claude/rules/quality.md` § Falsification in this checkout.
CONFIRMED requires naming the attack you tried that failed. A claim you cannot decide is
UNRESOLVED, not CONFIRMED — say what would settle it. Do not hedge toward an imagined
consensus. A finding is worth more than a clean pass: the alternative is a consumer finding
it after publication, when the version is spent.

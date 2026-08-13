# Falsification audit — `@orkestrel/test` — round 4 reconciliation

Subject: `/home/user/test` at `c6fe03f`. The round-3 fix diff, `cb2b9df..c6fe03f`, 490 lines.

## Why this round existed

Not another sweep of the server-face seam. Round 4 is the fix-round rule: work is reviewed by an
engine that did not write it. Sol wrote `src/` and `tests/` in round 3, Opus wrote `guides/test.md`
and `README.md`, and both lanes audited the whole diff so every half was read by an engine that did
not produce it.

| Lane | Role / engine | Verdict |
| --- | --- | --- |
| Objective | `analyst` / GPT-5.6 Sol, journal thread `019ffb13-067b-7ff0-85e6-4a8d7d763c47`, 54 commands, 8 file changes | `FAIL` — 4 broken |
| Subjective | `reviewer` / Opus 5, `Read`/`Grep`/`Glob` only | `FAIL` — 3 broken, 3 unresolved, 1 outside finding |

The subjective lane was told its own engine wrote the prose half and to attack it harder for that
reason. All three of its `BROKEN` verdicts are against Opus-written prose. That instruction is worth
repeating in any round where a lane audits its own engine.

The objective lane restored every mutation it applied and swept its own probes; the tree was clean at
`c6fe03f` when it returned.

## Where the lanes converged

Both found the same defect from opposite directions. The subjective lane predicted it by reading
`lstatSync` in `exists` against `statSync` in `read` and marked it `UNRESOLVED` with the settling
command. The objective lane executed it. Reproduced by the Orchestrator:

```text
DANGLING exists: true
DANGLING read:  Error: ENOENT: no such file or directory, stat '/tmp/orkestrel-test-dUFo2H/dangling'
DIRLINK  read:  Error: Scratch path is a directory: dirlink
FILELINK read:  "ok"
```

A dangling link makes `exists` true and `read` throw a raw `node:fs` error — neither the documented
`undefined` nor any documented throw, and the only raw `node:fs` error the package lets reach a
consumer.

## Where they diverged, and what decided it

**The objective lane called the CI workflow `BROKEN` and demanded a Windows runner.** Its stated
ground: the package "claims host-independent separators, case probing, drive-relative paths, and UNC
containment," none exercised on Windows.

Measured:

```text
$ grep -c -i -E "\bUNC\b|\bdrive\b|\bwin32\b|\bwindows\b" guides/test.md README.md
guides/test.md:0
README.md:0
```

The package documents separator normalization and case probing — both exercised on the running host,
the second by an explicit runtime probe. It documents **no** drive-relative or UNC claim anywhere.
Those forms were properties the audit briefs asked auditors to attack; the lane read the brief's own
questions back as the package's claims.

**Rejected.** Adding a Windows runner would diverge one package from a convention all 41 published
packages share, to test claims nobody makes, and it would immediately redden the `0o700` assertion.
The subjective lane's `CONFIRMED` on the same claim is the correct verdict. The real residue it
identified — POSIX-only CI leaves the mode assertion and the separator normalization unexercised
where they could differ — is closed by qualifying the prose instead.

An audit brief that names attack vectors teaches the lane those vectors matter. When a lane returns a
finding whose ground is a claim the subject never made, check the subject before acting.

## Findings carried

| # | Finding | Source | Carrier |
| --- | --- | --- | --- |
| R1 | Dangling symlink: `exists` true, `read` throws raw `ENOENT`. | both lanes | Sol brief item 1 |
| R2a | `InventoryOptions.exclude` TSDoc says "path segments"; the implementation matches full root-relative keys, and `helpers.ts:29` says so correctly. The wrong wording ships in `dist/src/server/index.d.ts:14`, so a consumer's editor states it. Fails silently: `exclude: ['index.ts']` drops nothing and raises nothing. | subjective, outside the claims | Sol brief item 2a |
| R2b | `read`'s `@throws` in `types.ts` omits the directory throw added last round. | objective claim 3 | Sol brief item 2b |
| R2c | `read`/`write`/`exists` name their parameter `relative` while `resolveContained` now accepts an absolute contained target. | Orchestrator | Sol brief item 2c |
| R3 | The timer floor is proportional while the undershoot is absolute. `delay * 0.9` is right today and would tolerate 100ms at `waitForDelay(1000)`. | subjective claim 5 | Sol brief item 3 |
| R4 | The guide's `write` row still says "Writes a file below the directory" — pre-fix physical-containment wording the package's own symlink test falsifies. | objective claim 8 | prose unit |
| R5 | The security paragraph contradicts itself in the only prose that ships. It asserts a link inside the allocation "is one the test put there — which is true whatever the permissions are" three sentences after conceding that the code under test runs as the same uid and is the population that would create one. | subjective claim 6a | prose unit |
| R6 | The mode-`0700` claim is unqualified in guide and README and the new test hard-codes the constant, against `.claude/rules/tests.md:26`, which names permission bits as a host-varying property to probe rather than assume. | subjective claim 6b | prose unit |
| R7 | The guide's `## Tests` section omits five tests the round-3 diff added, in bullets that diff was already editing — including the argument-limit proof for that round's headline defect. | subjective claim 8 | prose unit |
| R8 | The README never shows that the record's values are file contents, drops "keyed in sorted order" which the previous text carried, and does not say a directory key prunes its subtree. | subjective claim 7 | prose unit |

Every retained finding names its carrier.

## What held

The `resolveContained` contract change opened no escape — both lanes attacked it by input class and
found none, and the objective lane executed the POSIX and win32 forms. The `roundTripJSON` repair is
enumeration-identical and the argument-limit defect is gone rather than moved. The three regression
proofs the objective lane mutated all bound independently. The README does let a consumer call
`readInventory` without the guide, which was round 3's F6. The eleven-value surface, both entry
points, the zero-dependency rule, and the Surface and Methods tables match source.

## Exit

This is the last audit round for this campaign. The remaining work is one source-and-types unit and
one prose unit, both fully specified from findings already reproduced. Acceptance follows an
independent `verifier` sweep and the Orchestrator's own re-run of the reproductions above. A further
audit round opens only if the verifier finds something, which is what `.claude/rules/quality.md`'s
three-rounds budget means in practice: rounds converge on smaller findings, and a round that returns
prose defects and a missing TSDoc sentence has reached the floor.

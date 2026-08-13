# Duplication research — every angle, measured

The first inventory found helpers that had **already been extracted** into `tests/setup*.ts`. It is
structurally blind to a pattern repeated inline across twenty test files that nobody ever named. This
round asks the harder question with a different instrument.

## The instrument

A normalized token-window clone detector over every test file in the fleet, at
`tmp/dup/detect.mjs`. It strips comments, collapses whitespace, canonicalizes string and numeric
literals, then hashes every k-line window and clusters identical ones.

**Vendored files are excluded**: `tests/config.test.ts`, `tests/policy.test.ts` and
`tests/setupPolicy.ts` are byte-identical fleet-wide by scaffold's design, and including them buries
every real signal. With them in, the top 15 clusters were all `config.test.ts`.

Two normalizations were run, and the difference matters:

- **Shape** — identifiers erased as well. Answers "same structure". It reported 8-package clusters
  that turned out to be `import { describe, expect, it } from 'vitest'` blocks colliding with each
  other. That is a different question than the one asked, and its answer was noise.
- **Strict** — identifiers kept. Answers "same content". This is the instrument the findings below
  rest on.

Recording that because the first instrument gave a confident wrong answer, and the fix was matching
the instrument to the question rather than trusting the first number.

Coverage: 483 files, 81,102 windows. It reports on `tests/**` in the 41 clones and nothing else.

## Finding 1 — the fleet's largest un-extracted duplication is `tests/guides.test.ts`

**39 of 41 packages** carry the same guide-parity body. The largest single region is 43 contiguous
lines, and 96 distinct clusters span it. Normalizing whitespace, lines 60–140 hash **identically**
across `abort`, `emitter`, `csv` and `timeout`, with minor variants in `tool` and `sqlite`.

That is roughly **1,600 lines of duplicated test code**, and the first inventory could not see it,
because the duplication is the test body itself rather than a helper anyone extracted.

It is not straightforwardly extractable. The block is `describe`, `it` and `expect` — test
**registration**, which `.claude/rules/tests.md` forbids in a setup file and which a helper package
cannot own without importing a test framework. `resolveRoot` and `readInventory` took the walk that
feeds it; the proof itself stayed behind.

## Finding 2 — cross-package duplication inside test bodies is thin

Outside `guides.test.ts` and `setup*.ts`, the largest cluster spans **4 packages**, and 90 clusters
exist at 2 or more. Under the membership rule that is below the threshold almost everywhere, and the
few that clear it are import blocks rather than logic.

**Nothing here earns a shared helper.** That is a real result, not an absence of work: the fleet's
test bodies are genuinely package-specific, which is what they should be.

## Finding 3 — within-package duplication is large, and belongs to each package

**1,574 repeated 5-line blocks across 36 packages**, counting only blocks repeated three or more
times inside one package. The worst offenders:

| Package | Repeated blocks | Worst single block |
| --- | --- | --- |
| `mcp` | 208 | 16× |
| `database` | 200 | **42×** |
| `scaffold` | 121 | 12× |
| `workflow` | 121 | 8× |
| `contract` | 111 | 24× |
| `middleware` | 99 | 11× |
| `agent` | 93 | 10× |

The three worst blocks were read directly, and all three are **domain-specific case matrices**:

- `database` ×42 — a query-builder condition table;
- `contract` ×24 — an intrinsic-probe matrix over `WeakSet.prototype.*` and `Object.hasOwn`;
- `websocket` ×18 — a `duplexPair` socket fixture.

None generalizes. `.claude/rules/tests.md` already rules on this shape: *data tables and case
matrices belong in a setup file at any size*. So the repair is **per package, into that package's own
setup file**, and none of it is `@orkestrel/test`'s to own.

This is the largest single body of test debt in the fleet, and it is out of scope for this package.
Recorded here so the adoption campaign inherits the measurement rather than re-deriving it.

## Finding 4 — the extracted-helper duplication is already closed

384 clusters in `setup*.ts`, topping out at 32 packages, which is `createRecorder`. That is the
population the first inventory measured and the package already covers.

## What this leaves as actionable

Exactly one candidate: **the guide-parity proof**, at 39 packages. Everything else either belongs to
one package, or is already shipped, or falls below the membership rule.

The design question it raises is genuinely hard and is not settled here:

- The duplicated block is test registration, so a shared package cannot own it without importing a
  test framework, which `tests.md`'s line forbids in spirit.
- Extracting the **computation** — the comparisons the block performs — leaves each package a thin
  registration shell and collapses 43 lines to a handful.
- But those comparisons take `@orkestrel/guide`'s `Guide` and `Source` values, and naming a foreign
  type in a published signature is the trap round 1 measured. `@orkestrel/guide` is a devDependency
  of all 41 at one pin, so the two-copy case arises in exactly one repository — `guide`'s own, which
  unlike `emitter` **is** a real consumer of its own parity proof.

That combination goes to an adversarial design pass rather than being settled by the Orchestrator,
who has already been wrong once on precisely this question.

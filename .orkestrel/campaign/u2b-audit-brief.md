# Audit U2b — the html wall-clock test split

Role: analyst. Engine: GPT-5.6 Sol. Read-only: audit, never edit. Attempt REFUTATION of each
claim; CONFIRMED needs the evidence that convinced you, BROKEN needs the exact failing input
and the smallest correct fix. Terminal line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/html` (baseline 55bf2f4, writer
Claude Opus 5). Diff at `/home/user/scaffold/tmp/units/u2b.diff`; the binding design is
`/home/user/scaffold/.orkestrel/campaign/d1-reconciliation.md` § Q2. Supplied host evidence:
the writer's scoped runs — core suite complete and green, `test:bench` collecting the new
blocks, scoped format/lint/check clean.

## Claims

1. No `performance.now()` reading, ratio assertion, or total-milliseconds ceiling remains in
   either owned test file, and the unasserted warmup call is gone.
2. Every retained test asserts a parsed or decoded VALUE, and the literals were taken from red
   runs, not derivation — spot-check the least-derivable ones against the real code: the empty
   raw body keeping an empty text child, `measureHTMLDepth` returning the depth cap for the
   deep and full-stack runs, and the first-wins attribute result `[{ name: 'a', value: '' }]`.
   Run the suite scoped if the sandbox admits it; otherwise trace the parser.
3. The two tests that previously asserted nothing but elapsed time gained structural
   assertions, and the `NAMED_ENTITIES` size assertion now sits beside the entity-audit test.
4. Every retained test carries an explicit timeout with a comment naming its sizing basis, and
   no suite name still claims a complexity grade ("subquadratic", "linear").
5. The bench blocks sit behind exactly `if (import.meta.env.MODE === 'benchmark')`, build
   their inputs inside the guard, commit no baseline, and hold the growth pairs of the deleted
   ratio inputs. The writer's deviation — bare `bench` calls instead of a wrapping `describe`
   — is recorded with lint evidence (the vendored `vitest/no-conditional-tests` rule) and two
   measured rejected alternatives; confirm the adopted shape both lints clean and stays inert
   in test mode.
6. Scope honesty: only the two owned test files moved; `src/**` untouched (no operation
   counters entered); the diff obeys the repository laws in its reach.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.

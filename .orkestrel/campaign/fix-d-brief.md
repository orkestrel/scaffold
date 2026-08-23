# FIX-D — two precisely-bounded audit findings

## Role and engine

`implementer`, Opus 5, clean context.

Two unrelated findings in disjoint files. Both are fully specified. Neither depends on the other.
Read `.orkestrel/campaign/audit-v50-final-reconciliation.md` first.

---

## Finding 1 — an empty `scripts` region is refused against its own contract

**File: `src/core/compilers.ts`.** Found by the GPT-5.6 Sol lane; the Opus objective lane saw the
same behaviour and recorded it as correct. Sol read the contract and was right.

`src/core/types.ts:140` states of `ManifestScript`:

> An absent script is always writable and needs no entry in `accepted`.

`replaceManifestScripts` contradicts that for one input. Given a manifest whose `scripts` region is
empty — `{"scripts":{}}` — every named script is absent and therefore writable, yet the whole write
is refused:

- `src/core/compilers.ts:1904` — `if (first < 0) return undefined`. `first` is set only while
  scanning an existing key, so an empty region never sets it.
- `src/core/compilers.ts:1907` — `if (manifest.charAt(anchor - 1) === '{') return undefined`. On an
  empty region the anchor lands immediately after the opening brace.

The adjacent non-empty case appends the same script successfully, which is what makes this a defect
rather than a documented limit.

**Add the empty-region insertion path.** The first entry is written with no leading comma, exterior
bytes are preserved exactly as the non-empty path preserves them, and the indentation is derived
from the region's own opening line rather than from a sibling entry that does not exist. Settle the
exact derivation yourself and state what you chose.

### Acceptance for finding 1

- A manifest with `"scripts": {}` and a named script gains that script, with **every byte outside
  the region identical**. Assert the byte identity directly, not by inference.
- A manifest with no `scripts` key at all behaves as it does today — say in your report what that is,
  and do not change it unless the contract requires it.
- The non-empty append path is unchanged: prove it with the existing tests still green plus one
  reading showing an appended entry still carries a leading comma.
- A manifest whose region is empty but whose surrounding JSON is unusual — a tab-indented file, a
  region on one line as `{}` — is written or refused deliberately, not accidentally. Report what each
  does.

---

## Finding 2 — a comment over-states what its assertion detects

**File: `tests/distribution.test.ts`,** this repository's own bespoke proof. Both Opus lanes broke
the claim; Sol confirmed the implementation. All three are right: the code behaves correctly and the
sentence describing it does not.

The comment at `:466-468` says the assertion catches "an extractor that narrows over what a
declaration prints". The objective lane measured otherwise: a rule keeping only a tenth of each
declaration's fenced bodies drops 172 of 188 claim-shaped lines while `printing` does not move,
because any nonzero remainder keeps the declaration's name. The assertion detects a declaration
going **silent**, not a declaration being **thinned**.

`unit-w7-report.md` already states that limit accurately. The shipped comment does not.

**Correct the comment to the property the assertion has**, and name what does catch a partial
narrowing: the driven-count floors at `:537` and `:540`, which pin per-declaration driven claims
above a bound. A reader meeting the `printing` assertion should be told which neighbour covers the
case it does not.

Change no assertion. This is a wording fix on correct code.

### Acceptance for finding 2

- The comment no longer claims detection of a narrowing over what a declaration prints.
- It names the driven-count floors as the neighbour covering partial narrowing.
- `expect(printing).toStrictEqual(...)` and the floors are byte-unchanged.

---

## Scope

**Owned:** `src/core/compilers.ts`, `tests/distribution.test.ts`, and the focused tests under
`tests/src/core/` that pin `replaceManifestScripts`.

**Off-limits:** `src/core/types.ts` — its contract is correct and the code is what disagrees.
`guides/`, `src/bin/`, `src/server/`, `src/core/templates.ts`, `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`, `host.json`, `vite.config.ts`, `package.json`,
everything under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with either objective stops you and you report it. If finding 1 turns out to be
unreachable through the package's own shipped code, say so with evidence rather than building
machinery for it — `.claude/rules/quality.md` § Rounds and verdicts lets reachability bound a fix.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. Finding 1's acceptance list, each item reported with its evidence.
5. **A firing control for finding 1.** Show the new path failing on purpose once — revert the
   insertion and record the red, restore and record the green. Both verbatim.
6. Finding 2's acceptance list.
7. `npm run test:src:core` exits 0.
8. `npm run build` exits 0, then `npm test` exits 0. If `npm test` fails, run each link of its `&&`
   chain separately and report every one.
9. `npm run test:distribution -- --mode release` exits 0. This packs and installs against the live
   registry and takes about a minute; finding 2 edits that file, so this is the gate that reads it.

## Review evidence

Return the actual `git diff` of both files and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion with its exit code or
evidence; the criterion 5 readings verbatim; what you chose for the empty-region indentation and
why; and anything you could not close, named.

# Unit W7 report — replace a stale tally in scaffold's own proof

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/unit-w7-brief.md`.

## Why this existed

`npm run prepublishOnly` was red, so 0.0.50 could not publish. `npm test` was green: the failure
lived only in `test:distribution -- --mode release`, which the aggregate chain does not run.

The assertion was `expect(shaped).toBe(183)`, a hard tally of the claim-shaped lines across the
package's shipped declarations. This campaign added exported symbols carrying `@example` blocks, so
the population reached 188. Nothing was broken; the number was stale.

## Why the fix was not `188`

`AGENTS.md` § Writing bans a count over a set anyone can add to, and this campaign had already
enforced that standard on the proof scaffold generates for every other package: the reconciliation
refused export tallies because name-set equality is strictly stronger, and the audit ruling held
that a cardinality assertion is acceptable only where it pins a structurally fixed set. This tally
moved with the documented surface. Bumping it would have shipped a release whose own proof carries
the shape its generated proof forbids, and it would have gone stale on the next documented export.

## What replaced it

```ts
expect(printing).toStrictEqual(DECLARATIONS.map((declaration) => declaration.types))
```

A declaration joins `printing` when it printed at least one claim-shaped line **of its own**. The
subtlety that makes it correct: the per-declaration figure counts only bodies below `fenced`, the
body count captured before the controls are appended, so a rule that narrowed all the way down to
the injected controls still leaves that declaration at zero rather than being masked by them.

A declaration that goes silent drops its name and the failure says which one. A declaration that
gains an example moves nothing.

## The firing control

Narrowing the extraction so the server declaration's fenced bodies were dropped while its controls
still ran:

```text
AssertionError: expected [ 'dist/src/core/index.d.ts' ] to strictly equal [ 'dist/src/core/index.d.ts', …(1) ]
-   "dist/src/server/index.d.ts",
```

Restored, the same command passes.

The control also established the assertion's necessity: under that mutation the partition assertion
still passed, and every control body was intact so the `mismatched` pins would still have fired.
The narrowing was invisible to both neighbours.

Stated limit, which the unit named rather than leaving implied: the assertion does not detect a
narrowing that removes only *some* of a declaration's claim lines. Any nonzero remainder keeps the
name — the same property that makes an added example move nothing.

## Acceptance

`format:check` 0. `lint:check` 0. `check` 0. No tally literal remains. The partition assertion is
unchanged. `test:distribution -- --mode release` 0, 5 tests in 50.77s. **`prepublishOnly` exits 0.**

## On the byte-untouched evidence

This file was deliberately byte-untouched for the whole campaign, as the evidence that presence
ownership never rewrites a workspace's own proof. This unit edited it by hand. That does not
falsify the claim: the claim is about what the tool writes, not about what a maintainer may edit.
The propagation evidence for `mcp` and `process` — both untouched by `overwrite` — is what carries
that claim, and it is unaffected.

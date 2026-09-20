# Unit U3-policy — successor brief 5: portability, link forms, derivation

## What changed and why

This brief supersedes `u3-policy-brief-4.md` for the remainder of the unit; the earlier
briefs stand except where this one says otherwise. The fourth objective review
(`u3-policy-review-report-4.md`) confirmed the widened pattern, the control rows, the
mechanism, and the regex safety, and refuted the portability claim. The refuted assertion is my
clause from brief 4 § 1, not your work.

Two readings the Orchestrator took on the host, which this brief rests on:

- `roughnotes` is a live target holding the vendored `tests/policy.test.ts`. Its package name is
  `roughnotes`, it has no `guides/roughnotes.md`, and its `guides/README.md` links only
  `guide.md` and `scaffold.md`. So `expect(index).toContain(own)` reddens there, and
  `expect(index.length).toBeGreaterThan(0)` rests on an index form no rule requires.
- This checkout's own `guides/README.md:19` writes `](scaffold.md#blueprint)`, which the current
  pattern rejects. A target whose only link to a guide carries a fragment would report that guide
  unaccounted.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`; commit nothing; do not touch `host.json`.

## Scope

**Owned.** `tests/policy.test.ts`, `tests/setupPolicy.ts`. **Off-limits.** Everything else.

## Execution

1. **Strike the two non-portable assertions (claim 1).** Remove `expect(index).toContain(own)` and
   the `index.length` non-emptiness assertion from the accounting case in `tests/policy.test.ts`.
   Keep every other assertion there, including the distinctness check and the one proving each
   returned name resolves to an existing `guides/<name>.md`. Non-emptiness, order, and dedupe are
   the crafted-root case's job and stay there.
2. **Admit the remaining ordinary link forms (finding 6).** Widen `POLICY_INDEX_LINK` to accept an
   optional `#fragment` after the `.md`, and a single-quoted or parenthesized title beside the
   double-quoted one. Keep it non-global, keep every currently rejected form rejected
   (`](nested/tokens.md)`, `](https://x/y.md)`, `](../README.md)`), and keep the quantifiers
   non-nested so the linear-walk property the review confirmed still holds. Add a case per newly
   admitted form asserting the capture is the bare name, and keep the existing form cases.
   Reject the unbalanced `](<tokens.md)` and `](tokens.md>)` forms the review found the widening
   admitted, or record in the report why leaving them admitted is right.
3. **Derive the index path (finding 7).** Declare `POLICY_INDEX_FILE` as
   `` `guides/${POLICY_GUIDE_MAP}.md` `` rather than a second literal, so the map name has one
   home.
4. **Name the span limit (finding 8).** Add to `readPolicyIndex`'s remarks, beside the fence
   limits, that an unpaired backtick earlier in the file re-pairs the spans after it, so a link
   following one can be blanked.
5. Format the owned files by path, then `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:policy`, `npm run test:setup`, `npm run test:config`,
   `npm run test:guides`; record each command's final lines (`test:config` may report the
   inventory stale at owned files; the Orchestrator rebuilds).
6. **Prove portability.** Run `npx vitest run --config vite.config.ts --no-cache --reporter=dot
   --project policy` from `C:/Users/mikes/WebstormProjects/roughnotes` after copying this
   checkout's `tests/policy.test.ts` and `tests/setupPolicy.ts` over that target's copies. Record
   the reading, then restore that target's two files from its own git checkout with
   `git -C C:/Users/mikes/WebstormProjects/roughnotes checkout -- tests/policy.test.ts
   tests/setupPolicy.ts` and confirm `git -C ... status --porcelain` shows those two paths clean.
   This is the one place this unit may write outside its checkout, it is a copy-and-restore of
   vendored files that `repair` overwrites anyway, and the restore is part of the step. If that
   target's tree is dirty on entry at either path, do not copy: report that instead.

## Output

Write `u3-policy-report-5.md` and return its content: the diff summary; each new case's
reading; the Roughnotes run's final lines and the restore confirmation; each gate's exit code and
final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file; a dirty tree
at either Roughnotes path. Decide and carry on from: the regex's exact shape within the accepted
and rejected sets this brief fixes, case wording, and ordering.

## Acceptance criteria

1. The accounting case names no guide, package, or census particular to any checkout.
2. `POLICY_INDEX_LINK` admits the bare, `./`, titled (all three quote forms), angle-bracketed, and
   fragment-carrying targets, each with a case, and rejects the nested, absolute, and parent forms.
3. `POLICY_INDEX_FILE` derives from `POLICY_GUIDE_MAP`.
4. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0 here,
   and the policy project exits 0 in Roughnotes with these two files in place.
5. Roughnotes' two vendored files are restored and clean at return.
6. `git status --porcelain` here lists only `host.json`, `tests/setupPolicy.ts`,
   `tests/policy.test.ts`, `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the Roughnotes run's
output and the restore confirmation.

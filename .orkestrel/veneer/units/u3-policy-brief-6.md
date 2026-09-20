# Unit U3-policy — successor brief 6: the Node floor

## What changed and why

This brief supersedes `tmp/units/u3-policy-brief-5.md` for the remainder of the unit; the earlier
briefs stand except where this one says otherwise. The fifth objective review
(`units/u3-policy-review-report-5.md`) confirmed portability, the accepted and rejected link sets,
the derivation, the remarks, and every earlier claim, and refuted one: `POLICY_INDEX_LINK` names
the capture group `name` in both branches of its alternation, and a duplicate named group is a
`SyntaxError` on the Node floor this package declares (`package.json` `engines.node` is
`>=22.18.0`; the construct arrived in Node 23). This host runs Node 24, so no local run could
catch it; the whole `policy` project would fail to collect in a target on Node 22.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`; commit nothing; do not touch `host.json`.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`. **Off-limits.** Everything else.

## Execution

1. **Distinct group names (claim 3, finding 6).** Rename the two captures `angled` and `bare`, and
   read `match.groups?.angled ?? match.groups?.bare` in `readPolicyIndex`. Use no syntax newer
   than ES2018 named groups anywhere in the pattern or the reader. Update the form cases in
   `tests/policy.test.ts` to read the group each form binds, and the remark to describe the two
   names.
2. **Composition and the bare class (findings 9, 10).** Let the angle branch admit an optional
   `#fragment` before its closing `>` so `](<sample.md#blueprint>)` is accepted (CommonMark
   allows it), and let it admit a space inside the brackets; exclude a space from the bare
   branch's class, since CommonMark permits a space in a destination only inside `<>`. Add a case
   for each: the angled fragment accepted, `](my guide.md)` rejected, `](<my guide.md>)` accepted
   capturing `my guide`. Rewrite the remark so it states the composition exactly as the pattern
   admits it.
3. **Strike two live-root assertions (findings 7, 8).** Delete `expect(new Set(index).size).toBe(index.length)`
   and the `index.every((name) => isPolicyFile(...))` assertion from the accounting case; the
   crafted-root case carries distinctness and order, and no rule requires every sibling link in a
   target's index to resolve.
4. Format the owned files by path, then `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:policy`, `npm run test:setup`, `npm run test:config`,
   `npm run test:guides`; record each command's final lines (`test:config` may report the
   inventory stale at owned files; the Orchestrator rebuilds).
5. **Floor proof, as far as this host allows.** Record in the report that the host runs Node 24
   and that the floor cannot be proved here; then prove the construct by review: paste the final
   pattern and state which ECMAScript edition each construct in it requires (named groups ES2018;
   lookbehind, if any, ES2018; nothing later).

## Output

Write `tmp/units/u3-policy-report-6.md` and return its content: the diff summary; each new case's
reading; the pattern with its edition table; each gate's exit code and final lines; deviations in
the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file. Decide and
carry on from: wording, case order, the exact class shapes within the sets this brief fixes.

## Acceptance criteria

1. The pattern names no capture group twice and uses no construct newer than ES2018.
2. The angled fragment, the spaced angled target, and the rejected spaced bare target each have a
   case.
3. The two struck assertions are gone and every other assertion stands.
4. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0.
5. `git status --porcelain` lists only `host.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.

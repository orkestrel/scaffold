# Unit S4 audit — the claims under test

The subject is the uncommitted change in the `scaffold` checkout at
`C:\Users\mikes\WebstormProjects\scaffold`. Four units built it. **Audit S4's delta only.** Rounds
one through three audited everything before it, and
`.orkestrel/scaffold/s1-audit-verdict.md` and `s3-audit-verdict.md` record what was settled and what
was deliberately not carried. Do not reopen either.

S4 changed: the plugin predicate in the emitted configuration, the hazard census comment, two new
regression cases, and the retained instruments under `tmp/units/`.

Evidence:

- `tmp/audit/s4-delta.txt` — the difference between the diff before S4 and the diff after it. This
  is the smallest view of what S4 changed.
- `tmp/audit/s4-diff.patch` — the complete diff, all four units.
- `.orkestrel/scaffold/s4-brief.md` — what S4 was asked to do.
- `.orkestrel/scaffold/s4-report.md` — S4's own account. A claim, never evidence.
- `.orkestrel/scaffold/s3-audit-verdict.md` — the findings S4 exists to close, and the two rulings
  it must not reopen.
- `.orkestrel/scaffold/s3-instruments/` — every retained instrument, including S4's.

## The claims

Rule on each: `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence that decides it.

1. The predicate's runtime check now matches the type it narrows to: a value whose `name` is not a
   string does not satisfy `plugin is { name: string }`.
2. The promise exclusion changed from `instanceof Promise` to a structural callable-`then` test, and
   that exclusion is correct for every `PluginOption` the installed Vite declaration admits — both
   for what it must exclude and for what it must not exclude. Name anything a real Vite plugin could
   carry that this test would wrongly reject.
3. `isNamedPlugin` is still unexported and still targets `{ name: string }`, as the round-three
   verdict ruled.
4. The two new regression cases fail against the previous predicate and pass against the current
   one, and they assert identity rather than equality.
5. The hazard census now describes each case's mechanism truthfully, including which cases use a
   factory and which build their base from the vendored helpers.
6. Each red runner asserts the named case failed and the expected population ran, so a startup,
   collection, or termination failure cannot be certified as the red.
7. Every mutation in the retained instruments sits inside the block whose `finally` restores it, and
   each script's header states the limit that remains.
8. The relocation control asserts equal capture lengths before asserting different bytes.
9. This repository's `vite.config.ts` was regenerated and stays byte-identical to the generator's
   emission; no expectation was weakened to achieve it.
10. No vendored file changed, and nothing outside S4's owned list moved.

## Where to look hardest

- **The callable-`then` exclusion.** A Vite plugin is an object; state whether any real plugin, or
  any object a plugin factory returns, can carry a callable `then`. State what happens to a genuine
  `Promise<Plugin>` under the new test, and to a plugin wrapped by a library that adds a `then`.
- **The new regression cases reach the predicate through an untyped door.** State whether the values
  they drive are constructible from typed code, and whether the cases prove a rule or only a
  mechanism.
- **The runner's JSON report reading.** It now parses Vitest's JSON output to find the named case.
  State what it does when the reporter's shape changes, when two cases share a title substring, and
  when the run produces no report file at all.
- **The predicate change moves emitted bytes.** State whether every pinned expectation moved with
  it, and whether any pin was edited rather than regenerated.

## Out of scope

The release. The two round-three rulings — that `isNamedPlugin` stays unexported, and that the
unexported predicate is not a hidden-helper violation — are settled and are not reopened. The three
recommendations recorded as not carried stay not carried.

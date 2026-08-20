# Amendment to fix1-brief.md — 2026-08-20

The deviation report in the `tmp/fix1-report.md` file is accepted: the brief's owned test scope was
wrong. The consumer sweep it returned names factory consumers in root cross-cutting tests the brief
did not grant.

What changes:

- **Scope, owned files** — add `tests/guides.test.ts` and `tests/distribution.test.ts`. The whole
  owned list is: `src/`, `tests/src/`, `tests/guides.test.ts`, `tests/distribution.test.ts`,
  `guides/scaffold.md`, `README.md`, and `bin/` if call sites live there.
- Everything else in the `tmp/fix1-brief.md` file stands unchanged: both findings, the proof order,
  the criteria, the deviation contract, and the output shape.

One clarification for the granted files: `tests/distribution.test.ts` carries factory calls inside
string fixtures that a generated consumer compiles and runs. Update those strings to direct
construction (`new Compiler()`, `new Materializer(...)` with the same options) so the generated
consumer still compiles against the post-change barrel; the fixture's assertions about drift
readings stay as they are.

# J-FIXTURES audit — claims

Subject: J-FIXTURES in `/home/user/veneer-jf` (branch `unit/jf`, uncommitted over Veneer `6882751`), briefed by
`j-fixtures-brief.md`, written by `opus` on Opus 5.5, and reported in `j-fixtures-report.md`. The diff is `jf.diff`, the
status `jf-status.txt`, and the logs `jf-instruments/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`.
The finding it carries is the fixture-lookups row of `/home/user/scaffold/.orkestrel/veneer/engine/plan.md` § Carried
findings (read it from `git -C /home/user/scaffold show 4954cece:.orkestrel/veneer/engine/plan.md` if the row has moved).
A unit report's prose is not a claim subject. Each claim is falsifiable; rule every one.

1. **Scope.** The diff over `6882751` changes only `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, and in
   `tests/setupBrowser.ts` only the lookups, the helper, the `MatchMessages` interface, and their TSDoc.
2. **Messages.** For each of `readButton`, `readSpecimen`, and `readSubject`, every error message the lookup can throw is
   byte-identical to the message at `6882751` for the same input, including the count prefix of the duplicate refusal.
3. **Policy.** Each lookup keeps its selection and its check order (several matches, then none, then a non-HTML match),
   and `readOracleButton` still composes `readButton`.
4. **Helper cases.** Each `requireMatch` case asserts the exact message, and the four cases distinguish a helper that
   returns the first match from one that refuses duplicates, and one that returns a non-HTML element from one that
   refuses it.
5. **Shape.** `requireMatch` and `MatchMessages` follow the naming rules (a `{verb}{Noun}` module helper, single-word
   keys), the helper adds a boundary rather than wrapping `requireValue` one-to-one, and the interface sits where the
   file's other exported interfaces sit.
6. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression, or nested function declaration; the helper and
   the interface carry TSDoc with an `@example` where the file's other exported helpers carry one; the export-list case
   lists `requireMatch`.

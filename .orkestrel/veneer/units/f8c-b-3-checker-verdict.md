# F8c-B MOVE, round 3 — `checker` on Sonnet

Subject: the round-3 prose fix (`f8c-b-brief-3.md`, `f8c-b-report-3.md`). Read-only.

1. `guides/veneer.md:354-355`: "so the `@orkestrel/veneer/styles` specifier resolves through the manifest's `exports` entry" — CONFIRMED.
2. `guides/veneer.md:404`: "Before any proof runs, the `tests/setupService.ts` module verifies the compiler…" — CONFIRMED.
3. `tests/setupService.ts:68-78`, the `TAILWIND_PATHS` remarks: every key token followed by "key", `tests/fixtures/tailwind/` by "directory" — CONFIRMED.
4. Meaning unchanged — CONFIRMED against the report's diff and the live text.
5. Scope (only the three hunks) — UNRESOLVED on the writer's own diff; the live context reads unedited.

Findings outside the claims, the same class in the swept population (BROKEN): `tests/setupService.ts:48` ("`root` is …"), `:49` ("`compiler` loads …"), `:186` ("`resolveBrowser` verifies …"), `:313-314` ("`open` registers …", "`destroy` closes …"); `guides/veneer.md:349-350` ("`tests/fixtures/tailwind/consumer.css` is …"), `:360` ("`tests/fixtures/tailwind/unexcluded.css` is …"), `:364` ("the line `src/styles/_tokens.scss` declares"), `:374` ("`tests/setup.css` is …"). Every other hit resolves to a token already followed by a noun.

VERDICT: FAIL 9; outside the claims: the eight sites above


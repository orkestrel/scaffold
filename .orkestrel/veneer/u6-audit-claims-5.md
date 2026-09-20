# U6 audit round 5 — numbered claims

Subject: the cumulative U6 diff in the Test checkout `C:/Users/mikes/WebstormProjects/test`, from
`f49bc7f` (0.0.18) to the working tree, after the hygiene run a native `builder` made from
`units/u6-brief-6.md` (report `units/u6-report-6.md`) on round 4's five findings
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-4.md`). Rule on
every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or
exact text). Read the actual diff (`units/u6-diff.patch.txt`) and the live checkout, never the
report alone. Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `.claude/rules/` there.

1. **Missed-press release (round 4 finding 11).** On the `:active` miss path, `releasePointer()`
   runs inside its own `try`/`catch`; the refusal `Interactive target "<name>" did not enter the
   pressed state` reaches the caller on both branches, with a release failure attached as
   `cause`; the successful-release branch still throws the refusal.
2. **Marker retry sentence (finding 12).** `guides/test.md` § Bounds states that a release whose
   wait exhausts keeps `MEDIA_STAGE` on the tester root so the next `releaseMedia` retries from
   the same recorded readings, beside the pointer retry sentence.
3. **`@throws` (finding 13).** `releasePointer`'s TSDoc carries a `@throws` in the file's form
   naming the release rejection and the park failure that carries it; every `Summary` cell still
   equals its description paragraph (the `@throws` is outside the compared paragraph).
4. **The rejected-press case (finding 14).** The case named for a direct protocol rejection and a
   completed hold carries no assertion that runs before any hold and cannot fail; the
   `pointerdown` recorder and the marker reading remain and discriminate; the name promises only
   what the case drives.
5. **Sentinels (finding 15).** No string or comment in `tests/src/browser/helpers.test.ts` carries
   the identifier `U6` or any campaign unit or control identifier; the sentinel messages name
   what they are.
6. **Nothing else moved.** The diff outside the five items is byte-identical to the round-4 tree:
   one `cdp()` site; the recorded-readings settle; the option locals; the guarded restoration;
   the marker-after-press ordering; the six owned files and nothing else; no `any`, `as`, `!`,
   `@ts-*`, `eslint-disable`, nested function, hidden helper, or `console` statement.
7. **Gates.** Every gate the sixth report lists reproduces green on managed Chromium and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` is green on Edge twice (the verifier's
   reading).

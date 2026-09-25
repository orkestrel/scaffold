LANE: jf-audit-reviewer

Lane held: subjective (Opus 5.5). I ran nothing and edited nothing. I rule every mutation below by reading the code. The Orchestrator supplied the diff and the status output, at `/home/user/scaffold/.orkestrel/veneer/units/jf.diff` and `/home/user/scaffold/.orkestrel/veneer/units/jf-status.txt`. I also read the worktree files in `/home/user/veneer-jf`.

1. **Scope: CONFIRMED.**
   - `jf-status.txt:1-2` lists only ` M tests/setupBrowser.test.ts` and ` M tests/setupBrowser.ts`, with no untracked rows.
   - The `tests/setupBrowser.ts` hunks in `jf.diff:68-209` touch only these parts:
     - the `MatchMessages` interface and the `requireMatch` helper (`/home/user/veneer-jf/tests/setupBrowser.ts:429-474`);
     - the `readButton` TSDoc paragraph and its body (`:495-514`);
     - the `readSpecimen` TSDoc paragraph and its body (`:532-549`);
     - the `readSubject` body (`:618-622`).
   - The worktree text matches the diff hunks.

2. **Messages: CONFIRMED.**
   - `requireMatch` builds the duplicate message as `` `${String(matched.length)} ${messages.duplicate}` `` (`setupBrowser.ts:470`). That is exactly the old count, one space, then the old suffix:
     - `readButton`: `jf.diff:139-141` against `setupBrowser.ts:511`
     - `readSpecimen`: `jf.diff:176` against `:546`
     - `readSubject`: `jf.diff:196` against `:620`
   - Every `absent` string and every `foreign` string is character-for-character the old literal (`jf.diff:145-149`, `:178-180`, `:198-200` against `:510-512`, `:545-547`, `:619-621`).
   - `requireValue` gets the same argument as before, so the absent refusal is unchanged.

3. **Policy: CONFIRMED.**
   - Each filter expression is outside the changed lines (`setupBrowser.ts:506-508`, `:541-543`, `:606-617`).
   - The helper keeps the old order: more than one match, then `requireValue` for none, then the `instanceof HTMLElement` check (`:470-472`).
   - `readOracleButton` still calls `readButton(root, name)` (`setupBrowser.ts:1389`).

4. **Helper cases: CONFIRMED.**
   - **Mutation "return the first match":** delete `setupBrowser.ts:470`. Then `requireMatch([build('div'), build('span')], messages)` returns the div, and the `toThrow` assertion at `jf.diff:44-46` fails. The assertions distinguish it.
   - **Mutation "hard-coded or wrong count":** the second assertion (3 candidates → `'3 samples…'`, `jf.diff:47-49`) breaks a hard-coded `2`. The exact string breaks a missing space.
   - **Mutation "return a non-HTML element":** drop the check at `:472`. Then the `svg` candidate is returned (`jf.diff:54-56`) and `toThrow` fails. The assertions distinguish it.
   - **Mutation "swap which message a refusal carries":** each case passes `new Error(<exact literal>)` (`jf.diff:38-40`, `:44-49`, `:55-57`). Vitest compares that error's message for equality, and the three messages are distinct, so any swap fails.
   - The expected strings are written as literals, not read from the `messages` fixture, so the expectation does not depend on the object under test.
   - The return case asserts identity with `toBe(sample)` (`jf.diff:34`). It has no message to assert because it throws nothing.
   - The fixture wording ("sample", "Placeholder") belongs to no real lookup, which shows the helper does not depend on any lookup's wording.

5. **Shape: CONFIRMED.**
   - **Helper name.** `requireMatch` is `{verb}{Noun}` (`.claude/rules/names.md:85`, `:178`). `require*` has no row in the prefix list at `names.md:91-105`. The installed `requireValue` from `@orkestrel/test` (`setupBrowser.ts:16`) gives it one meaning: return the value or throw. `requireMatch` keeps that meaning, so the term is used consistently.
   - **Keys.** `absent`, `duplicate`, and `foreign` are single nouns or adjectives. `foreign` matches the HTML specification's term "foreign elements" (SVG and MathML), which is the exact class the check refuses.
   - **Interface name.** `MatchMessages` reads like a plural against `names.md:167` ("Never pluralize type names"). The rules' own `{Entity}Options` form (`names.md:156`) and the `EmitterHooks` type (`.claude/rules/patterns.md:27`, `:32`) show the ban applies to the entity, not to a plural name for a group of slots. Veneer uses the same pattern in `ButtonHooks` and `DropdownDefaults` (`/home/user/veneer-jf/src/browser/types.ts:48`, `:982`).
   - **Not a one-to-one wrapper.** The helper adds a counted duplicate refusal and turns `Element` into `HTMLElement` through a runtime check (`:470`, `:472`). That is a narrower contract than `requireValue`, which it composes (AGENTS.md § No superfluous wrappers).
   - **Placement.** The file puts each exported interface just before its consumer: `MenuContainment` at `:312` before `readMenuContainment` at `:340`, and `SubjectReading` at `:635` before `describeSubject` at `:667`. `MatchMessages` at `:433` before `requireMatch` at `:469` follows that pattern. `.claude/rules/tests.md:185` puts fixture types in setup files.

6. **Law: CONFIRMED.**
   - The added lines contain no `any`, no `as`, no non-null `!` (the `!` at `:472` negates a value), and no suppression.
   - The only callbacks are anonymous test callbacks passed directly as arguments, which the no-nested-functions law allows.
   - Both declarations carry TSDoc, including one per interface member (`:429-440`). The helper has an `@example` (`:460-467`), like `readButton`, `readSpecimen`, and `readElement`. Other exported interfaces carry none, so `MatchMessages` needs none.
   - The export-list case lists `'requireMatch'` in alphabetical order (`jf.diff:14-18`). `MatchMessages` is type-only, so the key list correctly leaves it out.

**Findings fitting no claim:** none.

**Attacked and held:**
- **Helper check order is not pinned.** Every duplicate case uses HTML candidates (`jf.diff:44-49`). A mutation that runs the `instanceof` check before the count check (input `[svg, div]`) passes every case. Claim 3 still holds because the code keeps the order. This is an unproven seam, not a broken claim; a successor round could state it as a proof claim.
- **`duplicate` holds a fragment, not a whole message.** It carries the text after the count, and its TSDoc says so (`:436`). A callback taking the count would add a function type for one caller pattern. The documented fragment is the plainer option, so this stays as is.
- **The `@example` builds a selector from the name** (`:462`). All three lookups instead compare the attribute with `getAttribute(...) === name`, which works for any name. The example uses a fixed literal and is correct as written, but it shows the approach the lookups avoid.
- **The duplicate-refusal cross-reference holds.** `readSpecimen` says the refusal is `requireMatch`'s "for the reason stated there" (`:532-533`). `requireMatch` does state it: "a name that addresses two elements addresses neither" (`:452`). The document-order reasoning stays in `readButton` (`:495-498`), which does not contradict it.
- **Adjacent code outside scope.** `readElement` (`:570-576`) and `mountShowcase` (`:404-408`) repeat the HTML-element check. `readElement` takes the first match rather than exactly one, so it is a different lookup shape and outside the carried row (`/home/user/scaffold/.orkestrel/veneer/engine/plan.md:47`).
- **Name collisions (partial check).** A search of `/home/user/veneer-jf/node_modules/@orkestrel` for `requireMatch` and `MatchMessages` found nothing. That covers only the installed packages, not the fleet's published guides, which the `surface` rule reads.

VERDICT: PASS

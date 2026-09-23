# B-FORMS-CONTROL, round 6 (the round-5 prose findings) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bfo5` on 2026-09-23. The verdict text is the lane's handback verbatim.

B-FORMS-CONTROL round 6: reviewer verdict, subjective lane (Opus 5.5, native, clean context)

This lane read the evidence and ran nothing, so none of the following is backed by an executed run.

## Numbered verdicts

1. **CONFIRMED.** The attack compared every hunk of `/home/user/scaffold/.orkestrel/veneer/units/bfo-6.diff` against `bfo-5.diff` and against § Edits of `b-forms-control-brief-6.md`. Every hunk matched the prescribed text and its rewrap, and the attack failed.
   - **Edit 1** is at `guides/veneer.md:1304-1312`. The text after "wide, and the group squares" is the same as the text at `f82de43`. Only the line breaks moved.
   - **Edit 2** is at `guides/veneer.md:1320-1323`. The prescribed sentence replaces the old one word for word, and the sentence before it is unchanged.
   - **Edits 3, 4, and 5** are at `tests/app/browser/integration.test.ts:1424-1425`, `1011-1012`, and `1433-1434`. Each matches its brief text. The code lines around them are the same as in round 5.
   - **Edit 6** is at `tests/src/styles/components/input-group.test.ts:62-64`, and it matches.
   - **Status:** `bfo-6-status.txt` lists the three round-5 files and nothing else.

2. **BROKEN.** The two edited sentences hold. The rest of § Input group classes still says the control and select rules ship no radius, and that the floating rules do not ship.
   - **The edited sentences hold.** At `guides/veneer.md:1304-1305` the seam sentence reaches its conclusion once. At `guides/veneer.md:1321-1323` the ship sentence is true against the cascade:
     - `_mixins.scss:59-62` (`control-border`) sets `border: var(--bs-border-width) solid …`.
     - `_form-control.scss:34` and `_form-select.scss:42` include that mixin.
     - The rings are at `_form-control.scss:55-61` and `_form-select.scss:54-58`.
   - **Failing sentence, radius.** `guides/veneer.md:1351-1353` says: "The text control and select classes carry no radius of their own in this cascade, so the proof supplies one from a consumer rule beneath the components layer; … a kept corner reads that radius." This is false:
     - `control-border` also sets `border-radius: var(--bs-border-radius)` (`_mixins.scss:61`), and both classes include it.
     - `_tokens.scss:4` orders the layers `… elements, components …`. So the `INPUT_GROUP_ROUNDING` rule, which sets `@layer elements { … border-radius: 7px }` (`tests/setupStyles.ts:4397-4398`), loses to the component radius.
     - A kept corner therefore reads the shipped `--bs-border-radius`, not "that radius". This is the same claim the round removed from the paragraph at 1320, in a different place.
   - **Failing sentence, floating wrapper.** `guides/veneer.md:1353-1355` says "The floating wrapper is a plain box here". This is also false, because `_form-floating.scss:18-50` ships the wrapper and the floated label. The true reason is that the proof's markup carries no label (`tests/setupStyles.ts:4334`).
   - **What right looks like.** Rewrite 1351-1355 to state what ships and what the proof actually reads, for example: "The text control and select carry the `--bs-border-radius` corner their own rules ship, so a corner the group squares reads zero and a kept corner reads the radius the same element carries outside a group. The proof's floating wrapper holds no label, so its rules are read on the wrapper and on the control inside it."
   - **Carrier.** A successor round that owns `guides/veneer.md` § Input group classes, paired with STALE-ROUNDING-FIXTURE (following).

3. **CONFIRMED.** The attacks on the comments all failed:
   - **`below`:** a sweep with the pattern `below`, case-insensitive, over the `+` comment lines of `bfo-6.diff` found no match. The guide's "positioned absolutely below the group" (`guides/veneer.md:1308`) is outside the claim, which covers comments, and is a spatial sense the substitution table allows.
   - **Pointer targets:** "the range slider case" resolves. The case titled "reaches the range slider through the keyboard…" (`integration.test.ts:902`) states the reason in full at `913-916`. The plain-select case (`1011-1012`) and the input-group case (`1433-1434`) point to it and do not restate it.
   - **`width: 1%` wording:** the layout comment at `input-group.test.ts:62-64` names `width: 1%` scoped to the group's children. That matches `_input-group.scss:20-27`, which is `.input-group > .form-control, > .form-select, > .form-floating { … width: 1%; }`.
   - **`writing.md`:** each code token is followed by a noun or stands as a CSS value noun, per the family ruling. The comments contain no ordinal and no count.

4. **UNRESOLVED.** Reading the diff, the attack failed for this lane's portion of the claim:
   - The added lines hold no `any`, no `as`, no `!`, and no suppression. `querySelector<HTMLElement>` is a generic argument, not an assertion.
   - They add no nested function.
   - The status lists only owned files.

   The `npm run check` exit code rests only on the writer's report, and the claims file assigns that run to the objective lane. The objective lane's executed `npm run check` settles it.

## Findings outside the claims

- **STALE-ROUNDING-FIXTURE.** This is the same falsehood as claim 2, found in the test sources.
  - The TSDoc at `tests/setupStyles.ts:4389-4396` says "The text control and select classes carry no radius of their own in this cascade". That is false by `_mixins.scss:61` and the layer order at `_tokens.scss:4`.
  - The comment at `tests/src/styles/components/input-group.test.ts:247-249` says "the control reads the fixture's until the control family lands". The control family has landed, so the control reads its own rule's radius.
  - Because components outrank elements, the fixture loaded at `input-group.test.ts:171`, `204`, and `246` has no effect on `.form-control` and `.form-select`. The corner proofs still pass, because they compare against the same element outside a group.
  - What right looks like: rewrite the TSDoc and the comment to say both classes ship `--bs-border-radius`. Alternatively, retire the fixture and its `scene.load` calls. Whether to retire it is referred to the Orchestrator (see Referrals).
  - Why it matters: the guide at 1351 restates this TSDoc, so the two drift together.

- **STALE-OUTER-COLUMN.** At `tests/app/browser/integration.test.ts:1421-1424` the comment says "the button's leading border paints over the outer column of that border until the control is lifted past it".
  - "Outer column" assumes the control's border is wider than the pull-back. That was the browser-border model, which edit 2 removed from the guide ("the pull-back covers only its outer column").
  - The assertion right after the comment (`1428-1432`) sets the offset to the button's full border width. The control's border is also one `--bs-border-width` (`control-border`). So the button covers the whole trailing border, which is what the guide says at `guides/veneer.md:1314`: "its border paints over the one they share".
  - What right looks like: "…so the button's leading border paints over that border until the control is lifted past it."

## Attacked and held

- **Edit 2 names `.form-floating` as a reason for "its own … border and focus ring".** The floating partial writes neither (`_form-floating.scss:14-15`). This holds: a grouped floating child's control carries both through `.form-control`, and the sentence's subject is "a grouped control".
- **The range slider case starts its walk from `Form control readonly`, while the pointing cases start from other specimens.** The reason given, a walk from the document start crossing the date control, still applies to each case. Round 5 already settled the walk paths themselves.

## Referrals

- **Orchestrator, permission floor.** The writer's report says it ran `corepack use npm@11`. By corepack's documented behaviour that command sets the `packageManager` field in `package.json` and runs the package manager's install. The permission floor bars installs. The status shows no `package.json` change. Confirm whether `node_modules` or the lockfile marker moved in `/home/user/veneer-bfo5`. The writer also ran the gates through a scratchpad npm shim, so its exit codes come from a changed toolchain path.
- **Orchestrator.** Rule whether `INPUT_GROUP_ROUNDING` is retired or rewritten. Retiring it changes test code, so it needs a writer round, not a prose edit.

VERDICT: FAIL 2, 4; outside the claims: STALE-ROUNDING-FIXTURE, STALE-OUTER-COLUMN

# B-FORMS-CONTROL, round 5 (the landing's consequences) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bfo5` on 2026-09-23. The verdict text is the lane's handback verbatim.

B-FORMS-CONTROL round 5: subjective-lane verdict

Lane held: subjective (the family's voice across its journey cases, comment and guide voice, and the shape a reader of the proofs meets), on Opus 5.5, as a native subagent with a clean context. Where a claim's objective edge came up, I ruled the part the diff and source show and referred the rest.

**Verdict:** one claim is BROKEN and one is UNRESOLVED. Claim 4 fails because the rewritten guide sentence says "paints one line" twice. Claim 5 is open because only the writer's report shows the `npm run check` exit.

## Per-claim verdicts

**1. The delta is the brief: CONFIRMED.**
- I compared `/home/user/scaffold/.orkestrel/veneer/units/bfo-5.diff` hunk by hunk with the Edits section of `b-forms-control-brief-5.md`.
  - Edit 1 matches at `bfo-5.diff:27-37`.
  - Edit 2 matches at `bfo-5.diff:44-47` and `55-61`.
  - Edit 3 matches at `bfo-5.diff:73-78`.
  - Edit 4 matches at `bfo-5.diff:9-16`.
- No other line changed.
- `bfo-5-status.txt:1-3` lists `guides/veneer.md`, `tests/app/browser/integration.test.ts`, and `tests/src/styles/components/input-group.test.ts`, and nothing else.
- Attack that failed: I looked for a hunk outside the four named sites or a path outside the owned set. Neither exists.

**2. The walks still prove their titles: CONFIRMED (the walk path). The rendered ring is NOT-EVIDENCED.**
- **Plain select.** The walk starts at the `Range` control (`integration.test.ts:1015-1019`).
  - The specimen table shows `Range disabled` next (`app/browser/constants.ts:1192-1196`). It is disabled, so it is out of the tab order.
  - The Form select region then opens with `Form select base`, labelled "Warehouse" (`constants.ts:1219`). That region follows FormRange in the showcase order the brief quotes.
  - So no tabbable control sits between the start and the target.
- **Input group.** The walk starts at the `Input group addons` control, whose markup has one `.form-control` between two non-focusable `span` addons (`constants.ts:1528-1530`).
  - `Input group button` comes next, and its first tabbable element is the target, "Dispatch address" (`constants.ts:1533-1535`).
  - `:focus-visible` is asserted on the target at `integration.test.ts:1022` and `:1444`.
- **The mutation.** Start from an element after the target, for example the `Form select small` control.
  - The forward walk then never meets "Warehouse", so `traverseAccessible` rejects with the "not reachable through forward Tab traversal" error the brief's Context quotes. The case goes red.
  - The red comes from the rejected `await`, before `expect(reached).toBe(control)` runs. The `expect` itself guards a different mutation: reaching a same-named element. The specimen tables rule that out, because each control carries a unique name (`constants.ts:1181-1182` and `1212-1214`).
  - So the case as a whole tells this mutation apart from the passing case, but not through the assertion the claim names. I refer that distinction to the objective lane.
- **The rendered ring.** I opened `form-select-base-focus--light-1280.png`, `form-select-base-focus--dark-390.png`, `input-group-button-focus--light-1280.png`, and `input-group-button-focus--dark-390.png` under `/home/user/veneer-bfo5/tmp/capture/states/`.
  - Each is a full-page frame of 1280x15961 or 390x17243. The Read tool shows them downscaled to 160x2000 or 45x2000, where a ring a few pixels wide cannot be resolved.
  - Whether the ring paints on the target is NOT-EVIDENCED from this portfolio.
  - The frames' existence corroborates only that `FRAMES.page` ran. It runs after `expect(reached).toBe(control)` at `:1021` and after the input-group case's `:focus-visible` assertion at `:1444`.

**3. The layout proof binds: CONFIRMED.**
- `_form-control.scss:28` writes `width: 100%` on `.form-control`. The bare control sits in a `width:600px` host (`input-group.test.ts:31`).
- Mutation named: drop that declaration. The bare `display: block` input falls back to its intrinsic width, which is below 600, so `expect(bare.getBoundingClientRect().width).toBe(600)` at `input-group.test.ts:65` fails. The assertion tells the mutation apart.
- It also catches a second mutation: unscoping the group's `width: 1%` from `.input-group > .form-control` (`_input-group.scss:20-25`) would shrink the bare control to about 6px.
- The grouped control's readings are untouched by the diff and still hold (`input-group.test.ts:41-61`).
  - The grouped control keeps `flex: 1 1 auto; width: 1%`.
  - The row still spans the group's edges.
  - The control is still wider than the addon and the button together.
- The writer reports 19 passing tests for this file. I did not run it.

**4. The prose: BROKEN (the guide sentence). The two comments conform.**
- **Where:** `guides/veneer.md:1304-1307`, rendered at `bfo-5.diff:13-15`.
- **What is wrong:** one sentence now concludes "paints one line" twice.
  - It opens "…so two neighbours paint one line, where each neighbour's border is one `--bs-border-width` wide". The control is one of those neighbours.
  - It then adds "a control's own border is the one the `.form-control` rule ships, so the seam paints one line".
  - The added clause is left over from the exception it replaced, where a browser-drawn border painted two columns. With that exception gone, the clause restates the opening conclusion.
  - It also reads as a change note ("the one the `.form-control` rule ships", set against a state the guide no longer describes) rather than as present-tense guide prose.
  - The "so" does not follow unless the reader already knows the control's width: `control-border` at `src/styles/_mixins.scss:60` writes `var(--bs-border-width)`, which the opening clause already covers.
- **Why it matters:**
  - AGENTS.md § Writing says to give the reader what they need and nothing else.
  - `documentation.md` says to re-read the prose against what shipped.
  - A reader meets the same fact twice in one sentence and looks for a difference between the two that isn't there.
- **What right looks like:** replace the text from "wide; a control's own border is the one the `.form-control` rule ships, so the seam paints one line, and the group squares" through to "and the group squares" with this:

  > wide, the `.form-control` rule's border included, and the group squares

  The simpler alternative drops the clause entirely:

  > wide, and the group squares

  Then rewrap the paragraph. The rewrap also closes the short line at `veneer.md:1308` ("tooltip elements are the children left in place, so neither pulls back nor"). That line is a partial rewrap left from this edit, while the brief asked for the whole paragraph to be rewrapped.
- **Comments, conforming:**
  - At `integration.test.ts:1010-1014`, `:1426-1427`, and `:1435-1436`, and at `input-group.test.ts:62-63`, a noun follows every code token: the `Range` specimen, the `Form control date` specimen, the `driveTraversal` walk, the `Input group addons` specimen, and the `.form-control` rule.
  - The sweep covered the added lines of all three files in `bfo-5.diff`, read case-insensitively against the substitution table. It found no banned term, including `now`, `once`, `since`, `new`, and `just`, and no count.
  - The guide sentence also has no banned term and no count.
- Attack that failed on the comments: I looked for a possessive or inflected code token or a count of a growing set, and found none.

**5. Law and scope: UNRESOLVED.**
- The parts I could read from the diff hold (`bfo-5.diff:32-36` and `57-61`).
  - No `any`, no `as`, no `!`, and no suppression. The `querySelector<HTMLElement>` call uses a type argument, not an assertion.
  - No nested function.
  - The status shows the off-limits files untouched.
- The claim assigns the `npm run check` exit code to the objective lane. Its only evidence here is the writer's report (`b-forms-control-report-5.md:55`). I ran nothing, so I rule it UNRESOLVED and refer it to the objective lane.

## Findings outside the claims

None meets the BROKEN standard. These observations do not block, and the Orchestrator can route them:

- **The case family's voice is uneven.**
  - Three cases carry the preceding-focus reason. The range case states it in full (`integration.test.ts:913-916`). The plain-select case restates it almost word for word (`:1011-1014`). The input-group case points to "the plain-select case" (`:1435-1436`) rather than to the range case, which is where the pattern and its settled cause live.
  - Right looks like: state the reason in one case and point to that case by its title from the others.
- **The comment on the input-group layout reading points at the wrong rule** (`input-group.test.ts:62-63`).
  - It describes the reading as a `.form-control` fact. `form-control.test.ts:145` already pins that fact.
  - What this reading adds inside the input-group proof is that the group's `width: 1%` stays scoped to the group's children.
  - A comment naming that would state what this proof holds that no other proof does.

## Referrals

- **To the objective lane:**
  - Claim 2: the start-after-target mutation fails at the `traverseAccessible` rejection, not at `expect(reached).toBe(control)`. Rule whether the claim's named assertion, or the case as a whole, is what tells the mutation apart.
  - Claim 5: take the `npm run check` exit code.
- **To the Orchestrator:** the ring frames are full-page and too tall to rule at the resolution the Read tool shows. Supply crops at native resolution of the `Form select base` and `Input group button` specimens in `light-1280` and `dark-390`, or rule the rendered ring NOT-EVIDENCED for this round.
- **Dispatch note:** the brief's owned-file wording and the claims file's subject name the round-5 brief as `/home/user/veneer-bfo5/tmp/units/b-forms-control-brief-5.md`. I audited the retained copy at `/home/user/scaffold/.orkestrel/veneer/units/b-forms-control-brief-5.md`. I did not compare it with the tmp copy.

VERDICT: FAIL 4, 5; outside the claims: none

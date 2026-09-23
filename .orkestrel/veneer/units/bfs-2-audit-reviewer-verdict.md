# `reviewer` verdict — B-FORMS-CLOSE-SPECIMENS (`bfs`), round 2, subjective lane (Opus 5.5, agent a13aea51dfd85d069)

Retained verbatim from the lane's returned message.

---

**Lane held:** subjective, by `reviewer` on Opus 5.5, as a native subagent with a clean context. I ran nothing. The unit was written on this lane's own engine.

## Numbered verdicts

1. **CONFIRMED.** `/home/user/scaffold/.orkestrel/veneer/units/bfs-2-status.txt` lists only the four round-1 files. Every hunk in `bfs-2.diff` sits in a round-1 region or in a region the brief grants.
   - None of `src/**`, `guides/**`, `tests/setupStyles.ts`, `tests/src/**`, or `tests/fixtures/**` appears in the status.
   - Attack that failed: the `CascadeKey` remarks (`/home/user/veneer-bfs/tests/setup.ts:292-295`) sit outside brief-2's "the `CASCADE_KEYS` doc block". Brief-2's criterion 2 names them explicitly, so they are in scope.

2. **CONFIRMED.** Each sentence the brief quotes is at `tests/setup.ts:350-352`, `:358-359`, `:375-376`, and `:389-391`. The spinner sentence has no tally and has "file" after the path token. The date is at `:366`.
   - The predicate at `:376-377` ("the key's top sits at or below the bottom edge of its host, the element that holds it") is the gate at `integration.test.ts:661-665`: `box.top >= host.getBoundingClientRect().bottom`, with `host` being `copy.parentElement`.
   - The block names sections ("the Layout, Table, and Links specimens") and a declined non-member (the grow spinners), but no registry row.
   - Attack that failed: I looked for a gap between the doc's population and the gate's, which was round 1's defect. Both now use one geometric predicate. The floating labels (−58 to −64.8 px in the report) fall outside it, as the doc implies.
   - Non-blocking notes:
     - `tests/setup.ts:381`: "registered for none of them" now follows a paragraph that ends "where the two meet", so the closest plural referent is the key and its content. Write "for none of these keys".
     - `:376-379` joins two ideas in each sentence. A split that keeps the mandated opening: "…the element that holds it. On the lifted copy, the journey reads a hanging key's bottom edge inside the frame's. A hanging key lies over that content, which is the release's own overlap. The journey reads which element paints on top where the two meet."

3. **UNRESOLVED.** The structure holds on reading.
   - The predicate and the host through `requireValue` are at `integration.test.ts:660-665`.
   - The `requireValue` on the button-led group stays at `:666-669`, and its message names `${key.selector}`.
   - The admitted set and the readings (+1.59, −16, −58 to −64.8 px) rest only on the writer's report. So does the `top: 0` mutation run.
   - Proof analysis for the exact-key assertion at `:716-721`, which pins the admitted set from both sides:
     - Narrowing mutation (`top: 0`): `hung` comes back empty and `toStrictEqual([...4 keys])` reddens. The assertion distinguishes it.
     - Widening mutation (`box.top >= host.getBoundingClientRect().top`): nearly every key is admitted, and the first one with no room throws at `:666`. The test distinguishes it.
   - What settles the claim: an independent `npm run test:journey` on the landed tree. The objective lane's sandbox runs no browser, so this run belongs to the Orchestrator's `verifier`.

4. **CONFIRMED.**
   - **The `hung` map.** `limit` is at `integration.test.ts:618`, `:676`, and `:725`, and no `floor` remains in the map. `hit` is `string | undefined` at `:620`. The value `hit === copy ? 'tooltip' : hit?.outerHTML.slice(0, 80)` at `:678` carries no sentinel.
     - Mutation: `readHit` returns `undefined`. Then `undefined !== 'tooltip'` keeps the entry, and `toStrictEqual([])` at `:722-727` reddens. The assertion distinguishes it.
   - **The focus comment** at `:1479-1482` carries the brief's text.
   - **The addressing rationale.** `:609-610` matches `tests/setup.ts:346-347` word for word.
   - **The crop rationale.** The `CascadeKey` remarks at `tests/setup.ts:293-295` match `integration.test.ts:637-639`.
   - **The Input group paragraph.** It is at `app/browser/constants.ts:1506` and keeps the parallel "the feedback a failing group reports under its row / the tooltip a passing or a failing group hangs over the row after it". A showcase reader gets a true picture: each specimen shows one tooltip over its own following row. `InputGroupSection.test.ts:29` reads the rendered `<p>` against `INPUT_GROUP_COPY.paragraph`, which is the pattern every section test shares.
   - **Position names.** `app/browser/constants.ts:1520-1528` and `InputGroupSection.test.ts:44-46` and `:87-107` name the groups `validated` and `room`, never by position. A search for `first|second` in the section test and the Input group region found none. "last child" is a DOM relation that is asserted, not a position name.
   - **Unknown 1 (unverified, reasoned from Vitest's pretty-format, which prints an undefined property as `"hit": undefined`).** An undefined `hit` is legible in the `toStrictEqual` diff. It is absent only from the `ARTIFACT` JSON line, because JSON has no `undefined`. That fits "Absence is `undefined`" and needs no change.

5. **BROKEN.** Two comments that round 2 added or changed break `writing.md`.
   - **(a) `tests/app/browser/integration.test.ts:713`.**
     - *Wrong:* "leaves `hit` undefined" uses a code token with no noun after it.
     - *Why it matters:* `writing.md` § Code tokens requires a noun after every code token.
     - *Right:* "A hit that reaches no element leaves the `hit` field undefined, which reddens like a hit on the button does."
   - **(b) `tests/app/browser/integration.test.ts:656-659`.**
     - *Wrong:* "…which is a point inside both boxes." The only box the sentence names is "the host's box", and the button's centre lies outside it. The pair that "both" means is the key's box and the button's box, and the sentence names neither. The sentence also carries four ideas: the hanging definition, where the readings are taken, the edge reading, and the hit point.
     - *Why it matters:* `AGENTS.md` § Writing requires one idea per sentence, first-read clarity, and `both` only where the sentence names the members. A reader resolving "both boxes" against the one box on the page gets a false geometry.
     - *Right:*
       ```ts
       // A key whose top sits at or below its host's bottom edge hangs outside the host's box.
       // The journey reads a hanging key on the copy the frame is shot on. It reads the key's
       // bottom edge against the frame's, and it hit-tests the centre of the button that leads
       // the group after the host, a point inside the key's box and the button's box.
       ```

6. **UNRESOLVED.** The code parts hold on reading.
   - The round-2 delta has no `any`, no `as`, no `!`, and no suppression.
   - The only functions are callbacks passed directly: the `.map` at `app/browser/constants.ts:1581`, and the filters.
   - I also checked the declarations myself. The pattern `export (declare )?(function|const) \w*(Rect|rect|Point|point|Inside|inside|Within|within|Contain|contain|Bounds|bounds|Overlap|overlap)\w*` over `/home/user/veneer-bfs/node_modules/@orkestrel/test/dist/src/{browser,core,server}` found no point-in-rectangle export. It returned only `checkBounds`, the `*AccessibleWithin` actions, `createPointerEvent`, `releasePointer`, `requireContained`, `resolveContained`, and `supportsDirectoryLinks`. `readHit` (`browser/index.d.ts:2115`) hit-tests one element's centre and does not compare it against another box, so the inline `shared` check duplicates nothing.
   - The `npm run check` exit code comes only from the writer's report. The objective lane's run settles it.

## Findings outside the claims

- **F1: the addressing rationale still has two wordings, and round 2 aligned toward the drifted one.**
  - *Wrong:* The mechanism that addresses a specimen by name is `readSpecimen`. Its remarks at `/home/user/veneer-bfs/tests/setupBrowser.ts:347-349` read "one class answers for many specimens: the Layout table alone renders several containers and several rows, and the Media table renders another container beside them".
  - At `d02bd46`, both copies matched that owner: "one class answers for several specimens: the Layout table alone renders several containers". The copies are the `CASCADE_KEYS` remarks and the journey comment.
  - Round 1 changed `tests/setup.ts:347` to "one table can render several containers". Round 2 copied that into `integration.test.ts:610`, following brief-2's criterion 2. So two homes now agree with each other and disagree with the mechanism's owner.
  - The drifted wording also turns a fact into a hypothetical ("can"). It puts a bare "table" in a registry whose `base` row's selector is `.table`, so a reader can take "one table can render several containers" to mean the `.table` component.
  - *Why it matters:* the round-1 referral asked for one wording across the rationale's homes, and this lane's focus names that goal. The home the round-1 referral missed is the one that owns the mechanism.
  - *Right:* restore both owned copies to the owner's wording. `tests/setup.ts:346-347` and `integration.test.ts:609-610` should read "…because one class answers for several specimens: the Layout table alone renders several containers." This needs no edit to the off-limits `tests/setupBrowser.ts`.

## Referrals

- **To the Orchestrator, claim 3:** run `npm run test:journey` through an independent `verifier` on the landed tree. That run is the only independent evidence for the admitted set.
- **To the objective lane, claim 6:** report the `npm run check` exit code.
- **To the Orchestrator, the crop rationale's third home:** `/home/user/veneer-bfs/guides/veneer.md:3923` still reads "carries one role link and none of the paint behind it". The two code homes now read "crop the specimen to that element, with none of the background the paint is read against". The round-1 verdict gives this to B-PASSIVE-CLOSE-B. Confirm that carrier's brief still names it.
- **To the Orchestrator, Unknown 2, for the family that registers a later hanging key:** the hanging predicate generalizes. A tooltip positioned against any ancestor at or above its parent still lands at or below the parent's bottom, so the parent is a conservative host. The room lookup does not generalize.
  - `integration.test.ts:667` queries `.input-group + .input-group > .btn:first-child` on the whole frame. So a `.form-floating` or `.position-relative` tooltip passes the gate and then throws "renders no button-led group". That failure is loud, which is correct.
  - That family must change the lookup to the host's next sibling (`host.nextElementSibling`) and the raised child it hit-tests, and reword the message.
  - The doc paragraph at `tests/setup.ts:375-379` already states the general rule and needs no change.

## Attacked and held

- **The `hit` field's label-plus-diagnostic string.** `'tooltip'` or an `outerHTML` slice can never collide, because the slice starts with `<`. The Orchestrator already ruled on this field's shape, so I did not reopen it.
- **`centre` at `integration.test.ts:658`.** This matches `readHit`'s own declaration vocabulary (`index.d.ts:2099`), so it stays.
- **"the room after it" at `InputGroupSection.test.ts:88-89`.** Whether "it" means the validated group or the tooltip, the reading is true, because the tooltip is that group's last child.
- **Non-blocking, `app/browser/constants.ts:1520`.** This is round-1 text: "The tooltip pair is one passing and one failing group". Each specimen now holds two groups, so "one passing and one failing specimen" reads truer. The next sentences disambiguate it.

VERDICT: FAIL 3, 5, 6; outside the claims: F1

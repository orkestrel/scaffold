# Audit claims — PREFLIGHT-HOST (`pl`), round 1

Subject: PREFLIGHT-HOST round 1 — `pl.diff` and `pl-status.txt` (the worktree `/home/user/veneer-pl` against
`fc3ddfe`), the shared patch `pl-shared.patch` (against `fc3ddfe`), the report `b-preflight-host-report.md`, and the
records under `pl-instruments/` — against the brief `b-preflight-host-brief.md`, the rule D45 in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`, and the engine session's Chromium 153 reading
`/home/user/scaffold/.orkestrel/veneer/engine/units/host-chromium-153-reading.md` (the preflight row). The unit was
written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence,
and before confirming a claim about a proof names the mutation that would make the proof fail and whether its
assertions distinguish that mutation from the passing case.

Orchestrator ruling the lanes take as given, and rule wrong where the evidence says so: the container carries
Chromium 141 only, so a staged rule set beneath the cascade stands in for the Chromium 153 user-agent defaults the
engine session read.

1. **Scope.** `pl-status.txt` lists only files the brief owns (`tests/service/tailwind/preflight.test.ts`,
   `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`); `pl-shared.patch` touches `guides/veneer.md` alone; no
   off-limits file changes.
2. **The classification.** Each moved row sits in the right class (`pl-classify.out.txt`): a declared row is one a
   `base`-layer rule of the profile declares for that element; the `text-decoration-color` and logical padding rows
   follow a declared value one to one and so read the same on every build; the `input`, `select`, and `textarea`
   `height` rows follow the rendered content box and have no build-independent preflight value; `width` comes only
   from the profile's generated utilities and lies outside the property population.
3. **The comparison.** The proof runs once per `PREFLIGHT_BUILDS` row; it holds every property Veneer's elements
   layer declares, holds a moved `PREFLIGHT_DIMENSIONS` property to equal content extents standalone and paired, holds
   every other move to a recorded guide row, holds every recorded row to the value the profile resolves whether or not
   that build's default already held it, and refuses a recorded row that names a declared pair or a dimension. It ran
   red on the staged Chromium 153 build with the prior comparison (`pl-red-baseline.log.txt`, the engine session's
   `select | height | 21px` and missing `table` rows) and passes on both builds (`pl-green.log.txt`).
4. **The emulation.** The staged rules sit in a sublayer of `theme`, the first layer the built cascade places, so
   every rule of the cascade and the profile beats them; they reproduce the differences the engine session's reading
   names; the control case proves they reach the page beneath the cascade and the profile, and M7 (staging above the
   cascade) and M8 (staging never reaching the page) redden it. Without the control case the pairing alone passes
   under an emulation that never reached the page.
5. **The mutations.** A changed preflight value (M1a, M1b), a Veneer elements-layer declaration that stops holding
   its value (M2), a removed or changed guide row (M3, M4), a recorded dimension (M5), a dropped dimension edge (M6),
   a guide row naming a declared pair (M12), and the wrong dimension (M13) each redden the proof on the assertion the
   report names (`pl-mutations.log.txt`), and each ran against the tree after the final lint restructure.
6. **The setup tables and helper.** `PREFLIGHT_BUILDS` and `PREFLIGHT_DIMENSIONS` are frozen exported constants with
   TSDoc in `tests/setupStyles.ts`; `computeContentExtent` returns the height less its vertical padding and border
   under `border-box` sizing and the height itself under `content-box` sizing, and its proof rows (M10) and the table
   proofs (M9, M11) redden on their mutations.
7. **The guide.** `pl-shared.patch` removes the three form-control `height` rows, and every sentence it adds or
   rewrites reads true against the proof: the content-extent paragraph, the Standalone column as the Chromium 141
   reading, the Chromium 153 differences, and the staged sublayer; `npm run test:guides` passes with it applied.
8. **Law and report.** The changed code holds no `any`, no `as` beyond a const assertion, no `!`, no suppression, no
   nested function, and no mock; the helper and tables follow the naming rules; the report states each gate's command,
   exit, and result line as its log prints it, states no tally of a growable set and no temporal word, and follows every
   code token with a noun.

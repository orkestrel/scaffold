# Review of the engine remainder map (engine session, 2026-10-04)

Subject: `stage-b/remainder-map-2026-10-04.md`, written by the cloud session at scaffold `178ac66d4`. Method: one Opus 5.5 reviewer per map section and one engine-session lens, read-only, against the scaffold records, veneer `main` `d0603b4`, and the cloud branch `77c65cf`; an Opus skeptic then tried to refute every material finding (59 agents, workflow `wf_d43a62c5-930`). Only findings that survived the skeptic are listed; each cites the line that settles it.

## Verdict

The map reads the stage B verdict faithfully. 179 claims were confirmed, including the unit contents, gates, controls, figures, rulings 1 to 7, D-1 to D-11, I-1 to I-4, and the statement that stage B still waits on the user. Its RM line numbers come from the cloud branch, three lines below `main`. The material faults are three:

- **Lane ownership.** The map reads `lanes.md` § Sessions and § Paths as current and misses § Log.
- **Stale `browse` decisions.**
- **Status and framing in the stage B table.** These would misdirect a ruling.

## 1. Lane ownership (high)

- **The engine session holds the showcase and `browse` lanes,** except the flip grant. The user moved both lanes to the engine session on 2026-10-03 (`lanes.md:265`). The cloud session returned on 2026-10-04 on one lane, the Tailwind flip (`lanes.md:212`), with the paths at `lanes.md:215`. No entry hands `browse`, `showcase-guide`, or journey cost tuning back. The map's heading "`browse` lifecycle (showcase-owned server)" (map:119) and items 2, 6, and 7 (map:133, :137, :138) claim engine-held work.
- **`showcase-proofs` is done.** It landed on `main` at `3807993`, `608d646`, and `4929856` (2026-10-03, engine session). Only `showcase-guide` remains, and it is engine-session work under the hand-off. It must be re-derived against the three-face § Showcase before anyone runs it.
- **Journey cost tuning has no named owner.** The flip lane may record the chunk in the ROADMAP showcase lines, which its grant covers. Running it needs an owner named in § Log. The map's own citation (`lanes.md:132`) sends the tuning "not to this lane".
- **The cloud session's one `browse` task is the D-4 Linux run,** after the flip lands (`lifecycle/reassessment-2026-10-04.md:7`, `:17`, rank 11 at `:56`). It writes the browser checkout and scaffold records. It coordinates through § Log, because the engine session moves the browser branch to 0.0.24 and 0.0.25. The map omits it.
- **P0 stays on the engine track.** The roadmap lists it under "Engine track:" (`ROADMAP.md:181-183` at `77c65cf`). A repair lands in `src/browser/Placement.ts`. Its readings need Chromium 153, which the cloud host lacks (Chromium 141). The map's item 11 (map:142) offers it to the cloud lane.
- **The stage B decision packet is the engine session's, at the units.** Map item 8 (map:139) would assemble rulings 1 to 7, D-1 to D-11, and I-1 to I-4 now. The user deferred every stage B decision until its unit opens (`plan.md:29`). When the user opens stage B, the engine session presents rulings 1, 3, 4, and 5 for B0, ruling 2 for B1, and the rest at their units.
- **The ownership-boundary upkeep item is closed.** `lanes.md:465` answered the `lanes.md:34` ask, and `a53e95aea` removed the section. The live upkeep is `showcase/status.md:3` and `:9-14`, which predate the flip-only return.
- **The engine row is incomplete** at map:130. The full row is `lanes.md:20`; the map cites the header at `:18`.
- **The `createVeneer` migration landed at `419245d`;** the map:149 exclusion is stale. The only leftover is `createEngine` in `lanes.md:41`.
- **The map's file sits in an engine path.** It is under `.orkestrel/veneer/stage-b/`; the cloud lane writes `.orkestrel/veneer/showcase/`. This review leaves it in place and records the write here.

## 2. `browse` decisions (high)

- **D-3 is ruled.** The ruling keeps the `initialize` refusal and adds the Codex `required = true` guidance (`lifecycle/eager/readings.md:20`; browser `3924fbb`). That commit is an ancestor of the map's. Probe item 1 does not wait on D-3: it has its own judged design and rulings (`lifecycle/eager/probe-design.md`).
- **D-5 is ruled.** On 2026-10-04 the user ruled that a grant resets the strikes only for a browser created after the last strike, shipped as pool 0.0.15 (`lifecycle/holders/synthesis.md`, Q3).
- **The parallel-holders rulings postdate the map.** Q1 is a server-minted handle, Q2 the verb `destroy`, Q4 no reserved spare. One user decision stays pending: the default size after the H6 contention measurement.

## 3. Stage B table (medium unless marked)

- **The refused-candidates row merges two kinds of refusal (high).** The rationale "each fails a Bootstrap gate, a veto, or a completion signal" (map:31) is false for part of the row.
  - The five scope refusals wait on ruling 5 before B0: manual-popover offcanvas, toast promotion, `@starting-style`, carousel until-found, and `ariaNotify`. They are additions no reading shows impossible (`verdict:54`), refused because "none has a consumer or a measured gain" (`verdict:1192-1193`).
  - The measured refusals are final, and several fail for other reasons. `attachInternals` throws (`verdict:378`), a `moveBefore` root mismatch throws (`:315`), switch is absent in Chromium 153 (`:250`), and `focusgroup` duplicates the keydown route (`:293`).
  - The verdict check demanded this split (`codex/stage-b-verdict-check.md:68`, `:72`, `:204`).
- **One status per unit.** Every unit is unstarted until the user opens stage B (`ROADMAP.md:183` at `77c65cf`; `verdict:1115-1131`). Each waits as follows:
  - B0 waits on rulings 1, 3, 4, and 5.
  - B1 waits on B0 and ruling 2.
  - B2 waits on B0.
  - B3 waits on B1 and B2.
  - B4 waits on B0's held intrinsic slice and on B2's `plugins.ts`.
  - B5 waits on B3, plus ruling 6 and the repair only if P0 finds one.
  - B6 waits on B3 to B5, and B7 waits on B6.
  The map labels several of these "open" and repeats the readers' disagreement in place of a status.
- **Rulings 3 and 4 precede B0, not B3.** B0 lands the `native` TSDoc and the `ModalInterface` and `ComponentEvent` remarks that carry them (`verdict:170`, `:162`, `:1118`). Map:82, :20, and contradiction 3 (map:158) misplace them.
- **B0's two kinds of held patch.** The compensation and `Lock` constructor patch is ungated and applies with B3 to keep B0's typecheck green (`verdict:1105`). The `topmost` and `intrinsic` slices are gated and drop if their gates fail (`verdict:1106`). Map:17 merges them.
- **B0's scope omits four items:** the `ModalInterface` remarks and `@throws`, the `ComponentEvent` remark carrying ruling 4, the guide's stylesheet fence under `### Opt into native surfaces`, and the guide's Surface rows (`verdict:1118`, `:870`, `:883`).
- **The fence has a sequence, not one owner.** B0 writes it, B1 loads it, B3 measures it, the float fence waits on B5, and B7 writes the prose. Map:45-46's "ships with B3" copies the verdict's status cell and hides that sequence.
- **B4 and B5 carry no user decision.** The verdict decides the gated adds itself (`verdict:44-48`, `:141-150`), so the superseded draft's item 2 is not pending. Agent-6 item 5 (`MODAL_OPEN`) is also ruled (`verdict:186`, `:497`). The "Draft-only item" bullet (map:85) leaves the decision list.
- **"Every native open or close" is too wide.** The map says each passes Bootstrap's gates or is reconciled once (map:9). A written `open` attribute fires no event and is not reconciled; the next `show()` throws `MODAL_OPEN`. Cite `verdict:151-162`, `:455-526`, and `:806`.
- **Native systems outside Bootstrap's twelve families are unruled scope, not "unknown".** These include form validation, customizable select, clipboard, and fullscreen (map:33). The inventory brief limited itself to Bootstrap's families (`stage-b/native-inventory-brief.md:28`), and the user has not ruled whether "stage B and after" (`plan.md:20`) reaches them.

## 4. Styles under the flip (medium)

- **Preflight beats the Veneer looks the verdict places in `reset`.** Under the flip, preflight in `base` wins every property it shares with a `reset` rule. That covers bare dialog chrome, the bare popover look, and bare `::placeholder`, not only D-1's tag defaults (map:42-60). The hand-off fences are unaffected: their margin, padding, and border values equal preflight's. Carry this to the user's D-1 ruling at chunk 3.
- **The class-registry roadmap amendment already landed** at veneer `2d6e7b2` (2026-10-01). Drop map:68's last sentence.
- **D-1 under the flip (contradiction 21) is real and unruled.** Its source is the flip critic (`tailwind-flip/design/critic.md:19`, proof at `:75`), which the flip verdict did not take up. Per face, the reboot wins on Bootstrap pages; on Tailwind pages `./styles` beats the reboot by source order and loses to preflight. It blocks nothing before chunk 3.
- **Token values across faces (contradiction 22) are narrower than stated.** The overlap is fonts, radii, shadows, and color roles; R11 keeps Bootstrap's type and space scales. It is an interaction of D-2 and D-3 with R11, and D-2's yes branch would reverse R11 under the layer. The user rules it with D-2 and D-3 at chunk 3.

## 5. Contradictions (medium)

- **Items 4 to 14 are resolved, not standing.** Each is a proposal the governing verdict ruled. Label them resolved, citing the verdict's line for each. Three residues stay live:
  - item 4: detection is ruling 1 option (a);
  - item 6: shipping the fences by default is D-11;
  - item 7: the paint limit falls under ruling 3.
- **Item 17 is stale.** The W4 inventory exists at `stage-b/stage-b-wide-agent-0.md`, committed after the verdict's "no file on disk" sentence.
- **Item 18's gap is a renumbering.** D-8 became I-1 to I-4, and the verdict added D-11. When the packet is assembled, it shows W4's three differences beside the verdict's text: the D-2 recommendation, the D-5 scope, and the D-10 clause.
- **Item 28's `0.0.22` re-pin landed** at veneer `8159757`. The open re-pin is browser `^0.0.23` and scaffold `^0.0.91`.
- **Item 29 is accounted for.** `stage-b/veneer-remainder-1.md` re-reads the whole conflict study. Its open items went to the convention-audit campaign, which closed at `959ed49`, and the last four partial items landed at `419245d`. Stage A has no open conflict-study item.
- **Item 26 is not a record conflict.** Elements is API-shape guidance and native-surface research (`plan.md:16`). The verdict used that research to refuse those mechanisms for Bootstrap's plugins.

## 6. Engine answers to the routed items

- **Re-pin.** The flip lane may take the `package.json` and lockfile re-pin if it logs it (`lanes.md:100`). The scaffold 0.0.91 overwrite of the vendored files and the Windows readings of `test:src:browser`, `test:integration`, and `test:journey` stay with the engine session after the flip lands (`lanes.md:99`).
- **Guide defects in the Browser entry.** The `engine.destroy()` fix at G:672-673 lands with the engine session's first veneer write after the flip lands. G:954 waits for B7.
- **`lanes.md:41`.** The engine session corrects `createEngine` to `createVeneer` with this review's § Log entry.
- **P0.** It runs on this Windows host's Chromium 153 as a read-only probe whose file is deleted afterward, so it can run before the flip lands. A repair waits for ruling 6.

## Findings the skeptics refuted (not carried)

- The map's gloss of "deterministic and programmatic" (map:9) is a gloss, not a definition. The surviving point is a wording one. In the user's own usage (`plan.md:13-14`, `:19`), "deterministically" means pinned and provable against a source, and "programmatic" means driven and read through typed JavaScript. Read that way, the phrase covers more than the opt-in rule.
- The Vue face (chunk 5) is outside the map's stated scope; it survives only as a low completeness note.
- That every stage B reading is Bootstrap-only and predates the flip is true but overstated as a gap. B6's control page and the per-face note above cover it.
- These findings also failed: the `!important` until-found coupling under the flip; the claim that the map ordered stage B after the token units; the item 14 rulings as an omission (they postdate the map); the critic-gap list; the token-unit lane coverage; the browser floor as a misframe; and the spinner restatement.

## The user's rulings (2026-10-04)

1. Stage B and after also reaches native features with no Bootstrap counterpart.
2. The cloud session opens and runs stage B after it finishes the Tailwind layer.
3. The cloud session, doing the veneer work, owns the journey run-cost tuning; package-side levers stay with the engine session.

Recorded in `plan.md` § Standing rulings and `lanes.md` § Log.

## Questions only the user can rule, surfaced by this review

1. **Scope of "stage B and after".** The question is whether the engine's remaining layers reach native systems with no Bootstrap counterpart. Examples: elements-style factories for bare `dialog`, `details`, and customizable `select`, plus form validation, clipboard, and fullscreen, each driven through typed JavaScript and pinned against a source. The alternative is that they stop at the native hosts of Bootstrap's twelve families (`plan.md:20`; `verdict:1192`).
2. **Opening stage B.** Rulings 1, 3, 4, and 5 come before B0, and ruling 2 before B1.
3. **Journey cost tuning's owner.**

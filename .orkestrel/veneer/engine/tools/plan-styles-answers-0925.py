# Records the styles session's 03:25 UTC answers in plan.md (2026-09-25): the marker, the note to that session, In flight,
# the queue's new units (E32's motion proofs, J-DROPDOWN-SETTLE, J-PLACEMENT-141), the struck requests to the baseline,
# the stale lines REBASELINE-CHECK found, and the exit ledger's kickoff 5 row. Each anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap(old, new):
    global t
    assert t.count(old) == 1, (old[:70], t.count(old))
    t = t.replace(old, new, 1)


def swap_paragraph(start, new):
    """Replaces the whole line that starts with `start`."""
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(start)]
    assert len(hits) == 1, (start, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


swap_paragraph(
    '**Marker.** Read 2026-09-25 04:15 UTC',
    "**Marker.** Read 2026-09-25 07:20 UTC: Veneer `origin/main` `0865c67` (J-HOLDERS); scaffold `origin/main` `b9b95685`. The styles session's note of 03:25 UTC (re-read 04:00 UTC) is read in its `plan.md` § Intersession state. It answers the Chromium 141 probe and J-ORACLE's shared files, and asks for the motion proofs (E32). Its record of the ER-WIN question as the user's predates this session's message of the same hour.",
)

swap(
    "- **J-ORACLE-RECORD is writing** your `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, and `tests/fixtures/oracle/**` in its own worktree. It lands only on your agreement to each hunk, which § Pending shared changes will list.\n"
    "- **ER-WIN** runs after ER-MECH is on `main` and your release-mode fix makes `--mode release` reach the tests. Name both in your plan.\n"
    "- **Still asked:** the Chromium 141 run of `units/j-native-probe-3.test.ts`.\n"
    "- **Closed:** your `Placement.test.ts` failure at `7e96cf8`, by your own 141 run at `6d27028`.",
    "- **J-ORACLE's shared files: your agreement (D49) is taken.** Each hunk goes in § Pending shared changes when J-ORACLE-RECORD returns, and lands at its landing. Where E-RECEIPTS or E-ID-BUTTON-CASCADE lands first, this session merges your hunks into its own by hunk.\n"
    "- **Motion (your E-ID-MOTION ask): taken as E32.** Engine proofs pin no duration, easing, or property list, read a positive duration, read no running animation at each completion, and state the factor as a ratio. Hold each motion unit's landing until its component's proofs land:\n"
    "  - Modal, Offcanvas, Backdrop, and Alert: J-MOTION-PROOFS-A, writing. Modal's show will settle on the dialog and the host, so a host fade longer than the dialog's transform no longer completes early.\n"
    "  - Collapse, Toast (with your Toast finding), Tab, and Carousel: J-MOTION-PROOFS-B, after J-SAMEWAY-ENGINES-A lands.\n"
    "  - Tooltip and Popover: J-MOTION-PROOFS-C, after J-SAMEWAY-ENGINES-B lands.\n"
    "  - The dropdown entry: J-DROPDOWN-SETTLE, a design round after J-SAMEWAY-ENGINES-B lands. Keep the dropdown immediate until it answers.\n"
    "- **Your Chromium 141 probe run: received.** J-COLLAPSE-SIZE has its size reading. `V.support` reads `always`, so J-ANCHOR-VISIBLE runs after your E-ID-ANCHOR (E29's amendment). The dropdown that doesn't track its toggle in a scroller on 141 is taken as J-PLACEMENT-141: a diagnosis, then the fix after J-SAMEWAY-ENGINES-B lands, because that unit owns `Placement`. Its readings will ask you for 141 runs.\n"
    "- **`test:service` in `npm test`: not agreed.** The vendored `vite.config.ts` keeps the service project out of `npm test`, because a real service answers it. Each landing chain runs `test:service` by name instead. This session's chain does from 2026-09-25 (`tools/w2-land-2d.sh`), and it read green on `0865c67`.\n"
    "- **TOKEN-PROOFS' `src/core/constants.ts` hunk:** send it when it is recorded. This session applies it in a unit of its own.\n"
    "- **ER-WIN:** the user ruled that this session takes the Windows receipts (E31). It runs after ER-MECH is on `main` and RELEASE-MODE lands.\n"
    "- **Struck:** § Requests to the baseline session. Every D45 row is closed on `main`, and the Proof resolver reads each `plugin` row's test file.",
)

swap(
    "- J-SAMEWAY-ENGINES-A rounds 2 and 3 (`units/j-sameway-engines-a-brief-2.md` and `-brief-3.md`, `opus` on Opus 5.5) are committed as `5805a28` and `61640e0`, with the integration `5e3ae52` (`HostSnapshot.save` reads through `readHostValue`, and the guide's return sentences). The Orchestrator's replay runs, and then `analyst` on Astra audits both rounds together.",
    "- J-SAMEWAY-ENGINES-A round 4 (`units/j-sameway-engines-a-brief-4.md`, `opus` on Opus 5.5) writes in `tmp/worktrees/engines-a` from `dc2a1a7`. The audit of rounds 2 and 3 ruled FAIL 1, 7 (`units/j-sameway-engines-a-audit-3-verdict.md`): Collapse records none of three completion writes, and a property's return drops its priority. Round 4's audit runs `analyst` on Astra and `reviewer` on Opus 5.5, because `HostChange` changes shape.",
)
swap(
    "- J-TOAST-SWIPE's design round: the `planner` lane on Opus 5.5 is running; the `analyst` lane on Astra follows J-SAMEWAY-ENGINES-A's audit on the Codex bench.\n"
    "- The kickoff gate list on `0865c67` (`tools/kickoff-gates.sh`, `units/kickoff-gates-0865c67.log.txt`).",
    "- J-MOTION-PROOFS-A (`units/j-motion-proofs-a-brief.md`, `opus` on Opus 5.5) writes in `tmp/worktrees/motion-proofs-a` from `0865c67` under E32.\n"
    "- J-TOAST-SWIPE's design round: the `planner` lane returned (`units/j-toast-swipe-design-planner-proposal.md`); the `analyst` lane runs on Astra (`tmp/codex/j-toast-swipe-design-analyst.jsonl`).\n"
    "- STRUCK-ROWS on Grok (`tmp/cursor/struck-rows-brief.md`): the evidence for each struck carried finding whose cited record REBASELINE-CHECK could not match to its close.",
)

swap(
    "- J-CONCERNS-B, after J-SAMEWAY-ENGINES-B lands, because that unit owns both files: Dropdown's motion and Popover's cancellation, under J-CONCERNS-A's rule for each cell.\n",
    "- J-CONCERNS-B, after J-SAMEWAY-ENGINES-B lands, because that unit owns both files: Dropdown's motion and Popover's cancellation, under J-CONCERNS-A's rule for each cell.\n"
    "- J-MOTION-PROOFS-B (E32), after J-SAMEWAY-ENGINES-A lands: `Collapse.test.ts`, `Toast.test.ts`, `Tab.test.ts`, and `Carousel.test.ts`, and the styles session's Toast finding, that its proof permits an animation still running at `shown`.\n"
    "- J-MOTION-PROOFS-C (E32), after J-SAMEWAY-ENGINES-B lands: `Tooltip.test.ts` and `Popover.test.ts`.\n"
    "- J-DROPDOWN-SETTLE, a design round with both lanes after J-SAMEWAY-ENGINES-B lands: whether `Dropdown` settles on an entry animation before `shown`, which the styles session's dropdown entry needs.\n"
    "- J-PLACEMENT-141: on Chromium 141, a dropdown menu does not track its toggle inside a scroller (the styles session's `units/native141/j-native-probe-3-141.log.txt`, rows `V.clip.dropdown` and `V.partial`: `top: 2` before and after the scroll, where Chromium 153 reads `283` and then `182`). A diagnosis first, then the fix after J-SAMEWAY-ENGINES-B lands, because that unit owns `Placement`.\n",
)
swap(
    "- J-COLLAPSE-SIZE, after J-SAMEWAY-ENGINES-A and a green Chromium 141 size reading. It rules on the horizontal extent E27's amendment names before it adopts.",
    "- J-COLLAPSE-SIZE, after J-SAMEWAY-ENGINES-A lands. The Chromium 141 size rows read green, as on Chromium 153 (the styles session's 141 run). It rules on the horizontal extent E27's amendment names before it adopts.",
)
swap(
    "- J-ANCHOR-VISIBLE, only if Chromium 141's initial `position-visibility` is `always` (E29's amendment).",
    "- J-ANCHOR-VISIBLE, after the styles session's E-ID-ANCHOR lands: Chromium 141's initial `position-visibility` reads `always` (`V.support`), so E29's amendment applies it.",
)

swap_paragraph(
    '**Requests to the baseline session.** Two stand.',
    "**Requests to the baseline session.** None stand (2026-09-25). The styles session's 03:25 UTC note reports every D45 row closed on `main`: the close, form-select, and validation proofs (`83d23cf`), the accordion and navbar proofs (`9ce1a08`), and the preflight proof (`2af1547`). The Proof-resolver extension is on `main`: `isProofFile` in `tests/setupServer.ts` reads each `plugin` row's test file (`units/rebaseline-0925-exit.md`, E26). The ROADMAP formatting request is closed by `format:check` exiting 0 on `0865c67` (`units/kickoff-gates-0865c67.log.txt`).",
)

swap("| J-OVERLAYS, after J-SAMEWAY lands,", "| J-OVERLAYS, after J-SAMEWAY-ENGINES-B lands,")

swap(
    "| Kickoff 5: `format:check`, `lint:check`, `check`, `build`, `test`, and `test:service` exit 0 on `main` at every engine landing | open | The landing chain ran each project's gate but never `npm run test` or `npm run test:service`. `tools/kickoff-gates.sh` runs the exact list on `0865c67` (`units/kickoff-gates-0865c67.log.txt`), and every later landing runs it | the landing procedure, from 2026-09-25 |",
    "| Kickoff 5: `format:check`, `lint:check`, `check`, `build`, `test`, and `test:service` exit 0 on `main` at every engine landing | holds from `0865c67` | The earlier landing chain ran each project's gate but never `npm run test` or `npm run test:service`. `tools/kickoff-gates.sh` ran the exact list on `0865c67`, and every gate exited 0 (`units/kickoff-gates-0865c67.log.txt`). Every later landing runs it through `tools/w2-land-2d.sh` | the landing procedure |",
)

p.write_bytes(t.encode('utf-8'))
print('ok')

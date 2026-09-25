# Records the rounds of 2026-09-25 (later) in plan.md: ENGINES-A rounds 4 and 5, J-CONCERNS-A's pass and landing,
# J-ORACLE-RECORD's audit and round 2, J-MOTION-PROOFS-A round 2, the J-PLACEMENT-141 reading, the new carried findings
# (@throws drift, the vendored build pattern, the third standing host row), and J-THROWS in the queue.
# Each line prefix must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
lines = p.read_bytes().decode('utf-8').split('\n')


def replace(prefix, new):
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new


def insert_after(prefix, new):
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines.insert(hits[0] + 1, new)


replace(
    '- J-SAMEWAY-ENGINES-A round 4 is committed',
    "- J-SAMEWAY-ENGINES-A round 5 is committed as `fb179a9`, with the guide integration `63a153b`. Round 4's audit ruled "
    "FAIL 8, 10 (`units/j-sameway-engines-a-audit-4-verdict.md`). The objective lane on Astra passed every behaviour "
    "claim, and the reviewer on Opus 5.5 failed the shape. Round 5 names the record `HostWrite { target, value, priority }`, "
    "with the leaves `recordHostWrite` and `rewindHostWrites`. It also states the record leaf's condition, says the "
    "return \"writes back\", and pins `readHostPriority`'s branch. The replay runs "
    "(`tools/replay-engines-a-5.sh`), and then `analyst` on Astra and `reviewer` on Opus 5.5 audit the round.",
)
replace(
    '- J-ORACLE-RECORD returned and is committed',
    "- J-ORACLE-RECORD round 2 (`units/j-oracle-record-brief-2.md`) is writing. The audit of `9ea360d` ruled FAIL "
    "1, 3, 7, 9, 11, 14 (`units/j-oracle-record-audit-verdict.md`), and E28 is amended. Round 2 covers:\n"
    "  - own-property labels;\n"
    "  - one evaluation per reading;\n"
    "  - text, parent, and scroll facets;\n"
    "  - the case matrix moved to the setup module;\n"
    "  - the library, recording, and report vocabulary;\n"
    "  - a `gesture` union for `PluginAction`;\n"
    "  - one fixture reader;\n"
    "  - clean-up on a failed launch;\n"
    "  - the instrument's classifier.\n"
    "  The first census is triaged in `units/j-oracle-census-0925.md`.",
)
replace(
    '- J-CONCERNS-A round 3 (`units/j-concerns-a-brief-3.md`) is writing.',
    "- J-CONCERNS-A passed its round-3 audit (`units/j-concerns-a-audit-3-verdict.md`) and is landing. Its gate chain "
    "read one red outside the standing rows, `tests/src/styles/elements/button.test.ts`. That file is red on clean "
    "`main` `21c821a` under Chromium 153 and green in the styles session's Chromium 141 chain, so it is recorded as "
    "the third standing row in `units/host-chromium-153-reading.md` (E5). `npm run test` stops at a red in "
    "`test:src`, so `tools/w2-land-rest.sh` runs every later project by name before the fast-forward and the push.",
)
replace(
    '- J-MOTION-PROOFS-A (`units/j-motion-proofs-a-brief.md`',
    "- J-MOTION-PROOFS-A round 2 (`units/j-motion-proofs-a-brief-2.md`) is writing: the shared `readDuration` reader "
    "in `tests/setupBrowser.ts`, and the three sites that read a duration inline switched to it. Round 1 is committed "
    "as `88036ca`, with the guide integration `8e3e222` (`units/j-motion-proofs-a-report.md`). Its audit follows "
    "round 2.",
)
replace(
    '- J-PLACEMENT-141-PROBE returned',
    "- J-PLACEMENT-141: the styles session's Chromium 141 run of the probe (its "
    "`units/native141/j-placement-141-probe-141.log.txt`, scaffold `da4d6fa4`) anchors only the `display` and "
    "`noClick` variants. The failure needs a menu placed while its cascade hides it, after a trusted press. The fix "
    "renders the menu before placing it (`units/j-placement-141-diagnosis-verdict.md` § The Chromium 141 reading), "
    "and its design round runs after J-SAMEWAY-ENGINES-B lands.",
)
insert_after(
    '- J-TESTRULES, after J-SAMEWAY-ENGINES-B and J-OVERLAYS land.',
    "- J-THROWS, a `builder` unit on Sonnet after the engines units land: every `@throws When …` in `src` and `tests` "
    "becomes `typescript.md`'s \"Thrown when …\". The rule is binding, and the form it replaces runs across the "
    "repository (J-ORACLE-RECORD's audit referral).",
)
t = '\n'.join(lines)
marker = "The struck rows of 2026-09-25 are ruled in `units/rebaseline-0925-rulings.md`, which reopens the fixture-lookup row.\n\n"
assert t.count(marker) == 1
table_head = "| Finding | Source | Carrier | Closes with |\n| --- | --- | --- | --- |\n"
i = t.index(table_head, t.index(marker)) + len(table_head)
rows = (
    "| `@throws When …` in every doc block across `src` and `tests`, where `typescript.md` requires \"Thrown when …\" "
    "| J-ORACLE-RECORD audit, reviewer referral | J-THROWS | no `@throws When` remains, and the gates are green |\n"
    "| `compileVeneerRuntime` in `tests/setupServer.ts` repeats the vendored `configs/src/vite.styles.config.ts`'s "
    "stripping of `external` and `output` from `srcBrowser()`'s build options | J-ORACLE-RECORD audit, reviewer O3 "
    "| the scaffold, which vendors the configuration: one exported factory both consume, at the closing debrief's "
    "scaffold findings | the scaffold ships the factory, or rules the repetition acceptable |\n"
    "| `tests/src/styles/elements/button.test.ts:198` reads `outline-width` among the pressed-state differences on "
    "Chromium 153, a user-agent default (the third standing row, `units/host-chromium-153-reading.md`) | the J-CONCERNS-A "
    "landing | the styles session, under D45 | the proof reads green on both builds |\n"
)
t = t[:i] + rows + t[i:]
p.write_bytes(t.encode('utf-8'))
print('ok')

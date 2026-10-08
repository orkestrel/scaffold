export const meta = {
  name: 'veneer-landing-review',
  description: 'Independent review of the veneer landing branch (D2.5, Wake 1, D2.6, M1) with adversarial verification before main',
  phases: [
    { title: 'Review', detail: 'six read-only lanes over the landing diff' },
    { title: 'Verify', detail: 'skeptics try to refute each finding' },
    { title: 'Verdict', detail: 'one synthesis over the surviving findings' },
  ],
}

const WT = '/home/user/.wave/veneer-guard'
const BASE = '9f56e6a'
const TIP = '45f60fa'

const COMMON = [
  `You review the veneer landing branch read-only. The checkout is ${WT} (branch landing at ${TIP}); the review range is ${BASE}..${TIP}: commits b43a57c (D2.5 group transfer between sortable hosts), 6381c29 (surfaces partial rename), 2540baf (Wake 1, the keep-screen-on toggle over the Screen Wake Lock API), de168b8 (D2.6 drag by touch and pen through pointer events), 75dc342 (M1: per-host boot containment, sorter counter keys, clipboard selection-copy fallback), 45f60fa (a journey geometry repair).`,
  `Read with git -C ${WT} diff ${BASE}..${TIP} -- PATHS, git -C ${WT} show, and the Read/Grep tools. Never edit a file, never run vitest, a build, Playwright, or npm in any checkout, and never cd. The repository's AGENTS.md and .claude/rules files under ${WT} are the code law; the guide is ${WT}/guides/veneer.md.`,
  'Report only defects you can tie to a line: a wrong behavior with a concrete input or event sequence that produces it, a broken invariant, a leak, a claim in prose or TSDoc that the code contradicts, a proof that would stay green if the behavior it names broke, or a rule violation you can quote. Do not report style preferences, restatements of documented limits, or speculation without a scenario. Severity: high = wrong behavior a user or consumer meets on a supported path; medium = wrong behavior on an edge path, a leak, or a proof that pins nothing; low = prose or rule drift with no behavior change.',
  'Return at most 12 findings, most severe first. An empty list is a valid result.',
].join('\n\n')

const LANES = [
  {
    key: 'm1-engine',
    focus: `M1 in src/browser/Veneer.ts (#boot and #initialize), src/browser/sorters/Sorter.ts (counter keys, the static sequence), src/browser/copiers/Copier.ts (the absent-API NotAllowedError, the selection fallback #copySelection: activation gating, focus and selection restore, textarea placement, document.body absence, teardown during the async write, a frame realm), and their proofs tests/src/browser/Veneer.test.ts, tests/src/browser/sorters/*.test.ts, tests/src/browser/copiers/Copier.test.ts. Ask: can a host boot failure still leave the scope half-initialized in a way a later route or destroy() mishandles; can two sorters or a destroyed-and-recreated sorter collide on keys; does the fallback ever report success without copying, restore the wrong selection, steal focus, scroll, or run after destroy; does the guide's Copy button and boot paragraph match the code.`,
  },
  {
    key: 'd26-touch',
    focus: `D2.6 in src/browser/drags/Drag.ts (#arm, #track, #drag, #begin, #drop, #over, #scroll, #finish, the dragstart suppression, the command and keyboard guards during a session), src/browser/drags/helpers.ts (computeScroll), constants.ts, types.ts, and tests/src/browser/drags/Drag.test.ts and helpers.test.ts. Ask: can a session leak document listeners or pointer capture (destroy mid-session, a second pointer, a press on a different host, an element removed during the session, the host moved); is the slop check correct for multi-touch, isPrimary false, button values for pen; does auto-scroll pick the right container and direction under RTL, vertical writing modes, and reversed flex; does #begin handle a start listener that re-renders or prevents; does a touch session interact correctly with D2.5 group transfer (an item moved between hosts mid-session) and with D2.4 command buttons; are computeScroll's documented examples true.`,
  },
  {
    key: 'd25-group',
    focus: `D2.5 group transfer in src/browser/drags/Drag.ts and plugins.ts (hosts with equal non-empty data-vn-drag values form a group; native drag, the perpendicular Alt+Arrow pair, and the --backward and --forward commands move an item to another group host; move fires on the target carrying the source), src/styles/surfaces/_drag.scss (the empty grouped-host min-block-size rule), app/browser/sections/sortable-list.html (the Parcel board), and the proofs in tests/src/browser/drags/plugins.test.ts, Drag.test.ts, tests/src/styles/surfaces/drag.test.ts, and the board case in tests/app/browser/integration.test.ts. Ask: can a transfer reach a host outside the group, a destroyed host, a host in another document or a nested host; is the crossing key order (document order) right under RTL and vertical writing modes; does a cancelable move on the target and its prevention leave both hosts consistent; do the live-region announcements name the right host and position; is the empty-host rule's selector right.`,
  },
  {
    key: 'wake',
    focus: `Wake 1 in src/browser/wakes/ (Wake.ts, plugins.ts, factories.ts, constants.ts, types.ts, index.ts), its barrel line in src/browser/index.ts, app/browser/main.ts and app/browser/constants.ts wiring, app/browser/sections/keep-screen-on.html, and tests/src/browser/wakes/*.test.ts plus the journey case. Ask: does acquire/release/toggle handle a pending acquisition when toggled again, destroyed, or released externally; does visibility change handling re-acquire only with retained intent; are aria-pressed projections right for every bound button including buttons added later; does the plugin route refuse foreign-realm or non-button triggers correctly; are listeners removed on destroy; does the guide's departure rows and Surface rows match the code and the event names.`,
  },
  {
    key: 'prose',
    focus: `The prose of the range: guides/veneer.md (every hunk in the range), ROADMAP.md, and the TSDoc blocks changed in src/browser. Check each behavior sentence against the code it describes, each cited case title against the test files (exact title), each Surface row Summary against its export's doc-block description paragraph, and the writing law in ${WT}/.claude/rules/writing.md (banned terms in its substitution table, should, currently, now, new, above, below, e.g., via, a code token inflected or used as a verb, a list or table without an introducing sentence). Report a sentence the code contradicts as medium; rule drift as low.`,
  },
  {
    key: 'proofs',
    focus: `Proof sufficiency and determinism across the range's tests: tests/src/browser/drags/*.test.ts, tests/src/browser/wakes/*.test.ts, tests/src/browser/copiers/Copier.test.ts, tests/src/browser/Veneer.test.ts, tests/src/browser/sorters/*.test.ts, tests/setupBrowser.ts additions, and the journey cases added in tests/app/browser/integration.test.ts. Ask, per case: would it stay green if the behavior its title names broke (an assertion that reads a value the test itself wrote, an expectation inside a branch that may not run, a loop over an empty list, a try without a failing expectation); does it depend on wall-clock timing, frame counts, fixed sleeps, scroll inertia, or viewport size without a settle protocol; does it violate the test law in ${WT}/.claude/rules/tests.md (mocks, spies, fake clocks, module replacement, platform method replacement beyond the shims the module docs allow). Cite the case title and line.`,
  },
]

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          file: { type: 'string' },
          line: { type: 'integer' },
          claim: { type: 'string' },
          scenario: { type: 'string' },
          evidence: { type: 'string' },
        },
        required: ['id', 'severity', 'file', 'line', 'claim', 'scenario', 'evidence'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT = {
  type: 'object',
  properties: {
    stands: { type: 'boolean' },
    corrected: { type: 'string' },
    reason: { type: 'string' },
    repro: { type: 'string' },
  },
  required: ['stands', 'reason', 'repro'],
}

const verifyPrompt = (lane, f, n) => [
  COMMON.split('\n\n').slice(0, 2).join('\n\n'),
  `You are skeptic ${n} for one finding from the ${lane} review lane. Try to refute it. Read the cited code and every path that could make the scenario impossible: a guard elsewhere, a platform guarantee, a caller that never reaches it, a test that already pins it. Default to stands=false when the scenario cannot occur as written or the cited line does not say what the finding claims. When the defect is real but mis-stated, set stands=true and put the accurate statement in corrected.`,
  `Finding ${f.id} (${f.severity}) at ${f.file}:${f.line}\nClaim: ${f.claim}\nScenario: ${f.scenario}\nEvidence: ${f.evidence}`,
  'In repro, name the smallest test that would fail today if the finding stands: its file, a proposed case title, and the steps; write "none" when it does not stand.',
].join('\n\n')

const results = await pipeline(
  LANES,
  (lane) => agent(`${COMMON}\n\nYour lane: ${lane.key}.\n${lane.focus}\n\nPrefix each finding id with ${lane.key}-.`, {
    label: `review:${lane.key}`,
    phase: 'Review',
    schema: FINDINGS,
    model: 'opus',
    effort: 'high',
  }),
  (review, lane) => {
    const findings = (review && review.findings) || []
    log(`${lane.key}: ${findings.length} findings`)
    return parallel(findings.map((f) => () => {
      const votes = f.severity === 'low' ? 1 : 2
      return parallel(Array.from({ length: votes }, (_, i) => () =>
        agent(verifyPrompt(lane.key, f, i + 1), {
          label: `verify:${f.id}#${i + 1}`,
          phase: 'Verify',
          schema: VERDICT,
          model: 'opus',
          effort: 'high',
        }))).then((vs) => {
          const got = vs.filter(Boolean)
          const standing = got.filter((v) => v.stands)
          return { lane: lane.key, finding: f, votes: got, stands: standing.length > 0 && standing.length * 2 >= got.length }
        })
    }))
  },
)

const all = results.filter(Boolean).flat().filter(Boolean)
const standing = all.filter((r) => r.stands)
const dropped = all.filter((r) => !r.stands)
log(`${all.length} findings verified: ${standing.length} stand, ${dropped.length} refuted`)

phase('Verdict')
const verdict = await agent([
  COMMON.split('\n\n').slice(0, 2).join('\n\n'),
  'You write the review verdict for the Orchestrator, who will turn it into fix units before the landing branch reaches main. Use only the verified findings below; re-read each cited line to state it exactly. Group the standing findings into fix units by file ownership (one writer per file set), each unit with: the files it owns, every finding it closes with the corrected statement, the failing test it must write first (title, file, steps), and whether it blocks the main landing (high and medium behavior defects block; prose drift and proof-strength items may ride a later unit). List the refuted findings in one table with the refuting reason. Write the verdict as Markdown that follows the writing law in the repository rules: lead with the outcome, one idea per sentence, introduce every table and list with a sentence.',
  `Standing findings (JSON):\n${JSON.stringify(standing.map((r) => ({ lane: r.lane, ...r.finding, verdicts: r.votes })), null, 1)}`,
  `Refuted findings (JSON):\n${JSON.stringify(dropped.map((r) => ({ lane: r.lane, id: r.finding.id, claim: r.finding.claim, reasons: r.votes.map((v) => v.reason) })), null, 1)}`,
].join('\n\n'), { label: 'verdict', phase: 'Verdict', model: 'opus', effort: 'high' })

return { counts: { total: all.length, standing: standing.length, refuted: dropped.length }, standing: standing.map((r) => ({ lane: r.lane, id: r.finding.id, severity: r.finding.severity, file: r.finding.file, line: r.finding.line, claim: r.finding.claim, corrected: r.votes.map((v) => v.corrected).filter(Boolean) })), verdict }

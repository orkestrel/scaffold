import { readFileSync, writeFileSync } from 'node:fs'
const path = '/home/user/scaffold/.orkestrel/campaign/conform/HANDOFF.md'
const lines = readFileSync(path, 'utf8').split('\n')
const start = lines.findIndex((l) => l.startsWith('| browser | reconcile lane done on Luna'))
const grouped = lines.findIndex((l) => l.startsWith('| interpret, mcp, qualifier, rater, sea, server, terminal, workspace, lsp, queue, relation, scaffold |'))
if (start < 0 || grouped !== start + 1) throw new Error(`rows not found: ${start} ${grouped}`)
const rows = [
	'| router | yes (L2, found unplanned 18:22 UTC; Luna reconcile `units/l3/router-reconcile-luna.md`, marks `briefs/marks-router.json`) | complete by a direct `implementer` on Opus (`units/l2b/router-implement-direct.md`) | round 1: Luna checker FAIL 5 (`AGENTS §` citations no row owned), objective (Opus) FAIL 4, 5 with F1, F2 (`units/l2b/router-objective-r1.md`); fix round 1 `briefs/conform-router-fix1-brief.md` on Sonnet | — |',
	'| browser | yes (marks `briefs/marks-browser.json`) | `implementer` on Opus, stopped by the API spend limit at 19:0x UTC and resumed at 19:11 on its tree | — | — |',
	'| interpret | yes (marks `briefs/marks-interpret.json`) | complete after the resume (`units/l3/interpret-implement-direct.md`) | round 1: Luna checker FAIL 3 on `complete` hits the report records as absence assertions and the English adjective; objective on Opus running | — |',
	'| mcp | yes (marks `briefs/marks-mcp.json`) | closure stages after router lands | — | — |',
	'| qualifier | yes (marks `briefs/marks-qualifier.json`) | complete (`units/l3/qualifier-implement-direct.md`; the staged reason drops `RuleResult.conclusion`, carried) | round 1: Luna checker PASS, objective (Opus) FAIL 4, 6 on the record (`units/l3/qualifier-objective-r1.md`), closed by `briefs/conform-qualifier-fix1-brief.md` (report only); round 2: Luna checker PASS; ACCEPT (`units/conform-qualifier-audit-verdict.md`) | `e8ebafa` |',
	'| rater | yes (marks `briefs/marks-rater.json`) | complete after the resume (`units/l3/rater-implement-direct.md`) | round 1: Luna checker FAIL 3 on the retained type names, ruled distinct symbols; objective on Opus running | — |',
	'| sea | yes (marks `briefs/marks-sea.json`; sea-subj-19 Orchestrator-owned, applied 18:56 UTC) | complete (`units/l3/sea-implement-direct.md`) | round 1: Luna checker PASS, objective (Opus) FAIL 2, 4 with F1 to F3 (`units/l3/sea-objective-r1.md`), closed by `briefs/conform-sea-fix1-brief.md`; round 2 lanes on Luna | — |',
	'| server | yes (marks `briefs/marks-server.json`) | closure stages after router lands | — | — |',
	'| terminal | yes (marks `briefs/marks-terminal.json`) | `implementer` on Opus, stopped by the API spend limit and resumed at 19:11 on its tree | — | — |',
	'| workspace | yes (marks `briefs/marks-workspace.json`) | `implementer` on Opus, dispatched fresh after the spend-limit stop | — | — |',
	'| lsp | yes (marks `briefs/marks-lsp.json`) | `implementer` on Opus | — | — |',
	'| queue | yes (marks `briefs/marks-queue.json`) | `implementer` on Opus, dispatched fresh after the spend-limit stop | — | — |',
	'| relation | yes (marks `briefs/marks-relation.json`) | not started (closure staged; waits for a slot) | — | — |',
	'| scaffold | yes (marks `briefs/marks-scaffold.json`) | not started (runs in the orchestrator checkout; record commits pause while it writes) | — | — |',
]
lines.splice(start, 2, ...rows)
writeFileSync(path, lines.join('\n'))
console.log('rows written', rows.length)

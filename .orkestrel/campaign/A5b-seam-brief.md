# A5b seam lenses — one lens per seam of the mcp composition receipts (U5c + U5d)

This brief runs BESIDE the three-lane round in `A5b-audit-brief.md`, not in place of it
(`.agents/orchestration.md` § Context and decomposition: the subjective and objective lanes are
the adversarial pass's floor, not its shape). The delta is large and its seams are independent, so
one lens reads each seam deeply over a disjoint slice. Every lens is blind to every other lens and
to the three lanes.

## Your lens

The dispatch names which seam you hold, S1 through S6. Read ONLY your slice's claims and rule on
them. Say in your first line which seam you hold. Perform the audit directly and spawn nothing.
Do not write any file, and do not run any command that changes the tree.

## Subject

The mcp checkout at `C:/Users/mikes/WebstormProjects/mcp`, HEAD `8d97dd0`, plus the uncommitted
U5c and U5d work: `tests/distribution.test.ts` (modified), `guides/mcp.md` (modified), and the new
`tests/fixtures/distributionPage.mjs`, `distributionServer.mjs`, `distributionScript.mjs`.

The proof composes the packed `@orkestrel/mcp` with installed `@orkestrel/agent`,
`@orkestrel/tool`, and `@orkestrel/ndjson` artifacts inside an isolated consumer, loads a page in
real Chromium over an import map answered from that consumer's `node_modules`, and asserts that
the composition makes no network request except where a relay is deliberately in the path.

## Evidence

Under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`:
`U5c-mcp-distribution-brief.md` and `U5d-mcp-distribution-brief.md` (the instructions),
`U5c-mcp-distribution-report.md` and `U5d-mcp-distribution-report.md` (the units' own reports —
treat every self-reported reading as a claim, not evidence), `A5b-diff.patch.txt` (the delta with
the three fixtures in full), `A5b-distribution-orchestrator.log.txt` (the Orchestrator's own
release-mode run: exit 0, 18 passed and 4 skipped, 22.21 s), `U5d-mcp-gates-orchestrator.log.txt`
and `U5d-mcp-gates-test-full.log.txt`, `A5b-tail-gates.log.txt`, and
`P25-u5d-receipt-probe.md` (the Orchestrator's own mutation replays).

Read the live files too. The rule files that bind are `AGENTS.md` and `.claude/rules/*.md` in the
mcp checkout.

## Standing conditions

- The policy project carries ONE red, `surface population incomplete … src/core/helpers.ts:837:
  TSDeclareFunction`. It is the published scaffold 0.0.68 vendored reader refusing an exported
  function overload; scaffold 0.0.69 fixes it and mcp re-pins next. It is not a finding.
- `tmp/` in the mcp checkout holds unit logs and bench journals. Ignore it.
- `src/**` was off-limits to both units. A defect you find there is a carry-forward, not a failure
  of the unit.

## The seams and their claims

Claims are numbered once across every seam. Rule only on yours.

### S1 — the import map's derivation

11. `readSpecifiers`, `resolveSpecifier`, `walkModules`, and `joinServed` in
    `tests/distribution.test.ts` derive the map from each installed package's own `exports`, under
    the browser condition, and follow relative specifiers from each file they reach.
12. The derivation terminates and cannot loop on a cycle, and it reaches every file the page
    actually needs rather than stopping at the first level.
13. `modules.outside` collects every specifier the installed tree serves nothing for, and a
    non-empty `outside` stops the stage instead of falling back to a bundler or to a silent skip.
14. The map's keys are exactly the bare specifiers the page's graph names, so the receipt proves
    the published closure rather than a list someone wrote down.

### S2 — the consumer fixture's serving

21. `serveUnder` in `tests/fixtures/distributionServer.mjs` answers `/modules/*` from the
    consumer's `node_modules` and cannot be walked outside the root it is given (attack it with
    `..`, encoded separators, and an absolute target).
22. The media types it answers with let a browser treat each file as an ES module, including
    `.mjs`.
23. The relay route authenticates, and the control and receipts routes do what their names say.
24. The fixture is a real consumer application: it imports nothing from this repository's test
    toolkit, and every specifier it names resolves inside the consumer.

### S3 — the metadata projection

31. The page tool's `title` and `annotations` reach the in-page pair's `tools()` listing with the
    values the guide documents, and the annotation travels as the wire hint and returns as the
    domain field with no invented default.
32. The agent registry's own entry keeps the same `title` and `annotations` after
    `registry.add(advertised)`.
33. The assertions pin exact values rather than a subset, so a lost or renamed field cannot pass.
34. The guide's sentences about that round trip are true of the code that performs it
    (`src/core/helpers.ts` projecting out, `src/core/MCPClient.ts` projecting back).

### S4 — the fixtures' shape

41. No function literal sits inside a body in any of the three fixtures or in the test's new code,
    except an anonymous callback passed directly as an argument or an anonymous function returned
    directly as a result (`AGENTS.md` § Design laws, "No nested functions").
42. `class Ledger` and its `hooks` getter are the right shape for the agent's hook contract, and
    the getter's bound callbacks are not a nested-function violation dressed up.
43. `distributionScript.mjs` is a real consolidation: both copies run one authored file, and no
    near-duplicate helper survives across the three fixtures.
44. The fixtures obey the rest of the coding contract: no `any`, no type assertion, no non-null
    assertion, no default export, readonly public collections where the contract requires them.

### S5 — prose and parity

51. The file header's invariant is true of the file as it now stands, for both the surface drives
    and the composition receipts.
52. Every sentence describing what the closure instrument covers matches what it reads, in the
    test's comments and in `guides/mcp.md`.
53. The guide's `## Tests` bullets name each receipt truthfully; a reader following them lands on
    the test that proves what the bullet claims.
54. The added prose follows `.claude/rules/writing.md` and `AGENTS.md` § Writing: no `above` or
    `below`, no count of a growable set, no banned substitution, the actor named, the present
    tense for what exists.

### S6 — the stage's lifecycle

61. The composition stage is created once and destroyed once, and its teardown cannot run after
    the scratch tree is removed (name the hook and its order; do not rely on the runner's default).
62. The recorders arm after the page and its modules have loaded and are released with the page,
    so no reading carries traffic from loading or from a previous scenario.
63. The fixture's relay accounting cannot misreport because of an earlier scenario, a retry, or a
    second receipt that dials the relay.
64. The stage fails closed under `--mode release` and skips with a named reason elsewhere, and
    nothing it creates survives a run.

## Output

The `orkestrel-falsify` verdict shape, for YOUR claims only: one line per claim with the evidence
(`file:line`), then findings outside your claims under `outside:` (each tagged required,
recommended, or carry-forward; or `outside: none`), then ONE terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>`. Nothing else.

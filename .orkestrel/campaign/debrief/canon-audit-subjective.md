# Canon audit — subjective lane (verbatim summary of the returned verdict, 2026-09-02)

Lane held: subjective, on Claude Opus 5 with the Sol substitution recorded; the lane's own engine wrote the subject.

1. BROKEN (row 4) — `planner.md:35-36` obliges a command behind every measurement, which a role with `Read, Grep, Glob` and `permissionMode: plan` cannot produce; the canon puts the reading on the Orchestrator (`orkestrel-falsify/SKILL.md:123-125`, `orchestration.md:560-562`). Fix: "the readings the dispatch supplied that bound the design, each with the command the Orchestrator ran; name a reading the design needs and the dispatch did not supply under `Tensions`", mirrored into `planner.toml`. Every other row landed faithfully, row 9 by the Orchestrator's disclosed patch.
2. CONFIRMED — every landed line is a directive; the three candidate rationale lines state the failure condition or the artifact the rule reaches.
3. BROKEN — the wave paragraph at `orchestration.md:788-791` reconstructs the procedure § Publishing delegates to `orkestrel-publish/references/wave.md` three lines earlier; it belongs in the skill or in the pre-publish section. Related: `:205-206` and `:258-259` repeat "in a single checkout that is one writer at a time" almost verbatim.
4. BROKEN (planner) — `planner.toml:16-17` carries no evidence clause for measurements while its siblings carry `file:line` and quoted rule text; `grok.toml` pins the `.err` redirect but never states the reading `grok.md:62-63` obliges. The role tables hold.
5. CONFIRMED — the sweep: the substitution-table rows in `writing.md`; two files outside the diff (`enterprise-bootstrap/references/components.md:952`, `orkestrel-polish-surface/references/capture-harness.md:76`); temporal `just` at `orchestration.md:306`, `:366`; `via` as a literal at `names.md:118`; restrictive `just` at `quality.md:70`; nothing in a landed line.
6. CONFIRMED — every status path is Owned or `host.json`.
7. CONFIRMED — the skill shape holds; bridge parity spot-checked verbatim; coverage bound: no frontmatter hunk, no file added or deleted.
8. BROKEN — the `instruction-audit.md:15` hunk traces to no row; the writer filed it as an observation for the next change and the Orchestrator applied it inside the unit with no successor pair on disk (`orchestration.md:341-343`, `:434-436`). Fix: write the successor brief and report naming both Orchestrator edits and retain them before the unit integrates.

Findings outside the claims: F1 `names.md:122` contradicts `:121` without amending it (qualify `:121`); F2 § The engines `:38-39` keeps the permissive "runs the lanes its round names" framing and step 5 lost the checker's non-run recording; F3 the writer-serialization vocabulary landed in one file while "main checkout, sole serial writer" stands in `codex.md:122`, `orchestration.md:336`, `builder.md:3`, `opus.toml:11-12`, and the unowned `implementer.md:3`, `application.md:3`, `implementer.toml:2,11`; F4 `reviewer.md:3` describes the trigger mechanism row 11 deleted; F5 the audit-lane brief section drops the threshold row § Anatomy requires.

Attacked and held: rationale lines as persuasion; row 12's asymmetry (no in-tree specifier for the `claude` CLI); row 16's "both" (a fixed two-slot set); row 18's `tmp/probe/` authority (`tests.md:109-111`); row 7's `<pointer>` narrowing; the skill inventory.

Referrals: gate freshness after the Orchestrator's edits (closed by the verifier's chain and the rebuild at `18eb2fc`); the overlap between item 3 `Attacked and held` and item 1's `CONFIRMED` evidence (ruled: item 3 lists only what no verdict line carries); `architecture.md` row-22 line past the wrap (swept in the fix round).

VERDICT: FAIL 1, 3, 4, 8; outside the claims: F1, F2, F3, F4, F5

# Assess the retained heading finding

Act as an independent read-only objective analyst. Read AGENTS.md, .agents/orchestration.md,
the documentation, writing, quality, and tests rules, and the orkestrel-falsify skill
with its required references. Read the campaign handoff, Ruling 8, the mcp audit's
claim about heading shadowing, and the guide's extractSurface contract in types, guide,
and implementation. Spawn nothing and edit nothing.

Assess the narrow claim: on packed guide 0.0.18 with hash 2b76b363, a demonstration
heading that embeds a class code token before its Classes table makes extractSurface
discard that later table row's Summary. Decide whether the evidence shows a reader
defect against the governing guide/spec, an intentional documented limitation, or
insufficient evidence. Do not design or implement a fix.

Read the actual reproduction at
C:/Users/mikes/WebstormProjects/mcp/tmp/d7n-guide-heading/probe.mjs and the Orchestrator's
run at C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guide-heading.log.txt.
The run exited 1 after its neutral input assertion passed. Raw records are in the log.
Read the retained guide-fix records the mcp scout named in
tmp/cursor/d7n-mcp-reconciliation-scout.jsonl's result projection if needed, without
absorbing unrelated journal events. The existing mcp workaround changes the heading
wording; it does not change the reader.

Report what the current contract requires, whether earlier retained guide fixes cover
this trigger, and the precise release implication under Ruling 8 and the pinned-hash
handoff. Do not claim a new hash, green fleet, or code behavior you did not observe.
Return an evidence-backed verdict with file:line pointers. No installs, commits, pushes,
credentials, or mutating commands. Use git -C for any git reading and forward-slash paths.

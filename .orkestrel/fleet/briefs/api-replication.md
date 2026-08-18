# Unit api-replication — land queued commits via the GitHub REST API

Role: general-purpose executor, one per repo. The git push path is dead (proxy write-lease
outage); the GitHub MCP tools are the authorized write path. You perform the assignment
directly and spawn nothing.

## Shared procedure (package repos: worker, workflow, brief, program, agent, ollama)

Your dispatch names your repo. Work only in `/workspace/<repo>`; its GitHub project is
`orkestrel/<repo>`.

1. Confirm the local state: `git log --oneline -1` and `git rev-list --count origin/main..HEAD`
   (expect exactly 1). `git diff origin/main..HEAD --name-only` is your file list.
2. Capture the full commit message verbatim: `git log -1 --format=%B` — including every trailer
   line. This exact text is the API commit message.
3. Read every changed file's working-tree content with the Read tool (full file, no offset), and
   push ALL of them in ONE `mcp__github__push_files` call (load its schema via ToolSearch
   "select:mcp__github__push_files,mcp__github__create_branch" first): owner "orkestrel",
   repo "<repo>", branch "main", files = the complete set, message = the captured text.
   Content must be byte-faithful: preserve tabs, exact blank lines, and unicode as Read shows
   them; never reflow, trim, or normalize anything.
4. After the push succeeds, `mcp__github__create_branch` with branch
   "claude/orkestrel-fleet-orchestration-b0t5cy" from_branch "main". If it reports the branch
   already exists, report that instead of failing.
5. Do NOT touch the local git state — no fetch, no reset, no commit. The Orchestrator verifies
   and reconciles.

## Output

- The repo name, the push_files result (new commit sha), and the create_branch result.
- The file count and total bytes pushed.
- Any file you could not read or push, named exactly.

## Deviation contract

Stop and report on any API error you cannot resolve by one retry, on a file over 400KB, or on
an ahead-count other than 1. Everything else is yours to execute.

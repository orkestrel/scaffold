## Your task

Read every listed file in full. Produce ONE ROW PER EXPORTED SYMBOL declared in those files.

For each exported symbol report exactly these fields, pipe-separated, on one line:

`REPO | FILE:LINE | NAME | KIND | SIGNATURE | BEHAVIOR | HOST | GENERAL | DUPLICATE`

- `KIND` — one of: function, const, interface, type, class.
- `SIGNATURE` — the exact declared signature, parameters and return type, collapsed to one line.
- `BEHAVIOR` — at most 15 words describing what it does, from reading the body. Not a guess from the name.
- `HOST` — `core` if the body touches no `node:*` import, no DOM/`window`/`document`, and no Vue; `server` if it touches `node:*`; `browser` if it touches DOM or Vue; `styles` if it only reads CSS/computed style.
- `GENERAL` — `general` if the body encodes no knowledge of this package's own domain types and any workspace could use it; `specific` if it names or shapes this package's own domain.
- `DUPLICATE` — `exists:<name>` when it duplicates or near-duplicates a symbol already exported by @orkestrel/test (listed earlier), and append `diff:<what differs>` when behavior differs; `none` otherwise.

Then add these sections:

### Clusters
Group symbols across the files you read that do the same job under different names, or the same
name with different behavior. One line per cluster: the job, then every `repo:name` member, then
the behavioral differences between members. This is the most valuable part of your report — be
exhaustive and do not merge two clusters that only look alike.

### Notable bodies
For any symbol you marked `general` whose body is longer than about 25 lines, give three to six
lines describing the mechanism precisely enough that an engineer could reimplement it without
reopening the file: what it allocates, what it polls or awaits, how it cleans up, what it throws.

### Unknowns
Facts you could not establish, named as unknowns. No recommendations.

## Rules

- Read-only. Change nothing. Run no `git` command that writes.
- Never dump raw file contents. Every claim carries a `file:line` pointer.
- Do not design an API, do not recommend a consolidation, do not rank anything. You return evidence.
- If a listed file does not exist, write `MISSING <path>` and continue.
- Report every exported symbol. Completeness matters more than brevity.

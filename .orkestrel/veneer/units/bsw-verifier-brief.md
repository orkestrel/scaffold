# Gate evidence — `verifier` on Sonnet, B-SWEEP

`verifier` on Sonnet (native subagent, read-only, no edit or write tools; never fixes a failure).
Subject: the worktree `/home/user/veneer-bsw` (uncommitted writes over `aca0423`). Run every
command below from `/home/user/veneer-bsw` with
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
on the shell's path, in this order, and stop at nothing: `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:policy`. Report each
command's exit code and its summary line (the counts Vitest prints), and the exact failure excerpt
for any non-zero exit. Then run `git -C /home/user/veneer-bsw status --porcelain` and
`git -C /home/user/veneer-bsw diff aca0423 --stat` and report both verbatim. Spawn nothing; edit
nothing.

Output: a table of command, exit, and reading; the two git outputs; nothing else.

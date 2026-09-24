# Unit PREFLIGHT-HOST (`pl`), brief 3 — round 3: one guide sentence

Resume in `/home/user/veneer-pl`. Round 2's audit (`/home/user/scaffold/.orkestrel/veneer/units/pl-audit-2-verdict.md`)
confirmed every code claim and found one false sentence: the paragraph `pl-shared-2.patch` rewrites (around its line 20)
says the remaining rows concern form controls and the document root, where the table also records the `iframe` display
and vertical alignment, the `svg` display, and the `table` border colors. Make that sentence true in one plain sentence,
write `pl-shared-3.patch` superseding `pl-shared-2.patch` whole, and run `npm run test:guides` and the formatter check on
the patched guide in a scratch copy. Report in `/home/user/veneer-pl/tmp/units/pl-report-3.md` and as the final message:
the sentence before and after, and each command with its exit and result line. A few lines. Perform it directly and spawn
nothing; no commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

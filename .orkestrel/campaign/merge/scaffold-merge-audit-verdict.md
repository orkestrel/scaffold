# Audit verdict — unit merge-scaffold (2026-09-03)

Lane: `checker` on Claude Sonnet, clean context, read-only. Subject: the uncommitted merge of `origin/main` into `claude/orkestrel-npm-audit-deps-14ibta` in `/home/user/scaffold`. Brief: `scaffold-merge-brief.md`. Evidence: `scaffold-merge-evidence.txt`, `scaffold-merge-components.diff.txt`. Engines: the Sol bench is dark (`codex` absent); the objective lane is the Sonnet checker here because the subject is mechanical (byte identity, placement, markers), and the Orchestrator's own engine is not the auditor.

## Checker's verdicts (immutable, verbatim)

1. CONFIRMED — no conflict marker remains outside `.orkestrel/campaign/conform/`; tree-wide grep empty; `ROADMAP.md`, `carry.md`, `host.json` read clean.
2. CONFIRMED — `guides/contract.md`, `package-lock.json`, `package.json`, and the three fixtures are byte-identical to main's copies.
3. CONFIRMED — `ROADMAP.md:114-122` inserts the fleet publish wave row verbatim after the contract row and before `## 2.`; the diff against main is that nine-line addition only.
4. CONFIRMED — `carry.md:1-38` is main's register verbatim, `:39-44` the separator naming both campaigns, `:45-291` the branch's register verbatim; 38 + 247 + 6 = 291.
5. BROKEN as worded — `.agents/skills/orkestrel-prove-journey` carries no `references/components.md`, so the claim's pairing of that file with both directories is false on its face; the `enterprise-bootstrap` half is CONFIRMED as pure `via` → `through` substitutions at `components.diff:9,19,28,37,46` with nothing removed.
6. CONFIRMED — `host.json` carries no marker; five spot-checked paths resolve.

Finding F1: the components diff corroborates only `enterprise-bootstrap`; verify directly whether `orkestrel-prove-journey` diverges from `origin/main`, and restate the ruling to name only `enterprise-bootstrap` if it does not.

Terminal line returned: `VERDICT: FAIL 5; outside the claims: F1`

## Orchestrator's ruling

Claim 5 was descriptive of the wrong shape: it meant that across the two skill directories the only file differing from main is `enterprise-bootstrap/references/components.md`, and it read as if each directory had one. The checker's own reading confirms the intended claim: no other file in either directory diverges, and F1's prescription was run — `git diff --cached origin/main --stat -- .agents/skills/orkestrel-prove-journey .claude/skills/orkestrel-prove-journey` is empty, so `orkestrel-prove-journey` is byte-identical to main. The brief goes on trial, not the subject; the merge stands and commits. The merge commit message names main's skill revisions as the base without pairing the components file with both directories.

Ruling: ACCEPT the merge resolution; claim 5 restated as "the two skill directories are byte-identical to main except `enterprise-bootstrap/references/components.md`, whose differences are the writing-rule substitutions" and CONFIRMED on the checker's evidence plus the empty diff.

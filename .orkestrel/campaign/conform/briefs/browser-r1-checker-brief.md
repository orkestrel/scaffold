# Grok checker lane — unit conform-browser, audit round 1

Read-only. You are the mechanical conformance checker (the `checker` job routed to Cursor Grok, the first step of the tedious-work ladder): acceptance criteria, letter-of-the-law conformance on the changed files, scope honesty, and guide parity — evidence-first, one piece of evidence per item, no judgment call. A question that needs judgment becomes a referral, never a verdict. Never create, change, or delete a file; never run a command that changes the tree.

## Subject and evidence

- Audit brief: `/home/user/scaffold/tmp/units/conform/conform-browser-audit-brief.md` — read it in full; its § Claims is the subject. Rule the checker's claims: 1, 3, 5, 7, and 9. Do not rule claims 2, 4, 6, and 8; write `not held` for each.
- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-browser-brief.md` (§ Rows, § Fleet rows, § Scope).
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-browser-report.md`.
- Evidence: `/home/user/work/evidence/conform-browser.diff` and `/home/user/work/evidence/conform-browser.status`; the proof files under `/home/user/work/evidence/browser-proofs/`.
- The tree: `/home/user/fleet/browser`, with the unit's uncommitted changes in place. Exclude `node_modules/**` from every sweep.
- Law: `/home/user/scaffold/AGENTS.md` and the rule files a row cites under `/home/user/scaffold/.claude/rules/`.

round 1, the first audit round; the unit was a direct Opus implementer on the closure staged 18:36 UTC, stopped by the API spend limit at 19:0x UTC and resumed at 19:11 on its tree; browser-obj-8, browser-obj-9, and browser-subj-15 are noop as the refuter's ruled exceptions; fleet-F1 and fleet-F2 noop with their sweeps named; the service project block matches the scaffold plan byte for byte and its setupFiles follow the vendored tests/config.test.ts canon rather than the finder's list (a recorded correction), tests/setupService.ts resolves readiness on call so a proof can import it, and the moved live-browser cases dropped their per-case timeouts for the project's 120_000; published helpers renamed or removed (attributeOfBrowserNode deleted; parseBrowserChord, findInStore, defaultInstallPaths, windowsRoots, defaultStoreBases renamed) with no source consumer per the reconcile sweep, so the breaking entry is a table and no consumer patch is owed; the unit's observations outside its rows (untested build* exports, probePathNames, via in tests/setupServer.ts, the scripts/service.sh the vendored comment names) are a follow-on, recorded, not refuted; the diff is 5642 lines and the status 48 entries, so map the rows from the report and the status and open the diff only at each row's site; the whole-suite reading is the unit's own exec observation

## Method

Read the tree, not the report: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`; a quoted command and exit code inside the report is the writer quoting itself. Run your own sweeps (word boundary, and case-insensitive over `-s`, `-ed`, `-ing` inflections) and name the pattern and the paths behind every sweep result, including a clean one. Read every claim against the tree as it stands; where the brief's line numbers have moved, report the current line beside them.

## Output

Per claim, in order 1 to 9: `CONFIRMED`, `REFUTED`, `UNRESOLVED`, or `NOT-EVIDENCED` for the gate reading claim 8 asks of a read-only lane (which you do not hold), or `not held` for claims 2, 4, 6, and 8 — each with `file:line` evidence or the sweep that produced it, under 120 words. Then `Findings outside the claims`, each with the exact prescription that closes it, or `none`. Then `Referrals`, each a question specifically evidenced and addressed to the Orchestrator. Then exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Then `Journal` (leave for the driver) and `Deviation` (any tree change your containment shows, any file you could not read).

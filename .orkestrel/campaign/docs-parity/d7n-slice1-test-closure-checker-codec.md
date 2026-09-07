Lane held: checker codec

**Claim 1 — Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file).**
PASS. `d7n-codec-converge-fix.status.txt` lists only `README.md` and `guides/codec.md` modified, matching the brief's owned pair (`/home/user/scaffold/tmp/units/d7n-codec-converge-fix-brief.md:15`). The diff (`d7n-codec-converge-fix.diff.txt`) touches only those two files. Every hunk in the diff is reproduced verbatim in the current tree at `/home/user/fleet/codec` (verified `README.md:1-30` and `guides/codec.md` lines 24, 54, 106, 126, 139, 151, 199, 219, 252, 325, 420-441, 453, 461, 463 against the diff and the report's table — all identical).

**Claim 2 — The report's citations match the tree the unit left; the report states no count in prose; the pin is described only in the words the file carries.**
PASS. All 19 cited line numbers in the report's F7 table (`guides/codec.md:24,54,106,126,139,151,199,219,252,325,420,426,431,437,439,441,453,461,463`) were checked directly against the tree and match exactly, including the `encodeWindows1252`/`decodeWindows1252` grounding claim, confirmed reading `WINDOWS_1252_HIGH` at `src/core/helpers.ts:562` and `:603`. The report's own prose carries no count: every numeral/quantifier word in the report body (`d7n-codec-converge-fix-report.md`) is either a backticked code token, a quoted before/after phrase (data, exempt), or a `both` naming a fixed two-member set already named in context (lines 133, 137 — "both files" = the two owned files), which is the exempt fixed-axis case the report's own § Sweep documents. No bare count in authored prose.

**Claim 3 — The `## Tests` section (sse) ... the guide's counts and the README skeleton (codec) — each present as the audit's finding asked.** (codec-scoped portion only)
PASS. `guides/codec.md:24` reads "both faces keep the same laws" (F7 site 1) and `:126` reads "Each face keeps the round-trip and canonical-form laws" (F7 site 2), both confirmed in the live tree. `README.md` carries the pilot's skeleton: H1 `# @orkestrel/codec` (`README.md:1`), unchanged blockquote and onboarding paragraph, then `## Install` (`:13-17`) and `## Requirements` (`:19-23`) with zero-runtime-dependency and `engines`-sourced Node range (`>=22.12.0`), both verified true against `package.json` (`engines.node: ">=22.12.0"`, no `dependencies`/`peerDependencies` key).

**Findings outside the claims**

- Two observations in the report are honest, correctly scoped deferrals, not defects in this unit: the `oxlint` criterion is structurally unreachable for a Markdown-only change (confirmed baseline-identical red in the report), and `tests/guides.test.ts:374`'s case name `drives both laws` now reads stale against the renamed heading — both are named as a successor's work and `tests/` is off-limits to this unit.
- The report's re-wrap note (`:126-128`, `:249-252`, `:426-435`, `:437-446`) is consistent with the diff; no sentence outside the cited table changed in a way the diff does not show.

VERDICT: PASS

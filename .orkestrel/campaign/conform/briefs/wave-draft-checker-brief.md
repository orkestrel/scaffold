# Lane brief — check the publish-wave draft against the manifests and the registers

Role and engine: `checker` held by `grok` (Cursor Grok 4.6), read-only mechanical conformance evidence. Never create, edit, or delete a file; never run a command that changes a tree. Perform the reading directly and spawn nothing.

Subject: `/home/user/scaffold/.orkestrel/campaign/conform/units/wave-draft-grok.result.md` § Draft, the publish-wave preparation report a Grok lane drafted from `/home/user/scaffold/.orkestrel/campaign/conform/briefs/wave-draft-brief.md`.

Claims to attempt to refute, each with `file:line` evidence:
1. Every declared version and every next version in the draft's tables match the `version` field of `/home/user/fleet/<pkg>/package.json` (scaffold: `/home/user/scaffold/package.json`) with the patch component raised by 1, and every `dist` moved, `README` moved, `changed`, and tip cell matches the row in `/home/user/scaffold/.orkestrel/campaign/conform/inventory-4.md`.
2. Every peer edge the draft names matches the `peerDependencies` field of the package's manifest, every reorder the draft derives from a peer edge is one the catalog's layer order would violate (`/home/user/scaffold/.claude/agents/orkestrel.md` catalog table), and no peer edge in any manifest is missing from the draft.
3. Every re-pin row names a range that exists in the named manifest (`dependencies`, `devDependencies`, or `peerDependencies`) and names the target's next version from claim 1.
4. Every obligation the draft lists traces to a bullet under `/home/user/scaffold/ROADMAP.md` § 4 "The publish wave's obligations" (`ROADMAP.md:286-325`) or to `.agents/orchestration.md` § Publishing the fleet, and no bullet under that ROADMAP section is absent from the draft.
5. The draft's prose carries no `should`, `via`, `e.g.`, `i.e.`, `currently`, `now`, `new`, `above`, `below`, and no count of a growable set stated as a number (a version, a date, a line number, and an inventory cell are values).

Output shape, exactly: per-claim `CONFIRMED` or `REFUTED` with the failing input and the smallest correct fix; then `## Referrals` for anything outside the claims; then `VERDICT: PASS` or `VERDICT: FAIL <claims>`. Nothing else.

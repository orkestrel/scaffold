# Record the native identity collision

Rule the intermittent directory-uniqueness failure as a reproduced identity defect, not a flaky test. On Windows Node v24.20.0, the Orchestrator ran tmp/probe/anchor-identity.mjs against the built release helpers. The instrument allocated live siblings, read numeric and bigint metadata, renamed the original aside while keeping it allocated, and installed the replacement at the original path.

Native inode54324670505422941 and inode54324670505422943 each became numeric54324670505422940 on device782266666. The actual built matchesAnchor returned true after replacement; the captured native bigint identities differed. Untouched and missing-path controls returned true and false respectively. The collision occurred at iteration55 in39.1585ms. Full report: tmp/probe/anchor-identity-result.json. The instrument removed only its guarded owned temporary root.

The predecessor full gate caught the pre-rename collision. Named, project and successor full-gate replays passed unchanged; those greens do not refute the measured identity loss. The Vue source/proof unit remains independently accepted on its claims and its final gate is green.

The defect belongs to WriteAnchor and predates this campaign. Ask the owner whether to include a narrow native bigint repair before release or carry it separately, per AGENTS.md's fixed-scope rule. Keep that decision pending; do not expand the source unit without it. Continue independent Roughnotes proof preparation and review while the decision is pending.

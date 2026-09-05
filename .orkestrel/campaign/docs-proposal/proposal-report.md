# Unit docs-proposal — report

Returned by `implementer` on Opus 5 on 2026-09-05 (brief: `tmp/units/docs-proposal-brief.md`); captured verbatim by the Orchestrator.

Every outline section is present and filled, and only the owned file changed.

- `Written`: `/home/user/scaffold/PROPOSAL.md`, `wc -l` → `1203`.
- `Format`: `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` → `All matched files use the correct format.` (exit 0).
- `Rulings applied`:
  - **R1** — Surface row is the TSDoc first sentence verbatim, `{@link X}` as `` `X` ``, `SUMMARY_VERBS` refused, tagline stays authored: § Option 1 — Mechanism (the rule-amendment paragraph and the refusal paragraph), § Option 1 — Worked example (the `createBlueprint` row), § Recommendation and order (the amendment as a decision), § Refused on the evidence.
  - **R2** — extractor is `@orkestrel/guide`'s text-only scanner; compiler API is the control, never a shipped dependency; api-extractor doc model refused as a reader: § Option 1 — Mechanism, § Option 2 — Mechanism (the extractor-choice paragraph), § What the evidence shows / The constraints every option must satisfy (C1, C5), § Refused on the evidence.
  - **R3** — carrier is a marker-bounded region modelled on `<!-- orkestrel:catalog -->`; sibling reference file refused: § Option 1 — Mechanism, § Refused on the evidence.
  - **R4** — the `render` direction lives in `@orkestrel/guide`, scaffold seeds and vendors, named as a proposed shape: § Option 1 — Mechanism, § Option 1 — Migration, § Recommendation and order (the render's home as a decision).
  - **R5** — Stage 1 / Stage 2 / Stage 3 and the carry-forward fallback: § Option 1 — Mechanism (the stages paragraph), § Recommendation and order.
  - **R6** — ruling on every check, tautologies named with their replacements, presence guards named as presence-only: § Option 1 — Checks (both tables).
  - **R7** — Option 3 as the floor, its instrument set, and the vendored-only release: § Summary, § Option 3 — Mechanism, § Option 3 — Migration, § Recommendation and order.
  - **R8** — `llms.txt` refused as an authored index and permitted only as a generated digest: § Refused on the evidence, § Option 2 — Humans and agents.
  - **R9** — one artifact for both readers, voice law stated once, hover/row/rollup carry one sentence, agent entry unchanged: § Option 1 — Humans and agents.
  - **R10** — coverage of the live drifts: § What the evidence shows / Where one fact lives at more than one site, § Option 1 — Risks and open questions (the drifts Option 1 does not close), § Option 2 — Risks and open questions (the drifts it does close), § Option 3 — Worked example.
- `Deviations`: none.
- `Flags`:
  - Line 366 (`§ Option 1 — Mechanism`): "so one file can carry several regions" is my inference from the marker text carrying an environment and kind qualifier. The evidence shows `Materializer.catalog` splicing one region in one file only; the multi-region splice is unproven and is named as such in the risks and in Probe 3. The mechanism sentence reads more settled than the risk row it depends on.
  - Line 388 (`§ Option 1 — Mechanism`): "One rule amendment is required" states a requirement the evidence supports for Option 1 and Option 2 but only partly for Option 3 — Option 3's summary-equality pairing could instead be written against the existing noun-phrase rule with a specified transform. I recorded the alternative under § Recommendation and order rather than weakening the sentence.
  - Line 526 (`§ Option 1 — Humans and agents`): "Option 1 adds one *derivation* rule … and no second *statement* site" rests on reading the renderer as carrying no restated convention. No renderer source exists yet, so the claim binds the first unit rather than describing measured code.
  - Line 1067 (`§ Option 3 — Risks and open questions`): "A term denylist has a membership rule the version catalog lacks" is my judgment, not a measurement. The `ROADMAP.md:139-142` precedent records only that the version-catalog half has no honest mechanical form; whether a substitution-table sweep reds a healthy reference is unsettled until the instrument runs with its controls.

# Verdict: h12 (s11b middleware completion findings), verification round 2 supplement

Two blind Opus lanes (objective, subjective) re-ruled all s11b findings from primary evidence;
lane outputs are `instruments`-adjacent at `/home/user/work/h12-{obj,subj}-verdicts.json` and
reproduced in the lane transcripts. The lanes converged on substance for every finding; the
Orchestrator reconciled the label disagreements (s11b-01, -03, -15, -16), each of which both
lanes agreed required no code change.

## Final rulings

- **DRIFT, repair stands**: s11b-05 (two spellings of one type in one function), s11b-09
  (live mutable arrays returned under a readonly declaration; the leaf record and the package's
  own test fixture freeze, the shipped middle layer does not), s11b-12 (guide states a 415
  rejection rule the code, its TSDoc, and a pinning test all contradict — the guide moves),
  s11b-14 (a second containment implementation in the same file whose sibling's TSDoc argues
  against exactly that technique; diverges on win32 case folding).
- **DRIFT, repair amended**: s11b-06 and s11b-07 (both defaults centralize into
  `src/server/constants.ts`; the amendment adds the guide Constants rows parity requires, and
  types the dotfiles constant `NonNullable<StaticOptions['dotfiles']>`).
- **DRIFT-RESHAPE** (defect real, original repair corrected): s11b-02 (documentation-only:
  state the `get` shape obligation on `SessionStoreInterface`; do not add a second guard —
  validation deliberately lives in the store, per `createDatabaseSessionStore(table, isSession)`),
  s11b-04 (extract `resolveContainedRealPath`, but keep the `realpath` memo inside each `try` —
  the proposed hoist would break the documented never-throws contract), s11b-10 (extract
  `#consumeFile`/`#consumeField`; a shared scan only if parameterized by sink so file bytes
  still drain to disk; keep the pre-read file-count increment that trips the limit before
  staging), s11b-11 (fix the prose at both sites: `mime` is sniffed-else-declared-else-default
  and `validated` reports which; the proposed code change would discard the declared type for
  every unsniffable upload), s11b-13 (extract `#discard` with the guarded unlink `#cleanup`
  already uses; the `indexOf(-1)` hazard is latent, not live — `randomUUID` paths are unique).
- **EXCEPTION**: s11b-03 (CSRF cookie attributes are deliberate and test-pinned;
  `httpOnly: false` is load-bearing for double-submit, `Path=/` widens rather than narrows, and
  the proposed `cookie` option collides with the shipped name key; optionally document the fixed
  attributes).
- **INVALID**: s11b-01 (the function-declaration ban enumerates function bindings, not
  object-literal methods, and `test/src/server/factories.ts:67` is shipped fleet precedent for
  an interface-typed literal; the internal intent flags are not consumer-addressed state),
  s11b-08 (the "three stores that can disagree" mechanism is unreachable — both byte maps are
  written in the single miss branch and the tag map memoizes a derivation), s11b-15 (no cited
  rule reaches the signature; the name already satisfies `{verb}{Noun}` and the sibling resolver
  shares the shape; the call-site wasted-work note is an optional cleanup), s11b-16 (the
  centralization rule governs module-scope declarations; the signature set is documented in
  TSDoc and `matchesBytes` is the extracted, exported, tested reusable part).

The original auditor ruled all s11b findings CONFIRMED; verification upheld eleven (five with
corrected repairs), granted one deliberate exception, and invalidated four. The objective
referrals from s11b (asset-cache growth, `#staged` reachability, SPA fallback header asymmetry)
remain open for the consolidated referral pass.

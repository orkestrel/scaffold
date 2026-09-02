# Audit verdict — unit voice-codec

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `8adc908`
(`units/voice-codec.diff`, `units/voice-codec.status`, `units/voice-codec-report.md`).
Rewritten per the writer: imperative 0, verbless 5, name 0, returns 0. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1)

1. BROKEN — meaning changed in the WINDOWS_1252_HIGH hunk. Four of five rewrites keep meaning exactly (constants.ts:9, :14, :94, :100). The fifth, constants.ts:131, replaces the noun phrase "Windows-1252 high-band byte to code point lookup, keyed by the byte and transcribed from the WHATWG Encoding index for the code page." with "Maps each Windows-1252 high-band byte to its code point, transcribed from the WHATWG Encoding index for the code page." The added quantifier "each" asserts coverage of the whole 0x80-0x9F band; constants.ts:135-137 in the same block states that 0x81, 0x8D, 0x8F, 0x90, and 0x9D carry no entry, constants.ts:124 calls the omissions the coding, and the table at constants.ts:141-169 holds no such entries. The dropped phrase "keyed by the byte" is not a defect: the new verb states the same byte-to-code-point direction. Fix: "Maps a Windows-1252 high-band byte to its code point, transcribed from the WHATWG Encoding index for the code page." or "Maps the defined Windows-1252 high-band bytes to their code points, …".
2. CONFIRMED — Holds (constants.ts:9, :94) fits a const binding whose value is the alphabet; Maps (constants.ts:14, :100, :131) fits a frozen Record. No rewritten sentence carries its identifier; BASE64_LOOKUP and HEX_LOOKUP shed the shared word "lookup". No verb misdescribes its symbol.
3. CONFIRMED over an empty set — the diff changes no @returns line, every boolean @returns already reads the required form at validators.ts:19,39,60,96,118,140,165, and every other @returns in helpers.ts returns a non-boolean, so no candidate was left unrewritten.
4. CONFIRMED — all five rewritten sentences were verbless noun phrases; helpers.ts and validators.ts already conformed and are untouched; git status lists src/core/constants.ts alone; every @remarks, @param, and later line appears in the diff as context; no non-comment token changed.

Findings outside the claims:

A. The stated reason for the two block re-wraps does not hold; the re-wraps are still right. The launch tree's HEX_ALPHABET single-line block ran to roughly 107 characters against the printWidth of 100 in /home/user/fleet/codec/.oxfmtrc.json:7 with format:check green, so oxfmt does not wrap comment text and the width did not force the change. The re-wraps match every other block in the file, so keep them; treat the width rationale as unproven rather than as fact. No change required.

B. "Maps each hex character" at /home/user/fleet/codec/src/core/constants.ts:100 overstates coverage the same way, one degree weaker. HEX_LOOKUP holds lowercase entries only (constants.ts:104-120), and constants.ts:90 calls that omission load-bearing because it is what makes decodeHex refuse 'AB'. The sentence scopes itself through {@link HEX_ALPHABET} in the same clause and the launch text was no more precise, so claim 1 does not turn on it. Close it in the same edit: "Maps each lowercase hex character to its 4-bit value, transcribed against {@link HEX_ALPHABET}; …".

C. The three "Maps each …, transcribed against …" sentences leave the participle without its head noun: removing "lookup" left "transcribed" attaching to "value" or "code point" rather than to the table. Low severity, readable, and the alternatives are clunkier than the drift. Recorded so a later pass does not rediscover it. No change required.

D. Holds departs from the wave brief's transform table at .orkestrel/campaign/fix/tsdoc-wave-brief.md:42, which prescribes "Names …" for a constant, and the departure is right: BASE64_ALPHABET does not name the alphabet, it is the alphabet. Keep Holds, and expect a mechanical checker reading the wave brief to flag it.

E. Guide voice and product coherence intact. A case-insensitive sweep of "lookup", "alphabet, index-ordered", and "high-band" across /home/user/fleet/codec/guides returns nothing from codec.md but the unrelated line 63, which describes the alphabets and reverse lookups as module data outside the public API; that matches src/core/index.ts:1-2, which exports validators and helpers alone. No parity surface moved.

Referrals: none. Nothing found needs the objective lane.

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5, clean context, read-only, ruling on the diff and the tree rather than the writer's report.

## Checker lane (PASS)

1. CONFIRMED — every changed line in /home/user/scaffold/tmp/units/voice/voice-codec.diff (hunks at lines 5-20, 21-37) is inside a `/**...*/` or `//` doc block; no `-`/`+` pair touches a code token. Only comment prose was added/removed/rewrapped.
2. CONFIRMED — every backtick/`{@link}` token in the diff is byte-identical before and after: `{@link BASE64_LOOKUP}` unchanged (diff line 9-12), `{@link BASE64_ALPHABET}` unchanged (diff line 17), `tests/src/core/helpers.test.ts` path unchanged (diff lines 17-18, 33-36). No URL present in the diff.
3. CONFIRMED — /home/user/scaffold/tmp/units/voice/voice-codec.status:1 lists only ` M src/core/constants.ts`; no entry under tests/, guides/, README.md, package.json, package-lock.json, .claude/, configs/, tests/setupPolicy.ts, or tests/policy.test.ts.
4. CONFIRMED — Grep of /home/user/fleet/codec/src for the imperative-verb-first-word pattern and for `@returns Whether|`true`|true ` returned no matches; /home/user/fleet/codec has no app/ directory (Glob app/** empty), so the sweep is vacuously satisfied there too.
5. CONFIRMED — /home/user/scaffold/tmp/units/voice/voice-codec-report.md:53-59 quotes the exact command and exit code for every gate (format:check 0, lint:check 0, check 0, build 0, test 0), per the claim's rule that quoted evidence yields CONFIRMED; the Orchestrator's own landing chain remains the authoritative run.

Findings outside the claims:

No findings outside the numbered claims. The diff is a single, small, comment-only change confined to src/core/constants.ts; scope, evidence, and gate reporting all check out against the tree and the supplied artifacts.

## Orchestrator

Subjective claim 1 broke on the `WINDOWS_1252_HIGH` sentence: the rewrite added `each`, asserting coverage of a band whose gaps the same block names. Ruled with the lane: `Maps a Windows-1252 high-band byte …` (fix-up brief `voice-codec-fixup-brief.md`, builder on Sonnet). Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**

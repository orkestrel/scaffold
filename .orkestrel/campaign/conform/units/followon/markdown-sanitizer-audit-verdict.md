# Audit verdict — unit markdown-sanitizer (2026-09-03)

Subject: the uncommitted follow-on in `/home/user/fleet/markdown` on the landed tip `f45b004` (brief `briefs/followon/markdown-sanitizer-brief.md`, fix briefs `briefs/followon/markdown-sanitizer-fix1-brief.md`, `-fix2-brief.md`, and `-fix3-brief.md`, audit briefs `briefs/followon/markdown-sanitizer-audit-brief.md`, `-r2-audit-brief.md`, and `-r3-audit-brief.md`, report `units/followon/markdown-sanitizer-report.md`, evidence `/home/user/work/evidence/conform-markdown.diff` and `conform-markdown.status`, readings and captures under `/home/user/work/evidence/markdown-proofs/`). Writer: `builder` on Claude Sonnet for the unit and every fix round.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/markdown-sanitizer-checker-luna.md`) | FAIL 5, 9 |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/followon/markdown-sanitizer-r2-checker-luna.md`), after fix round 1 | FAIL 1, 5, 9 |
| 3 | checker | `checker` on GPT-5.6 Luna (`units/followon/markdown-sanitizer-r3-checker-luna.md`), after fix round 2 | FAIL 5, 9 |

The objective and subjective lanes did not run: the unit adds one executable fence and its transcription for prose claims the conformance audit found under no fence, so the round's judgment is mechanical and the checker is the lane that rules it. Every lane ran on GPT-5.6 Luna, the tedious-work ladder's second rung.

## What each round closed

- Fix round 1 (`units/followon/markdown-sanitizer-fix1-result.md`): the fence gained the refused image and its comment value read from a real run; the sentences claiming an unsafe subtree removed from a markdown-sourced document were rewritten to what the pipeline does (the projection produces no raw HTML element; hostile markup renders as escaped text; html's floor judges the elements the projection does produce).
- Fix round 2 (`units/followon/markdown-sanitizer-fix2-result.md`): the reading `sanitizer-read-3.txt` was captured from the fence's verbatim source and equals the fence's comment byte for byte; the sentences naming schemes and attributes the fence does not show were narrowed and point at `guides/html.md` for the floor's full list.
- Fix round 3 (report only): every prose change carries its literal old and new text, and the authored prose states no count.

## Rulings

- Claim 1 (round 2): closed by `sanitizer-read-3.txt`; round 3 confirmed it.
- Claim 3 (every round): confirmed — the executing case, its presence guard, the red control on a planted value, and the green run.
- Claim 5 (round 3): the checker read "**The one widening: `src`.**" as still claiming what the fence does not show — the exact allowlist widening, `URL_ATTRIBUTES` membership, and the floor running on a hand-built node. Ruled satisfied in substance: the paragraph describes the sanitizer call's configuration, which the `text` pipeline fence transcribes from the source (`[...SAFE_ATTRIBUTES, 'src']`), and html's constants, which are html's guide's parity domain; every behaviour the paragraph claims about rendered output — the `https:` `src` kept, the refused `src` dropped with the element and `alt` kept — is shown by the fence's comment values read from a real run. A sentence about a call's configuration is a source fact, and `documentation.md` § Parity asks for the executed assertion that would break if a behaviour claim went false, which the transcription now carries for each behaviour.
- Claim 7 (every round): confirmed — the status lists the two owned files and the read scripts import the built output.
- Claim 9 (round 3): closed by fix round 3; the Orchestrator read the corrected report's sweep record (every remaining number word is a quoted phrase, a device name, or a `both` naming its members) rather than dispatching a fourth checker, because the round's subject was the report's wording alone.

## Structural claims

Claims 2, 4, 6, and 8 are not held by the checker. Claim 8's gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/markdown`, recorded in `units/followon/land-conform.log` and the landing commit named in the state table.

## Terminal

PASS (claims 1, 3, and 7 held by the round-3 checker; claim 5 ruled satisfied in substance; claim 9 closed by fix round 3 on the Orchestrator's reading), the deciding run at landing read every gate exit 0 (landed as markdown `8823dc1`).

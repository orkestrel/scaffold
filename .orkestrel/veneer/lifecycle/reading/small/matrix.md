# Small-model reliability: the experiment matrix

Opened 2026-10-07 on the user's directive: the 2B (`qwen3.5:2b-q4_K_M`, temperature 0, `num_predict` 256, `num_ctx` 16384) must use the browser toolset reliably; where the 4B stumbles too, the implementation is at fault. Every row runs live through ollama `tmp/probes/store-live.test.ts` (whole attempts through the real harness, one variant at the provider boundary, fixed ports) unless it names another instrument. The GPU runs one row at a time.

## Evidence the matrix rests on

Ollama `tmp/codex/census.md` (230 attempts): the 2B's cart and checkout runs all open with `type` on a link or button and recover (33 of 33 each; the 4B never); every failed paging attempt is a single `read` (18 of 18); the 2B journey fails on a refused `journeys{}`, repeated `save` after its own save, stale-reference loops on a seed reference after the page changed (`e4`, 17 times on port 49171 of `journey-T0`), an invented tool, and one ollama 500 on malformed tool-call XML; the 4B's journey attempt 1 clicked the seed's `e3` right after the page changed.

## Rows

| Row | Class | Variant | Instrument | Status | Result |
| --- | --- | --- | --- | --- | --- |
| T0 | baseline | the `from 1` prompt, limit 8 | store-live, 2B, journey, 8 ports | done | **0 of 8.** Every port `partial`: the opening turn spends its 8 calls before the model answers (the analyst's finding), and `converseStore` carries the flag. Also: stale `e4` on 4 ports (the buyer's name typed into the seed's search box), the ollama 500 on 2, `save` loops after every follow-up on 5 (`ended` 2–3), an extra submission or a replay stopped at a product link on 3. Record `tmp/codex/store-live/journey-T0.md`. |
| JL | opening-turn budget | per-turn call limit 12 (harness option `limit`, uncommitted) | store-live, 2B, journey, 8 ports | queued | |
| JS | save conflict | journey sentence `Call save only when the user asks … after save, edit, or replay succeeds, answer without saving again.` | same | queued | |
| V4 | save after saved | refusal `Nothing is recording, so there is nothing to save; "…" is already saved. Answer the user.` | same | queued | |
| JP | task wording | `click the Cart link, then complete checkout` in place of `then open the cart before you complete checkout` | same | queued | |
| TB, TB2 | type refusal advice | the `type` refusal names the fields in view (`to type, use textbox "Full name" [ref=e23]`) instead of `call click for a link`; TB2 keeps the click advice when no field is in view | same | queued | |
| JA | combined | JP, V4, TB2 | same | queued | |
| JB | combined | JA and V1c | same | queued | |
| JC | combined | JB, JS, and limit 12 | same | queued | |
| V1a, V1b, V1c | type on links and buttons | the planner's `click` and `type` copy (a), the prompt order (b), both (c) | store-live, 2B, all five tasks, 16 ports | queued | |
| V5 | tool count | journey advertises no `capture`, `forget`, `dialog`, `switch`, `navigate`, `press` | store-live, 2B, journey, 8 ports | queued | |
| V6 | plain-read early answer | a numbered row `61–80: not shown yet; call read with from 61.` replaces the partial-view header line | store-live, 2B, paging, 16 ports | queued | |
| S2 | stale reference | a link with the same name and resolved `href` keeps its reference across page changes; a gone element is refused by name | browser design, planner §2 | design | |
| S3 | replay start | a journey records where it starts, and a replay navigates there first; today a replay from the checkout page stops at a catalogue-only link | browser design | design | |
| R1 | missing `from` | `journeys` and `read` default `from` to 1 and accept digit strings | browser design, planner §3; the prompt form landed in ollama `5cfa5ed` | design | |
| O1 | oracle strictness | a refused stale reference the model recovers from no longer fails the attempt; a successful unlisted action still does | oracle ruling for the user, analyst hypothesis 4 | ruling | |
| X1 | ollama 500 | `num_predict` 512 on the journey | store-live, 2B, journey, 8 ports | queued | |
| M4 | 4B journey | the `from 1` prompt | confirm.ts, 4B, journey, 2 runs | queued | |

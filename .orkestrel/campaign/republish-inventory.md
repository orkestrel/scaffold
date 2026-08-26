# Republish inventory — OS-agnosticism campaign (2026-08-26)

Derived from the material-diff instrument (`tmp/dist-diff.mjs`): each repo's rebuilt `dist/`
against its published tarball, sourcemaps excluded, whitespace-only differences ignored, with
every untouched repo reading `UNMOVED` as the instrument's control. Publishing is the user's
decision; run it through the `orkestrel-publish` skill.

## Material movers — bump and publish

| Package | Published | Moved surface | Cause |
| --- | --- | --- | --- |
| `@orkestrel/console` | `0.0.10` | `dist/src/core` | `renderBox` CRLF split |
| `@orkestrel/lsp` | `0.0.2` | `dist/src/core`, `dist/src/server` | TSDoc URI examples reach emit and declarations |
| `@orkestrel/browser` | `0.0.13` | `dist/src/server` | endpoint-owner adoption, `readFirstLine` |
| `@orkestrel/terminal` | `0.0.12` | `dist/src/core` | `CONTROL_NAMES` CRLF row |
| `@orkestrel/probe` | `0.0.8` | `dist/src/server` | overlay case-sensitivity matching, `OverlayOptions` |
| `@orkestrel/scaffold` | `0.0.54` | `dist/host` | portability rule file, architecture bullets, sweep, `AGENTS.md` row, manifest |

## Unmoved — no publish

mcp, process, server, sea, worker, websocket, test, agent, guide: their campaign changes live in
tests, workflows, or guides outside the published file set, and the instrument reads their rebuilt
`dist/` byte-stable against the registry.

## Publish order (runtime-dependency rounds)

1. **Round 1 — independent movers:** console, lsp, browser. None depends on another mover at
   runtime.
2. **Round 2 — dependents:** terminal (re-pin `@orkestrel/console` to the round-1 release, gates,
   publish), probe (re-pin `@orkestrel/lsp`, gates, publish), scaffold (re-pin
   `@orkestrel/console`, gates, publish — it also moves on its own `dist/host` account).
3. **Round 3 — propagation, no publish:** every fleet repo re-pins `@orkestrel/scaffold` (dev),
   runs `repair` to receive the vendored portability rule, the corrected architecture rules, and
   the extended policy sweep, re-runs gates, and commits. The pre-propagation fleet sweep reading
   (probes.md) shows no target reds on arrival. Dev re-pins of probe/console/etc. follow the same
   development-bump law: re-pin, prove green, commit, no publish unless a rebuilt `dist/` moves.
4. Regenerate the catalog (`scaffold catalog`) during the wave per the publish skill, so the
   `Layer` table reflects the registry after each round.

## Outside the campaign's scope

`@orkestrel/toolbox` runtime-depends on terminal (and others) and sits outside the audited set: its
re-pin ride belongs to its own next change. `workflow`, `html`, and `markdown` carry the
template-materialized `configs/browsers.ts` and are untouched (the template itself did not change).

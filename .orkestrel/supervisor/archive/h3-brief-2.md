# H3 successor — refreshed facts for dispatch (design unchanged)

Amends `h3-brief.md`, which remains the unit's full specification. What changed since it was
staged, and nothing else:

- **Baseline:** clean committed **086573c** (J1 closed; the tree gained U4-U5d's shell, toasts,
  footer redesign, and the journey layer — none of it touches `src/core`, H3's subject).
- **Registry state re-checked at dispatch:** `npm view @orkestrel/supervisor version` errors
  (unpublished) — the zero-blast-radius claim stands.
- **Guides parity:** the declared red set is currently FOUR tests in
  `tests/guides/src/parity.test.ts` (U7's carrier). H3's new exports will extend that set —
  report the exact delta as the original brief's Output demands; do not touch `guides/**`.
- **Bench sandbox standing condition, named:** the sandbox denies loopback listeners. H3's
  proof matrix is listener-free (memory map + real `node:sqlite` files via the scratch
  helpers), so run the whole matrix yourself; `test:src` and the static gates run in-sandbox.
  If any command unexpectedly needs a listener, stop and report rather than skipping.
- **Environment facts:** Node/npm on PATH; scoped commands from `/workspace/supervisor`;
  `npm run test:src` for the src projects; static gates `npm run format:check`,
  `npm run lint:check`, `npm run check`. Converge with mutating `lint` then `format` only if
  needed, then prove with the checks.

Everything else — ownership, the fixed design, the proof matrix, acceptance criteria, deviation
contract, output shape — is `h3-brief.md`, unchanged and binding.

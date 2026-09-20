# U6 consumer probe — Veneer, 2026-09-20

Orchestrator's instrument, run as a tracked background command from the scratchpad
(`units/u6-consumer-probe.sh`, log `units/u6-consumer-probe.log.txt`, test file
`units/u6-consumer-probe.test.ts.txt`). The probe file was written into Veneer's
`tests/src/browser/` for the run and removed by the script; `git status` lists nothing for it.

The U6 verdict placed this probe after U3's writer exits. It ran before U3's third brief was
dispatched instead: no writer was live in Veneer, which is the condition that ordering served, and
the policy audit that gates the U3 dispatch runs in the scaffold checkout.

## Readings

Installed `@orkestrel/test` 0.0.18 from the U6 tarball (`--no-save` over the registry `^0.0.18`).
Every U6 export resolved from the published `@orkestrel/test/browser` specifier: `hoverAccessible`,
`holdAccessible`, `releasePointer`, `stageMedia`, `releaseMedia`, `sendProtocol`, `MediaOptions`,
`POINTER_HOLD`, `MEDIA_STAGE`, and the `pseudo` argument of `readStyle`.

| Receipt | Command | Exit | Result |
| --- | --- | --- | --- |
| managed Chromium | `vitest run --project src:browser tests/src/browser/integration.test.ts` | 0 | `Tests 2 passed (2)` in 5.67s |
| Edge (`PLAYWRIGHT_CHANNEL=msedge`) | same | 0 | `Tests 2 passed (2)` in 1.61s |

What the cases measured: `padding-top` 10 → 20 under `hoverAccessible` → 30 under `holdAccessible`
with the root `POINTER_HOLD` marker set → 10 after `releasePointer` with the marker gone;
`readStyle(button, 'padding-top', '::after')` reads `7px`; a `:hover` pseudo argument throws;
`stageMedia({ motion: false })` sets the root `MEDIA_STAGE` marker and the reduced-motion rule
paints (2px); `stageMedia({ print: true })` paints the print rule (3px); `releaseMedia` clears the
marker and `matchMedia('print')` reads false; `sendProtocol('Emulation.setEmulatedMedia', …)`
resolves. The dot reporter prints no user-agent line, so the Edge receipt rests on the channel
variable the scaffold resolver honours, as it did for the U6 gates.

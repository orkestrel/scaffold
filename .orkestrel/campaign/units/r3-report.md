# R3 report — server fix round (Opus implementer)

Delivered: UpgradeResult discriminated union (server/types.ts:186-196, arms verbatim from the
prescription); requestUpgrade bounded through UpgradeOptions extends WaitOptions modelled on
waitForSocketClose, default budget 1000ms, rejection naming port and path, socket released on the
timeout settlement too; tests/setupServer.ts dedup — the five constants read their shipped probes
through @src/server, probeCapability and the local bodies deleted, the equivalence pin removed
with its subject; the vacuous stored-versus-enforced assertion replaced with
PERMISSION_HOLD_REFUSES_REMOVAL === (stored && getuid !== 0), measured truthful on this container
first.

Failing proofs: the union edit alone turned check:src:server red with TS2353 at both old
construction sites — the impossible state becoming inexpressible — and the three bound proofs each
timed out against the unbounded wait before the fix. Mutation checks reddened exactly the named
test per repair and were restored. Server suite 133→135 passed; full check chain, lint, format
exit 0. Silent-server fixture is an http.Server whose upgrade listener answers nothing — a bare
net.Server parks loopback destroy on its unread socket, measured before the fixture was chosen.

Flags to R4, all in guides/test.md: :438 kind changes interface→type with the arm-only member
description; :437 UpgradeOptions gains budget/interval/signal; :509-518 prose gains the bound and
drops the now-false claimed-path status sentence; :1737-1756 fence comments drop the padded
members; the upgrade fence is untranscribed, which is how the drift reached the guide silently;
and the isRecorderMapComplete parity miss from R1b stands at baseline for R4.

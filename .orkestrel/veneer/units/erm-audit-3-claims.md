# ER-MECH fix-round audit 3 — claims

Subject: ER-MECH round 3 in `/home/user/veneer-erm` (rounds 1 to 3 uncommitted over Veneer `873f715`), briefed by
`er-mech-brief-3.md`, which carries claim 5, F1, and R3 of `erm-audit-2-verdict.md`; written by `builder` on Sonnet and
reported in `er-mech-report-3.md`. Evidence: `erm-3-delta.diff` (round 3's change over round 2's tree, built by applying
`erm-2.diff` to `873f715`), `erm-3.diff` (the whole change), `erm-3-status.txt`, and `erm-instruments/r3/`
(`erm-3-engines.sh` and `logs/`). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The report quotes the
plant's output inline; no plant log is retained. A unit report's prose is not a claim subject. A plant counts as a kill
only when the failing case's message names an assertion failure. Rule every claim.

1. **The Receipts Platform check.** `readReceipts` in `tests/setupServer.ts` refuses a Receipts row whose Platform cell
   is `—` or is not a member of `NODE_PLATFORMS`, with `Receipt row N: invalid Platform X`; its TSDoc states the check
   and why it differs from the Supported hosts reader; the receipts scratch-guide case expects that refusal for a
   `Linux` and a `—` Platform cell; deleting the check fails that case with an assertion failure; and the real guide's
   Receipts table holds no row the check refuses.
2. **The title.** The case asserting that `NODE_PLATFORMS` contains `process.platform` and holds each platform once
   sits in its own `describe('NODE_PLATFORMS', …)` block and is titled
   `holds the platform this process runs on, and each platform once`, and its body is round 2's.
3. **The engine-strict reading.** `erm-instruments/r3/logs/erm-3-engines.log.txt` reads npm 11.19.1 running a script
   under an excluded `engines.node` and refusing one under an excluded `devEngines.packageManager` with
   `engine-strict=true`, as `erm-instruments/r2/logs/erm-2-engines.log.txt` reads them under the default, so the
   `guides/veneer.md` § Hosts sentence beginning `npm 11.19.1 refuses to run a script` is true in both configurations.
4. **Scope and law.** Round 3 changes only `tests/setupServer.ts` and `tests/setupServer.test.ts`; the delta adds no
   `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, or hidden helper; and the
   whole change still names every new export in the export inventory.

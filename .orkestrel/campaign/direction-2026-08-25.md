# User direction, 2026-08-25

Rulings the user stated mid-campaign, after the absorption evidence landed. These are fixed
priors for the design round: the round argues how, never whether.

## mcp — repair to 2026-07-28-native with a legacy wrapper

The package is intended to be MCP revision 2026-07-28 under the hood, by default, always true
to 2026-07-28, with an optional legacy wrapper function adding compatibility with older
revisions. The 2026-07-28 lifecycle page's own terms name the target posture: a **modern**-core
implementation, optionally **dual-era** through the wrapper (see the researcher report's
lifecycle section).

### Correction, same day (fleet-sweep evidence)

The drift claim this section first carried is falsified. The shallow map had reported
`SUPPORTED_PROTOCOL_VERSIONS` omitting `2026-07-28`; the deep sweep read the tree as it is:
`MCP_MODERN_VERSION = '2026-07-28'` (`src/core/constants.ts:21`), `SUPPORTED_PROTOCOL_VERSIONS`
listing it first (`constants.ts:33`), per-request `_meta` version and capability parsing,
`notifications/progress` with a reporter, `notifications/cancelled`, a stateless modern core
whose bare server rejects `initialize`, and `MCPLegacy` as the legacy projection. The intent
stands as the prior; the open design questions become completeness against the revision
(`server/discover`, `subscriptions/listen`, the input-required retry pattern, the tasks
extension, the deprecation list) and the shape of the legacy wrapper and the
`MCP_PROTOCOL_VERSION` constant, whose name reads as "the protocol version" while it declares
the newest legacy handshake revision.

## probe — toward full LSP

The user endorses probe's LSP direction: keep it, deepen it, and aim at full LSP conformance,
timed with the move to TypeScript 7, whose native toolchain replaces the tsserver protocol with
standard LSP.

## html and markdown — the position gap is the gap to fill

The asymmetry the map found — html nodes carrying UTF-16 offsets, markdown nodes carrying no
position data, neither package deriving outline/folding/symbol structures — is exactly the gap
the user wants filled. The design round shapes what alignment with LSP structures
(DocumentSymbol, Range/Position, FoldingRange, and related) looks like for each package and what
probe gains from it.

## workflow, process, tool, queue — progress surfaces stay exploratory

No concrete progress contract is decided. The design round proposes shapes to play with, taking
the general MCP-versus-LSP ruling as input, with the user leaning toward the progress model
following MCP either way (`notifications/progress` tokens, and the tasks extension's status
model, per the researcher report).

# User direction, 2026-08-25, after the audit

Rulings the user stated on the delivered audit (`audit.md`). Each is fixed; the plan in
`plan.md` carries them.

## mcp, html, markdown, probe — repairs and fills proceed with full proof

The audit's defect findings and rulings for mcp, html, markdown, and probe are confirmed.
Every repair and fill lands with full proof and evidence that the result works as intended:
red-before-green defect proofs, adversarial falsification before acceptance, and host-taken
evidence wherever a proof drives a child process or a listener.

## workflow — adopt MCP's progress model directly, no adapter

The audit's held-open subject is closed by the user: workflow changes to the way MCP does it.
An adapter is another point of breakage, and workflow exists to work well with agents through
MCP. The objective lane's semantic findings (replacement versus monotonic semantics, the
`unit` field, the `note` overlap) become constraints the adoption unit resolves and proves,
never a reason to hold. The reporter-replay probe becomes the unit's failing proof rather
than a decision gate.

## lsp — a new package, the way mcp is a package

The `LanguageClient` idea grows into `@orkestrel/lsp`: a package mirroring how `@orkestrel/mcp`
carries its protocol — types-first from the LSP 3.18 specification, an `LSPClient` first, and
eventually an `LSPServer` built the way `MCPServer` was. probe consumes `LSPClient` instead of
growing its own client. The `LSPServer` is a recorded trajectory with triggers, not part of
this campaign.

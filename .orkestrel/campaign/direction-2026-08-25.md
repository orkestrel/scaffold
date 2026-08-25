# User direction, 2026-08-25

Rulings the user stated mid-campaign, after the absorption evidence landed. These are fixed
priors for the design round: the round argues how, never whether.

## mcp — repair to 2026-07-28-native with a legacy wrapper

The package is intended to be MCP revision 2026-07-28 under the hood, by default, always true
to 2026-07-28, with an optional legacy wrapper function adding compatibility with older
revisions. The tree as found — `MCP_PROTOCOL_VERSION = '2025-11-25'` in
`src/core/constants.ts:15`, an `initialize`-based lifecycle, and `SUPPORTED_PROTOCOL_VERSIONS`
omitting `2026-07-28` — is drift against that intent, not a design choice. The 2026-07-28
lifecycle page's own terms name the target posture: a **modern**-core implementation, optionally
**dual-era** through the wrapper (see the researcher report's lifecycle section).

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

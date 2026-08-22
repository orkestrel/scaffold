# Unit fetch-U2 report: the live reader, landed

Role `implementer`, engine Claude Opus 5, in the scaffold checkout. Brief:
`unit-fetch-u2-brief.md`. Returned 2026-08-22; every criterion green; no
deviation-contract stop; four observations, each triaged by the Orchestrator below.

## Landed

- `Copy` in `src/core/types.ts` beside `Mirror`; `UpstreamOptions.guides` renamed
  `repository`; `UpstreamEventMap.copy`; `UpstreamInterface.vendor`.
- `src/server/Upstream.ts`: `vendor`, `#copy`, `#answer`, `#inventory`, `#vendorURL`,
  `#encode`, `#vendor`, with the private `#guide*` fields renamed `#repository*`.
- `src/server/validators.ts`: the option-group rename, `copy` in `isUpstreamHooks`,
  and `isPaths`.
- `tests/setupServer.ts`: `TestVendoredFile`, `VENDORED_FILES`, `buildInventory`,
  `buildVendoredSnapshot`, `UPSTREAM_PATHS.vendored`, plus endpoint-sense rename
  hunks; the `Upstream vendor` block in `tests/src/server/Upstream.test.ts`; the
  guide's parity rows; `host.json` regenerated because `guides/scaffold.md` is
  vendored.

## Failing-first evidence

Red produced against a naive per-file implementation — `vendor` fetching every
requested path blind, ignoring the inventory — installed by mutation over the final
`Upstream.ts` and restored from a scratchpad copy. One command, both halves
(`-t "Upstream vendor"`): naive `Tests 13 failed | 2 passed | 365 skipped (380)`;
real `Tests 15 passed | 365 skipped (380)`.

The three named rows are in the red set, and each discriminates on the request
recorder's arrival list rather than on a refusal: the aligned target
(`server.paths` returned all three blob addresses instead of the inventory alone), the
changed path (two blob requests instead of one), and the dead inventory
(`['found','found']` where the inventory returned 503, because a per-row reader never
consults it). Ten further rows were red under the same control. Two rows did not
discriminate against that control and are pinned without a failing-first pair — the
response-limit row and the shape-refusal row — because neither is
inventory-dependent, so the naive control lies outside their population.

## Rows pinned

Absent from the live inventory is `missing` with no request; a digest-mismatched body
fails its row; an over-`limit` body fails naming its limit; a `guides/*.md` path is
never requested (proved with an aligned mirror snapshot and a scripted mirror route);
`destroy()` mid-call rejects `DESTROYED`, sequenced on `server.arrival`; plus
unreadable manifest, tampered membership digest, duplicated destination,
aligned-but-not-UTF-8, the configured branch, and the `copy` event count.

## Gate evidence

Scoped format and lint exit 0 (`tests/setupServer.ts`'s standing formatter red proved
not-U2's by the scratchpad-copy method); `check:src:core`, `check:src:server`, and
`check:src:bin` exit 0; the observational root typecheck reported only the standing
consolidation sites, byte-identical before and after. Suites: `src:server`
`376 passed | 4 skipped (380)`, `config` `43 passed`, `guides` `10 passed`, `policy`
`93 passed`, each exit 0. The staleness gate ran red on the moved guide row and green
after `build:inventory` (`staged 108 file(s)`).

## The rename sweep

Patterns over `src/`, `tests/`, `guides/`, `configs/`: `guides\s*:`, `\.guides\b`,
`guides?:`. Endpoint-sense hits remaining: none. Every surviving hit is the blueprint
sense (`Blueprint.guides: boolean`) or the path-and-group sense, each verified by its
declared type. Touched endpoint-sense sites are listed in the unit's return: the
`UpstreamOptions` declaration and remark, the validator row and its example, the
`Upstream` private fields and the endpoint-refusal field label, the fixture options
and guard-case labels, `tests/src/bin/CLI.test.ts:220`, and the Upstream suite's
bindings.

## Decisions inside the brief's discretion

`Copy.content` is decoded text matching `Mirror.content`, so the aligned row decodes
`observed` with a fatal `TextDecoder` and undecodable declared bytes fail the row; a
`guides/*.md` path is `missing` without a request, ruled ahead of the byte comparison
so the refusal is a property of the path (matching `Materializer.#deferred`); a
destination the inventory names twice fails its row; a `404` on the inventory makes
every row `missing` and is never retried, anything else non-found makes every row
`failed`; `#read`'s loop counter renamed `round` to clear a `no-shadow` denial; the
vendored URL encodes segment by segment because `isPath` leaves `#` and `%`.

## Observations, triaged

1. **Pin reds after the tarball install** — the floor table disagreeing with the
   manifest's `^0.0.10`. Closed by the Orchestrator's integration; see
   `integration-floor-raise-note.md`.
2. **Vocabulary carry** — `guides/scaffold.md:1102` and prose in `src/bin/types.ts`,
   `src/server/constants.ts`, and `src/server/validators.ts` still say "guide
   host"/"guide endpoint"/"guide branch". Not endpoint-sense identifiers, so the sweep
   is clean. Carrier: U5's guide narrative unit, which owns the vocabulary pass.
3. **`vendor` undocumented in the narrative** — by the brief's instruction; parity
   passes on table rows alone. Carrier: U5.
4. **No `hexToContent` helper** — the fatal hex-to-text decode exists twice. U3
   verified it needs no third site (a value host's bytes reach the target as bytes),
   so the carry stands unclaimed for a future third consumer.

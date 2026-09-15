<!-- D4-4 — implementer (Opus 5, native), scaffold prose for the hosted guides, the catalog floor, the surface rule, and the inventory baseline. Retained from the completion notification, 2026-09-15 (720 s, 105 tool uses). -->

## Touched files

| File | Sections added or changed |
| --- | --- |
| `.claude/rules/names.md` | New `## Fleet name ownership` between § General vocabulary and § Acronyms: the one-owner law, the bare-name definition, the check-before-adding directive, a pointer to the instrument, and the four resolution rules as an ordered directive list (reuse before renaming; the subject keeps the name; qualify rather than extract; close it in the code, no accept path). |
| `.claude/rules/workspace.md` | § Tooling → Policy instruments: narrowed the "name no individual rule id" line, then named `surface` — its read paths, its two populations, case sensitivity, the barrel-form requirement and the refuse-rather-than-pass cases, the setup fail-closed rule with its pre-adoption directive, and the refusal to edit a vendored instrument. Resolution is delegated to `names.md` § Fleet name ownership. |
| `guides/scaffold.md` | Intro: the third staging list, and `HOST_PATHS` no longer claims the guide mirrors. § Vendored data root: `REFERENCE_PATHS` and the hosted guide root at `dist/host/guides/<name>.md`, the seed claims through `blueprintToHostArtifacts`/`selectHostPaths`, the shared collision population, three-way prefix disjointness, and the stage refusals (catalog-row coverage, collision growth against the committed inventory, `HostStageOptions.inventory`/`report`, absent-versus-malformed inventory). § Ownership and drift: the `surface` rule's read paths, the incomplete-evidence refusals, the message and sort order, and the pointer to the names rule. Rewrapped the D4-1e staging paragraph. |
| `guides/README.md` | § Line reference: `new` seeds the `guide.md` and `scaffold.md` mirrors by name; every guide here ships at `dist/host/guides/<name>.md`; `catalog` writes that staged copy into an absent mirror after an empty upstream read; the `surface` rule reads the same set. |

`tests/guides.test.ts` untouched — no authored fence needed a transcription.

## Diffstat

Scoped to owned files (`guides/scaffold.md` also carries the inherited D4-1..3 and D4-1e edits):

```text
 .claude/rules/names.md     |  13 ++++
 .claude/rules/workspace.md |  22 ++++++-
 guides/README.md           |  16 +++--
 guides/scaffold.md         | 144 +++++++++++++++++++++++++++++++++++++--------
 4 files changed, 164 insertions(+), 31 deletions(-)
```

Whole tree: 33 files changed, 3847 insertions(+), 404 deletions(-) — the rest is inherited.

## Validation

| Command | Baseline | Final |
| --- | --- | --- |
| `npm run test:guides` | exit 0, 23 passed | exit 0, 23 passed |
| `npm run test:policy` | exit 0, 102 passed | exit 0, 102 passed |
| `npm run format:check` | exit 1, `host.json` only | exit 1, `host.json` only |
| `git diff --check` (owned files) | — | clean |

Judged-term sweep over the added lines, pattern `\b(now|new|latest|once|since|master)\b` case-insensitive across `guides/scaffold.md`, `guides/README.md`, `.claude/rules/names.md`, `.claude/rules/workspace.md`: one hit, `` `new` `` as the verb name in `guides/README.md`, permitted as a code identifier. Sweep for `above|below|ensure|guarantee|we |our |let's|robust|performant` over the same lines: no hits. The unconditional rows are covered by the passing prose sweep, which walks `.claude/rules/*.md` (`POLICY_PROSE_EXCLUSIONS` holds `.git`, `.orkestrel`, `dist`, `node_modules`, `tmp`).

No failing-first test names: this unit authored prose only and added no test.

## Deviation state

Two items recorded, neither stopping the unit.

1. **`workspace.md` already refused what acceptance criterion 3 requires.** Its § Policy instruments carried "Name no individual rule id here. This section fixes the instruments and how work is assigned between them; each rule's substance stays with the law it enforces." Naming `surface` there is exactly what that line forbade. I narrowed the line rather than restating the law: it now reads "Name an individual rule id here only where the rule reads its evidence from outside the workspace its instrument runs in", which `surface` satisfies and no other policy rule does. The rule's substance — which package keeps a claimed name — stayed out of `workspace.md` and went to `names.md` § Fleet name ownership, its one home. If the Orchestrator wants the original line restored, the `surface` bullets have to move to `names.md` or go.
2. **Acceptance criterion 2 cannot pass in this checkout.** `npm run format:check` exits 1 on `host.json`, which the brief lists off-limits and the amendment reserves for the Orchestrator's build. The reading is identical before and after this unit, and my edits are Markdown, which Oxfmt does not read.

One ancillary decision, recorded and carried on from: the guide names `.claude/rules/names.md` as a bare code token rather than a Markdown link. The `resolves every relative link to a real file` assertion in `tests/guides.test.ts` resolves links against the inventory patterns `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md`, so a link to a rule file reports broken though the file exists. The existing reference to `.claude/rules/writing.md` § Substitutions in the same section uses that same bare form.

No landed behaviour contradicted the code, and no source file was edited.

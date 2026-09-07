Lane held: objective (the recorded substitution for the dark Sol bench).

# The finding first

Only option 1 is permitted without a further rule change, and its cost is that the seed stops propagating to any target that already has it. Option 2 is permitted and pays for it by hand-duplicating a published contract, which is the drift class this campaign exists to close. Option 3 is forbidden by scaffold's own ownership contract, by its verb vocabulary, and by the runtime-bump cascade it creates. Option 4 is forbidden by the sentence the campaign's own gate compares. Before any of them is briefed, take measurement M1: the rule's stated reason may be false, and if it is, the cheapest shape is one the brief's constraints currently exclude.

# The premise the constraints rest on, unverified

`.claude/rules/workspace.md:77-79` gives its reason as "every such package is itself a target and cannot depend on itself". Node resolves a package's own name from inside its own tree through the `exports` field (self-reference), and `/home/user/fleet/guide/package.json:2,31-43` declares both `name` and `exports`, with `/home/user/fleet/guide/dist/src/core/index.js` and `index.d.ts` present. If self-reference resolves at runtime and under `tsc`, the byte-identical vendored seed runs and typechecks in the guide package as it stands, and the only thing stopping D5's landing is the rule's text and the text gate at `tests/src/server/helpers.test.ts:174-201`.

I did not run it and I hold it as unverified. It is measurement M1. I rule inside the brief's constraint (the rule and the gate stay), and I record that the constraint may rest on a false premise; that ruling is the owner's, not mine.

# Option 1 — a presence-owned template artifact

**Permitted.** `ContentArtifact` (`src/core/types.ts:407-412`) admits `origin: 'template'` at any ownership, and `src/core/compilers.ts:1302-1318` is the working precedent.

What the code forbids or fixes:

- **Ownership must be `presence` or `birth`.** `content` replaces a stale file (`guides/scaffold.md:966-970`), so it would overwrite the guide package's edited copy on every `repair`. The consequence is the option's real price: a later seed change reaches no existing target. `.claude/rules/documentation.md:40-41` is instruction canon every target reads and names `npm run docs`, so the fleet would run one gate against several frozen writers. Delete-and-repair must be stated in `guides/scaffold.md` § Ownership and drift as the update path, or the limit is undocumented.
- **The group is fixed at `orchestration`.** `inferGroup` (`src/core/helpers.ts:301-314`) sends anything under `scripts/` to orchestration through `ORCHESTRATION_PATH_PREFIXES` (`src/core/constants.ts:249-256`). `src/core/compilers.ts:1533-1536` states the invariant that a planned path and a foreign path are classified by one rule, so the template artifact must declare `orchestration` too. A documentation tool then sits in the group defined as "instructs or wires an agent" and `scaffold audit --groups guides` cannot see it. Permitted, wrong on the merits, and not fixable while the path stays under `scripts/`.
- **The seed's whole text moves into `src/core/templates.ts`** and ships in `dist/src` to every consumer of the core face. The text carries its own template literals and `${...}` interpolations (`scripts/docs.ts:131,155,367,432-433`), so the embedding must survive `fillTemplate` and stay formatter-stable (`src/core/templates.ts:10-17`). Measurement M3.
- **Emission narrows correctly.** Under `blueprint.guides` the artifact and the `docs` script select together, which repairs a defect the landing carries: `nameToHostArtifacts` (`src/core/compilers.ts:1556-1563`) has no `guides` gate, so today every target receives a seed that throws at `scripts/docs.ts:373` when the workspace carries no `guides/README.md`.
- **What the D5-fix unit must undo:** the row and the remark at `src/core/constants.ts:140,117`; the `host.json` entry; `tests/src/core/Compiler.test.ts:71,74` back to 39 and 21; the case D5 added in `tests/src/core/helpers.test.ts`; the vendored-set sentence at `guides/scaffold.md:16-20`.

# Option 2 — the seed names its readers' module at run time

**Permitted, and the most expensive at the type seam.**

- **No `@orkestrel/*` text at all, type included.** The gate's pattern (`tests/src/server/helpers.test.ts:176-177`) matches `from '@orkestrel/…'`, so `import type` fails it as surely as a value import. The seed therefore re-declares every shape it dereferences — `Drift`, `GuideInterface`, `GuideModule`, `SourceExample`, and the signature of every function it imports today at `scripts/docs.ts:20-37`.
- **The result of `import(name)` is `unknown` and must be narrowed by total guards**, because `any` and `as` are refused (`AGENTS.md` § Non-negotiable rules). `.claude/rules/patterns.md` § Foreign contracts governs that adapter: enforce the published contract and no more, validate what is dereferenced. The seed dereferences nearly all of it. Those guards sit at module scope in a self-contained entry, so nothing but the seed's own fixture cases can exercise their refusal paths.
- **The duplicated contract drifts silently.** The gate reads guide's real declarations; the writer reads the seed's copy of them. The two halves of the pair can then disagree with no instrument between them.
- **The guide package's argument comes from a hand edit, and `repair` retains it — after it exists.** `blueprintToWritableScripts` gives `docs` `accepted: []` (`src/core/compilers.ts:450-451`), and `replaceManifestScripts` retains a differing string (`:1795-1799`); no vendored proof pins the value (`tests/config.test.ts:524-541`). But guide declares no `docs` script today (`/home/user/fleet/guide/package.json:47-73`), and an absent named script is appended with the compiled value (`src/core/compilers.ts:1800-1806`). So the first `repair` in that checkout writes the wrong command, and only a later edit sticks. Order that explicitly in the brief.
- **The compiler cannot supply it.** A branch keyed on the workspace's name would be product policy inside a mechanism (`AGENTS.md` § Design laws), and the general form — pass `@orkestrel/<name>` — is wrong for every package except guide.
- **What guide can pass.** Not `@src/core`: a plain `node` run resolves no alias. Not `./src/core/index.ts`, if Node's type stripping cannot follow that graph's `.js`-extension specifiers, which `.claude/rules/typescript.md` § Syntax and imports mandates. That leaves `./dist/src/core/index.js`, which obliges a build before `npm run docs` and has the writer read built bytes while the gate reads source (`/home/user/fleet/guide/tests/guides.test.ts:4,25`). Measurement M2.

# Option 3 — a `scaffold` verb

**Forbidden as stated.** Each ground stands alone.

- **It contradicts the ownership contract the package publishes.** `README.md:73-77` and `guides/scaffold.md:1003-1011` state that a file the workspace owns — its source, its own proofs, its README — is written at creation and never rewritten. A `docs` verb rewrites doc blocks under `src/**`, which the compiler plans `birth`-owned (`src/core/compilers.ts:1094-1105`), and cells in `guides/*.md`. `Ownership` (`src/core/types.ts:31`) carries no member for a verb that rewrites workspace-authored source, so either the contract gains an exception or the verb contradicts it.
- **The verb law removes the direction option and leaves the report mode homeless.** `guides/scaffold.md:476` bars `--to`. `audit` reports `Drift` over artifact paths with values `aligned|stale|missing|foreign` (`src/core/types.ts:51`), which is a different type from guide's `{ key, guide?, source? }`. Carrying both inside one package puts two meanings on one term, against `AGENTS.md` § Design laws. `docs` also already names an artifact group (`src/core/types.ts:34-42`, `guides/scaffold.md:943`), so the verb collides with the group in the same vocabulary.
- **The runtime edge is not small.** Moving `@orkestrel/guide` into `dependencies` makes scaffold a runtime consumer of guide. Under `.agents/orchestration.md` § What a bump obliges, every guide release then obliges a scaffold re-pin, bump, publish, and a re-pin in every target, and scaffold sits outside the runtime layer order today precisely because nothing depends on it at runtime. It also creates the duplicate-copy hazard that file names: each target declares `@orkestrel/guide` for its own gate through `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:494`), scaffold would carry its own caret, and two disagreeing `0.0.x` carets install two copies — the gate and the writer then read different implementations of `findDrift`.
- **It breaks the pair in the guide checkout by construction.** `scaffold docs` runs the readers the registry served, one release behind guide's own tip, while `tests/guides.test.ts` there reads `@src/core`.
- **The sub-variant where the script goes away is forbidden outright** by `.claude/rules/documentation.md:40-41`.
- **It discards the substance the brief's constraints keep** — the `--to` pair, its miss reasons, and the exit codes D5 measured.

**What the owner must confirm if they want it anyway:** a runtime `dependencies` edge from `@orkestrel/scaffold` to `@orkestrel/guide`; the re-pin, bump, and republish of scaffold on every guide release, plus the file re-propagation to every target that follows; and the duplicate-install hazard between scaffold's range and each target's devDependency range. Present it as that, not as "its runtime closure is already scaffold's" — the closure matching (`package.json:96-102` against `/home/user/fleet/guide/package.json:74-77`) is true and settles only the install size, not the release coupling.

# Option 4 — a bin in `@orkestrel/guide`

**Forbidden.** The guide's tagline states a pure, I/O-free toolkit with no filesystem (`/home/user/fleet/guide/guides/guide.md:3-9`), and `.claude/rules/documentation.md:35-41` makes the README pitch equal that tagline. The shape falsifies the sentence the campaign's own gate compares. Beyond that: `files` ships `dist/src` alone and `exports` carries `.` and `./package.json` (`/home/user/fleet/guide/package.json:22-25,31-43`); a bin needs a `bin` field, `dist/bin` in `files`, and the whole bin environment scaffold plans for it (`src/core/constants.ts:103-109`, plus the entry, its test, and its check, test, and build scripts). A server layer moves guide to a second published environment, at which point `srcToRoot` (`src/core/helpers.ts:434-437`) names no single root and guide's `main`, `module`, `types`, and export map are rewritten. Unresolved besides: whether npm links a package's own bin into its own `node_modules/.bin` (M5). If it does not, the guide checkout still cannot reach the bin through `npm run docs`, which is the one case the option exists to serve.

# Option 5 — the shapes the four miss

- **5a. Repair the rule instead of the seed.** If M1 resolves, amend `.claude/rules/workspace.md:77-79` to what it actually protects — import nothing that fails to resolve in any target — and narrow the gate at `tests/src/server/helpers.test.ts:174-201` from a text pattern to a resolvability check. The vendored row and its propagation then stand as landed. The brief forbids this, so it is the owner's ruling. Its own cost: guide's copy reads built bytes, so the stale-build divergence in option 2 applies there too, and the gate loses the simplicity of a text pattern.
- **5b. Move the seed out of `scripts/`.** The `orchestration` misgrouping comes only from the prefix (`src/core/constants.ts:255`). `tests/docs.ts` would group as `tests`, and the mirror law then demands a matching source module (`tests/setupPolicy.ts:146`, recorded in `d5-scaffold-seed-report.md:175-191`). No free position exists without a rule change. Record this as the reason the grouping defect stands, rather than leaving it unexplained.

# The measurements missing before a brief

- **M1 — self-reference, runtime and type.** In `/home/user/fleet/guide`: `node -e "import('@orkestrel/guide').then(m=>console.log(Object.keys(m).length),e=>console.log(e.code))"`, and a type probe carrying `import type { Drift } from '@orkestrel/guide'` under `npx tsc --noEmit --project tsconfig.json`. Control: the same probe in a package whose manifest declares no `exports`, which must report `ERR_PACKAGE_PATH_NOT_EXPORTED` or an unresolved module.
- **M2 — Node type stripping across a `.js`-specifier graph.** `cd /home/user/fleet/guide && node --experimental-strip-types -e "import('./src/core/index.ts').then(()=>console.log('ok'),e=>console.log(e.code))"`. Decides whether option 2's guide argument can be source or must be `dist/`.
- **M3 — template embedding and formatter stability.** After the embedding, `npm run test:src:core`, plus writing the planned content to a scratch file and running `npx oxfmt --config .oxfmtrc.json --check` on it. Control: a hand-perturbed copy that must fail the check.
- **M4 — plan and audit agree on the group.** Over a target holding the seed: `node dist/bin/main.js audit --groups orchestration --json` and the same for `--groups guides`; the path must appear in exactly one.
- **M5 — npm and a package's own bin.** In a scratch package declaring `bin`, run `npm install` and list `node_modules/.bin`.
- **M6 — how far the frozen-writer cost reaches.** `for d in /home/user/fleet/*; do echo "$d $(grep -c '"docs"' "$d/package.json")"; done`, to size how many checkouts will hold a `docs` value that a later `repair` will not correct.
- **M7 — the gate's red.** `npm run test:src:server` against the tree as it stands. `d5-scaffold-seed-report.md:61-65,313-315` flags P2 as a prediction; no run has reddened it, so nothing binds the fix to the defect yet.

# Numbered falsifiable claims the chosen shape must survive

Stated against option 1; each is falsifiable by a run.

1. In a generated workspace with `guides: true`, `npm run docs` exits `0` or `1` and never a resolution or type error, with `@orkestrel/guide` installed from `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:494`).
2. In a workspace with `guides: false`, the plan carries no artifact at `scripts/docs.ts` and the manifest carries no `docs` script. Falsified by any artifact at that path.
3. `repair` over a target whose `scripts/docs.ts` was edited leaves the bytes byte-identical and reports no `stale` drift for that path.
4. `repair` over a target missing the file restores it, and the prior `audit` reports `missing` rather than `foreign`.
5. The planned artifact's `group` equals `inferGroup('scripts/docs.ts')`, so a scoped plan and a scoped audit claim the same set (M4).
6. `tests/src/server/helpers.test.ts:174-201` passes with its population unchanged, and `tests/src/core/Compiler.test.ts:71,74` reads 39 and 21 again.
7. The planned content, written into a target and checked with that target's own `oxfmt`, is byte-identical to the plan (M3).
8. `npm run check` passes in a freshly generated guides workspace with the seed present. The root `tsconfig.json` declares only `exclude` (`:28`), so the seed is inside the program in every workspace, guide's included (`/home/user/fleet/guide/tsconfig.json:27`).
9. In `/home/user/fleet/guide`, the workspace's own copy runs and names the same key set its `tests/guides.test.ts` reports. Falsified wherever the built readers and `@src/core` disagree.
10. `host.json` regenerates with no `scripts/docs.ts` entry, and two consecutive `npm run build:inventory` runs produce one digest.
11. The seed's inventory reaches every module an index row can name. Falsified today — see finding F-a.

# Risks the subjective lane is likely to understate

- **Presence ownership is permanent, not a planning detail.** Option 1 reads as the same file planned differently. It is a file scaffold writes once and never corrects, for a writer that is new and will change, against a gate the canon updates everywhere at once. Without delete-and-repair stated in the guide, the fleet ends on several writers and one gate.
- **The campaign's actual invariant is that the writer and the gate resolve one implementation.** Options 3 and 4 break it structurally; options 1 and 2 break it only in the guide checkout, and only while `dist/` is stale. Rank the options by that property, not by how the command reads.
- **A documentation tool classified as agent orchestration.** It is invisible to `--groups guides` and inside the blast radius of any orchestration-scoped reasoning. Cheap to state, easy to skip.
- **The word `docs` already means an artifact group in this package.** A `docs` verb, a `docs` script, and a `docs` group in one vocabulary is one term for separate concepts.
- **The vendored seed reaches workspaces that cannot run it today** (`src/core/compilers.ts:1556-1563` has no `guides` gate; `scripts/docs.ts:373` throws). Any shape that keeps the vendored row keeps that.

# Findings outside the options

- **F-a.** `scripts/docs.ts:46` globs `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, and `*.md`, and omits `app/**`. An app-only or mixed workspace with an app row in its concept index reports every symbol of that row as source-absent. `.claude/rules/documentation.md:33` requires the index to cover the columns the workspace has. Carry this into the D5-fix unit whichever shape wins.
- **F-b.** `scripts/docs.ts:373` throws for a workspace carrying no `guides/README.md`, and the vendored copy lands in exactly such workspaces today.
- **F-c.** The guide package holds no `docs` script (`/home/user/fleet/guide/package.json:47-73`). Under options 1 and 2 the first `repair` there appends the compiled command, which is wrong for that checkout; only a later hand edit sticks (`src/core/compilers.ts:450-451,1795-1806`). The brief must order the edit against the first `repair`.
- **F-d.** The gate's red is still unobserved (M7). Whatever lands, record `npm run test:src:server` red before and green after, per `.claude/rules/tests.md` § Test contract.

**Objective recommendation:** option 1, planned in group `orchestration` under `blueprint.guides`, presence-owned, with delete-and-repair documented as the update path — after M1 is taken, because a resolving self-reference gives the owner a cheaper shape and would mean the landing needs a rule amendment rather than a redesign.

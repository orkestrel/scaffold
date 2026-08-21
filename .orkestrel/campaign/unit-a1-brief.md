# Unit A1: `createLink` — the scratch link fallback for hosts that refuse symbolic links

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing:
do the work yourself inside this session.

## Objective

Implement the reconciled design for `createScratch().link` on a host whose `symlinkSync` refuses
symbolic links: a new exported `createLink` helper carrying an `EPERM`-only junction fallback,
the factory routed through it, and the contract's TSDoc updated. Source and types only — tests
and the guide belong to later units.

## Context

Authority, in this order, all inside this checkout: `AGENTS.md`; `.claude/rules/names.md`,
`.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`,
`.claude/rules/writing.md`. Skill: none. Guide: `guides/test.md` (read-only context; a later
unit updates it).

The package is `@orkestrel/test` 0.0.7. The current implementation:
`src/server/factories.ts:122-129` — `link(target, source)` does lexical containment on the
target, checks the scratch root, `mkdirSync(dirname(candidate), { recursive: true })`, then
`symlinkSync(source, candidate)` with no type. The TSDoc contract is
`src/server/types.ts:52-63`. `src/server/helpers.ts` already carries the package's host-quirk
leaf (`removeTree`, with a Windows `EPERM` retry) and the barrel `src/server/index.ts` stars
`helpers.js`, so a new exported helper there is public with no barrel edit.

Host facts, all MEASURED on Windows 11 / Node v24.18.1 / NTFS without Developer Mode on
2026-08-21 (rely on them; do not re-measure — your sandbox may behave differently and its
readings would not be evidence about the host):

- `symlinkSync` bare, with type `file`, and with type `dir` all throw `EPERM`. Type `junction`
  succeeds for a directory source.
- A junction to an existing directory: `lstatSync().isSymbolicLink()` true, `statSync()`
  directory, reads pass through, occupied target throws `EEXIST`, `rmSync` removes the link and
  leaves the destination.
- A junction whose source is an existing FILE is created silently broken: later reads fail
  `ENOENT`. This is the one outcome the package must never produce.
- A DANGLING junction (missing source) is creatable; `lstatSync` reports a symbolic link;
  `existsSync` false; reads are refused — exactly the contract's documented dangling behaviour.
- Node resolves a relative junction source against the link's own parent directory and stores
  absolute text (link in `nest/` with source `real` while the process cwd was elsewhere →
  stored text `...\nest\real`).
- Node documents the `type` argument as ignored on non-Windows hosts.

## The design, fixed by the reconciled adversarial round

Add to `src/server/helpers.ts`:

```ts
export function createLink(path: string, source: string): void
```

Behaviour, in order:

1. `symlinkSync(source, path)` — byte-identical first attempt, preserving today's semantics on
   every host that accepts it, including `EEXIST`, `ENOENT`, and `EACCES` propagation.
2. On failure whose `code` is anything but `EPERM`: rethrow unchanged.
3. On `EPERM`: `const resolved = resolve(dirname(path), source)`, then
   `statSync(resolved, { throwIfNoEntry: false })`.
   - Result exists and is NOT a directory: rethrow the ORIGINAL `EPERM` error. Never create a
     junction to a non-directory.
   - Otherwise (directory, or missing): `symlinkSync(resolved, path, 'junction')`. A missing
     source yields a dangling junction deliberately.
4. No capability probe, no cached state, no platform check, no new option, no new dependency.

Route `ScratchInterface.link` in `src/server/factories.ts` through it: the containment check,
root check, and `mkdirSync` of the parent stay in the factory; the final `symlinkSync` call is
replaced by `createLink(candidate, source)`. After the change, `symlinkSync` is imported in
`src/` only by `helpers.ts`.

TSDoc obligations (write per `.claude/rules/typescript.md` § Comments):

- `createLink` gets full TSDoc: description, `@param`, `@throws`, and `@remarks` carrying the
  complete fallback rule ONCE — the `EPERM`-only trigger, the resolve-against-the-link's-directory
  rule, the non-directory refusal, the dangling acceptance, and that where the host creates a
  junction the stored value is the resolved absolute path.
- `ScratchInterface.link` in `src/server/types.ts`: the `@param source` description replaces
  "link text" with the destination-path vocabulary — the stored value is a path naming the
  pointed-at destination, and exact stored text is not promised. The `@throws` clause becomes:
  escaping target; scratch root missing, a symbolic link, or a file; and the host refusing to
  create the link — including a host that creates no symbolic link when the source names an
  existing non-directory. `@remarks` points at `createLink` as the owner of the mechanism rather
  than restating it.

## Unknowns

None load-bearing. If the current code at the cited lines does not match the description,
report the mismatch and stop.

## Scope

- Owned: `src/server/helpers.ts`, `src/server/factories.ts`, `src/server/types.ts`.
- Off-limits: every other file — `tests/**`, `guides/**`, `src/core/**`, `src/browser/**`,
  `src/server/index.ts`, `src/server/constants.ts`, `package.json`, configs.
- Standing conditions, expected, not deviations: `package.json` is modified and
  `package-lock.json` regenerated by the user — leave both; `node_modules/` is installed; the
  suite currently reports `153 passed | 26 skipped` on this host with the skips gated on
  `tests/setupServer.ts` capability probes.
- No commits, pushes, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean` — restore any temporary edit by rewriting the
  text and prove the final state with `git diff`. Your sandbox denies network and mounts `.git`
  read-only.

## Execution

Perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` lists, beyond the pre-existing `package.json`/`package-lock.json`
   entries, exactly the owned files.
2. `npx oxfmt --config .oxfmtrc.json --check src/server/helpers.ts src/server/factories.ts src/server/types.ts`
   exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings src/server/helpers.ts src/server/factories.ts src/server/types.ts`
   exits 0.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. The diff shows: `createLink` exported from `helpers.ts` with the specified behaviour and
   TSDoc; the factory's `link` calling it with its other steps unchanged; `symlinkSync` imported
   only by `helpers.ts` within `src/`; the `types.ts` contract wording landed.
6. As an OBSERVATION only, never a criterion: you may attempt
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server` and
   report its raw output; the sandbox may refuse process spawning or link creation, and either
   outcome is reported, not diagnosed. Do not iterate against it.

## Output

Return: the complete diff of each owned file; the raw output and exit code of each acceptance
command; the criterion 6 observation if attempted; any deviation-contract decision. No process
diary.

## Deviation contract

A conflict with the primary objective — the cited code not matching, a criterion unreachable
from the owned files, the design contradicting an authority file — stops the unit with a report:
expected, found, exact evidence, done or not done, one short hypothesis at most. An ancillary
conflict — a local name, comment wording, import ordering — is yours to decide, record, and
carry on from.

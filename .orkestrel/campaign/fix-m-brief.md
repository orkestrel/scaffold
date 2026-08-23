# FIX-M — make the CommonJS probe select what it means, and gate the guide's behaviour claims

## Role and engine

`sol` — GPT-5.6 Sol, objective implementation, reached through `codex exec`, rooted at
`/home/user/scaffold`, sandbox `workspace-write`. Do the work yourself. Spawn nothing.

## Objective

Two things, both established by running code rather than reading it: a selector that now reddens
every ESM-only subpath in the fleet, and two guide claims about behaviour that no test can break.

## Why you

You wrote J3, which introduced the first. The second is test work, which is yours by work class.

## M1 — `entry.commonjs` does not mean what the probe uses it for

The emitted proof was run end to end for the first time, against `/home/user/orkestrel/indexeddb`
with the regenerated proof in place. It failed:

```text
FAIL |distribution| tests/distribution.test.ts > installed package consumer
     > compiles a consumer under every module resolution [requires the registry]
AssertionError: expected [ Array(1) ] to strictly equal []

+ [ "node16.cts: The current file is a CommonJS module whose imports will produce 'require' calls;
+    however, the referenced file is an ECMAScript module and cannot be imported with 'require'.
+    Consider writing a dynamic 'import(\"@orkestrel/indexeddb\")' call instead." ]
```

`indexeddb` declares no CommonJS support:

```json
{ "type": "module",
  "exports": { ".": { "types": "./dist/src/browser/index.d.ts",
                      "import": "./dist/src/browser/index.js",
                      "default": "./dist/src/browser/index.js" } } }
```

`entry.commonjs` is `resolveTarget(entry, RUNTIME_CONDITIONS.commonjs) !== undefined`. A `default`
branch matches every condition set, so it is `true` for a package that declares no `require`
condition at all. J3 then selects the `.cts` compile probe by that flag.

Before J3 the probe selected `entry.module === false`, which excluded every package declaring an
`import` condition: wrong for a dual subpath, which is the defect J3 correctly repaired, and
accidentally right for an ESM-only one. **One wrong selector was traded for another.**

Runtime and typecheck disagree here and both are right. Node loads it:

```text
  require(esm) -> OK, keys: 26
```

`require(esm)` landed in the v22 line, so the runtime drive passes. TypeScript's `node16` models a
package declaring no CommonJS support and refuses it.

**Blast radius, measured across the fleet** — every browser face, because a browser face is ESM-only
on purpose:

| package | subpath declaring no `require` branch |
| ------- | ------------------------------------- |
| `@orkestrel/indexeddb` | `.` |
| `@orkestrel/router` | `./browser` |
| `@orkestrel/console` | `./browser` |
| `@orkestrel/test` | `./browser` |
| `@orkestrel/mcp` | `./browser` |

Every other package and subpath declares `require`. No package is at fault.

**The property to establish: `entry.commonjs` means the subpath is consumable from CommonJS.** A
`default` branch resolving is not a declaration of CommonJS support. Design the predicate yourself —
an explicit `require` condition, or a require-resolved target that is CommonJS by Node's format
rules, or something better you can defend. Two constraints:

- **The dual-subpath repair must survive.** A subpath publishing both `import.types` and
  `require.types` must still enter the `.cts` probe. That was J2 and J3's whole point.
- **Do not simply exclude browser entries.** A non-browser ESM-only package must also stop reddening,
  and excluding by `entry.browser` would leave it.

Prove it against the real case: `/home/user/orkestrel/indexeddb` must pass, and a dual subpath must
still be compiled from CommonJS.

## M2 — two guide claims about behaviour that nothing can break

`.claude/rules/documentation.md` § Parity: "Where a prose claim about behaviour sits under no fence,
add the executed assertion that would break if the claim went false, and keep the substring check
only as a presence guard beside it." It also says plainly that asserting a sentence *appears* is not
asserting it is *true*.

Two claims in `guides/scaffold.md` have no such assertion:

- **The planned-seed release-skew limit** (around line 640): a seeded setup module is birth-owned, so
  a target keeps the seed of whichever release materialized it, and a later release whose planned
  seed differs raises the uncovered-setup question against a module scaffold itself wrote.
- **The fallback-target skipping rule** (in the classification paragraph): Node's package-target
  rules apply inside a fallback list, so a member naming a path outside the package or carrying a
  `.`, `..`, or `node_modules` segment is skipped rather than resolved or collected, while a
  standalone target Node rejects the same way is still read and reported.

Add the executed assertion for each in `tests/guides.test.ts`, per `.claude/rules/tests.md`. A
substring check may stay beside it as a presence guard; it may not stand alone.

## Owned files

- `src/core/templates.ts`
- `tests/src/core/templates.test.ts`
- `tests/guides.test.ts`

## Off-limits

- `guides/scaffold.md`, `src/core/compilers.ts`, `src/bin/CLI.ts` — a subjective unit follows you and
  owns the prose in all three. Return any sentence M1 falsifies, with its text. Do not edit them and
  do not regenerate `host.json`.
- `tests/distribution.test.ts` (this repository's own bespoke proof), everything under `.orkestrel/`.

## Unknowns, named as unknowns

- The exact predicate for M1 is not known to the Orchestrator. Determine it, or report it unresolved
  with what you tried.
- Whether `tests/guides.test.ts` can reach the release-skew behaviour without materializing a
  workspace is not known. If it needs one, say so and say what that costs; if it needs a grandchild
  process your sandbox denies, report it as an observation with the exact command.

## Execution and probes

Probes only under `tmp/fix-m/`, never inside `tests/` except the owned `tests/guides.test.ts`. Delete
probes before returning. Do not run a tree-wide gate. Scope every run to a named vitest project or an
explicit path.

Your sandbox denies a grandchild process, a nested `npm install`, and a loopback listener. **Three
times in this campaign that denial hid something, and each time the unit reported it as an
observation and the host reading found the defect.** Do the same. Never substitute the reachable half.

## Acceptance criteria, in this order

1. `npx oxlint --config .oxlintrc.json --deny-warnings` over your owned files exits 0.
2. `npx oxfmt --config .oxfmtrc.json --check` over your owned files exits 0.
3. `npm run check` exits 0.
4. The vitest project covering `tests/src/core/templates.test.ts` is green, run by explicit project
   name. This includes the emitted-corpus oxfmt fixed-point test; `oxfmt --check` on
   `src/core/templates.ts` does NOT cover the emitted file, because the template is a string literal.
5. `npm run test:guides` exits 0.
6. M1 has a test proving an ESM-only subpath is not selected for the CommonJS compile probe while a
   dual subpath still is, with a firing control: revert the fix alone, show it reds, restore, show it
   greens. Record the exact commands and their real output.
7. Each M2 assertion has a firing control: break the behaviour the sentence claims and show the
   assertion reds. A substring check that passes when the behaviour changes does not satisfy this.
8. Name each test for what it proves, never for this brief's labels.

Report any whole-suite or distribution-proof result as an OBSERVATION with both readings. The
authoritative run is the Orchestrator's after you exit.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis —
if M1's predicate cannot be determined, if an M2 assertion cannot be written without a file you do not
own, or if M1 and M2 conflict. Otherwise decide phrasing and placement yourself and carry on.

## Output

- M1: the predicate you chose, why, and the indexeddb reading before and after.
- M2: each assertion, what it executes, and what it breaks on.
- Both firing-control transcripts.
- Any `guides/scaffold.md` sentence M1 falsifies, with its text.
- Anything you could not close, with the settling command.
- Any claim of your own you would flag as weak.

No process diary.

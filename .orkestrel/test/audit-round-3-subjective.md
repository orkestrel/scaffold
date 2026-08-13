# Round 3 — subjective lane verdict (`reviewer`, Opus 5)

Transport: `Read`/`Grep`/`Glob` only, no shell. Every verdict rests on source, guide, tests, manifest
and the 41 comparison packages. Nothing asserted from an execution the lane did not have.

**1. Removing the segment walk from `createScratch` did not open anything — BROKEN.**

It opened a documented write path out of the allocated directory, and the fix round's own new test
asserts the result. `tests/src/server/factories.test.ts:101-115` creates `linked` as a symlink to a
directory outside the scratch, calls `scratch.write('linked/file.txt', 'linked')`, and asserts
`readFileSync(join(outside, 'file.txt'), 'utf8') === 'linked'`. Before the ruling that same call
threw.

The cost the ruling did not price: `destroy()` at `src/server/factories.ts:73-83` calls
`rmSync(path, {recursive:true, force:true})`, which unlinks the symlink and never touches the target.
Every byte `write` placed outside survives `destroy()`. The README's headline promise is "A scratch
directory the test owns and destroys" (`README.md:6`), and this is the one path where a documented
call creates something the destroy contract cannot reach.

What mode `0700` does and does not prevent: `mkdtempSync` gives a random name and, on POSIX,
owner-only permissions. That prevents a *different* uid creating an entry. It does not prevent the
same uid — any other process the user runs, a sibling Vitest worker, or the code under test itself.
It does not prevent root. It says nothing on a host that does not enforce POSIX mode bits. And it is
irrelevant to the actual vector, where the link is one the test placed. Grep scope `src`, `tests`,
`guides`, `README.md`: no assertion of the mode anywhere.

**2. The absolute-path normalization introduced no new escape — UNRESOLVED.**

No escape constructible by reading. An absolute path inside by string and outside by realpath is
caught by the second containment check at `src/server/helpers.ts:65-69`, which re-resolves
`realpathSync.native(candidate)` against `base` (itself already a realpath, line 46). An absolute
path containing `..` that resolves back inside is normalized by `relative`, which resolves both
arguments before differencing. A path equal to the root yields `target === ''`, and
`resolveContained(base, '')` returns `base` — accepted, equivalent to the `['.']` form the suite
exercises at `tests/src/server/helpers.test.ts:61`.

Not settleable by reading: `isAbsolute('C:foo')` is false on `win32`, so a drive-relative target
takes the relative branch and `resolve` joins it against that drive's per-drive cwd rather than
against `base`. Settled by a probe on a Windows host asserting `readInventory(root, ['C:foo'])`,
`readInventory(root, ['\\\\server\\share\\x'])`, and `resolveContained(root, 'C:foo')`.

**3. The raw-JSON fix has no remaining bypass — UNRESOLVED.**

Direction one holds. The graph walk at `src/core/helpers.ts:92-104` reaches everything `JSON.parse`
can produce, including a `__proto__` key materialized from JSON text as an own enumerable property.
A `JSON.rawJSON` value nested at any depth passes the replacer, is emitted as raw text, parses back
as a non-finite number, and is caught by the walk. No route past it.

Direction two is where the lane stops. `pending.push(...current)` at line 100 spreads an array into
arguments, so a legitimate `JSONValue` containing a sufficiently large array raises
`RangeError: Maximum call stack size exceeded` from the copier itself — a value the pre-fix
`JSON.parse` returned without complaint. Smallest fix is one line: replace the two spreads with
`for (const value of current) pending.push(value)` and
`for (const value of Object.values(current)) pending.push(value)`. Settled by asserting
`roundTripJSON(new Array(300_000).fill(0))` returns rather than throws.

**4. The two containment promises are now stated truthfully — BROKEN.**

The bodies are truthful; the heading of rule 7 is not, and it is the sentence a reader carries away.

`guides/test.md:190` reads: **"`createScratch` stays inside its own directory."** The package's own
test proves it does not. That headline was written for the design where the segment walk existed and
made it true; the fix round rewrote the paragraph beneath it and left the heading that the deleted
mechanism was the only support for. The rest of the rule now says "It does not walk the path's
segments for symbolic links," which contradicts its own title three lines above.

The `readInventory` premise at `guides/test.md:177-189` and `213-217` matches
`src/server/helpers.ts:43-44, 62-63, 84` clause for clause. The README's version at `README.md:60-66`
is accurate. The guide alone carries the false heading.

Right looks like: retitle rule 7 to a property the source keeps — "**`createScratch` refuses a
lexically escaping path.**" — and let the body stand.

**5. `resolveContained` is the right survivor — CONFIRMED.**

The recorded semantic difference is real. `packages/scaffold/src/server/helpers.ts:534-543` resolves
both sides through the real filesystem and compares physical paths; its TSDoc at 505-513 states the
dangling-link rule the guide attributes to it. `test/src/server/helpers.ts:13-25` touches the
filesystem not at all. The guide's characterization at `guides/test.md:107-113` is accurate against
both sources, and the recorded exit condition is the right standing instruction.

One versus none also holds. Five call sites across two consumers (`src/server/factories.ts:33, 47, 63`
and `src/server/helpers.ts:56, 66`), so inlining would be three copies of a containment rule — the
failure round 1 was opened on. Taking a runtime dependency on `@orkestrel/scaffold` would put a build
tool in the runtime closure of 41 test suites against a zero-dependency contract.

**6. The parity ruling holds — CONFIRMED.**

Attacked from the actual duplicated file rather than the ruling's description. `tests/guides.test.ts`
is 112 lines; subtract what `@orkestrel/guide` already publishes (`createGuide`, `createSource`,
`parseManifest`, `missingSymbols`, `findMissing`, `fenceImports`, `isExternalLink`, `resolveLink`) and
what `@orkestrel/test` already ships (`readInventory`, `resolveRoot`, `requireValue`), and the residue
is the `behavioral` derivation at 41-44, the specifier filter at 97, and eight `it` registrations.

The derivation fails both remaining gates at once: its input is `source.exports()` — `SurfaceSymbol` —
and its consumer is `source.methods(name)`; naming those violates contract 8, and restating them
structurally restates one package's contract rather than a host-level shape. The registrations are the
part that differs per package. No candidate clears membership, boundary and ownership together.

Stale detail, not a product defect: `parity-ruling.md:48` records "5 types and 12 values", which round
2's deletion of `hasSymbolicLink` moved to 11.

**7. The suite would catch a regression in every one of the 11 values — BROKEN.**

- **`requireValue`'s default message.** `tests/src/core/helpers.test.ts:62-68` passes an explicit
  message in both throwing cases, so nothing exercises `'Value is required'` at
  `src/core/helpers.ts:36`. Change the default and the suite stays green while `guides/test.md:318`
  becomes false in shipped prose.
- **Directory exclusion in `readInventory`.** `src/server/types.ts:45` documents `exclude` as
  excluding "a file **or directory**", and the check that makes it work is `src/server/helpers.ts:87`,
  placed before the `isDirectory` branch. The only exclusion test excludes a file
  (`tests/src/server/helpers.test.ts:139`). Move that check inside the file branch and a documented
  capability breaks with no red test.
- **`collectStream`'s lock release.** Nothing asserts the reader is unlocked. Delete the
  `finally { reader.releaseLock() }` at `src/core/helpers.ts:70-72` and both stream tests still pass
  while a consumer's stream stays permanently locked.

The guide's `// result` comments are unguarded by construction. `tests/guides.test.ts:92-101` checks
that a fence *imports* real exports and nothing more, which the Contract states honestly at
`guides/test.md:145-152`. The fix round's new fence values at 411-418 were verified once by the
writing unit; under the instrument law that is a rehearsal, not a gate.

**8. The guide is true — BROKEN.**

**A stated result the call does not return.** The `## Methods` row for `read` at `guides/test.md:137`
enumerates the throws. `read` at `src/server/factories.ts:58-61` returns `readFileSync(...)` for
anything `exists` reports true for, and `exists` at line 71 reports true for a directory. So `read` on
a contained directory throws a third class the row does not admit — and the guide's own example hands
the reader that exact call: `scratch.exists('src') // true` at line 392. The row was rewritten this
fix round specifically to enumerate the throws, which makes the omission a defect rather than an
ellipsis.

**A false universal replaced by an unfalsifiable one.** What replaced round 1's deleted mechanism
claim, at `guides/test.md:190-191`, again at `207-208`, and again at `README.md:61`, is: "It allocates
with `mkdtempSync`, which creates the directory at mode `0700`, so only the test's own uid can place
an entry inside it." That sentence is the entire stated justification for deleting the symlink walk,
and it is the one host-varying claim in the document that nothing probes and nothing tests. Eight
lines earlier, at `guides/test.md:187-189`, the guide handles a host-varying property correctly and
says so — "Case is the host's decision, not this package's … so the suite probes the running host and
asserts what the probe returned instead of assuming either answer." One document, two host-varying
claims, two standards, and the unprobed one carries the security argument. It is also weaker than it
reads: mode `0700` scopes to a uid, not a process.

**9. The published artifact is what the guide describes — BROKEN.**

The tarball is unverified by this lane. What the manifest determines decides against the claim.
`package.json:13-16` ships `dist/src` and `README.md`. `guides/` never ships — so the 460-line guide,
where `readInventory`'s signature, parameters, key ordering, refusals and example all live, reaches
nobody who installs the package. That leaves `README.md` as the only prose a consumer receives, and in
it `readInventory` gets one subordinate clause at `README.md:57-58`. No signature. No mention that the
second parameter exists, let alone that it is required. No example — while `createScratch`, the
simpler of the two, gets a full worked fence at 29-52.

This is round 2's R8 verbatim, recorded as accepted and carried into this fix round. The round-3 diff
rewrites that exact paragraph and closes the threat-model half while leaving the documentation half
untouched. A carried finding whose own lines were edited and not repaired is the strongest evidence
available that it was dropped rather than judged.

**10. The package is coherent as a whole — BROKEN.**

Everything found in this round sits in one seam, and it is the seam that has consumed all three
rounds.

The core face is genuinely good and was attacked without success. Eight values, every name
predictable without the guide, each doing one thing, the `clear()`-truncates ruling correct and tested
against a captured reference, the zero-dependency and no-foreign-type rules load-bearing and honestly
argued. That half is ready.

The server face is where three rounds have gone, and round 3's result is a specific kind of failure:
round 2's ruling landed in the code and did not land in the prose the ruling existed to correct. The
mechanism changed and the sentences the old mechanism made true were left standing — rule 7's heading,
the `read` row, the README clause round 2 already flagged. The next unit is one more pass over the
*prose*, not the code, which is smaller and better-bounded than a fourth repair.

One observation that blocks nothing: the guide devotes 40 lines (`guides/test.md:225-264`) to a
`## Limits` table of things that do not ship, explicitly labelled "nothing in this section is
importable," which is longer than the entire documentation of the server face that does ship. For a
reader deciding what to adopt, the ratio is inverted.

## Finding outside the claims

**`resolveContained` refuses a target that is contained, and the package works around its own
predicate.** `src/server/helpers.ts:17` returns `undefined` for any absolute `target`, including one
plainly below `root`. The sole return value carries two unrelated meanings, and the guide spells both
out side by side at `guides/test.md:412-413`. The package's own consumer cannot use its own exported
predicate on its own documented input: `readInventory` prepends
`const target = isAbsolute(directory) ? relative(base, directory) : directory` at
`src/server/helpers.ts:55` purely to get around it, and the guide then teaches consumers to repeat
that dance at 415-416. A name reading `resolveContained` that rejects a contained path is misnamed for
its behaviour, and the TSDoc at line 11 papers over it by folding the rejection into "when the target
escapes the root", which is not what happened.

The fix removes machinery from three places rather than adding any. Delete the `isAbsolute(target)`
disjunct at line 17 — absolute *escapes* stay refused because `relative(root, '/etc/passwd')` yields
`'../../etc/passwd'`, which the existing `startsWith('..' + sep)` disjunct catches, and the
`isAbsolute(contained)` disjunct at line 20 stays for the cross-drive case. Then delete the
normalization at line 55, and delete the workaround paragraph and its duplicated fence lines at
`guides/test.md:103-105` and `415-418`.

This is the shape round 2 chose not to look at: it repaired the caller rather than the contract, which
is why the guide grew a paragraph explaining the repair.

---

VERDICT: FAIL — 6 broken, 2 unresolved, 0 not-evidenced, 1 findings outside the claims

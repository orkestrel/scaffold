# FIX-I report — the guide states what the classifier and the advisory do

Role `implementer`, Opus 5, sole serial writer. Brief: `.orkestrel/campaign/fix-i-brief.md`.

## Every prose claim was measured before it was written

The unit transpiled the **emitted proof's own classifier lines** and drove them, rather than
describing the source. The readings that shaped the prose:

```text
array fallback list                 -> undeclared   targets=["./feature"]
array-valued types                  -> driven(decl=./f.d.ts)
require-only with .d.cts            -> driven(decl=./f.d.cts)
import bare string + require types  -> driven(decl=./f.d.cts)   # `??` would have returned ./f.js
types + browser only                -> driven, import=none, require=none   # the unreachable set
pattern with types -> driven | pattern bare js -> undeclared | pattern css only -> excluded
./dist/bundle.js/feature true | ./dist/v1.2/index true | ./x.wasm false | ./LICENSE true
```

The fourth line is the case that proves the Orchestrator's briefed `??` prescription wrong, now
measured rather than argued. The last classifier line is why the guide says "a pattern **naming a
runtime target** reddens" rather than "a pattern reddens" — a precision the brief did not ask for
and measurement earned.

## The corrections

The bundler reason of record is replaced by what actually holds: the branch imports `playwright`,
`@vitest/browser-playwright`, and `./configs/browsers.js`, none of which a core-only workspace has,
and the guide now says plainly that `vite` is not what keeps it conditional because every workspace
declares it.

Classification is stated to read every target under every condition **and every member of a fallback
list**, with Node's reason: a reader taking a later member takes a file the installed tree still
owes.

The partition's guarantee is stated as the pair it now is — membership, plus the assertion naming
every driven subpath whose entry resolves neither an `import` nor a `require` target, because each
drive retires itself for such a subpath and membership alone would leave it measured by nothing.

The runtime-target boundary is stated as the extension the file **name** carries, with the
basename's load-bearing role and the excluded case named honestly: an extensionless file published
for a reader reports undeclared until it is given an extension or a declaration.

The setup comparison is stated as trimmed text, and the population as setup **modules**.

The three undocumented facts are now carried: the iterating declaration lookup, the
declared-but-undriveable set, and the deliberate decision to let a pattern redden.

## Beyond the brief, correctly

The unit corrected two further export-flavoured statements the brief did not name — the guide now
says "what a setup module does" rather than "what its helpers do", matching the shipped advisory's
own wording after FIX-H. It unified on **filled** as the single term for a module whose text differs
from its seed, and gave that term one home.

## A code defect it found and could not fix

`src/core/compilers.ts:1303` carried the **same false reason** the guide did: that the branch is
conditional because `playwright`, `@vitest/browser-playwright`, and `vite` "are declared only
there". `vite` is in `BASE_DEV_DEPENDENCIES` and spread unconditionally. The file was off-limits, so
the unit recorded it against its line rather than reaching for it.

**The Orchestrator corrected it**, and the correction is the same shape the guide took: the branch
is conditional because of the Playwright pair and the resolver scaffold emits only for a browser
workspace, and `vite` is explicitly named as not being the reason.

## The sweeps, with their bounds stated

No other guide states anything this chain falsified: the whole `guides/` directory, 47 files, swept
for each false phrase and then for the subjects themselves. Every hit was in `guides/scaffold.md`;
no mirror was touched.

No manifest in the `@orkestrel` line publishes an extensionless export target: this package plus
every installed `@orkestrel` manifest, 23 in all, walking each entry through strings, arrays, and
nested conditions. That is the population behind the guide's claim.

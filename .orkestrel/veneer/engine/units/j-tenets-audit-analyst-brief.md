# J-TENETS — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Perform the assignment directly and spawn nothing. You hold the objective lane: what the code, the manifest, and the proofs actually establish.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; the shared brief `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tenets-audit-brief.md`, which names the tenets, the subject, and the output.

## Your tenets

- **Allow Orkestrel runtime dependencies and forbid other runtime packages**, for JavaScript and the shipped CSS: read `package.json` (`dependencies`, `peerDependencies`, `optionalDependencies`, `exports`), every import under `src/**`, and what the three builds bundle (`vite.config.ts`, `configs/**`), and name any non-Orkestrel runtime reach, hidden peer, or bundled copy.
- **Ship Veneer's own JavaScript**: search `src/**`, `app/**`, and the showcase's runtime for any Bootstrap JavaScript, Popper, or copied Bootstrap source used to implement behaviour or to make a demonstration pass; separate that from a devDependency used as a test oracle.
- **Prefer the native browser platform**: for each engine mechanism (the popover and anchor placement, `inert` isolation, the scroll lock, `setHTML` sanitizing, transitions, the dialog stack), say whether it uses the native API where Chromium provides one, and name custom machinery with a native equivalent the records do not rule on.
- **Prove Bootstrap parity**: whether each Bootstrap JavaScript plugin's public contract (options and their `data-bs-*` attributes, methods, events and their names, `relatedTarget`, cancelation) is implemented or recorded as an explicit departure the user accepted, and whether the expectations are derived independently of Veneer's implementation (an oracle, a pinned upstream inventory) rather than from the engine itself.

You can run read-only commands (`git`, `rg`, reading files) and no test. Read the checkout at `C:/Users/mikes/WebstormProjects/veneer` on `main` `6d27028`.

## Output

As the shared brief states, ending in its one terminal line.

---
paths:
  - '*.md'
  - 'guides/**/*.md'
  - 'tests/guides.test.ts'
  - 'src/**/types.ts'
  - 'src/**/index.ts'
  - 'app/**/types.ts'
  - 'app/**/index.ts'
  - 'src/styles/**/*'
  - '.agents/skills/**/*.md'
  - '.claude/skills/**/*.md'
---

# Documentation and parity rules

Documentation is an enforced contract, not explanatory decoration. The Writing rules in
`AGENTS.md` govern its prose and are not restated here.

## Authority and workflow

- Read the matching spec/guide before code, form the intended design, then compare implementation. Existing code is a verification target, not ground truth.
- `AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides.
- `guides/README.md` is the map: maintain both a concept index and a directory index. The concept index runs `spec ↔ source ↔ tests ↔ showcase` minus every column whose subject this workspace lacks, so an app-only workspace that publishes no library and builds no showcase still owes a full index over the columns it has.
- Where the repository keeps one, `ROADMAP.md` is the sequenced plan of record. Each chunk reaches green before the next.
- Demonstrate public API in application source, prove its journeys there, and rebuild the selected showcase pages for publication.
- Name each `showcase/<application>.html` page that demonstrates the row in the concept index's showcase column; name `browser.html` for the base modes.
- An integration surface's guide documents the validated hookup for each supported client: the exact commands run, the authentication and approval model that client needs, and the honest limit wherever a client cannot reach part of the surface.

## Parity

- Every backticked API in a guide resolves to a real public export.
- Every public export is documented.
- TypeScript, SCSS, Markdown, tests, and showcase remain aligned.
- A parity failure identifies drift; never suppress or weaken the test.
- A guide `Summary` cell equals its export's doc-block description paragraph, both read in the form
  the `findDrift` function compares (a `{@link}` tag written as its target's code token, whitespace
  collapsed, a code span's boundary whitespace trimmed); a titled `@example` equals the guide fence
  under the heading of that title; and the README pitch equals the guide's tagline.
  `tests/guides.test.ts` asserts each through the `findDrift` function and the `tagline` method
  that `@orkestrel/guide` exports. Invoke the public `GuideCommand` class there with the package's
  inventory policy and direct host ports, and register the package assertions in the anonymous
  callback passed to its `execute` method. The command owns argument validation, explicit
  rewriting, and remaining-drift reporting. Run `npm run test:guides` for read-only parity
  assertions. Use
  `npm run test:guides -- --to guide` or `npm run test:guides -- --to source` only when choosing
  an explicit rewrite direction. Before adopting the generated command, implement its direct
  entry and rewrite directions in the package-owned `tests/guides.test.ts`. Scaffold must not
  synthesize or overwrite that authored proof. Update each fleet package's authored file before
  its release. Never weaken the gate.
- The TSDoc voice rule governs a doc block, and a `Summary` cell carries that block's description
  paragraph, so the same voice governs the cell. A guide tagline and a README pitch are noun
  phrases, and each is the blockquote under its file's H1.
- A vendored dependency guide is a mirror. Its relative links address the upstream tree and resolve to nothing here, so they are outside local-link parity. Refresh a mirror rather than rewriting it: a rewritten copy is a translation, and no comparison against the fetched bytes can check it.
- Falsify a prose claim the way you falsify a code claim. The parity test proves a name exists, never that a sentence about behavior is true, so run the example and read what it returns. A `// false` beside a call that returns `true` is a defect of the same kind as a wrong return value, and it reaches every consumer who installs the package. That proof has a home: `tests/guides.test.ts` executes the flagship fences, per `.claude/rules/tests.md`. An ordered behaviour with no gate is not a gate.
  Asserting that the sentence appears is not asserting that it is true. `expect(text).toContain('a spawn fault reports null')` passes unchanged when the code starts returning something else, so it guards the documentation's presence and nothing about the behaviour. Where a prose claim about behaviour sits under no fence, add the executed assertion that would break if the claim went false, and keep the substring check only as a presence guard beside it. A row whose close condition names a behaviour does not close on a substring.
- Re-read the prose last, against what actually shipped. Where a change chose to document a limit rather than close it, the sentence was often drafted for the option that lost, or written more confidently than the code earns. Code rulings survive review because a test can break them; prose rulings survive because nothing tries.

For behavioral interfaces/classes:

- Document public methods under `## Methods`.
- Use one method table per interface, keyed by its backticked name.
- The table's methods exactly match the interface's call-signature members.
- Readonly data properties remain in the interface's `## Surface` row.
- Each implementing class exposes exactly its interface methods—no missing or extra public behavior.

Parity scope:

- Normally scope a guide to one module directory.
- A layer concept may include the core module and backend modules implementing it.
- Cross-cutting environment-root helpers are covered by behavioral tests rather than forced into one module guide.

## Guide examples

Code fences import through the package's published specifier:

- primary/core API: `@orkestrel/<name>`;
- secondary environment API: `@orkestrel/<name>/<environment>`.

Never use in-repository `@src/*` aliases in public guide examples; reserve them for source/tests.

## Workflow skills

- Skills prescribe reusable process; they do not copy naming, placement, syntax, lifecycle, or test laws from `AGENTS.md` and rules.
- Name a skill directory `orkestrel-<word>`: the prefix and one word naming the process or the subject, such as `orkestrel-harden` or `orkestrel-journey`. Never a second word.
- For a portable skill that teaches an external framework, takes the host project's own `AGENTS.md` file as its code law, and binds none of this repository's rule files, drop the `orkestrel-` prefix and name the skill for the framework a reader searches for. Add no other exception. The `enterprise-bootstrap` skill meets that test and keeps its name: it carries Bootstrap 5.3 craft, assumes no stack, and names the `.agents/orchestration.md` and `.claude/rules/quality.md` files only where they are present. Do not rename it into the namespace.
- Keep `SKILL.md` concise and route conditional detail to one-level `references/`.
- Name every Markdown file in a skill's `references/` from its `SKILL.md`, and delete a reference nothing names.
- Frontmatter contains only `name` and a trigger-focused `description`.
- Set `name` to the skill's own directory name.
- Write `description` as a single-line scalar or a folded `>-` block, and no other shape. Include in it a sentence beginning `Use ` that names when to invoke the skill.
- Do not put model routing or package version catalogs in a skill.
- Validate every referenced resource, leave no template TODOs, and limit each skill directory to `SKILL.md`, `agents/openai.yaml`, the `references/*.md` files its `SKILL.md` names, and the `scripts/*.ts` files its `SKILL.md` names; add no other file or directory.
- Put a repeatable or idempotent step of a skill in `scripts/<name>.ts`, run with `node .agents/skills/<skill>/scripts/<name>.ts` from the checkout root under Node's type stripping, and name the script, its arguments, and its exit codes from `SKILL.md` so an executor runs it instead of re-deriving the step. Name another skill's script by its full path under `.agents/skills/<skill>/scripts/`; the policy sweep attributes a bare `scripts/<name>.ts` token to the skill whose `SKILL.md` carries it and requires a qualified path to exist.
- A skill script obeys `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`, and `.claude/rules/portability.md` as written, plus the no-nested-function and wrapper laws in `.claude/rules/architecture.md`, with these adaptations: an executable script exports nothing, runs `main` at the bottom, and carries the usage line and the exit codes in its opening comment; the types, constants, and helpers it alone needs live in the file, because the kind-file placement law stops at a self-contained script; what two scripts share lives in `.agents/skills/orkestrel-dispatch/scripts/helpers.ts`, the one shared module, which exports declarations with TSDoc, runs no entry point, and carries no usage line; a script imports `node:` modules and that module and nothing else, so the `@orkestrel/process` spawn rule yields to `child_process` there (a target may not declare that package), and imports it with the `.ts` extension, because the checkout runs a script unbuilt; and it spawns `process.execPath` or an executable by name with an argument array and never a shell, except the npm shim where no `npm-cli.js` sits beside the binary. Every script has a mirrored proof at `tests/agents/skills/<skill>/scripts/<name>.test.ts`: an executable script's proof drives it as a child process against a scratch fixture, and the shared module's proof imports it and tests each export. The policy sweep refuses a script without a proof, and a proof grows a case for every defect found.
- Run a script in a target through its built twin, `node node_modules/@orkestrel/scaffold/dist/agents/skills/<skill>/scripts/<name>.js`, because Node refuses to strip types for a file under `node_modules`; `.claude/rules/workspace.md` names the `build:skills` script that emits the twins. When a script spawns a sibling script, take the extension from the running file (`extname(fileURLToPath(import.meta.url))`), so the twin spawns `.js` and the checkout spawns `.ts`. When a script resolves a file under `.agents/templates/`, add that file to the copy in `build:skills`.
- Resolve a sibling canon file (a template, another script) from the script's own location with `import.meta.url`, and the manifest, `tmp/`, and the test tree from the working directory, because a target runs the script from `node_modules/@orkestrel/scaffold/dist/agents/` against its own checkout.
- Read arguments as `--flag value` pairs through the shared helpers: the first occurrence of a flag wins, a value that opens with `--` is a missing value, and `--flag=value` is not read. Where flags select different work (`--visit` or `--plan`), the script names one operation mode per run and refuses two; where each flag adds a section to one report (`--tree` with `--headings`), the script combines them and its usage line says so. Read a flag that repeats (`--range`) through `readOptions` and say in the usage line that it repeats. Exit 64 on every usage refusal and say on stderr what was refused: the usage line when no mode or two modes were given, and the flag with the value it takes when a flag was malformed or given with no value.
- Print to the terminal by default. Offer `--json` for a reader that parses, and `--out FILE` (`.txt` for a list, `.json` for a structure) where a lane reads the result later or the output would crowd a context; a written file saves the tokens a terminal dump spends. Choose per script; state each form in its usage line.
- Verify each API a skill instructs an executor to call against the installed package's public entry before landing the instruction, and name the entry you read. A skill that names a symbol its package does not export teaches an executor to write a dangling import.
- Put every symbol a skill teaches in a named import inside a Markdown fence in `SKILL.md` or a named reference. The policy sweep reads fenced value and type imports from `@orkestrel/*` declaration entries; it does not read identifiers in prose or table cells, or validate call signatures and runtime behavior.
- Import only packages in `BASE_DEV_DEPENDENCIES` in those fences. The sweep refuses a package outside that set because a generated workspace need not install it.
- Write `agents/openai.yaml` as one root `interface:` mapping over exactly `display_name`, `short_description`, and `default_prompt`, in that order, each on its own two-space-indented line.
- Research the external schema only when a consumer needs a key outside `display_name`, `short_description`, and `default_prompt`, and add no key before then.
- Give every one of those keys a non-empty single-quoted scalar, and write an apostrophe inside it as `''`.
- Name the skill's own `$<directory>` token in `default_prompt`.
- Keep provider bridges minimal: they load one canonical workflow and add no competing instructions.
- Give a provider bridge its canonical skill's `name` and `description` verbatim, name the `.agents/skills/<name>/SKILL.md` path it loads, and give it no references of its own.
- Give every canonical skill exactly one provider bridge directory of the same name, and give every bridge directory a canonical twin.
- Review a bridge body's remaining instructions yourself: the policy sweep proves `name` and `description` parity, the named canonical path, and the absence of bridge-owned references, and nothing else about the body.

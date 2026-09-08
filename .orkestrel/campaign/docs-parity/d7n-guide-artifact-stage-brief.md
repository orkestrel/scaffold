# Guide runtime-aligned artifact preparation

Act as native builder on Terra. Author the specified staging carrier; root runs it.
Perform the assignment directly and spawn nothing. You are not alone in the workspace;
preserve all other edits. No installs, mutating gates, commits, pushes, uploads,
credential reads or canonical package edits are authorized to this role.

Read scaffold AGENTS.md, .agents/orchestration.md and its portability, architecture,
TypeScript, tests, quality and writing rules. Read orkestrel-align-packages with fleet
and integration references and orkestrel-harden-package with centralization, contract
and hardening references. Read ../guide/guides/README.md, its guides/guide.md public
comparison contracts and src/core/types.ts. Read campaign d7n-guide-heading-close-verdict.md,
d7n-guide-heading-close-fix-brief.md and the corresponding review/verification briefs.
The reader correction is closed. Do not reopen it or implement the pending entry design.

Adapt tmp/pass/markdown-artifact-stage/* and its accepted verdict. Own only
tmp/pass/guide-artifact-stage/{run.sh,mutate.mjs,inspect.mjs,metadata.mjs,smoke.mjs,
smoke.cjs,functions.cjs,consumer-package.json}. No repair driver is needed: Guide's
accepted source already has the selected scaffold path correction. Preserve all guards,
logging, failure exits, archived-copy Git boundary, correct pack cwd, package/dist
comparison and canonical-state receipts from the predecessor. Do not generalize it.

Substitute these exact inputs and behavior:

- Canonical Guide C:/Users/mikes/WebstormProjects/guide, branch
  claude/orkestrel-npm-audit-deps-14ibta, full SHA
  ef6ada9975d71ce97ac20239f473c02b77e84cd9. Require clean state, fetch origin, require
  origin/main ancestry and unchanged tip/branch. Stop on a moved main or source tip.
- Use tmp/pass/d7n-guide-stage.XXXXXX with archived child guide. Keep version 0.0.18.
  Query registry version/versions and refuse if that candidate version is served.
- Bootstrap the archived unchanged lock with npm ci --ignore-scripts. In the
  disposable manifest change only dependencies Contract ^0.0.16 to ^0.0.17 and
  Markdown ^0.0.13 to ^0.0.14. Keep the old lock unchanged and label it bootstrap,
  not a release lock. No script, dev, peer, optional or package files change.
- Reuse the Markdown carrier's accepted Contract, HTML and Test tarball inputs and
  digests. Add Markdown at tmp/pass/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz,
  SHA256 02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3.
  Install Contract, HTML, Markdown and Test simultaneously with --no-save
  --ignore-scripts --package-lock=false. Do not install Guide into its own package.
- Inspect resolved runtime identity from Guide and Markdown contexts, including
  HTML's Contract resolution. Keep raw npm ls exit truth and let the independent
  verifier rule on bootstrap range mismatches. Do not conceal an unexpected runtime
  mismatch with the predecessor's explanatory line.
- Root runs format:check, lint:check, check, build and test in order, logged and
  fail-fast. Do not run the docs writer. No full tests run while a Guide writer is live.
- Pack from the Guide cwd with --ignore-scripts. Require orkestrel-guide-0.0.18.tgz,
  hash/extract it, compare full manifest and dist with the staged build, and record
  source, semantic pins and every artifact identity. This is the runtime-aligned
  baseline before parity-entry changes, not the final replacement tooling claim.
- Install Contract, HTML, Markdown and the packed Guide together in an empty private
  consumer. Drive ESM and CJS with the documented findDrift fixture: guide markdown
  '## Surface\n\n| Name | Kind | Summary |\n| --- | --- | --- |\n| `walk` | function | Walks the tree. |';
  source inventory src/core/index.ts exporting './helpers.js', src/core/helpers.ts
  containing '/**\n * Walks a tree.\n */\nexport function walk(): void {}\n', module src/core.
  Require findDrift to return the exact function walk disagreement with guide text
  'Walks the tree.' and source text 'Walks a tree.'. Also call
  createSurfaceSymbolContract().is({ name: 'Markdown', keyword: 'class' }) and require
  true. These real public paths compose the prepared Markdown and Contract inputs.
- Verify runtime semantic pins in the packed manifest, same physical installed
  Contract/Markdown/HTML copies from dependent contexts, and installed ESM/CJS entry
  hashes against extracted accepted inputs. Use the existing centralized hash helper.
- Record registry-final test:distribution as not run until runtime versions are
  served. Record parity-entry consolidation and material comparison as pending.
  Never claim publication readiness, manufacture a registry lock, link a package,
  use source imports in the consumer or install into primary scaffold.

Use node:path for filesystem paths, forward-slash authored host paths, pass-env.sh in
every run and plain saved-script invocations. Return owned paths, syntax/static check
results and the exact root launch. Root supplies executed evidence for independent
verification. Stop on any required product edit or unavailable specified input.

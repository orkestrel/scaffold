# Prepare the native diagnostic observation

Act as builder on the native mechanical route. Perform directly and spawn nothing.
Read AGENTS.md, .agents/orchestration.md, portability, tests, workspace, and quality
rules, and orkestrel-harden-package with its required references. Other units own all
package source. Own only tmp/pass/guide-policy-observe.mjs, guide-policy-observe.sh,
and tmp/units/d7n-guide-policy-observe-instruments-report.md. Use apply_patch and syntax
checks only. No package writes, test or instrument body, install, commit, push, credential
read, or permission change. This unit gathers no observation itself.

The root observation must inspect the actual lint binary's JSON without changing a
vendored file. Use native filesystem, path, module, OS, and child-process APIs. Do not
import setupPolicy.ts through its .js specifiers into raw Node or add a loader dependency.
Do not add a parser, compiler wrapper, or production helper. Temporary fixture creation
belongs only in the root-run instrument. Leave those temporary directories in place for
evidence; never delete or move a directory in this unit.

The mjs script accepts the guide checkout and a fresh output directory. Validate those
arguments. Resolve oxlint/package.json with createRequire anchored to guide/package.json
and validate its bin.oxlint or string bin as the real config test does. Record that entry,
its installed version, Node version/platform, and fixture roots using forward-slash output.

Create distinct native temporary roots with mkdtempSync and a task-specific prefix.
In each, copy guide/.oxlintrc.json and guide/configs/policy.ts byte-for-byte to the same
relative paths. Use a module-scope write helper constrained to the named relative fixture
paths. Never copy or inspect .npmrc, .env, auth files, or unrelated workspace content.

In the minimal root, write src/violations/fixture.ts with exactly vi.mock('./x') plus LF.
Run the resolved real binary with process.execPath, --config pointing to that root's
.oxlintrc.json, --format json, and src/violations; cwd is that root, encoding utf8, timeout
15000 ms, no shell. Retain stdout, stderr, actual status, error/signal when present, and
each diagnostic's code, filename, and message. Do not assert that no-mocking is present.

In the complete root, copy the inert fixture text and relative targets exactly from
guide/tests/config.test.ts:1755-1810: src/violations/fixture.ts, helpers.ts, parsers.ts,
factories.ts, constants.ts, composables.ts; app/browser/composables/useTheme.ts;
scripts/read.ts; src/clean/CleanMember.ts. Do not execute fixture behavior. Invoke the
same real binary first with src/violations, app, scripts and then with src/clean, as
the case at :1833-1843 does. Retain the same raw and normalized observations for each.

Use exit 0 for successful collection even when lint reports violations; record its exit
as data. A spawn error, timeout, absent stdout, malformed JSON, or missing diagnostics
array is a collection failure and must fail the script. Do not infer the failure's cause.

The shell wrapper sources pass-env.sh, requires the guide checkout, creates a fresh log
directory below $SCR, captures guide's status/diff before and after, and invokes the mjs
script from the host under a cap. Print the evidence path. Preserve collection failures
and refuse changed tracked state. No gate acceptance, config repair, or fleet sweep.

Report scripts and syntax exits. Preserve prior artifacts. No prose counts or engine IDs.

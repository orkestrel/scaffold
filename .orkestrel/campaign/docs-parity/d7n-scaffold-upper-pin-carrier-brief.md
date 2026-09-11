# Finish the pin fixture formatting and evidence carrier

Act as the mechanical builder on the native builder engine. Continue the scoped
fixture unit after reading its saved brief and all authority it names. You are
not alone in Scaffold; preserve all unrelated changes. Spawn nothing. Do not
install, build, commit, push, authenticate, publish, or run a whole suite.

Own only these new scripts under tmp/pass:

- format-upper-pin-fixture.ps1: format the terminal newline of the literal
  canonical tests/src/core/fixtures/app-only-toolchain.txt path. Verify its
  current text ends in a line feed and remove only that terminal line ending,
  using UTF-8 without BOM and preserving all other characters. Refuse any
  other target. This formatting operation repairs apply_patch's added newline;
  it may use the platform file API as a formatting command. Do not execute it.
- run-upper-cli-pin-case.sh: source pass-env.sh, accept a safe fresh evidence
  label, create that directory under SCR, cd to canonical Scaffold, run exactly
  node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache
  --reporter=verbose --project src:bin tests/src/bin/CLI.test.ts
  -t 'reports only the missing shared test tool for an app-only workspace'.
  Capture stdout, stderr and actual exit to files. Return that exit. Root runs it.

Create scripts with apply_patch. Do not change the fixture further. Return the
paths and syntax-check exits. Root reads and executes the scripts and reruns
the original red commands. The final independent audit includes this formatting
correction and carrier. No new public contract or project source logic is added.

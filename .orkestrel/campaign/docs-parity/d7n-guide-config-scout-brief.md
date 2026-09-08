# Map the missing policy diagnostic

Act as a read-only evidence scout. Perform directly and spawn nothing. Read scaffold
AGENTS.md, .agents/orchestration.md, portability, workspace, tests, and quality rules.
Use orkestrel-harden-package with its required references for a bounded diagnostic map.
Read the governing policy/workspace guide sections reached by the named files.

Question: what actual rule, fixture, and host-path chain supplies the expected
policy(no-mocking) diagnostic in guide's config case, and what exact input would let
root inspect the missing diagnostic without editing a vendored target file?

Read these input rows at evidence depth:
- guide/tests/config.test.ts around the case named "loads every configured policy rule
  through the real binary", including its expected diagnostics and fixture setup.
- guide/configs/policy.ts, guide/configs/helpers.ts, and the fixture/helper declarations
  that this case actually imports. Follow only the no-mocking diagnostic path.
- the matching scaffold-owned canonical policy and test code, comparing only the reached
  seam with guide's vendored copy. Scaffold's owner manifest and staged lockfile are private
  working changes for this task: do not read or change them.
- guide/package.json and installed package metadata/declarations for the lint and test
  capabilities this exact case reaches; no registry or broad dependency survey.
- scaffold/tmp/pass/d7n-guide-heading-validate.YG8PtL/test.log.txt and
  scaffold/tmp/pass/d7n-guide-config-host.log.txt. The full chain failed, then root reran
  the named config case alone and received the same failure. No attribution is established.

Return a compact file:line map from fixture text to real binary invocation to parsed
diagnostics and the expected no-mocking entry. State the exact settled facts, meaningful
byte differences in the reached canonical seam, and unknowns for every unreached input.
Return a root-run command or fixture entry path for observing the real diagnostic output,
not a proposed fix. Do not design, decide, audit the heading edit, edit a file, run tests,
install, build, pack, read credentials, alter permissions, commit, or push. Do not absorb
unrelated fleet files. No raw dumps, prose counts, or engine identifiers in the result.

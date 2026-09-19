# Unit published-scaffold-comparison — Compare shipped archive payloads

## Role and engine

builder on Terra, reached as a native subagent. Open this brief from the scratch directory.

## Objective

Produce executed byte-level evidence explaining the published Scaffold0.0.75 archive's difference from the accepted prepared archive.

## Context

**Evidence.** Root ran `npm.cmd view @orkestrel/scaffold@0.0.75 dist --json --prefer-online --registry=https://registry.npmjs.org`; the returned integrity is sha512-ueJmibzyJKE7fyATUgc+CUWIKpfUEJxUm8oXBSFSrusuZiRYF6s7SfdCyQFmB37vN8+SoUVCssKV4/54sr1fEA== and tarball https://registry.npmjs.org/@orkestrel/scaffold/-/scaffold-0.0.75.tgz. Root fetched those bytes with Invoke-WebRequest into C:/Users/mikes/AppData/Local/Temp/scaffold-registry-20260918/scaffold-0.0.75.tgz, exit0. Prepared bytes are C:/Users/mikes/WebstormProjects/scaffold/tmp/release/anchor-pack/orkestrel-scaffold-0.0.75.tgz; expected integrity sha512-PEcCza8w+5lQqnZX0AP8QhCV3msFOf0JeBz0fwhvu4LP230avF14HuIUWPUkWCIxd1YxaYNM4pdgEFmqwWFi8A==. Prior accepted identity resides in the adjacent metadata.json. Source commit c64f7872d82a1718e722b8cb6a72af5f97506b58. Canonical main2574f559ba7b093df9b594e7c0003d7a3ff91fcf adds retained evidence only.

**Law.** Read Scaffold AGENTS.md, .agents/orchestration.md, .claude/rules/portability.md, quality.md, and writing.md; orkestrel-publish/SKILL.md and references/wave.md and window.md; guides/README.md and the release/ownership portions of guides/scaffold.md. No product code or installed-state changes. No dependencies, assertions, suppressions, mocks, or nested helpers.

**Installed primitives.** Native Node builtins and installed Windows tar. Use spawnSync with byte buffers for tar output. No product API or custom archive parser.

**Host.** Windows PowerShell5.1, Node24.20.0/npm12.0.2. Network available but no further downloads requested. Use scratch directory C:/Users/mikes/AppData/Local/Temp/scaffold-registry-20260918 for every owned write. Canonical has a separate script writer; do not write there.

**Measurements.** Independently measure archive SHA256, SHA512, size and tar listings. Do not accept version equality as payload equality.

**Control identifiers.** Compare payloads through the same comparator with a synthetic excluded-path entry and a changed byte in an inert copied buffer. Prove missing membership and changed contents produce a difference. Keep test names property-based.

**Standing conditions.** Prepared source and release gates are accepted. The published artifact integrity differs. Do not rerun gates or infer corruption.

## Unknowns

The differing members and their causes are unknown. Return their names, hashes, and bounded exact text diffs. Report binary or oversized deltas without interpretation. Root rules on adoption.

## Scope

**Owned.** Only comparison.mjs, comparison-report.md, and comparison-evidence/ inside the scratch directory. Existing downloaded tarball and brief remain immutable.

**Shared (report-only).** Archive bytes and accepted metadata. Original and recovery Roughnotes are outside the search scope.

**Off-limits.** All repository writes, secrets, .codex, .env files, npm configuration, archives, prior evidence and installed packages.

**What asserts the state this change ends.** No existing record becomes false. This instrument supplies the missing comparison evidence.

**Tools and limits.** Read inputs, write owned scratch artifacts, run Node/tar checks. Never install, commit, push, publish, delete or delegate. You are not alone; preserve others' work.

## Execution

Perform the assignment directly and spawn nothing.

Author a narrow Node instrument. List each archive through tar, reject unexpected non-package paths, absolute/traversal paths, duplicates and non-regular payload entries. Read regular entry bytes with tar -xOf into buffers without extracting into either tree. Compare complete member membership and SHA256 per member. Check each archive's supplied integrity. Write a per-member inventory and comparison JSON plus bounded text diffs for changed members under comparison-evidence. Include manifest differences. Do not ignore sourcemaps or whitespace in this exact comparison; classify raw differences without accepting them. Run syntax and inert comparator controls, then actual comparison. Return native exit codes. A payload mismatch is a report, not a failure of the instrument.

## Output

Write comparison-report.md and return its path, integrity checks, different member names, exact changed text if bounded, control and command exit results, and source/instrument hashes. Report facts only.

## Deviation contract

Follow orchestration § Deviation protocol. Stop if archive inventory is unsafe, tar is unavailable, or a necessary write falls outside scratch. Settle log layout and function names yourself.

## Acceptance criteria

- Syntax and executed comparator controls pass, and each negative control distinguishes the introduced difference.
- Archive identities match their supplied integrity values.
- Every regular member appears in the comparison inventory; differing members carry byte/hash evidence.
- No repository file or input archive changes.

**Observations, not criteria.** Root decides whether shipped differences require further proof. No source, UI or release gate claim belongs here.

## Review evidence

Retain the executed instrument, input hashes, tar listings, comparator controls and raw comparison. Provide actual owned file inventory and diff evidence. Root will retain and independently verify the result.

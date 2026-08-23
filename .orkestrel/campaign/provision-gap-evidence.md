# Provision gaps — what scaffold plans, and what the fleet actually carries

Measured 2026-08-23. Two instruments, both executed rather than reasoned.

## What scaffold plans under `tests/`

Run against a core-only target that lacks the distribution proof:

```text
node dist/bin/main.js audit --target /home/user/abort --json
```

The planned `tests/` artifacts, with the ownership each carries:

```text
tests/setup.ts                [birth/aligned]
tests/src/core/index.test.ts  [birth/aligned]
tests/setupPolicy.ts          [content/aligned]
tests/policy.test.ts          [content/aligned]
tests/config.test.ts          [content/aligned]
```

`tests/distribution.test.ts` appears nowhere in the plan, and the same run against
`/home/user/process` — which carries the proof — never mentions distribution either, across 123
findings all reported aligned.

This settles a question a lens had reasoned about rather than run. The proof is not an artifact
scaffold owns and reports as missing. It is **unplanned and unowned**: the blueprint field gates
only the Vitest project and the manifest script, never an artifact. So the repair is not flipping
a flag. It is adding the artifact to the plan and giving it an ownership claim.

## What the fleet carries

Existence test per path across all 48 `@orkestrel` packages under `/home/user`.

Propagated correctly, present in every package: `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/setup.ts`, `configs/policy.ts`, and `configs/helpers.ts`.

Tracking a face, which is the correct behaviour: `tests/setupServer.ts` in 22, `tests/setupBrowser.ts`
in 8, and `configs/browsers.ts` in 8. The browser pair agree with each other and with the seven
packages carrying a browser face.

Genuinely a workspace's own choice: `tests/setupService.ts` in 2, present only where a package
drives a live external service.

Absent across most of the fleet, each to be ruled self-fulfilling or optional:

- `tests/distribution.test.ts` — carried by `brief`, `mcp`, `probe`, `process`, and `scaffold`.
- `tests/setup.test.ts` — carried by `mcp` and `terminal`. Every package carries `tests/setup.ts`,
  so the fleet's setup helpers are unproven almost everywhere, and the `setup` project is
  registered from a file matching `tests/setup*.test.ts` — the same self-fulfilling shape.
- `tests/integration.test.ts` — carried by `brief`, `mcp`, `probe`, and `process`.
- `tests/conformance.test.ts` — carried by `mcp` and `probe`.
- `tests/guides.test.ts` — carried by every package except `supervisor`, which is a single-target
  gap rather than a class.

## Coverage

The population is directories under `/home/user` holding an `@orkestrel` manifest. The test is
path existence; it does not read a file's content, so a present-but-empty proof reads as present.
The audit readings are two targets, not the fleet.

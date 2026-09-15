**Touched files**

Wrote `tmp/units/a2-report-2.md`. No source or permanent test files changed. The temporary limit probe was removed after execution. The first-run report remains untouched.

`git diff --stat` returned no stdout.

**Red then green**

No implementation repair is claimed. The limit probe used this command:

```text
npm.cmd run test:probe -- tmp/probe/a2-limit.test.ts
```

On Windows on 2026-09-14, the probe passed. Its negative control changed the equality assertion to inequality and exited 1 with 1 failed test. Restoring the assertion exited 0 with 1 passed test.

The probe drove real `Request` bodies through the landed `readText` and `parseJSONAs(text, providerRequestContract.is)`. With a limit of 18 bytes:

- `'{"messages":[]}'` is 15 bytes and ends below the limit.
- `'\uFEFF{"messages":[]} '` is 19 bytes and exceeds the limit.
- Each read returns exactly `'{"messages":[]}'`, which re-encodes to 15 bytes and passes the compiled request contract.

The UTF-8 decoder removes the leading byte-order mark; the bounded reader discards the trailing space. The probe proves that decoded text alone cannot distinguish these inputs. It does not prove a relay handler's behavior.

Authorization-throw, fixed-error-message, and abort-reconstruction proofs did not run.

**Scoped validation**

No lint, typecheck, core-suite, or setup-suite gates ran. Implementation stopped at the contract mismatch. No build, install, commit, or delegation ran.

**Observations**

The successor's `parser` correction agrees with the landed contract and is not a blocker.

The reader declares `Promise<string>` at `src/core/helpers.ts:828`. Its loop stops at the byte budget at line 849, its EOF branch exposes no completion flag at line 851, and it returns only decoded text at line 856. Cleanup cancels the reader at line 860.

Git exited 0 and emitted:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

**Deviation**

- **Expected:** `tmp/units/a2-brief.md:111-113` requires `readText(request.body, limit ?? DEFAULT_RELAY_LIMIT)`, followed by a `413` response when the read reaches the limit without ending. The landed `RelayOptions.limit` documentation at `src/core/types.ts:2247` requires rejection when the byte limit is exceeded.
- **Found:** the prescribed reader returns neither consumed bytes nor truncation/completion state. The executed inputs produce identical valid text despite requiring different limit decisions. Re-encoding the returned text cannot recover the missing information.
- **Constraint:** `tmp/units/a2-brief.md:138-140` makes `helpers.ts` off-limits. Its deviation contract at lines 166-168 requires stopping when A1's contract cannot express a required semantic.
- **Done / not done:** verified the mismatch with the real reader and compiled contract; no relay implementation was written.
- **Hypothesis:** the brief assumes that the bounded reader exposes truncation. A successor needs to authorize a byte-count/completion seam or revise the prescribed read composition.

**Status**

Stopped under the brief's deviation contract. A2 remains unimplemented.

`git status --porcelain` returned no stdout; the report resides under ignored `tmp/`.

The MCP proof call was blocked with `MCP tool call requires approval, but approval policy is never`. It supplied no receipt or closing `no receipt` line. The evidence reported here comes from the local Vitest probe and its negative control.


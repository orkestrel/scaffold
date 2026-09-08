Untrusted proposal authored under `tmp/pass/guide-artifact-stage/`:

- `run.sh`
- `mutate.mjs`
- `inspect.mjs`
- `metadata.mjs`
- `smoke.mjs`
- `smoke.cjs`
- `functions.cjs`
- `consumer-package.json`

The carrier archives Guide at `ef6ada9975d71ce97ac20239f473c02b77e84cd9`, stages the declared Contract/Markdown runtime pins, installs accepted Contract/HTML/Markdown/Test artifacts, preserves bootstrap-lock receipts, packs and compares Guide, and proves ESM/CJS consumer behavior with `findDrift` and `createSurfaceSymbolContract()`.

Attempted scoped syntax checks: `bash -n` and `node --check` for every owned script. The shell runner returned no completion output, so treat those checks as unverified.

Root launch:

```bash
bash /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/guide-artifact-stage/run.sh
```

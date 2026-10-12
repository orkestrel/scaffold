# Aggregate final cell driver offline check — successor 2

The original invocation failure remains in `aggregate-final-cell-driver-check-report.md` unchanged. This successor uses the compiler's installed `--ignoreConfig` option; the sealed driver was not edited. Its starting seal is the previously confirmed `feef1e8b51e5fa21b46f6be74d11b5f5fb0533e3e4027a6bcc0ea4df8b5f050c`; the final measured SHA-256 is the same.

Commands ran from `C:/Users/mikes/WebstormProjects/scaffold`:

| Command | Exit | Duration | Output |
| --- | ---: | ---: | --- |
| `node node_modules/typescript/bin/tsc --ignoreConfig --noEmit --strict --target ES2024 --module NodeNext --moduleResolution NodeNext --types node --skipLibCheck tmp/units/aggregate-final-cell-driver-check-flag-probe.ts` | 0 | 0.635 s | No output. The owned probe contains only a string constant and `void` use. |
| `node node_modules/typescript/bin/tsc --ignoreConfig --noEmit --strict --target ES2024 --module NodeNext --moduleResolution NodeNext --types node --skipLibCheck tmp/units/aggregate-final-cell-driver.ts` | 0 | 0.805 s | No diagnostics. |
| `node tmp/units/aggregate-final-cell-driver.ts q4-think0` | 0 | 1.211 s | Full stdout captured at `aggregate-final-cell-driver-check-q4-think0-2.stdout.json`; stderr capture is empty at `aggregate-final-cell-driver-check-q4-think0-2.stderr.txt`. |
| `node tmp/units/aggregate-final-cell-driver.ts q9-think0` | 1 | 0.268 s | Stdout was empty (0 bytes). Stderr capture is `aggregate-final-cell-driver-check-q9-think0-2.stderr.txt`; PowerShell wraps the Node stderr in a `NativeCommandError` record, whose complete underlying message is `Error: usage: aggregate-final-cell-driver.ts q4-think0|q4-think1|g2-think1|g4-think0|g4-think1|q2-think1 [--live]`. |

The q4 dry plan reported `live: false`, frozen-manifest SHA-256 `2eaffe7d6c4b8f3fc83802130b8b0be18778abb5b4362a154157bcbcab41d831`, build-manifest SHA-256 `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`, deployment SHA-256 `c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed`, and q4 fit SHA-256 `f694c01ffd924c8c59a17a3e190c4a2e90f4bcc89b4c82024a281f4954f1be56`. Its prospective nested stages/caps were resource 7200 seconds, full 7200 seconds, and pilot 10800 seconds; the outer cap was 25920 seconds. Every printed prospective nested argv is captured in the stdout JSON. No `--live` was passed to the driver.

All 19 q4 phase/log/sequence paths were absent in the dry plan and remained absent after both invocations. The q4 sequence receipt also remained absent. Thus no measured artifact was created. The invalid q9 cell rejected with usage before driver file or inference work. The previously recorded syntax check passed and remains applicable; it was not repeated. No model request, source/build write, Git mutation, installation, service operation, or cleanup occurred. These checks establish offline syntax/type and argument behavior only; they make no live-performance claim.

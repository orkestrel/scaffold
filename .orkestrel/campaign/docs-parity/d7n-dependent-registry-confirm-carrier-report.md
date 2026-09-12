# Dependent registry confirmation carrier report

The predecessor dispatch stopped before edits because it resolved campaign records under `tmp/units`.

## Changed paths

- `tmp/pass/confirm-dependent-registry.ps1`
- `tmp/pass/run-dependent-registry-confirm.sh`
- `tmp/units/d7n-dependent-registry-confirm-carrier-report.md`

## Predecessor delta

The PowerShell instrument preserves `confirm-upper-registry.ps1` checks and refusal behavior. Its output path is `d7n-dependent-registry-confirm-closed`. Its package data is:

| Name | Version | Head | SHA256 | Label |
| --- | --- | --- | --- | --- |
| brief | 0.0.8 | 5cc84a937c929a2d84961353871346107d1ef066 | ad1afafe3d5d4a3f40c81d2597a5c0a2439b2d73cf79bb0a37dd12debddc819f | d7n-brief-final-registry-visit-pack |
| mcp | 0.0.29 | 45ba0a4b5741a79f32500479de9549c0e6a17839 | 0a9a407c083aa9f4907d93e03fac095d9254a4f57d930fdfd5a3df364d09a97e | d7n-mcp-final-registry-visit-pack |
| middleware | 0.0.20 | af01ea39388c05da52fb954476cac0ba423a5f23 | 03a520c6773a8c5e9797aef8ce5c02417d9bb2358f2a905d91ed8ed068dcac42 | d7n-middleware-final-registry-visit-pack |
| program | 0.0.13 | f474b0aa1e8ab0565c8fe0f818ec816e7c5052cb | 14531aac23bcadacb11b2d344591f58e3f0ed8ff0ccc895864906d69448c7201 | d7n-program-final-registry-visit-pack |
| worker | 0.0.12 | 4df117583143117a21b23246b27b6addd42ef0b9 | 046e323e3b3488db028f7fac65875a9a1e2c56d981bc11592292a99a1666511d | d7n-worker-final-registry-visit-pack |
| workflow | 0.0.18 | 0789593a6ab1b2905b16fd2f95a5b30e700888c5 | f7b89c454aa2b63a267479c87a2a33ff9d69ddd02793137cc00b382cfa3073e5 | d7n-workflow-final-registry-visit-pack |

The Bash launcher sources `pass-env.sh`, refuses an existing `d7n-dependent-registry-confirm-run` folder, records stdout, stderr, and exit status, and returns the confirmation status after the bounded PowerShell call.

## Validation

`[scriptblock]::Create((Get-Content -Raw tmp/pass/confirm-dependent-registry.ps1))` exited 0.

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/run-dependent-registry-confirm.sh` exited 0.

The launcher and the confirmation instrument have not executed. Registry, git, accepted-archive, and refusal behavior remain unvalidated until root runs the instrument.

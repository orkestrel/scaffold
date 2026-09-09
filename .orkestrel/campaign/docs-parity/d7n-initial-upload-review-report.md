The carrier passes source review against its brief. Its stdin requirement conflicts with the publish skill and needs root reconciliation before use.

The reviewed claims survive at source level:

| Claim | Reading |
|---|---|
| Operator boundary | `--publish` and terminal stdin/stdout checks precede validation and authentication. |
| Pre-authentication validation | Every listed package passes name/version, clean canonical `main`, fetched `origin/main`, receipt, archive digest, manifest, and distribution checks before login. Missing preparation evidence stops this path. |
| Receipt paths | Paths match `pack-foundation-final.sh` and the inspected final receipts, including `extract/package`, `archive.sha256`, and `pack.exit.txt`. |
| Terminal handling | npm inherits input and output. The script neither pipes interactive output nor writes stdin. |
| Upload sequence | Login precedes `whoami`, immediately followed by serial tarball uploads with `--ignore-scripts` and `--browser=false`. |
| Window and failures | No preparation runs between uploads. `set -e` stops a failed command. No retry loop, token prompt, or auth-file handling appears. Completion explicitly awaits root registry confirmation. |

Evidence: [upload carrier](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/upload-initial-layer.sh:13), [pack receipt producer](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/pack-foundation-final.sh:78).

The instruction mismatch is explicit: [window.md](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-publish/references/window.md:19) requires FIFO-held stdin and repeats that requirement for Windows. The carrier brief instead requires normal terminal stdin, which the script enforces. I did not silently choose between them.

Git Bash syntax validation exited `0`. Runtime refusal, authentication, and upload behavior remain **not measured**; I did not execute the carrier.

VERDICT: SOURCE PASS; stdin-policy reconciliation remains open.

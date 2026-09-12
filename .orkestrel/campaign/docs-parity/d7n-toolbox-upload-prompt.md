# Publish the accepted Toolbox candidate

The root prompt.txt contains the Toolbox0.0.13 upload command only. It replaces the consumed Agent/Probe command. Scaffold0.0.65 and Ollama0.0.15 remain excluded: their recorded release holds are unresolved, and Ollama remains on its campaign branch. The request for the command does not waive those holds or convert their source-checkpoint verdicts into release acceptance.

The fresh registry readings return Toolbox0.0.12, Scaffold0.0.64, and Ollama0.0.14. The canonical Toolbox main, origin/main, and campaign refs match21068c362ec4c8cf79432da11402ae5350ba1fce after fetch. The checkout is clean. The successful confirmation checks the accepted archive digest, gate manifest/lock hashes, complete canonical dist and packed manifest equality, and the retained successful prepublish/closure receipts. Read evidence/d7n-toolbox-prompt-confirmation.

The confirmation reuses confirm-agent-probe-layer.sh with only its selected package invocation changed to Toolbox0.0.13. The attempted direct Bash shell override could not start through the host's unregistered Linux launcher; root stopped those invocations and ran the retained-file form through the explicit Git Bash executable. No package file changed and no runtime was installed.

The PowerShell line uses the existing accepted upload-command form. It changes to the canonical Toolbox folder, checks the operator's login, and publishes with lifecycle scripts disabled. It stops on login or upload failure. The parser checks syntax without executing the line. The root does not authenticate or upload.

After the owner upload, confirm Toolbox's registry archive and gitHead. Continue the held Scaffold/Ollama work from d7n-ollama-hook-linux-reading.md and d7n-scaffold-hook-candidate-landing.md. The pending Scaffold development re-pin remains a later artifact-comparison obligation, not a claim that Toolbox already adopted the unpublished host.

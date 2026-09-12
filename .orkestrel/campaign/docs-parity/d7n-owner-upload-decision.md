# Owner-approved upload scope

The owner authorizes Scaffold0.0.65, Ollama0.0.15, and Toolbox0.0.13 for upload despite the recorded verification gaps. This decision supersedes the Toolbox-only selection in d7n-toolbox-upload-prompt.md. It does not change an earlier test result or claim the gaps were repaired.

The Windows operator runs the root prompt.txt command from a real PowerShell terminal. The command uploads Scaffold, then Ollama, then Toolbox. It checks authentication before uploading and stops at any failed upload. The command runs no install, build, or gate. The Orchestrator does not authenticate or upload.

The existing source reviews and root gate evidence remain the acceptance inputs. Linux owned-daemon failure/cleanup behavior remains unproved. The Ubuntu Node26 job passed automatic installation and the real service suite; the Node22.12 job failed at the lint-plugin loader. Read d7n-ollama-hook-linux-reading.md for the unchanged evidence and follow-up scope. The owner waives those release holds, not their factual readings.

Ollama and Toolbox retain registry-resolvable Scaffold development pins for this upload. The Scaffold development re-pin follows registry confirmation and does not require another package release unless the rebuilt distributable moves materially. Scaffold's accepted host overwrite remains in canonical Ollama; restoring installed registry tooling must not overwrite that host with an earlier copy.

Completion for this handoff requires prepared canonical dist, manifest identity with the tested artifacts, clean local main matching pushed main in each selected checkout, retained root registry-install/gate evidence, and the parsed root prompt committed with the campaign. Registry confirmation remains pending until the owner reports the upload result.

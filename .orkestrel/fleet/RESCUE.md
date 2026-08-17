# Rescue branch — git-proxy outage 2026-08-17

The session git proxy answers 401 on git-receive-pack while fetch works, so seven gates-green
commits are queued locally (scaffold x3, worker, workflow, brief, program). This branch carries
the irreplaceable scaffold bytes as insurance until the proxy recovers and the real commits push.

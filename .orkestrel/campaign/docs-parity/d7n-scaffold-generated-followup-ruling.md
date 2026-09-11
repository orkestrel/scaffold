# Scaffold generated follow-up ruling

Keep the accepted Scaffold0.0.64 release state for the active runtime upload layer. Carry its newly generated Guide development re-pin and refreshed catalog into a later Scaffold release, not an unversioned development-only commit.

Root measured the generated state with npm run build; exit 0. Against the accepted published archive, the material source comparison exited 1: core ESM/CommonJS emitted Guide's default range as ^0.0.18 rather than ^0.0.17. The strict host comparison exited 1: the catalog and its derived host manifest changed. The bin comparison exited 0. This invokes the existing emitted-surface and vendored-byte bump rules; it is not a no-output development re-pin.

Root retained the generated patch and measurements, then undid only its own unaccepted catalog and Guide manifest edits by apply_patch. No discard-class Git command ran. A fresh build regenerated host.json and restored complete dist and manifest equality with the accepted Scaffold archive; comparisons exited 0. The tracked package/lock/catalog/host inventory diff is empty. No owner edit was removed. The current registry catalog evidence remains retained in d7n-post-guide-catalog and the measured follow-up packet.

The selected consumers already install registry Guide0.0.18 and Scaffold0.0.64 and passed their final gates against those releases. This ruling does not reopen them or authorize another Scaffold upload. At the final tooling alignment, adopt current Guide/Probe ranges, regenerate the catalog and lock, run gates, compare the artifact and prepare a new Scaffold version when the surface moves. Its supported propagation and target output checks remain campaign work. Do not claim fleet-wide development alignment complete.

Evidence: d7n-scaffold-generated-followup-measured and d7n-scaffold-generated-followup-restored. Root supplied the real output measurements; the operator handoff review also covers the restored state and this bounded deferral.

# Next-layer carrier report

Saved carriers: [next-layer-action.sh](../pass/next-layer-action.sh), [read-next-layer.sh](../pass/read-next-layer.sh), and [install-next-layer-tooling.sh](../pass/install-next-layer-tooling.sh).

Root commands are `bash tmp/pass/next-layer-action.sh <package> <action> <label> <cap>`, `bash tmp/pass/read-next-layer.sh <label> <package>...`, and `bash tmp/pass/install-next-layer-tooling.sh <package> <label>`.

The reader retains raw npm12 JSON responses and a sorted deduplicated query population. The installer retains `npm ls` as evidence rather than making a dependency-graph claim. None ran.

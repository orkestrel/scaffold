#!/usr/bin/env bash
# Runs every mutation in turn against the proof files, one at a time.
cd /home/user/veneer-ebcl
for name in close navbar accordion dropdown nav list-group pagination carousel-controls carousel-indicators minifier; do
	echo "== $name"
	tmp/units/ebcl-probe/mutate.sh "$name" tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts
done
echo "mutations done"

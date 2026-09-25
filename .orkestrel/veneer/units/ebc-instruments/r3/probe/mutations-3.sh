#!/usr/bin/env bash
# Runs mutate-3.sh over the named mutations in sequence, one log each, under one tag.
# Usage: bash tmp/units/ebc-probe/mutations-3.sh <tag> <name> [...]
set -u
cd /home/user/veneer-ebc
tag="$1"; shift
for name in "$@"; do
	echo "=== $name"
	bash tmp/units/ebc-probe/mutate-3.sh "$name" "$tag"
done
echo "mutations done"

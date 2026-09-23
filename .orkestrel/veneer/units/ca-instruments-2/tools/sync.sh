#!/usr/bin/env bash
# Copies the owned files from the worktree over the validation copy, byte for byte.
set -eu
W=/home/user/veneer-ca
B=$W/tmp/probe/base
for f in src/styles/components/_carousel.scss tests/src/styles/components/carousel.test.ts \
	app/browser/sections/CarouselSection.ts tests/app/browser/sections/CarouselSection.test.ts; do
	cp "$W/$f" "$B/$f"
done
echo synced

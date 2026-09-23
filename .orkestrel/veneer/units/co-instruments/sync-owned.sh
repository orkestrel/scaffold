#!/bin/bash
# Copies the unit's owned files from the worktree into the validation copy.
C=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/co-unit-check
W=/home/user/veneer-co
for f in src/styles/components/_collapse.scss tests/src/styles/components/collapse.test.ts app/browser/sections/CollapseSection.ts tests/app/browser/sections/CollapseSection.test.ts tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css; do
	mkdir -p "$(dirname "$C/$f")"; cp "$W/$f" "$C/$f"
done

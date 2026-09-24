#!/usr/bin/env bash
# lc-sync.sh: mirrors the lc worktree into tmp/probe/lc-scratch, regenerates
# tmp/units/lc-shared.patch from the edited shared copies under tmp/probe/lc-shared against
# ac74459, and applies that patch in the scratch copy. Every shared-file run happens there.
set -euo pipefail
root=/home/user/veneer-lc
scratch=$root/tmp/probe/lc-scratch
shared=$root/tmp/probe/lc-shared
base=ac74459
mkdir -p "$scratch"
if [ ! -d "$scratch/node_modules" ]; then
	cp -al "$root/node_modules" "$scratch/node_modules"
	rm -rf "$scratch/node_modules/.vite" "$scratch/node_modules/.vite-temp"
fi
cd "$root"
git ls-files -co --exclude-standard -z |
	while IFS= read -r -d '' file; do
		if [ -e "$file" ]; then printf '%s\0' "$file"; fi
	done |
	tar --null -T - -cf - | tar -C "$scratch" -xf -
patchfile=$root/tmp/units/lc-shared.patch
# The edited shared copies are the patch's source while they exist; after they are swept, the
# retained patch is applied as it stands.
if [ -d "$shared" ]; then
	: > "$patchfile"
	for file in tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md; do
		if [ -f "$shared/$file" ]; then
			diff -u --label "a/$file" --label "b/$file" <(git show "$base:$file") "$shared/$file" >> "$patchfile" || test $? -eq 1
		fi
	done
fi
# oxlint reads the enclosing repository's ignore file, which ignores this copy's own path, so the
# copy is made a repository root of its own.
if [ ! -d "$scratch/.git" ]; then git -C "$scratch" init -q; fi
if [ -s "$patchfile" ]; then
	patch -d "$scratch" -p1 --forward --no-backup-if-mismatch < "$patchfile"
fi
echo "synced; shared patch bytes: $(wc -c < "$patchfile")"

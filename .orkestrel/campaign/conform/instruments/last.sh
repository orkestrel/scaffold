#!/usr/bin/env bash
# Writes .orkestrel/campaign/last/<package>.md: the last per-package change record.
# Mechanical: commits since origin/main, diffstat, and the public-surface diff (bounded).
set -u
OUT=/home/user/scaffold/.orkestrel/campaign/last
HANDOFF=/home/user/scaffold/.orkestrel/campaign/fix/handoff.md
CAP=${CAP:-60000}
mkdir -p "$OUT"
one() {
	local name=$1 dir=$2
	local layer tip base version published
	layer=$(grep -E "^\| $name \|" "$HANDOFF" | awk -F'|' '{gsub(/ /,"",$3); print $3}')
	tip=$(git -C "$dir" rev-parse --short HEAD)
	base=$(git -C "$dir" merge-base HEAD origin/main | cut -c1-7)
	version=$(node -p "require('$dir/package.json').version")
	published=$(npm view "@orkestrel/$name" version 2>/dev/null || echo unknown)
	{
		echo "# Last changes: $name"
		echo
		echo "Taken $(date -u +%Y-%m-%d). Branch \`claude/orkestrel-npm-audit-deps-14ibta\` at \`$tip\`, merge base with \`origin/main\` \`$base\`, layer ${layer:-tooling}, declared version $version, registry version $published."
		echo
		echo "## Commits since origin/main"
		echo
		echo '```text'
		git -C "$dir" log --reverse --format='%h %ad %s' --date=short origin/main..HEAD
		echo '```'
		echo
		echo "## Diffstat since origin/main"
		echo
		echo '```text'
		git -C "$dir" diff --stat=120 origin/main..HEAD -- . ':!package-lock.json' ':!guides/*.md' | tail -n 60
		echo '```'
		echo
		local surface size
		surface=$(git -C "$dir" diff origin/main..HEAD -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts' 'app/**/types.ts' 'app/**/index.ts')
		size=${#surface}
		echo "## Public-surface diff (types, index, constants, errors)"
		echo
		if [ "$size" -gt "$CAP" ]; then
			echo "The surface diff is $size bytes, past the $CAP-byte cap; read it with \`git -C $dir diff $base..$tip -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'\`. Per-file stat:"
			echo
			echo '```text'
			git -C "$dir" diff --stat=120 origin/main..HEAD -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts' 'app/**/types.ts' 'app/**/index.ts'
			echo '```'
		else
			echo '```diff'
			printf '%s\n' "$surface"
			echo '```'
		fi
	} > "$OUT/$name.md"
	printf '%-11s layer=%-8s tip=%s surface=%s bytes\n' "$name" "${layer:-tooling}" "$tip" "$size"
}
for d in /home/user/fleet/*/; do
	one "$(basename "$d")" "${d%/}"
done
# Scaffold: commit list and top-level diffstat only (270 commits).
{
	echo "# Last changes: scaffold"
	echo
	echo "Taken $(date -u +%Y-%m-%d). Branch \`claude/orkestrel-npm-audit-deps-14ibta\` at \`$(git -C /home/user/scaffold rev-parse --short HEAD)\`, merge base with \`origin/main\` \`$(git -C /home/user/scaffold merge-base HEAD origin/main | cut -c1-7)\`, publishes on its own account, declared version $(node -p "require('/home/user/scaffold/package.json').version"), registry version $(npm view @orkestrel/scaffold version 2>/dev/null || echo unknown)."
	echo
	echo "## Commits since origin/main (campaign records excluded from the stat)"
	echo
	echo '```text'
	git -C /home/user/scaffold log --reverse --format='%h %ad %s' --date=short origin/main..HEAD
	echo '```'
	echo
	echo "## Diffstat since origin/main, by top-level path"
	echo
	echo '```text'
	git -C /home/user/scaffold diff --dirstat=files,0 origin/main..HEAD -- . ':!.orkestrel' ':!package-lock.json'
	echo '```'
	echo
	echo "## Public-surface diff (types, index, constants, errors) — per-file stat"
	echo
	echo '```text'
	git -C /home/user/scaffold diff --stat=120 origin/main..HEAD -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'
	echo '```'
} > "$OUT/scaffold.md"
echo LAST-DONE

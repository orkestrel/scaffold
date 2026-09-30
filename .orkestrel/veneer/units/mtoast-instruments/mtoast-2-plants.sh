#!/usr/bin/env bash
# Successor of tmp/units/mtoast-plants.sh for round 2: plants each mutation in its file, rebuilds the
# styles, runs the named proof, and restores the file byte for byte, logging each to
# tmp/units/mtoast-2-plant-<name>.log.txt. Adds the fade-transitions plant on tests/setupStyles.ts.
cd /home/user/veneer-mtoast || exit 1
. tmp/units/mtoast-env.sh
plant() {
	local name=$1 file=$2 expression=$3 proof=$4 log=tmp/units/mtoast-2-plant-$1.log.txt
	local backup=tmp/units/backup/$(basename "$file").plant2
	cp "$file" "$backup"
	local before
	before=$(sha256sum "$file" | cut -d' ' -f1)
	{
		echo "# plant: $name"
		echo "\$ sed -i -e '$expression' $file"
		sed -i -e "$expression" "$file"
		echo "--- planted diff"
		diff "$backup" "$file"
		echo "\$ npm run build:src:styles"
		npm run build:src:styles > /dev/null 2>&1
		echo "build exit=$?"
		echo "\$ npx vitest run --config configs/src/vite.styles.config.ts $proof"
		npx vitest run --config configs/src/vite.styles.config.ts "$proof"
		echo "exit=$?"
		cp "$backup" "$file"
		local after
		after=$(sha256sum "$file" | cut -d' ' -f1)
		echo "restored sha256 before=$before after=$after"
		[ "$before" = "$after" ] && echo "restore identical" || echo "restore DIFFERS"
		cat /proc/loadavg
	} > "$log" 2>&1
}
toast=src/styles/components/_toast.scss
proof=tests/src/styles/components/toast.test.ts
plant drop-scale "$toast" '/transform: scale(0.98);/d' "$proof"
plant move-transition "$toast" 's/^\t\.toast\.fade {$/\t.toast {/' "$proof"
plant ease-out "$toast" 's/transform var(--vn-motion-feedback) var(--vn-ease-standard)/transform var(--vn-motion-feedback) var(--vn-ease-out)/' "$proof"
plant fade-transitions tests/setupStyles.ts "s/transitions: Object.freeze(\['opacity', 'transform'\]),/transitions: Object.freeze(['opacity']),/" tests/src/styles/components/fade.test.ts
npm run build:src:styles > /dev/null 2>&1
echo "final build exit=$?"

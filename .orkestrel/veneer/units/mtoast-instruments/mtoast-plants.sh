#!/usr/bin/env bash
# Plants each mtoast mutation in src/styles/components/_toast.scss, rebuilds the styles, runs the
# toast style proofs, and restores the partial byte for byte, logging each to
# tmp/units/mtoast-plant-<name>.log.txt.
cd /home/user/veneer-mtoast || exit 1
. tmp/units/mtoast-env.sh
partial=src/styles/components/_toast.scss
backup=tmp/units/backup/_toast.scss.final
cp "$partial" "$backup"
before=$(sha256sum "$partial" | cut -d' ' -f1)
plant() {
	local name=$1 expression=$2 log=tmp/units/mtoast-plant-$1.log.txt
	{
		echo "# plant: $name"
		echo "\$ sed -i -e '$expression' $partial"
		sed -i -e "$expression" "$partial"
		echo "--- planted diff"
		diff "$backup" "$partial"
		echo "\$ npm run build:src:styles"
		npm run build:src:styles > /dev/null 2>&1
		echo "build exit=$?"
		echo "\$ npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/toast.test.ts"
		npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/toast.test.ts
		echo "exit=$?"
		cp "$backup" "$partial"
		after=$(sha256sum "$partial" | cut -d' ' -f1)
		echo "restored sha256 before=$before after=$after"
		[ "$before" = "$after" ] && echo "restore identical" || echo "restore DIFFERS"
		cat /proc/loadavg
	} > "$log" 2>&1
}
plant drop-scale '/transform: scale(0.98);/d'
plant move-transition 's/^\t\.toast\.fade {$/\t.toast {/'
plant ease-out 's/transform var(--vn-motion-feedback) var(--vn-ease-standard)/transform var(--vn-motion-feedback) var(--vn-ease-out)/'
npm run build:src:styles > /dev/null 2>&1
echo "final build exit=$?"

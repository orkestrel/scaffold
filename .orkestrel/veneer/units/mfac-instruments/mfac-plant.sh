#!/usr/bin/env bash
# Plants one reversal, runs the proof that must fail, and restores the file byte-identically.
# Usage: mfac-plant.sh <name> <file> <python-replacement-script> <command...>
cd /home/user/veneer-mfac || exit 1
. tmp/units/mfac-env.sh
name="$1"; file="$2"; script="$3"; shift 3
log="tmp/units/mfac-plant-$name.log.txt"
backup="tmp/units/mfac-plant-$name.backup"
cp "$file" "$backup"
before=$(sha256sum "$file" | cut -d' ' -f1)
{
	echo "loadavg=$(cat /proc/loadavg)"
	echo "file=$file sha256-before=$before"
	python3 "$script" "$file"
	echo "planted-diff:"
	diff "$backup" "$file"
	"$@"
	echo "exit=$?"
	cp "$backup" "$file"
	after=$(sha256sum "$file" | cut -d' ' -f1)
	echo "sha256-after=$after"
	if [ "$before" = "$after" ]; then echo "restored=identical"; else echo "restored=DIFFERENT"; fi
} > "$log" 2>&1
rm -f "$backup"

# Lists every line in the named roots that reads transform, scale, opacity, readDuration, or
# getAnimations within 8 lines of a line naming a toast (case-insensitive), per file.
for file in $(grep -rli "toast" tests/app app tests/src/browser); do
	awk -v f="$file" '
		{ line[NR] = $0 }
		tolower($0) ~ /toast/ { toast[NR] = 1 }
		END {
			for (n = 1; n <= NR; n++) if (line[n] ~ /transform|scale|opacity|readDuration|getAnimations/) {
				near = 0
				for (k = n - 8; k <= n + 8; k++) if (k in toast) near = 1
				if (near) print f ":" n ": " line[n]
			}
		}' "$file"
done

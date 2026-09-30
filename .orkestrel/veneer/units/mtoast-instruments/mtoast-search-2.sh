# Lists every line under tests/ that reads transition-property, transitionProperty, or a transition
# list within 8 lines of a line spelling `toast fade`, `toast show`, `.toast`, or `toastCascade`.
for file in $(grep -rlE "toast fade|toast show|\.toast|toastCascade" tests/); do
	awk -v f="$file" '
		{ line[NR] = $0 }
		/toast fade|toast show|\.toast|toastCascade/ { toast[NR] = 1 }
		END {
			for (n = 1; n <= NR; n++) if (line[n] ~ /transition-property|transitionProperty|transitionDuration|transition-duration|readDuration|FADE_COMPONENT_CASES|getPropertyValue\(.transition|\x27transition\x27/) {
				near = 0
				for (k = n - 8; k <= n + 8; k++) if (k in toast) near = 1
				if (near) print f ":" n ": " line[n]
			}
		}' "$file"
done
grep -rn "FADE_COMPONENT_CASES" tests/

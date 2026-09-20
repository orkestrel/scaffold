#!/usr/bin/env bash
# Retention rewrite, 2026-09-20 (the Orchestrator's own unit, run once, retained here).
# The self-audit's retention lens found retained reports, briefs, claims files, and scripts citing
# their evidence by the executor-side launch path (tmp/codex, tmp/units, tmp/audit) rather than
# the retained path, so the citations would resolve to nothing after the sweep. This script
# (1) retains the diffs and logs that were never copied, and (2) rewrites every launch path inside
# the retained records to the path it now names. Run from the scaffold checkout root.
set -u
REC=".orkestrel/veneer"
U="$REC/units"
TESTREPO="C:/Users/mikes/WebstormProjects/test"
VENEER="C:/Users/mikes/WebstormProjects/veneer"

retain_text() { # src dst — copy a text file, folding CRLF, converting UTF-16LE when a BOM is present
	local src="$1" dst="$2"
	[ -f "$src" ] || { echo "missing $src"; return; }
	if head -c 2 "$src" | od -An -tx1 | grep -q "ff fe"; then iconv -f UTF-16LE -t UTF-8 "$src" | tr -d '\r' > "$dst"; else tr -d '\r' < "$src" > "$dst"; fi
}

# 1. Diffs and status readings the rounds were judged on.
retain_text "$VENEER/units/u3-diff.patch.txt" "$U/u3-diff.patch.txt"
retain_text "$TESTREPO/units/u6-diff.patch.txt" "$U/u6-diff.patch.txt"
retain_text "$TESTREPO/units/u6-round4-final.diff" "$U/u6-round4-final.diff.txt"
retain_text "$TESTREPO/units/u6-round4-final-status.txt" "$U/u6-round4-final-status.txt"
retain_text "$TESTREPO/units/u6-5-diff.patch" "$U/u6-5-diff.patch.txt"
retain_text "$TESTREPO/units/u6-5-status.txt" "$U/u6-5-status.txt"
retain_text "$TESTREPO/units/u6-final.diff" "$U/u6-final.diff.txt"
retain_text "$TESTREPO/units/u6-final-status.txt" "$U/u6-final-status.txt"
retain_text "$TESTREPO/units/u6-2-final.diff" "$U/u6-2-final.diff.txt"
retain_text "$TESTREPO/units/u6-2-final-status.txt" "$U/u6-2-final-status.txt"
retain_text "$TESTREPO/units/u6-3-final-diff.txt" "$U/u6-3-final-diff.txt"
retain_text "$TESTREPO/units/u6-3-final-status.txt" "$U/u6-3-final-status.txt"
# Gate logs the reports name and no copy retained.
for f in u6-2-test-src u6-3-test-src u6-3-test-guides u6-round4-format-check u6-round4-lint-check-final u6-round4-check u6-round4-build u6-round4-test-src u6-round4-test-policy u6-round4-test-config u6-round4-test-setup u6-round4-test-guides u6-round4-lint-check u6-3-axes-readings u6-5-gate-1 u6-5-gate-2 u6-5-gate-3 u6-5-gate-4 u6-5-gate-5 u6-5-gate-6 u6-5-gate-7 u6-5-gate-8 u6-5-gate-9; do
	[ -f "$TESTREPO/units/$f.log" ] && retain_text "$TESTREPO/units/$f.log" "$U/$f.log.txt"
done
retain_text "$TESTREPO/units/u6-5-gates.json" "$U/u6-5-gates.json.txt"

# 2. Rewrite launch paths inside the retained records. A log cited as <x>.log is
# retained as <x>.log.txt; a brief, report, or script cited under tmp/codex or tmp/units is
# retained under ; a claims file or patch cited under tmp/audit is retained at the record
# root (claims) or under  (patches). Files under  reach the root with ../.
for f in "$REC"/*.md "$U"/*.md "$U"/*.sh; do
	case "$f" in "$U"/*) root="../";; *) root="";; esac
	sed -i \
		-e 's#\([A-Za-z0-9._-]*\)\.log\b#\1.log.txt#g' \
		-e 's#tmp/audit/\([a-z0-9-]*-audit-claims[-0-9]*\.md\)#'"$root"'\1#g' \
		-e 's#tmp/audit/\([a-z0-9-]*\)-diff\.patch#\1-diff.patch.txt#g' \
		-e 's#tmp/audit/\([a-z0-9-]*-diff-[0-9]*\)\.patch#\1.patch.txt#g' \
		-e 's###g' \
		-e 's###g' \
		"$f"
done
# Files under  that now say ... for a sibling should say the sibling directly.
for f in "$U"/*.md "$U"/*.sh; do
	sed -i -e 's#\([^/A-Za-z0-9_.-]\)\([A-Za-z0-9._-]*\)#\1\2#g' -e 's#^\([A-Za-z0-9._-]*\)#\1#' "$f"
done
echo "retention rewrite done"
grep -rl "tmp/codex\|tmp/units\|tmp/audit" "$REC" | wc -l

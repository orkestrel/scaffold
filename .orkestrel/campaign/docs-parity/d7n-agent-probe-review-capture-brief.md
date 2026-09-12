# Capture review inputs

Act as builder directly; spawn nothing. Read root AGENTS.md, orchestration,
portability and writing rules. You are not alone. Own only
tmp/pass/capture-agent-probe-review.sh and
tmp/units/d7n-agent-probe-review-capture-report.md under scaffold.

Write a Bash script using the existing pass-env.sh source. Accept a safe label
as its only argument, refuse an existing SCR/label directory, create it, and
capture Agent and Probe HEAD, branch, porcelain status, binary HEAD diff and
index into package-prefixed .txt files. Capture scaffold porcelain status too.
Capture diff -u for these exact predecessor/successor pairs under SCR:
install-dependent-tooling.sh / install-agent-probe-tooling.sh;
prepare-dependent-registry-supported.sh / prepare-agent-probe-registry-supported.sh;
pack-dependent-final-verified.sh / pack-agent-probe-final-verified.sh;
commit-dependent-native-entry.sh / commit-agent-probe-native-entry.sh;
close-dependent-registry-supported-release.sh / close-agent-probe-registry-supported-release.sh.
Accept diff exit 0 or 1, refuse any other status. Save each delta in a
successor-named .patch file and the exit code in a .txt file. Capture SHA256 of
every successor script. Use git -C for every git command. Never modify target
files, fetch, install, build, gate, commit or push. Use forward slash paths.

Run only Bash syntax validation on the script; root executes it. Return paths.

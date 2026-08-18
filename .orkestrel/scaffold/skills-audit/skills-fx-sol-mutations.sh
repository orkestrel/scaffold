#!/usr/bin/env bash

set -euo pipefail

target='tests/setupPolicy.ts'
backup="$(mktemp /tmp/skills-fx-sol-setupPolicy.XXXXXX)"
cp "$target" "$backup"

restore() {
	cp "$backup" "$target"
	rm -f "$backup"
}

trap restore EXIT

run_mutation() {
	local assertion="$1"
	local branch="$2"
	local control="$3"
	local from="$4"
	local to="$5"
	local output
	local status
	local failures
	local count

	MUTATION_FROM="$from" MUTATION_TO="$to" perl -0pi -e \
		'$count += s/\Q$ENV{"MUTATION_FROM"}\E/$ENV{"MUTATION_TO"}/g; END { die "mutation source count: $count\n" unless $count == 1 }' \
		"$target"

	set +e
	output="$(NO_COLOR=1 npm run test:policy 2>&1)"
	status=$?
	set -e
	cp "$backup" "$target"

	failures="$(printf '%s\n' "$output" | sed $'s/\033\\[[0-9;]*m//g' | grep '^ FAIL ' || true)"
	count="$(printf '%s\n' "$failures" | grep -c '^ FAIL ' || true)"
	if [[ "$status" -eq 0 || "$count" -ne 1 || "$failures" != *"$control"* ]]; then
		printf 'Unexpected mutation result for %s: exit %s, failures %s\n%s\n' \
			"$assertion" "$status" "$count" "$output" >&2
		exit 1
	fi

	printf '| %s | %s | %s |\n' "$assertion" "$branch" "$control"
}

printf '| Assertion class | Disabled branch | Control that reddened |\n'
printf '| --- | --- | --- |\n'

run_mutation \
	'skill exact keys' \
	'frontmatter exact-key condition' \
	'rejects extra frontmatter keys' \
	$'if (\n\t\t\t\tfrontmatter.keys.length !== 2 ||\n\t\t\t\tkeys.size !== 2 ||\n\t\t\t\t!keys.has(\'name\') ||\n\t\t\t\t!keys.has(\'description\')\n\t\t\t)' \
	'if (false)'

run_mutation \
	'skill name equals directory' \
	'frontmatter name comparison' \
	'rejects a frontmatter name that differs from its directory' \
	'if (frontmatter.name !== name)' \
	'if (false)'

run_mutation \
	'skill description non-empty' \
	'empty-description condition' \
	'rejects an empty skill description' \
	"if (frontmatter.description === undefined || frontmatter.description.trim() === '')" \
	'if (false)'

run_mutation \
	'skill trigger sentence' \
	'trigger matcher condition' \
	'rejects a description without a Use sentence' \
	'} else if (!matchesSkillTrigger(frontmatter.description)) {' \
	'} else if (false) {'

run_mutation \
	'reverse reference' \
	'orphan-reference loop' \
	'rejects an unnamed Markdown reference file' \
	'for (const reference of readSkillReferences(root, name)) {' \
	'for (const reference of []) {'

run_mutation \
	'references one level' \
	'references-subdirectory condition' \
	'rejects a nested references directory' \
	'if (entry.isDirectory()) {' \
	'if (false) {'

run_mutation \
	'no auxiliary README or CHANGELOG' \
	'auxiliary-file condition' \
	'rejects an auxiliary changelog in a skill directory' \
	"if ((file === 'readme.md' || file === 'changelog.md') && isPolicyFile(directory, path)) {" \
	'if (false) {'

run_mutation \
	'canonical has bridge' \
	'canonical-to-bridge set condition' \
	'rejects a canonical skill without a provider bridge' \
	'if (!bridgeSet.has(name)) {' \
	'if (false) {'

run_mutation \
	'bridge has canonical' \
	'bridge-to-canonical set condition' \
	'rejects a provider bridge without a canonical skill' \
	'if (!canonicalSet.has(name)) {' \
	'if (false) {'

run_mutation \
	'bridge exact-case file' \
	'bridge SKILL.md file guard' \
	'rejects a bridge without an exact-case SKILL.md' \
	$'if (!isPolicyFile(root, bridgePath)) {\n\t\treturn [\n\t\t\tcreatePolicyViolation(\'bridge\', bridgePath, \'bridge requires an exact-case regular SKILL.md\'),\n\t\t]\n\t}' \
	'if (!isPolicyFile(root, bridgePath)) return []'

run_mutation \
	'bridge frontmatter parses' \
	'bridge parse-failure report' \
	'rejects malformed bridge frontmatter' \
	$'if (bridge === undefined) {\n\t\tviolations.push(\n\t\t\tcreatePolicyViolation(\'bridge\', bridgePath, \'bridge SKILL.md frontmatter parses\'),\n\t\t)\n\t} else {' \
	$'if (bridge === undefined) {\n\t} else {'

run_mutation \
	'bridge exact keys' \
	'bridge frontmatter exact-key condition' \
	'rejects extra bridge frontmatter keys' \
	$'if (\n\t\t\tbridge.keys.length !== 2 ||\n\t\t\tkeys.size !== 2 ||\n\t\t\t!keys.has(\'name\') ||\n\t\t\t!keys.has(\'description\')\n\t\t)' \
	'if (false)'

run_mutation \
	'bridge name parity' \
	'bridge name-source comparison' \
	'rejects a bridge name that drifts from its canonical twin' \
	'if (bridge.source.name !== canonical.source.name) {' \
	'if (false) {'

run_mutation \
	'bridge description parity' \
	'bridge description-source comparison' \
	'rejects a bridge description that drifts from its canonical twin' \
	'if (bridge.source.description !== canonical.source.description) {' \
	'if (false) {'

run_mutation \
	'bridge canonical path' \
	'bridge body path condition' \
	'rejects a bridge body without its canonical workflow path' \
	'if (!body.includes(canonicalPath)) {' \
	'if (false) {'

run_mutation \
	'bridge owns no references' \
	'bridge references-directory condition' \
	'rejects a references directory owned by a provider bridge' \
	'if (resolvePolicyDirectory(root, `${bridgeBase}/references`) !== undefined) {' \
	'if (false) {'

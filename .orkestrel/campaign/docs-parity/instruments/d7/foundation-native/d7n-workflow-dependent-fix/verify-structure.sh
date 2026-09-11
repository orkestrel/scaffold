#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/workflow"
{
	printf '%s\n' 'shape-sentence'
	grep -nF "A \`Shape\` cell holds the constant's declared type." guides/workflow.md
	printf '%s\n' 'obsolete-phrase'
	grep -nF 'compiles into' guides/workflow.md || true
	printf '%s\n' 'literal-constant-shapes'
	grep -nE '^\| \`[A-Z_]+\` +\| const +\| \`(false|true|[0-9_]+|[^\`]+)\` ' guides/workflow.md | grep -E '\| \`(false|true|[0-9_]+|\x27[^\x27]*\x27)\` ' || true
	printf '%s\n' 'caps-targets'
	grep -nE 'DUAL-store|\bFIRST\b' guides/workflow.md || true
	printf '%s\n' 'store-count'
	grep -nF 'three async primitives' src/core/types.ts guides/workflow.md || true
	printf '%s\n' 'empty-shapes'
	grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/workflow.md || true
	printf '%s\n' 'bare-heading-fences'
	awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{if(h && blank) print h " -> " NR; h=0; next} {h=0}' guides/workflow.md
	printf '%s\n' 'source-runtime-lines'
	git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)' || true
	printf '%s\n' 'text-integrity'
	grep -rnE '�|â|Â' README.md guides/workflow.md tests/guides.test.ts src || true
} > tmp/d7n-workflow-dependent-fix/structure.stdout.txt 2> tmp/d7n-workflow-dependent-fix/structure.stderr.txt

#!/bin/bash
# Probe: consumer-fixture type cost - Infer instantiations and check time per tier.
# Tiers: t0 no-library control; t1 shapes without Infer; t2 medium+deep Infer;
# t3 wide (30 keys); t4 deep (depth 8); t5 union (8 variants).
# tsc 6.0.2 from the contract install; incremental off; 3 runs per tier.
cd "$(dirname "$0")" || exit 1
TSC=/home/user/contract/node_modules/.bin/tsc
for tier in t0-control t1-shapes t2-infer t3-wide t4-deep t5-union; do
	cat > tsconfig.run.json <<CONFIG
{
	"compilerOptions": {
		"target": "ESNext",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"strict": true,
		"skipLibCheck": true,
		"incremental": false,
		"noEmit": true,
		"paths": { "@orkestrel/contract": ["/home/user/contract/dist/src/core/index.d.ts"] }
	},
	"files": ["${tier}.ts"]
}
CONFIG
	echo "=== tier: $tier"
	for run in 1 2 3; do
		echo "--- run $run"
		"$TSC" -p tsconfig.run.json --extendedDiagnostics 2>&1 \
			| grep -E "^(Files|Types|Instantiations|Symbols|Memory used|Parse time|Bind time|Check time|Total time):"
	done
done

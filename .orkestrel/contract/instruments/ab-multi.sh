#!/bin/bash
# Multi-process, role-swapped replication of the paired harness.
# Usage: ab-multi.sh <label> <A/index.js> <B/index.js> <families> [replicates-per-order]
# Runs ab-inproc3 in fresh processes, alternating (A,B) and (B,A) load order,
# and aggregates per family: the per-process median ratios (swapped ones
# inverted), their median, min, and max. Identity must keep every replicate
# inside the declared band; a candidate is admitted only when EVERY replicate
# sits below the family's bar.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
label=$1; A=$2; B=$3; FAM=$4; N=${5:-3}
out=$S/results/multi-$label
rm -rf $out && mkdir -p $out
for i in $(seq 1 $N); do
  ${PIN:+taskset -c 3} node $S/instruments/ab-inproc3.mjs $A $B $FAM > $out/ab-$i.out 2>/dev/null
  ${PIN:+taskset -c 3} node $S/instruments/ab-inproc3.mjs $B $A $FAM > $out/ba-$i.out 2>/dev/null
done
node $S/instruments/ab-multi-aggregate.mjs $out | tee $S/results/multi-$label.out

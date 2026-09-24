#!/usr/bin/env bash
# FRAME-HELPERS capture round: each variant in turn, keeping each variant's frames and manifest.
cd /home/user/veneer-fh
for pair in "$@"; do
  variant=${pair%%:*}; label=${pair#*:}
  tmp/units/fh-journey.sh "$variant" "$label"
  mkdir -p tmp/units/fh-final/$variant
  rm -f tmp/units/fh-final/$variant/*
  cp tmp/capture/states/*--$variant.png tmp/capture/$variant.txt tmp/units/fh-final/$variant/
done

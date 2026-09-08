#!/usr/bin/env bash
set -eu

if { false; printf 'original guard continued\n'; }; then
  printf 'original if-list ignored the failed guard\n'
else
  printf 'original if-list stopped unexpectedly\n' >&2
  exit 1
fi

if bash -eu -c 'false; printf "corrected guard continued\\n"'; then
  printf 'corrected pattern continued unexpectedly\n' >&2
  exit 1
fi

printf 'corrected pattern stopped\n'

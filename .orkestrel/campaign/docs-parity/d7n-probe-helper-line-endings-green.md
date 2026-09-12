# Probe helper line-ending correction

Root reran the unchanged command
`node --experimental-strip-types tmp/pass/probe-helper-line-endings.mjs` after
the bounded CRLF correction. It exited 0 on Node24.20.0. LF and CRLF yielded the
same extracted claim and section. The instrument's deep equality passed.
The permanent setup tests now include the exact equivalent input assertion.
The retained red report remains unchanged. This result proves only the named
helper inputs, not final package readiness or a registered compiler receipt.

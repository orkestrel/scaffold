# Reproduce helper line endings

Root owns tmp/pass/probe-helper-line-endings.mjs and runs it on the host.
Read the current native helper signatures and the review's exact LF/CRLF inputs.
Load the real Probe setup helpers through a URL derived from this instrument's
location. Run equivalent LF and CRLF claim and section strings. Print their
results, using JSON null solely to make an undefined result visible in JSON,
then assert equivalent extracted text. No target edit or suite run. Retain the
actual result for the independent review; the assertion must fail on differing
line-ending behavior. This instrument measures only these helper inputs.

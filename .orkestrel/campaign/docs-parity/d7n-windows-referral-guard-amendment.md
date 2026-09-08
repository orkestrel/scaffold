# Guard retained journals

Own `tmp/pass/assert-journal.mjs` for the referral retention instrument.

Read the journal with `readFileSync`. Parse its last nonblank line with `JSON.parse`. Require an object whose `type` is exactly `result`. Refuse an empty journal, malformed JSON, or another event type.

`tmp/pass/retain-referral.sh` runs this helper before projecting a journal or reading the probe checkout. Retain the helper under `instruments/d7/windows/`.

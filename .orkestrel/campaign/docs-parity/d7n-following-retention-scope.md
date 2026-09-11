# Bounded retention subject

Review the retention carrier's actual use on named campaign receipts, not a
promise that arbitrary future directory input can never contain a secret.
The operator must choose inspected receipt roots; the script is not a secret
classifier. No credential directories are inputs to this pass.

For the current prepared review, Evidence inputs are the Console and Pool
d7n-<package>-following-final directories and their overwrite, audit, lock, ci,
tooling-installed, format and prepublish siblings. They hold root-generated
command output, diff/status/index/manifest snapshots and public registry/npm
install readings. Pack inputs are d7n-console-following-final-pack and
d7n-pool-following-final-pack; that branch copies direct txt/sha256 receipts
only, not archives or extracted package trees. Units and Instruments take
explicit filenames; differing retained bytes are refused.

The recursive Evidence extension admits nested receipt layouts used by registry
confirmation. Its suffix filter excludes tgz and jsonl, but does not assert that
an arbitrary json/txt document cannot contain sensitive data. Root's selected
inputs and inspection establish the bounded no-secret-copy claim. Refuse a
selection that includes credentials or journal streams rather than interpreting
this carrier as a scanner for them. Do not expand this release into a generic
file-classification feature.

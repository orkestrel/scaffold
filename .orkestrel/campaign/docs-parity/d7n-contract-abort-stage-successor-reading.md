# Abort staging runner successor

The author added the missing branch guard, native path identity comparison and
centralized digest helper before root execution. Root retained the resulting source
under instruments/d7/windows/contract-abort-stage/. Syntax checks passed; no role
ran package commands.

Root's predecessor run exited 1 at the expected Abort filename guard. Copy install,
source typechecking, build and source tests exited 0 with Contract 0.0.17 and Guide
0.0.18 installed. npm pack ignored the --prefix argument for package selection and
packed the caller's scaffold directory. That disposable scaffold archive is not an
accepted artifact. It stays in the predecessor's tmp/probe directory and was never
published or used downstream. Canonical Abort and primary owner edits stayed intact.

The author corrected the runner to change its working directory to the disposable
Abort copy before invoking npm pack without --prefix. Root read the delta and retained
it as run-2.sh without replacing the predecessor. The rerun uses fresh disposable
state. Read evidence/d7n-contract-abort-stage-predecessor/ for the original exits.

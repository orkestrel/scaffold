# Aggregate final cell driver check addendum

The q9 refusal capture used an inline PowerShell program to time the process and redirect its streams. This conflicts with scaffold's script rule, which requires scripted captures to be TypeScript run by Node. The original invocation, stderr capture, and successor report are preserved unchanged. This is a capture-method deviation only; it does not alter the recorded q9 exit, zero-byte stdout, usage refusal, or any driver/source result. No rerun is needed, and no source/build or measured artifacts were changed.

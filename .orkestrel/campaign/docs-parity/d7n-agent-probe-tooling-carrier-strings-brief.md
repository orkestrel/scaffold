# Apply the exact tooling carrier substitutions

Read d7n-agent-probe-tooling-carrier-brief.md as the governing unit. This
successor resolves its wording ambiguity. Keep the original stop report.

Replace the comment exactly with:

    # Successor: stage published tooling for Agent and Probe native parity adoption.

Replace the case line exactly with:

    case "$package" in agent|probe) ;; *) fail 'package is outside the Agent and Probe tooling layer' ;; esac

Preserve every other source line. Keep the original ownership and permission
floor. Implement directly with apply_patch and return the named report.

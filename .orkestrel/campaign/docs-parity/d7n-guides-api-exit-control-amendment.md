# Bind higher exit precedence to a failing native command

Apply this amendment to HOST in d7n-guides-api-close-fix-brief.md. Root ran the
focused command at 3c7f7f with exit 0 and read the actual tests. The higher-exit
carrier uses a successful runner, so it never exercises GuideCommand's raise
path. It cannot detect a change that overwrites the higher code only on failure.

Change that existing carrier to provoke an actual supported real-runner failure
while process.exitCode is already 5. Use the measured reporter or onClose port,
not a replacement runner object. Assert the observed failure message and
preserved child exit/status 5. Keep the separate lifecycle-completion controls.
Run the focused server command again and report the actual reading. Change no
runtime body, public signature, metadata or unrelated test.

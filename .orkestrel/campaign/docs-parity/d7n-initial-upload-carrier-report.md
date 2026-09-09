# Initial layer upload carrier report

The operator-only script is [upload-initial-layer.sh](../pass/upload-initial-layer.sh).

It requires explicit publish intent and terminal I/O. It validates every prepared artifact and canonical main checkout before login, then leaves interactive npm I/O untouched. It does not prompt for tokens or read auth files. Command completion remains subject to root registry confirmation.

The script has not run.

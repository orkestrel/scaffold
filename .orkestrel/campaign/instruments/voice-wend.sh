#!/bin/bash
# Voice wave W-END: final fleet scan, authoritative serial gate sweep, third distributable inventory.
# Run only when every voice unit has landed and no writer is live.
set -u
node /home/user/work/voice-scan.mjs 2>/dev/null > /home/user/scaffold/.orkestrel/campaign/voice/scan-final.txt
: > /home/user/work/fleet-gates.log
bash /home/user/work/fleet-gates.sh
cp /home/user/work/fleet-gates.log /home/user/scaffold/.orkestrel/campaign/voice/fleet-gates-final.log
INVENTORY_OUT=/home/user/scaffold/.orkestrel/campaign/inventory-3.md INVENTORY_TITLE=Third node /home/user/work/inventory2.mjs > /home/user/work/logs/inventory3.log 2>&1
cp /home/user/work/logs/inventory3.log /home/user/scaffold/.orkestrel/campaign/voice/inventory3.log
echo VOICE-WEND-DONE

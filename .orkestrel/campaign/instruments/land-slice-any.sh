#!/bin/bash
# Land slice 6 fix-ups as they report, in any order; scaffold only after the other seven have landed.
ALL="table agent reason browser workflow mcp contract"
while :; do
	remaining=""
	for p in $ALL; do [ -f /home/user/work/landed/$p ] || remaining="$remaining $p"; done
	if [ -z "$remaining" ]; then break; fi
	progressed=0
	for p in $remaining; do
		if [ -f /home/user/work/ready/$p ]; then /home/user/work/land-voice.sh $p; touch /home/user/work/landed/$p; progressed=1; fi
	done
	[ $progressed = 0 ] && sleep 20
done
until [ -f /home/user/work/ready/scaffold ]; do sleep 20; done
/home/user/work/land-voice.sh scaffold; touch /home/user/work/landed/scaffold
echo LAND-SLICE6-DONE

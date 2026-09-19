#!/usr/bin/env bash
# Final acceptance evidence for unit 11, taken on the tree as it stands.
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
rm -rf tmp/capture/states
VITE_CAPTURE=true npm run test:journey > tmp/units/u11-capture-final-1.log.txt 2>&1
echo "capture-1 exit=$?" >> tmp/units/u11-final.log.txt
echo "capture-1 frames=$(ls tmp/capture/states | wc -l)" >> tmp/units/u11-final.log.txt
rm -rf tmp/capture/states
VITE_CAPTURE=true npm run test:journey > tmp/units/u11-capture-final-2.log.txt 2>&1
echo "capture-2 exit=$?" >> tmp/units/u11-final.log.txt
echo "capture-2 frames=$(ls tmp/capture/states | wc -l)" >> tmp/units/u11-final.log.txt
npm test > tmp/units/u11-gates-final.log.txt 2>&1
echo "gates exit=$?" >> tmp/units/u11-final.log.txt
echo done >> tmp/units/u11-final.log.txt

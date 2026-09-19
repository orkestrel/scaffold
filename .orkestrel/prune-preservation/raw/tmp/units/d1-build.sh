#!/usr/bin/env bash
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 2
npm run build > "tmp/units/d1-build.log.txt" 2>&1
echo "exit=$?" >> "tmp/units/d1-build.log.txt"

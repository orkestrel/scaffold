#!/usr/bin/env bash
# U1 acceptance: push Veneer main (the adoption through the accepted fix rounds) to origin.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
git status --short --branch | head -2
git log --oneline origin/main..HEAD
git push origin main 2>&1 | tail -n 3
git status --short --branch | head -1
echo "u1-push-done"

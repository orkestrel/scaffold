#!/usr/bin/env bash
# Serve the built single-file page over HTTP so the render can be captured.
# `file://` is refused by the browser tool, and a rendered-surface claim needs a
# capture rather than a source reading.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
exec npx vite preview --outDir demo --port 5180 --strictPort

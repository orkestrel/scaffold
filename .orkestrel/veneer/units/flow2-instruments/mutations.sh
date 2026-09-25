#!/usr/bin/env bash
# Runs every mutation of unit E-ID-FLOW-2 in series, then rebuilds the styles from the restored source.
set -u
m=/home/user/veneer-flow2/tmp/units/flow2-instruments/mutate.sh
$m dl-literal src/styles/elements/_dl.scss 'margin-bottom: var(--vn-space-8)' 'margin-bottom: 1rem'
$m dl-zero src/styles/elements/_dl.scss 'margin-bottom: var(--vn-space-8)' 'margin-bottom: 0'
$m pre-literal src/styles/elements/_pre.scss 'margin-bottom: var(--vn-space-8)' 'margin-bottom: 1rem'
$m pre-zero src/styles/elements/_pre.scss 'margin-bottom: var(--vn-space-8)' 'margin-bottom: 0'
$m hr-literal src/styles/elements/_hr.scss 'margin: var(--vn-space-8) 0' 'margin: 1rem 0'
$m hr-zero src/styles/elements/_hr.scss 'margin: var(--vn-space-8) 0' 'margin: 0'
$m figure-literal src/styles/elements/_figure.scss 'margin: 0 0 var(--vn-space-8)' 'margin: 0 0 1rem'
$m figure-zero src/styles/elements/_figure.scss 'margin: 0 0 var(--vn-space-8)' 'margin: 0'
$m figure-double src/styles/elements/_figure.scss 'margin: 0 0 var(--vn-space-8)' 'margin: 0 0 calc(var(--vn-space-8) * 2)'
source /home/user/veneer-flow2/tmp/units/flow2-instruments/env.sh
npm run build:src:styles > tmp/units/flow2-instruments/logs/build-restored.log.txt 2>&1; echo "exit=$?" >> tmp/units/flow2-instruments/logs/build-restored.log.txt
git status --short src/styles

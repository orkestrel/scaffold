import { writeFileSync } from 'node:fs'
import { it } from 'vitest'
import {
	collectLedger,
	collectShippedComponents,
	compileExpandedCascade,
	describeAddition,
	describeDeparture,
	readAdditions,
	readCompatibility,
	readDepartures,
	readOracleInventory,
	scanLedgerDrift,
} from '../../tests/setupServer.js'

it('prints the ledger drift', () => {
	const cascade = compileExpandedCascade()
	const inventory = readOracleInventory()
	const shipped = collectShippedComponents(readCompatibility())
	const measured = collectLedger(cascade, inventory, shipped)
	const departures = scanLedgerDrift(measured.departures, readDepartures(), describeDeparture)
	const additions = scanLedgerDrift(measured.additions, readAdditions(), describeAddition)
	writeFileSync('tmp/probe/ledger.json', JSON.stringify({ departures, additions }, undefined, 1))
})

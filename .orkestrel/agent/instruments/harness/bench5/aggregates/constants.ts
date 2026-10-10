import type { NoulQuestion } from '@orkestrel/agent'

// The slots are the words TOPIC and DATE; one pass fills both, so a title that contains DATE is never filled twice.
export const SUMMARY_SYSTEM =
	"You maintain a short summary of what a support desk's messages establish about TOPIC as of DATE. A later message replaces what an earlier message said. Copy every id, amount, date, and name exactly as the messages write it. Write only the summary, in at most three sentences."
export const SUMMARY_SLOT = /TOPIC|DATE/g
export const SUMMARY_TOPIC_SLOT = 'TOPIC'
export const SUMMARY_PREFIX = SUMMARY_SYSTEM.slice(0, SUMMARY_SYSTEM.indexOf(SUMMARY_TOPIC_SLOT))

export const CHANGE_INSTRUCTIONS = 'Does the event change what the summary states about TOPIC?'
export const CHANGE_CRITERIA = Object.freeze({
	true: 'The event adds, replaces, or withdraws something the summary states or must state',
	false: 'The event repeats the summary or does not bear on it',
})
export const CHANGE_QUESTION: NoulQuestion = Object.freeze({
	form: 'noul',
	instructions: CHANGE_INSTRUCTIONS,
	criteria: CHANGE_CRITERIA,
})
export const AGREE_QUESTION: NoulQuestion = Object.freeze({
	form: 'noul',
	instructions: 'Does the summary agree with its source messages?',
	criteria: Object.freeze({
		true: 'Every statement in the summary matches the source messages, a later message replacing an earlier one',
		false: 'The summary states something the source messages contradict, replace, or do not state',
	}),
})

// The heads are the first element of the judge question keys, which the judge cache counts by.
export const CHANGE_HEAD = 'change'
export const AGREE_HEAD = 'agree'

export const CHANGE_STATE_SUMMARY = 'Summary of TOPIC as of DATE: '
export const CHANGE_STATE_EVENT = 'Event: '
export const AGREE_STATE_SOURCES = 'Source messages:'

export const SUMMARIES_HEADING = '### Topic summaries'
export const IDS_LABEL = 'Ids:'
export const IDS_SEPARATOR = ', '
export const ENTRY_SEPARATOR = '\n\n'

// A higher priority renders first, so the date line precedes the summaries.
export const INSTRUCTION_DATE = Object.freeze({ name: 'date', priority: 2 })
export const INSTRUCTION_SUMMARIES = Object.freeze({ name: 'summaries', priority: 1 })

export const RETRY_NOTE = 'Your previous summary failed these checks: KINDS. Write it again so that every id, amount, date, and name occurs in the messages above.'
export const RETRY_SLOT = 'KINDS'

// An id of the pinning rule is a hyphenated token with a digit, or a run of letters and digits that holds both.
export const ID_SHAPE = /\b[A-Za-z0-9]+(?:-[A-Za-z0-9]+)+\b/g
export const ID_MIXED = /(?<![\p{L}\p{N}])(?=[\p{L}\p{N}]*\p{N})(?=[\p{L}\p{N}]*\p{L})[\p{L}\p{N}]+(?![\p{L}\p{N}])/gu
// A name candidate is a capitalized word of two letters or more in any sentence position; an apostrophe ends it.
export const NAME_WORD = /(?<![\p{L}\p{N}])\p{Lu}\p{L}+(?:-\p{L}+)*/gu
export const ANY_WORD = /[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*/gu

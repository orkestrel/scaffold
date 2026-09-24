# Reads the carousel frames of one variant and reports how far each control's mark departs from the
# picture behind it: for each control band (the outer 15% of the frame's width at each side), the
# largest channel distance between any pixel in a window around the mark's center and the band's
# most common color. A resting frame whose previous mark reads stronger than its next mark carries
# a hover residue; a driven frame's driven mark reads stronger than the other.
# Usage: python3 fo-chevrons.py VARIANT
import struct
import sys
import zlib
from collections import Counter

STATES = '/home/user/veneer-fo/tmp/capture/states/'
SCENARIOS = [
	'captioned-carousel',
	'fading-carousel',
	'inverted-carousel',
	'captioned-carousel-hover',
	'captioned-carousel-focus',
	'fading-carousel-hover',
	'fading-carousel-focus',
]


def decode(path):
	data = open(path, 'rb').read()
	assert data[:8] == b'\x89PNG\r\n\x1a\n'
	offset = 8
	chunks = []
	width = height = depth = color = 0
	while offset < len(data):
		length, kind = struct.unpack('>I4s', data[offset : offset + 8])
		body = data[offset + 8 : offset + 8 + length]
		if kind == b'IHDR':
			width, height, depth, color = struct.unpack('>IIBB', body[:10])
		elif kind == b'IDAT':
			chunks.append(body)
		offset += 12 + length
	assert depth == 8 and color in (2, 6)
	channels = 3 if color == 2 else 4
	raw = zlib.decompress(b''.join(chunks))
	stride = width * channels
	rows = []
	previous = bytearray(stride)
	position = 0
	for _ in range(height):
		method = raw[position]
		line = bytearray(raw[position + 1 : position + 1 + stride])
		position += 1 + stride
		for index in range(stride):
			left = line[index - channels] if index >= channels else 0
			up = previous[index]
			corner = previous[index - channels] if index >= channels else 0
			if method == 1:
				line[index] = (line[index] + left) & 255
			elif method == 2:
				line[index] = (line[index] + up) & 255
			elif method == 3:
				line[index] = (line[index] + (left + up) // 2) & 255
			elif method == 4:
				estimate = left + up - corner
				pa, pb, pc = abs(estimate - left), abs(estimate - up), abs(estimate - corner)
				best = left if pa <= pb and pa <= pc else up if pb <= pc else corner
				line[index] = (line[index] + best) & 255
		rows.append(line)
		previous = line
	return width, height, channels, rows


def band(width, height, channels, rows, start, end):
	middle = height // 2
	pixels = []
	for y in range(max(0, middle - 24), min(height, middle + 24)):
		row = rows[y]
		for x in range(start, end):
			pixels.append(tuple(row[x * channels : x * channels + 3]))
	floor = Counter(pixels).most_common(1)[0][0]
	strength = max(max(abs(a - b) for a, b in zip(pixel, floor)) for pixel in pixels)
	return floor, strength


variant = sys.argv[1]
for scenario in SCENARIOS:
	path = f'{STATES}{scenario}--{variant}.png'
	width, height, channels, rows = decode(path)
	cut = int(width * 0.15)
	prev_floor, prev_strength = band(width, height, channels, rows, 0, cut)
	next_floor, next_strength = band(width, height, channels, rows, width - cut, width)
	print(
		f'{scenario}--{variant}: {width}x{height} previous mark {prev_strength} over {prev_floor}, next mark {next_strength} over {next_floor}'
	)

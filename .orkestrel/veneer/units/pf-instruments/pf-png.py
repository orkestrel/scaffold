# Decodes an 8-bit RGB or RGBA PNG and prints the rows where one column's color changes.
import struct, sys, zlib
path, column = sys.argv[1], int(sys.argv[2])
data = open(path, 'rb').read()
pos, idat = 8, b''
while pos < len(data):
	length, kind = struct.unpack('>I4s', data[pos:pos + 8])
	body = data[pos + 8:pos + 8 + length]
	if kind == b'IHDR': width, height, depth, color = struct.unpack('>IIBB', body[:10])
	if kind == b'IDAT': idat += body
	pos += 12 + length
channels = {2: 3, 6: 4}[color]
raw, stride = zlib.decompress(idat), width * channels
rows, prev, offset = [], bytearray(stride), 0
for _ in range(height):
	kind, line = raw[offset], bytearray(raw[offset + 1:offset + 1 + stride])
	offset += 1 + stride
	for i in range(stride):
		a = line[i - channels] if i >= channels else 0
		b = prev[i]
		c = prev[i - channels] if i >= channels else 0
		if kind == 1: line[i] = (line[i] + a) & 255
		elif kind == 2: line[i] = (line[i] + b) & 255
		elif kind == 3: line[i] = (line[i] + (a + b) // 2) & 255
		elif kind == 4:
			p = a + b - c
			pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
			line[i] = (line[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
	rows.append(bytes(line)); prev = line
last = None
for y, line in enumerate(rows):
	pixel = tuple(line[column * channels:column * channels + 3])
	if pixel != last: print(y, pixel); last = pixel
print('size', width, height)

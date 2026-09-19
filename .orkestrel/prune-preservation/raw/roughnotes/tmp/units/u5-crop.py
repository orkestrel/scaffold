"""Crops the top band of a capture so the shell chrome can be read without the whole page."""

import struct
import sys
import zlib


def read(path):
    data = open(path, 'rb').read()
    pos, chunks, header = 8, [], None
    while pos < len(data):
        size = struct.unpack('>I', data[pos : pos + 4])[0]
        name = data[pos + 4 : pos + 8]
        body = data[pos + 8 : pos + 8 + size]
        if name == b'IHDR':
            header = struct.unpack('>IIBBBBB', body)
        if name == b'IDAT':
            chunks.append(body)
        pos += 12 + size
    return header, zlib.decompress(b''.join(chunks))


def unfilter(raw, width, height, channels):
    stride = width * channels
    out = bytearray()
    previous = bytearray(stride)
    pos = 0
    for _ in range(height):
        kind = raw[pos]
        line = bytearray(raw[pos + 1 : pos + 1 + stride])
        pos += 1 + stride
        for index in range(stride):
            left = line[index - channels] if index >= channels else 0
            up = previous[index]
            corner = previous[index - channels] if index >= channels else 0
            if kind == 1:
                line[index] = (line[index] + left) & 0xFF
            elif kind == 2:
                line[index] = (line[index] + up) & 0xFF
            elif kind == 3:
                line[index] = (line[index] + (left + up) // 2) & 0xFF
            elif kind == 4:
                estimate = left + up - corner
                da, db, dc = (
                    abs(estimate - left),
                    abs(estimate - up),
                    abs(estimate - corner),
                )
                nearest = left if (da <= db and da <= dc) else (up if db <= dc else corner)
                line[index] = (line[index] + nearest) & 0xFF
        out += line
        previous = line
    return bytes(out)


def write(path, pixels, width, height, channels):
    stride = width * channels
    raw = b''.join(b'\x00' + pixels[row * stride : (row + 1) * stride] for row in range(height))
    colour = 6 if channels == 4 else 2
    ihdr = struct.pack('>IIBBBBB', width, height, 8, colour, 0, 0, 0)
    out = [b'\x89PNG\r\n\x1a\n']
    for name, body in ((b'IHDR', ihdr), (b'IDAT', zlib.compress(raw, 9)), (b'IEND', b'')):
        out.append(
            struct.pack('>I', len(body)) + name + body + struct.pack('>I', zlib.crc32(name + body))
        )
    open(path, 'wb').write(b''.join(out))


def main():
    source, target, band = sys.argv[1], sys.argv[2], int(sys.argv[3])
    offset = int(sys.argv[4]) if len(sys.argv) > 4 else 0
    header, raw = read(source)
    width, height, depth, colour = header[0], header[1], header[2], header[3]
    channels = {0: 1, 2: 3, 4: 2, 6: 4}[colour]
    assert depth == 8, 'only 8-bit captures are read here'
    pixels = unfilter(raw, width, height, channels)
    start = min(offset, height)
    band = min(band, height - start)
    stride = width * channels
    write(target, pixels[start * stride : (start + band) * stride], width, band, channels)
    print(source, '->', target, width, 'x', band, 'from', start, 'of', height)


main()

# Falsifies the new presence guard: `plant` moves one documented fence comment away
# from the transcription, `restore` puts the documented byte back.
import pathlib
import sys

DOCUMENTED = "negotiator.encoding('gzip;q=1.0, deflate;q=0.8', ['gzip', 'deflate']) // 'gzip'\n"
PLANTED = "negotiator.encoding('gzip;q=1.0, deflate;q=0.8', ['gzip', 'deflate']) // 'deflate'\n"

mode = sys.argv[1]
old, new = (DOCUMENTED, PLANTED) if mode == 'plant' else (PLANTED, DOCUMENTED)
path = pathlib.Path('guides/server.md')
text = path.read_text(encoding='utf8')
if text.count(old) != 1:
    sys.exit(f'{mode}: anchor not unique ({text.count(old)})')
path.write_text(text.replace(old, new), encoding='utf8')
print(f'{mode}: done')

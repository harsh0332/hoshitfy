#!/usr/bin/env bash
# Compress one raw clip for the portfolio.
# Usage: scripts/encode-video.sh "<raw clip>" <short-form|ads> <slug>
# Output: public/videos/work/<category>/<slug>.mp4 (H.264, faststart, <= 8 MB), then run `npm run portfolio`.
set -euo pipefail

IN="$1"; CATEGORY="$2"; SLUG="$3"
OUT_DIR="public/videos/work/$CATEGORY"
OUT="$OUT_DIR/$SLUG.mp4"
MAX_BYTES=8000000
mkdir -p "$OUT_DIR"

DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
# Bitrate budget: 8 MB minus 10% headroom, 96 kbps audio
TOTAL_KBPS=$(python3 -c "print(int($MAX_BYTES * 8 * 0.90 / $DURATION / 1000))")
VIDEO_KBPS=$(( TOTAL_KBPS - 96 ))
[ "$VIDEO_KBPS" -gt 2500 ] && VIDEO_KBPS=2500

# Portrait clips -> 720x1280, landscape -> 1280x720
W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$IN")
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$IN")
if [ "$W" -gt "$H" ]; then SCALE="1280:-2"; else SCALE="-2:1280"; fi

ffmpeg -v error -y -i "$IN" -vf "scale=$SCALE:flags=lanczos,fps=30" \
  -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p \
  -b:v "${VIDEO_KBPS}k" -maxrate "$((VIDEO_KBPS * 3 / 2))k" -bufsize "$((VIDEO_KBPS * 2))k" \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT"

echo "$OUT $(du -h "$OUT" | cut -f1)"

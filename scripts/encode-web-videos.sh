#!/usr/bin/env bash
set -e

FFMPEG="/opt/homebrew/bin/ffmpeg"
IN_DIR="_inbox/videos"
OUT_DIR="public/videos"
POSTER_DIR="public/posters"

mkdir -p "$OUT_DIR" "$POSTER_DIR"

declare -a VIDEOS=(
  "Sequence 01_2.mp4:hero-showreel:1080:1920:2"
  "WhatsApp Video 2026-09-19 at 18.30.03_1.mp4:founder-story:720:1280:2"
  "Avatar 7.mp4:ai-avatar-dubai:1080:1920:2"
  "Avatar Video_1080p_1.mp4:ai-avatar-ugc:1080:1920:2"
  "Character_falling_in_urban_colli…_20260918204427_3.mp4:vfx-hook:720:1280:2"
  "Google_Flow_2.mp4:saas-product:1080:1920:2"
  "ElevenLabs_2026-09-19T15_57_24_Dhanraj English  voice_pvc_sp114_s54_sb100_se0_b_m2.mp4:founder-voice:1080:1920:2"
  "ElevenLabs_2026-09-16T12_02_07_Dhanraj English  voice_pvc_sp114_s54_sb100_se0_b_m2_1.mp4:personal-brand-short:1080:1920:2"
  "Animation 1.mp4:motion-intro:1920:1080:1"
)

echo "Starting video processing..."

for item in "${VIDEOS[@]}"; do
  IFS=":" read -r src slug w h seek <<< "$item"
  src_file="$IN_DIR/$src"

  if [ ! -f "$src_file" ]; then
    echo "Warning: File $src_file not found, skipping."
    continue
  fi

  echo "==> Processing: $slug ($src)"

  # 1. Full web video (720 width for 9:16 or scaled proportionally)
  if [ "$w" -gt "$h" ]; then
    # Landscape
    scale_full="1280:720"
    scale_preview="640:360"
  else
    # Portrait
    scale_full="720:1280"
    scale_preview="450:800"
  fi

  # Full version with audio (CRF 26, max 4-7MB)
  $FFMPEG -y -i "$src_file" \
    -vf "scale=$scale_full:force_original_aspect_ratio=decrease,pad=$scale_full:(ow-iw)/2:(oh-ih)/2" \
    -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 128k -movflags +faststart \
    "$OUT_DIR/${slug}-full.mp4" < /dev/null

  # Short hover preview (first 7 seconds, muted, lower bitrate)
  $FFMPEG -y -i "$src_file" -t 7 \
    -vf "scale=$scale_preview:force_original_aspect_ratio=decrease,pad=$scale_preview:(ow-iw)/2:(oh-ih)/2" \
    -an -c:v libx264 -crf 28 -preset fast -movflags +faststart \
    "$OUT_DIR/${slug}-preview.mp4" < /dev/null

  # JPG poster (quality 85)
  $FFMPEG -y -ss "$seek" -i "$src_file" -vframes 1 \
    -vf "scale=$scale_full:force_original_aspect_ratio=decrease,pad=$scale_full:(ow-iw)/2:(oh-ih)/2" \
    -q:v 3 "$POSTER_DIR/${slug}.jpg" < /dev/null
done

rm -rf public/posters/test
echo "Finished all video encoding successfully!"

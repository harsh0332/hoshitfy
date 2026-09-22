#!/usr/bin/env bash
# Host Editify — Video Optimization Pipeline
# Converts raw footage into web-optimized H.264 / WebM VP9 / WebP posters

set -euo pipefail

INPUT_DIR="${1:-_inbox/videos}"
OUTPUT_DIR="${2:-public/videos}"
POSTER_DIR="${3:-public/posters}"

mkdir -p "$OUTPUT_DIR" "$POSTER_DIR"
mkdir -p "$OUTPUT_DIR/showreel"
mkdir -p "$OUTPUT_DIR/portfolio"
mkdir -p "$OUTPUT_DIR/before-after"

echo "=== Host Editify Video Processing Started ==="

# Check ffmpeg availability
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed. Please install via: brew install ffmpeg"
    exit 1
fi

# 1. Process Hero Showreel
if compgen -G "$INPUT_DIR/showreel/*.mp4" > /dev/null; then
    for raw in "$INPUT_DIR/showreel"/*.mp4; do
        echo "Processing hero showreel: $raw"
        base=$(basename "$raw" .mp4)
        
        # Faststart Autoplay (muted, 720x1280, CRF 26, target <= 3MB)
        ffmpeg -y -i "$raw" -an -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2" \
            -c:v libx264 -crf 26 -preset slow -movflags +faststart "$OUTPUT_DIR/showreel/${base}-autoplay.mp4"
            
        # WebM VP9 version
        ffmpeg -y -i "$raw" -an -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2" \
            -c:v libvpx-vp9 -b:v 800k -crf 32 "$OUTPUT_DIR/showreel/${base}-autoplay.webm"
            
        # Full Lightbox version (with audio)
        ffmpeg -y -i "$raw" -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2" \
            -c:v libx264 -crf 24 -c:a aac -b:a 128k -movflags +faststart "$OUTPUT_DIR/showreel/${base}-full.mp4"
            
        # Poster (WebP, first strong frame at 1s, <= 60KB)
        ffmpeg -y -ss 00:00:01 -i "$raw" -vframes 1 -vf "scale=720:1280" -c:v libwebp -quality 80 "$POSTER_DIR/${base}.webp"
    done
fi

# 2. Process Portfolio Reels
for cat_dir in "$INPUT_DIR/portfolio"/*; do
    if [ -d "$cat_dir" ]; then
        cat_name=$(basename "$cat_dir")
        mkdir -p "$OUTPUT_DIR/portfolio/$cat_name"
        
        for raw in "$cat_dir"/*.mp4; do
            [ -f "$raw" ] || continue
            echo "Processing portfolio reel ($cat_name): $raw"
            base=$(basename "$raw" .mp4)
            
            # Hover preview (first 7 seconds, muted, 540x960, <= 1MB)
            ffmpeg -y -t 7 -i "$raw" -an -vf "scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2" \
                -c:v libx264 -crf 28 -preset fast -movflags +faststart "$OUTPUT_DIR/portfolio/$cat_name/${base}-preview.mp4"
                
            # Full version (with audio)
            ffmpeg -y -i "$raw" -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2" \
                -c:v libx264 -crf 24 -c:a aac -b:a 128k -movflags +faststart "$OUTPUT_DIR/portfolio/$cat_name/${base}-full.mp4"
                
            # Poster (WebP)
            ffmpeg -y -ss 00:00:01 -i "$raw" -vframes 1 -vf "scale=540:960" -c:v libwebp -quality 75 "$POSTER_DIR/${cat_name}-${base}.webp"
        done
    fi
done

# 3. Process Before / After Pairs
for pair_dir in "$INPUT_DIR/before-after"/*; do
    if [ -d "$pair_dir" ]; then
        pair_name=$(basename "$pair_dir")
        mkdir -p "$OUTPUT_DIR/before-after/$pair_name"
        
        if [ -f "$pair_dir/raw.mp4" ] && [ -f "$pair_dir/edit.mp4" ]; then
            echo "Processing before-after pair: $pair_name"
            
            # Standardize resolution and frame rate
            ffmpeg -y -i "$pair_dir/raw.mp4" -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2" \
                -r 30 -c:v libx264 -crf 26 -an "$OUTPUT_DIR/before-after/$pair_name/raw.mp4"
                
            ffmpeg -y -i "$pair_dir/edit.mp4" -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2" \
                -r 30 -c:v libx264 -crf 24 -c:a aac -b:a 128k "$OUTPUT_DIR/before-after/$pair_name/edit.mp4"
        fi
    fi
done

echo "=== Video Processing Completed ==="
du -sh "$OUTPUT_DIR" "$POSTER_DIR"

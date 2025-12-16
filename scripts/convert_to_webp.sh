#!/bin/bash
# ============================================
# WebP Conversion Script - Motions and Emotions
# ============================================
#
# Purpose: Convert images from original_image_storage to WebP format
#          and place them in the appropriate portfolio_use folders
#
# Usage:
#   ./scripts/convert_to_webp.sh                    # Convert all images
#   ./scripts/convert_to_webp.sh --dry-run          # Preview without converting
#   ./scripts/convert_to_webp.sh --new-only         # Only convert images not already in destination
#   ./scripts/convert_to_webp.sh --folder air-show  # Convert specific folder only
#
# ============================================

# Configuration
SOURCE_DIR="assets/images/original_image_storage"
DEST_DIR="assets/images/portfolio_use"
QUALITY=90
MAX_WIDTH=2400
LOG_FILE="scripts/convert_log_$(date +%Y%m%d_%H%M%S).txt"

# Options
DRY_RUN=false
NEW_ONLY=false
SPECIFIC_FOLDER=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --new-only)
            NEW_ONLY=true
            shift
            ;;
        --folder)
            SPECIFIC_FOLDER="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

# Counters
converted_count=0
skipped_exists=0
skipped_no_mapping=0
errors=0

# ============================================
# Folder Mapping Function
# ============================================

get_destination() {
    local source_folder="$1"
    case "$source_folder" in
        "air-show")
            echo "Portfolio_Chicago_Events_webp"
            ;;
        "nature_and_landscape")
            echo "Portfolio_Nature_Landscape_webp"
            ;;
        "Private events")
            echo "Events_Private_Events_webp"
            ;;
        "Home")
            echo "Events_Portrait_Sessions_webp"
            ;;
        "sky-scrapers")
            echo "Portfolio_Chicago_Events_webp"
            ;;
        "Abstract")
            echo "Portfolio_Abstract_webp"
            ;;
        "Destination")
            echo "Events_Destination_Shoots_webp"
            ;;
        "Fall colors - door county")
            echo "Portfolio_Nature_Landscape_webp"
            ;;
        "UNedited Garba - large gatherings")
            echo "Events_Grand_Gatherings_webp"
            ;;
        *)
            echo ""
            ;;
    esac
}

# ============================================
# Helper Functions
# ============================================

# Generate WebP filename from original (lowercase)
get_webp_name() {
    local filename="$1"
    local basename="${filename%.*}"
    # Convert to lowercase using tr
    local lower_name=$(echo "$basename" | tr '[:upper:]' '[:lower:]')
    echo "${lower_name}.webp"
}

# Check if file is an image
is_image() {
    local filename="$1"
    local ext=$(echo "${filename##*.}" | tr '[:upper:]' '[:lower:]')
    case "$ext" in
        jpg|jpeg|png|tiff|tif|bmp)
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Check if ImageMagick is available
check_imagemagick() {
    if ! command -v magick &> /dev/null; then
        echo "ERROR: ImageMagick (magick) not found. Please install it."
        echo "  brew install imagemagick"
        exit 1
    fi
}

# ============================================
# Main Processing
# ============================================

echo "============================================"
echo "WebP Conversion Script - Motions and Emotions"
echo "============================================"
echo ""
echo "Source:      $SOURCE_DIR"
echo "Destination: $DEST_DIR"
echo "Quality:     $QUALITY%"
echo "Max Width:   ${MAX_WIDTH}px"
echo "Dry Run:     $DRY_RUN"
echo "New Only:    $NEW_ONLY"
if [[ -n "$SPECIFIC_FOLDER" ]]; then
    echo "Folder:      $SPECIFIC_FOLDER"
fi
echo ""

# Check dependencies
check_imagemagick

# Create scripts directory if needed
mkdir -p scripts

# Start log
cat > "$LOG_FILE" << EOF
WebP Conversion Log - $(date)
============================================
Quality: $QUALITY%
Dry Run: $DRY_RUN
New Only: $NEW_ONLY

EOF

echo "Processing..."
echo ""

# Process each source folder
for source_path in "$SOURCE_DIR"/*; do
    if [[ -d "$source_path" ]]; then
        folder_name=$(basename "$source_path")

        # Skip if specific folder requested and this isn't it
        if [[ -n "$SPECIFIC_FOLDER" && "$folder_name" != "$SPECIFIC_FOLDER" ]]; then
            continue
        fi

        # Get destination folder
        dest_folder=$(get_destination "$folder_name")

        if [[ -z "$dest_folder" ]]; then
            echo "  [SKIP] No mapping for folder: $folder_name"
            echo "  [SKIP] No mapping: $folder_name" >> "$LOG_FILE"
            skipped_no_mapping=$((skipped_no_mapping + 1))
            continue
        fi

        dest_path="$DEST_DIR/$dest_folder"

        # Ensure destination exists
        if [[ "$DRY_RUN" == false ]]; then
            mkdir -p "$dest_path"
        fi

        echo "Processing: $folder_name -> $dest_folder"
        echo "" >> "$LOG_FILE"
        echo "Folder: $folder_name -> $dest_folder" >> "$LOG_FILE"
        echo "---" >> "$LOG_FILE"

        # Process each image in folder
        for image_path in "$source_path"/*; do
            if [[ -f "$image_path" ]]; then
                filename=$(basename "$image_path")

                # Skip non-image files
                if ! is_image "$filename"; then
                    continue
                fi

                # Generate output filename
                webp_name=$(get_webp_name "$filename")
                output_path="$dest_path/$webp_name"

                # Skip if already exists (when --new-only)
                if [[ "$NEW_ONLY" == true && -f "$output_path" ]]; then
                    skipped_exists=$((skipped_exists + 1))
                    echo "  [EXISTS] $webp_name" >> "$LOG_FILE"
                    continue
                fi

                if [[ "$DRY_RUN" == true ]]; then
                    echo "  [DRY-RUN] Would convert: $filename -> $webp_name"
                    echo "  [DRY-RUN] $filename -> $webp_name" >> "$LOG_FILE"
                    converted_count=$((converted_count + 1))
                else
                    # Perform conversion with resize
                    # -resize "2400x2400>" means: resize only if larger, maintain aspect ratio
                    if magick "$image_path" -resize "${MAX_WIDTH}x${MAX_WIDTH}>" -quality $QUALITY "$output_path" 2>/dev/null; then
                        echo "  [CONVERTED] $filename -> $webp_name"
                        echo "  [CONVERTED] $filename -> $webp_name" >> "$LOG_FILE"
                        converted_count=$((converted_count + 1))
                    else
                        echo "  [ERROR] Failed: $filename"
                        echo "  [ERROR] Failed: $filename" >> "$LOG_FILE"
                        errors=$((errors + 1))
                    fi
                fi
            fi
        done
    fi
done

# ============================================
# Summary Report
# ============================================

echo ""
echo "============================================"
echo "SUMMARY"
echo "============================================"
if [[ "$DRY_RUN" == true ]]; then
    echo "Would convert:        $converted_count"
else
    echo "Converted:            $converted_count"
fi
echo "Skipped (exists):     $skipped_exists"
echo "Skipped (no mapping): $skipped_no_mapping"
echo "Errors:               $errors"
echo ""

cat >> "$LOG_FILE" << EOF

============================================
SUMMARY
============================================
Converted:            $converted_count
Skipped (exists):     $skipped_exists
Skipped (no mapping): $skipped_no_mapping
Errors:               $errors
EOF

echo "Log saved to: $LOG_FILE"

# Show disk space saved (if not dry run)
if [[ "$DRY_RUN" == false && $converted_count -gt 0 ]]; then
    echo ""
    echo "Destination folder sizes:"
    du -sh "$DEST_DIR"/* 2>/dev/null | grep -v ".DS_Store"
fi

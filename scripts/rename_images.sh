#!/bin/bash
# ============================================
# Image Renaming Script - Motions and Emotions
# ============================================
#
# Purpose: Standardize image filenames with date prefix (YYYYMMDD-filename.ext)
#
# Usage:
#   ./scripts/rename_images.sh                    # Process all files
#   ./scripts/rename_images.sh --dry-run          # Preview changes without renaming
#   ./scripts/rename_images.sh --new-only         # Only process files without date prefix
#
# ============================================

# Configuration
STORAGE_DIR="assets/images/original_image_storage"
LOG_FILE="scripts/rename_log_$(date +%Y%m%d_%H%M%S).txt"
DRY_RUN=false
NEW_ONLY=false

# Parse arguments
for arg in "$@"; do
    case $arg in
        --dry-run)
            DRY_RUN=true
            ;;
        --new-only)
            NEW_ONLY=true
            ;;
    esac
done

# Counters
renamed_count=0
skipped_already_dated=0
skipped_no_date=0
errors=0

# Arrays for reporting
declare -a renamed_files
declare -a needs_manual_date

# ============================================
# Date Extraction Functions
# ============================================

# Check if filename already has YYYYMMDD- prefix
has_date_prefix() {
    local filename="$1"
    if [[ "$filename" =~ ^[0-9]{8}- ]]; then
        return 0  # true
    fi
    return 1  # false
}

# Extract date from various filename patterns
# Returns date in YYYYMMDD format or empty string if not found
extract_date() {
    local filename="$1"

    # Pattern 1: pxl_YYYYMMDD_HHMMSS (Google Pixel)
    if [[ "$filename" =~ pxl_([0-9]{8})_ ]]; then
        echo "${BASH_REMATCH[1]}"
        return
    fi

    # Pattern 2: img_YYYYMMDD_HHMMSS (Android phones)
    if [[ "$filename" =~ img_([0-9]{8})_ ]]; then
        echo "${BASH_REMATCH[1]}"
        return
    fi

    # Pattern 3: IMG_YYYYMMDD_HHMMSS (iOS/Android)
    if [[ "$filename" =~ IMG_([0-9]{8})_ ]]; then
        echo "${BASH_REMATCH[1]}"
        return
    fi

    # Pattern 4: YYYYMMDD_HHMMSS (generic timestamp)
    if [[ "$filename" =~ ^([0-9]{8})_[0-9]{6} ]]; then
        echo "${BASH_REMATCH[1]}"
        return
    fi

    # Pattern 5: YYYY-MM-DD or YYYY_MM_DD at start
    if [[ "$filename" =~ ^([0-9]{4})[-_]([0-9]{2})[-_]([0-9]{2}) ]]; then
        echo "${BASH_REMATCH[1]}${BASH_REMATCH[2]}${BASH_REMATCH[3]}"
        return
    fi

    # No date found
    echo ""
}

# Generate new filename with date prefix
generate_new_name() {
    local filename="$1"
    local date="$2"

    # Remove existing date pattern from filename to avoid duplication
    local clean_name="$filename"

    # Remove pxl_YYYYMMDD_ pattern, keep rest
    if [[ "$filename" =~ ^pxl_[0-9]{8}_(.+)$ ]]; then
        clean_name="pxl_${BASH_REMATCH[1]}"
    # Remove img_YYYYMMDD_ pattern, keep rest
    elif [[ "$filename" =~ ^img_[0-9]{8}_(.+)$ ]]; then
        clean_name="img_${BASH_REMATCH[1]}"
    # Remove IMG_YYYYMMDD_ pattern, keep rest
    elif [[ "$filename" =~ ^IMG_[0-9]{8}_(.+)$ ]]; then
        clean_name="IMG_${BASH_REMATCH[1]}"
    fi

    echo "${date}-${clean_name}"
}

# ============================================
# Main Processing
# ============================================

echo "============================================"
echo "Image Renaming Script - Motions and Emotions"
echo "============================================"
echo ""
echo "Storage Directory: $STORAGE_DIR"
echo "Dry Run: $DRY_RUN"
echo "New Only: $NEW_ONLY"
echo ""
echo "Processing..."
echo ""

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Start log
{
    echo "Image Renaming Log - $(date)"
    echo "============================================"
    echo "Dry Run: $DRY_RUN"
    echo "New Only: $NEW_ONLY"
    echo ""
} > "$LOG_FILE"

# Process each subfolder
for folder in "$STORAGE_DIR"/*; do
    if [[ -d "$folder" ]]; then
        folder_name=$(basename "$folder")
        echo "Processing folder: $folder_name"
        echo "" >> "$LOG_FILE"
        echo "Folder: $folder_name" >> "$LOG_FILE"
        echo "---" >> "$LOG_FILE"

        # Process each file in folder
        for filepath in "$folder"/*; do
            if [[ -f "$filepath" ]]; then
                filename=$(basename "$filepath")
                extension="${filename##*.}"

                # Skip non-image files
                if [[ ! "$extension" =~ ^(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$ ]]; then
                    continue
                fi

                # Skip if already has date prefix
                if has_date_prefix "$filename"; then
                    ((skipped_already_dated++))
                    echo "  [SKIP] Already dated: $filename" >> "$LOG_FILE"
                    continue
                fi

                # Try to extract date
                date=$(extract_date "$filename")

                if [[ -n "$date" ]]; then
                    # Generate new name
                    new_name=$(generate_new_name "$filename" "$date")
                    new_path="$folder/$new_name"

                    if [[ "$DRY_RUN" == true ]]; then
                        echo "  [DRY-RUN] Would rename: $filename -> $new_name"
                        echo "  [DRY-RUN] $filename -> $new_name" >> "$LOG_FILE"
                    else
                        # Perform rename
                        if mv "$filepath" "$new_path" 2>/dev/null; then
                            echo "  [RENAMED] $filename -> $new_name"
                            echo "  [RENAMED] $filename -> $new_name" >> "$LOG_FILE"
                            ((renamed_count++))
                            renamed_files+=("$folder_name/$filename -> $new_name")
                        else
                            echo "  [ERROR] Failed to rename: $filename"
                            echo "  [ERROR] Failed: $filename" >> "$LOG_FILE"
                            ((errors++))
                        fi
                    fi
                else
                    # No date found - needs manual dating
                    ((skipped_no_date++))
                    echo "  [NO DATE] $filename" >> "$LOG_FILE"
                    needs_manual_date+=("$folder_name/$filename")
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
echo "Renamed:              $renamed_count"
echo "Skipped (has date):   $skipped_already_dated"
echo "Needs manual date:    $skipped_no_date"
echo "Errors:               $errors"
echo ""

{
    echo ""
    echo "============================================"
    echo "SUMMARY"
    echo "============================================"
    echo "Renamed:              $renamed_count"
    echo "Skipped (has date):   $skipped_already_dated"
    echo "Needs manual date:    $skipped_no_date"
    echo "Errors:               $errors"
    echo ""

    if [[ ${#needs_manual_date[@]} -gt 0 ]]; then
        echo "FILES NEEDING MANUAL DATE:"
        echo "--------------------------"
        for file in "${needs_manual_date[@]}"; do
            echo "  - $file"
        done
    fi
} >> "$LOG_FILE"

if [[ ${#needs_manual_date[@]} -gt 0 ]]; then
    echo "FILES NEEDING MANUAL DATE:"
    echo "--------------------------"
    for file in "${needs_manual_date[@]}"; do
        echo "  - $file"
    done
fi

echo ""
echo "Log saved to: $LOG_FILE"

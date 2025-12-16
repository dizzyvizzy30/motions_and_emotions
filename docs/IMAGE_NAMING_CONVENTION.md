# Image Naming Convention & Management

> Documentation for standardizing image filenames in the Motions and Emotions photography portfolio.

---

## Overview

All images in the `Original_image_storage` folder should follow a standardized naming convention with a **date prefix** for chronological organization in galleries.

### Target Format

```
YYYYMMDD-descriptive_name.ext
```

**Examples:**
- `20240810-DSC03950.jpg`
- `20210904-pxl_210052822.jpg`
- `20231225-family_christmas_portrait.jpg`

---

## Folder Structure

```
assets/images/
├── original_image_storage/          # RAW/original images (source of truth)
│   ├── air-show/
│   ├── nature_and_landscape/
│   ├── Private events/
│   ├── Home/
│   └── sky-scrapers/
│
└── portfolio_use/                   # Processed images for website
    ├── Portfolio_Chicago_Events_webp/
    ├── Portfolio_Nature_Landscape_webp/
    ├── Portfolio_Abstract_webp/
    ├── Events_Portrait_Sessions_webp/
    ├── Events_Private_Events_webp/
    ├── Events_Grand_Gatherings_webp/
    └── Events_Destination_Shoots_webp/
```

---

## Adding New Images

### Step 1: Name Your Files Before Adding

When exporting from Lightroom or your camera:

1. **Best Practice:** Export with date prefix already applied
   - Lightroom: Use `{Date (YYYYMMDD)}-{Filename}` in export naming
   - Example output: `20240810-DSC03950.jpg`

2. **If using phone photos:** Most phones embed dates in filenames
   - Pixel: `pxl_20210904_210052822.jpg` (script will reformat)
   - Android: `img_20211008_202137.jpg` (script will reformat)
   - iPhone: `IMG_20231225_143022.jpg` (script will reformat)

### Step 2: Add Files to Appropriate Folder

Place your new images in the correct subfolder within `original_image_storage/`:

| Content Type | Folder |
|--------------|--------|
| Chicago events, airshows | `air-show/` |
| Nature, landscapes, cityscapes | `nature_and_landscape/` |
| Private events, portraits | `Private events/` |
| Home/studio shoots | `Home/` |
| Architecture | `sky-scrapers/` |

### Step 3: Run the Renaming Script

```bash
# From project root directory

# Preview changes (recommended first)
./scripts/rename_images.sh --dry-run

# Run actual rename
./scripts/rename_images.sh

# Process only new files (skips already-dated files)
./scripts/rename_images.sh --new-only
```

### Step 4: Check the Log

After running, check the generated log file in `scripts/`:
```
scripts/rename_log_YYYYMMDD_HHMMSS.txt
```

The log shows:
- Files that were renamed
- Files that already had dates (skipped)
- Files that need manual dating

---

## Manual Dating

For files without embedded dates, manually rename them:

```
# Original
dsc00537.jpg

# Renamed (add the date you took the photo)
20231015-dsc00537.jpg
```

**Tips for finding photo dates:**
- Check Lightroom catalog
- Check phone gallery "Details"
- Check folder organization from when you imported
- Use approximate date if exact date unknown

---

## Filename Patterns Recognized

The script automatically detects these patterns:

| Pattern | Example | Extracted Date |
|---------|---------|----------------|
| Already prefixed | `20240810-DSC03950.jpg` | Skipped (correct) |
| Pixel phone | `pxl_20210904_210052822.jpg` | `20210904` |
| Android | `img_20211008_202137.jpg` | `20211008` |
| iPhone | `IMG_20231225_143022.jpg` | `20231225` |
| Timestamp | `20240101_143022.jpg` | `20240101` |

---

## Converting to WebP for Website

After organizing originals, convert images to web-optimized WebP format.

### Conversion Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| Format | WebP | Modern, efficient web format |
| Quality | 90% | High quality, good compression |
| Max Width | 2400px | Perfect for retina displays |
| Typical Output | ~300-400 KB | Fast loading on web |

### Folder Mapping

| Original Folder | Destination Folder |
|-----------------|-------------------|
| `air-show/` | `Portfolio_Chicago_Events_webp/` |
| `nature_and_landscape/` | `Portfolio_Nature_Landscape_webp/` |
| `Private events/` | `Events_Private_Events_webp/` |
| `Home/` | `Events_Portrait_Sessions_webp/` |
| `sky-scrapers/` | `Portfolio_Chicago_Events_webp/` |

### Running the Conversion

```bash
# From project root directory

# Preview what will be converted
./scripts/convert_to_webp.sh --dry-run

# Convert all images
./scripts/convert_to_webp.sh

# Convert only new images (skip existing)
./scripts/convert_to_webp.sh --new-only

# Convert specific folder only
./scripts/convert_to_webp.sh --folder "air-show"
```

### What the Script Does

1. Reads images from `original_image_storage/` subfolders
2. Resizes to max 2400px width (maintains aspect ratio, no cropping)
3. Converts to WebP at 90% quality
4. Saves to appropriate `portfolio_use/` folder
5. Generates a log file in `scripts/`

### Output Naming

- Filenames are converted to lowercase
- Extension changed to `.webp`
- Date prefix preserved

Example: `20240810-DSC03950.jpg` → `20240810-dsc03950.webp`

---

## Quick Reference

### Commands

```bash
# === RENAMING ===
# Preview renaming changes
./scripts/rename_images.sh --dry-run

# Rename files with detectable dates
./scripts/rename_images.sh

# === WEBP CONVERSION ===
# Preview conversion
./scripts/convert_to_webp.sh --dry-run

# Convert all images to WebP
./scripts/convert_to_webp.sh

# Convert only new images
./scripts/convert_to_webp.sh --new-only
```

### Checklist for New Photos

- [ ] Export from Lightroom with date prefix OR use phone's default naming
- [ ] Place in correct `original_image_storage/` subfolder
- [ ] Run `./scripts/rename_images.sh` (formats date prefixes)
- [ ] Manually date any flagged files
- [ ] Run `./scripts/convert_to_webp.sh --new-only` (converts to web format)
- [ ] Verify images appear in correct `portfolio_use/` folder

---

## Troubleshooting

**Scripts won't run:**
```bash
chmod +x scripts/rename_images.sh
chmod +x scripts/convert_to_webp.sh
```

**Files not being renamed:**
- Check if they already have `YYYYMMDD-` prefix
- Check if filename matches a known pattern
- May need manual dating

**Wrong date extracted:**
- Manually rename the file
- The script won't overwrite manually dated files

**Conversion errors:**
- Ensure ImageMagick is installed: `brew install imagemagick`
- Check file permissions on destination folders
- Review the log file for specific errors

**Images not appearing in expected folder:**
- Check the folder mapping in `convert_to_webp.sh`
- Add new mappings to the `get_destination()` function if needed

---

## Adding New Source Folders

To add a new source folder category:

1. Create the folder in `original_image_storage/`
2. Create corresponding folder in `portfolio_use/` (with `_webp` suffix)
3. Edit `scripts/convert_to_webp.sh` and add mapping to `get_destination()` function:

```bash
get_destination() {
    local source_folder="$1"
    case "$source_folder" in
        "your-new-folder")
            echo "Your_New_Destination_webp"
            ;;
        # ... existing mappings
    esac
}
```

---

*Last updated: December 2024*

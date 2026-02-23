const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const GALLERY_DIR = path.join(__dirname, 'public/assets/validictory');
const TARGET_WIDTH = 600;

async function optimizeImages() {
    console.log(`Starting optimization in ${GALLERY_DIR}...`);
    const files = fs.readdirSync(GALLERY_DIR);

    let processed = 0;
    let skipped = 0;

    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

        // Skip already processed files or "-thumb" files to be safe
        if (file.includes('-thumb')) continue;

        const inputPath = path.join(GALLERY_DIR, file);
        const parsedPath = path.parse(file);
        const outputPath = path.join(GALLERY_DIR, `${parsedPath.name}-thumb.webp`);

        // Skip if thumbnail already exists
        if (fs.existsSync(outputPath)) {
            skipped++;
            continue;
        }

        try {
            await sharp(inputPath)
                .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
                .webp({ quality: 65, effort: 4 })
                .toFile(outputPath);

            processed++;
            if (processed % 10 === 0) {
                console.log(`Processed ${processed} images...`);
            }
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log(`Optimization complete! Processed: ${processed}, Skipped: ${skipped}`);
}

optimizeImages();

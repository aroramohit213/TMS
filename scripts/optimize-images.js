/**
 * Image Optimization Script
 * Converts and optimizes images to multiple resolutions and formats
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_SIZES = {
  thumb: { width: 600, height: 450 },
  medium: { width: 1200, height: 900 },
  large: { width: 1920, height: 1440 },
};

const QUALITY = {
  jpg: 80,
  webp: 80,
};

const CATEGORIES = ['bridal', 'editorial', 'glam', 'sfx'];

async function optimizeImage(inputPath, outputDirBase, category) {
  const filename = path.parse(inputPath).name;

  for (const [size, dimensions] of Object.entries(IMAGE_SIZES)) {
    const outputDir = path.join(outputDirBase, category);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
      // JPG optimization
      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center',
          withoutEnlargement: true,
        })
        .jpeg({ 
          quality: QUALITY.jpg, 
          progressive: true,
          mozjpeg: true,
        })
        .toFile(path.join(outputDir, `${filename}-${dimensions.width}w.jpg`));

      // WebP optimization
      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center',
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY.webp })
        .toFile(path.join(outputDir, `${filename}-${dimensions.width}w.webp`));

      console.log(`✓ Optimized ${filename} (${size})`);
    } catch (error) {
      console.error(`✗ Error optimizing ${filename}:`, error.message);
    }
  }
}

async function optimize() {
  const sourceDir = 'public/images/original';
  const outputBase = 'public/images/optimized/gallery';
  const webpBase = 'public/images/webp/gallery';

  // Ensure source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.log(`Source directory not found: ${sourceDir}`);
    console.log('Please create it and add your original images.');
    return;
  }

  console.log('🖼️  Starting image optimization...\n');

  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  if (imageFiles.length === 0) {
    console.log('No image files found in source directory.');
    return;
  }

  console.log(`Found ${imageFiles.length} images to process\n`);

  for (const file of imageFiles) {
    // Try to determine category from filename or use default
    let category = 'gallery';
    for (const cat of CATEGORIES) {
      if (file.toLowerCase().includes(cat)) {
        category = cat;
        break;
      }
    }

    await optimizeImage(path.join(sourceDir, file), outputBase, category);
  }

  console.log('\n✅ Image optimization complete!');
  console.log(`\nOptimized images are in:\n  - ${outputBase}/\n  - ${webpBase}/`);
}

// Run optimization
optimize().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

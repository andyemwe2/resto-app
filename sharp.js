const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetImage = path.resolve(__dirname, 'src/public/images/heros/hero-image_1.jpg');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

// Periksa apakah file target ada sebelum diproses
if (fs.existsSync(targetImage)) {
  // Mengubah ukuran gambar dengan lebar 800px, dengan suffix -large.jpg
  sharp(targetImage)
    .resize(800)
    .toFile(path.resolve(destination, 'hero-image_1-large.jpg'))
    .then(() => console.log('Processed large image successfully'))
    .catch(err => console.error('Error processing large image:', err));

  // Mengubah ukuran gambar dengan lebar 480px, dengan suffix -small.jpg
  sharp(targetImage)
    .resize(480)
    .toFile(path.resolve(destination, 'hero-image_1-small.jpg'))
    .then(() => console.log('Processed small image successfully'))
    .catch(err => console.error('Error processing small image:', err));
} else {
  console.error(`File not found: ${targetImage}`);
}

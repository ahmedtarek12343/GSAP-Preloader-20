/**
 * Re-encodes the source PNGs in assets-src/ into web-sized WebP in public/.
 *
 *   bun run images
 *
 * Why this exists: the originals are 904-1200px PNGs totalling ~44MB, but the
 * preloader grid renders them at min(160px, 20vw). That is a ~56x oversample by
 * pixel area, and decoding 36 of them costs ~160MB of bitmap memory, which is
 * what makes the preloader stutter on mid-range hardware.
 *
 * PNG is also the wrong codec here: it is lossless and built for flat graphics,
 * not photographs. WebP is used rather than AVIF because it decodes noticeably
 * faster, and decode speed is exactly what matters when 36 images have to be
 * paint-ready before an animation starts.
 *
 * Originals are never modified — edit them in assets-src/ and re-run this.
 */

import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public";

/**
 * Images the timeline ever displays at a large size:
 *   image5_1  -> .main-img, which scales to 3x (~480 CSS px)
 *   image2_1, image3_1, image5_1 -> the three .main-img-cpy panels
 * Everything else only ever appears in the 160px grid during the shuffle.
 * If you change which grid slot becomes .main-img, update this set.
 */
const HERO = new Set(["image2_1", "image3_1", "image5_1"]);

const HERO_WIDTH = 1000; // ~480 CSS px at 2x DPR, with headroom
const GRID_WIDTH = 400; // ~160 CSS px at 2x DPR, with headroom
const QUALITY = 82;

const mb = (bytes) => (bytes / 1048576).toFixed(2);

async function main() {
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC)).filter((f) => /\.png$/i.test(f)).sort();

  if (files.length === 0) {
    console.error(`No PNGs found in ${SRC}/`);
    process.exit(1);
  }

  let srcTotal = 0;
  let outTotal = 0;

  for (const file of files) {
    const name = path.basename(file, path.extname(file));
    const width = HERO.has(name) ? HERO_WIDTH : GRID_WIDTH;
    const srcPath = path.join(SRC, file);
    const outPath = path.join(OUT, `${name}.webp`);

    const before = (await stat(srcPath)).size;

    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    const after = (await stat(outPath)).size;

    srcTotal += before;
    outTotal += after;

    const tag = HERO.has(name) ? "hero" : "grid";
    console.log(
      `${name.padEnd(10)} ${tag}  ${String(width).padStart(4)}px  ` +
        `${mb(before).padStart(6)}MB -> ${mb(after).padStart(6)}MB`,
    );
  }

  const factor = (srcTotal / outTotal).toFixed(1);
  console.log(
    `\n${files.length} images: ${mb(srcTotal)}MB -> ${mb(outTotal)}MB ` +
      `(${factor}x smaller)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Utility to dynamically crop the "A" dumbbell icon from the main logo
 * and set it as the browser's favicon.
 */
export function cropAndSetFavicon(imageSrc: string) {
  if (typeof window === 'undefined') return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageSrc;

  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Find boundaries of the non-white visual content
      let minX = width;
      let maxX = 0;
      let minY = height;
      let maxY = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // A pixel is visual content if it's not fully transparent and not close to white
          if (a > 0 && !(r > 240 && g > 240 && b > 240)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;

      if (contentWidth <= 0 || contentHeight <= 0) return;

      // The "A" dumbbell logo is situated at the top, occupying roughly the top 58% of the non-white height.
      // The rest at the bottom is the "ANYTIME FITNESS" brand text.
      const iconHeight = contentHeight * 0.58;
      
      // We want a square crop for the favicon
      const cropSize = Math.round(iconHeight);
      
      // Center the crop horizontally within the content bounds
      const cropX = Math.round(minX + (contentWidth - cropSize) / 2);
      const cropY = minY;

      // Create a 128x128 canvas for the favicon
      const favCanvas = document.createElement("canvas");
      favCanvas.width = 128;
      favCanvas.height = 128;
      const favCtx = favCanvas.getContext("2d");
      if (!favCtx) return;

      favCtx.clearRect(0, 0, 128, 128);

      // Draw the cropped portion from the original image onto the favicon canvas
      favCtx.drawImage(
        img,
        cropX, cropY, cropSize, cropSize,
        0, 0, 128, 128
      );

      // Remove the white background from the cropped favicon
      const favImageData = favCtx.getImageData(0, 0, 128, 128);
      const favData = favImageData.data;
      for (let i = 0; i < favData.length; i += 4) {
        const r = favData[i];
        const g = favData[i + 1];
        const b = favData[i + 2];
        if (r > 235 && g > 235 && b > 235) {
          favData[i + 3] = 0; // Transparent
        }
      }
      favCtx.putImageData(favImageData, 0, 0);

      // Update or create the link elements for the favicon
      const dataUrl = favCanvas.toDataURL("image/png");
      const iconTypes = ["icon", "shortcut icon", "apple-touch-icon"];
      
      iconTypes.forEach(rel => {
        let link: HTMLLinkElement | null = document.querySelector(`link[rel='${rel}']`);
        if (!link) {
          link = document.createElement("link");
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = dataUrl;
        link.type = "image/png";
      });
    } catch (e) {
      console.error("Error cropping and setting favicon:", e);
    }
  };
}

/**
 * Utility to remove white or near-white backgrounds from images using HTML5 Canvas
 * AND convert dark elements (like black text, dark "T", and dark dumbbells) to white
 * so they are clearly visible on a dark website theme.
 */
export function removeWhiteBackground(imageSrc: string, callback: (dataUrl: string) => void, threshold = 235) {
  if (typeof window === 'undefined') return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageSrc;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      callback(imageSrc);
      return;
    }

    ctx.drawImage(img, 0, 0);
    
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // 1. If the pixel is close to white, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0; // Alpha = 0
        } else {
          // 2. Convert black/dark gray components to white for high contrast on dark themes.
          // Detect red so we don't accidentally convert the red "A" and muscular arm.
          const isRed = (r > g + 40) && (r > b + 40);
          const isDark = (r < 135 && g < 135 && b < 135);

          if (!isRed && isDark) {
            data[i] = 255;     // Red
            data[i + 1] = 255; // Green
            data[i + 2] = 255; // Blue
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL("image/png"));
    } catch (e) {
      console.error("Error removing background from image:", e);
      callback(imageSrc); // Fallback to original image
    }
  };

  img.onerror = () => {
    console.error("Failed to load image for background removal:", imageSrc);
    callback(imageSrc);
  };
}

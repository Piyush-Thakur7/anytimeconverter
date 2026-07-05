/**
 * Utility to remove white or near-white backgrounds from images using HTML5 Canvas.
 * Converts pixels with RGB values greater than the threshold (default 235) to transparent.
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

        // If the pixel is close to white, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0; // Alpha = 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL("image/png"));
    } catch (e) {
      console.error("Error removing background from image:", e);
      callback(imageSrc); // Fallback to original image if security/CORS issue
    }
  };

  img.onerror = () => {
    console.error("Failed to load image for background removal:", imageSrc);
    callback(imageSrc);
  };
}

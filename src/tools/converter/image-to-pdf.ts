import { PDFDocument } from 'pdf-lib';

// Page size presets (in points, 1 point = 1/72 inch)
export const PAGE_SIZES = {
  A4: { width: 595, height: 842 },
  Letter: { width: 612, height: 792 },
  A5: { width: 420, height: 595 },
  Legal: { width: 612, height: 1008 },
  Custom: null, // User defined
} as const;

export type PageSizeName = keyof typeof PAGE_SIZES;

export interface ImageToPdfOptions {
  pageSize: PageSizeName | { width: number; height: number };
  pageOrientation: 'portrait' | 'landscape';
  imageFit: 'fit' | 'fill' | 'original';
  margin: number; // in points
  filename: string;
}

export interface ImageFile {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
}

const DEFAULT_OPTIONS: ImageToPdfOptions = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  imageFit: 'fit',
  margin: 36, // 0.5 inch margin
  filename: 'image-to-pdf.pdf',
};

/**
 * Get image dimensions from data URL
 */
export async function getImageDimensions(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Read file as data URL
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Detect if image is landscape based on dimensions
 */
export function isLandscape(width: number, height: number): boolean {
  return width > height;
}

/**
 * Get MIME type from data URL or filename
 */
export function getMimeType(dataUrl: string, filename?: string): string {
  // First try to get from data URL prefix
  const dataUrlMatch = dataUrl.match(/^data:([^;]+);/);
  if (dataUrlMatch?.[1]) {
    return dataUrlMatch[1];
  }

  // Fallback to filename extension
  if (filename) {
    const ext = filename.toLowerCase().split('.').pop();
    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      bmp: 'image/bmp',
      tiff: 'image/tiff',
      tif: 'image/tiff',
    };
    return mimeTypes[ext || ''] || 'image/jpeg';
  }

  return 'image/jpeg';
}

/**
 * Convert image to PNG format using canvas
 * This is needed for formats that pdf-lib doesn't support natively (GIF, WebP, BMP)
 */
async function convertToPng(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const pngDataUrl = canvas.toDataURL('image/png');
      resolve(pngDataUrl);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

/**
 * Embed image into PDF based on MIME type
 * Converts unsupported formats to PNG before embedding
 */
async function embedImage(
  pdfDoc: PDFDocument,
  imageData: string,
  mimeType: string
): Promise<ReturnType<typeof pdfDoc.embedJpg>> {
  // pdf-lib supports: JPEG and PNG natively
  // For other formats, convert to PNG first
  if (mimeType === 'image/png') {
    return pdfDoc.embedPng(imageData);
  }
  if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
    return pdfDoc.embedJpg(imageData);
  }

  // For GIF, WebP, BMP, etc., convert to PNG first
  const pngDataUrl = await convertToPng(imageData);
  return pdfDoc.embedPng(pngDataUrl);
}

/**
 * Calculate image dimensions to fit within page
 */
function calculateImageDimensions(
  imageWidth: number,
  imageHeight: number,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  fitMode: 'fit' | 'fill' | 'original'
): { width: number; height: number; x: number; y: number } {
  const availableWidth = pageWidth - 2 * margin;
  const availableHeight = pageHeight - 2 * margin;

  if (fitMode === 'original') {
    return {
      width: imageWidth,
      height: imageHeight,
      x: (pageWidth - imageWidth) / 2,
      y: (pageHeight - imageHeight) / 2,
    };
  }

  if (fitMode === 'fill') {
    return {
      width: availableWidth,
      height: availableHeight,
      x: margin,
      y: margin,
    };
  }

  // fit mode - maintain aspect ratio
  const scale = Math.min(availableWidth / imageWidth, availableHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;

  return {
    width,
    height,
    x: (pageWidth - width) / 2,
    y: (pageHeight - height) / 2,
  };
}

/**
 * Main conversion function
 */
export async function convertImagesToPdf(
  images: ImageFile[],
  options: Partial<ImageToPdfOptions> = {}
): Promise<Uint8Array> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Create PDF document
  const pdfDoc = await PDFDocument.create();

  // Get page dimensions
  let pageWidth: number;
  let pageHeight: number;

  if (typeof opts.pageSize === 'object') {
    pageWidth = opts.pageSize.width;
    pageHeight = opts.pageSize.height;
  } else if (opts.pageSize === 'Custom') {
    pageWidth = 595;
    pageHeight = 842;
  } else {
    const size = PAGE_SIZES[opts.pageSize];
    pageWidth = size.width;
    pageHeight = size.height;
  }

  // Handle orientation
  if (opts.pageOrientation === 'landscape') {
    [pageWidth, pageHeight] = [pageHeight, pageWidth];
  }

  // Process each image
  for (const image of images) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const mimeType = getMimeType(image.dataUrl, image.file.name);
    const embeddedImage = await embedImage(pdfDoc, image.dataUrl, mimeType);

    const dims = calculateImageDimensions(
      image.width,
      image.height,
      pageWidth,
      pageHeight,
      opts.margin,
      opts.imageFit
    );

    page.drawImage(embeddedImage, {
      x: dims.x,
      y: dims.y,
      width: dims.width,
      height: dims.height,
    });
  }

  return pdfDoc.save();
}

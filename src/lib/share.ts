import html2canvas from "html2canvas";

export async function generateShareImage(
  element: HTMLElement
): Promise<string> {
  // Wait for custom fonts to load before capturing
  await document.fonts.ready;
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });
  return canvas.toDataURL("image/png");
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

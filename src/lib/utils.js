import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const breakpoints = {
  xs: 400,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  "2xl": 1400,
  "3xl": 1600,
  "4xl": 1800,
  "5xl": 2200
}

export async function tryCatch(fn, errorHandler) {
  try {
    const value = await fn()
    return { success: true, value }
  }
  catch (error) {
    const processedError = errorHandler ? errorHandler(error) : error
    return { success: false, error: processedError, errorMsg: error?.response?.data?.message }
  }
}

export function downloadAudio(url, filename) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      return { isSuccess: true, statusCode: 200, message: "Audio downloaded successfully" };
    })
    .catch((error) => {
      console.error("Audio download failed:", error);
      return { isSuccess: false, statusCode: 400, error, message: "Something went wrong while dowloading audio" };
    });
}
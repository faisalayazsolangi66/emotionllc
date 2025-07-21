import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Emotions LLC - Social & Dating Platform",
    short_name: "Emotions",
    description: "Connect with people who share your interests and find meaningful relationships",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#e53e3e",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

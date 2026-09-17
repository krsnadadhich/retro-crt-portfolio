import type { MetadataRoute } from "next"

const BASE_URL = "https://krsnadadhich.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/skills", "/education", "/certifications", "/projects"]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}

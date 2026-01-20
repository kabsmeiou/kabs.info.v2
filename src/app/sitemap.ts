import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: "https://kabsmeiou.space",
        lastModified: new Date(),
        priority: 1,
    },
    {
        url: "https://kabsmeiou.space/projects",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    },
    {
        url: "https://kabsmeiou.space/blogs",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }
  ];
}

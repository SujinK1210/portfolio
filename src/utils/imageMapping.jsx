// src/utils/imageMapping.js

// Import all your exhibition images
import bMypotent from "../assets/exhibition-images/b-mypotent.jpg";
import bRurd from "../assets/exhibition-images/b-rurd.jpg";
import brandingBear from "../assets/exhibition-images/branding-bear.jpg";
import gGrab from "../assets/exhibition-images/g-grab.jpg";
import gStar from "../assets/exhibition-images/g-star.jpg";
import rectangle1407_1 from "../assets/exhibition-images/Rectangle 1407-1.jpg";
import rectangle1407_3 from "../assets/exhibition-images/Rectangle 1407-3.jpg";
import rectangle1407 from "../assets/exhibition-images/Rectangle 1407.jpg";
import uAdWebsite from "../assets/exhibition-images/u-ad-website.jpg";
import uFurniture from "../assets/exhibition-images/u-furniture.jpg";
import uxAdsologistIsland from "../assets/exhibition-images/ux-adsologist-island.jpg";

export const imageMap = {
  "b-mypotent.jpg": bMypotent,
  "b-rurd.jpg": bRurd,
  "branding-bear.jpg": brandingBear,
  "g-grab.jpg": gGrab,
  "g-star.jpg": gStar,
  "Rectangle 1407-1.jpg": rectangle1407_1,
  "Rectangle 1407-3.jpg": rectangle1407_3,
  "Rectangle 1407.jpg": rectangle1407,
  "u-ad-website.jpg": uAdWebsite,
  "u-furniture.jpg": uFurniture,
  "ux-adsologist-island.jpg": uxAdsologistIsland,
};

export const getImage = (filename) => {
  return imageMap[filename] || null;
};

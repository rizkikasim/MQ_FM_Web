import { getAssetUrl } from "../../shared/lib/getAssetUrl";

export const getCategoryName = (categories, id) => {
  const cat = (categories || []).find((c) => c.id === id);
  return cat?.name || "Unknown";
};

export const getCategoryImageUrl = (image) => getAssetUrl(image);

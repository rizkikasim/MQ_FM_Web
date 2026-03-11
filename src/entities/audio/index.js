import { getAssetUrl } from "../../shared/lib/getAssetUrl";

export const formatAudioDate = (dateStr) => new Date(dateStr).toLocaleDateString();

export const formatFileSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

export const getAudioThumbnailUrl = (thumbnail) => getAssetUrl(thumbnail);

export const getAudioStreamUrl = (filePath) => getAssetUrl(filePath);

/**
 * Centralized environment helpers.
 * Keeps secret handling in one place and supports the current .env naming.
 */

export function getJwtSecret() {
    return process.env.JWT_SECRET || process.env.JWT_SECRETE || "dev-only-change-this-secret";
}

export function getCloudinaryConfig() {
    const cloudName = process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return null;
    }

    return { cloudName, apiKey, apiSecret };
}

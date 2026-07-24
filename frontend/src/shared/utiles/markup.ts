export const generateHeadingId = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // remove special characters execpt spaces and hyphens
        .replace(/\s+/g, '-') //Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/traling hyphens
}

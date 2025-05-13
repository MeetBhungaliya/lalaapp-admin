export const convertUrlToFile = async (url, fileName) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const contentType = blob.type;
    return new File([blob], fileName, { type: contentType });
}
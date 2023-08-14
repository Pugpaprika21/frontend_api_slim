/**
 * @param {string} filesValue 
 * @returns {DataTransfer}
 */
export function setValueFileInput(filesValue = "") {
    const dataTransfer = new DataTransfer();
    const file = new File([filesValue], filesValue, {
        type: "text/plain",
        lastModified: new Date(),
    });

    dataTransfer.items.add(file);
    return dataTransfer.files;
}
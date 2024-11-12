// callback - where we want to get result
const blobToBase64 = (
  blob: Blob,
  callback: (base64: string | undefined) => void,
) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64data =
      typeof reader.result === "string"
        ? reader.result.split(",")[1]
        : undefined;
    callback(base64data);
  };
  reader.readAsDataURL(blob);
};

export { blobToBase64 };

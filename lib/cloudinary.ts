const uploadImage = async (file: File) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string; // Must be unsigned!

  const formData = new FormData();
  formData.append("file", file); // Can be a File object, Base64 data URI, or URL
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData, // Browser handles headers automatically for FormData
      },
    );

    const data = await response.json();
    console.log("Uploaded Secure URL:", data.secure_url);
    return data;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

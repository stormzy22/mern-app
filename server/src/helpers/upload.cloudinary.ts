import cloudinary from "cloudinary";

export const uploadImgToCloud = async (
  selectedFile: string
): Promise<string> => {
  const { public_id } = await cloudinary.v2.uploader.upload(selectedFile, {
    upload_preset: "memories_preset",
  });
  return public_id;
};

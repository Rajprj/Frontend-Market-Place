import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: 'rajaprj', 
    api_key: '923634922546493', 
    api_secret: 'c7tg95I-SfhI0AiDx-8U31NkstU' // Click 'View API Keys' above to copy your API secret
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    console.log("file successful uploaded on cloudinary :", response);
    return response;
  } 
  catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export { uploadOnCloudinary }
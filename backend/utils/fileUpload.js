import { v2 as cloudinary } from 'cloudinary';
 import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config({
    path : "../.env"
})
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
        api_key: process.env.CLOUDINARY_CLOUD_API_KEY , 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY   
    });

 
// console.log("Inside fileUpload.js Cloudinary ENV:", {
//   name: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_CLOUD_API_KEY,
//   secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY
// });



    const fileUpload = async (filePath)=>{
        try {
            console.log('File path',filePath);
            if(!filePath) return null;

            // upload file on cloudniary
          const response = await  cloudinary.uploader.upload(filePath,{
                resource_type : "auto"
            })

            console.log("File is uploaded on cloudinary",response.url);
            return response

        } catch (error) {
            fs.unlinkSync(filePath)
            console.log("File upload on clodniary failed");
              // remove the locally saved temporary file if upload operationnis failed
        }
    }

    export default fileUpload;
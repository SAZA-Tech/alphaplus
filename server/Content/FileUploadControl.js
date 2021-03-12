// Handle File uploads to AWS S3



module.exports.FileUploadControl ={
    uploads:()=>[],
    singleUpload : async (parent,{file})=>{
        const { stream, filename, mimetype, encoding } = await file;

        
        return { filename, mimetype, encoding, url: '' }

    }
}

function SaveImage(files, path){

    const { image }  = files;

    if (!image) return "no image found";
    
    // If does not have image mime type prevent from uploading
    if (!/^image/.test(image.mimetype)) return "wrong file type"
    
    image.mv(path + '/images/' + image.name);
    return "image saved";
}

module.exports = SaveImage;
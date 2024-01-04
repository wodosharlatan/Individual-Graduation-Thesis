const path = require("path");

function SaveImage(files, rootPath) {
    try {
        const { image } = files;

        if (!image) return { status: "No image found" };

        if (!/^image/.test(image.mimetype)) return { status: "Wrong file type" };

        
        const destinationPath = path.join(rootPath, "images", image.name);

        image.mv(destinationPath, (err) => {
            if (err) {
                return { status: "Error saving the image" };
            }
        });

        return { status: "Image saved", path: destinationPath };
    } catch (error) {
        return { status: error.toString() };
    }
}

module.exports = SaveImage;

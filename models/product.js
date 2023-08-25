const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  volume: Number,
  material: String,
  price: Number,
})

module.exports = mongoose.model('Product', productSchema)
/*
String newFileName = "my-image";
File imageFile = new File("/users/victor/images/image.png");
GridFS gfsPhoto = new GridFS(db, "photo");
GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
gfsFile.setFilename(newFileName);
gfsFile.save();
*/

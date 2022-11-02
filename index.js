const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require("multer");

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './fileUploads')
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}-${Date.now()}`)
  }
})
 
const upload = multer({ storage: fileStorageEngine })

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  let file = req.file;
  res.json({
    name: file.originalname, 
    type: file.mimetype, 
    size: file.size
  })
})


const port = process.env.PORT;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port)
});

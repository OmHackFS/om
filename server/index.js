import 'dotenv/config';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import express from 'express';
import cors from "cors"; 
import { Web3Storage, File, getFilesFromPath } from 'web3.storage';
import uploadFile from './upload.js';

const DATABASE_FILE_PATH = './database.json';
const PORT = process.env.PORT || 3030; // default port to listen

// Initialize server
const corsOptions = {
    origin: process.env.HTTP_ORIGIN || "http://localhost:3000"
};
const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // app.use(express.json());

// app.get('/', (req, res) => {
//   const randomId = `${Math.random()}`.slice(2);
//   const path = `item/${randomId}`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
// });

// Get all items in the database
app.get('/items', (req, res) => {
    const database = JSON.parse(fs.readFileSync(DATABASE_FILE_PATH));
    res.json(database);
  });

// Not yet implemented
app.get('/item/:itemId', (req, res) => {
  const { itemId } = req.params;
  res.json({ itemId });
});

// Add an item: Push the file to web.storage, 
//   grab the cid, and then add the item and metadata to our internal database
app.post("/item", async function (req, res) {
    
    // Handle file upload using multer library
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        // res.status(200).send({
        //     message: "Uploaded the file successfully: " + req.file.originalname,
        // });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 10MB!",
            });
        }
        return res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
    
    // Move file to permanent storage on web3.storage
    // First, construct storage helper with token and endpoint
    const client = new Web3Storage({ token: process.env.STORAGE_API_TOKEN });
    console.log("Uploading file to permanent storage:", req.file); 
    // Grab file (this could grab multiple files, but the argument passed currently is only one)
    const files = await getFilesFromPath(req.file.path);
    console.log("files:", files);
    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(files); // Promise<CIDString>
    // Get info on the Filecoin deals that the CID is stored in
    // const info = await client.status(rootCid); // Promise<Status | undefined> 
    // console.log("info:", info);
    // Fetch and verify files from web3.storage
    // const storageResponse = await client.get(rootCid) // Promise<Web3Response | null>
    // const storageFiles = await storageResponse.files() // Promise<Web3File[]>
    // for (const file of storageFiles) {
    //     console.log(`${file.cid} ${file.name} ${file.size}`)
    // }   

    // Delete uploaded file that's now in perm storage
    try {
        fs.unlinkSync(req.file.path)
    } catch(err) {
        console.log(err);
    }
    
    // Construct metadata for new item
    const { file, title, author, description, imageUri } = req.body;
    // Generate ID
    const newId = uuid();
    // Create object 
    const newItem = {
        id: newId,
        file: req.file.originalname,
        cid: rootCid,
        title: title,
        author: author,
        description: description, 
        imageUri: imageUri,
        fileUri: "https://" + rootCid + ".ipfs.dweb.link/" + req.file.originalname
    }
    // Append object
    const database = JSON.parse(fs.readFileSync(DATABASE_FILE_PATH));
    database.push(newItem);
    // Save metadata to file
    fs.writeFileSync(DATABASE_FILE_PATH, JSON.stringify(database));
    
    res.send(`Item saved with id: ${newId}`); 
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
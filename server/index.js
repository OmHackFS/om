import 'dotenv/config';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import express from 'express';
import cors from "cors"; 
import { Web3Storage, File, getFilesFromPath } from 'web3.storage';
import uploadFile from './upload.js';
import { createClient } from '@urql/core';
import pkg from '@apollo/client';
const { ApolloClient, InMemoryCache, HttpLink, gql } = pkg;
import fetch from 'cross-fetch';

const GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/richwarner/om-mumbai';
const DB_DD_MED_DOCTORS = './db/dd_med_doctors.json';
const DB_DD_MED_SESSIONS = './db/dd_med_sessions.json';
const DB_DD_SCR_SCREENPLAYS = './db/dd_scr_screenplays.json';
// const DB_PROPOSALS = './db/proposals.json';

const PORT = process.env.PORT || 3030; // default port to listen

// Initialize server
const corsOptions = {
    origin: process.env.HTTP_ORIGIN || "http://localhost:3000"
};
const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // app.use(express.json());

// Get all proposals
app.get('/proposals', async (req, res) => {
    const eventQuery = `{ 
        proposalCreatedEvents { 
            id 
            count 
            groupId 
            proposalId 
            proposalName 
            startDate 
            endDate 
            fileUri 
        }}`;
    let data = "";
    const client = new ApolloClient({
        link: new HttpLink({uri: GRAPH_API_URL, fetch}),
        cache: new InMemoryCache(),
    })
    try {
      const result = await client.query({ query: gql(eventQuery) });
      data = result.data.proposalCreatedEvents;
    } catch (err) {
      console.log(err);
    } 
    res.json(data);
}); 

// Get all votes
app.get('/votes', async (req, res) => {
    const eventQuery = `{
        voteCastEvents {
            id
            count
            groupId
            proposalId
            signal
      }}`;
      let data = "";
      const client = new ApolloClient({
          link: new HttpLink({uri: GRAPH_API_URL, fetch}),
          cache: new InMemoryCache(),
      })
      try {
        const result = await client.query({ query: gql(eventQuery) });
        data = result.data.voteCastEvents;
      } catch (err) {
        console.log(err);
      } 
      res.json(data)
});

// Get all doctors in medical category
app.get('/med/doctors', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DB_DD_MED_DOCTORS));
    res.json(data);
});

// Get all sessions in medical category, with doctor data joined
app.get('/med/sessions', (req, res) => {
    const sessions = JSON.parse(fs.readFileSync(DB_DD_MED_SESSIONS));
    res.json(sessions);
    const doctors = JSON.parse(fs.readFileSync(DB_DD_MED_DOCTORS));
    // Map doctor data to medical session
    const data = sessions.map( session => {
        console.log(doctors.find(doctor => {doctor.id === session.doctor_id;}));
        const matched = doctors.find(doctor => {console.log(doctor.id); console.log(session.doctor_id); console.log(doctor.id === session.doctor_id); doctor.id === session.doctor_id;});
        console.log(matched);
        if(matched) return {...session, ...matched};
        else return null;
    });
    res.json(data);
});

// Get all screenplays in screenplay category
app.get('/scr/screenplays', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DB_DD_SCR_SCREENPLAYS));
    res.json(data);
});

// Get proposal by id

app.get('/proposal/:id', async (req, res) => {
    const { id } = req.params;
    const eventQuery = `{ 
        proposalCreatedEvents { 
            id 
            count 
            groupId 
            proposalId 
            proposalName 
            startDate 
            endDate 
            fileUri 
        }}`;

    let data = "";
    const client = new ApolloClient({
        link: new HttpLink({uri: GRAPH_API_URL, fetch}),
        cache: new InMemoryCache(),
    })
    try {
      const result = await client.query({ query: gql(eventQuery) });
      data = result.data.proposalCreatedEvents;
    } catch (err) {
      console.log(err);
    } 
    res.json(getObjectById(data, id));
}); 

   
// app.get('/proposal/:id', (req, res) => {
//     const { id } = req.params;
//     const data = JSON.parse(fs.readFileSync(DB_PROPOSALS));
//     res.json(getObjectById(data, id));
//   });

// Not yet implemented
app.get('/item/:itemId', (req, res) => {
  const { itemId } = req.params;
  res.json({ itemId });
});

// Add a screenplay: Push the file to web.storage, 
//   grab the cid, and then add the item and metadata to our internal database
app.post("/screenplay", async function (req, res) {
    
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

// Helper functions
function getObjectById(objects, id) {
    return objects.find(item => item.id === id);
}

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
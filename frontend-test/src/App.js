import './App.css';
import axios from "axios";
import { useState } from 'react';

const client = axios.create({
  baseURL: "http://localhost:3030/"// "https://data-dao-api.vercel.app/" 
});

const App = () => {

  // App state variables
  const [proposals, setProposals] = useState([]);
  const [items, setItems] = useState([]);
  const [showItemHeader, setShowItemHeader] = useState(false);
  // Form inputs
  const [fileForUpload, setFileForUpload] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");

  async function getProposals() {
    const response = await client.get('proposals');
    setProposals(response.data);
  }
  
  async function getItems() {
    const response = await client.get('scr/screenplays');
    setItems(response.data);
    setShowItemHeader(true);
  } 

  async function handleSubmit(e) {
    // Don't post to a new page
    e.preventDefault();
    // Construct request and post
    console.log("submitted file for upload: ", fileForUpload); 
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("imageUri", imageUri);
    data.append("description", description);
    data.append('file', fileForUpload);    
    const response = await client.post('item', data);
    console.log(response);
    // Clear form fields
    setItems([]);
    setFileForUpload("");
    setTitle("");
    setAuthor("");
    setDescription("");
    setImageUri("");
    setShowItemHeader(false);
  }

  function hex2a(hexx) {     
    let hex = hexx.toString();
    let str = '';     
    for (var i = 0; i < hex.length; i += 2)         
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));     
    return str.replace(); 
  }

  return (
    <div className="app">
    <h1>Data DAO (oh wow) 🤩</h1>
    <h2 className="mt-4 mb-4">Lit</h2>
    <button className="btn btn-primary mt-4 mb-4" onClick={getResource}>Get Resource</button>
    <h2 className="mt-4 mb-4">Proposals</h2>
    <button className="btn btn-primary mt-4 mb-4" onClick={getProposals}>Get Proposals</button>
    <div className="card-group">
    {proposals.map((item) => {
       return (                  
            <div className="card mb-4" key={item.id} style={{maxWidth:'20rem'}}>
              <div className="card-body">
                <h5 className="card-title">{hex2a(item.proposalName)}</h5>
                <p className="card-text">{item.startDate}</p>
                <p className="card-text">{item.endDate}</p>      
                <p className="card-text">{hex2a(item.fileUri)}</p>             
              </div>              
            </div>   
       );
    })}
    </div>
    <h2 className="mb-4 mt-4">Upload file</h2>    
    <form onSubmit={handleSubmit} style={{'width':'30rem'}}>
      <div className="mb-3">
        <input id="fileForUpload" type="file" className="form-control form-control-lg" onChange={(e) => {console.log(e.target.files[0]); setFileForUpload(e.target.files[0]);}} />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input id="title" className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Author</label>
        <input id="author" className="form-control" type="text" value={author} onChange={(e) => setAuthor(e.target.value)}></input>
      </div>
      <div className="mb-3">
        <label htmlFor="imageUri" className="form-label">Image URL</label>
        <input id="imageUri" className="form-control" type="text" value={imageUri} onChange={(e) => setImageUri(e.target.value)}></input>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" className="form-control" rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <input type="submit" className="btn btn-primary" />
    </form>
    
    <hr className="mt-4 mb-0" />
    <button className="btn btn-primary mt-4" onClick={getItems}>Get Screenplays</button>
    {showItemHeader && <h2 className="mt-4 mb-4">Screenplays 🎥</h2>}
    <div className="card-group">
    {items.map((item) => {
       return (                  
            <div className="card mb-4" key={item.id} style={{maxWidth:'20rem'}}>
              <img src={item.imageUri} className="card-img-top" style={{height:'20rem'}} alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <h6 className="card-text">{item.author}</h6>
                <p className="card-text">{item.description}</p>                
              </div>
              <div className="card-footer">
                <a href={item.fileUri} className="card-link" target="_blank" rel="noreferrer">Download File</a>
                {/* <a href="#" className="card-link">Delete</a> */}
              </div>
            </div>   
       );
    })}
    </div>
  </div>
  );
}

export default App;

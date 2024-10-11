import React, { useState } from "react";
import axios from "axios";
function EtiquetasExtractor() {

  const [contentTheory, setContentTheory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contentCmd, setContentCmd] = useState('');
  const [inputValue, setInputValue] = useState('');

const handleSubmit = async (e) => {
e.preventDefault()
     setTimeout(() => {
      fetchData()
     }, 2000);
    try {
      
      await axios.post('http://localhost:3001/data', {
      data: inputValue
      });

    } catch (error) {
      console.error('Error enviando los datos:', error);
    }
 
  };
    
 
  const fetchData = async () => {
  
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/api/data'); 
      setContentTheory( response.data.contentTheory); 
      setContentCmd(response.data.contentCmd);       
      setLoading(false);  
    } catch (error) {
      setError(error.message); 
      setLoading(false);       
    }
  }

 
  if (error) {
    return <div>Error: {error}</div>;
  }
  if(loading){
    return <div>loading ...</div>
  }

  const handleSendCmd = async (e) => {
   e.preventDefault(); 
   const cmd = contentCmd.trim();

 
    try {
   
      await axios.post('http://localhost:3001/cmd', {
      data: cmd,
      }
      
    );
      
    } catch (error) {
      console.error('Error enviando los datos:', error);
    }

 
  };


  return (
    <div className="main">
     <div className="textContainer">
    
     
     <form onSubmit={handleSubmit}>
     
      <textarea
       id="inputField"
       value={inputValue}
       onChange={(e) => setInputValue(e.target.value)}
       rows="4"  
       cols="50" 
       />

      <button type="submit"  >get resume</button>
    </form>
   
    
     </div>

     <div className="cmdContainer" >
     <code type="text" name="cmd" 
  dangerouslySetInnerHTML={{ __html: contentCmd }}>
</code>

     <button onClick={handleSendCmd}>Send the commands to the server</button>
     
     </div>

     <div className="theoryContainer">
      <p>
      {JSON.stringify(contentTheory, null, 2)}
      </p>
     </div>
    </div>
  );
}

export default EtiquetasExtractor;



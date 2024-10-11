const express = require('express');
const OpenAI= require('openai');
const cors = require('cors');  
const openai = new OpenAI({
    apiKey: "",
  });


const app = express();

app.use(cors());
app.use(express.json());

let theoryText =  "resume and explain the text :  "
let cmdText = "please extract only the cmd of the text, only the cmd !!!:  "
let textTest = ``
let cmdSelected =``

async function tryApi() {
  let contentTheory = "";
  let contentCmd = "";

  const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Usa un modelo válido
      messages: [{ role: "user", content: theoryText + textTest }],
      stream: true,
  });

  for await (const chunk of stream) {
      const result = chunk.choices[0]?.delta?.content || "";
      contentTheory += result; 
  }

  const stream2 = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [{ role: "user", content: cmdText + textTest }],
      stream: true,
  });

  for await (const chunk of stream2) {
      const result = chunk.choices[0]?.delta?.content || "";
      contentCmd += result; 
  
  }

  return { contentTheory, contentCmd };
}


app.get('/', (req, res) => {
  res.send(cmdSelected)
});



app.post('/data', (req, res) => {
  console.log('Body completo recibido:', req.body);  

  if (req.body && req.body.data) {
    const { data } = req.body;

    textTest += data;
    console.log(textTest)
  } else {
    res.status(400).json({ error: 'No se recibieron datos o están mal formateados' });
  }
});


app.post('/cmd', (req, res) => {
  console.log('Body completo recibido:', req.body);  

  if (req.body && req.body.data) {
    const { data } = req.body;

    cmdSelected = data;
    console.log(cmdSelected)
  } else {
    res.status(400).json({ error: 'No se recibieron datos o están mal formateados' });
  }
});

app.get('/api/data', async (req, res) => {

  if (textTest !== '') {
    try {
      const { contentTheory, contentCmd } = await tryApi();  
      res.json({ contentTheory, contentCmd });
      console.log(contentCmd)
    } catch (error) {
      console.error("Error al llamar a OpenAI:", error);
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  } else {
    res.status(400).json({ error: 'textTest está vacío después de procesar los datos' });
  }
  

})

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});

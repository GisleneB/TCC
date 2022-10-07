const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use('/img', express.static('img'));
app.use(cors());
app.use(express.json());

const candidates = [
    {
      "id": "28cb62ca-15fb-4f81-b624-ab16c5ece3f4",
      "candidateId": 1000,
      "candidateName": "Gesonel",
      "partyId": 24,
      "partyName": "Partido FEDERAL",
      "imageUrl": "http://localhost:8888/img/gesonel.png",
      "votes": 0
    },
    
    {
      "id": "c088f74c-66a7-4220-9928-d3bdd2ff4467",
      "candidateId": 1010,
      "candidateName": "Irmão do Jorel",
      "partyId": 11,
      "partyName": "Partido NOVO",
      "imageUrl": "http://localhost:8888/img/irmao_do_jorel.png",
      "votes": 0
    },

    {
      "id": "057c8079-8973-41b5-ae7b-f736db79ef8b",
      "candidateId": 1234,
      "candidateName": "Lara",
      "partyId": 36,
      "partyName": "Partido LIBERAL",
      "imageUrl": "http://localhost:8888/img/lara.png",
      "votes": 0
    },

    {
      "id": "3f80cc65-5d22-4a45-b362-b0afde47a1bf",
      "candidateId": 2233,
      "candidateName": "Steve Magal",
      "partyId": 41,
      "partyName": "Partido POLÍTICO",
      "imageUrl": "http://localhost:8888/img/steve_magal.png",
      "votes": 0 
    }
];

app.post('/candidates', (request, response) => {
  const { candidateId, candidateName, partyId, 
          partyName, imageUrl, votes } = request.body;

  const checksExistCandidate = candidates.some(
    (candidates) => candidates.candidateId === candidateId
  );

  if (checksExistCandidate) {
    return response.status(400).json({ errMsg: 'Este candidato já existe' });
  }

  const candidate = {
    id: uuidv4(),
    candidateId: candidateId,
    candidateName: candidateName,
    partyId: partyId,
    partyName: partyName,
    imageUrl: imageUrl,
    votes: votes
  };


  candidates.push(candidate);

  return response.status(201).send();
});

app.get('/candidates/:id', (request, response) => {
  const { username } = request.headers;
  const { id } = request.params;

  const candidate = candidates.find(
    (candidate) => candidate.candidateId == id
  );

  console.log("Data e hora: " + new Date().toLocaleString() + ". " + username + " acessou o sistema de contagem de votos.");

  if (!candidate) {
    return response.status(400).json({ errMsg: 'Candidato não existe!' });
  }
  
  return response.status(200).json(candidate)
   
});

app.post("/votes/:candidateId", (request, response) => {
  const { username } = request.headers;
  const { candidateId } = request.params;

  const candidate = candidates.find(
    (candidate) => candidate.candidateId == candidateId
  );

  if (!candidate) {
    return response.status(400).json({ errMsg: 'Candidato não existe!' });
  };

  candidate.votes++;

  let res = username + " seu voto foi confirmado no candidato " + candidate.candidateName + " do " + candidate.partyName;

  console.log("Data e hora: " + new Date().toLocaleString() + ". " + username + " acessou o sistema de contagem de votos.");

  return response.json({ msg: res });
  
});


module.exports = app;
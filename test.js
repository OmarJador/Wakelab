import axios from "axios";
const url = "http://127.0.0.1:3000/api/activites"
let obj = {
    titre: 'Deux vérités et un mensonge',
    theme: 'jeu',
    objectifs: "Relancer l'attention et favoriser les échanges",
    duree: 20,
    description: 'Chaque participant propose trois affirmations et le groupe doit retrouver celle qui est fausse.',
    auteur: 'Youssef Alaoui'
  }

async function retrieveData() {
  const rsp = await axios.get(url);
  const activities = rsp.data;
  console.log(activities)
  await axios.post(url,obj)
}

retrieveData()

'use strict'
const cors = require('cors')({origin: true})
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const {
  dialogflow,
  Permission,
  Suggestions,
  BasicCard,
  Carousel,
  Image,
} = require('actions-on-google')

const app = dialogflow({debug: true})

const ANIMALSMAP = [
  {
    title: 'de aap',
    text: '',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/project-oba.appspot.com/o/aap.png?alt=media&token=6cc2167d-1d55-468e-a302-6bdb9a9b92e9',
      accessibilityText: 'Afbeelding van een aap',
    },
    display: 'white',
  },
  {
    title: 'De giraf',
    text: '',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/project-oba.appspot.com/o/giraffe.png?alt=media&token=c169324c-2e78-4a32-9969-cc02738ee506',
      accessibilityText: 'Afbeelding van een giraf',
    },
    display: 'WHITE',
  },
  {
    title: 'De olifant',
    text: '',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/project-oba.appspot.com/o/olifant.png?alt=media&token=4da01d8d-2871-4a8c-9de1-73ac814775d9',
      accessibilityText: 'Afbeelding van een olifant',
    },
    display: 'WHITE',
  },
  {
    title: 'De leeuw',
    text: '',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/project-oba.appspot.com/o/leeuw.png?alt=media&token=4597d2d8-325d-4eb6-bea8-5e2251da5d54',
      accessibilityText: 'Afbeelding van een giraf',
    },
    display: 'WHITE',
  }
]

const QUESTIONSARRAY = []
let username = ''


function getRandomArrayIndex(array) {
  return Math.floor(Math.random() * Math.floor((array.length - 1)))
}

app.intent('Default Welcome Intent', (conv) => {
  //conv.user.storage.questions = []
  conv.ask('Hi ik ben Didi de papegaai, hoe heet jij?')
})

app.intent('Welcome person', (conv, {person}) => {
  //conv.user.storage.userName = person.name
  username = person.name
  conv.ask(`${username}, wat leuk dat je er bent! Zullen we het hebben over dieren of school?`)
  conv.ask(new Suggestions('Dieren', 'School'))
})

app.intent('Category choise', (conv, {category}) => {

  if(category.toLowerCase() === 'dieren') {
      // GET RANDOM ANIMAL FROM ARRAY AND SAVE IT INTO USER STORAGE CONVERSTATION OBJECT
      let animal = ANIMALSMAP[getRandomArrayIndex(ANIMALSMAP)]
      //conv.user.storage.questions.push(animal)
      QUESTIONSARRAY.push(animal)

    conv.ask(`We gaan over ${category} praten. Ik noem eerst het dier op en dan zeg jij het na ${username}`)
      conv.ask(animal.title)
      conv.ask(new BasicCard(animal))

  } else if(category.toLowerCase() === 'school') {

      conv.ask(`TODO ${category} uitwerken`)

  } else {

      conv.ask(`${username} we kunnen het helaas nog niet over ${category} hebben. We kunnen wel praten over dieren en school`)
      conv.ask(new Suggestions('Dieren'))

  }

})

app.intent('Animal check', (conv, {animal}) => {

  if(QUESTIONSARRAY[(QUESTIONSARRAY.length-1)].title.toLowerCase() === animal[0].toLowerCase()) {
    QUESTIONSARRAY[(QUESTIONSARRAY-1)]
    conv.ask(`Goed gedaan ${username} dat is helemaal goed! Zullen we nog een dier bekijken?`)
    conv.ask(new Suggestions('Ja', 'Nee'))
  } else {
    conv.ask('Dit was niet het juiste antwoord probeer het nogmaals')
  }

})

app.intent('Animal check - yes', (conv) => {
  let storageTitles = []
  QUESTIONSARRAY.forEach((entry) => {
    storageTitles.push(entry.title)
  })

  let filteredAnimals = ANIMALSMAP.filter((entry) => {
    return !storageTitles.includes(entry.title)
  })
  
  if(filteredAnimals.length) {
    let animal = filteredAnimals[getRandomArrayIndex(filteredAnimals)]
    QUESTIONSARRAY.push(animal)
    conv.ask(animal.title)
    conv.ask(new BasicCard(animal))
  } else {
    conv.ask(`Goed gedaan ${username} je hebt alles goed beantwoord!`)
  }
})

app.intent('Animal check - no', (conv) => {
  conv.close(`Okay ${username}, tot de volgende keer!`)
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)

// OPLOSSING VOOR WAFS STAAT HIERIN
//exports.helloWorld = functions.https.onRequest((req,res) => {
  //cors(req, res, () => {
    //res.header('Access-Control-Allow-Origin', '*')
    //res.header('Access-Control-Allow-Headers', '*')
    //res.status(200).json({
      //message: 'It worked!',
      //data: [
        //{name: 'foo'},
        //{name: 'bar'}
      //]
    //})
  //})
//})

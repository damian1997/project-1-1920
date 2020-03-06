# Project 1 - OBA - CMD Minor 1920
Repository for the first project of the Minor 1920

* [Description](description)

## Description
For this project i decided to build a implementation of the voiceassistant of google, the idea is that children will broaden their vocabulary in a fun way with interacting with Didi the Parrot. Didi will speak about animals with the children and will show a animal via a picture and will pronounce the name of the animal, the child is then asked to repeat Didi and will get feedback if he or she said it right or wrong.

## Installing
To install this project you need a dialogflow project and a firebase project to host the functionality scripts on.

Clone repository
```
git clone https://github.com/damian1997/project-1-1920.git
```

Installing firebase
```
npm install -g firebase-tools
```

CD into the functions folder via terminal and type
```
npm install
```

After installing everything localy you need to create a agent on dialogflow and import the exported dialogflow that is located on your git repository under the directory dialogflow -> didi-voiceassistant.zip

Next step is to login to firebase, in your terminal type the following and fill in your credintials.
```
cd functions
firebase login
```

If you want to edit the functionality of the voice assistant edit the index.js fileinside the functions directory. To deploy the changes to your firebase type the following.

```
firebase deploy
```

## Packages
* [Firebase](https://firebase.google.com/)

## Sources
* [Google developers assistans](https://developers.google.com/assistant/conversational)
* [Dialogflow](https://dialogflow.com/)


## License
[MIT](https://github.com/damian1997/project-1-1920/blob/master/LICENSE)

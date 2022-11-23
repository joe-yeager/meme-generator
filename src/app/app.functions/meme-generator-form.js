// For external API calls
const axios = require('axios');


const supportedMemes = [
  {
      "id": "181913649",
      "name": "Drake Hotline Bling",
      "url": "https://i.imgflip.com/30b1gx.jpg",
      "box_count": 2
  },
  {
      "id": "87743020",
      "name": "Two Buttons",
      "url": "https://i.imgflip.com/1g8my4.jpg",
      "box_count": 3
  },
  {
      "id": "112126428",
      "name": "Distracted Boyfriend",
      "url": "https://i.imgflip.com/1ur9b0.jpg",
      "box_count": 3
  },
  {
      "id": "129242436",
      "name": "Change My Mind",
      "url": "https://i.imgflip.com/24y43o.jpg",
      "box_count": 2
  },
  {
      "id": "217743513",
      "name": "UNO Draw 25 Cards",
      "url": "https://i.imgflip.com/3lmzyx.jpg",
      "box_count": 2
  },
  {
      "id": "124822590",
      "name": "Left Exit 12 Off Ramp",
      "url": "https://i.imgflip.com/22bdq6.jpg",
      "box_count": 3
  },
  {
      "id": "222403160",
      "name": "Bernie I Am Once Again Asking For Your Support",
      "url": "https://i.imgflip.com/3oevdk.jpg",
      "box_count": 2
  },
  {
      "id": "131940431",
      "name": "Gru's Plan",
      "url": "https://i.imgflip.com/26jxvz.jpg",
      "box_count": 4
  },
  {
      "id": "4087833",
      "name": "Waiting Skeleton",
      "url": "https://i.imgflip.com/2fm6x.jpg",
      "box_count": 2
  },
  {
      "id": "135256802",
      "name": "Epic Handshake",
      "url": "https://i.imgflip.com/28j0te.jpg",
      "box_count": 3
  },
  {
      "id": "93895088",
      "name": "Expanding Brain",
      "url": "https://i.imgflip.com/1jwhww.jpg",
      "box_count": 4
  },
  {
      "id": "61579",
      "name": "One Does Not Simply",
      "url": "https://i.imgflip.com/1bij.jpg",
      "box_count": 2
  },
  {
      "id": "102156234",
      "name": "Mocking Spongebob",
      "url": "https://i.imgflip.com/1otk96.jpg",
      "box_count": 2
  },
  {
      "id": "110163934",
      "name": "I Bet He's Thinking About Other Women",
      "url": "https://i.imgflip.com/1tl71a.jpg",
      "box_count": 2
  },
  {
      "id": "91538330",
      "name": "X, X Everywhere",
      "url": "https://i.imgflip.com/1ihzfe.jpg",
      "box_count": 2
  },
  {
      "id": "148909805",
      "name": "Monkey Puppet",
      "url": "https://i.imgflip.com/2gnnjh.jpg",
      "box_count": 2
  },
  {
      "id": "161865971",
      "name": "Marked Safe From",
      "url": "https://i.imgflip.com/2odckz.jpg",
      "box_count": 2
  },
  {
      "id": "180190441",
      "name": "They're The Same Picture",
      "url": "https://i.imgflip.com/2za3u1.jpg",
      "box_count": 3
  },
  {
      "id": "132769734",
      "name": "Hard To Swallow Pills",
      "url": "https://i.imgflip.com/271ps6.jpg",
      "box_count": 2
  },
  {
      "id": "91545132",
      "name": "Trump Bill Signing",
      "url": "https://i.imgflip.com/1ii4oc.jpg",
      "box_count": 2
  },
  {
      "id": "563423",
      "name": "That Would Be Great",
      "url": "https://i.imgflip.com/c2qn.jpg",
      "box_count": 2
  },
  {
      "id": "24557067",
      "name": "Afraid To Ask Andy",
      "url": "https://i.imgflip.com/emccr.jpg",
      "box_count": 2
  },
  {
      "id": "460541",
      "name": "Jack Sparrow Being Chased",
      "url": "https://i.imgflip.com/9vct.jpg",
      "box_count": 2
  },
  {
      "id": "142921050",
      "name": "Car Salesman Slaps Roof Of Car",
      "url": "https://i.imgflip.com/2d3al6.jpg",
      "box_count": 2
  },
  {
      "id": "1464444",
      "name": "Happy Star Congratulations",
      "url": "https://i.imgflip.com/vdz0.jpg",
      "box_count": 4
  },
  {
      "id": "61527",
      "name": "Y U No",
      "url": "https://i.imgflip.com/1bh3.jpg",
      "box_count": 2
  },
  {
      "id": "371382",
      "name": "Simba Shadowy Place",
      "url": "https://i.imgflip.com/7yk6.jpg",
      "box_count": 2
  }
];

const smallDivider = Object.freeze({
  "type": "divider",
  "distance": "small"
});

function generateTextInput(boxNumber) {
  return {
    "type": "input",
    "name": `box-number-${boxNumber}`,
    "inputType": "text",
    "label": `Box Number ${boxNumber}`,
    "initialValue": ""
  }
};

const submitButton = Object.freeze({
  "type": "button",
  "variant": "primary",
  "text": "Generate meme",
  "onClick": {
    "type": "SUBMIT",
    "serverlessFunction": "generate-meme"
  }
});

function sendErrorResponse(sendResponse, message) {
  sendResponse({
    message: {
      type: 'ERROR',
      body: `Error: ${message}`
    },
    sections: [{
      type: "text",
      format: "markdown",
      text: "Uh oh, something bad happened",
    }]
  });
}

exports.main = async (context = {}, sendResponse) => {
  const image = {
    "type": "image",
    "src": "https://i.imgflip.com/1g8my4.jpg",
    "alt": ""
  };

  const templateIdInput = {
    "type": "input",
    "name": "template_id",
    "inputType": "hidden",
    "label": "Template Id",
    "initialValue": "Meme template id",
    "required": true,
    "requiredValidationMessage": "Required",
  };

  const boxesInput = {
    "type": "input",
    "name": "boxes_length",
    "inputType": "hidden",
    "label": "Boxes length",
    "initialValue": "2",
    "required": true,
    "requiredValidationMessage": "Required",
  };

  try {

    // const { data : { data : {memes}} } = await axios.get("https://api.imgflip.com/get_memes");
    // if(!memes || !memes.length) {
    //   sendErrorResponse(sendResponse, 'unable to load memes')
    // }
    const index = Math.floor(Math.random() * supportedMemes.length);
    const theChosenOne = supportedMemes[index];
    image.src = theChosenOne.url;
    templateIdInput.initialValue = theChosenOne.id;
    boxesInput.initialValue = `${theChosenOne.box_count}`;
    const boxInputs = [];
    for(let i = 0; i < theChosenOne.box_count; ++i) {
      boxInputs.push(generateTextInput(i + 1));
    }

    sendResponse({ sections: [
      {
        type: "text",
        format: "markdown",
        text: `**${theChosenOne.name}**`
      },
      image,
      smallDivider,
      {
        "type": "form",
        "content": [
          templateIdInput,
          boxesInput,
          ...boxInputs,
          submitButton
        ]
      }
    ]});
  } catch (error) {
    console.error(error);
    sendErrorResponse(sendResponse, error.message)
  }
};

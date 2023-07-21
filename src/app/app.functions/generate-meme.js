// For external API calls
const axios = require('axios');

const getAllMemesUrls = {
  qa: 'https://api.hubspotqa.com/crm/v3/objects/2-20675073',
  prod: 'https://api.hubspot.com/crm/v3/objects/2-16897592',
};

exports.main = async (context = {}, sendResponse) => {
  const { formState } = context.event.payload;
  const numBoxes = Number.parseInt(formState.boxes_length);
  const boxes = {};

  console.log(formState);
  for (let i = 0; i < numBoxes; ++i) {
    boxes[`boxes[${i}][text]`] = formState.boxes[i];
  }

  try {
    const { data } = await axios.post(
      'https://api.imgflip.com/caption_image',
      null,
      {
        params: {
          username: process.env.IMG_FLIP_USERNAME,
          password: process.env.IMG_FLIP_PASSWORD,
          template_id: formState.template_id,
          ...boxes,
        },
      }
    );
    if (data.success) {
      const url =
        context.HS_ENVIRONMENT === 'prod'
          ? getAllMemesUrls.prod
          : getAllMemesUrls.qa;
      axios
        .post(
          url,
          {
            properties: {
              name: formState.name,
              url: data.data.url,
              dankness: formState.dankness || 1,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${context.secrets.PRIVATE_APP_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(
          (response) => {
            console.log(response.data);
          },
          (err) => {
            console.log(err.message);
          }
        );
      sendResponse({
        status: 200,
        message: {
          type: 'SUCCESS',
          body: `${data.data.url}`,
        },
      });
    } else {
      sendResponse({
        status: 500,
        message: {
          type: 'ERROR',
          body: data.data,
        },
      });
    }
  } catch (err) {
    console.error(err);
    sendResponse({
      status: 500,
      message: {
        type: 'ERROR',
        body: "Uh oh, can't generate memes right now",
        err,
      },
    });
  }
};

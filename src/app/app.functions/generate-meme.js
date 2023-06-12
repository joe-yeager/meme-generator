// For external API calls
const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  const { formState } = context.event.payload;
  const numBoxes = Number.parseInt(formState.boxes_length);
  const boxes = {};

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

// For external API calls
const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  const { formState } = context.event.payload;
  const numBoxes = Number.parseInt(formState.boxes_length);
  const boxes = {};
  const {
    MEME_OBJECT_URL,
    PRIVATE_APP_ACCESS_TOKEN,
    IMG_FLIP_PASSWORD,
    IMG_FLIP_USERNAME,
  } = process.env;

  for (let i = 0; i < numBoxes; ++i) {
    boxes[`boxes[${i}][text]`] = formState.boxes[i];
  }

  try {
    const { data } = await axios.post(
      'https://api.imgflip.com/caption_image',
      null,
      {
        params: {
          username: IMG_FLIP_USERNAME,
          password: IMG_FLIP_PASSWORD,
          template_id: formState.template_id,
          ...boxes,
        },
      }
    );
    if (data.success) {
      await axios.post(
        MEME_OBJECT_URL,
        {
          properties: {
            name: formState.name,
            url: data.data.url,
            dankness: formState.dankness || 1,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${PRIVATE_APP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      sendResponse({
        status: 200,
        message: { type: 'SUCCESS', body: `${data.data.url}` },
      });
    }
    sendResponse({
      status: 500,
      message: {
        type: 'ERROR',
        body: data.data,
      },
    });
  } catch (err) {
    console.error(err);
    sendResponse({
      status: 500,
      message: {
        type: 'ERROR',
        body: err.response.data,
      },
    });
  }
};

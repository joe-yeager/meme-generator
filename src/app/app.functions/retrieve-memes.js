// For external API calls
const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  const { MEME_OBJECT_URL, PRIVATE_APP_ACCESS_TOKEN } = process.env;
  console.log(MEME_OBJECT_URL);
  console.log(process.env.MEME_OBJECT_URL);
  try {
    const url = `${MEME_OBJECT_URL}?archived=false&properties=name,dankness,url`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    sendResponse({
      status: 200,
      message: {
        body: result.data.results,
      },
    });
  } catch (e) {
    sendResponse({
      status: 500,
      message: {
        body: e,
      },
    });
  }
};

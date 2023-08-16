// For external API calls
const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  try {
    const url = `${process.env.MEME_OBJECT_URL}?archived=false&properties=name,dankness,url`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS_TOKEN}`,
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

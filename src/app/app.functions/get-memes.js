// For external API calls
const axios = require('axios');

const imgFlipUrl = 'https://api.imgflip.com/get_memes';

exports.main = async (context = {}) => {
  try {
    const {
      data: {
        data: { memes },
      },
    } = await axios.get(imgFlipUrl);
    return {
      status: 200,
      message: { type: 'SUCCESS', body: memes },
    };
  } catch (e) {
    return {
      status: 500,
      message: {
        type: 'ERROR',
        body: err.response.data,
      },
    };
  }
};

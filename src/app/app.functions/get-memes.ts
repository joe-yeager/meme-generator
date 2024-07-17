// For external API calls
import axios from "axios";
import {superImportant} from './shared/common';

const imgFlipUrl = 'https://api.imgflip.com/get_memes';

exports.main = async (context = {}) => {
  superImportant()
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
  } catch (err) {
    return {
      status: 500,
      message: {
        type: 'ERROR',
        body: err.response.data,
      },
    };
  }
};

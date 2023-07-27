// For external API calls
const axios = require('axios');
const getAllMemesUrls = {
  qa: 'https://api.hubspotqa.com/crm/v3/objects/2-20675073?archived=false&properties=name,dankness,url',
  prod: 'https://api.hubspot.com/crm/v3/objects/2-16897592?archived=false&properties=name,dankness,url', // TODO update to prod portal id
};
exports.main = async (context = {}, sendResponse) => {
  if (context.event.payload.memes === 'ALL') {
    try {
      const url =
        context.secrets.HS_ENVIRONMENT === 'prod'
          ? getAllMemesUrls.prod
          : getAllMemesUrls.qa;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${context.secrets.PRIVATE_APP_ACCESS_TOKEN}`,
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
  }
};

// For external API calls
import axios from "axios";
import * as fs from "node:fs";
import * as crypto from "crypto";
import {superImportant} from './shared/common';

const imgFlipUrl = 'https://api.imgflip.com/caption_image';

exports.main = async (context = {}) => {
  // @ts-expect-error context
  const { formState } = context.event.payload;
  superImportant()
  try {
    const memeData = await createMeme(formState);

    if (!memeData.success) {
      return {
        status: 500,
        message: {
          type: 'ERROR',
          body: memeData.data,
        },
      };
    }

    const filePath = await downloadImage(memeData);
    const memeUrl = await uploadToFileManager(filePath);
    await createCustomMemeObject(formState, memeUrl);

    return {
      status: 200,
      message: { type: 'SUCCESS', body: `${memeUrl}` },
    };
  } catch (err) {
    console.error(err.response.data);

    return {
      status: 500,
      message: {
        type: 'ERROR',
        body: err.response.data,
      },
    };
  }
};

async function createMeme(formState) {
  const numBoxes = Number.parseInt(formState.boxes_length);
  const boxes = {};
  for (let i = 0; i < numBoxes; ++i) {
    boxes[`boxes[${i}][text]`] = formState.boxes[i] || '';
  }

  const { data } = await axios.post(imgFlipUrl, null, {
    params: {
      username: process.env.IMG_FLIP_USERNAME,
      password: process.env.IMG_FLIP_PASSWORD,
      template_id: formState.template_id,
      ...boxes,
    },
  });
  return data;
}

async function downloadImage(memeData) {
  const { data: imageBlob } = await axios({
    url: memeData.data.url,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  const buffer = Buffer.from(imageBlob, 'base64');
  const id = crypto.randomBytes(16).toString('hex');
  const filePath = `/tmp/${id}.jpg`;
  fs.writeFileSync(filePath, buffer);

  return filePath;
}

async function uploadToFileManager(filePath) {
  const cmsRes = await axios.post(
    process.env.FILE_MANAGER_URL,
    {
      file: fs.createReadStream(filePath),
      folderPath: 'memes',
      options: JSON.stringify({
        access: 'PUBLIC_INDEXABLE',
        overwrite: false,
      }),
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return cmsRes.data.objects[0].friendly_url;
}

async function createCustomMemeObject(formState, memeUrl) {
  return await axios.post(
    process.env.MEME_OBJECT_URL,
    {
      properties: {
        name: formState.name,
        url: memeUrl,
        dankness: formState.dankness || 1,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

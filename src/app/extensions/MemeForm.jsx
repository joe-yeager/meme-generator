import supportedMemes from './SupportedMemes';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Button,
  Card,
  Form,
  hubspot,
  Input,
  Select,
  Image,
  Divider
} from '@hubspot/ui-extensions';

function generateTextInputs(boxCount, boxes, setBoxes) {
  const inputs = [];
  for(let boxNumber = 0; boxNumber < boxCount; ++boxNumber) {
    inputs.push(
      <Input
      label={`Box Number ${boxNumber}`}
      name={`box-number-${boxNumber}`}
      required={true}
      onChange={value => {
        setBoxes({
          ...boxes,
          [boxNumber]: value
        });
      }}
      />
    )
  }
  return inputs;
};

function findMeme(id) {
  return supportedMemes.find((meme) => meme.id === id);
}

hubspot.extend(({ runServerlessFunction }) => (
  <MemeForm runServerless={runServerlessFunction} />
));

const MemeForm =  ({ runServerless }) => {

  const [boxes, setBoxes] = useState({});
  const index = Math.floor(Math.random() * supportedMemes.length);
  const [theChosenOne, setTheChosenOne] = useState(supportedMemes[index]);
  const [imageUrl, setImageUrl] = useState(theChosenOne.url)

  const options = useMemo(() => {
    return supportedMemes.map(meme => {
      const { name, id} = meme;
      return {
        label: name,
        value: id,
        avatarUrl: meme.url
      }
    })
  }, [supportedMemes])


  const runFunction = useCallback(() => {
      runServerless({
        name: 'generate-meme-v2',
        payload: {
          formState: {
            boxes_length: theChosenOne.box_count,
            template_id: theChosenOne.id,
            boxes,
          }
        },
      })
        .then(res => {
          if(res.status === "SUCCESS") {
            setImageUrl(res.response.message.body);
          }
        })
  }, [runServerless, boxes]);

  return <Card>
    <Form>
      <Image src={imageUrl}/>
      <Select
        label="Choose your meme"
        name="the-chosen-one"
        value={theChosenOne.id}
        onChange={value => {
          const newMeme = findMeme(value);
          setBoxes({});
          setTheChosenOne(newMeme);
          setImageUrl(newMeme.url);
        }}
        options={options}
      />
      {...generateTextInputs(theChosenOne.box_count, boxes, setBoxes)}
      <Button
        onClick={() => {
          runFunction()
        }}
        type="button"
      >
        Generate Meme!
      </Button>
    </Form>
  </Card>;
};



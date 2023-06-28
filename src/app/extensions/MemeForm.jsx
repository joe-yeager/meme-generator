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
  Stack,
  Text,
} from '@hubspot/ui-extensions';

function generateTextInputs(theChosenOne, boxes, setBoxes) {
  const { box_count, id } = theChosenOne;
  const inputs = [];
  for(let boxNumber = 0; boxNumber < box_count; ++boxNumber) {
    inputs.push(
      <Input
      label={`Box Number ${boxNumber + 1}`}
      name={`box-number-${boxNumber}`}
      key={`${id}-${boxNumber}`}
      onChange={value => {
        setBoxes({
          ...boxes,
          [boxNumber]: value,
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const index = Math.floor(Math.random() * supportedMemes.length);
  const [theChosenOne, setTheChosenOne] = useState(supportedMemes[index]);
  const [imageUrl, setImageUrl] = useState(theChosenOne.url)
  const [inputs, setInputs] = useState([]);

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

  useEffect(() => {
    setInputs(generateTextInputs(theChosenOne, boxes, setBoxes))
  }, [theChosenOne, boxes]);

  const runServerlessFunction = useCallback(() => {
    setLoading(true);
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
          } else {
            setError("Unable to generate memes at the moment")
          }
          setLoading(false);
        })
  }, [runServerless, boxes, loading]);

  return <Card>
      <Stack direction='row' distance='xl' width='100%'>
        <Form preventDefault={true} onSubmit={runServerlessFunction}>
          <Select
            label="Choose your meme"
            name="the-chosen-one"
            value={theChosenOne.id}
            error={!!error}
            validationMessage={error ? error : null}
            onChange={value => {
              const newMeme = findMeme(value);
              setBoxes({});
              setTheChosenOne(newMeme);
              setImageUrl(newMeme.url);
              setError(null);
            }}
            options={options}
          />
          {...inputs}
          <Text></Text> {/* Hack to add a blank space*/}
          <Button disabled={loading} type="submit" variant="primary">Generate Meme!</Button>
      </Form>
      <Image src={imageUrl} href={imageUrl} width={300} />
    </Stack>
  </Card>;
};

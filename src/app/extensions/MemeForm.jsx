import supportedMemes from './SupportedMemes';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Button,
  Card,
  hubspot,
  Input,
  Select,
  Image,
  Flex,
  Text,
  Box,
  LoadingSpinner
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
      placeholder='Fill out at least one'
      onInput={value => {
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
if(true){}

hubspot.extend(({ runServerlessFunction }) => (
  <MemeForm runServerless={runServerlessFunction} />
));

const MemeForm =  ({ runServerless }) => {
  const [boxes, setBoxes] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const index = supportedMemes.findIndex((meme) => meme.name === 'Happy Star Congratulations');
  const [theChosenOne, setTheChosenOne] = useState(supportedMemes[index]);
  const [imageUrl, setImageUrl] = useState(theChosenOne.url)
  const [inputs, setInputs] = useState([]);
  const [name, setName] = useState(null);
  const [dankness, setDankness] = useState(null);

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
    console.table({
      boxes_length: theChosenOne.box_count,
      template_id: theChosenOne.id,
      boxes,
      name,
      dankness
    })
    setLoading(true);
    runServerless({
      name: 'generate-meme-v2',
      payload: {
        formState: {
          boxes_length: theChosenOne.box_count,
          template_id: theChosenOne.id,
          boxes,
          name,
          dankness
        }
      }
    }).then(res => {
      console.log("Meme Form response:")
      console.table(res.response);
      if(res.status === "SUCCESS" && res.response.status === 200) {
        setError(null);
        setImageUrl(res.response.message.body);
      } else {
        setError("Unable to generate memes at the moment")
      }
      setLoading(false);
    })
  }, [runServerless, boxes, loading]);

  return <Card>
      <Flex direction='row' wrap={false} justify='start' gap='medium'>
        <Box flex='none'>
          <Select
            label="Choose your meme 🎩"
            name="the-chosen-one"
            required={true}
            value={theChosenOne.id}
            error={!!error}
            validationMessage={error ? error : null}
            onChange={value => {
              const newMeme = findMeme(value);
              setBoxes({});
              setTheChosenOne(newMeme);
              setImageUrl(newMeme.url);
              setName(null);
              setDankness(null);
              setError(null);
            }}
            options={options}
          />
          <Input
            label={`Give your meme a name`}
            required={true}
            placeholder='Name me'
            name={`name`}
            key={`meme-name`}
            onInput={value => {
              setName(value);
            }}
          />
          <Select
            label="Dankness rating"
            name="dankness"
            required={true}
            value={dankness}
            onChange={value => {
              setDankness(value)
            }}
            options={[{value: 1 }, {value: 9001}]}
          />
          <Text></Text>
            <Button disabled={loading || !name || !dankness || Object.keys(boxes).length === 0} variant="primary" onClick={runServerlessFunction}>Generate Meme!</Button>
        </Box>
        <Box flex='none' alignSelf='auto'>
          {...inputs}
        </Box>
        <Box flex='none' alignSelf='center'>
          { loading ? <LoadingSpinner label='Loading meme' showLabel={true} size='md' layout='centered'/> : <Image src={imageUrl} href={imageUrl} width={300} />}
        </Box>
    </Flex>
  </Card>;
};

export default MemeForm;

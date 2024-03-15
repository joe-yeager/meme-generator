import supportedMemes from './shared/SupportedMemes';
import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  Button,
  Card,
  hubspot,
  Input,
  Select,
  Image,
  Flex,
  Text,
  LoadingSpinner,
} from '@hubspot/ui-extensions';

import {
  generateTextInputs,
  formatMemesForSelectInput,
} from './shared/MemeUtils';

const theCreator = 'jyeager@hubspot.com';

hubspot.extend((props) => {
  return <MemeForm {...props} />;
});

const defaultOptions = formatMemesForSelectInput(supportedMemes);

const MemeForm = ({ context }) => {
  const [state, dispatch] = useReducer(reducer);
  const [boxes, setBoxes] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theChosenOne, setTheChosenOne] = useState(defaultOptions[0]);
  const [imageUrl, setImageUrl] = useState(theChosenOne.url);
  const [inputs, setInputs] = useState([]);
  const [name, setName] = useState(null);
  const [dankness, setDankness] = useState(null);
  const [options, setOptions] = useState(defaultOptions);
  const [memes, setMemes] = useState(supportedMemes);

  function findMeme(id) {
    return memes.find((meme) => meme.id === id);
  }

  useEffect(() => {
    setInputs(generateTextInputs(theChosenOne, boxes, setBoxes));
  }, [theChosenOne, boxes]);

  useEffect(() => {
    if (context.user.email === theCreator) {
      setLoading(true);
      hubspot
        .serverless('get-memes')
        .then((res) => {
          console.log(res.message.body);
          const freshMemes = res.message.body;
          setOptions(formatMemesForSelectInput(freshMemes));
          setMemes(freshMemes);
          setTheChosenOne(freshMemes[0]);
          setImageUrl(freshMemes[0].url)
        })
        .catch((e) => {
          console.log(e);
          console.log('unable to fetch fresh memes, using stale memes');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [context]);

  // useEffect(() => {
  //   let url = new URL('https://run.mocky.io/v3/c8bee14d-4fe2-452c-b895-1edc35225535');
  //   self.hsFetch(url, {
  //     timeout: 2000,
  //     method: 'OPTION'
  //   }).then((response) => {
  //     console.log(response.status)
  //     response.json().then(console.log)
  //   }).catch(error => {
  //     console.error(error)
  //   })
  // }, []);

  const runServerlessFunction = useCallback(() => {
    setLoading(true);
    hubspot
      .serverless('generate-meme-v2', {
        payload: {
          formState: {
            boxes_length: theChosenOne.box_count,
            template_id: theChosenOne.id,
            boxes,
            name,
            dankness,
          },
        },
      })
      .then((res) => {
        setError(null);
        setImageUrl(res.message.body);
      })
      .catch((e) => {
        setError('Unable to generate memes at the moment');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [boxes, loading, name, dankness]);

  return (
    <Card>
      <Flex direction="row" wrap={false} justify="start" gap="medium">
        <Flex direction="column" justify="start" gap="medium">
          <Select
            label="Choose your meme 🎩"
            name="the-chosen-one"
            required={true}
            value={theChosenOne.id}
            error={!!error}
            validationMessage={error ? error : null}
            onChange={(value) => {
              const newMeme = findMeme(value);
              setBoxes({});
              setTheChosenOne(newMeme);
              setImageUrl(newMeme.url);
              setDankness(null);
              setError(null);
            }}
            options={options}
          />
          <Input
            label={`Give your meme a name`}
            required={true}
            placeholder="Name me"
            name={`name`}
            value=""
            key={`meme-name`}
            onChange={(value) => {
              setName(value);
            }}
          />
          <Select
            label="Dankness rating"
            name="dankness"
            required={true}
            value={dankness}
            onChange={(value) => {
              setDankness(value);
            }}
            options={[{ value: 1 }, { value: 9001 }]}
          />
          <Text></Text>
          <Button
            disabled={
              loading || !name || !dankness || Object.keys(boxes).length === 0
            }
            variant="primary"
            onClick={runServerlessFunction}
          >
            Generate Meme!
          </Button>
        </Flex>
        <Flex direction="column" justify="start" gap="medium">
          {...inputs}
        </Flex>
        <Flex direction="column" justify="start" gap="medium">
          {loading ? (
            <LoadingSpinner
              label="Loading meme"
              showLabel={true}
              size="md"
              layout="centered"
            />
          ) : (
            <Image src={imageUrl} href={imageUrl} width={300} />
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default MemeForm;

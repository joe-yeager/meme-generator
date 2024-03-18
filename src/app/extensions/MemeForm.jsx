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

import { formatMemesForSelectInput } from './shared/MemeUtils';
import { FlexColumn } from './shared/FlexColumn';
import { memeReducer } from './shared/MemeReducer';
import { MemePanel } from './shared/MemePanel';
import { retain } from '@remote-ui/rpc';

hubspot.extend((props) => {
  return <MemeForm {...props} />;
});

const defaultOptions = formatMemesForSelectInput(supportedMemes);
const theChosenOne = 'jyeager@hubspot.com';

const MemeForm = ({ context }) => {
  const [state, dispatch] = useReducer(memeReducer, {
    boxes: {},
    error: null,
    selectedMeme: defaultOptions[0],
    imageUrl: defaultOptions[0].url,
    inputs: [],
    name: '',
    dankness: '',
    options: defaultOptions,
    finishedProduct: '',
    memes: supportedMemes,
  });

  const [loading, setLoading] = useState(false);
  const [stolenReactions, setStolenReactions] = useState({
    openPanel: () => {},
    closePanel: () => {},
  });

  const findMeme = useCallback(
    (id) => {
      return state.memes.find((meme) => meme.id === id);
    },
    [state.memes]
  );

  useEffect(() => {
    if (context.user.email === theChosenOne) {
      setLoading(true);
      hubspot
        .serverless('get-memes')
        .then((res) => {
          const freshMemes = res.message.body;
          dispatch({
            type: 'UPDATE_MEME_OPTIONS',
            freshMemes,
            boxesUpdater: (boxes) => {
              dispatch({ type: 'UPDATE_BOXES', boxes });
            },
          });
        })
        .catch((e) => {
          console.error('unable to fetch fresh memes, using stale memes', e);
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

  const createMeme = useCallback(
    (event, reactions) => {
      setLoading(true);
      return hubspot
        .serverless('generate-meme-v2', {
          payload: {
            formState: {
              boxes_length: state.selectedMeme.box_count,
              template_id: state.selectedMeme.id,
              boxes: state.boxes,
              name: state.name,
              dankness: state.dankness,
            },
          },
        })
        .then((res) => {
          dispatch({ type: 'SHOW_MEME', url: res.message.body });
          reactions.openPanel('meme-panel');
        })
        .catch((e) => {
          console.log(e);
          dispatch({
            type: 'SET_ERROR',
            error: 'Unable to generate memes at the moment',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [state.boxes, loading, state.name, state.dankness]
  );

  return (
    <Card>
      <MemePanel imageUrl={state.finishedProduct} reactions={stolenReactions} />
      <Flex direction="row" wrap={false} justify="start" gap="medium">
        <FlexColumn>
          <Select
            label="Choose your meme 🎩"
            name="the-chosen-one"
            required={true}
            value={state.selectedMeme.id}
            error={!!state.error}
            validationMessage={state.error ? state.error : null}
            onChange={(value) => {
              const newMeme = findMeme(value);
              dispatch({
                type: 'SELECT_NEW_MEME',
                newMeme,
                boxesUpdater: (boxes) => {
                  dispatch({ type: 'UPDATE_BOXES', boxes });
                },
              });
            }}
            options={state.options}
          />
          <Input
            label={`Give your meme a name`}
            required={true}
            placeholder="Name me"
            name={`name`}
            value=""
            key={`meme-name`}
            onChange={(value) => {
              dispatch({ type: 'UPDATE_NAME', name: value });
            }}
          />
          <Select
            label="Dankness rating"
            name="dankness"
            required={true}
            value={state.dankness}
            onChange={(value) => {
              dispatch({ type: 'UPDATE_DANKNESS', dankness: value });
            }}
            options={[{ value: 1 }, { value: 9001 }]}
          />
          <Text></Text>
          <Button
            disabled={
              loading ||
              !state.name ||
              !state.dankness ||
              Object.keys(state.boxes).length === 0
            }
            variant="primary"
            onClick={async (event, reactions) => {
              retain(reactions);
              setStolenReactions(reactions);
              return createMeme(event, reactions);
            }}
          >
            Generate Meme!
          </Button>
        </FlexColumn>
        <FlexColumn>{...state.inputs}</FlexColumn>
        <FlexColumn>
          {loading ? (
            <LoadingSpinner
              label="Loading meme"
              showLabel={true}
              size="md"
              layout="centered"
            />
          ) : (
            <Image src={state.imageUrl} href={state.imageUrl} width={300} />
          )}
        </FlexColumn>
      </Flex>
    </Card>
  );
};

export default MemeForm;

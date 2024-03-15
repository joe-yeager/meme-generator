import React, { useState, useEffect } from 'react';
import { retain } from '@remote-ui/rpc';
import {
  Button,
  Card,
  hubspot,
  Image,
  ButtonRow,
  Panel,
} from '@hubspot/ui-extensions';

hubspot.extend(({ runServerlessFunction, context }) => (
  <Peekaboo runServerless={runServerlessFunction} context={context} />
));

const images = [
  'https://21429064.fs1.hubspotusercontent-na1.net/hubfs/21429064/memes/461dc2e59b4c555669adfbba4802e1c5.jpg', //megamind
  'https://21429064.fs1.hubspotusercontent-na1.net/hubfs/21429064/memes/879fb5c6bf2ff25d06aa6042e776de22.jpg', // pikachu
  'https://21429064.fs1.hubspotusercontent-na1.net/hubfs/21429064/memes/8956a0f5c306a13fa3426e5ba5765567.jpg', // doge
  'https://21429064.fs1.hubspotusercontent-na1.net/hubfs/21429064/memes/a36e5c81e8e12aec6826246a8df267a0.jpg', // spongebob
];

const Peekaboo = ({}) => {
  const [retainedReactions, setRetainedReactions] = useState(null);
  const [peekabooInterval, setPeekabooInterval] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [imageUrl, setImageUrl] = useState(images[currentImage]);

  useEffect(() => {
    if (retainedReactions) {
      const interval = setInterval(() => {
        retainedReactions.openPanel('panel-1');
        setTimeout(() => {
          retainedReactions.closePanel('panel-1');
        }, 2000);
      }, 5000);
      setPeekabooInterval(interval);
    }
    return () => {
      clearInterval(peekabooInterval);
    };
  }, [retainedReactions]);

  return (
    <Card>
      <Panel
        id="panel-1"
        width="lg"
        onClose={() => {
          setImageUrl(images[(currentImage + 1) % images.length]);
          setCurrentImage(currentImage + 1);
        }}
      >
        <Image src={imageUrl} />
      </Panel>
      <ButtonRow>
        <Button
          disabled={!!retainedReactions}
          variant="primary"
          onClick={async (event, reactions) => {
            retain(reactions);
            setRetainedReactions(reactions);
          }}
        >
          Play Peekaboo!
        </Button>
        <Button
          disabled={!retainedReactions}
          variant="secondary"
          onClick={async (event, reactions) => {
            clearInterval(peekabooInterval);
            setRetainedReactions(null);
          }}
        >
          Stop Peekaboo!
        </Button>
      </ButtonRow>
    </Card>
  );
};

import React from 'react';
import {
  Card,
  hubspot,
  Image,
  Flex
} from '@hubspot/ui-extensions';


hubspot.extend(() => (
  <NyanCat />
));

const nyanUrl = "https://64.media.tumblr.com/tumblr_lrbu1l9BJk1qgzxcao1_250.gifv";

const NyanCat =  () => {
  return (
    <Card>
      <Flex direction="column" align="center">
        <Image src={nyanUrl} />
      </Flex>
    </Card>);
};

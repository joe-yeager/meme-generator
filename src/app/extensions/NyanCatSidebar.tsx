import React from 'react';
import { Card, hubspot, Flex } from '@hubspot/ui-extensions';
import NyanCatChild from './shared/NyanCatChild';

hubspot.extend(({ actions }) => <NyanCat actions={actions} />);

const nyanUrl =
  'https://64.media.tumblr.com/tumblr_lrbu1l9BJk1qgzxcao1_250.gifv';

const NyanCat = ({ actions }) => {
  return (
    <Card>
      <Flex direction="column" align="center">
        <NyanCatChild
          nyanUrl={nyanUrl}
          openIframeModal={actions.openIframeModal}
        />
      </Flex>
    </Card>
  );
};

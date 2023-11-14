import React from 'react';
import {
  Card,
  hubspot,
  Image,
  Flex
} from '@hubspot/ui-extensions';


hubspot.extend(({ actions}) => (
  <NyanCat actions={actions}/>
));

const nyanUrl = "https://64.media.tumblr.com/tumblr_lrbu1l9BJk1qgzxcao1_250.gifv";

const NyanCat =  ({ actions}) => {
  return (
    <Card>
      <Flex direction="column" align="center">
        <Image src={nyanUrl} onClick={() => {
          actions.openIframeModal({
            width: 500000,
            height: 748,
            uri: "https://www.nyan.cat/"})
          }}
        />
      </Flex>
    </Card>);
};

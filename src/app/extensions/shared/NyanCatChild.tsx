import { Image } from '@hubspot/ui-extensions';
import React from 'react';

const NyanCatChild = ({ openIframeModal, nyanUrl }) => {
  return (
    <Image
      src={nyanUrl}
      onClick={() => {
        openIframeModal({
          width: 500000,
          height: 748,
          uri: 'https://www.nyan.cat/',
        });
      }}
    />
  );
};

export default NyanCatChild;

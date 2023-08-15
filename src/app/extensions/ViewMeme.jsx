import React, { useEffect, useState } from 'react';
import {
  Card,
  hubspot,
  Image,
  LoadingSpinner,
  Flex
} from '@hubspot/ui-extensions';


hubspot.extend((props) => (
  <MemeViewer {...props}/>
));

const MemeViewer =  ({ actions : {fetchCrmObjectProperties} }) => {
  const [url, setUrl] = useState()
  useEffect(() => {
    (async () => {
      const result = await fetchCrmObjectProperties(['url'])
      setUrl(result.url)
    })()
  });

  return (
    <Card>
      <Flex align='center' direction='column'>
       {url ? <Image src={url} /> : <LoadingSpinner />}
      </Flex>
    </Card>);
};

import React from 'react';
import { Card, hubspot, Image, Flex } from '@hubspot/ui-extensions';

hubspot.extend(({ context }) => <TestInProd context={context} />);

const prod =
  'https://21429064.fs1.hubspotusercontent-na1.net/hubfs/21429064/memes/7ty78m.jpg';
const notProd =
  'https://21429064.fs1.hubspotusercontent-na1.net/hubfs/21429064/memes/7ty71z.jpg';

const TestInProd = ({ context }) => {
  console.log(self.parent);
  return (
    <Card>
      <Flex direction="column" align="center">
        <Image src={self.origin.includes('static-qa') ? notProd : prod} />
      </Flex>
    </Card>
  );
};

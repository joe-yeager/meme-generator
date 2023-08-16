import React from 'react';
import {
  Card,
  hubspot,
  Image,
  Flex,
} from '@hubspot/ui-extensions';



hubspot.extend(({ context }) => (
  <TestInProd/>
));

const prod = "https://i.imgflip.com/7ty78m.jpg";
const notProd = "https://i.imgflip.com/7ty71z.jpg";

const TestInProd =  () => {
  return (
    <Card>
      <Flex direction="column" align="center">
        <Image src={self.origin.includes("static-qa") ? notProd : prod} />
      </Flex>
    </Card>);
};

import React from 'react';
import {
  Card,
  hubspot,
  Image,
} from '@hubspot/ui-extensions';


hubspot.extend(({ context }) => (
  <TestInProd context={context}/>
));

const PROD_PORTAL = 21429064;
const TestInProd =  ({ context }) => {
  const prod = "https://i.imgflip.com/7ty78m.jpg";
  const notProd = "https://i.imgflip.com/7ty71z.jpg";
  return (
    <Card>
      <Image src={context.portal.id === PROD_PORTAL ? prod : notProd} />
    </Card>);
};

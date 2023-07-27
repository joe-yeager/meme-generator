import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Button,
  Card,
  hubspot,
  Select,
  Image,
  Flex,
  Text,
  LoadingSpinner,
  Box,
  Heading,
  ButtonRow,
  Link,
} from '@hubspot/ui-extensions';


hubspot.extend(({ context }) => (
  <TestInProd context={context}/>
));

const defaultImage = "https://i.imgflip.com/7tb6fh.jpg"

const objectTypeIds = {
  21429064: "2-16897592",
  881674774: "2-20675073"
}

const PROD_PORTAL = 21429064;

const TestInProd =  ({ context }) => {
  const prod = "https://i.imgflip.com/7ty78m.jpg";
  const notProd = "https://i.imgflip.com/7ty71z.jpg";
  return (
    <Card>
      <Image src={context.portal.id === PROD_PORTAL ? prod : notProd} />
    </Card>);
};

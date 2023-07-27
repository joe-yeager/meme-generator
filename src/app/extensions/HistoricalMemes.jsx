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


hubspot.extend(({ runServerlessFunction, context }) => (
  <HistoricalMemes runServerless={runServerlessFunction} context={context}/>
));

const defaultImage = "https://i.imgflip.com/7tb6fh.jpg"

const objectTypeIds = {
  21429064: "2-16897592",
  881674774: "2-20675073"
}

const HistoricalMemes =  ({ runServerless, context }) => {
  console.log(context)
  const { portal: { id: portalId} } = context;
  const objectTypeId = objectTypeIds[portalId]
  const viewAllMemes = `/contacts/${portalId}/objects/${objectTypeId}/views/all/list`


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [memes, setMemes] = useState([]);
  const [options, setOptions] = useState([])
  const [theChosenOne, setTheChosenOne] = useState(null);
  const [memeData, setMemeData] = useState(null);

  useEffect(() => {
    getHistoricalMemes()
  }, [])


  useEffect(() => {
    setOptions(memes.map(meme => {
      return { label: meme.properties.name, value: meme.id};
    }))
  }, [memes])

  const getHistoricalMemes = useCallback(() => {
    setLoading(true);
      runServerless({
        name: 'retrieve-meme',
        payload: {
          memes: 'ALL'
        },
      })
        .then(res => {
          if(res.status === "SUCCESS" && res.response.status === 200) {
            setMemes(res.response.message.body);
          } else {
            setError("Unable to fetch the ancient texts")
          }
          setLoading(false);
        })
  }, [runServerless, loading]);

  return (
    <Card>
      <Flex direction='row' wrap={false} justify='start' gap='medium'>
        <Box flex="none">
          <Select
            label="Historical Meme"
            name="historical-meme"
            error={!!error}
            value={theChosenOne}
            readOnly={loading}
            validationMessage={error ? error : null}
            onChange={value => {
              setTheChosenOne(value);
              setMemeData(memes.find(meme => meme.id === value).properties)
              setError(null);
            }}
            options={options}
          />
          <Text></Text> {/* Hack to add a blank space*/}
          <ButtonRow>
            <Button disabled={loading} variant="primary" onClick={getHistoricalMemes}>Refresh Memes!</Button>
            <Link href={viewAllMemes}>View All Memes</Link>
          </ButtonRow>
      </Box>
      <Box flex="none">
        {memeData && memeData.dankness &&
          <>
            <Heading>Dankness:</Heading>
            <Text format={{fontWeight: 'bold'}}>{memeData? memeData.dankness : ''}</Text>
          </>
        }
        { loading ?
          <LoadingSpinner label='Loading memes' showLabel="true" size='md' layout='centered'/>:
          <Image src={memeData? memeData.url : defaultImage} href={theChosenOne ? `/contacts/${portalId}/record/${objectTypeId}/${theChosenOne}/view/1` : viewAllMemes} width={300} />
         }
      </Box>
    </Flex>
  </Card>);
};

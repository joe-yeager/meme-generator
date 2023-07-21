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


hubspot.extend(({ runServerlessFunction }) => (
  <HistoricalMemes runServerless={runServerlessFunction} />
));

const defaultImage = "https://i.imgflip.com/7tb6fh.jpg"
const viewAllMemes = "https://app.hubspotqa.com/contacts/881674774/objects/2-20675073/views/all/list"

const HistoricalMemes =  ({ runServerless }) => {

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
            <Text format={{fontWeight: 'bold'}}>{memeData? memeData.dankness : ''}</Text>)
          </>
        }
        { loading ?
          <LoadingSpinner label='Loading memes' showLabel="true" size='md' layout='centered'/>:
          <Image src={memeData? memeData.url : defaultImage} href={theChosenOne ? `https://app.hubspotqa.com/contacts/881674774/record/2-20675073/${theChosenOne}/view/1` : viewAllMemes} width={300} />
         }
      </Box>
    </Flex>
  </Card>);
};

import * as React from 'react';
import { Provider, Container, Box, Flex } from 'rebass';
import TourCard from './components/TourCard';

const Tour = () => (
  <TourCard
    id={1}
    tourName="Home Ing"
    description="13 days Home Ing experience"
    destinations={[
      'Liushun',
      'Uppsala',
      'Zagórnik',
      'Salon-de-Provence',
      'Washington',
      'Prawdzinski',
      'Maredakalada',
      'Breia',
      'Baisha',
      'Songlong'
    ]}
    length={13}
    price={5008}
    saving={92}
    currency={'AUD'}
  />
);

class App extends React.Component {
  public render() {
    return (
      <Provider>
        <Box bg="gray">
          <Container>
            <Flex flexWrap="wrap">
              <Box p={1} width={[1, 1 / 2, 1]}>
                <Tour />
              </Box>
              <Box p={1} width={[1, 1 / 2, 1]}>
                <Tour />
              </Box>
              <Box p={1} width={[1, 1 / 2, 1]}>
                <Tour />
              </Box>
            </Flex>
          </Container>
        </Box>
      </Provider>
    );
  }
}

export default App;

import { ChakraProvider, Heading } from '@chakra-ui/react';
import React, { Profiler } from 'react';

import Spreadsheet from 'components/Spreadsheet';

const App: React.FC = () => {
  return (
    <ChakraProvider resetCSS>
      <Spreadsheet />
    </ChakraProvider>
  );
};

export default App;

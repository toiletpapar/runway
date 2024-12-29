import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';

import Cell from 'components/Cell';
import styled from '@emotion/styled';

const NUM_ROWS = 20;
const NUM_COLUMNS = 15;
const createRow = () => _.times(NUM_COLUMNS, _.constant(''))
const blankSheet = _.times(NUM_ROWS, createRow)

const SpreadsheetContainer = styled(Box)`
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`

const Sheet = styled(Box)`
  max-height: 80vh;
  overflow-y: scroll;
`

const ButtonContainer = styled(Flex)`
  margin: 4px 0px;
  justify-content: end;
`

const SpreadsheetButton = styled(Button)`
  margin: 4px;
`

const Spreadsheet: React.FC = () => {
  
  const [spreadsheetState, setSpreadsheetState] = useState(
    blankSheet,
  );
  const [activeCell, setActiveCell] = useState<number[] | null>(null)

  const handleCellChange = useCallback((rowIdx: number, columnIdx: number, newValue: string) => {
    const newRow = [
      ...spreadsheetState[rowIdx].slice(0, columnIdx),
      newValue,
      ...spreadsheetState[rowIdx].slice(columnIdx + 1),
    ];
    setSpreadsheetState([
      ...spreadsheetState.slice(0, rowIdx),
      newRow,
      ...spreadsheetState.slice(rowIdx + 1),
    ]);
  }, [setSpreadsheetState, spreadsheetState])

  const resetSheet = useCallback(() => {
    setSpreadsheetState(blankSheet)
  }, [setSpreadsheetState])

  const updateActiveCell = (rowIndex: number, columnIndex: number) => {
    // Check moving to valid cell
    if (rowIndex >= 0 && rowIndex < NUM_ROWS && columnIndex >= 0 && columnIndex < NUM_COLUMNS) {
      setActiveCell([rowIndex, columnIndex])
    }
  }

  return (
    <SpreadsheetContainer>
      <Heading marginBottom="2rem">Spreadsheet</Heading>
      <Flex>
        <Cell value="" />
        {Array.from({length: NUM_COLUMNS}).fill(1).map((value, columnIdx) => (
          <Cell
            key={`clabel-${columnIdx}`}
            value={(columnIdx + 1).toString()}
          />
        ))}
      </Flex>
      <Sheet width="full">
        {spreadsheetState.map((row, rowIdx) => {
          return (
            <Flex key={String(rowIdx)}>
              <Cell key={`rlabel-${rowIdx}`} value={(rowIdx + 1).toString()} />
              {row.map((cellValue, columnIdx) => (
                <Cell
                  key={`${rowIdx}/${columnIdx}`}
                  value={cellValue}
                  rowIndex={rowIdx}
                  columnIndex={columnIdx}
                  onCellClick={updateActiveCell}
                  onChange={activeCell !== null && activeCell[0] === rowIdx && activeCell[1] === columnIdx ? handleCellChange : undefined}
                  onCellMove={updateActiveCell}
                  coerceToCurrency
                />
              ))}
            </Flex>
          )
        })}
      </Sheet>
      <ButtonContainer>
        <SpreadsheetButton onClick={resetSheet}>Reset Spreadsheet</SpreadsheetButton>
      </ButtonContainer>
    </SpreadsheetContainer>
  );
};

export default Spreadsheet;

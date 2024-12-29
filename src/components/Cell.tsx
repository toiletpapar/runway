import { Input, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { memo, useCallback, useRef } from 'react';

interface Props {
  value: string;
  coerceToCurrency?: boolean;
  rowIndex?: number;
  columnIndex?: number;
  onCellClick?: (rowIndex: number, columnIndex: number) => void;
  onChange?: (rowIndex: number, columnIndex: number, newValue: string) => void;
}

const CellInput = styled(Input)`
  border: 1px solid gray;
  width: 185px;
  height: 40px;
  border-radius: 0px;
`

const CellValue = styled(Box)`
  border: 1px solid gray;
  width: 185px;
  height: 40px;
  padding: 0rem 1rem;
  white-space: nowrap;
  overflow-x: clip;
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 0px;
`

function isNumber(str) {
  if (typeof str !== 'string') {
    return false; // Input must be a string
  }

  // Use a regular expression to check for valid number formats
  const regex = /^-?\d+(\.\d+)?$/; 
  return regex.test(str);
}

const Cell: React.FC<Props> = memo<Props>(({
  value,
  rowIndex,
  columnIndex,
  onChange,
  onCellClick,
  coerceToCurrency = false,
}) => {
  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      onChange(rowIndex, columnIndex, ev.target.value);
    },
    [onChange, rowIndex, columnIndex],
  );

  const handleContainerClick = useCallback(() => {
    if (onCellClick) {
      onCellClick(rowIndex, columnIndex)
    }
  }, [rowIndex, columnIndex])

  return (
    <Box onClick={handleContainerClick}>
      {
        onChange ? (
          <CellInput value={value} width="full" onChange={onChangeHandler} autoFocus />
        ) : (
          <CellValue width="full">{coerceToCurrency && isNumber(value) ? parseFloat(value).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : value}</CellValue>
        )
      }
    </Box>
  );
});

export default Cell;

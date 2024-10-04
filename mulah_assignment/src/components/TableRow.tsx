import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import ComputedValues from '../interface/ComputedValues';

interface TableRowProps {
  rowData: ComputedValues; // Specify the type of rowData as ComputedValues
}

const TableRow: React.FC<TableRowProps> = ({ rowData }) => {
  console.log(rowData);
  return (
    <React.Fragment>
      <Box
        bgColor="#81A263"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        borderRadius={5}
      >
        <Text as="b" cursor={"default"}>
          {rowData.category}
        </Text>
      </Box>

      <Box
        bgColor="#6b8058"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        borderRadius={5}
      >
        <Text as="b" cursor={"default"}>
          {rowData.value}
        </Text>
      </Box>
    </React.Fragment>
  );
};

export default TableRow;

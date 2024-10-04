import { Box, Grid, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import TableRow from "./TableRow";
import RowData from "../interface/RowData";
import ComputedValues from "../interface/ComputedValues";

function MulahTable() {
  const [formattedTableData, setFormattedTableData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(process.env.PUBLIC_URL + "/Table_Input.csv")
        .then((response) => response.text())
        .then((data) => {
          Papa.parse<RowData>(data, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              const transformedData = result.data.map((item: any) => ({
                index: item['Index #'], // Rename 'Index #' to 'category'
                value: item['Value'],       // Rename 'Value' to 'value'
              }));

              createFormattedTableData(transformedData); // Create formatted data
            },
          });
        })
        .catch((error) => {
          console.error("Error fetching or parsing the CSV file:", error);
        });
    };

    fetchData();
  }, []);

  const createFormattedTableData = (data: RowData[]) => {
    const computedValues: ComputedValues = {};

    data.forEach(item => {
      const index = item.index;
      const value = Number(item.value);
      computedValues[index] = value;
    });

    const formattedData = [
      {
        category: "Alpha",
        value: computedValues['A5'] + computedValues['A20']
      },
      {
        category: "Beta",
        value: computedValues['A15'] / computedValues['A7']
      },
      {
        category: "Charlie",
        value: computedValues['A13'] * computedValues['A12']
      }
    ];
    
    setFormattedTableData(formattedData); // Set formatted data to state
  };

  return (
    <>
      <Grid
        gridTemplateColumns={"1fr 1fr"}
        gap={1}
        bgColor={"#f7eeb0"}
        mx={"2%"}
        mt={"1%"}
      >
        <Box
          bgColor={"#365E32"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={2}
        >
          <Text as="b" textColor={"white"} cursor={"default"}>
            Category
          </Text>
        </Box>
        <Box
          bgColor={"#365E32"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          p={2}
        >
          <Text as="b" textColor={"white"} cursor={"default"}>
            Value
          </Text>
        </Box>

        {formattedTableData.map((row, index) => (
          <TableRow key={index} rowData={row} />
        ))}
      </Grid>
    </>
  );
}

export default MulahTable;

import { Box, Container, Text, HStack } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";
import { AiOutlineLineChart, AiOutlineBarChart } from "react-icons/ai";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { useFormatString } from "../../hooks/useFormatString";
import { Data } from "../../types/api/data";
import { PrintData } from "../../types/printData";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { OutputCsv } from "../molecules/OutputCsv";
import { ModalWindow } from "../molecules/ModalWindow";

type Props = {
  category: string;
  data: Array<Data>;
  printData: Array<PrintData>;
};

export const Chart: VFC<Props> = memo((props) => {
  const { category, data, printData } = props;
  // グラフ切り替え
  const [isLineChart, setLineChart] = useState(true);
  const { toJaUnitString, toJaTitleString } = useFormatString();

  /**
   * 棒グラフと折れ線グラフの表示を切り替える.
   */
  const switchGraph = useCallback(() => {
    setLineChart(!isLineChart);
  }, [isLineChart]);

  return (
    <>
      <Container py={4} px={0} fontSize={{ base: "xs" }} w="100%">
        <HStack justifyContent="center" pb={8} spacing={8}>
          <PrimaryButton onClick={switchGraph} fontSize="xl">
            <Text>
              {isLineChart ? <AiOutlineBarChart /> : <AiOutlineLineChart />}
            </Text>
          </PrimaryButton>
          <ModalWindow data={printData} category={category} />
          <OutputCsv data={printData} />
        </HStack>
        <Box display={{ base: isLineChart ? "" : "none" }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, bottom: 0, left: -10 }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis
                dataKey="timeStampDate"
                tickFormatter={(timeStampDate: number) =>
                  format(timeStampDate * 1000, "M/d")
                }
                domain={["dataMin", "dataMax"]}
                // type="number"
              />
              <YAxis
                // type="number"
                domain={["dataMin", "dataMax"]}
              />
              <Tooltip
                labelFormatter={(timeStampDate) =>
                  format(timeStampDate * 1000, "M/d")
                }
                formatter={(value: number, name: string) => [
                  `${value}${toJaUnitString(name)}`,
                  toJaTitleString(name),
                ]}
              />
              <Line
                type="monotone"
                dataKey={category}
                stroke="teal"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box display={{ base: !isLineChart ? "" : "none" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, bottom: 0, left: -10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timeStampDate"
                tickFormatter={(timeStampDate: number) =>
                  format(timeStampDate * 1000, "M/d")
                }
                domain={["dataMin", "dataMax"]}
                // type="number"
              />
              <YAxis
              //  type="number"
              />
              <Tooltip
                labelFormatter={(timeStampDate) =>
                  format(timeStampDate * 1000, "M/d")
                }
                formatter={(value: number, name: string) => [
                  `${value}${toJaUnitString(name)}`,
                  toJaTitleString(name),
                ]}
              />
              <Bar dataKey={category} fill="teal" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Container>
    </>
  );
});

import { memo, useCallback } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Center,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import {
  filterDataSelector,
  filterDataState,
  searchValueState,
} from "../../store/dataState";
import { useFirestore } from "../../hooks/useFirestore";
import { useFormatString } from "../../hooks/useFormatString";
import { Data } from "../../types/api/data";
import { SliderBar } from "../atoms/SliderBar";
import { Chart } from "../organisms/Chart";
import { useFormatPrint } from "../../hooks/useFormatPrint";
import { RiFootprintFill, RiTempColdLine } from "react-icons/ri";
import { GiWeightScale } from "react-icons/gi";
import { GrDatabase } from "react-icons/gr";

export const DataList = memo(() => {
  const { loading } = useFirestore();
  const { formatPrintData } = useFormatPrint();
  const { toJaTitleString } = useFormatString();

  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const filterData: Data[] = useRecoilValue(filterDataSelector);
  const setFilterData: SetterOrUpdater<Data[]> =
    useSetRecoilState(filterDataState);

  // propsで渡すカテゴリーと期間
  const categories = ["temperature", "weight", "steps"];
  const sliderMenu = ["1wk", "1mo", "3mo", "6mo", "9mo", "1yr"];

  const onChangePeriod = useCallback(
    (value: number) => {
      // グラフの期間を絞り込む
      setSearchValue(value);
      // 絞り込んだデータを表示させる
      setFilterData(filterData);
    },
    [setSearchValue, setFilterData, filterData]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <Flex alignItems="center" direction="column" bg="white" py={12}>
          <Tabs variant="unstyled" align="center" w="100%">
            <TabList>
              {categories.map((category) => (
                <Tab
                  key={category}
                  bg="gray.300"
                  color="white"
                  _selected={{ color: "white", bg: "teal.400" }}
                  _focus={{ outline: "none" }}
                  px={6}
                >
                  <Text display={{ base: "none", md: "block" }}>
                    {toJaTitleString(category)}{" "}
                  </Text>
                  <Text display={{ base: "block", md: "none" }} fontSize="xl">
                    {category === "temperature" ? (
                      <RiTempColdLine />
                    ) : category === "weight" ? (
                      <GiWeightScale />
                    ) : category === "steps" ? (
                      <RiFootprintFill />
                    ) : (
                      <GrDatabase />
                    )}
                  </Text>
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {categories.map((category) => (
                <TabPanel key={category}>
                  <Chart
                    category={category}
                    data={filterData}
                    printData={formatPrintData(filterData)}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          <Box pb={16} alignItems="center">
            <SliderBar
              sliderMenu={sliderMenu}
              value={searchValue}
              onChangeValue={(selectValue) => onChangePeriod(selectValue)}
            />
          </Box>
        </Flex>
      )}
    </>
  );
});

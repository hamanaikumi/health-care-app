import {
  Center,
  Container,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { memo, useCallback } from "react";

import { useFormatDate } from "../../hooks/useFormatDate";
import { useFirestore } from "../../hooks/useFirestore";
import { InputCard } from "../molecules/InputCard";
import { todayDataState } from "../../store/dataState";
import { useRecoilValue } from "recoil";
import { Data } from "../../types/api/data";

export const Home = memo(() => {
  const { topYear, topDate, topDay } = useFormatDate();
  const { editData, loading } = useFirestore();
  const todayData: Data = useRecoilValue(todayDataState);

  /**
   * 入力したカテゴリーと値を渡してfirestoreを更新する.
   */
  const onClick = useCallback((inputValue: number, category: string) => {
    editData(inputValue ? inputValue : 0, category);
  }, []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <Container my={12} maxW={300}>
          <Flex align="center" flexDirection="column">
            {/* day */}
            <Flex bg="teal.400" px={8} py={4} borderRadius={999}>
              <Text fontSize="4xl" color="white">
                {topDate(new Date())}
              </Text>
              <Flex
                flexDirection="column"
                justifyContent="center"
                fontSize="md"
                fontWeight="bold"
                mx={4}
                color="white"
              >
                <Text>{topYear(new Date())}</Text>
                <Text>{topDay(new Date())}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Stack my={12} mx={4} spacing={16}>
            <InputCard
              category="temperature"
              categoryTitle="体温（度）"
              onClick={(inputValue, category) => {
                onClick(inputValue, category);
              }}
              initialValue={todayData.temperature}
              placeholder="36.0"
            />
            <InputCard
              category="weight"
              categoryTitle="体重（kg）"
              onClick={(inputValue, category) => {
                onClick(inputValue, category);
              }}
              initialValue={todayData.weight}
              placeholder="50.0"
            />
            <InputCard
              category="steps"
              categoryTitle="歩数（歩）"
              onClick={(inputValue, category) => {
                onClick(inputValue, category);
              }}
              initialValue={todayData.steps}
              placeholder="10000"
            />
          </Stack>
        </Container>
      )}
    </>
  );
});

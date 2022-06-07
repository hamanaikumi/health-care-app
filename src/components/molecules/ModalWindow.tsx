import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Flex,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { memo, useEffect, VFC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useFormatString } from "../../hooks/useFormatString";
import { useStatisticsData } from "../../hooks/useStatisticsData";

import { PrintData } from "../../types/printData";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type Props = {
  data: Array<PrintData>;
  category: string;
};
export const ModalWindow: VFC<Props> = memo((props) => {
  const { toJaUnitString, toJaTitleString } = useFormatString();
  const { statisticsTemperature, dataCount, dataAverage, dataMax, dataMin } =
    useStatisticsData();
  const { data, category } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    statisticsTemperature(data, category);
  }, [data, category]);

  return (
    <>
      <PrimaryButton onClick={onOpen} fontSize="xl">
        <AiOutlineUnorderedList />
      </PrimaryButton>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg">{toJaTitleString(category)}</ModalHeader>
          <ModalCloseButton />

          <ModalBody fontSize="sm">
            <Stack spacing={4} my={4}>
              <Flex>
                <Text>対象期間：</Text>
                {data[0].updatedAt}
                <Text>&nbsp;〜&nbsp;</Text>
                {data[data.length - 1].updatedAt}
              </Flex>
              <Divider />
              <Flex>
                <Text>記録件数：</Text>
                {dataCount}
                <Text>件</Text>
              </Flex>
              <Divider />
              <Flex>
                <Text>平均：</Text>
                <Text>{dataAverage}</Text>
                <Text>{toJaUnitString(category)}</Text>
              </Flex>
              <Divider />
              <Flex>
                <Text>最高記録：</Text>
                <Text>
                  {dataMax}
                  {toJaUnitString(category)}
                </Text>
              </Flex>
              <Divider />
              <Flex>
                <Text>最低記録：</Text>
                <Text>
                  {dataMin}
                  {toJaUnitString(category)}
                </Text>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

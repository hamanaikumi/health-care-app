import {
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  Spacer,
} from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { RiTempColdLine, RiFootprintFill } from "react-icons/ri";
import { GrDatabase } from "react-icons/gr";
import { GiWeightScale } from "react-icons/gi";
import { memo, useEffect, useState, VFC } from "react";

type Props = {
  // propsがない場合はデフォルトはfalse
  disabled?: boolean;
  loading?: boolean;
  category: string;
  onClick: (text: number, category: string) => void;
  categoryTitle: string;
  initialValue?: number;
  placeholder: string;
};

export const InputCard: VFC<Props> = memo((props) => {
  const { category, categoryTitle, onClick, initialValue, placeholder } = props;
  const [InputValue, setInputValue] = useState<number>(0);

  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue);
    }
  }, [initialValue]);

  return (
    <>
      <Flex alignItems="center">
        <Text fontSize="5xl" color="gray.500">
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
        <Spacer />
        <Flex flexDirection="column">
          <Text textAlign="center" fontSize="sm" color="gray.600" mb={2}>
            {categoryTitle}
          </Text>
          <NumberInput
            width={24}
            value={InputValue}
            onChange={(val: any) => setInputValue(val)}
          >
            <NumberInputField
              type="number"
              backgroundColor="#FFFFFF"
              placeholder={placeholder}
            />
          </NumberInput>
        </Flex>
        <Spacer />
        <PrimaryButton onClick={() => onClick(InputValue, category)}>
          登録
        </PrimaryButton>
      </Flex>
    </>
  );
});

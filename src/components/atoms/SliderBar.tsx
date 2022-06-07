import { memo, useCallback, useState, VFC } from "react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Box,
  SliderMark,
} from "@chakra-ui/react";

import { BsHandIndexThumb } from "react-icons/bs";

type Props = {
  sliderMenu: Array<string>;
  onChangeValue: (selectValue: number) => void;
  value: number;
};

export const SliderBar: VFC<Props> = memo((props) => {
  const { sliderMenu, onChangeValue, value } = props;
  const [sliderValue, setSliderValue] = useState<number>(0);

  const labelStyles = {
    mt: "6",
    ml: "-2",
    fontSize: "xs",
  };

  /**
   * 選択した値を取得する.
   */
  const onchange = useCallback(
    (value: number) => {
      setSliderValue(value);
      onChangeValue(value);
    },
    [sliderValue]
  );

  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={value}
      min={0}
      max={sliderMenu.length - 1}
      step={1}
      w={300}
      colorScheme="teal"
      onChange={(value) => {
        onchange(value);
      }}
    >
      {sliderMenu.map((menu, index) => (
        <SliderMark value={index} {...labelStyles} key={index}>
          {menu}
        </SliderMark>
      ))}

      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>

      <SliderThumb boxSize={8}>
        <Box color="teal" as={BsHandIndexThumb} />
      </SliderThumb>
    </Slider>
  );
});

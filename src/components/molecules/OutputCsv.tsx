import { CSVLink } from "react-csv";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { BsPrinter } from "react-icons/bs";
import { Text } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { PrintData } from "../../types/printData";

type Props = {
  data: Array<PrintData>;
};
export const OutputCsv: VFC<Props> = memo((props) => {
  const { data } = props;

  return (
    <CSVLink
      data={data}
      // headers={headers}
      filename={"health-care-record.csv"}
    >
      <PrimaryButton onClick={() => {}} fontSize="xl">
        <Text>
          <BsPrinter />
        </Text>
      </PrimaryButton>
    </CSVLink>
  );
});

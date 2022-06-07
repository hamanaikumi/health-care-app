import { Flex, Text, Link } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";

export const Page404 = memo(() => {
  const history = useHistory();
  const onClickLogin = useCallback(() => history.push("/"), [history]);
  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      direction="column"
      fontSize="2xl"
    >
      <Text>404 Not Found</Text>
      <Text>
        <Link onClick={onClickLogin}>ログイン画面へ戻る</Link>
      </Text>
    </Flex>
  );
});

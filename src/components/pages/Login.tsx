import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useCallback, useState } from "react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";

export const Login = memo(() => {
  const history = useHistory();
  const { login, loading } = useAuth();
  const { getAllData, getInitialData } = useFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  /**
   * パスワードの表示非表示を切り替える.
   */
  const onClickPassword = () => {
    setShow(!show);
  };
  /**
   * 入力されたEメールを取得する.
   * @param e Eメール
   */
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * 入力されたパスワードを取得する.
   * @param e パスワード
   */
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * ログイン画面に遷移する.
   */
  const onClickLogin = () => {
    getInitialData();
    getAllData();
    login(email, password);
  };

  /**
   * ユーザー登録をする.
   */
  const onClickSignUp = useCallback(() => history.push("/signUp"), [history]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="md" textAlign="center">
          健康管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="Email" value={email} onChange={onChangeEmail} />
          <InputGroup>
            <Input
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              type={show ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                borderRadius={999}
                onClick={onClickPassword}
                bg="inherit"
              >
                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <PrimaryButton
            onClick={onClickLogin}
            loading={loading}
            disabled={email === "" || password === ""}
          >
            ログイン
          </PrimaryButton>
          <Text>
            ユーザー登録は <Link onClick={onClickSignUp}>こちら</Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
});

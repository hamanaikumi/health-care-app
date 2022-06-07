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

export const SignUp = memo(() => {
  const history = useHistory();
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /**
   * パスワードの表示非表示を切り替える.
   */
  const onClickPassword = () => {
    setShowPassword(!showPassword);
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
   * ユーザー登録画面に遷移する.
   */
  const onClickSignUp = () => {
    signUp(email, password);
  };

  /**
   * ログインする.
   */
  const onClickLogin = useCallback(() => history.push("/"), [history]);

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
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                borderRadius={999}
                onClick={onClickPassword}
                bg="inherit"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <PrimaryButton
            onClick={onClickSignUp}
            loading={loading}
            disabled={email === "" || password === ""}
          >
            登録
          </PrimaryButton>
          <Text>
            ログインは <Link onClick={onClickLogin}>こちら</Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
});

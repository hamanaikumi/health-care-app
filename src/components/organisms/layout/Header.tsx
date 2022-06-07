import { memo, useCallback } from "react";
import { Flex, Heading, HStack, Link, useDisclosure } from "@chakra-ui/react";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Header = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const history = useHistory();

  /**
   * ホーム画面に遷移する.
   */
  const onClickHome = useCallback(() => history.push("/home"), [history]);

  /**
   * データ一覧画面に遷移する.
   */
  const onClickDatalist = useCallback(
    () => history.push("/home/datalist"),
    [history]
  );

  /**
   * ログアウトする.
   */
  const onClickLogout = useCallback(() => {
    logout();
    history.push("/");
  }, [history]);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
          {/* ブレイクポイントの設定 */}
          <Heading
            as="h1"
            fontSize={{ base: "md", md: "lg" }}
            onClick={onClickHome}
          >
            健康管理アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          // 左よせ
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <HStack spacing={4}>
            <Link onClick={onClickDatalist}>データ一覧</Link>

            <Link onClick={onClickLogout}>ログアウト</Link>
          </HStack>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickDatalist={onClickDatalist}
        onClickLogout={onClickLogout}
      />
    </>
  );
});

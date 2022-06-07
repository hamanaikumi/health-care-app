import { extendTheme } from "@chakra-ui/react";

// グローバルなスタイルの設定
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.700",
      },
    },
  },
});
export default theme;

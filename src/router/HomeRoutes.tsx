import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { DataList } from "../components/pages/DataList";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/dataList",
    exact: false,
    children: <DataList />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];

import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import MapComponent from "../components/MapComponent/MapComponent";
import Csv from "../pages/Csv";
import Charts from "../pages/Charts";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MapComponent />,
      },
      {
        path: "/csv",
        element: <Csv />,
      },
      {
        path: "/charts",
        element: <Charts />,
      }
    ],
  },
]);

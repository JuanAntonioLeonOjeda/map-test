import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import MapComponent from "../components/MapComponent/MapComponent";
import Csv from "../pages/Csv";
import Charts from "../pages/Charts";
import UploadGeoJson from "../pages/UploadGeoJson";
import CsvCity from "../pages/CsvCity";
import PopulationHeatmap from "../components/PopulationHeatmap/PopulationHeatmap";


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
      },
      {
        path: "/geojson",
        element: <UploadGeoJson />,
      },
      {
        path: "/csvcity",
        element: <CsvCity />,
      },
      {
        path: "/population",
        element: <PopulationHeatmap />,
      },
    ],
  },
]);

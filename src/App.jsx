import "leaflet/dist/leaflet.css"
import { router } from './router'
import { RouterProvider } from 'react-router-dom'


import './App.css'

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

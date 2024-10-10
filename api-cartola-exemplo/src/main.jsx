import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

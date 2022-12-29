import ReactDOM from 'react-dom/client'
import './styles/global.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { RecoilRoot } from 'recoil'
import RecoilNexus from "recoil-nexus";
import RootPage from './pages/root.page';
import FilesPage from './pages/files.page';
import FilePage from './pages/file.page';
import EditorPage from './pages/editor.page';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
    children: [
      {
        path: 'files',
        element: <FilesPage/>
      },
      {
        path: 'file/:path',
        element: <FilePage/>,
      },
      {
        path: 'file/:path/editor',
        element: <EditorPage/>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <RecoilNexus/>
    <RouterProvider router={router} />
  </RecoilRoot>
)

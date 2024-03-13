import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NotFound from "./pages/404.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./features/auth/Login.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import Links from "./pages/Links.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin.tsx";
import Editor from "./pages/Editor.tsx";
import Lounge from "./pages/Lounge.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import Welcome from "./pages/Welcome.tsx";
import RequireAuth from "./features/auth/RequireAuth.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/*start- Public routes */}
      <Route index={true} element={<Welcome />} />
      {/* <Route path="register" element={<Register />} /> */}
      <Route path="login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="links" element={<Links />} />
      {/*end- Public routes */}

      {/*start- protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="employee" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="editor" element={<Editor />} />
        <Route path="lounge" element={<Lounge />} />
      </Route>

      {/*end- protected routes */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);

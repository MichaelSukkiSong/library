import "./App.scss";
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./pages/layouts/Layout";
import BooksLayout from "./pages/layouts/BooksLayout";
import Landing from "./pages/Landing";
import BooksList from "./pages/books/BooksList";
import BookNew from "./pages/books/BookNew";
import BookEdit from "./pages/books/BookEdit";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Landing />} errorElement={<ErrorPage />} />
        <Route
          path="books"
          element={<BooksLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<BooksList />} errorElement={<ErrorPage />} />
          <Route
            path="new"
            element={<BookNew />}
            errorElement={<ErrorPage />}
          />
          <Route
            path=":id/edit"
            element={<BookEdit />}
            errorElement={<ErrorPage />}
          />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

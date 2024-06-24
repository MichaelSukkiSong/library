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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} errorElement={<h1>Error..</h1>}>
        <Route index element={<Landing />} errorElement={<h1>Error..</h1>} />
        <Route
          path="books"
          element={<BooksLayout />}
          errorElement={<h1>Error..</h1>}
        >
          <Route
            index
            element={<BooksList />}
            errorElement={<h1>Error..</h1>}
          />
          <Route
            path="new"
            element={<BookNew />}
            errorElement={<h1>Error..</h1>}
          />
          <Route
            path=":id/edit"
            element={<BookEdit />}
            errorElement={<h1>Error..</h1>}
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

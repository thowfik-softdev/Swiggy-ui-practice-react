import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Error from "./components/Error";
import ErrorBoundary from "./components/ErrorBoundary";
import { GrocerySkeleton, MenuSkeleton } from "./components/Skeleton";

// Code-split routes. Defined in one shared module so the Header can preload
// the exact same chunks the router will render.
import { Grocery, RestaurantMenu } from "./utils/lazyRoutes";

const AppLayout = () => {
  return (
    <div className="app">
      {/* Header - This can be called as <Header /> and also {Header()}*/}
      <Header />
      <Outlet />
    </div>
  );
};

/**
 * Every lazy route gets the same treatment:
 *   ErrorBoundary  - a chunk download can fail, and without this that is a
 *                    blank white page with nothing to click
 *   Suspense       - required, because the component genuinely is not loaded yet
 *   a real skeleton - so the layout does not jump when the chunk arrives
 */
const lazyRoute = (element, fallback, errorTitle) => (
  <ErrorBoundary title={errorTitle}>
    <Suspense fallback={fallback}>{element}</Suspense>
  </ErrorBoundary>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/grocery",
        element: lazyRoute(
          <Grocery />,
          <GrocerySkeleton />,
          "Could not load Grocery",
        ),
      },
      {
        path: "/restaurant/:resId",
        element: lazyRoute(
          <RestaurantMenu />,
          <MenuSkeleton />,
          "Could not load this menu",
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />); // root.render(AppLayout());

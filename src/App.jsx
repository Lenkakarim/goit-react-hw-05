import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() =>
  import("./pages/HomePage/HomePage")
);
const MoviesPage = lazy(() =>
  import("./pages/MoviesPage/MoviesPage")
);
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() =>
  import("./components/MovieCast/MovieCast")
);
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);
const SearchForm = lazy(() =>
  import("./components/Header/Header")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage />}
          >
            <Route path="cast" element={<MovieCast />} />
            <Route
              path="reviews"
              element={<MovieReviews />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}
export default App;

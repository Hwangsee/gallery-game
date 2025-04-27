import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import FilterPage from '../pages/FilterPage';
import GamePage from '../pages/GamePage';
import ImageDetailPage from '../pages/ImageDetailPage';
import ImageListPage from '../pages/ImageListPage';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ImageListPage />} />
        <Route path="/images/:id" element={<ImageDetailPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/filter" element={<FilterPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

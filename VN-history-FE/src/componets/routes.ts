import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DynastiesPage from "../pages/DynastiesPage";
import FiguresPage from "../pages/FiguresPage";
import TimelinePage from "../pages/TimelinePage";
import GeographyPage from "../pages/GeographyPage";
import VideoLibraryPage from "../pages/VideoLibraryPage";
import ReportPage from "../pages/ReportPage";
import ArticleDetailPage from "../pages/ArticleDetailPage";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "trieu-dai", Component: DynastiesPage },
      {
        path: "/nhan-vat",
        Component: FiguresPage,
      },
      {
        path: "/dong-thoi-gian",
        Component: TimelinePage,
      },
      {
        path: "/dia-ly",
        Component: GeographyPage,
      },
      {
        path: "/video",
        Component: VideoLibraryPage,
      },
      {
        path: "/bao-cao-loi",
        Component: ReportPage,
      },
      {
        path: "/bai-viet/:id",
        Component: ArticleDetailPage,
      },
    ],
  },
]);

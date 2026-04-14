import { Outlet } from "react-router";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import AnnouncementTicker from "../components/common/AnnouncementTicker ";

export default function MainLayout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <AnnouncementTicker />
      <div className="flex-1  ">
        <Outlet />
      </div>

      <Footer />
    </main>
  );
}

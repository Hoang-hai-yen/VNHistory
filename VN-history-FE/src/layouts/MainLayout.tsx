import { Outlet } from "react-router";
import Footer from "../componets/common/Footer";
import Header from "../componets/common/Header";
import AnnouncementTicker from "../componets/common/AnnouncementTicker ";

export default function MainLayout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <AnnouncementTicker />
      <div className="flex-1 ">
        <Outlet />
      </div>

      <Footer />
    </main>
  );
}

import { Outlet } from "react-router";
import Footer from "../componets/common/Footer";
import Header from "../componets/common/Header";

export default function MainLayout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1"></div>
      <Outlet />
      <Footer />
    </main>
  );
}

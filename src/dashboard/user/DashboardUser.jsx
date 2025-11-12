import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import NavbarHeader from "../../components/navbar/NavbarHeader";
import ChipCategories from "../../components/chipCategories/ChipCategories";
import ListeningAgainCard from "../../components/recent/ListeningAgainCard";
import PlayerFooter from "../../core/shared/footer/PlayerFooter";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";
import DashboardNavHeader from "../../components/navbar/DashboardNavHeader";

const DashboardUser = () => {
  return (
    <>
      <div className="hidden lg:flex relative flex-col h-screen text-white select-none overflow-hidden">
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgDashboard})` }}
        />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/92 to-black/100 backdrop-blur-[80px]" />

        <div className="relative flex flex-row flex-1 overflow-hidden">
          <div className="relative z-20">
            <Sidebar />
          </div>

          <main className="relative z-10 flex-1 overflow-y-auto p-4 space-y-6">
            <DashboardNavHeader />
            <ChipCategories />

            <div className="flex-1 space-y-8">
              <ListeningAgainCard />
            </div>
          </main>
        </div>

        <div className="relative z-50">
          <PlayerFooter />
        </div>
      </div>

      <div className="flex lg:hidden h-screen w-full items-center justify-center bg-black text-white text-center px-6">
        <p className="text-lg font-semibold leading-relaxed">
          Sorry, you can’t view this on phone or tablet browser. <br />
          Please download <span className="text-yellow-400">MQFM</span> for
          Podcast.
        </p>
      </div>
    </>
  );
};

export default DashboardUser;

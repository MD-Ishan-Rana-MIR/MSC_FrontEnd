import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import StickyNavbar from "../components/website/navbar/StickyNavbar";
import Navbar from "../components/website/navbar/Navbar";
import Footer from "../components/website/footer/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageProvider } from "@/lib/ImageProvider";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // check if modal was shown before
    const shown = localStorage.getItem("welcomeModalShown");
    if (!shown) {
      setOpen(true);
      localStorage.setItem("welcomeModalShown", "true");
    }
  }, []);

  return (
    <div>
      <StickyNavbar />
      <Navbar />

      {/* Welcome Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to Our Website 🎉</DialogTitle>
            <DialogDescription>
              Thanks for visiting! Enjoy exploring our content.
              <img src={ImageProvider.product} alt="" />
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>Got it</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;

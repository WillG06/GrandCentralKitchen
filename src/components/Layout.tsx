import { useLocation } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDark = location.pathname === "/";
  return (
    <div
      className={`relative min-h-screen ${
        isDark ? "bg-navy-deep text-beige-light" : "bg-background text-foreground"
      }`}
    >
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};

export default Layout;

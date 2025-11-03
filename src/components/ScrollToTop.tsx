import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    // window.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "auto" });

  }, [pathname]);

  return null;
};

export default ScrollToTop;

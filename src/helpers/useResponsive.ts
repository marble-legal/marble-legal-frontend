import { useMediaQuery } from "react-responsive";

export default function useResponsive() {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const isXLDesktop = useMediaQuery({ minWidth: 1850 });
  const isMobileLandScape = useMediaQuery({ maxWidth: 767 });

  return {
    isDesktop,
    isTablet,
    isMobile,
    isXLDesktop,
    isMobileLandScape,
    isAnyMobile: isMobile || isMobileLandScape,
    isSmallDevice: isMobile || isTablet,
  };
}

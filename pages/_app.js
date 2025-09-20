// import '../styles/Blog.css';
// import "bootstrap/scss/bootstrap.scss";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lightgallery-bundle.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";
// import "@scss/common/base.scss";
// import { ToastContainer, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";
// import Head from "next/head";
// import Meta from "./seo-meta";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import * as ga from "../lib/ga";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
// import "@components/property-details/slider.scss";

// /**
//  * App component
//  * @param {Object} props Component props
//  * @returns {React.Component} A React component
//  */

// export default function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = (url) => {
//       ga.pageview(url);
//     };
//     //When the component is mounted, subscribe to router changes
//     //and log those page views
//     router.events.on("routeChangeComplete", handleRouteChange);

//     // If the component is unmounted, unsubscribe
//     // from the event with the `off` method
//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router.events]);

//   return (
//     <>
//       <Head>
//         <title>
//           Dreams Properties | Analyzing Your Dreams with Dreams Realty
//         </title>
//         <meta
//           name="keywords"
//           content="Dreams properties, find your dream property"
//         ></meta>
//         <meta
//           name="description"
//           content="Explore verified dreams properties on our website for a premium living experience with top-notch facilities meticulously curated by our team"
//         />
//         <Meta
//           title="Dreams Realty"
//           description={"Find your perfect Home here"}
//           image={
//             "backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
//           }
//         />
//         <script
//           type="text/javascript"
//           src="https://st-beta-storage.blr1.cdn.digitaloceanspaces.com/sm-tools/integration-supercrm.js"
//           id="supercrm-wa-widget"
//           widget-id="clzatxzee005oa9iil5931o79"
//           defer
//         ></script>
//       </Head>
//       <SpeedInsights />
//       <Analytics />
//       <ToastContainer
//         theme="dark"
//         position="bottom-right"
//         autoClose={2000}
//         transition={Slide}
//         hideProgressBar={true}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         limit={2}
//         pauseOnFocusLoss
//         pauseOnHover
//       />
//       <Component {...pageProps} />
//     </>
//   );
// }

// import "../styles/Blog.css";
// import "bootstrap/scss/bootstrap.scss";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lightgallery-bundle.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";
// import "@scss/common/base.scss";
// import { ToastContainer, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";
// import Head from "next/head";
// import Meta from "./seo-meta";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import * as ga from "../lib/ga";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
// import "@components/property-details/slider.scss";
// import dynamic from "next/dynamic";
// import Popup1 from "../components/popupAll/Popup1";
// import Popup2 from "../components/popupAll/Popup2";
// import Popup3 from "../components/popupAll/Popup3";
// import Popup4 from "../components/popupAll/Popup4";

// // 🔹 Import your popup dynamically (no SSR)
// // const WelcomePopup = dynamic(() => import("../components/popup/Popup"), {
// //   ssr: false,
// // });

// export default function MyApp({ Component, pageProps }) {
//   const router = useRouter();
//   const [showPopup, setShowPopup] = useState(false);
//   const [showReminderPopup, setShowReminderPopup] = useState(false);
//   const [PopTwo, setPopTwo] = useState(false);
//   const [PopFour, setPopFour] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPopTwo(true);
//     }, 20 * 1000); // 20 sec

//     return () => clearTimeout(timer);
//   }, []);


//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowReminderPopup(true);
//     }, 40 * 1000);

//     return () => clearTimeout(timer); // cleanup
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPopFour(true);
//     }, 60 * 1000); // 60 sec = 20000 ms

//     return () => clearTimeout(timer); // cleanup
//   }, []);

//   useEffect(() => {
//     const handleRouteChange = (url) => {
//       ga.pageview(url);
//     };
//     router.events.on("routeChangeComplete", handleRouteChange);
//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router.events]);

//   // Control popup display
  
//   useEffect(() => {
//     const hasSeenPopup = localStorage.getItem("welcomePopupShown");
//     if (!hasSeenPopup) {
//       setShowPopup(true);
//       localStorage.setItem("welcomePopupShown", "true");
//     }
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>
//           Dreams Properties | Analyzing Your Dreams with Dreams Realty
//         </title>
//         <meta
//           name="keywords"
//           content="Dreams properties, find your dream property"
//         />
//         <meta
//           name="description"
//           content="Explore verified dreams properties on our website for a premium living experience with top-notch facilities meticulously curated by our team"
//         />
//         <Meta
//           title="Dreams Realty"
//           description={"Find your perfect Home here"}
//           image="backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
//         />
//         <script
//           type="text/javascript"
//           src="https://st-beta-storage.blr1.cdn.digitaloceanspaces.com/sm-tools/integration-supercrm.js"
//           id="supercrm-wa-widget"
//           widget-id="clzatxzee005oa9iil5931o79"
//           defer
//         ></script>
//       </Head>
//       <SpeedInsights />
//       <Analytics />
//       <ToastContainer
//         theme="dark"
//         position="bottom-right"
//         autoClose={2000}
//         transition={Slide}
//         hideProgressBar={true}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         limit={2}
//         pauseOnFocusLoss
//         pauseOnHover
//       />
//       <Component {...pageProps} />

//       {/*  Popup will now be global */}
//       {showPopup && <Popup1 />}

//       {/* Popup after 20 second */}
//       {PopTwo && <Popup2 onClose={() => setPopTwo(false)} />}

//       {/* Popup after 30 second */}
//       {showReminderPopup && (
//         <Popup3 onClose={() => setShowReminderPopup(false)} />
//       )}

//       {/* Popup after 60 second */}
//       {PopFour && <Popup4 onClose={() => setPopFour(false)} />}
//     </>
//   );
// }


import "../styles/Blog.css";
import "../styles/Bslug.css";
import "bootstrap/scss/bootstrap.scss";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lightgallery-bundle.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "@scss/common/base.scss";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "next/head";
import Meta from "./seo-meta";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import * as ga from "../lib/ga";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "@components/property-details/slider.scss";
import dynamic from "next/dynamic";
import Popup1 from "../components/popupAll/Popup1";
import Popup2 from "../components/popupAll/Popup2";
import Popup3 from "../components/popupAll/Popup3";
import Popup4 from "../components/popupAll/Popup4";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // State for managing which popup to show
  const [activePopup, setActivePopup] = useState(null);
  
  // Available popups array
  const popups = [
    { id: 1, component: Popup1 },
    { id: 2, component: Popup2 },
    { id: 3, component: Popup3 },
    { id: 4, component: Popup4 }
  ];

  // Function to get random popup
  const getRandomPopup = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * popups.length);
    return popups[randomIndex].id;
  }, []);

  // Function to show popup with auto-close
  const showPopup = useCallback((popupId) => {
    setActivePopup(popupId);
    
    // Auto-close after 1 minute (60000ms)
    setTimeout(() => {
      setActivePopup(null);
    }, 60000);
  }, []);

  // Function to manually close popup
  const closePopup = useCallback(() => {
    setActivePopup(null);
  }, []);

  // Initial popup on landing (only once per session)
  useEffect(() => {
    const hasSeenInitialPopup = sessionStorage.getItem("initialPopupShown");
    
    if (!hasSeenInitialPopup) {
      // Show random popup after 2 seconds of landing
      const timer = setTimeout(() => {
        const randomPopupId = getRandomPopup();
        showPopup(randomPopupId);
        sessionStorage.setItem("initialPopupShown", "true");
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [getRandomPopup, showPopup]);

  // Recurring popup every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      // Only show if no popup is currently active
      if (!activePopup) {
        const randomPopupId = getRandomPopup();
        showPopup(randomPopupId);
      }
    }, 3 * 60 * 1000); // 3 minutes = 180000ms

    return () => clearInterval(interval);
  }, [activePopup, getRandomPopup, showPopup]);

  // Google Analytics route change tracking
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Render the active popup component
  const renderActivePopup = () => {
    if (!activePopup) return null;

    switch (activePopup) {
      case 1:
        return <Popup1 onClose={closePopup} />;
      case 2:
        return <Popup2 onClose={closePopup} />;
      case 3:
        return <Popup3 onClose={closePopup} />;
      case 4:
        return <Popup4 onClose={closePopup} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>
          Dreams Properties | Analyzing Your Dreams with Dreams Realty
        </title>
        <meta
          name="keywords"
          content="Dreams properties, find your dream property"
        />
        <meta
          name="description"
          content="Explore verified dreams properties on our website for a premium living experience with top-notch facilities meticulously curated by our team"
        />
        <Meta
          title="Dreams Realty"
          description={"Find your perfect Home here"}
          image="backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
        />
        <script
          type="text/javascript"
          src="https://st-beta-storage.blr1.cdn.digitaloceanspaces.com/sm-tools/integration-supercrm.js"
          id="supercrm-wa-widget"
          widget-id="clzatxzee005oa9iil5931o79"
          defer
        ></script>
      </Head>
      
      <SpeedInsights />
      <Analytics />
      
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={2000}
        transition={Slide}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={2}
        pauseOnFocusLoss
        pauseOnHover
      />
      
      <Component {...pageProps} />

      {/* Render active popup */}
      {renderActivePopup()}
    </>
  );
}
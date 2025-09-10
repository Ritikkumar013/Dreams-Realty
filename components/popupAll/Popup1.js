
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// // Mock functions for demonstration
// const getValue = (obj, path, defaultValue) => {
//   const keys = path.split(".");
//   let result = obj;
//   for (const key of keys) {
//     if (result && typeof result === "object" && key in result) {
//       result = result[key];
//     } else {
//       return defaultValue;
//     }
//   }
//   return result !== undefined ? result : defaultValue;
// };

// const toast = {
//   success: (message) => console.log("Success:", message),
//   error: (message) => console.log("Error:", message),
// };

// const isValidPhoneNumber = (phone) => {
//   const cleaned = phone.replace(/[^\d+]/g, "");
//   return cleaned.length >= 10 && cleaned.length <= 15;
// };

// const postCreatePropertyEnquiry = async (data) => {
//   // Mock API call
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return { message: "Thank you for your interest! We will contact you soon." };
// };

// const WelcomePopup = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [isContactLoading, setContactLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   const [request, setRequest] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     propertyType: "apartment",
//     message: "",
//   });

//   useEffect(() => {
//     setMounted(true);
//     const timer = setTimeout(() => {
//       setShowModal(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const validateField = (field, value) => {
//     let error = null;

//     switch (field) {
//       case "name":
//         if (!value || value.trim() === "") {
//           error = "The name field is required.";
//         }
//         break;
//       case "phone":
//         if (!value || value.trim() === "") {
//           error = "The phone field is required.";
//         } else if (!isValidPhoneNumber(value)) {
//           error = "Please enter a valid phone number";
//         }
//         break;
//       case "email":
//         if (!value || value.trim() === "") {
//           error = "The email field is required.";
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           error = "The email field must be a valid email.";
//         }
//         break;
//       default:
//         break;
//     }

//     return error;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRequest({
//       ...request,
//       [name]: value,
//     });

//     // Clear error when user starts typing after submission attempt
//     if (hasSubmitted && errors[name]) {
//       const error = validateField(name, value);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));

//     // Only show validation errors on blur if the form has been submitted before
//     if (hasSubmitted) {
//       const error = validateField(name, value);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     setHasSubmitted(true);

//     // Validate all fields
//     const newErrors = {};
//     ["name", "phone", "email"].forEach((field) => {
//       const error = validateField(field, request[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });

//     setErrors(newErrors);

//     // If there are errors, don't submit
//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }

//     try {
//       setContactLoading(true);
//       let data = {
//         data: {
//           name: request.name,
//           phone: request.phone,
//           email: request.email,
//           propertyType: request.propertyType,
//           message: request.message,
//         },
//       };

//       let resp = await postCreatePropertyEnquiry(data);
//       if (resp) {
//         toast.success(
//           getValue(
//             resp,
//             "message",
//             "Thank you for your interest! We will contact you soon."
//           )
//         );
//         setContactLoading(false);
//         setRequest({
//           name: "",
//           phone: "",
//           email: "",
//           propertyType: "apartment",
//           message: "",
//         });
//         setErrors({});
//         setTouched({});
//         setHasSubmitted(false);
//         setShowModal(false);
//       } else {
//         setContactLoading(false);
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       setContactLoading(false);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   if (!mounted || !showModal) {
//     return null;
//   }

//   return (
//     <>
//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translate(-50%, -50%) scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, -50%) scale(1);
//           }
//         }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         onClick={closeModal}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           backdropFilter: "blur(8px)",
//           zIndex: 9998,
//         }}
//       ></div>

//       {/* Modal */}
//       <div
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "min(95vw, 1200px)",
//           height: "min(85vh, 600px)",
//           backgroundColor: "white",
//           borderRadius: "10px",
//           boxShadow: "0 32px 64px rgba(0, 0, 0, 0.25)",
//           zIndex: 9999,
//           overflow: "hidden",
//           animation: "slideIn 0.4s ease-out",
//           display: "flex",
//           flexDirection: window.innerWidth <= 768 ? "column" : "row",
//         }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={closeModal}
//           style={{
//             position: "absolute",
//             top: "15px",
//             right: "15px",
//             width: window.innerWidth <= 480 ? "30px" : "36px",
//             height: window.innerWidth <= 480 ? "30px" : "36px",
//             borderRadius: "50%",
//             backgroundColor: "rgba(255, 255, 255, 0.95)",
//             border: "none",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: window.innerWidth <= 480 ? "16px" : "20px",
//             color: "#666",
//             zIndex: 10000,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//             transition: "all 0.3s ease",
//           }}
//         >
//           ×
//         </button>

//         <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: window.innerWidth <= 768 ? "column" : "row" }}>
//           {/* Left Side - Enhanced Visual Section */}
//           <div
//             style={{
//               flex: window.innerWidth <= 768 ? "none" : 1,
//               height: window.innerWidth <= 768 ? "40%" : "100%",
//               position: "relative",
//               padding: window.innerWidth <= 480 ? "15px" : window.innerWidth <= 768 ? "20px" : "30px",
//               color: "white",
//             }}
//           >
//             {/* Background Image */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundImage: `url('/images/home/featured-property-rent/rent3.webp')`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 zIndex: -2,
//               }}
//             ></div>

//             {/* Solid Overlay */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: "rgba(0, 0, 0, 0.50)",
//                 zIndex: -1,
//               }}
//             ></div>

//             {/* Top Section - Brand & Heading */}
//             <div style={{ position: "relative", zIndex: 1 }}>
//               {/* Brand Section */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div>
//                   <Image
//                     style={{
//                       width: window.innerWidth <= 480 ? "80px" : window.innerWidth <= 768 ? "100px" : "130px", 
//                       height: window.innerWidth <= 480 ? "43px" : window.innerWidth <= 768 ? "54px" : "70px", 
//                       objectFit: "contain"
//                     }}
//                     src="/images/logo/white-logo.png"
//                     width={window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 100 : 130}
//                     height={window.innerWidth <= 480 ? 43 : window.innerWidth <= 768 ? 54 : 70}
//                     alt="Dreams Realty Logo"
//                   />
//                 </div>
//               </div>

//               {/* Value Proposition */}
//               <div style={{ marginBottom: "20px" }}>
//                 <h2
//                   style={{
//                     fontSize: window.innerWidth <= 480 ? "16px" : window.innerWidth <= 768 ? "20px" : "24px",
//                     fontWeight: "bold",
//                     marginBottom: "10px",
//                     lineHeight: "1.2",
//                     background: "linear-gradient(135deg, #ffffff, #f8fafc)",
//                     backgroundClip: "text",
//                     WebkitBackgroundClip: "text",
//                     color: "transparent",
//                     fontStyle: "italic"
//                   }}
//                 >
//                   Your Luxury Home Awaits
//                 </h2>
//                 {window.innerWidth > 768 && (
//                   <p
//                     style={{
//                       fontSize: "14px",
//                       color: "rgba(255, 255, 255, 0.85)",
//                       lineHeight: "1.4",
//                       fontWeight: "300",
//                     }}
//                   >
//                     Discover premium villas and apartments in East Bengaluru with Dreams Realty—a new-age real estate advisory, brokerage, and investment firm trusted by IT professionals, NRIs, investors, and top developers.
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Bottom Section - Stats & Features */}
//             <div style={{ position: "relative", zIndex: 1 }}>
//               {/* Features */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: window.innerWidth <= 480 ? "column" : window.innerWidth <= 1024 ? "column" : "row",
//                   gap: window.innerWidth <= 480 ? "6px" : "12px",
//                   marginTop: window.innerWidth <= 768 ? "20px" : "300px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
//                       height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: window.innerWidth <= 480 ? "6px" : "10px",
//                       fontSize: window.innerWidth <= 480 ? "10px" : "14px",
//                     }}
//                   >
//                     📍
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Prime Locations
//                     </div>
//                     <div
//                       style={{
//                         fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Handpicked luxury properties in Bengaluru's most sought-after neighborhoods
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
//                       height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: window.innerWidth <= 480 ? "6px" : "10px",
//                       fontSize: window.innerWidth <= 480 ? "10px" : "14px",
//                     }}
//                   >
//                     🏆
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Trusted Guidance
//                     </div>
//                     <div
//                       style={{
//                         fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Transparent, end-to-end support from search to ownership
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
//                       height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: window.innerWidth <= 480 ? "6px" : "10px",
//                       fontSize: window.innerWidth <= 480 ? "10px" : "14px",
//                     }}
//                   >
//                     ⚡
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Hassle-Free Deals
//                     </div>
//                     <div
//                       style={{
//                         fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Quick response, legal assistance, and smooth transactions
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div
//             style={{
//               width: window.innerWidth <= 768 ? "100%" : "350px",
//               flex: window.innerWidth <= 768 ? 1 : "none",
//               padding: window.innerWidth <= 480 ? "15px" : window.innerWidth <= 768 ? "20px" : "30px",
//               backgroundColor: "white",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               height: window.innerWidth <= 768 ? "60%" : "100%",
//               overflowY: "auto",
//             }}
//           >
//             {/* Form Header */}
//             <div style={{ textAlign: "center", marginBottom: window.innerWidth <= 480 ? "15px" : "20px" }}>
//               <h3
//                 style={{
//                   fontSize: window.innerWidth <= 480 ? "18px" : window.innerWidth <= 768 ? "20px" : "24px",
//                   fontWeight: "bold",
//                   color: "#1f2937",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Get Started
//               </h3>
//               <p
//                 style={{
//                   color: "#6b7280",
//                   fontSize: window.innerWidth <= 480 ? "12px" : "14px",
//                   lineHeight: "1.4",
//                 }}
//               >
//                 Fill in your details and we'll help you find the perfect property
//               </p>
//             </div>

//             {/* Form Fields */}
//             <div
//               style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: window.innerWidth <= 480 ? "12px" : "16px" 
//               }}
//             >
//               {/* Name Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={request.name}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter your full name"
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: `2px solid ${errors.name ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.name && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.name}
//                   </div>
//                 )}
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={request.phone}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="+91 99999 99999"
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: `2px solid ${errors.phone ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.phone && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.phone}
//                   </div>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={request.email}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="your.email@example.com"
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.email && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.email}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Interested In
//                 </label>
//                 <select
//                   name="propertyType"
//                   value={request.propertyType}
//                   onChange={handleInputChange}
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   <option value="apartment">Apartments</option>
//                   <option value="villa">Villa Homes</option>
//                   <option value="plots">Plots</option>
//                   <option value="farmland">Farmland</option>
//                   <option value="office">Office Spaces</option>
//                 </select>
//               </div>

//               {/* Message Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Message (Optional)
//                 </label>
//                 <textarea
//                   name="message"
//                   value={request.message}
//                   onChange={handleInputChange}
//                   rows={3}
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                     resize: "vertical",
//                     minHeight: "80px",
//                   }}
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isContactLoading}
//                 style={{
//                   width: "100%",
//                   padding: window.innerWidth <= 480 ? "10px" : "12px",
//                   background: isContactLoading
//                     ? "#94a3b8"
//                     : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                   fontWeight: "600",
//                   cursor: isContactLoading ? "not-allowed" : "pointer",
//                   opacity: isContactLoading ? 0.7 : 1,
//                   transition: "all 0.2s ease",
//                   boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//                 }}
//               >
//                 {isContactLoading ? (
//                   <span>Submitting...</span>
//                 ) : (
//                   "Get Property Details"
//                 )}
//               </button>
//             </div>

//             {/* Privacy Note */}
//             <p
//               style={{
//                 fontSize: window.innerWidth <= 480 ? "10px" : "11px",
//                 color: "#6b7280",
//                 textAlign: "center",
//                 lineHeight: "1.4",
//                 marginTop: window.innerWidth <= 480 ? "12px" : "16px",
//               }}
//             >
//               By submitting this form, you agree to our Terms of Service and
//               Privacy Policy. We'll only contact you about relevant property
//               opportunities.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WelcomePopup;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// // Mock functions for demonstration
// const getValue = (obj, path, defaultValue) => {
//   const keys = path.split(".");
//   let result = obj;
//   for (const key of keys) {
//     if (result && typeof result === "object" && key in result) {
//       result = result[key];
//     } else {
//       return defaultValue;
//     }
//   }
//   return result !== undefined ? result : defaultValue;
// };

// const toast = {
//   success: (message) => console.log("Success:", message),
//   error: (message) => console.log("Error:", message),
// };

// const isValidPhoneNumber = (phone) => {
//   const cleaned = phone.replace(/[^\d+]/g, "");
//   return cleaned.length >= 10 && cleaned.length <= 15;
// };

// const postCreatePropertyEnquiry = async (data) => {
//   // Mock API call
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return { message: "Thank you for your interest! We will contact you soon." };
// };

// const WelcomePopup = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [isContactLoading, setContactLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   const [request, setRequest] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     propertyType: "apartment",
//     message: "",
//   });

//   useEffect(() => {
//     setMounted(true);
//     const timer = setTimeout(() => {
//       setShowModal(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const validateField = (field, value) => {
//     let error = null;

//     switch (field) {
//       case "name":
//         if (!value || value.trim() === "") {
//           error = "The name field is required.";
//         }
//         break;
//       case "phone":
//         if (!value || value.trim() === "") {
//           error = "The phone field is required.";
//         } else if (!isValidPhoneNumber(value)) {
//           error = "Please enter a valid phone number";
//         }
//         break;
//       case "email":
//         if (!value || value.trim() === "") {
//           error = "The email field is required.";
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           error = "The email field must be a valid email.";
//         }
//         break;
//       default:
//         break;
//     }

//     return error;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRequest({
//       ...request,
//       [name]: value,
//     });

//     // Clear error when user starts typing after submission attempt
//     if (hasSubmitted && errors[name]) {
//       const error = validateField(name, value);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));

//     // Only show validation errors on blur if the form has been submitted before
//     if (hasSubmitted) {
//       const error = validateField(name, value);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     setHasSubmitted(true);

//     // Validate all fields
//     const newErrors = {};
//     ["name", "phone", "email"].forEach((field) => {
//       const error = validateField(field, request[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });

//     setErrors(newErrors);

//     // If there are errors, don't submit
//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }

//     try {
//       setContactLoading(true);
//       let data = {
//         data: {
//           name: request.name,
//           phone: request.phone,
//           email: request.email,
//           propertyType: request.propertyType,
//           message: request.message,
//         },
//       };

//       let resp = await postCreatePropertyEnquiry(data);
//       if (resp) {
//         toast.success(
//           getValue(
//             resp,
//             "message",
//             "Thank you for your interest! We will contact you soon."
//           )
//         );
//         setContactLoading(false);
//         setRequest({
//           name: "",
//           phone: "",
//           email: "",
//           propertyType: "apartment",
//           message: "",
//         });
//         setErrors({});
//         setTouched({});
//         setHasSubmitted(false);
//         setShowModal(false);
//       } else {
//         setContactLoading(false);
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       setContactLoading(false);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   if (!mounted || !showModal) {
//     return null;
//   }

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={closeModal}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           backdropFilter: "blur(8px)",
//           zIndex: 9998,
//         }}
//       ></div>

//       {/* Modal */}
//       <div
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "95%",
//           maxWidth: "1200px",
//           height: "85vh",
//           maxHeight: "600px",
//           backgroundColor: "white",
//           borderRadius: "10px",
//           boxShadow: "0 32px 64px rgba(0, 0, 0, 0.25)",
//           zIndex: 9999,
//           overflow: "hidden",
//           animation: "slideIn 0.4s ease-out",
//         }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={closeModal}
//           style={{
//             position: "absolute",
//             top: "15px",
//             right: "15px",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             backgroundColor: "rgba(255, 255, 255, 0.95)",
//             border: "none",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "20px",
//             color: "#666",
//             zIndex: 10000,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//             transition: "all 0.3s ease",
//           }}
//         >
//           ×
//         </button>

//         <div style={{ display: "flex", height: "100%" }}>
//           {/* Left Side - Enhanced Visual Section */}
//           <div
//             style={{
//               flex: 1,
//               position: "relative",
//               padding: "30px",
//               color: "white",
//             }}
//           >
//             {/* Background Image */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundImage: `url('/images/home/featured-property-rent/rent3.webp')`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 zIndex: -2,
//               }}
//             ></div>

//             {/* Solid Overlay */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: "rgba(0, 0, 0, 0.50)",

//                 zIndex: -1,
//               }}
//             ></div>

//             {/* Top Section - Brand & Heading */}
//             <div style={{ position: "relative", zIndex: 1 }}>
//               {/* Brand Section */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div>
//                   <Image
//                  style={{width:"130px", height:"70px", objectFit:"contain"}}
//                     src="/images/logo/white-logo.png"
//                     width={130}
//                     height={70}
//                     alt="Dreams Realty Logo"
//                   />

//                   {/* <h1
//                     style={{
//                       fontSize: "28px",
//                       fontWeight: "bold",
//                       margin: 0,
//                       background:
//                         "linear-gradient(135deg, #ffffff, #e2e8f0, #cbd5e1)",
//                       backgroundClip: "text",
//                       WebkitBackgroundClip: "text",
//                       color: "transparent",
//                       letterSpacing: "-0.5px",
//                       borderBottom: "2px solid white",
//                     }}
//                   >
//                     Dreams Realty
//                   </h1> */}
//                   {/* <p
//                     style={{
//                       margin: 0,
//                       fontSize: "11px",
//                       color: "rgba(255, 255, 255, 0.7)",
//                       fontWeight: "300",
//                     }}
//                   >
//                     Premium Real Estate Solutions
//                   </p> */}
//                 </div>
//               </div>

//               {/* Value Proposition */}
//               <div style={{ marginBottom: "20px" }}>
//                 <h2
//                   style={{
//                     fontSize: "24px",
//                     fontWeight: "bold",
//                     marginBottom: "10px",
//                     lineHeight: "1.2",
//                     background: "linear-gradient(135deg, #ffffff, #f8fafc)",
//                     backgroundClip: "text",
//                     WebkitBackgroundClip: "text",
//                     color: "transparent",
//                     textDecoration: "italic"
//                   }}
//                 >
//                  Your Luxury Home Awaits
//                 </h2>
//                 <p
//                   style={{
//                     fontSize: "14px",
//                     color: "rgba(255, 255, 255, 0.85)",
//                     lineHeight: "1.4",
//                     fontWeight: "300",
//                   }}
//                 >
//                   Discover premium villas and apartments in East Bengaluru with Dreams Realty—a new-age real estate advisory, brokerage, and investment firm trusted by IT professionals, NRIs, investors, and top developers.
//                 </p>
//               </div>
//             </div>

//             {/* Bottom Section - Stats & Features */}
//             <div style={{ position: "relative", zIndex: 1 }}>
//               {/* Stats Row */}
//               {/* <div
//                 style={{
//                   display: "flex",
//                   gap: "20px",
//                   marginBottom: "20px",
//                   padding: "12px 0",
//                 }}
//               >
//                 <div style={{ textAlign: "center", flex: 1 }}>
//                   <div
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                       color: "#3b82f6",
//                       marginBottom: "2px",
//                     }}
//                   >
//                     500+
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "10px",
//                       color: "rgba(255, 255, 255, 0.7)",
//                     }}
//                   >
//                     Properties Sold
//                   </div>
//                 </div>
//                 <div style={{ textAlign: "center", flex: 1 }}>
//                   <div
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                       color: "#10b981",
//                       marginBottom: "2px",
//                     }}
//                   >
//                     15+
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "10px",
//                       color: "rgba(255, 255, 255, 0.7)",
//                     }}
//                   >
//                     Years Experience
//                   </div>
//                 </div>
//                 <div style={{ textAlign: "center", flex: 1 }}>
//                   <div
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "bold",
//                       color: "#8b5cf6",
//                       marginBottom: "2px",
//                     }}
//                   >
//                     98%
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "10px",
//                       color: "rgba(255, 255, 255, 0.7)",
//                     }}
//                   >
//                     Client Satisfaction
//                   </div>
//                 </div>
//               </div> */}

//               {/* Features */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   gap: "12px",
//                   marginTop: "300px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "50px",
//                       height: "32px",
//                       // background: "linear-gradient(135deg, #3b82f6, #1e40af)",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: "10px",
//                       fontSize: "14px",
//                     }}
//                   >
//                     📍
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Prime Locations
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                      Handpicked luxury properties in Bengaluru’s most sought-after neighborhoods
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "50px",
//                       height: "32px",
//                       // background: "linear-gradient(135deg, #10b981, #059669)",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: "10px",
//                       fontSize: "14px",
//                     }}
//                   >
//                     🏆
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Trusted Guidance
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Transparent, end-to-end support from search to ownership
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "50px",
//                       height: "32px",
//                       // background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: "10px",
//                       fontSize: "14px",
//                     }}
//                   >
//                     ⚡
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Hassle-Free Deals
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Quick response, legal assistance, and smooth transactions
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div
//             style={{
//               width: "350px",
//               padding: "30px",
//               backgroundColor: "white",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               height: "100%",
//               overflowY: "auto",
//             }}
//           >
//             {/* Form Header */}
//             <div style={{ textAlign: "center", marginBottom: "20px" }}>
//               <h3
//                 style={{
//                   fontSize: "24px",
//                   fontWeight: "bold",
//                   color: "#1f2937",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Get Started
//               </h3>
//               <p
//                 style={{
//                   color: "#6b7280",
//                   fontSize: "14px",
//                   lineHeight: "1.4",
//                 }}
//               >
//                 Fill in your details and we'll help you find the perfect
//                 property
//               </p>
//             </div>

//             {/* Form Fields */}
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//             >
//               {/* Name Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={request.name}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter your full name"
//                   style={{
//                     width: "100%",
//                     padding: "10px 12px",
//                     border: `2px solid ${errors.name ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.name && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.name}
//                   </div>
//                 )}
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={request.phone}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="+91 99999 99999"
//                   style={{
//                     width: "100%",
//                     padding: "10px 12px",
//                     border: `2px solid ${errors.phone ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.phone && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.phone}
//                   </div>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={request.email}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="your.email@example.com"
//                   style={{
//                     width: "100%",
//                     padding: "10px 12px",
//                     border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.email && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.email}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Interested In
//                 </label>
//                 <select
//                   name="propertyType"
//                   value={request.propertyType}
//                   onChange={handleInputChange}
//                   style={{
//                     width: "100%",
//                     padding: "10px 12px",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "8px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   <option value="apartment">Apartments</option>
//                   <option value="villa">Villa Homes</option>
//                   <option value="plots">Plots</option>
//                   <option value="farmland">Farmland</option>
//                   <option value="office">Office Spaces</option>
//                 </select>
//               </div>

//               {/* Message Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Message (Optional)
//                 </label>
//                 <textarea
//                   name="message"
//                   value={request.message}
//                   onChange={handleInputChange}
//                   rows={3}
//                   style={{
//                     width: "100%",
//                     padding: "10px 12px",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "8px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                     resize: "vertical",
//                     minHeight: "80px",
//                   }}
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isContactLoading}
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   background: isContactLoading
//                     ? "#94a3b8"
//                     : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   cursor: isContactLoading ? "not-allowed" : "pointer",
//                   opacity: isContactLoading ? 0.7 : 1,
//                   transition: "all 0.2s ease",
//                   boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//                 }}
//               >
//                 {isContactLoading ? (
//                   <span>Submitting...</span>
//                 ) : (
//                   "Get Property Details"
//                 )}
//               </button>
//             </div>

//             {/* Privacy Note */}
//             <p
//               style={{
//                 fontSize: "11px",
//                 color: "#6b7280",
//                 textAlign: "center",
//                 lineHeight: "1.4",
//                 marginTop: "16px",
//               }}
//             >
//               By submitting this form, you agree to our Terms of Service and
//               Privacy Policy. We'll only contact you about relevant property
//               opportunities.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WelcomePopup;



// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// // Mock functions for demonstration
// const getValue = (obj, path, defaultValue) => {
//   const keys = path.split(".");
//   let result = obj;
//   for (const key of keys) {
//     if (result && typeof result === "object" && key in result) {
//       result = result[key];
//     } else {
//       return defaultValue;
//     }
//   }
//   return result !== undefined ? result : defaultValue;
// };

// const toast = {
//   success: (message) => console.log("Success:", message),
//   error: (message) => console.log("Error:", message),
// };

// const isValidPhoneNumber = (phone) => {
//   const cleaned = phone.replace(/[^\d+]/g, "");
//   return cleaned.length >= 10 && cleaned.length <= 15;
// };

// const postCreatePropertyEnquiry = async (data) => {
//   // Mock API call
//   await new Promise((resolve) => setTimeout(resolve, 1500));
//   return { message: "Thank you for your interest! We will contact you soon." };
// };

// const WelcomePopup = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [isContactLoading, setContactLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   const [request, setRequest] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     propertyType: "apartment",
//     message: "",
//   });

//   useEffect(() => {
//     setMounted(true);
//     const timer = setTimeout(() => {
//       setShowModal(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const validateField = (field, value) => {
//     let error = null;

//     switch (field) {
//       case "name":
//         if (!value || value.trim() === "") {
//           error = "The name field is required.";
//         }
//         break;
//       case "phone":
//         if (!value || value.trim() === "") {
//           error = "The phone field is required.";
//         } else if (!isValidPhoneNumber(value)) {
//           error = "Please enter a valid phone number";
//         }
//         break;
//       case "email":
//         if (!value || value.trim() === "") {
//           error = "The email field is required.";
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           error = "The email field must be a valid email.";
//         }
//         break;
//       default:
//         break;
//     }

//     return error;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRequest({
//       ...request,
//       [name]: value,
//     });

//     // Clear error when user starts typing after submission attempt
//     if (hasSubmitted && errors[name]) {
//       const error = validateField(name, value);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({
//       ...prev,
//       [name]: true,
//     }));

//     // Only show validation errors on blur if the form has been submitted before
//     if (hasSubmitted) {
//       const error = validateField(name, value);
//       setErrors((prev) => ({
//         ...prev,
//         [name]: error,
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     setHasSubmitted(true);

//     // Validate all fields
//     const newErrors = {};
//     ["name", "phone", "email"].forEach((field) => {
//       const error = validateField(field, request[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });

//     setErrors(newErrors);

//     // If there are errors, don't submit
//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }

//     try {
//       setContactLoading(true);
//       let data = {
//         data: {
//           name: request.name,
//           phone: request.phone,
//           email: request.email,
//           propertyType: request.propertyType,
//           message: request.message,
//         },
//       };

//       let resp = await postCreatePropertyEnquiry(data);
//       if (resp) {
//         toast.success(
//           getValue(
//             resp,
//             "message",
//             "Thank you for your interest! We will contact you soon."
//           )
//         );
//         setContactLoading(false);
//         setRequest({
//           name: "",
//           phone: "",
//           email: "",
//           propertyType: "apartment",
//           message: "",
//         });
//         setErrors({});
//         setTouched({});
//         setHasSubmitted(false);
//         setShowModal(false);
//       } else {
//         setContactLoading(false);
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       setContactLoading(false);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   if (!mounted || !showModal) {
//     return null;
//   }

//   return (
//     <>
//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translate(-50%, -50%) scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, -50%) scale(1);
//           }
//         }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         onClick={closeModal}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           backdropFilter: "blur(8px)",
//           zIndex: 9998,
//         }}
//       ></div>

//       {/* Modal */}
//       <div
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "min(58vw, 1200px)",
//           height: "min(78vh, 600px)",
//           backgroundColor: "white",
//           borderRadius: "10px",
//           boxShadow: "0 32px 64px rgba(0, 0, 0, 0.25)",
//           zIndex: 9999,
//           overflow: "hidden",
//           animation: "slideIn 0.4s ease-out",
//           display: "flex",
//           flexDirection: window.innerWidth <= 768 ? "column" : "row",
//         }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={closeModal}
//           style={{
//             position: "absolute",
//             top: "15px",
//             right: "15px",
//             width: window.innerWidth <= 480 ? "30px" : "36px",
//             height: window.innerWidth <= 480 ? "30px" : "36px",
//             borderRadius: "50%",
//             backgroundColor: "rgba(255, 255, 255, 0.95)",
//             border: "none",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: window.innerWidth <= 480 ? "16px" : "20px",
//             color: "#666",
//             zIndex: 10000,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//             transition: "all 0.3s ease",
//           }}
//         >
//           ×
//         </button>

//         <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: window.innerWidth <= 768 ? "column" : "row" }}>
//           {/* Left Side - Enhanced Visual Section */}
//           <div
//             style={{
//               flex: window.innerWidth <= 768 ? "none" : 1,
//               height: window.innerWidth <= 768 ? "40%" : "100%",
//               position: "relative",
//               padding: window.innerWidth <= 480 ? "15px" : window.innerWidth <= 768 ? "20px" : "30px",
//               color: "white",
//             }}
//           >
//             {/* Background Image */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundImage: `url('/pop.jpeg')`,
//                 backgroundSize: "contain",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 zIndex: -2,
//               }}
//             ></div>

//             {/* Solid Overlay */}
//             {/* <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: "rgba(0, 0, 0, 0.50)",
//                 zIndex: -1,
//               }}
//             ></div> */}

//             {/* Top Section - Brand & Heading */}
//             {/* <div style={{ position: "relative", zIndex: 1 }}>
              
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <div>
//                   <Image
//                     style={{
//                       width: window.innerWidth <= 480 ? "80px" : window.innerWidth <= 768 ? "100px" : "130px", 
//                       height: window.innerWidth <= 480 ? "43px" : window.innerWidth <= 768 ? "54px" : "70px", 
//                       objectFit: "contain"
//                     }}
//                     src="/images/logo/white-logo.png"
//                     width={window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 100 : 130}
//                     height={window.innerWidth <= 480 ? 43 : window.innerWidth <= 768 ? 54 : 70}
//                     alt="Dreams Realty Logo"
//                   />
//                 </div>
//               </div>

           
//               <div style={{ marginBottom: "20px" }}>
//                 <h2
//                   style={{
//                     fontSize: window.innerWidth <= 480 ? "16px" : window.innerWidth <= 768 ? "20px" : "24px",
//                     fontWeight: "bold",
//                     marginBottom: "10px",
//                     lineHeight: "1.2",
//                     background: "linear-gradient(135deg, #ffffff, #f8fafc)",
//                     backgroundClip: "text",
//                     WebkitBackgroundClip: "text",
//                     color: "transparent",
//                     fontStyle: "italic"
//                   }}
//                 >
//                   Your Luxury Home Awaits
//                 </h2>
//                 {window.innerWidth > 768 && (
//                   <p
//                     style={{
//                       fontSize: "14px",
//                       color: "rgba(255, 255, 255, 0.85)",
//                       lineHeight: "1.4",
//                       fontWeight: "300",
//                     }}
//                   >
//                     Discover premium villas and apartments in East Bengaluru with Dreams Realty—a new-age real estate advisory, brokerage, and investment firm trusted by IT professionals, NRIs, investors, and top developers.
//                   </p>
//                 )}
//               </div>
//             </div> */}

//             {/* Bottom Section - Stats & Features */}
//             <div style={{ position: "relative", zIndex: 1 }}>
//               {/* Features */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: window.innerWidth <= 480 ? "column" : window.innerWidth <= 1024 ? "column" : "row",
//                   gap: window.innerWidth <= 480 ? "6px" : "12px",
//                   marginTop: window.innerWidth <= 768 ? "20px" : "300px",
//                 }}
//               >
//                 {/* <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
//                       height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: window.innerWidth <= 480 ? "6px" : "10px",
//                       fontSize: window.innerWidth <= 480 ? "10px" : "14px",
//                     }}
//                   >
//                     📍
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Prime Locations
//                     </div>
//                     <div
//                       style={{
//                         fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Handpicked luxury properties in Bengaluru's most sought-after neighborhoods
//                     </div>
//                   </div>
//                 </div> */}

//                 {/* <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
//                       height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: window.innerWidth <= 480 ? "6px" : "10px",
//                       fontSize: window.innerWidth <= 480 ? "10px" : "14px",
//                     }}
//                   >
//                     🏆
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Trusted Guidance
//                     </div>
//                     <div
//                       style={{
//                         fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Transparent, end-to-end support from search to ownership
//                     </div>
//                   </div>
//                 </div> */}

//                 {/* <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
//                     backgroundColor: "rgba(255, 255, 255, 0.08)",
//                     borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
//                     backdropFilter: "blur(8px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
//                       height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
//                       background: "white",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginRight: window.innerWidth <= 480 ? "6px" : "10px",
//                       fontSize: window.innerWidth <= 480 ? "10px" : "14px",
//                     }}
//                   >
//                     ⚡
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         fontWeight: "600",
//                         fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
//                         marginBottom: "1px",
//                       }}
//                     >
//                       Hassle-Free Deals
//                     </div>
//                     <div
//                       style={{
//                         fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
//                         marginTop: "5px",
//                         color: "rgba(255, 255, 255, 0.7)",
//                       }}
//                     >
//                       Quick response, legal assistance, and smooth transactions
//                     </div>
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div className="no"
//             style={{
//               width: window.innerWidth <= 768 ? "100%" : "350px",
//               flex: window.innerWidth <= 768 ? 1 : "none",
//               padding: window.innerWidth <= 480 ? "15px" : window.innerWidth <= 768 ? "20px" : "30px",
//               backgroundColor: "white",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               height: window.innerWidth <= 768 ? "60%" : "100%",
//               overflowY: "auto",
//             }}
//           >
//             {/* Form Header */}
//             <div style={{ textAlign: "center", marginBottom: window.innerWidth <= 480 ? "15px" : "20px" }}>
//               <h3
//                 style={{
//                   fontSize: window.innerWidth <= 480 ? "18px" : window.innerWidth <= 768 ? "20px" : "24px",
//                   fontWeight: "bold",
//                   color: "#1f2937",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Get Started
//               </h3>
//               <p
//                 style={{
//                   color: "#6b7280",
//                   fontSize: window.innerWidth <= 480 ? "12px" : "14px",
//                   lineHeight: "1.4",
//                 }}
//               >
//                 Fill in your details and we'll help you find the perfect property
//               </p>
//             </div>

//             {/* Form Fields */}
//             <div
//               style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: window.innerWidth <= 480 ? "12px" : "16px" 
//               }}
//             >
//               {/* Name Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={request.name}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="Enter your full name"
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: `2px solid ${errors.name ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.name && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.name}
//                   </div>
//                 )}
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={request.phone}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="+91 99999 99999"
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: `2px solid ${errors.phone ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.phone && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.phone}
//                   </div>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={request.email}
//                   onChange={handleInputChange}
//                   onBlur={handleBlur}
//                   placeholder="your.email@example.com"
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`,
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                   }}
//                 />
//                 {errors.email && (
//                   <div
//                     style={{
//                       color: "#ef4444",
//                       fontSize: "12px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {errors.email}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Choose Appartement
//                 </label>
//                 <select
//                   name="propertyType"
//                   value={request.propertyType}
//                   onChange={handleInputChange}
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   <option value="2BHK">2 BHK</option>
//                   <option value="3BHK">3 BHK</option>
//                   <option value="3.5BHK">3.5 BHK</option>
//                   <option value="4BHK">4 BHK</option>
                 
//                 </select>
//               </div>

//               {/* Message Field */}
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Message (Optional)
//                 </label>
//                 <textarea
//                   name="message"
//                   value={request.message}
//                   onChange={handleInputChange}
//                   rows={3}
//                   style={{
//                     width: "100%",
//                     padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
//                     border: "2px solid #e5e7eb",
//                     borderRadius: "8px",
//                     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                     boxSizing: "border-box",
//                     transition: "all 0.2s ease",
//                     resize: "vertical",
//                     minHeight: "80px",
//                   }}
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isContactLoading}
//                 style={{
//                   width: "100%",
//                   padding: window.innerWidth <= 480 ? "10px" : "12px",
//                   background: isContactLoading
//                     ? "#94a3b8"
//                     : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//                   fontWeight: "600",
//                   cursor: isContactLoading ? "not-allowed" : "pointer",
//                   opacity: isContactLoading ? 0.7 : 1,
//                   transition: "all 0.2s ease",
//                   boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//                 }}
//               >
//                 {isContactLoading ? (
//                   <span>Submitting...</span>
//                 ) : (
//                   "Get Property Details"
//                 )}
//               </button>
//             </div>

//             {/* Privacy Note */}
//             <p
//               style={{
//                 fontSize: window.innerWidth <= 480 ? "10px" : "11px",
//                 color: "#6b7280",
//                 textAlign: "center",
//                 lineHeight: "1.4",
//                 marginTop: window.innerWidth <= 480 ? "12px" : "16px",
//               }}
//             >
//               By submitting this form, you agree to our Terms of Service and
//               Privacy Policy. We'll only contact you about relevant property
//               opportunities.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WelcomePopup;

"use client";

import React, { useState, useRef, useEffect } from "react";

// Mock functions for demonstration
const getValue = (obj, path, defaultValue) => {
  const keys = path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  return result !== undefined ? result : defaultValue;
};

const toast = {
  success: (message) => console.log("Success:", message),
  error: (message) => console.log("Error:", message),
};

const isValidPhoneNumber = (phone) => {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
};

const postCreatePropertyEnquiry = async (data) => {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { message: "Thank you for your interest! We will contact you soon." };
};

const WelcomePopup = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isContactLoading, setContactLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const [request, setRequest] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "2BHK",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const validateField = (field, value) => {
    let error = null;

    switch (field) {
      case "name":
        if (!value || value.trim() === "") {
          error = "The name field is required.";
        }
        break;
      case "phone":
        if (!value || value.trim() === "") {
          error = "The phone field is required.";
        } else if (!isValidPhoneNumber(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      case "email":
        if (!value || value.trim() === "") {
          error = "The email field is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "The email field must be a valid email.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });

    // Clear error when user starts typing after submission attempt
    if (hasSubmitted && errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Only show validation errors on blur if the form has been submitted before
    if (hasSubmitted) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleSubmit = async () => {
    setHasSubmitted(true);

    // Validate all fields
    const newErrors = {};
    ["name", "phone", "email"].forEach((field) => {
      const error = validateField(field, request[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setContactLoading(true);
      let data = {
        data: {
          name: request.name,
          phone: request.phone,
          email: request.email,
          propertyType: request.propertyType,
          message: request.message,
        },
      };

      let resp = await postCreatePropertyEnquiry(data);
      if (resp) {
        toast.success(
          getValue(
            resp,
            "message",
            "Thank you for your interest! We will contact you soon."
          )
        );
        setContactLoading(false);
        setRequest({
          name: "",
          phone: "",
          email: "",
          propertyType: "2BHK",
          message: "",
        });
        setErrors({});
        setTouched({});
        setHasSubmitted(false);
        setShowModal(false);
        // Call onClose if provided
        if (onClose) onClose();
      } else {
        setContactLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setContactLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Call onClose if provided
    if (onClose) onClose();
  };

  if (!mounted || !showModal) {
    return null;
  }

  // Dynamic styles based on screen size
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95vw" : isTablet ? "85vw" : "min(70vw, 1100px)",
    maxWidth: isMobile ? "400px" : "none",
    height: isMobile ? "95vh" : isTablet ? "85vh" : "min(85vh, 700px)",
    maxHeight: "95vh",
    backgroundColor: "white",
    borderRadius: isMobile ? "12px" : "16px",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.25)",
    zIndex: 9999,
    overflow: "hidden",
    animation: "slideIn 0.4s ease-out",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
  };

  const closeButtonStyles = {
    position: "absolute",
    top: isMobile ? "12px" : "16px",
    right: isMobile ? "12px" : "16px",
    width: isMobile ? "32px" : "36px",
    height: isMobile ? "32px" : "36px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isMobile ? "18px" : "20px",
    color: "#666",
    zIndex: 10000,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease",
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={closeModal}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 9998,
        }}
      />

      {/* Modal */}
      <div style={modalStyles}>
        {/* Close Button */}
        <button onClick={closeModal} style={closeButtonStyles}>
          ×
        </button>

        <div 
          style={{ 
            display: "flex", 
            height: "100%", 
            width: "100%", 
            flexDirection: isMobile ? "column" : "row" 
          }}
        >
          {/* Left Side - Visual Section */}
          <div
            style={{
              flex: isMobile ? "none" : 1,
              height: isMobile ? "35%" : "100%",
              minHeight: isMobile ? "200px" : "auto",
              position: "relative",
              padding: isMobile ? "16px" : isTablet ? "24px" : "32px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Background Image */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('/pop.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -2,
              }}
            />

            {/* Overlay */}
            {/* <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: -1,
              }}
            /> */}

            {/* Content */}
            {/* <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <h2
                style={{
                  fontSize: isMobile ? "20px" : isTablet ? "24px" : "28px",
                  fontWeight: "bold",
                  marginBottom: isMobile ? "8px" : "12px",
                  lineHeight: "1.2",
                }}
              >
                Welcome to Dreams Realty
              </h2>
              <p
                style={{
                  fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: "1.5",
                  marginBottom: isMobile ? "16px" : "24px",
                }}
              >
                Find your perfect home with our expert guidance
              </p>

              
              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Premium Properties
                  </div>
                  <div
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Expert Support
                  </div>
                </div>
              )}
            </div> */}
          </div>

          {/* Right Side - Form */}
          <div
            style={{
              width: isMobile ? "100%" : isTablet ? "400px" : "450px",
              flex: isMobile ? 1 : "none",
              padding: isMobile ? "20px" : isTablet ? "24px" : "32px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              height: isMobile ? "65%" : "100%",
              overflowY: "auto",
            }}
          >
            {/* Form Header */}
            <div style={{ textAlign: "center", marginBottom: isMobile ? "16px" : "24px" }}>
              <h3
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "8px",
                }}
              >
                Get Started
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.5",
                }}
              >
                Fill in your details and we'll help you find the perfect property
              </p>
            </div>

            {/* Form Fields */}
            <div
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: isMobile ? "16px" : "20px",
                flex: 1,
              }}
            >
              {/* Name Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={request.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    border: `2px solid ${errors.name ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px", // 16px on mobile prevents zoom
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                />
                {errors.name && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "6px",
                    }}
                  >
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={request.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="+91 99999 99999"
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    border: `2px solid ${errors.phone ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                />
                {errors.phone && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "6px",
                    }}
                  >
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={request.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                />
                {errors.email && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "6px",
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Property Type Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Choose Apartment
                </label>
                <select
                  name="propertyType"
                  value={request.propertyType}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    outline: "none",
                  }}
                >
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="3.5BHK">3.5 BHK</option>
                  <option value="4BHK">4 BHK</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={request.message}
                  onChange={handleInputChange}
                  rows={isMobile ? 3 : 4}
                  placeholder="Tell us about your requirements..."
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: isMobile ? "16px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                    minHeight: isMobile ? "80px" : "100px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isContactLoading}
                style={{
                  width: "100%",
                  padding: isMobile ? "14px" : "16px",
                  background: isContactLoading
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: isMobile ? "16px" : "14px",
                  fontWeight: "600",
                  cursor: isContactLoading ? "not-allowed" : "pointer",
                  opacity: isContactLoading ? 0.7 : 1,
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                  marginTop: "8px",
                }}
              >
                {isContactLoading ? (
                  <span>Submitting...</span>
                ) : (
                  "Get Property Details"
                )}
              </button>

              {/* Privacy Note */}
              <p
                style={{
                  fontSize: isMobile ? "12px" : "11px",
                  color: "#6b7280",
                  textAlign: "center",
                  lineHeight: "1.4",
                  marginTop: isMobile ? "12px" : "8px",
                }}
              >
                By submitting this form, you agree to our Terms of Service and
                Privacy Policy. We'll only contact you about relevant property
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePopup;
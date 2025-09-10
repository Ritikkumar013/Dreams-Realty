
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

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

const Popup3 = () => {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isContactLoading, setContactLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [request, setRequest] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "apartment",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
          propertyType: "apartment",
          message: "",
        });
        setErrors({});
        setTouched({});
        setHasSubmitted(false);
        setShowModal(false);
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
  };

  if (!mounted || !showModal) {
    return null;
  }

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
      ></div>

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
           width: "min(58vw, 1200px)",
          height: "min(78vh, 600px)",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 32px 64px rgba(0, 0, 0, 0.25)",
          zIndex: 9999,
          overflow: "hidden",
          animation: "slideIn 0.4s ease-out",
          display: "flex",
          flexDirection: window.innerWidth <= 768 ? "column" : "row",
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: window.innerWidth <= 480 ? "30px" : "36px",
            height: window.innerWidth <= 480 ? "30px" : "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: window.innerWidth <= 480 ? "16px" : "20px",
            color: "#666",
            zIndex: 10000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: window.innerWidth <= 768 ? "column" : "row" }}>
          {/* Left Side - Enhanced Visual Section */}
          <div
            style={{
              flex: window.innerWidth <= 768 ? "none" : 1,
              height: window.innerWidth <= 768 ? "40%" : "100%",
              position: "relative",
              padding: window.innerWidth <= 480 ? "15px" : window.innerWidth <= 768 ? "20px" : "30px",
              color: "white",
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
                backgroundImage: `url('/popupImage.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -2,
              }}
            ></div>

            {/* Solid Overlay */}
            {/* <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.50)",
                zIndex: -1,
              }}
            ></div> */}

            {/* Top Section - Brand & Heading */}
            {/* <div style={{ position: "relative", zIndex: 1 }}>
              
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <Image
                    style={{
                      width: window.innerWidth <= 480 ? "80px" : window.innerWidth <= 768 ? "100px" : "130px", 
                      height: window.innerWidth <= 480 ? "43px" : window.innerWidth <= 768 ? "54px" : "70px", 
                      objectFit: "contain"
                    }}
                    src="/images/logo/white-logo.png"
                    width={window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 100 : 130}
                    height={window.innerWidth <= 480 ? 43 : window.innerWidth <= 768 ? 54 : 70}
                    alt="Dreams Realty Logo"
                  />
                </div>
              </div>

           
              <div style={{ marginBottom: "20px" }}>
                <h2
                  style={{
                    fontSize: window.innerWidth <= 480 ? "16px" : window.innerWidth <= 768 ? "20px" : "24px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    lineHeight: "1.2",
                    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontStyle: "italic"
                  }}
                >
                  Your Luxury Home Awaits
                </h2>
                {window.innerWidth > 768 && (
                  <p
                    style={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.85)",
                      lineHeight: "1.4",
                      fontWeight: "300",
                    }}
                  >
                    Discover premium villas and apartments in East Bengaluru with Dreams Realty—a new-age real estate advisory, brokerage, and investment firm trusted by IT professionals, NRIs, investors, and top developers.
                  </p>
                )}
              </div>
            </div> */}

            {/* Bottom Section - Stats & Features */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: window.innerWidth <= 480 ? "column" : window.innerWidth <= 1024 ? "column" : "row",
                  gap: window.innerWidth <= 480 ? "6px" : "12px",
                  marginTop: window.innerWidth <= 768 ? "20px" : "300px",
                }}
              >
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    style={{
                      width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
                      height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
                      background: "white",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: window.innerWidth <= 480 ? "6px" : "10px",
                      fontSize: window.innerWidth <= 480 ? "10px" : "14px",
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
                        marginBottom: "1px",
                      }}
                    >
                      Prime Locations
                    </div>
                    <div
                      style={{
                        fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
                        marginTop: "5px",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      Handpicked luxury properties in Bengaluru's most sought-after neighborhoods
                    </div>
                  </div>
                </div> */}

                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    style={{
                      width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
                      height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
                      background: "white",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: window.innerWidth <= 480 ? "6px" : "10px",
                      fontSize: window.innerWidth <= 480 ? "10px" : "14px",
                    }}
                  >
                    🏆
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
                        marginBottom: "1px",
                      }}
                    >
                      Trusted Guidance
                    </div>
                    <div
                      style={{
                        fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
                        marginTop: "5px",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      Transparent, end-to-end support from search to ownership
                    </div>
                  </div>
                </div> */}

                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: window.innerWidth <= 480 ? "5px 6px" : "8px 12px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: window.innerWidth <= 480 ? "6px" : "10px",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    style={{
                      width: window.innerWidth <= 480 ? "32px" : window.innerWidth <= 768 ? "40px" : "50px",
                      height: window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "26px" : "32px",
                      background: "white",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: window.innerWidth <= 480 ? "6px" : "10px",
                      fontSize: window.innerWidth <= 480 ? "10px" : "14px",
                    }}
                  >
                    ⚡
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: window.innerWidth <= 480 ? "11px" : window.innerWidth <= 768 ? "13px" : "15px",
                        marginBottom: "1px",
                      }}
                    >
                      Hassle-Free Deals
                    </div>
                    <div
                      style={{
                        fontSize: window.innerWidth <= 480 ? "9px" : window.innerWidth <= 768 ? "10px" : "12px",
                        marginTop: "5px",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      Quick response, legal assistance, and smooth transactions
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="no"
            style={{
              width: window.innerWidth <= 768 ? "100%" : "350px",
              flex: window.innerWidth <= 768 ? 1 : "none",
              padding: window.innerWidth <= 480 ? "15px" : window.innerWidth <= 768 ? "20px" : "30px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: window.innerWidth <= 768 ? "60%" : "100%",
              overflowY: "auto",
            }}
          >
            {/* Form Header */}
            <div style={{ textAlign: "center", marginBottom: window.innerWidth <= 480 ? "15px" : "20px" }}>
              <h3
                style={{
                  fontSize: window.innerWidth <= 480 ? "18px" : window.innerWidth <= 768 ? "20px" : "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "6px",
                }}
              >
                Get Started
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: window.innerWidth <= 480 ? "12px" : "14px",
                  lineHeight: "1.4",
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
                gap: window.innerWidth <= 480 ? "12px" : "16px" 
              }}
            >
              {/* Name Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
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
                    padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
                    border: `2px solid ${errors.name ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: window.innerWidth <= 480 ? "13px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                />
                {errors.name && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
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
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
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
                    padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
                    border: `2px solid ${errors.phone ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: window.innerWidth <= 480 ? "13px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                />
                {errors.phone && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
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
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
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
                    padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
                    border: `2px solid ${errors.email ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: window.innerWidth <= 480 ? "13px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                />
                {errors.email && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Choose Appartement
                </label>
                <select
                  name="propertyType"
                  value={request.propertyType}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: window.innerWidth <= 480 ? "13px" : "14px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
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
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={request.message}
                  onChange={handleInputChange}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: window.innerWidth <= 480 ? "8px 10px" : "10px 12px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: window.innerWidth <= 480 ? "13px" : "14px",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isContactLoading}
                style={{
                  width: "100%",
                  padding: window.innerWidth <= 480 ? "10px" : "12px",
                  background: isContactLoading
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: window.innerWidth <= 480 ? "13px" : "14px",
                  fontWeight: "600",
                  cursor: isContactLoading ? "not-allowed" : "pointer",
                  opacity: isContactLoading ? 0.7 : 1,
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                {isContactLoading ? (
                  <span>Submitting...</span>
                ) : (
                  "Get Property Details"
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <p
              style={{
                fontSize: window.innerWidth <= 480 ? "10px" : "11px",
                color: "#6b7280",
                textAlign: "center",
                lineHeight: "1.4",
                marginTop: window.innerWidth <= 480 ? "12px" : "16px",
              }}
            >
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy. We'll only contact you about relevant property
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup3;
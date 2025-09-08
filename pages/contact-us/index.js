"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { postCreatePropertyEnquiry } from "@services/APIs/common.service";
import PreviousPage from "@components/previous-page";
import DynamicBreadcrumb from "@components/breadcrumbs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

const Layout = dynamic(() => import("@components/layout.js"));

export default function ContactUs() {
  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        phone: {
          message: "Please enter a valid phone number",
          rule: (val, params, validator) => {
            try {
              if (!val) return false;
              // Remove spaces and any other non-digit characters except +
              const cleanedValue = val.replace(/[^\d+]/g, "");
              return isValidPhoneNumber(cleanedValue);
            } catch (error) {
              return false;
            }
          },
        },
      },
    })
  );

  const [request, setRequest] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const [isContactLoading, setContactLoading] = useState(false);
  const [, forceUpdate] = useState(0);
  const [isChecked, setIsChecked] = useState(true);
  const [phoneError, setPhoneError] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePhoneChange = (value, country) => {
    try {
      // Don't manipulate the value directly, let react-phone-input-2 handle it
      setRequest((prev) => ({ ...prev, phone: `+${value}` }));

      // Validate phone number only if there's a value
      if (value) {
        try {
          const phoneNumberWithPlus = `+${value}`;
          if (!isValidPhoneNumber(phoneNumberWithPlus)) {
            setPhoneError("Please enter a valid phone number");
          } else {
            setPhoneError("");
          }
        } catch (error) {
          setPhoneError("Please enter a valid phone number");
        }
      } else {
        setPhoneError("");
      }
    } catch (error) {
      console.error("Phone validation error:", error);
    }
  };

  const handleSubmit = async () => {
    // Add phone validation before form submission
    try {
      if (request.phone) {
        const isValid = isValidPhoneNumber(request.phone);
        if (!isValid) {
          setPhoneError("Please enter a valid phone number");
          return;
        }
      }
    } catch (error) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    const formValid = validator.current.allValid();
    if (!formValid || phoneError) {
      validator.current.showMessages();
      forceUpdate(1);
      return;
    }
    try {
      setContactLoading(true);
      let data = {
        data: {
          name: request.name,
          phone: request.phone,
          email: request.email,
          comment: request.comment,
        },
      };
      let resp = await postCreatePropertyEnquiry(data);
      if (resp) {
        toast.success(getValue(resp, "message", "Submitted successfully"));
        setContactLoading(false);
        setRequest({
          ...request,
          name: "",
          phone: "",
          email: "",
          comment: "",
        });
        validator.current.hideMessages();
        forceUpdate(0);
      } else {
        setContactLoading(false);
      }
    } catch (error) {
      setContactLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;

    const filteredValue = value.replace(/[0-9]/g, "");

    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: filteredValue,
    }));
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Contact Us" },
  ];

  return (
    <Layout>
      <section className="contact-us-wrapper">
        <div className="contact-us-wrapper--banner-wrapper">
          <div className="d-flex flex-direction-contact-column-mobile flex-direction-column-tablet position-relative">
            <div className="contact-us-wrapper--banner-wrapper--banner-meta">
              <div className="banner-header">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15550.704920332148!2d77.7331093!3d12.9925483!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4c854df840a4a56f!2sDreams%20Realty!5e0!3m2!1sen!2sin!4v1625655683165!5m2!1sen!2sin"
                  width="100%"
                  height="276px"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="partner-with-us-banner-wrapper--form-wrapper">
              <h3>Get Support</h3>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="full_name" className="label-contact">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    className="form-control form-control-height contact-form-control"
                    value={getValue(request, "name", "")}
                    onChange={handleNameChange}
                  />
                  <span className="form-error">
                    {validator.current.message(
                      "Name",
                      getValue(request, "name", ""),
                      "required"
                    )}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="fullname" className="label-contact">
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="form-control form-control-height contact-form-control"
                    value={getValue(request, "email", "")}
                    onChange={handleChange}
                  />
                  <span className="form-error">
                    {validator.current.message(
                      "Email",
                      getValue(request, "email", ""),
                      "required|email"
                    )}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="label-contact">
                    Phone Number
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={request.phone.replace(/^\+/, "")}
                    onChange={handlePhoneChange}
                    inputClass="form-control form-control-height w-100 custom-phone-input"
                    containerClass="phone-input-container"
                    inputProps={{
                      name: "phone",
                      id: "phone",
                      required: true,
                    }}
                    countryCodeEditable={false}
                    enableSearch={true}
                    disableCountryCode={false}
                    preserveOrder={["onlyCountries", "preferredCountries"]}
                  />
                  <span className="form-error">
                    {phoneError ||
                      validator.current.message(
                        "Phone Number",
                        request.phone,
                        "required|phone"
                      )}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="comments" className="label-contact">
                    Comments
                  </label>
                  <textarea
                    type="text"
                    name="comment"
                    id="comment"
                    className="form-control form-control-height contact-form-control"
                    rows="6"
                    value={getValue(request, "comment", "")}
                    onChange={handleChange}
                    placeholder="Enter Comments"
                  />
                  <span className="form-error">
                    {validator.current.message(
                      "Comment",
                      getValue(request, "comment", ""),
                      "required"
                    )}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-baseline">
                <input
                  type="checkbox"
                  id="scales"
                  name="scales"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  style={{ paddingTop: "3px" }}
                />
                <label
                  for="scales"
                  style={{ fontSize: "12px", marginLeft: "10px" }}
                >
                  I authorize company representatives to Call, SMS, Email or
                  WhatsApp me about its products and offers. This consent
                  overrides any registration for DNC/NDNC.
                </label>
              </div>
              <div className="text-right mt-4">
                <button
                  className="theme-button theme-primary-btn bold-font mb-0"
                  onClick={handleSubmit}
                  disabled={!isChecked}
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-us-wrapper--contact-section">
          <div className="custom-container">
            <div className="d-flex align-items-center mb-4">
              <PreviousPage isCompact={false} />
              <div style={{ marginTop: "28px", marginLeft: "30px" }}>
                <DynamicBreadcrumb items={breadcrumbItems} />
              </div>
            </div>
            <div className="banner-footer mt-4 ">
              <h1 style={{ fontSize: "2rem" }}>
                Real estate: Where your home dreams come true
              </h1>
              <ul className="mt-2">
                <li>
                  <h4 className="my-3">
                    Passionate about simplifying property decisions. We offer
                    personal consultation and extensive online ecosystem. We are
                    here to help you on any queries. Also, you can request
                    virtual tour today.
                  </h4>
                </li>
                <li className="contact-address d-flex align-items-center gap-2">
                  <img
                    src="/images/footer-icons/phone-copy.svg"
                    className="mr-3"
                    alt="phone-icon"
                  />
                  <div className="contact-address">
                    <a href="tel:00919663982707" style={{ color: "#3c67a4" }}>
                      +91 966 398 2707
                    </a>{" "}
                    /{" "}
                    <a href="tel:+919513882269" style={{ color: "#3c67a4" }}>
                      +91 95138 82269
                    </a>{" "}
                    /
                    <a href="tel:+919069979997" style={{ color: "#3c67a4" }}>
                      +91 90699 79997
                    </a>
                  </div>
                </li>
                <li className="contact-address d-flex align-items-center gap-2">
                  <img
                    src="/images/footer-icons/mail-copy.svg"
                    className="mr-3"
                    alt="mail-icon"
                  />
                  <a
                    href="mailto:info@dreamsrealty.co.in"
                    style={{ color: "#3c67a4" }}
                  >
                    info@dreamsrealty.co.in
                  </a>
                </li>
                <li className="contact-address address d-flex align-items-start gap-2">
                  <img
                    src="/images/footer-icons/address.svg"
                    className="mr-3"
                    alt="building-icon"
                  />
                  No 8, 2nd floor, Nandi Infotech, Above SBI Bank, 1st Main
                  Road, ITPL Main Road, Whitefield, Bengaluru, Karnataka 560048
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

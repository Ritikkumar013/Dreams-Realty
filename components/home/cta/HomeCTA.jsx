import React, { useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import { getValue } from "../../../utils/lodash";
import {
  postCreateSalePropertyEnquiry,
  postCreateRentPropertyEnquiry,
} from "../../../services/APIs/common.service";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const HomeCTA = ({ modal, toggle, type, id }) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [isContactLoading, setContactLoading] = useState(false);
  const [, forceUpdate] = useState(0);

  const [request, setRequest] = useState({
    name: "",
    phone: "",
    comment: "",
  });

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

  // Add this function to validate phone independently
  const validatePhone = (phoneValue) => {
    if (!phoneValue) {
      setPhoneError("Phone number is required");
      return false;
    } else if (!isValidPhoneNumber(phoneValue)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    } else {
      setPhoneError(""); // Clear error if valid
      return true;
    }
  };

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // First, trigger validation for all fields
    const formValid = simpleValidator.current.allValid();

    // Explicitly validate phone (add this)
    const isPhoneValid = validatePhone(request.phone);

    if (!formValid || !isPhoneValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1); // Ensure re-render for errors
      return;
    } else {
      if (type === "rent") {
        try {
          setContactLoading(true);
          let data = {
            data: {
              name: request.name,
              phone: "+91" + request.phone,
              comment: request.comment,
              rent_property: id,
            },
          };
          let resp = await postCreateRentPropertyEnquiry(data);
          if (resp) {
            toast.success(getValue(resp, "message", "Sent successfully"));
            setContactLoading(false);
            setRequest({
              ...request,
              name: "",
              phone: "",
              comment: "",
            });
            setPhoneError("");
            simpleValidator.current.hideMessages();
            forceUpdate(0);
            toggle();
          } else {
            setContactLoading(false);
          }
        } catch (error) {
          setContactLoading(false);
        }
      } else {
        try {
          setContactLoading(true);
          let data = {
            data: {
              name: request.name,
              phone: "+91" + request.phone,
              comment: request.comment,
              sale_property: id,
            },
          };
          let resp = await postCreateSalePropertyEnquiry(data);
          if (resp) {
            toast.success(getValue(resp, "message", "Sent successfully"));
            setContactLoading(false);
            setRequest({
              ...request,
              name: "",
              phone: "",
              comment: "",
            });
            simpleValidator.current.hideMessages();
            forceUpdate(0);
            toggle();
          } else {
            setContactLoading(false);
          }
        } catch (error) {
          setContactLoading(false);
        }
      }
    }
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePhoneChange = (value) => {
    setRequest((prev) => ({ ...prev, phone: `+${value}` }));
    validatePhone(`+${value}`);
  };

  const handleToggle = () => {
    setRequest({
      ...request,
      name: "",
      phone: "",
      comment: "",
    });
    setPhoneError("");
    simpleValidator.current.hideMessages();
    forceUpdate(0);
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Contact us</ModalHeader>
      <ModalBody>
        <div
          className="property-details-wrapper--body--contact-us"
          style={{ maxWidth: "100%", boxShadow: "none" }}
        >
          {/* <h3 className="property-details-title p-0 m-0">Contact us</h3> */}
          <p className="contact-sub-text">
            We are here to help you on any queries. Also, you can request
            virtual tour today.
          </p>
          <div className="contact-form">
            <div className="form-group contact-elements m-0">
              <label className="contact-label" htmlFor="name">
                Name *
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                id="name"
                value={getValue(request, "name", "")}
                onChange={handleChange}
                name="name"
                className="form-control contact-form-control"
              />
              {simpleValidator.current.message(
                "name",
                getValue(request, "name", ""),
                "required"
              ) && (
                <span className="form-error mb-0">
                  {simpleValidator.current.message(
                    "name",
                    getValue(request, "name", ""),
                    "required"
                  )}
                </span>
              )}
            </div>
            <div className="form-group contact-elements my-3">
              <label className="contact-label" htmlFor="mobile">
                Mobile Number *
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
                placeholder="Enter Mobile Number"
              />
              {phoneError && (
                <span className="form-error mb-0">{phoneError}</span>
              )}
            </div>
            <div className="form-group contact-elements m-0">
              <label className="contact-label" htmlFor="comments">
                Comments
              </label>
              <textarea
                rows="5"
                placeholder="Enter Comments"
                className="form-control contact-form-control"
                id="comment"
                value={getValue(request, "comment", "")}
                onChange={handleChange}
                name="comment"
              />
              {simpleValidator.current.message(
                "comment",
                getValue(request, "comment", ""),
                "required"
              ) && (
                <span className="form-error">
                  {simpleValidator.current.message(
                    "comment",
                    getValue(request, "comment", ""),
                    "required"
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="d-flex align-items-baseline mb-3">
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              for="scales"
              style={{ fontSize: "12px", marginLeft: "10px" }}
            >
              I authorize company representatives to Call, SMS, Email or
              WhatsApp me about its products and offers. This consent overrides
              any registration for DNC/NDNC.
            </label>
          </div>
          <button
            className="theme-button theme-primary-btn w-100"
            onClick={handleSubmit}
            disabled={!isChecked || isContactLoading}
          >
            {isContactLoading ? "Submitting" : "Submit"}
          </button>

          <p className="contact-call-details text-center">
            Or Call{" "}
            <a href="tel:00919663982707" className="contact-call-details">
              +91 966 398 2707
            </a>{" "}
            /{" "}
            <a href="tel:+919513882269" className="contact-call-details">
              +91 95138 82269
            </a>{" "}
            /
            <a href="tel:+919069979997" className="contact-call-details">
              +91 90699 79997
            </a>
          </p>
          <div className="text-center">
            <a
              href="mailto:info@dreamsrealty.co.in"
              style={{ color: "#3c67a4" }}
              className="contact-call-details text-center w-100"
            >
              info@dreamsrealty.co.in
            </a>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default HomeCTA;

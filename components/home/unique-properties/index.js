import React, { useState } from "react";
import { getValue } from "/utils/lodash";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function UniqueProperties(props) {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handlePhoneChange = (value) => {
    props.setRequest((prev) => ({ ...prev, phone: `+${value}` }));

    // Validate phone number
    props.validatePhone(`+${value}`);
  };

  return (
    <div className="custom-container py-5">
      <section className="property-wrapper">
        <div className="property-form">
          <h3>Let our experts do the searching</h3>
          <h2>
            Get personalised access to unique properties to match your needs
          </h2>
          <div className="form-group d-flex align-items-lg-start gap-md-3 mb-0 flex-direction-column-mobile">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                id="person-name"
                className="form-control"
                value={getValue(props, "request.name", "")}
                onChange={props.handleChange}
                name={"name"}
              />
              {props.simpleValidator.current.message(
                "name",
                getValue(props, "request.name", ""),
                "required"
              ) && (
                <span className="form-error mb-0">
                  {props.simpleValidator.current.message(
                    "name",
                    getValue(props, "request.name", ""),
                    "required"
                  )}
                </span>
              )}
            </div>
            <div>
              <PhoneInput
                country={"in"}
                value={props.request.phone.replace(/^\+/, "")}
                onChange={handlePhoneChange}
                inputClass="form-control form-control-height w-100 custom-home-phone-input"
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
              {props.phoneError && (
                <span className="form-error mb-0">{props.phoneError}</span>
              )}
            </div>
            <button
              className="theme-button theme-secondary-btn"
              onClick={props.handleSubmit}
              disabled={!isChecked}
              style={{ height: "60px" }}
            >
              {!props.isContactLoading ? "submit" : "Please wait..."}
            </button>
          </div>
          <div className="d-flex align-items-baseline mt-3">
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
              style={{ fontSize: "12px", marginLeft: "10px", color: "#fff" }}
            >
              I authorize company representatives to Call, SMS, Email or
              WhatsApp me about its products and offers. <br />
              This consent overrides any registration for DNC/NDNC.
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

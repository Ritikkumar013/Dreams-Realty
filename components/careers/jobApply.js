import React, { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { fetchCarrerApplication } from "@services/APIs/common.service";
import { useParams } from "next/navigation";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function JobApply({ openInModal, currentCareer, postId }) {
  const [documents, setDocuments] = useState([]);
  const [request, setRequest] = useState({
    name: "",
    email: "",
    phone: "",
    career: 0,
    locale: "en",
    document: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);
  const router = useRouter();
  const params = useParams();

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    // Validate file type
    const allowedTypes = [".pdf"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setUploadStatus("Please upload a PDF or Word document.");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadStatus("File size must be less than 5MB.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const formData = new FormData();
      formData.append("files", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadStatus(`Uploading: ${percentCompleted}%`);
          },
        }
      );

      if (response.data) {
        setDocuments([response.data[0]]);
        setUploadStatus("File uploaded successfully.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus(
        error.response?.data?.message ||
          "Error uploading file. Please try again."
      );
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  };

  const removeDocument = () => {
    setDocuments([]);
    setUploadStatus("");
  };

  const selectFile = () => {
    document.getElementById("file-upload").click();
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
      try {
        setIsLoading(true);
        const payload = {
          data: {
            name: request.name,
            email: request.email,
            phone: request.phone,
            document: documents[0].id,
            career: parseInt(params.postId),
            locale: "en",
          },
        };

        const response = await fetchCarrerApplication(payload);

        if (response) {
          setRequest({
            name: "",
            email: "",
            phone: "",
            career: 0,
            locale: "en",
            document: "",
          });
          setPhoneError("");
          setDocuments([]);
          setUploadStatus("");
          simpleValidator.current.hideMessages();
          forceUpdate(0);
          toast.success("Application submitted successfully");
          router.push("/create-thankyou");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error submitting application"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setRequest((prev) => ({ ...prev, phone: `+${value}` }));
    validatePhone(`+${value}`);
  };

  return (
    <div className="job-apply-container">
      {!openInModal && <h3>Apply Now</h3>}
      <p className="contact-sub-text">
        By clicking "Apply Now," I understand and agree to terms and conditions
      </p>
      <div className="contact-form">
        <div className="form-group">
          <label className="contact-label" htmlFor="name">
            Name *
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            className="form-control contact-form-control"
            value={request.name}
            onChange={handleChange}
            name="name"
          />
          {simpleValidator.current.message(
            "Name",
            request.name,
            "required"
          ) && (
            <span className="form-error">
              {simpleValidator.current.message(
                "Name",
                request.name,
                "required"
              )}
            </span>
          )}
        </div>

        <div className="form-group mt-3">
          <label className="contact-label" htmlFor="email">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            name="email"
            className="form-control contact-form-control"
            value={request.email}
            onChange={handleChange}
          />
          {simpleValidator.current.message(
            "Email",
            request.email,
            "required|email"
          ) && (
            <span className="form-error">
              {simpleValidator.current.message(
                "Email",
                request.email,
                "required|email"
              )}
            </span>
          )}
        </div>

        <div className="form-group my-3">
          <label className="contact-label" htmlFor="phone">
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
          {phoneError && <span className="form-error mb-0">{phoneError}</span>}
        </div>

        <div className="form-group">
          <label className="contact-label">Resume/CV *</label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div
            className="resume-drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <p>Drag & Drop Files Here</p>
            <p>Or</p>
            <button
              type="button"
              className="select-file-btn"
              onClick={selectFile}
            >
              Select a file
            </button>
            <p className="file-hint">Accepted formats: PDF(Max 5MB)</p>
          </div>

          {uploadStatus && (
            <p
              className={`upload-status ${
                uploadStatus.includes("Error") ? "error" : ""
              }`}
            >
              {uploadStatus}
            </p>
          )}

          {documents.length > 0 && (
            <div className="attached-file">
              <p>{documents[0].name}</p>
              <button
                type="button"
                onClick={removeDocument}
                className="remove-file"
                aria-label="Remove file"
              >
                <img src="/images/closeSVG.svg" alt="Remove" />
              </button>
            </div>
          )}
          {simpleValidator.current.message(
            "Resume/CV",
            documents,
            "required"
          ) && (
            <span className="form-error">
              {simpleValidator.current.message(
                "Resume/CV",
                documents,
                "required"
              )}
            </span>
          )}
        </div>

        <button
          type="button"
          className="theme-button theme-primary-btn w-100 mt-4"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default JobApply;

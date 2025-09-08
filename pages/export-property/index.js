import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Layout = dynamic(() => import("@components/layout"));

const ExportProperty = () => {
  const [jwt, setJwt] = useState(null);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [activeTabHome, setActiveTabHome] = useState("1");
  const [downloadFile, setDownloadFile] = useState("");

  useEffect(() => {
    const value = localStorage.getItem("token");
    setJwt(value);

    // const handleBeforeUnload = (e) => {
    //   // Check if the sessionStorage indicates the page is being refreshed
    //   if (!sessionStorage.getItem("isRefreshing")) {
    //     setJwt(null);
    //     setIsAdmin(false);
    //     localStorage.removeItem("token");
    //   }
    // };

    // const handleUnload = () => {
    //   // Set the session flag when the page is refreshed
    //   sessionStorage.setItem("isRefreshing", "true");
    // };

    // const handleLoad = () => {
    //   // Remove the session flag once the page is loaded (refresh complete)
    //   sessionStorage.removeItem("isRefreshing");
    // };

    // // Add event listeners for browser close and page load/unload
    // window.addEventListener("beforeunload", handleBeforeUnload);
    // window.addEventListener("unload", handleUnload);
    // window.addEventListener("load", handleLoad);

    // return () => {
    //   // Clean up event listeners when the component unmounts
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    //   window.removeEventListener("unload", handleUnload);
    //   window.removeEventListener("load", handleLoad);
    // };
  }, [activeTabHome]);

  useEffect(() => {
    if (jwt) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [jwt]);

  const handleLogout = () => {
    setJwt(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split(".").pop();

      if (fileExtension !== "xlsx") {
        toast.error("Please select a valid .xlsx file.");
        setSelectedFile(null);
        event.target.value = null;
      } else {
        setSelectedFile(file);
      }
    } else {
      toast.error("Please select a file.");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sale-property-import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Uploaded successfully");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadData = async () => {
    setIsDataLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${
          activeTabHome === "1" ? "sale" : "rent"
        }-property-export`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const downloadUrl = response.data.downloadUrl;
      setDownloadFile(response);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `property-${activeTabHome === "1" ? "sale" : "rent"}-export.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to download data, please try again.");
    } finally {
      setIsDataLoading(false);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleActiveTabHome = async (value) => {
    setActiveTabHome(value);
  };

  return (
    <Layout isAdmin={isAdmin} toggleModal={toggleModal}>
      {jwt ? (
        <div className="custom-container py-4">
          <div className="property-list-wrapper--banner-links custom-container mt-4 ps-0">
            <ul>
              <li>
                <a
                  className={
                    activeTabHome === "1"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("1")}
                >
                  Properties to Buy
                </a>
              </li>
              <li>
                <a
                  className={
                    activeTabHome === "2"
                      ? "active cursor-pointer"
                      : "cursor-pointer"
                  }
                  onClick={() => handleActiveTabHome("2")}
                >
                  Properties to Rent
                </a>
              </li>
            </ul>
          </div>
          {activeTabHome === "1" && <h3>Import Property</h3>}

          {jwt && (
            <div className="mb-5">
              {activeTabHome === "1" && (
                <div className="mt-4 d-flex align-items-center gap-3 flex-wrap">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx"
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="file-upload-btn">
                    {selectedFile ? selectedFile.name : "Choose File"}
                  </label>
                  <button
                    onClick={handleFileUpload}
                    className="theme-button header-btn theme-primary-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Upload File"}
                  </button>
                </div>
              )}

              <div className="mt-5 property-location-wrapper d-flex align-items-center flex-column justify-content-center gap-3 flex-wrap px-3">
                <button
                  onClick={handleDownloadData}
                  className="theme-button header-btn theme-primary-btn"
                  disabled={isDataLoading}
                >
                  {isDataLoading ? "Downloading..." : "Download Data"}
                </button>
                {downloadFile && (
                  <a href={downloadFile.data.downloadUrl} target="__blank">
                    {downloadFile.data.downloadUrl}
                  </a>
                )}
              </div>

              <Modal
                isOpen={modal}
                toggle={toggleModal}
                className="reactstrap-modal"
              >
                <ModalBody>Do you want to logout?</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          )}
        </div>
      ) : (
        <div className=" d-flex justify-content-center my-5 py-5">
          You have no access to this page.
        </div>
      )}
    </Layout>
  );
};

export default ExportProperty;

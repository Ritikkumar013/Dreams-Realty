import React from "react";
import { getValue } from "/utils/lodash";
import Link from "next/link";
import UploadSVG from "@components/svg/upload-svg";

function ListStepTab4(props) {
  const {
    handleSubmit,
    uploadImage,
    handleSubmitTab,
    imageList,
    isLoading,
    handleRemoveImages,
  } = props;
  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        {/* <h2>Photos</h2>
								<p className="mb-4">
									90% Property Seekers contact on properties with Photos
								</p> */}
        <label className="label-contact">Property Images</label>
        <div className="d-flex justify-content-start">
          <label className="file-upload-lg">
            <div className="text-center">
              <UploadSVG />
              <h4>Upload Photo</h4>
              <p>Upload Pictures - JPG or PNG (1087px X 569px) Minimum</p>
            </div>
            <input
              type="file"
              name="upload"
              id="upload"
              onChange={(e) => uploadImage(e)}
              multiple
            />
          </label>
        </div>
        <hr className="my-4" />
        {
          // isLoading ? (
          // 	<p className="text-center mt-3">Please wait...</p>
          // ) :
          getValue(props, `imageList.length`, 0) > 0 ? (
            <div className="row">
              {getValue(props, `imageList`, []).map((item, index) => {
                return (
                  <div key={index} className="col-sm-2 col-md-3 col-lg-4 mb-3">
                    <div className="img-photo">
                      <img
                        alt="photo-icon"
                        src={
                          getValue(item, `url`, "")
                            ? process.env.NEXT_PUBLIC_API_URL +
                              getValue(item, `url`, "")
                            : "/images/insert_photo-24px.svg"
                        }
                      />
                      <button
                        class="btn-close"
                        onClick={() => handleRemoveImages(index)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center mt-2 mb-2">No Data Found</p>
          )
        }
        <div className="mt-4 mb-5 d-flex gap-3 flex-wrap">
          <button
            className="theme-button theme-secondary-btn mr-3"
            onClick={() => handleSubmitTab(3)}
          >
            Previous
          </button>
          <button
            className="theme-button theme-primary-btn mr-3"
            onClick={() => handleSubmit()}
            disabled={getValue(props, `imageList.length`, 0) === 0}
          >
            Submit
          </button>
          <Link href="/">
            <button className="theme-button theme-secondary-btn mr-3">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListStepTab4;

import React, { useEffect, useState } from "react";
import Layout from "@components/layout.js";
import { getValue } from "/utils/lodash";
import axios from "axios";
import Link from "next/link";
import { Button } from "reactstrap";
import ProfileSVG from "@components/svg/profile-svg";
import AlbumSVG from "@components/svg/album-svg";
import PropertySVG from "@components/svg/property-svg";
import MapSVG from "@components/svg/map-svg";
import UploadSVG from "@components/svg/upload-svg";
import {
  fetchRentProperties,
  fetchSaleProperties,
  fetchUpdateRentProperty,
  fetchUpdateSaleProperty,
} from "@services/APIs/common.service";
function ListStep4(props) {
  /* -------------------------------------------------------------------------- */
  /*                               Use State Section                            */
  /* -------------------------------------------------------------------------- */
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                               Use effect Section                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    getData();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               API Section                                  */
  /* -------------------------------------------------------------------------- */

  const uploadImage = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((image) => {
        formData.append("files", image);
      });
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: "Bearer " + authToken,
          },
        })
        .then(async (res) => {
          if (props.type === "sale") {
            let data = {
              data: {
                images: getValue(res, `data`, []).map((item) => item.id),
              },
              where: { id: props.id },
            };
            let resp = await fetchUpdateSaleProperty(data);
            if (resp) {
              e.target.getValue = null;
              getData();
            }
          } else {
            let data = {
              data: {
                images: getValue(res, `data`, []).map((item) => item.id),
              },
              where: { id: props.id },
            };
            let resp = await fetchUpdateRentProperty(data);
            if (resp) {
              getData();
            }
          }
        })
        .catch((err) => {});
    }
  };
  const getData = async () => {
    if (props.type === "sale") {
      try {
        setIsLoading(true);
        let resp = await fetchSaleProperties(props.id);
        if (resp) {
          setIsLoading(false);
          setImageList(getValue(resp, `saleProperty.images`, []));
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      try {
        let resp = await fetchRentProperties(props.id);
        setIsLoading(true);
        if (resp) {
          setImageList(getValue(resp, `rentProperty.images`, []));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="position-relative">
        <ul className="flight-tabs-ul">
          <li>
            <Button color="nothing">
              <span className="flight-tabs-icon">
                <ProfileSVG />
              </span>
              <span className="flight-tabs-text">Your Details</span>
            </Button>
          </li>
          <li>
            <Link href={`/list-step2/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <PropertySVG />
                </span>
                <span className="flight-tabs-text">Property Listing/Type</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link href={`/list-step3/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <MapSVG />
                </span>
                <span className="flight-tabs-text">Property Details</span>
              </Button>
            </Link>
          </li>
          <li className="active">
            <Link href={`/list-step4/${props.id}/${props.type}`}>
              <Button color="nothing">
                <span className="flight-tabs-icon">
                  <AlbumSVG />
                </span>
                <span className="flight-tabs-text">Property Photos</span>
              </Button>
            </Link>
          </li>
        </ul>
        <section className="list-step1">
          <div className="custom-container">
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
                      <p>
                        Upload Pictures - JPG or PNG (1087px X 569px) Minimum
                      </p>
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
                {isLoading ? (
                  <p className="text-center mt-3">Please wait...</p>
                ) : imageList.length > 0 ? (
                  <div className="row">
                    {imageList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="col-sm-2 col-md-3 col-lg-4 mb-3"
                        >
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
                            {/* <button class="btn-close">&times;</button> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center mt-2 mb-2">No Data Found</p>
                )}
                <div className="mt-4 mb-5">
                  <Link href={`/create-thankyou`}>
                    <button className="theme-button theme-primary-btn mr-3">
                      Submit
                    </button>
                  </Link>
                  <Link href={`/list-step3/${props.id}/${props.type}`}>
                    <button className="theme-button theme-secondary-btn mr-3">
                      Previous
                    </button>
                  </Link>

                  <Link href="/">
                    <button className="theme-button theme-secondary-btn mr-3">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ListStep4;

export async function getServerSideProps({ query }) {
  const id = query.id[0];
  const type = query.id[1];
  return {
    props: {
      id,
      type,
    },
  };
}

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { fetchBlogs } from "@services/APIs/common.service";
import Head from "next/head";

const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
const PreviousPage = dynamic(() => import("@components/previous-page"));
const Layout = dynamic(() => import("@components/layout.js"));

export default function BlogPage(props) {
  const blog = getValue(props, "blog", "");
  const [showSharePopup, toogleSharePopup] = useState(false);

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Link copied to clipboard");
  };

  const redirectToWhatsApp = () => {
    const currentUrl = window.location.href;
    const message = `?text=${currentUrl}`;
    const whatsappUrl = detectMobileDevice()
      ? `whatsapp://send${message}`
      : `https://web.whatsapp.com/send${message}`;
    window.location.href = whatsappUrl;
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Blog", link: "/blog" },
    { label: blog?.title || "", link: "" },
  ];

  if (!blog) {
    return (
      <Layout>
        <div className="blog-wrapper">
          <div className="custom-container">
            <h1>Blog not found</h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>
          {props.meta_title
            ? props.meta_title
            : "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"}
        </title>
        <meta
          property="og:title"
          content={
            props.meta_title
              ? props.meta_title
              : "Dreams Realty | Real Estate | Property in Bangalore | Buy/Sale Properties"
          }
        />
        {/* <meta
                name="description"
                content={`${metaDescription}Helloo`}
              /> */}
        <meta
          name="description"
          content={
            props.meta_description
              ? props.meta_description
              : "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          }
        />
        <meta name="keywords" content={props.keywords ? props.keywords : ""} />
        <meta
          property="og:url"
          content={typeof window !== "undefined" && window.location.href}
        />
        {/* <meta
              property="og:description"
              content={getValue(
                props,
                "meta_description",
                "Search Real Estate Properties in Bangalore , the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
              )}
            /> */}
        <meta
          property="og:image"
          content={getValue(
            props,
            "meta_image",
            "backend.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
          )}
        />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertyStructuredData),
          }}
        /> */}

        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <section className="blog-wrapper">
          <div className="d-flex align-items-center">
            <PreviousPage isCompact={false} />
            <div style={{ marginTop: "36px", marginLeft: "30px" }}>
              <DynamicBreadcrumb items={breadcrumbItems} />
            </div>
          </div>
          <div className="custom-container">
            <div className="blog-wrapper--title">
              <h4 className="blog-name-guidelines">
                {getValue(blog, "title", "")}
              </h4>
              <div className="blog-release-date">
                <ul className="d-flex align-items-center">
                  <li>
                    <Moment format="MMM DD, YYYY">
                      {getValue(blog, "createdAt", "")}
                    </Moment>
                  </li>
                  <li className="dot"></li>
                  <li>6 Mins read</li>
                  <li className="dot"></li>
                  <li
                    className="d-flex align-items-center cursor-pointer"
                    onClick={() => toogleSharePopup(!showSharePopup)}
                  >
                    <img
                      src="/images/guidelines/share-icon.svg"
                      className="img-fluid mr-2"
                      alt="share-icon"
                    />
                    Share
                  </li>
                </ul>
              </div>
              <div className="title-description mb-3">
                <p
                  dangerouslySetInnerHTML={{
                    __html: getValue(blog, `content`, ""),
                  }}
                ></p>
              </div>
            </div>
          </div>
          <div
            className={
              showSharePopup
                ? "share-review-popup active"
                : "share-review-popup"
            }
          >
            <div className="share-review-popup-wrapper">
              <div className="share-review-popup-wrapper__header d-flex align-items-center justify-content-between">
                <h2
                  className="share-review-popup-wrapper__title"
                  onClick={() => toogleSharePopup(!showSharePopup)}
                >
                  Share
                </h2>
                <img
                  src="/images/closeSVG.svg"
                  className="img-fluid cursor-pointer"
                  onClick={() => {
                    toogleSharePopup(false);
                  }}
                  alt="close-icon"
                />
              </div>
              <div className="share-review-popup-wrapper__body">
                <div className="cursor-pointer" onClick={redirectToWhatsApp}>
                  <img
                    src="/images/rewars-share-icons/whatsapp.png"
                    className="img-fluid"
                    alt="whatsapp-icon"
                  />
                  <p className="share-review-popup-wrapper__text">WhatsApp</p>
                </div>

                <div className="share-review-popup-wrapper__icons">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${
                      typeof window !== "undefined" ? window.location.href : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/rewars-share-icons/facebook.png"
                      className="img-fluid"
                      alt="facebook-icon"
                    />
                    <p className="share-review-popup-wrapper__text">Facebook</p>
                  </a>
                </div>

                <div className="share-review-popup-wrapper__icons">
                  <a
                    href={`http://twitter.com/share?url=${
                      typeof window !== "undefined" ? window.location.href : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/rewars-share-icons/twitter.png"
                      className="img-fluid share-review-popup-wrapper__img-border"
                      alt="twitter-icon"
                    />
                    <p className="share-review-popup-wrapper__text">Twitter</p>
                  </a>
                </div>

                <div className="share-review-popup-wrapper__icons">
                  <a
                    href={`https://www.linkedin.com/shareArticle?url=${
                      typeof window !== "undefined" ? window.location.href : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/rewars-share-icons/linkedin.png"
                      className="img-fluid share-review-popup-wrapper__img-border"
                      alt="linkedin-icon"
                    />
                    <p className="share-review-popup-wrapper__text">LinkedIn</p>
                  </a>
                </div>

                <div className="share-review-popup-wrapper__icons">
                  <a
                    target="_blank"
                    href={`mailto:?subject=&body=${
                      typeof window !== "undefined" ? window.location.href : ""
                    }`}
                  >
                    <img
                      src="/images/rewars-share-icons/email.png"
                      className="img-fluid share-review-popup-wrapper__img-border"
                      alt="email-icon"
                    />
                    <p className="share-review-popup-wrapper__text">Email</p>
                  </a>
                </div>

                <div
                  className="share-review-popup-wrapper__icons cursor-pointer"
                  onClick={() =>
                    copyToClipboard(
                      `${
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }`
                    )
                  }
                >
                  <img
                    src="/images/rewars-share-icons/instagram.png"
                    className="img-fluid"
                    alt="instagram-icon"
                  />
                  <p className="share-review-popup-wrapper__text">Instagram</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const slug = query.slug;

  let resp;
  try {
    let where = {
      "filters[slug][$eq]": slug,
    };
    resp = await fetchBlogs(where);
  } catch (error) {
    resp = { data: [] };
  }

  const blog = resp?.data?.[0] || {};
  const meta_title = blog?.meta_title || "";
  const meta_description = blog?.meta_description || "";
  const keywords = blog?.keywords || "";
  const meta_image = blog?.main_image?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${blog.main_image.url}`
    : "";

  return {
    props: {
      slug,
      blog,
      meta_title,
      meta_description,
      meta_image,
      keywords,
    },
  };
}

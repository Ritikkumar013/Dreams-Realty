import Link from "next/link";
import Router from "next/router";
import React from "react";
import PreviousPage from "@components/previous-page";
import DynamicBreadcrumb from "@components/breadcrumbs";

export default function PropertyLinks() {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Properties for Rent", link: "/property-for-rent?page=0" },
  ];

  return (
    <section className="property-for-sale-wrapper">
      <div className="d-flex align-items-center">
        <PreviousPage isCompact={false} />
        <div style={{ marginTop: "36px", marginLeft: "30px" }}>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="custom-container">
        <h1 style={{fontSize: "2rem", fontWeight: "500"}}>Dreams Realty: Where comfort meets style</h1>
        <div className="property-for-sale-wrapper--banner-links">
          <ul>
            <li>
              <Link href={`property-for-sale?page=0`}>Properties to Buy</Link>
            </li>
            <li>
              <Link
                href={`property-for-rent?page=0`}
                className="active cursor-pointer"
              >
                Properties to Rent
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

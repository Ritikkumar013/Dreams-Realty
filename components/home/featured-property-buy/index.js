"use client";

import React from "react";
import dynamic from "next/dynamic";

const PropertyHeader = dynamic(() =>
  import("@components/home/featured-property-buy/property-type-header.js")
);
const SliderBuy = dynamic(() =>
  import("@components/home/featured-property-buy/buy-slider.js")
);

export default function FeaturedBuy(props) {
  return (
    <section className="featured-property-buy-wrapper py-5">
      <div className="custom-container py-4">
        <PropertyHeader />
        <SliderBuy
          saleLoading={props.saleLoading}
          salePropertiesList={props.salePropertiesList}
          shareModal={props.toggle}
          toggleCta={props.toggleCta}
        />
      </div>
    </section>
  );
}

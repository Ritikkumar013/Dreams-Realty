import Link from "next/link";
import React from "react";

export default function FeaturedBuyHeading() {
  return (
    <section className="d-flex justify-content-between flex-direction-column-mobile">
      <div className="featured-property-buy-wrapper--title">
        <h3>Featured Properties to Buy</h3>
      </div>
      <div className="featured-property-buy-wrapper--slider-controls-buy d-flex align-items-center">
        <Link href="/property-for-sale?page=0">View All</Link>
        <div className="customer-story-wrapper--cta-wrapper">
          <ul className="d-flex gap-4">
            <li>
              <div className="arrow mr-2 mr-md-4 property-card-slide-left">
                <img
                  src="/images/home/slider-controls/arrow-back.svg"
                  alt="chevron-left-icon"
                />
              </div>
            </li>
            <li>
              <div className="arrow property-card-slide-right">
                <img
                  src="/images/home/slider-controls/arrow-right.svg"
                  alt="chevron-right-icon"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

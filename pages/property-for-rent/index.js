"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Pagination from "react-js-pagination";
import Router from "next/router";
import Head from "next/head";

// Dynamically import components
const Layout = dynamic(() => import("@components/layout.js"));
const PropertyLinks = dynamic(() =>
  import("@components/property-for-rent/property-header-links.js")
);
const PropertyTitle = dynamic(() =>
  import("@components/property-for-rent/property-title.js")
);
const PropertyCard = dynamic(() =>
  import("@components/property-for-rent/property-card.js")
);
const PropertyMenu = dynamic(() =>
  import("@components/property-for-rent/property-rent-menu.js")
);
const HomeCTA = dynamic(() => import("@components/home/cta/HomeCTA"));

// Static imports for services
import {
  fetchCities,
  fetchLocations,
  fetchPropertyTypes,
  fetchRentProperties,
} from "@services/APIs/common.service";
import MapView from "@components/property-for-sale/map-view";

export default function PropertySale() {
  const [rentPropertiesList, setRentPropertiesList] = useState([]);
  const [mapData, setMapData] = useState([]);

  const [rentLoading, setRentLoading] = useState(false);

  // pagination module:

  const [limit, setLimit] = useState(12);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [activePage, setActivePage] = useState(0);

  //******** LOCATION STATE SECTION ******//
  // selected option
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  //  list data
  const [citiesList, setCitiesList] = useState([]);
  const [cityLocationList, setCityLocationList] = useState([]);
  // loading
  const [cityLoading, setCityLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  // city location search:
  const [citySearchInput, setCitySearchInput] = useState("");
  // toggle
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //******** PROPERTY TYPE STATE SECTION ******//
  // selected option
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  //  list data
  const [propertyTypeList, setPropertyTypeList] = useState([]);

  const [locationFilter, setLocationFilter] = useState("");

  // toggle
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);

  //******** BUDGET STATE SECTION ******//
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);

  const [selectedMinBudget, setSelectedMinBudget] = useState("");
  const [selectedMaxBudget, setSelectedMaxBudget] = useState("");
  //******** Area STATE SECTION ******//
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const toggle3 = () => setDropdownOpen3((prevState) => !prevState);

  const [selectedMinArea, setSelectedMinArea] = useState("");
  const [selectedMaxArea, setSelectedMaxArea] = useState("");

  //******** Filter STATE SECTION ******//
  const [showHideFiltersPopup, setShowHideFiltersPopup] = useState(false);
  const filterPopup = () => {
    setShowHideFiltersPopup(!showHideFiltersPopup);
  };
  const [furnishing, setFurnishing] = useState("");
  const [facing, setFacing] = useState("");
  const [bhk_lte, setBhk_lte] = useState("");
  const [bhk_gte, setBhk_gte] = useState("");

  const [filtersObj, setFiltersObj] = useState({
    BHK: [
      { name: "01", value: "1", checked: false },
      { name: "02", value: "2", checked: false },
      { name: "03", value: "3", checked: false },
      { name: "04", value: "4", checked: false },
      { name: "More than 5", value: "5", checked: false },
    ],
    Furnishing: [
      { name: "Furnished", value: "furnished", checked: false },
      { name: "Semi-furnished", value: "semi_furnished", checked: false },
      { name: "Unfurnished", value: "unfurnished", checked: false },
    ],
    Facing: [
      { name: "East", value: "east", checked: false },
      { name: "North", value: "north", checked: false },
      { name: "South", value: "south", checked: false },
      { name: "West", value: "west", checked: false },
      { name: "North - East", value: "north_east", checked: false },
      { name: "North - West", value: "north_west", checked: false },
      { name: "South - East", value: "south_east", checked: false },
      { name: "South - West", value: "south_west", checked: false },
    ],
  });

  //Call to action
  const [showCta, setShowCta] = useState(false);
  const [ctaPropType, setCtaPropType] = useState("");
  const [ctaPropId, setCtaPropId] = useState("");
  const toggleCta = (type, id) => {
    setShowCta(!showCta);
    setCtaPropType(type);
    setCtaPropId(id);
  };

  // test
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    getRentProperties();
    // getTotalCount();
    // filters
    getCities();
    // property types
    getPropertyTypes();

    // pagination module
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    setPageNumber(parseFloat(params.page));
    setActivePage(
      params.page
        ? parseFloat(params.page) === 0
          ? 1
          : parseFloat(params.page) / 11 + 1
        : 1
    );

    // pre fetch data
    if (getValue(params, "bhk_gte")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.BHK.length; ++i) {
          if (filtersObj.BHK[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexBHK = getIndex(getValue(params, "bhk_gte"));
      handleClickOnPopup(
        filtersObj.BHK[parseInt(indexBHK)],
        "BHK",
        parseInt(indexBHK)
      );
    }
    if (getValue(params, "bhk_lte")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.BHK.length; ++i) {
          if (filtersObj.BHK[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexBHK = getIndex(getValue(params, "bhk_lte"));
      handleClickOnPopup(
        filtersObj.BHK[parseInt(indexBHK)],
        "BHK",
        parseInt(indexBHK)
      );
    }
    if (getValue(params, "facing")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.Facing.length; ++i) {
          if (filtersObj.Facing[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexFacing = getIndex(getValue(params, "facing"));
      handleClickOnPopup(
        filtersObj.Facing[parseInt(indexFacing)],
        "Facing",
        parseInt(indexFacing)
      );
    }
    if (getValue(params, "furnishing")) {
      function getIndex(name) {
        for (var i = 0; i < filtersObj.Furnishing.length; ++i) {
          if (filtersObj.Furnishing[i].value === name) {
            return i;
          }
        }
        return -1;
      }
      let indexFacing = getIndex(getValue(params, "furnishing"));
      handleClickOnPopup(
        filtersObj.Furnishing[parseInt(indexFacing)],
        "Furnishing",
        parseInt(indexFacing)
      );
    }
    if (getValue(params, "location")) {
      setLocationFilter(getValue(params, "location_area", ""));
    }
    setSelectedMinBudget(getValue(params, "price_gte", ""));
    setSelectedMaxBudget(getValue(params, "price_gte", ""));
    setSelectedMinArea(getValue(params, "build_up_area_gte", ""));
    setSelectedMaxArea(getValue(params, "build_up_area_lte", ""));
    // done
  }, []);

  // useEffect(() => {
  //   const urlSearchParams = new URLSearchParams(
  //     process.browser && window.location.search
  //   );
  //   const params = Object.fromEntries(urlSearchParams.entries());
  //   // if (Object.keys(getValue(params, `length`, 0)) > 0) {
  //   setPageNumber(parseFloat(params.page));
  //   setActivePage(
  //     params.page
  //       ? parseFloat(params.page) === 0
  //         ? 1
  //         : parseFloat(params.page) / 11 + 1
  //       : 1
  //   );
  //   getRentProperties();
  //   // }
  // }, [process.browser && window.location.href]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const currentPage = parseFloat(params.page) || 1;

      getRentProperties(currentPage);
      setPageNumber(currentPage);
      setActivePage(currentPage === 0 ? 1 : currentPage);
    }
  }, [typeof window !== "undefined" && window.location.href]);

  const getRentProperties = async () => {
    try {
      setRentLoading(true);
      let where = {
        "filters[hide_in_list][$eq]": false,
      };
      const urlSearchParams = new URLSearchParams(
        process.browser && window.location.search
      );
      const params = Object.fromEntries(urlSearchParams.entries());
      const currentPage = parseFloat(params.page) || 1;
      let locationFilter = getValue(params, "location_area", "");

      setLocationFilter(params.location);
      let filter = {
        "filters[hide_in_list][$eq]": false,
        "pagination[pageSize]": limit,
        "pagination[page]": currentPage,
      };

      if (selectedPropertyType) {
        filter["filters[property_type][id][$eq]"] = selectedPropertyType.id;
      }
      if (params.property_type) {
        filter["filters[property_type][id][$eq]"] = params.property_type;
      }
      if (furnishing) {
        filter["filters[furnishing][$eq]"] = furnishing;
      }
      if (params.title_contains) {
        filter["filters[title][$containsi]"] = params.title_contains;
      }
      if (facing) {
        filter["filters[facing][$eq]"] = facing;
      }
      if (locationFilter) {
        filter["filters[location][id][$eq]"] = locationFilter;
      }

      if (selectedMinBudget && selectedMaxBudget) {
        filter["filters[price][$gte]"] = selectedMinBudget;
        filter["filters[price][$lte]"] = selectedMaxBudget;
      }

      if (selectedMinArea && selectedMaxArea) {
        filter["filters[build_up_area_max][$lte]"] = selectedMaxArea;
        filter["filters[build_up_area_min][$gte]"] = selectedMinArea;
      }

      if (bhk_gte) {
        filter["filters[property_bhks][value][$lte]"] = bhk_gte;
      }

      if (bhk_lte >= "5") {
        filter["filters[property_bhks][value][$gte]"] = bhk_lte;
      }

      let resp = await fetchRentProperties(filter);
      let mapResp = await fetchRentProperties(where);

      if (resp) {
        setRentPropertiesList(getValue(resp, "data", []));
        setTotalCount(getValue(resp, "meta.pagination.total", 0));

        let map =
          getValue(resp, "data.length", 0) !== 0 &&
          getValue(resp, "data", []).map((item) => ({
            image: getValue(item, `cover_image.url`, ""),
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
            name: item.title,
            address: item.address,
            slug: item.slug,
            type: "rent",
          }));
        setMapData(map.length !== 0 ? map : []);
        setRentLoading(false);
        if (showHideFiltersPopup) {
          setShowHideFiltersPopup(false);
        }
      } else {
        setRentLoading(false);
        if (showHideFiltersPopup) {
          setShowHideFiltersPopup(false);
        }
      }
    } catch (error) {
      setRentLoading(false);
    }
  };
  //******** LOCATION API SECTION ******//

  const getCities = async () => {
    try {
      setCityLoading(true);
      let resp = await fetchCities();
      if (resp) {
        setCitiesList(getValue(resp, "data", []));
        getCityLocation(getValue(resp, "data[0].id", ""));
        setSelectedCity(getValue(resp, "data[0].id", ""));
        setCityLoading(false);
      } else {
        setCityLoading(false);
      }
    } catch (error) {
      setCityLoading(false);
    }
  };
  const getCityLocation = async (id) => {
    try {
      let where = {
        where: {
          city: id,
        },
      };
      setLocationLoading(true);
      let resp = await fetchLocations(where);
      if (resp) {
        // pre-fetch url data
        const urlSearchParams = new URLSearchParams(
          process.browser && window.location.search
        );
        const params = Object.fromEntries(urlSearchParams.entries());
        const getLocation = getValue(resp, "data", []).filter(
          (item) => item.id === getValue(params, "location_area", "")
        );
        setSelectedLocation(getLocation.length > 0 ? getLocation[0] : {});

        //  update state
        setCityLocationList(getValue(resp, "data", []));
        getResultLocationCities(getValue(resp, "data[0].id", ""));
        setSelectedLocation(getValue(resp, "data[0].id", ""));
        setLocationLoading(false);
      } else {
        setLocationLoading(false);
      }
    } catch (error) {
      setLocationLoading(false);
    }
  };
  const getCityLocationAfterSearch = async (e, id) => {
    const { name, value } = e.target;
    setCitySearchInput(value);
    if (value) {
      try {
        let where = {
          where: {
            city: id,
            title_contains: value,
          },
        };
        setLocationLoading(true);
        let resp = await fetchLocations(where);
        if (resp) {
          setCityLocationList(getValue(resp, "data", []));
          getResultLocationCities(getValue(resp, "data[0].id", ""));
          setSelectedLocation(getValue(resp, "data[0].id", ""));
          setLocationLoading(false);
        } else {
          setLocationLoading(false);
        }
      } catch (error) {
        setLocationLoading(false);
      }
    } else {
      getCities();
    }
  };

  //******** PROPERTY TYPE API SECTION ******//

  const getPropertyTypes = async () => {
    try {
      let resp = await fetchPropertyTypes();
      if (resp) {
        const urlSearchParams = new URLSearchParams(
          process.browser && window.location.search
        );
        const params = Object.fromEntries(urlSearchParams.entries());
        const propertyTypeFromUrl = getValue(params, "property_type", "");

        const propertyTypes = getValue(resp, "data", []);

        const matchingPropertyType = propertyTypes.find((item) => {
          return item.id === propertyTypeFromUrl;
        });

        if (matchingPropertyType) {
          setSelectedPropertyType(matchingPropertyType.id);
        }

        setPropertyTypeList(propertyTypes);
      }
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };

  const clearFilters = async () => {
    setFiltersObj({
      BHK: [
        { name: "01", value: "1", checked: false },
        { name: "02", value: "2", checked: false },
        { name: "03", value: "3", checked: false },
        { name: "04", value: "4", checked: false },
        { name: "More than 5", value: "5", checked: false },
      ],
      Furnishing: [
        { name: "Furnished", value: "furnished", checked: false },
        { name: "Semi-furnished", value: "semi_furnished", checked: false },
        { name: "Unfurnished", value: "unfurnished", checked: false },
      ],
      Facing: [
        { name: "East", value: "east", checked: false },
        { name: "North", value: "north", checked: false },
        { name: "South", value: "south", checked: false },
        { name: "West", value: "west", checked: false },
        { name: "North - East", value: "north_east", checked: false },
        { name: "North - West", value: "north_west", checked: false },
        { name: "South - East", value: "south_east", checked: false },
        { name: "South - West", value: "south_west", checked: false },
      ],
    });
    setFacing("");
    setFurnishing("");
    setBhk_gte("");
    setBhk_lte("");
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    delete params.furnishing;
    delete params.facing;
    delete params.bhk_gte;
    delete params.bhk_lte;
    Router.push({
      pathname: "/property-for-rent",
      query: params,
    });
    setShowHideFiltersPopup(false);
  };

  // ************************************************************** //
  // *******************    Pagination Function   ***************** //
  // ************************************************************** //

  // const onPageChangeHandler = (pageNumber) => {
  //   const urlSearchParams = new URLSearchParams(
  //     process.browser && window.location.search
  //   );
  //   const params = Object.fromEntries(urlSearchParams.entries());
  //   setActivePage(pageNumber);
  //   if (parseInt(pageNumber) === 1) {
  //     setPageNumber(pageNumber);
  //     params.page = 0;
  //     Router.push({
  //       pathname: `/property-for-rent`,
  //       query: params,
  //     });
  //   } else {
  //     let currentPage =
  //       (parseInt(pageNumber) - 1) * 11 +
  //       (parseInt(pageNumber) - parseInt(pageNumber));
  //     params.page = currentPage;
  //     Router.push({
  //       pathname: `/property-for-rent`,
  //       query: params,
  //     });
  //   }
  // };

  const onPageChangeHandler = (pageNumber) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    setActivePage(pageNumber);
    setPageNumber(pageNumber);

    params.page = pageNumber > 1 ? pageNumber : 0;

    Router.push({
      pathname: `/property-for-rent`,
      query: params,
    });
  };

  // ************************************************************** //
  // *******************    Common Filter Function   ************** //
  // ************************************************************** //

  const handleClosePopups = (toggles) => {
    if (toggles === "toggle1") {
      toggle();
    } else if (toggles === "toggle2") {
      toggle1();
    } else if (toggles === "toggle3") {
      toggle2();
    } else if (toggles === "toggle4") {
      toggle3();
    }
  };

  const handleRemoveFilters = (value) => {
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    if (value === "selectedLocation") {
      setSelectedLocation("");
      delete params.location;
      Router.push({
        pathname: "/property-for-rent",
        query: params,
      });
    } else if (value === "selectedPropertyType") {
      setSelectedPropertyType("");
      delete params.property_type;
      Router.push({
        pathname: "/property-for-rent",
        query: params,
      });
    } else if (value === "selectedMinBudget") {
      setSelectedMaxBudget("");
      setSelectedMinBudget("");
      delete params.price_lte;
      delete params.price_gte;
      Router.push({
        pathname: "/property-for-rent",
        query: params,
      });
    } else if (value === "selectedMinArea") {
      setSelectedMaxArea("");
      setSelectedMinArea("");
      delete params.build_up_area_lte;
      delete params.build_up_area_gte;
      Router.push({
        pathname: "/property-for-rent",
        query: params,
      });
    }
    // handleFetchFiltersDelete({}, value);
  };

  // ************************************************************** //
  // *******************     Location Filter       **************** //
  // ************************************************************** //

  const handleClickOnLocation = async (obj) => {
    setCitySearchInput(obj.title);
    setSelectedLocation(obj);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.location = obj.id;
    params.page = 0;
    Router.push({
      pathname: "/property-for-rent",
      query: params,
    });
    // handleFetchFilters(where, 'toggle1');
    handleClosePopups("toggle1");
  };

  // ************************************************************** //
  // *******************     properties Filter      *************** //
  // ************************************************************** //

  const handleClickOnPropertyType = async (e) => {
    setSelectedPropertyType(e);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.property_type = e.id;
    params.page = 0;
    Router.push({
      pathname: "/property-for-rent",
      query: params,
    });
    handleClosePopups("toggle2");
  };

  // ************************************************************** //
  // *******************     Budget Filter          *************** //
  // ************************************************************** //

  const handleClickOnBudget = async (obj) => {
    setSelectedMinBudget(obj.minBudget);
    setSelectedMaxBudget(obj.maxBudget);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.price_lte = obj.maxBudget;
    params.price_gte = obj.minBudget;
    params.page = 0;
    Router.push({
      pathname: "/property-for-rent",
      query: params,
    });
    handleClosePopups("toggle3");
  };

  // ************************************************************** //
  // *******************       Area Filter          *************** //
  // ************************************************************** //

  const handleClickOnArea = async (obj) => {
    setSelectedMinArea(obj.minArea);
    setSelectedMaxArea(obj.maxArea);
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    params.build_up_area_lte = obj.maxArea;
    params.build_up_area_gte = obj.minArea;
    params.page = 0;
    Router.push({
      pathname: "/property-for-rent",
      query: params,
    });
    handleClosePopups("toggle4");
  };

  // ************************************************************** //
  // *******************       More Filter          *************** //
  // ************************************************************** //

  const handleClickOnPopup = (item, type, index, status) => {
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    if (type === "Facing") {
      if (item.value === facing) {
        setFacing("");
        filtersObj.Facing.forEach((item) => {
          item.checked = false;
        });
        delete params.facing;
      } else {
        setFacing(item.value);
        filtersObj.Facing.forEach((item, i) => {
          if (index === i) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
        delete params.facing;
      }
    } else if (type === "Furnishing") {
      if (item.value === furnishing) {
        setFurnishing("");
        filtersObj.Furnishing.forEach((item) => {
          item.checked = false;
        });
        delete params.furnishing;
      } else {
        setFurnishing(item.value);
        filtersObj.Furnishing.forEach((item, i) => {
          if (index === i) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
      }
    } else if (type === "BHK") {
      if (parseFloat(item.value) < 5) {
        if (parseFloat(item.value) === bhk_gte) {
          setBhk_gte("");
          setBhk_lte("");
          filtersObj.BHK.forEach((item, i) => {
            item.checked = false;
          });
        } else {
          setBhk_gte(parseFloat(item.value));
          setBhk_lte("");
          filtersObj.BHK.forEach((item, i) => {
            if (index === i) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        }
        delete params.bhk_gte;
      } else {
        if (parseFloat(item.value) === bhk_lte) {
          setBhk_lte("");
          setBhk_gte("");
          filtersObj.BHK.forEach((item, i) => {
            item.checked = false;
          });
        } else {
          setBhk_lte(parseFloat(item.value));
          setBhk_gte("");
          filtersObj.BHK.forEach((item, i) => {
            if (index === i) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        }
        delete params.bhk_lte;
      }
    }
  };

  const handleClickOnPopupSubmitFilter = async () => {
    const urlSearchParams = new URLSearchParams(
      process.browser && window.location.search
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    if (bhk_lte) {
      params.furnishing = furnishing;
      params.facing = facing;
      params.bhk_lte = bhk_lte;
    } else {
      params.furnishing = furnishing;
      params.facing = facing;
      params.bhk_gte = bhk_gte;
    }
    if (!params.bhk_gte) {
      delete params.bhk_gte;
    }
    if (!params.facing) {
      delete params.facing;
    }
    if (!params.furnishing) {
      delete params.furnishing;
    }
    params.page = 0;
    Router.push({
      pathname: "/property-for-rent",
      query: params,
    });
    setShowHideFiltersPopup(false);

    // handleFilters(where);
  };

  const [viewType, setViewType] = useState("list");
  function changeGrid(viewType) {
    setViewType(viewType);
    if (viewType === "map") {
      // document.querySelector("#changeViewType_js").classList.add("map-view");
      setViewType("map");
    } else {
      // document.querySelector("#changeViewType_js").classList.remove("map-view");
      setViewType("list");
    }
  }

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dreams Realty | How to Find the Perfect Rental Property</title>
        <meta
          name="description"
          content="Find 100% each property is verified and listed to deliver excellence. 100% accuracy in budget, dream locations, and safety and facilities"
        />
      </Head>
      <Layout>
        <div className="position-relative">
          <PropertyLinks />
          <PropertyMenu
            // location filter
            citiesList={citiesList}
            cityLocationList={cityLocationList}
            getCityLocationAfterSearch={getCityLocationAfterSearch}
            citySearchInput={citySearchInput}
            locationLoading={locationLoading}
            onclickOfLocation={handleClickOnLocation}
            dropdownOpen={dropdownOpen}
            toggle={toggle}
            selectedLocation={selectedLocation}
            // propertyTypeFilter
            dropdownOpen1={dropdownOpen1}
            toggle1={toggle1}
            propertyTypeList={propertyTypeList}
            selectedPropertyType={selectedPropertyType}
            handleChangePropertyType={handleClickOnPropertyType}
            // budget
            handleSubmitBudget={handleClickOnBudget}
            dropdownOpen2={dropdownOpen2}
            toggle2={toggle2}
            selectedMinBudget={selectedMinBudget}
            selectedMaxBudget={selectedMaxBudget}
            // area
            dropdownOpen3={dropdownOpen3}
            toggle3={toggle3}
            selectedMinArea={selectedMinArea}
            selectedMaxArea={selectedMaxArea}
            handleSubmitArea={handleClickOnArea}
            // filter
            handleSubmitFilter={handleClickOnPopupSubmitFilter}
            filterPopup={filterPopup}
            showHideFiltersPopup={showHideFiltersPopup}
            onChangeFilterPopup={handleClickOnPopup}
            furnishing={furnishing}
            facing={facing}
            bhk_lte={bhk_lte}
            bhk_gte={bhk_gte}
            filtersObj={filtersObj}
            clearFilters={clearFilters}
            handleRemoveFilters={handleRemoveFilters}
            hideConstructionStatus={true}
          />
          <PropertyTitle
            viewType={viewType}
            changeGrid={changeGrid}
            mapData={mapData}
            totalLength={getValue(rentPropertiesList, "length", 0)}
          />
          {viewType === "map" && (
            <div className="d-flex justify-content-center mb-4">
              <MapView
                changetoListView={() => changeGrid("list")}
                mapData={mapData}
              />
            </div>
          )}
          <PropertyCard
            rentLoading={rentLoading}
            rentPropertiesList={rentPropertiesList}
            toggleCta={toggleCta}
          />
          {totalCount > 12 ? (
            // <div style={{ marginLeft: '680px' }} className='pagination-wrapper'>
            <div className="mt-4 mb-4">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={12}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={onPageChangeHandler}
              />
            </div>
          ) : (
            <br></br>
          )}
        </div>
        <HomeCTA
          modal={showCta}
          toggle={toggleCta}
          type={ctaPropType}
          id={ctaPropId}
        />
      </Layout>
    </>
  );
}

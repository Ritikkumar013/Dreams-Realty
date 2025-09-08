import React from "react";

function DynamicBreadcrumb({ items, textblack, textWhite }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === items.length - 1 ? "active" : ""
            } ${textWhite && "backslashStyle"}`}
          >
            {index === items.length - 1 ? (
              <span
                style={{
                  fontWeight: "500",
                  color: `${textWhite ? "#eaeaea" : "#000"}`,
                }}
              >
                {item.label}
              </span>
            ) : (
              <>
                <a
                  href={item.link}
                  style={{
                    color: `${textWhite && "#aeaeae"}`,
                  }}
                  className="backslashStyle"
                >
                  {item.label}
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default DynamicBreadcrumb;

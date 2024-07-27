import React, { useEffect, useState } from "react";
import Image from "next/image";

import { apiClient, BASE_URL } from "@/utils/apiClient";

interface Image {
  id: number;
  hidden: boolean;
  price: number;
  name: string;
  store: string;
  ownerid: null;
  filename: string;
  category: string;
}

const Profile: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("newest");
  const [buy, setBuy] = useState<Image | undefined>(undefined);

  useEffect(() => {
    apiClient("/backend/api/profile", "get", {
      params: {
        type: "profile",
      },
    }).then((res) => {
      if (res.success) setImages(res.data);
    });
  }, []);

  return (
    <section className="dashboard-container ">
      {buy && (
        <div className="ReactModalPortal">
          <div
            className="ReactModal__Overlay ReactModal__Overlay--after-open"
            style={{
              position: "fixed",
              inset: "0px",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            }}
          >
            <div
              className="ReactModal__Content ReactModal__Content--after-open smallModal bg-modal store-modal"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
            >
              <div className="Modalhead">
                <h5>{buy.name}</h5>
                <button onClick={() => setBuy(undefined)}>
                  <i className="fas fa-times" />
                </button>
              </div>
              <div className="row modalDram">
                <center>
                  <Image
                    width={130}
                    height={130}
                    src={`${BASE_URL}/cdn/profile/${buy.filename}`}
                    alt={buy.store}
                  />
                </center>
                {/* <div className="form-check d-flex justify-content-center align-items-center mt-2 mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="with-color-checkbox"
                    defaultValue={1}
                    defaultChecked
                  />
                  <label
                    className="form-check-label ps-2"
                    htmlFor="with-color-checkbox"
                  >
                    With colors
                  </label>
                </div> */}
              </div>
              <div className="bg-price-modal-footer">
                <h5 className="mt-20">
                  Price{" "}
                  <div dir="ltr" className="d-inline">
                    <i className="fa-solid fa-cedi-sign me-1" />
                    {buy.price}
                  </div>
                </h5>
                <div
                  className="mt-20 btn btn-success btn-rounded ld-over-inverse"
                  onClick={() => setBuy(undefined)}
                >
                  Buy &amp; Use{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <div className="dramex-component-69">
              <div className="tab-struct custom-tab-1 mt-40 pb-25">
                <ul
                  role="tablist"
                  className="nav nav-pills gap-2"
                  id="myTabs_7"
                >
                  {[
                    "All",
                    ...Array.from(new Set(images.map((img) => img.category))),
                  ].map((category) => (
                    <li
                      key={category}
                      className={`nav-item mb-3 ${
                        selectedCategory === category ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <a className="p-2 rounded">
                        {category} (
                        {category === "All"
                          ? images.length
                          : images.filter((img) => img.category === category)
                              .length}
                        )
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-center gap-3">
                  <select
                    className="form-control form-select w-auto"
                    onChange={(e) => {
                      setSort(e.target.value);
                    }}
                  >
                    <option value="newest">Newest</option>
                    <option value="low_price">Price - Low to high</option>
                    <option value="high_price">Price - High to low</option>
                  </select>
                  <div className="form-check align-self-center">
                    <input
                      id="checkbox2"
                      className="form-check-input"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label ps-2"
                      htmlFor="checkbox2"
                    >
                      Owned
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="bglist">
                {images
                  .filter((img) => {
                    if (selectedCategory !== "All")
                      return img.category === selectedCategory;
                    else return true;
                  })
                  .sort((a: Image, b: Image) => {
                    if (sort === "low_price") return a.price - b.price;
                    else if (sort === "high_price") return b.price - a.price;
                    else return a.price;
                  })
                  .map((img) => (
                    <div
                      key={img.id}
                      className="bg-item"
                      onClick={() => setBuy(img)}
                    >
                      <div id="p_143" className="bg-price" dir="ltr">
                        <i className="fa-solid fa-cedi-sign me-1" />
                        {img.price}
                      </div>
                      <a className="full-width">
                        <Image
                          className="bg-img"
                          width={300}
                          height={300}
                          src={`${BASE_URL}/cdn/profile/${img.filename}`}
                          loading="lazy"
                          alt={img.name}
                        />
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Profile;

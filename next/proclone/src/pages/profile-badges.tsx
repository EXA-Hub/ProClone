import Image from "next/image";
import React, { useEffect, useState } from "react";
import LazyImage from "@/components/LazyImage";
import { apiClient, BASE_URL } from "@/utils/apiClient";
import Swal from "sweetalert2";
import Save from "@/components/save";

// Define the Image interface
interface Image {
  n: number;
  hidden: boolean;
  price: number;
  name: string;
  store: string;
  ownerid: boolean;
  filename: string;
  category: string;
}

// Define the BadgesIconsProps interface
interface BadgesIconsProps {
  onBadgeSelect: (badge: Image) => void;
  images: Image[];
}

// Implement the BadgesIcons component
const BadgesIcons: React.FC<BadgesIconsProps> = ({ onBadgeSelect, images }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("newest");
  const [own, setOwn] = useState<boolean>(false);

  return (
    <div className="dramex-component-69">
      <div className="tab-struct custom-tab-1 mt-40 pb-25">
        <ul role="tablist" className="nav nav-pills gap-2" id="myTabs_7">
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
                  : images.filter((img) => img.category === category).length}
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
              onClick={() => setOwn(!own)}
            />
            <label className="form-check-label ps-2" htmlFor="checkbox2">
              Owned
            </label>
          </div>
        </div>
      </div>
      <hr />
      <div className="bglist badges">
        {images
          .filter((img) => {
            if (selectedCategory === "All")
              return own ? img.ownerid : !img.hidden;
            else
              return own
                ? img.category === selectedCategory && img.ownerid
                : img.category === selectedCategory;
          })
          .sort((a: Image, b: Image) => {
            if (sort === "low_price") return a.price - b.price;
            else if (sort === "high_price") return b.price - a.price;
            else return a.price;
          })
          .map((img) => (
            <div
              key={img.n}
              className="badges-item"
              onClick={() => onBadgeSelect(img)}
            >
              <div id="p_143" className="bg-price">
                <i className="fa-solid fa-cedi-sign" />
                {img.price}
              </div>
              <LazyImage
                width={160}
                height={220}
                className="badges-img"
                src={`${BASE_URL}/cdn/badges/${img.filename}`}
                alt={img.name}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

// Implement the Badges component
const Badges: React.FC = () => {
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [selected, select] = useState<number>(-1);
  interface Saver {
    view: boolean;
    userBadges: string[];
  }
  const [saver, setSaver] = useState<Saver>({ view: false, userBadges: [] });
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    apiClient("/backend/api/profile", "get", {
      params: {
        type: "badges",
      },
    }).then((res) => {
      if (res.success) setImages(res.data);
    });
  }, []);

  useEffect(() => {
    apiClient("/backend/api/profile", "get").then((res) => {
      if (res.success && res.data.badges) {
        setUserBadges(res.data.badges);
        setSaver({ view: false, userBadges: res.data.badges });
      }
    });
  }, []);

  const handleBadgeSelect = (badge: Image) => {
    if (userBadges.length < 5) {
      if (selected > -1 && selected < 5) {
        setUserBadges(
          userBadges.length === selected
            ? [...userBadges, badge.filename]
            : userBadges.map((_, i) => {
                if (i === selected) _ = badge.filename;
                return _;
              })
        );
        setSaver((prev) => {
          return { ...prev, view: true };
        });
      } else
        Swal.fire({
          title: "Please select a slot first 🤨",
          icon: "warning",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
    }
    select(-1);
  };

  const set = async () => {
    const paid = images.filter(
      (img) => userBadges.includes(img.filename) && !img.ownerid
    );
    Swal.fire({
      title: `Do you want to save the changes? cost: $${paid
        .map((img) => img.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          apiClient("/backend/api/profile/buy", "POST", {
            data: {
              imageKey: paid.map((pay) => pay.filename),
              folder: "badges",
            },
          })
            .then((data) => {
              if (data.success) {
                // Send updated badges to server
                apiClient("/backend/api/profile/set", "PUT", {
                  data: { badges: userBadges },
                })
                  .then((data) => {
                    if (data.success) {
                      setSaver({ view: false, userBadges });
                      Swal.fire("Saved!", "", "success");
                    } else Swal.fire("Not Saved!", "", "warning");
                  })
                  .catch((error) => {
                    console.error(error);
                    Swal.fire("ERROR!", "", "error");
                  });
              } else {
                Swal.fire(`${data.error}`, "", "info");
              }
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("ERROR!", "", "error");
            });
        } catch (error) {
          console.error(error);
          Swal.fire("ERROR!", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const removeBadge = (index: number) => {
    setUserBadges(userBadges.filter((_, i) => i !== index));
    setSaver((prev) => {
      return { ...prev, view: true };
    });
    select(-1);
  };

  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <Save
              view={saver.view}
              onCancel={() => {
                setUserBadges(saver.userBadges);
                setSaver((prev) => {
                  return { ...prev, view: false };
                });
              }}
              onSave={set}
            />
            <div className="pt-25">
              <center>
                Please select a badge
                <div className="pt-20 ltr">
                  {userBadges.map((badge, index) => (
                    <div className="sbadge-item" key={index}>
                      <div
                        id="p_143"
                        className="sbadge-delete"
                        onClick={() => removeBadge(index)}
                      >
                        <i className="fas fa-times" />
                      </div>
                      <Image
                        onClick={() => select(index)}
                        className={
                          "border-radius-half " +
                          (!(selected === index) && "sbadge")
                        }
                        src={`${BASE_URL}/cdn/badges/${badge}`}
                        width={80}
                        height={80}
                        unoptimized
                        alt={badge}
                      />
                    </div>
                  ))}
                  {userBadges.length < 5 && (
                    <div
                      className="sbadge-item"
                      onClick={() => select(userBadges.length)}
                    >
                      <Image
                        className={
                          "border-radius-half " +
                          (!(selected === userBadges.length) && "sbadge")
                        }
                        src={
                          "https://ui-avatars.com/api/?size=80&background=7289da&color=fff&name=" +
                          (userBadges.length + 1)
                        }
                        width={80}
                        height={80}
                        unoptimized
                        alt="Unused Badge Slot"
                      />
                    </div>
                  )}
                </div>
              </center>
              <BadgesIcons onBadgeSelect={handleBadgeSelect} images={images} />
            </div>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Badges;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { apiClient } from "@/utils/apiClient";

interface TopUser {
  userName: string;
  avatar: string;
  member: boolean;
  amount: number;
}

const Billionaires: React.FC = () => {
  const [topD, setD] = useState<TopUser[]>([]);

  useEffect(() => {
    apiClient("/backend/api/top?type=credits", "get").then((res) => {
      if (res.success) setD(res.data);
    });
  }, []);

  function formatLargeNumber(value: number): string {
    if (value >= 1_000_000_000) {
      // Convert to billions
      const billions = value / 1_000_000_000;
      return `${billions.toFixed(1)}b`;
    } else if (value >= 1_000_000) {
      // Convert to millions
      const millions = value / 1_000_000;
      return `${millions.toFixed(1)}m`;
    } else if (value >= 1_000) {
      // Convert to thousands
      const thousands = value / 1_000;
      return `${thousands.toFixed(1)}k`;
    } else {
      // Less than a thousand, use comma formatting
      return Intl.NumberFormat("en-US").format(value);
    }
  }

  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <div className="pt-25">
              {topD.map((top, index) => {
                switch (index) {
                  case 0:
                    return (
                      <div
                        className="top-container"
                        dir="ltr"
                        style={{ animationDuration: "0.1s" }}
                      >
                        <div id="top-1">
                          <div className="top-user-info">
                            <Image
                              src="/static/crowns.svg"
                              width={30}
                              height={23}
                              className="top-one-crown"
                              id="top-one-crown-id"
                              alt={""}
                            />
                            <div className="tw-relative">
                              <Image
                                height={100}
                                width={100}
                                src={top.avatar}
                                alt={top.userName + " Avatar image"}
                                id="top-1-username-avatar"
                              />
                            </div>
                            <div className="tw-flex tw-gap-3 tw-items-center">
                              <h5 className="top-username">{top.userName}</h5>
                              {top.member && (
                                <span className="membership_tag">
                                  Membership
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="top-user-levels-credits">
                            <Image
                              className="xp-or-credits-img"
                              src="/static/dollar.svg"
                              width={30}
                              height={30}
                              alt={""}
                            />
                            <div className="top-hover-credits">
                              <p>{formatLargeNumber(top.amount)}</p>
                              <p
                                dir="ltr"
                                className="top-txt-color d-flex align-items-center gap-1"
                              >
                                {Intl.NumberFormat("en-US").format(top.amount)}
                                <i className="fa-solid fa-cedi-sign" />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                  case 9:
                    return (
                      <div
                        className="top-container"
                        dir="ltr"
                        style={{ animationDuration: "0.2s" }}
                      >
                        <h4 className="top-number-10">{index + 1}</h4>
                        <div className="top-100">
                          <div className="top-user-info">
                            <div className="tw-relative">
                              {top.member && (
                                <Image
                                  className="tw-rounded-2xl tw-absolute top_crown tw-left-0"
                                  src="/static/crown.png"
                                  width={23}
                                  height={23} // You can set the height to the same as width for a square aspect ratio
                                  style={{
                                    width: "23px",
                                    height: "auto",
                                  }}
                                  alt={"king"}
                                />
                              )}
                              <Image
                                height={100}
                                width={100}
                                src={top.avatar}
                                alt={top.userName + " Avatar image"}
                                className="top-username-avatar"
                              />
                            </div>
                            <div className="tw-flex tw-gap-3 tw-items-center">
                              <h5 className="top-username">{top.userName}</h5>
                              {top.member && (
                                <span className="membership_tag">
                                  Membership
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="top-user-levels-credits">
                            <Image
                              className="xp-or-credits-img"
                              src="/static/dollar.svg"
                              width={30}
                              height={30}
                              alt={""}
                            />
                            <div className="top-hover-credits">
                              <p>{formatLargeNumber(top.amount)}</p>
                              <p
                                dir="ltr"
                                className="top-txt-color d-flex align-items-center gap-1"
                              >
                                {Intl.NumberFormat("en-US").format(top.amount)}
                                <i className="fa-solid fa-cedi-sign" />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div
                        className="top-container"
                        dir="ltr"
                        style={{ animationDuration: "1s" }}
                      >
                        <h4 className="top-number">{index + 1}</h4>
                        <div className="top-100">
                          <div className="top-user-info">
                            <div className="tw-relative">
                              {top.member && (
                                <Image
                                  className="tw-rounded-2xl tw-absolute top_crown tw-left-0"
                                  src="/static/crown.png"
                                  width={23}
                                  height={23} // You can set the height to the same as width for a square aspect ratio
                                  style={{
                                    width: "23px",
                                    height: "auto",
                                  }}
                                  alt={"king"}
                                />
                              )}
                              <Image
                                height={100}
                                width={100}
                                src={top.avatar}
                                alt={top.userName + " Avatar image"}
                                className="top-username-avatar"
                              />
                            </div>
                            <div className="tw-flex tw-gap-3 tw-items-center">
                              <h5 className="top-username">{top.userName}</h5>
                              {top.member && (
                                <span className="membership_tag">
                                  Membership
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="top-user-levels-credits">
                            <Image
                              className="xp-or-credits-img"
                              src="/static/dollar.svg"
                              width={30}
                              height={30}
                              alt={""}
                            />
                            <div className="top-hover-credits">
                              <p>{formatLargeNumber(top.amount)}</p>
                              <p
                                dir="ltr"
                                className="top-txt-color d-flex align-items-center gap-1"
                              >
                                {Intl.NumberFormat("en-US").format(top.amount)}
                                <i className="fa-solid fa-cedi-sign" />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                }
              })}
            </div>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Billionaires;

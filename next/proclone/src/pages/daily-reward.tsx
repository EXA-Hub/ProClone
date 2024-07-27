import { apiClient } from "@/utils/apiClient";
import React, { useEffect, useState } from "react";
import Image from "next/image";

async function addDaily() {
  return await apiClient("/backend/api/daily", "GET");
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <h5 id="daily-time-left" className="mt-20">
      Time left <span>{formatTime(timeLeft)}</span>
    </h5>
  );
};

const Claim: React.FC = () => {
  const [help, setHelp] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [data, setData] = useState<any>(false);

  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            {help && (
              <div data-r-onboarding-wrapper="false">
                <div className="">
                  <svg
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "fixed",
                      top: "0px",
                      left: "0px",
                      opacity: "0.5",
                      zIndex: "var(--r-onboarding-overlay-z, 10)",
                      pointerEvents: "none",
                    }}
                  >
                    <path
                      d="
M1358,654
H0V0
H1358V654
Z
M555.390625,216.796875 Q547.390625,216.796875 547.390625,224.796875
V270.796875 Q547.390625,278.796875 555.390625,278.796875
H1163.390625 Q1171.390625,278.796875 1171.390625,270.796875
V224.796875 Q1171.390625,216.796875 1163.390625,216.796875
Z
    "
                    />
                  </svg>
                  <div
                    style={{
                      position: "relative",
                      zIndex: "var(--r-onboarding-step-z, 20)",
                    }}
                  >
                    <div
                      data-popper-placement="bottom"
                      style={{
                        position: "absolute",
                        inset: "0px auto auto 0px",
                        margin: "0px",
                        transform: "translate(321px, 198px)",
                      }}
                    >
                      <div className="onboarding-container">
                        <Image
                          width={268}
                          height={97}
                          src="/images/daily-onboarding.svg"
                          alt="daily-onboarding"
                        />
                        <div className="content">
                          <div className="content-text">
                            <h3>Double your rewards!</h3>
                            <p>
                              Build your streak and double your rewards by
                              claiming your daily reward every day!
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setHelp(false);
                            }}
                          >
                            Got it
                          </button>
                        </div>
                      </div>
                      <div
                        data-popper-arrow="true"
                        style={{
                          position: "absolute",
                          left: "0px",
                          transform: "translate(150px, 0px)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {err || data ? (
              data ? (
                <div className="daily-parent daily-claimed-style">
                  <div id="daily-claimed-message">
                    <h3>Success! You&apos;ve claimed your reward.</h3>
                  </div>
                  <div>
                    <div className="text-header">
                      <h2>Claim your daily reward</h2>
                      <div className="text-mute d-flex justify-content-center align-items-center gap-1">
                        Come back everyday to earn extra credits!
                        <div className="pointer d-flex">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.4"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              fill="var(--purple)"
                            />
                            <path
                              d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
                              fill="var(--purple)"
                            />
                            <path
                              d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z"
                              fill="var(--purple)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="bg-streak" id="daily-streak">
                      <div className="streak-list indiana-scroll-container indiana-scroll-container--hide-scrollbars">
                        <div className="streak active ">x1</div>
                        <div className="streak  ">x2</div>
                        <div className="streak  ">x3</div>
                        <div className="streak  ">x4</div>
                        <div className="streak  ">x5</div>
                        <div className="streak  ">x6</div>
                        <div className="streak  ">x7</div>
                        <div className="streak  ">x8</div>
                        <div className="streak  ">x9</div>
                        <div className="streak  ">x10</div>
                      </div>
                    </div>
                    <hr />
                    <div className="daily-logo-text">
                      <i className="fas fa-gift" />
                    </div>
                    <Timer />
                    <div className="daily-footer">
                      <div className="daily-number">
                        You have claimed{" "}
                        <div dir="ltr" className="d-flex align-items-center">
                          <i className="fa-solid fa-cedi-sign" />
                          <span>{data.daily}</span>
                        </div>{" "}
                        credits in your last daily
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="daily-parent daily-parent-claimed daily-multiple-devices">
                  <div id="daily-multiple-devices-div">
                    <i className="fas fa-exclamation-triangle" />
                    <h3>Error, please contact the support</h3>
                  </div>
                  <div style={{ opacity: "0.2", pointerEvents: "none" }}>
                    <div className="text-header">
                      <h2>Claim your daily reward</h2>
                      <div className="text-mute d-flex justify-content-center align-items-center gap-1">
                        Come back everyday to earn extra credits!
                        <div className="pointer d-flex">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.4"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              fill="var(--purple)"
                            />
                            <path
                              d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
                              fill="var(--purple)"
                            />
                            <path
                              d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z"
                              fill="var(--purple)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="bg-streak" id="daily-streak">
                      <div className="streak-list indiana-scroll-container indiana-scroll-container--hide-scrollbars">
                        <div className="streak active ">x1</div>
                        <div className="streak  ">x2</div>
                        <div className="streak  ">x3</div>
                        <div className="streak  ">x4</div>
                        <div className="streak  ">x5</div>
                        <div className="streak  ">x6</div>
                        <div className="streak  ">x7</div>
                        <div className="streak  ">x8</div>
                        <div className="streak  ">x9</div>
                        <div className="streak  ">x10</div>
                      </div>
                    </div>
                    <hr />
                    <div className="daily-logo-text" style={{}}>
                      <i className="fas fa-gift" />
                    </div>
                    <h5 id="daily-time-left" className="mt-20">
                      Time left <span>0-11:0-39:0-1</span>
                    </h5>
                    <div className="daily-footer">
                      <div className="daily-number">
                        You have claimed{" "}
                        <div dir="ltr" className="d-flex align-items-center">
                          <i className="fa-solid fa-cedi-sign" />
                          <span>2800</span>
                        </div>{" "}
                        credits in your last daily
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="daily-parent">
                <div style={{ opacity: 1, pointerEvents: "all" }}>
                  <div className="text-header">
                    <h2>Claim your daily reward</h2>
                    <div className="text-mute d-flex justify-content-center align-items-center gap-1">
                      Come back everyday to earn extra credits!
                      <div
                        className="pointer d-flex"
                        onClick={() => {
                          setHelp(true);
                        }}
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.4"
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            fill="var(--purple)"
                          />
                          <path
                            d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
                            fill="var(--purple)"
                          />
                          <path
                            d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z"
                            fill="var(--purple)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="bg-streak" id="daily-streak">
                    <div className="streak-list indiana-scroll-container indiana-scroll-container--hide-scrollbars">
                      <div className="streak active ">x1</div>
                      <div className="streak  ">x2</div>
                      <div className="streak  ">x3</div>
                      <div className="streak  ">x4</div>
                      <div className="streak  ">x5</div>
                      <div className="streak  ">x6</div>
                      <div className="streak  ">x7</div>
                      <div className="streak  ">x8</div>
                      <div className="streak  ">x9</div>
                      <div className="streak  ">x10</div>
                    </div>
                  </div>
                  <hr />
                  <div
                    className="daily-logo-text"
                    onClick={async () => {
                      const res = await addDaily();
                      console.log(res);
                      if (res.success) setData(res.data);
                      else setErr(true);
                    }}
                  >
                    <i className="fas fa-gift" />
                  </div>
                  <div className="daily-footer">
                    <div className="daily-number">
                      You can get up to
                      <div dir="ltr" className="d-flex align-items-center">
                        <i className="fa-solid fa-cedi-sign" />
                        <span>3000</span>
                      </div>
                      every day.
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4 text-center">
              <div id="ezoic-pub-ad-placeholder-104" />
            </div>
            <footer
              className="mt-55"
              style={{ textAlign: "center", position: "relative" }}
            >
              <div className="center footerbulitin">
                <a href="/terms-of-use">Terms Of Use</a>-
                <a href="/privacy-policy">Privacy Policy</a>-
                <a href="/refund-policy">Refund Policy</a>
              </div>
              <p className="mt-2">© 2024 All rights reserved.</p>
            </footer>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Claim;

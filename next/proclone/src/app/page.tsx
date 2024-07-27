"use client"; // Mark this file as a Client Component

import Image from "next/image";
import "animate.css"; // Import Animate.css
import "./page.module.css"; // Import your CSS Module
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { BASE_URL } from "../utils/apiClient";

export default function Home() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Adjust animation duration
    });
    // Fetch HTML content from the public directory
    fetch("/per.html")
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error fetching HTML:", error));

    // Cleanup function to remove AOS events
    return () => {
      AOS.refresh(); // Refresh AOS instance on component unmount
    };
  }, []);

  const handlePopup = () => {
    const popupWidth = 600;
    const popupHeight = 1400;

    // Calculate the center position
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;

    // Open the popup window
    const popup = window.open(
      BASE_URL + "/backend/user/login",
      "LoginPopup",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );

    if (popup) {
      // Polling to check if popup is closed
      const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopupClosed);
          window.location.href = "/dashboard"; // Redirect to /dashboard
        }
      }, 1000); // Check every second
    }
  };

  return (
    <div className="landing-page landing-text tw-h-fit tw-bg-gray-900">
      <div className="tw-w-ful tw-sticky tw-top-0 tw-backdrop-blur-md tw-z-50 tw-border-0 tw-border-b tw-border-solid tw-border-gray-850 tw-transition-all tw-duration-300 tw-border-none tw-bg-gray-900/0">
        <div className="tw-m-auto tw-max-w-[1240px] tw-px-3 lg:tw-px-8">
          <nav
            className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-py-5 lg:tw-py-3"
            id="navbar"
          >
            <a
              className="tw-block tw-h-fit sm:tw-h-[28px]"
              aria-label="Home page"
              href="/"
            >
              <Image src={"/probot.svg"} alt={"logo"} width={140} height={37} />
            </a>
            <nav
              aria-label="Main"
              data-orientation="horizontal"
              dir="ltr"
              className="tw-relative tw-flex tw-w-screen tw-max-w-[65%] tw-items-center tw-justify-center sm:tw-hidden"
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <ul
                  data-orientation="horizontal"
                  className="tw-center tw-m-0 tw-flex tw-list-none tw-items-center tw-rounded-[6px] tw-bg-none tw-p-1"
                  dir="ltr"
                >
                  <li>
                    <button
                      id="radix-:R26j6:-trigger-radix-:R1e6j6:"
                      data-state="closed"
                      aria-expanded="false"
                      aria-controls="radix-:R26j6:-content-radix-:R1e6j6:"
                      className="nav_menu_trigger tw-m-0 tw-flex tw-cursor-pointer tw-select-none tw-items-center tw-gap-2 tw-rounded-md tw-border-none tw-bg-transparent tw-bg-none tw-px-4 tw-py-2 tw-font-bold tw-text-gray-400 tw-outline-none tw-transition-all tw-duration-200 tw-ease-in hover:tw-bg-gray-850 hover:tw-text-gray-100"
                      data-radix-collection-item=""
                    >
                      Features
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 5L6.92269 8.91158L10.8454 5"
                          stroke="#828699"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button
                      id="radix-:R26j6:-trigger-radix-:R2e6j6:"
                      data-state="closed"
                      aria-expanded="false"
                      aria-controls="radix-:R26j6:-content-radix-:R2e6j6:"
                      className="nav_menu_trigger tw-m-0 tw-flex tw-cursor-pointer tw-select-none tw-items-center tw-gap-2 tw-rounded-md tw-border-none tw-bg-transparent tw-bg-none tw-px-4 tw-py-2 tw-font-bold tw-text-gray-400 tw-outline-none tw-transition-all tw-duration-200 hover:tw-bg-gray-850 hover:tw-text-gray-100"
                      data-radix-collection-item=""
                    >
                      Resources
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 5L6.92269 8.91158L10.8454 5"
                          stroke="#828699"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <a
                      className="tw-flex tw-cursor-pointer tw-items-center tw-gap-2 tw-rounded-md tw-px-4 tw-py-2 tw-transition-all tw-duration-300 hover:tw-bg-[#EFB442]/10"
                      href="/pricing"
                    >
                      <p className="tw-m-0 tw-select-none tw-font-bold tw-text-[#EFB442] tw-transition-all tw-duration-200">
                        Premium
                      </p>
                      <Image
                        alt="premium"
                        loading="lazy"
                        width="21"
                        height="20"
                        decoding="async"
                        data-nimg="1"
                        className="tw-transition-all tw-duration-150"
                        style={{ color: "transparent" }}
                        src="/premium.svg"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tw-absolute tw-left-0 tw-top-full tw-w-full tw-items-center tw-perspective-[2000px]"></div>
            </nav>
            <div className="tw-flex tw-items-center">
              <div className="tw-flex tw-items-center tw-gap-4"></div>
              <button
                onClick={handlePopup}
                className="button tw-bg-[#605ceb] tw-border-solid tw-border-[#6965F5] hover:tw-bg-[#807eea] tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-2 tw-px-4 tw-text-sm"
              >
                Login
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div className="tw-max-w-[1240px] tw-m-auto tw-px-3 lg:tw-px-8">
        <section className="tw-flex tw-h-[72vh] tw-items-center tw-justify-center lg:tw-h-[85vh]">
          <div className="tw-flex tw-max-w-[440px] tw-flex-col tw-items-center tw-gap-12">
            <div className="tw-flex tw-flex-col tw-items-center">
              <div
                data-aos="fade-up"
                className="landing-tag-text border tw-w-fit tw-rounded-full tw-border-solid tw-border-[#5F5DEF33] tw-bg-[#5753EC0A] tw-px-4 tw-py-2 tw-font-semibold lg:tw-text-center aos-init aos-animate"
              >
                New: Our Memberships Subscription
              </div>
              <div>
                <h1
                  data-aos-delay="100"
                  data-aos="fade-up"
                  className="landing-headline tw-text-center rtl:tw-leading-normal sm:tw-text-3xl aos-init aos-animate"
                >
                  Make A Professional Discord Server!
                </h1>
                <p
                  data-aos-delay="200"
                  data-aos="fade-up"
                  className="landing-para tw-text-center tw-text-gray-300 aos-init aos-animate"
                >
                  A very customizable multipurpose bot for welcome image,
                  In-depth logs, Social commands, Moderation and many more ...
                </p>
              </div>
            </div>
            <div
              data-aos-delay="400"
              data-aos="fade-up"
              className="flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 lg:tw-w-full sm:tw-flex-col sm:tw-gap-2 aos-init aos-animate"
            >
              <button className="button tw-bg-[#605ceb] tw-border-solid tw-border-[#6965F5] hover:tw-bg-[#807eea] tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-3 tw-px-6 sm:tw-py-4 tw-text-sm lg:tw-w-full">
                Add To Discord
              </button>
              <a className="lg:tw-w-full" href="/#features">
                <button className="button tw-bg-gray-850 tw-border-solid tw-border-gray-800 hover:tw-bg-gray-800 tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-3 tw-px-6 sm:tw-py-4 tw-w-full tw-text-sm">
                  Browse Features
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="tw-max-w-[1240px] tw-m-auto tw-px-3 lg:tw-px-8 sm:tw-max-w-full sm:tw-px-0">
        <div
          data-aos="fade-up"
          className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-[25px] aos-init aos-animate"
        >
          <div className="landing-para tw-text-center tw-text-sm tw-font-bold tw-text-gray-400">
            TRUSTED BY OVER
            <span className="tw-font-bold tw-text-gray-50">9.000,000</span>
            DISCORD SERVERS, INCLUDING
          </div>

          {/* <div className="marquee-container tw-overflow-hidden">
            <div className="overlay"></div>
            <div className="marquee">
              <div className="initial-child-container">
                <div className="child">
                  <div
                    data-aos-delay="100"
                    data-aos="fade-up"
                    className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                  >
                    <Image
                      src="/image.png"
                      width={48}
                      height={48}
                      className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                      alt="PewDiePie | Floor Gang"
                    />
                    <div className="tw-flex tw-flex-col">
                      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                        <p className="landing-para">PewDiePie | Floor Gang</p>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="transparent"
                        >
                          <path
                            d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                            id="Path"
                            fill="#22A55A"
                          ></path>
                          <polygon
                            id="Path"
                            fill="#FFFFFF"
                            fill-rule="nonzero"
                            points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                          ></polygon>
                        </svg>
                      </div>
                      <p className="landing-para tw-text-gray-400">
                        200,000 Members
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child">
                  <div
                    data-aos-delay="300"
                    data-aos="fade-up"
                    className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                  >
                    <Image
                      src="/image.png"
                      width={48}
                      height={48}
                      className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                      alt="PUBG Mobile Mena"
                    />
                    <div className="tw-flex tw-flex-col">
                      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                        <p className="landing-para">PUBG Mobile Mena</p>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="transparent"
                        >
                          <path
                            d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                            id="Path"
                            fill="#22A55A"
                          ></path>
                          <polygon
                            id="Path"
                            fill="#FFFFFF"
                            fill-rule="nonzero"
                            points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                          ></polygon>
                        </svg>
                      </div>
                      <p className="landing-para tw-text-gray-400">
                        150,000 Members
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child">
                  <div
                    data-aos-delay="500"
                    data-aos="fade-up"
                    className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                  >
                    <Image
                      src="/image.png"
                      width={48}
                      height={48}
                      className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                      alt="oCMz"
                    />
                    <div className="tw-flex tw-flex-col">
                      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                        <p className="landing-para">oCMz</p>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 15.2"
                          stroke="transparent"
                        >
                          <path
                            fill="#5865F2"
                            fill-rule="evenodd"
                            d="M16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59S0 8.39 0 7.6s1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8S4.78.28 5.53 0 7.2.83 8 .83s1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59S16 6.81 16 7.6z"
                          ></path>
                          <path
                            d="M10.59 6.4l-1.398.9c-.2.1-.3.1-.5 0-.1-.1-.299-.2-.399-.3-.4-.1-.699 0-.999.2l-.499.3-2.497 1.7c-.6.3-1.299.2-1.598-.4-.4-.5-.2-1.2.3-1.6l2.996-2c.799-.5 1.798-.7 2.697-.5.799.2 1.398.6 1.898 1.2.2.2.1.4 0 .5zM13.487 7.8c0 .4-.2.8-.5 1l-3.096 2c-.599.4-1.198.6-1.897.6-.3 0-.5 0-.8-.1-.799-.2-1.398-.6-1.897-1.2-.1-.2 0-.4.1-.5l1.398-.9c.1-.1.3-.1.4 0 .2.1.399.2.499.3.4 0 .7 0 .999-.2l.699-.4L11.39 7l.3-.2c.499-.3 1.298-.2 1.597.3.2.3.2.5.2.7z"
                            fill="#fff"
                          ></path>
                        </svg>
                      </div>
                      <p className="landing-para tw-text-gray-400">
                        170,000 Members
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child">
                  <div
                    data-aos-delay="700"
                    data-aos="fade-up"
                    className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                  >
                    <Image
                      src="/image.png"
                      width={48}
                      height={48}
                      className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                      alt="Jet’s Dream World"
                    />
                    <div className="tw-flex tw-flex-col">
                      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                        <p className="landing-para">Jet’s Dream World</p>
                      </div>
                      <p className="landing-para tw-text-gray-400">
                        400,000 Members
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child">
                  <div
                    data-aos-delay="900"
                    data-aos="fade-up"
                    className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                  >
                    <Image
                      src="/image.png"
                      width={48}
                      height={48}
                      className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                      alt="Aburob Community"
                    />
                    <div className="tw-flex tw-flex-col">
                      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                        <p className="landing-para">Aburob Community</p>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="transparent"
                        >
                          <path
                            d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                            id="Path"
                            fill="#22A55A"
                          ></path>
                          <polygon
                            id="Path"
                            fill="#FFFFFF"
                            fill-rule="nonzero"
                            points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                          ></polygon>
                        </svg>
                      </div>
                      <p className="landing-para tw-text-gray-400">
                        120,000 Members
                      </p>
                    </div>
                  </div>
                </div>
                <div className="child">
                  <div
                    data-aos-delay="1100"
                    data-aos="fade-up"
                    className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                  >
                    <Image
                      src="/image.png"
                      width={48}
                      height={48}
                      className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                      alt="Anime Soul Discord"
                    />
                    <div className="tw-flex tw-flex-col">
                      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                        <p className="landing-para">Anime Soul Discord</p>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="transparent"
                        >
                          <path
                            d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                            id="Path"
                            fill="#22A55A"
                          ></path>
                          <polygon
                            id="Path"
                            fill="#FFFFFF"
                            fill-rule="nonzero"
                            points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                          ></polygon>
                        </svg>
                      </div>
                      <p className="landing-para tw-text-gray-400">
                        688,000 Members
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="marquee">
              <div className="child">
                <div
                  data-aos-delay="100"
                  data-aos="fade-up"
                  className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                >
                  <Image
                    src="/image.png"
                    width={48}
                    height={48}
                    className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                    alt="PewDiePie | Floor Gang"
                  />
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <p className="landing-para">PewDiePie | Floor Gang</p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="transparent"
                      >
                        <path
                          d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                          id="Path"
                          fill="#22A55A"
                        ></path>
                        <polygon
                          id="Path"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                          points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                        ></polygon>
                      </svg>
                    </div>
                    <p className="landing-para tw-text-gray-400">
                      200,000 Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="child">
                <div
                  data-aos-delay="300"
                  data-aos="fade-up"
                  className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                >
                  <Image
                    src="/image.png"
                    width={48}
                    height={48}
                    className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                    alt="PUBG Mobile Mena"
                  />
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <p className="landing-para">PUBG Mobile Mena</p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="transparent"
                      >
                        <path
                          d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                          id="Path"
                          fill="#22A55A"
                        ></path>
                        <polygon
                          id="Path"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                          points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                        ></polygon>
                      </svg>
                    </div>
                    <p className="landing-para tw-text-gray-400">
                      150,000 Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="child">
                <div
                  data-aos-delay="500"
                  data-aos="fade-up"
                  className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                >
                  <Image
                    src="/image.png"
                    width={48}
                    height={48}
                    className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                    alt="oCMz"
                  />
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <p className="landing-para">oCMz</p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 15.2"
                        stroke="transparent"
                      >
                        <path
                          fill="#5865F2"
                          fill-rule="evenodd"
                          d="M16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59S0 8.39 0 7.6s1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8S4.78.28 5.53 0 7.2.83 8 .83s1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59S16 6.81 16 7.6z"
                        ></path>
                        <path
                          d="M10.59 6.4l-1.398.9c-.2.1-.3.1-.5 0-.1-.1-.299-.2-.399-.3-.4-.1-.699 0-.999.2l-.499.3-2.497 1.7c-.6.3-1.299.2-1.598-.4-.4-.5-.2-1.2.3-1.6l2.996-2c.799-.5 1.798-.7 2.697-.5.799.2 1.398.6 1.898 1.2.2.2.1.4 0 .5zM13.487 7.8c0 .4-.2.8-.5 1l-3.096 2c-.599.4-1.198.6-1.897.6-.3 0-.5 0-.8-.1-.799-.2-1.398-.6-1.897-1.2-.1-.2 0-.4.1-.5l1.398-.9c.1-.1.3-.1.4 0 .2.1.399.2.499.3.4 0 .7 0 .999-.2l.699-.4L11.39 7l.3-.2c.499-.3 1.298-.2 1.597.3.2.3.2.5.2.7z"
                          fill="#fff"
                        ></path>
                      </svg>
                    </div>
                    <p className="landing-para tw-text-gray-400">
                      170,000 Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="child">
                <div
                  data-aos-delay="700"
                  data-aos="fade-up"
                  className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                >
                  <Image
                    src="/image.png"
                    width={48}
                    height={48}
                    className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                    alt="Jet’s Dream World"
                  />
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <p className="landing-para">Jet’s Dream World</p>
                    </div>
                    <p className="landing-para tw-text-gray-400">
                      400,000 Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="child">
                <div
                  data-aos-delay="900"
                  data-aos="fade-up"
                  className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                >
                  <Image
                    src="/image.png"
                    width={48}
                    height={48}
                    className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                    alt="Aburob Community"
                  />
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <p className="landing-para">Aburob Community</p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="transparent"
                      >
                        <path
                          d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                          id="Path"
                          fill="#22A55A"
                        ></path>
                        <polygon
                          id="Path"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                          points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                        ></polygon>
                      </svg>
                    </div>
                    <p className="landing-para tw-text-gray-400">
                      120,000 Members
                    </p>
                  </div>
                </div>
              </div>
              <div className="child">
                <div
                  data-aos-delay="1100"
                  data-aos="fade-up"
                  className="tw-ml-[48px] tw-flex tw-items-center tw-gap-4 aos-init aos-animate"
                >
                  <Image
                    src="/image.png"
                    width={48}
                    height={48}
                    className="tw-block tw-h-[48px] tw-w-[48px] tw-rounded"
                    alt="Anime Soul Discord"
                  />
                  <div className="tw-flex tw-flex-col">
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-1">
                      <p className="landing-para">Anime Soul Discord</p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="transparent"
                      >
                        <path
                          d="M16,7.64528384 C16,8.43528384 14.72,9.02528384 14.48,9.73528384 C14.24,10.4452838 14.92,11.7352838 14.48,12.3252838 C14.04,12.9152838 12.64,12.6752838 12.02,13.1252838 C11.4,13.5752838 11.23,14.9652838 10.48,15.2152838 C9.73,15.4652838 8.81,14.4152838 8.01,14.4152838 C7.21,14.4152838 6.26,15.4152838 5.54,15.2152838 C4.82,15.0152838 4.62,13.5752838 4,13.1252838 C3.38,12.6752838 2,12.9452838 1.54,12.3252838 C1.08,11.7052838 1.77,10.4852838 1.54,9.73528384 C1.31,8.98528384 0,8.43528384 0,7.64528384 C0,6.85528384 1.28,6.26528384 1.52,5.55528384 C1.76,4.84528384 1.08,3.55528384 1.52,2.96528384 C1.96,2.37528384 3.37,2.61528384 4,2.16528384 C4.63,1.71528384 4.78,0.32528384 5.53,0.04528384 C6.28,-0.23471616 7.2,0.87528384 8,0.87528384 C8.8,0.87528384 9.75,-0.12471616 10.47,0.07528384 C11.19,0.27528384 11.38,1.71528384 12,2.16528384 C12.62,2.61528384 14,2.34528384 14.46,2.96528384 C14.92,3.58528384 14.23,4.80528384 14.46,5.55528384 C14.69,6.30528384 16,6.85528384 16,7.64528384 Z"
                          id="Path"
                          fill="#22A55A"
                        ></path>
                        <polygon
                          id="Path"
                          fill="#FFFFFF"
                          fill-rule="nonzero"
                          points="7.4 11.17 4 8.62 5 7.26 7 8.79 10.64 4 12 5"
                        ></polygon>
                      </svg>
                    </div>
                    <p className="landing-para tw-text-gray-400">
                      688,000 Members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
           */}
        </div>
      </div>
      <div className="tw-max-w-[1240px] tw-m-auto tw-px-3 lg:tw-px-8">
        <section
          id="features"
          className="tw-flex tw-flex-col tw-gap-56 tw-py-64 tw-pb-0 sm:tw-gap-28 sm:tw-py-40 sm:tw-pb-0"
        >
          <div
            data-aos="fade-up"
            data-aos-offset="150"
            data-aos-duration="600"
            className="tw-flex tw-flex-row-reverse tw-items-center lg:tw-flex-col-reverse lg:tw-gap-12 tw-justify-between aos-init aos-animate"
          >
            <div className="tw-flex tw-max-w-[435px] tw-flex-col tw-gap-8 lg:tw-items-center">
              <div className="tw-flex tw-flex-col tw-gap-6 lg:tw-items-center">
                <div className="tw-bg-[#5753EC0A tw-py-2tw-rounded-full tw-flex tw-w-fit tw-items-center tw-gap-4 tw-font-semibold lg:tw-text-center">
                  <div className="features-tag-icon tw-p-2">
                    <Image
                      alt="Welcome Messages"
                      loading="lazy"
                      style={{
                        width: "auto",
                        height: "auto",
                        color: "transparent",
                      }}
                      width="25"
                      height="24"
                      decoding="async"
                      data-nimg="1"
                      className="tw-block"
                      src="/welcome-icon.svg"
                    />
                  </div>
                  <p className="features-tag-text tw-m-0">Welcome Messages</p>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-5 lg:tw-items-center lg:tw-text-center">
                  <h2 className="landing-headline-sec tw-m-0 tw-max-w-[400px] sm:tw-text-2xl">
                    Let&apos;s Welcome New Members with Style
                  </h2>
                  <p className="landing-para tw-text-gray-400 sm:tw-text-sm">
                    Create your own welcome images, which include the
                    user&apos;s username and avatar, as well as a customizable
                    background image!
                  </p>
                </div>
              </div>
              <div>
                <a href="/features/welcome-messages">
                  <button className="button tw-bg-gray-850 tw-border-solid tw-border-gray-800 hover:tw-bg-gray-800 tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-3 tw-px-6 sm:tw-py-4 sm:tw-text-sm">
                    Learn more about Welcome &amp; GoodBye
                  </button>
                </a>
              </div>
            </div>
            <Image
              alt="Welcome Messages"
              loading="lazy"
              width="563"
              height="326"
              decoding="async"
              data-nimg="1"
              className="sm:tw-w-full sm:tw-h-full"
              style={{ color: "transparent" }}
              src="/welcome.svg"
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="150"
            data-aos-duration="600"
            className="tw-flex tw-items-center lg:tw-flex-row lg:tw-gap-12 tw-justify-between aos-init aos-animate"
          >
            <div className="tw-flex tw-max-w-[435px] tw-flex-col tw-gap-8 lg:tw-items-start lg:tw-text-left">
              <div className="tw-flex tw-flex-col tw-gap-6 lg:tw-items-start lg:tw-text-left">
                <div className="tw-bg-[#5753EC0A] tw-py-2 tw-rounded-full tw-flex tw-w-fit tw-items-center tw-gap-4 tw-font-semibold lg:tw-text-left">
                  <div className="features-tag-icon tw-p-2">
                    <Image
                      alt="Embed Messages"
                      loading="lazy"
                      width="25"
                      height="24"
                      decoding="async"
                      data-nimg="1"
                      className="tw-block"
                      style={{ color: "transparent" }}
                      src="/embed-icon.svg"
                    />
                  </div>
                  <p className="features-tag-text tw-m-0">Embed Messages</p>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-5 lg:tw-items-start lg:tw-text-left">
                  <h2 className="landing-headline-sec tw-m-0 tw-max-w-[400px] sm:tw-text-2xl">
                    Easily create embeds for your server!
                  </h2>
                  <p className="landing-para tw-text-gray-400 sm:tw-text-sm">
                    Illustrate your creativity in embeds by using ProBot&apos;s
                    simple customization and sending it to any preferred
                    channel.
                  </p>
                </div>
              </div>
              <div>
                <a href="/features/embed-messages">
                  <button className="button tw-bg-gray-850 tw-border-solid tw-border-gray-800 hover:tw-bg-gray-800 tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-3 tw-px-6 sm:tw-py-4 sm:tw-text-sm">
                    Learn more about Embed Messages
                  </button>
                </a>
              </div>
            </div>
            <Image
              alt="Embed Messages"
              loading="lazy"
              width="563"
              height="326"
              decoding="async"
              data-nimg="1"
              className="sm:tw-w-full sm:tw-h-full"
              style={{ color: "transparent" }}
              src="/embed.svg"
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-offset="150"
            data-aos-duration="600"
            className="tw-flex tw-flex-row-reverse tw-items-center lg:tw-flex-col-reverse lg:tw-gap-12 tw-justify-between aos-init aos-animate"
          >
            <div className="tw-flex tw-max-w-[435px] tw-flex-col tw-gap-8 lg:tw-items-center">
              <div className="tw-flex tw-flex-col tw-gap-6 lg:tw-items-center">
                <div className="tw-bg-[#5753EC0A tw-py-2tw-rounded-full tw-flex tw-w-fit tw-items-center tw-gap-4 tw-font-semibold lg:tw-text-center">
                  <div className="features-tag-icon tw-p-2">
                    <Image
                      alt="Self-Assignable Roles"
                      loading="lazy"
                      width="25"
                      height="24"
                      decoding="async"
                      data-nimg="1"
                      className="tw-block"
                      style={{ color: "transparent" }}
                      src="/rr-icon.svg"
                    />
                  </div>
                  <p className="features-tag-text tw-m-0">
                    Self-Assignable Roles
                  </p>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-5 lg:tw-items-center lg:tw-text-center">
                  <h2 className="landing-headline-sec tw-m-0 tw-max-w-[400px] sm:tw-text-2xl">
                    React to the messages and get roles!
                  </h2>
                  <p className="landing-para tw-text-gray-400 sm:tw-text-sm">
                    Set up exclusive reaction roles &amp; buttons, select menus,
                    and let your members have the roles they deserve with a
                    single click!
                  </p>
                </div>
              </div>
              <div>
                <a href="/features/self-assignable-role">
                  <button className="button tw-bg-gray-850 tw-border-solid tw-border-gray-800 hover:tw-bg-gray-800 tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-3 tw-px-6 sm:tw-py-4 sm:tw-text-sm">
                    Learn more about Self-Assignable Roles
                  </button>
                </a>
              </div>
            </div>
            <Image
              alt="Self-Assignable Roles"
              loading="lazy"
              width="563"
              height="326"
              decoding="async"
              data-nimg="1"
              className="sm:tw-w-full sm:tw-h-full"
              style={{ color: "transparent" }}
              src="/rr.svg"
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="150"
            data-aos-duration="600"
            className="tw-flex tw-items-center lg:tw-flex-row lg:tw-gap-12 tw-justify-between aos-init aos-animate"
          >
            <div className="tw-flex tw-max-w-[435px] tw-flex-col tw-gap-8 lg:tw-items-start lg:tw-text-left">
              <div className="tw-flex tw-flex-col tw-gap-6 lg:tw-items-start lg:tw-text-left">
                <div className="tw-bg-[#5753EC0A] tw-py-2 tw-rounded-full tw-flex tw-w-fit tw-items-center tw-gap-4 tw-font-semibold lg:tw-text-left">
                  <div className="features-tag-icon tw-p-2">
                    <Image
                      alt="Leveling System"
                      loading="lazy"
                      width="25"
                      height="24"
                      decoding="async"
                      data-nimg="1"
                      className="tw-block"
                      style={{ color: "transparent" }}
                      src="/leveling-icon.svg"
                    />
                  </div>
                  <p className="features-tag-text tw-m-0">Leveling System</p>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-5 lg:tw-items-start lg:tw-text-left">
                  <h2 className="landing-headline-sec tw-m-0 tw-max-w-[400px] sm:tw-text-2xl">
                    Reward your most Active and Engaged Members
                  </h2>
                  <p className="landing-para tw-text-gray-400 sm:tw-text-sm">
                    Reward active members with special level roles, privileged
                    permissions, and channels as they reach a certain level!
                  </p>
                </div>
              </div>
              <div>
                <a href="/features/leveling-system">
                  <button className="button tw-bg-gray-850 tw-border-solid tw-border-gray-800 hover:tw-bg-gray-800 tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-3 tw-px-6 sm:tw-py-4 sm:tw-text-sm">
                    Learn more about Leveling System
                  </button>
                </a>
              </div>
            </div>
            <Image
              alt="Leveling System"
              loading="lazy"
              width="563"
              height="326"
              decoding="async"
              data-nimg="1"
              className="sm:tw-w-full sm:tw-h-full"
              style={{ color: "transparent" }}
              src="/leveling.svg"
            />
          </div>
        </section>
      </div>
      <div className="landing-footer">
        <div className="tw-max-w-[1240px] tw-m-auto tw-px-3 lg:tw-px-8">
          <div className="tw-relative tw-mt-[420px] tw-flex tw-h-full tw-flex-col tw-justify-between tw-gap-12 tw-pt-16 lg:tw-mt-[512px] sm:tw-mt-[280px]">
            <section className="premium_hero_bg tw-absolute tw-top-[-28%] tw-w-full tw-overflow-visible tw-rounded-lg tw-px-8 tw-py-16 lg:tw-top-[-10%] lg:tw-py-12 sm:tw-top-[-8%] sm:tw-px-8 sm:tw-py-8">
              <div className="tw-flex tw-w-full tw-items-start tw-justify-start lg:tw-flex-col lg:tw-items-start lg:tw-gap-8">
                <div className="tw-flex tw-flex-col tw-w-full tw-items-start tw-gap-10 lg:tw-ml-0 lg:tw-gap-8 sm:tw-gap-4">
                  <div className="tw-flex tw-flex-col tw-gap-6 sm:tw-gap-2">
                    <h2 className="landing-headline-sec tw-m-0 tw-text-4xl lg:tw-text-3xl sm:tw-text-2xl">
                      Let ProBot take care of your Server
                    </h2>
                    <p className="landing-para tw-m-0 tw-text-xl tw-text-[#C2C1FB]">
                      Join over
                      <span className="tw-font-bold tw-tracking-tight tw-text-white">
                        9.000.000
                      </span>
                      servers using ProBot
                    </p>
                  </div>
                  <button className="button tw-bg-[#605ceb] tw-border-solid tw-border-[#6965F5] hover:tw-bg-[#807eea] tw-transition-all tw-duration-150 tw-rounded-md tw-text-base tw-py-3 tw-px-6 sm:tw-py-4 tw-w-fit tw-border-none tw-bg-[#ffffff14] sm:tw-w-full">
                    Add To Discord
                  </button>
                </div>
                <div
                  className="tw-absolute tw-bottom-[0px] tw-right-[-200px] tw-animate-fadeIn tw-overflow-visible"
                  dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
                ></div>
              </div>
            </section>

            <div className="tw-mt-48 tw-flex tw-flex-row tw-justify-between lg:tw-mt-56 lg:tw-flex-col lg:tw-gap-7">
              <div className="tw-flex tw-max-w-sm tw-flex-col tw-gap-6">
                <Image
                  alt="probot"
                  loading="lazy"
                  width={139.27}
                  height={36.43}
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="/logo.svg"
                />
                <p className="landing-para tw-text-sm tw-text-gray-400">
                  A very customizable multipurpose bot for welcome image,
                  In-depth logs, Social commands, Moderation and many more ...
                </p>
                <button
                  className="tw-flex tw-h-fit tw-w-fit tw-cursor-pointer tw-gap-3 tw-rounded-md tw-border tw-border-solid tw-border-gray-820 tw-p-[8px] tw-transition-colors tw-duration-100 hover:tw-bg-gray-800"
                  type="button"
                  id="radix-:R1mmj6:"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                >
                  <Image
                    className="tw-rounded"
                    alt="en flag"
                    width="38"
                    height="20"
                    src="/us.png"
                    draggable="false"
                  />
                  <p className="landing-para tw-text-sm tw-text-gray-300">
                    English
                  </p>
                  <Image
                    alt="en"
                    loading="lazy"
                    width="13"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    className="tw-mr-1 tw-opacity-60"
                    style={{ color: "transparent" }}
                    src="/arrow-down.svg"
                  />
                </button>
              </div>
              <div className="tw-flex tw-flex-row tw-gap-20 lg:tw-flex-col lg:tw-gap-8">
                <div className="tw-flex tw-flex-col tw-gap-6">
                  <div className="landing-para">Website Pages</div>
                  <div className="tw-flex tw-flex-col tw-gap-4">
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="/memberships"
                    >
                      Membership
                      <p className="tw-m-0 tw-rounded tw-bg-[#ef67670f] tw-px-2 tw-py-[2px] tw-text-[12px] tw-font-extrabold tw-uppercase tw-text-[#EF6767]">
                        NEW
                      </p>
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="/dashboard"
                    >
                      Dashboard
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="https://docs.probot.io/"
                    >
                      Docs
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="/pricing"
                    >
                      Premium
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="/commands"
                    >
                      Commands
                    </a>
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-6">
                  <div className="landing-para">Other Links</div>
                  <div className="tw-flex tw-flex-col tw-gap-4">
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="https://twitter.com/TryProBot"
                    >
                      Twitter
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="https://discord.gg/ProBot"
                    >
                      Discord
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="https://top.gg/bot/probot"
                    >
                      Top.gg
                    </a>
                  </div>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-6">
                  <div className="landing-para">Rules</div>
                  <div className="tw-flex tw-flex-col tw-gap-4">
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="/terms-of-use"
                    >
                      Terms Of Use
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="/privacy-policy"
                    >
                      Privacy Policy
                    </a>
                    <a
                      className="landing-para tw-flex tw-w-fit tw-items-center tw-gap-2 tw-text-sm tw-text-gray-400 tw-transition-all tw-duration-150 hover:tw-text-gray-200"
                      href="/refund-policy"
                    >
                      Refund Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-mt-14 tw-flex tw-flex-row tw-justify-between tw-border-b-0 tw-border-l-0 tw-border-r-0 tw-border-t-2 tw-border-solid tw-border-t-gray-850 tw-py-8 sm:tw-flex-col sm:tw-items-center sm:tw-gap-5">
              <p className="landing-para tw-m-0 tw-text-sm tw-text-gray-400">
                © 2024 All rights reserved.
              </p>
              <div className="tw-flex tw-flex-row tw-items-center tw-gap-4">
                <a
                  className="tw-rounded-sm tw-transition-all tw-duration-200 hover:tw-bg-gray-850"
                  href="https://discord.gg/probot"
                >
                  <Image
                    alt="discord"
                    loading="lazy"
                    width="28"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    className="tw-block"
                    style={{ color: "transparent" }}
                    src="/discord.svg"
                  />
                </a>
                <a
                  className="tw-rounded-sm tw-transition-all tw-duration-200 hover:tw-bg-gray-850"
                  href="https://www.reddit.com/r/probot"
                >
                  <Image
                    alt="reddit"
                    loading="lazy"
                    width="28"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    className="tw-block"
                    style={{ color: "transparent" }}
                    src="/reddit.svg"
                  />
                </a>
                <a
                  className="tw-rounded-sm tw-transition-all tw-duration-200 hover:tw-bg-gray-850"
                  href="https://twitter.com/TryProBot"
                >
                  <Image
                    alt="twitter"
                    loading="lazy"
                    width="28"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    className="tw-block"
                    style={{ color: "transparent" }}
                    src="/twitter.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-pointer-events-none tw-absolute tw-top-0 tw-w-[100vw] tw-overflow-clip">
        <Image
          src="/landing-bg-min.png"
          priority
          style={{ width: "auto", height: "auto" }}
          width="1131"
          height="739"
          alt="bg-min"
          className="jsx-1070e35b29a6e0d3"
        />
      </div>
    </div>
  );
}

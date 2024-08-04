import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Loading from "./Loading";
import { useRouter } from "next/router";
import { apiClient } from "@/utils/apiClient";

interface Guild {
  id: string;
  name: string;
  icon: string;
}

interface SectionItem {
  title: string;
  path: string;
  icon: string;
  new?: boolean;
  updated?: boolean;
  premium?: boolean;
  status?: string;
  active?: boolean;
}

interface Section {
  title: string;
  items: SectionItem[];
}

interface Data {
  username: string;
  id: string;
  avatar: string;
  guilds: Guild[];
}

const defSections: Section[] = [
  {
    title: "GENERAL",
    items: [
      { title: "Overview", path: "/dashboard", icon: "eye" },
      { title: "Membership", path: "/membership", icon: "diamond", new: true },
      { title: "Manage Premium", path: "/manage-premium", icon: "crown" },
    ],
  },
  {
    title: "CREDIT STORE",
    items: [
      {
        title: "Profile Backgrounds",
        path: "/profile-backgrounds",
        icon: "image",
      },
      { title: "Profile Badges", path: "/profile-badges", icon: "certificate" },
      { title: "ID Backgrounds", path: "/id-backgrounds", icon: "id-card" },
    ],
  },
  {
    title: "LEADERBOARD",
    items: [
      { title: "Top 100 by XP", path: "/top-100-xp", icon: "trophy" },
      {
        title: "Richest 100 billionaires",
        path: "/richest-100",
        icon: "dollar-sign",
      },
    ],
  },
  {
    title: "OTHERS",
    items: [
      { title: "Claim your daily reward", path: "/daily-reward", icon: "gift" },
      {
        title: "Credits Transactions",
        path: "/credits-transactions",
        icon: "exchange-alt",
      },
      { title: "Logout", path: "/logout", icon: "sign-out-alt" },
    ],
  },
];

const defGSections: Section[] = [
  {
    title: "GENERAL",
    items: [
      { title: "Overview", path: "/dashboard", icon: "eye", active: true },
      { title: "Server Settings", path: "/settings", icon: "cog" },
      {
        title: "Embed Messages",
        path: "/embed",
        icon: "window-restore",
        updated: true,
      },
      {
        title: "Get Premium",
        path: "/premium",
        icon: "chevron-circle-up",
      },
    ],
  },
  {
    title: "MODULE SETTINGS",
    items: [
      {
        title: "Utility",
        path: "/utility",
        icon: "sun",
        status: "module-on",
      },
      {
        title: "Moderation",
        path: "/mod",
        icon: "tasks",
        status: "module-on",
      },
      {
        title: "Automod",
        path: "/automod",
        icon: "robot",
        status: "module-off",
      },
      {
        title: "Welcome & Goodbye",
        path: "/welcomer",
        icon: "hand-paper",
        status: "module-on",
      },
      {
        title: "Auto Responder",
        path: "/auto_responder",
        icon: "paper-plane",
        status: "module-on",
      },
      {
        title: "Leveling System",
        path: "/leveling",
        icon: "sort-amount-up",
        status: "module-on",
      },
      {
        title: "Auto Roles",
        path: "/autoroles",
        icon: "medal",
        status: "module-on",
      },
      {
        title: "Logs",
        path: "/logs",
        icon: "history",
        status: "module-on",
      },
      {
        title: "Colors",
        path: "/colors",
        icon: "palette",
        updated: true,
        status: "module-on",
      },
      {
        title: "Self-Assignable Roles",
        path: "/reaction_roles",
        icon: "grin-wink",
        status: "module-on",
      },
      {
        title: "Starboard",
        path: "/starboard",
        icon: "star",
        new: true,
        status: "module-on",
      },
      {
        title: "Temporary Channels",
        path: "/temporary-channel",
        icon: "square-plus",
        status: "module-on",
      },
      {
        title: "Temp Link",
        path: "/temp_link",
        icon: "link",
        premium: true,
        status: "module-on",
      },
      {
        title: "Voice Online",
        path: "/voice_online",
        icon: "microphone-alt",
        premium: true,
        status: "module-on",
      },
      {
        title: "Anti-Raid",
        path: "/anti_raid",
        icon: "hand-paper",
        premium: true,
        status: "module-on",
      },
      {
        title: "VIP Protection",
        path: "/protection",
        icon: "shield-alt",
        premium: true,
        status: "module-on",
      },
    ],
  },
  {
    title: "Notifications",
    items: [
      {
        title: "Twitch",
        path: "/twitch",
        icon: "twitch",
        new: true,
        status: "module-on",
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        title: "Control Panel Logs",
        path: "/panel_logs",
        icon: "wrench",
      },
      { title: "Mod Actions", path: "/mod_actions", icon: "file-alt" },
    ],
  },
];

function uava(name: string) {
  return `https://ui-avatars.com/api/?background=494d54&uppercase=false&color=dbdcdd&size=128&font-size=0.33&name=${encodeURIComponent(
    name
  )}`;
}

// Define the prop types
interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  const [guild, setGuild] = useState<Guild>();
  const [sections, setSections] = useState<Section[] | null>();
  const currentPath = useRouter().pathname.toString();
  const [data, setData] = useState<undefined | Data>(undefined);
  const [secs, setSecs] = useState<string[]>([]);

  useEffect(() => {
    if (!data)
      apiClient("/backend/api/guilds", "GET").then((res) => {
        if (res.data) setData(res.data);
      });
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      // Get data from localStorage
      const storedData = localStorage.getItem("sections");
      if (storedData) setSecs(JSON.parse(storedData));
    }
  }, [data]);

  useEffect(() => {
    if (currentPath.startsWith("/server")) {
      if (data) {
        setSections(defGSections);
        setGuild(
          data?.guilds.find((guild) =>
            window.location.pathname.includes(guild.id)
          )
        );
      }
    } else {
      setSections(defSections);
    }
  }, [currentPath, data]);

  if (!data) return <Loading />;

  return (
    <div className="sidebar_ltr__kXJvp">
      <div className="sidebar_sidebar__servers__rR6kY">
        <div className="user-image">
          <div className=" ">
            <Link
              onClick={() => {
                setGuild(undefined);
              }}
              href="/dashboard"
            >
              <Image
                width={56}
                height={56}
                src={
                  data.avatar
                    ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
                    : uava(data.username)
                }
                className="sidebar_guild__images__mjUJ3 sidebar_user_image__aws4U"
                alt="user"
                draggable="false"
              />
            </Link>
          </div>
        </div>
        {data.guilds.map((guildE) => (
          <div className=" " key={guildE.id} style={{ marginBottom: "6px" }}>
            <Link
              onClick={() => {
                setGuild(data.guilds.find((g) => g.id === guildE.id));
              }}
              href={`/server/${guildE.id}`}
            >
              <Image
                width={128}
                height={128}
                className={`sidebar_guild__images__mjUJ3 ${
                  guild && guildE.id === guild.id
                    ? " sidebar_active-server__jGUqw"
                    : ""
                }`}
                alt={guildE.name}
                src={
                  guildE.icon
                    ? `https://cdn.discordapp.com/icons/${guildE.id}/${guildE.icon}.png`
                    : uava(guildE.name)
                }
                draggable="false"
              />
            </Link>
          </div>
        ))}
      </div>
      {showSidebar && (
        <>
          <div className="sidebar_slider-background-color__pn060"></div>
          <aside className="sidebar_sidebar__1af5q">
            <div className="sidebar_sidebar__links__e439P">
              <div id="sidebar_sidebar__server-info__03ViT">
                <div className="tw-relative" style={{ textAlign: "center" }}>
                  <Image
                    width={56}
                    style={{ display: "math" }}
                    height={56}
                    id="sidebar_sidebar__avatar__QDGRP"
                    draggable="false"
                    src={
                      currentPath.startsWith("/server") && guild
                        ? guild.icon
                          ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                          : uava(guild.name)
                        : data.avatar
                        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
                        : uava(data.username)
                    }
                    alt="avatar"
                  />
                </div>
                <div className="tw-flex tw-w-full tw-mt-2 tw-items-center tw-justify-center tw-gap-2">
                  <h4>
                    {currentPath.startsWith("/server") && guild
                      ? guild.name
                      : data.username}
                  </h4>
                </div>
              </div>
              <div id="sidebar_sidebar__items__5Hd7R">
                {sections ? (
                  sections.map((section) => (
                    <div key={section.title}>
                      <div
                        onClick={() => {
                          // Retrieve the current sections from localStorage and parse it into an array
                          const nowSec = JSON.parse(
                            localStorage.getItem("sections") || "[]"
                          );

                          const sections: string[] =
                            nowSec && Array.isArray(nowSec) ? nowSec : [];

                          // Check if the section title is already in the array
                          const titleIndex = sections.indexOf(section.title);

                          if (titleIndex !== -1)
                            // If title exists, remove it
                            sections.splice(titleIndex, 1);
                          // If title does not exist, add it
                          else sections.push(section.title);

                          setSecs(sections);

                          // Store the updated array back in localStorage
                          localStorage.setItem(
                            "sections",
                            JSON.stringify(sections)
                          );
                        }}
                        className="sidebar_sidebar__general-item__gVnTX sidebar_category_opened__uVDac"
                      >
                        {!secs.includes(section.title) ? (
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L5 5L9 1"
                              stroke="#878787"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            width="6"
                            height="10"
                            viewBox="0 0 6 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L5 5L1 9"
                              stroke="#878787"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        )}
                        <h3 style={{ marginBottom: "5px" }}>{section.title}</h3>
                      </div>
                      {!secs.includes(section.title) &&
                        section.items.map((item) => (
                          <Link
                            href={
                              currentPath.startsWith("/server")
                                ? `/server/${guild ? guild.id : ""}${item.path}`
                                : item.path
                            }
                            key={item.path}
                          >
                            <div
                              className={`sidebar_sidebar__general-item-row__0z2Gp ${
                                currentPath.includes(item.path)
                                  ? "sidebar_sidebar__link-active__Jepms"
                                  : ""
                              }`}
                            >
                              <div className="sidebar_sidebar__sidebar-link__1NU9L">
                                <div>
                                  <i className={`fas fa-${item.icon}`}></i>
                                  {item.title}
                                  {item.new && (
                                    <span className="sidebar_new-component-tag__LpRQP new-component-tag">
                                      NEW
                                    </span>
                                  )}
                                  {item.updated && (
                                    <span className="sidebar_updated-component-tag__LpRQP updated-component-tag">
                                      UPDATED
                                    </span>
                                  )}
                                  {item.premium && (
                                    <span className="sidebar_premium-component-tag__LpRQP vip-component-tag">
                                      PREMIUM
                                    </span>
                                  )}
                                </div>
                                {item.status && (
                                  <i
                                    className={
                                      item.status.endsWith("on")
                                        ? "fa fa-check-circle module-on success-circle"
                                        : "fas fa-circle iconify sidebar-circle-icon"
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default Sidebar;

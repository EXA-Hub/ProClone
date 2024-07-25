import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Guild {
  id: string;
  name: string;
  iconUrl: string;
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
        path: "/notifications/twitch",
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

const Sidebar: React.FC = () => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [guild, setGuild] = useState<Guild>();
  const [sections, setSections] = useState<Section[]>(defSections);
  const currentPath = useRouter().pathname.toString();

  useEffect(() => {
    if (currentPath.startsWith("/server")) {
      setSections(defGSections);
      const wanted = guilds.find((guild) =>
        window.location.pathname.includes(guild.id)
      );
      setGuild(wanted);
    } else {
      setSections(defSections);
    }
  }, [currentPath, guilds]);

  useEffect(() => {
    axios
      .get("/backend/api/guilds")
      .then((response) => {
        setGuilds(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch guilds", error);
        setGuilds([
          { id: "1", name: "Guild 1", iconUrl: "/image.png" },
          { id: "2", name: "Guild 2", iconUrl: "/image.png" },
          { id: "3", name: "Guild 3", iconUrl: "/image.png" },
        ]);
      });
  }, []);

  return (
    <div className="sidebar_ltr__kXJvp">
      <div className="sidebar_sidebar__servers__rR6kY">
        <div className="user-image">
          <div className=" ">
            <Link href="/dashboard">
              <Image
                width={56}
                height={56}
                src="https://cdn.discordapp.com/avatars/635933198035058700/4855c8d3f3dc75d8a0e0f53fe2e58263.png?size=1024"
                className="sidebar_guild__images__mjUJ3 sidebar_user_image__aws4U"
                alt="user"
                draggable="false"
              />
            </Link>
          </div>
        </div>
        {guilds.map((guild) => (
          <div className=" " key={guild.id} style={{ marginBottom: "6px" }}>
            <Link
              onClick={() => {
                setGuild(guilds.find((g) => g.id === guild.id));
              }}
              href={`/server/${guild.id}`}
            >
              <Image
                width={56}
                height={56}
                className="sidebar_guild__images__mjUJ3"
                alt={guild.name}
                src={guild.iconUrl}
                draggable="false"
              />
            </Link>
          </div>
        ))}
      </div>
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
                    ? guild.iconUrl
                    : "https://cdn.discordapp.com/avatars/635933198035058700/4855c8d3f3dc75d8a0e0f53fe2e58263.png?size=1024"
                }
                alt="avatar"
              />
            </div>
            <div className="tw-flex tw-w-full tw-mt-2 tw-items-center tw-justify-center tw-gap-2">
              <h4>
                {currentPath.startsWith("/server") && guild
                  ? guild.name
                  : "zampx"}
              </h4>
            </div>
          </div>
          <div id="sidebar_sidebar__items__5Hd7R">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="sidebar_sidebar__general-item__gVnTX sidebar_category_opened__uVDac">
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
                  <h3 style={{ marginBottom: "5px" }}>{section.title}</h3>
                </div>
                {section.items.map((item) => (
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
                            <span className="sidebar_premium-component-tag__LpRQP premium-component-tag">
                              PREMIUM
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

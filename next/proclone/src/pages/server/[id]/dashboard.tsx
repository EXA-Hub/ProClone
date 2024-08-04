import "@/styles/GDashboard.css";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-select";

// Import Recharts components
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper function to get the number of days passed this month
const getDaysPassedThisMonth = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysPassed =
    Math.floor(
      (today.getTime() - firstDayOfMonth.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1; // +1 to include today
  return daysPassed;
};

// Define the options for the select dropdown
const options = [
  { value: 7, label: "Last 7 Days", isDisabled: false },
  { value: 30, label: "Last 30 Days", isDisabled: false },
  { value: getDaysPassedThisMonth(), label: "This Month", isDisabled: false },
  { value: 90, label: "Last 3 Months (Premium)", isDisabled: true },
  { value: 180, label: "Last 6 Months (Premium)", isDisabled: true },
  { value: 365, label: "Last 1 Year (Premium)", isDisabled: true },
];

interface DashboardProps {
  id: string;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const router = useRouter();
  const [days, setDays] = useState<number>(7);
  const [data, setData] = useState<
    {
      id: string;
      guild: string;
      date: string;
      messages: number;
      members: number;
      joined: number;
      left: number;
      xp: Record<
        string,
        {
          textXP: number;
          voiceXP: number;
        }
      >;
    }[]
  >([]);

  useEffect(() => {
    if (router.query.id)
      apiClient(`/backend/api/guild/logs`, "GET", {
        params: {
          guildId: router.query.id,
          days,
        },
      }).then((res) => {
        if (res.success) setData(res.data.logs);
      });
  }, [days, router]);

  const lastLog = data.length > 0 ? data[data.length - 1] : null;

  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            <div>
              <div className="PagesTitle_pages-title__E_aAk undefined">
                <div>
                  <h3 className="mt-10">Overview</h3>
                </div>
                <div />
              </div>
              <div className="component-container mt-30">
                <div className="row ms-1 me-1 gap-3 mb-3 ">
                  <div className="overview_card__MsjbH col-md">
                    <div className="overview_credits__NrLTV">
                      <i className="fas fa-comments" />
                      <div>
                        <h5>New Messages</h5>
                        <p>in the last 24h</p>
                      </div>
                    </div>
                    <h3>{lastLog ? lastLog.messages : "0000"}</h3>
                  </div>
                  <div className="overview_card__MsjbH col-md">
                    <div className="overview_level__D6GwS">
                      <i className="fas fa-user-plus" />
                      <div>
                        <h5>Joins/Leaves</h5>
                        <p>in the last 24h</p>
                      </div>
                    </div>
                    <h3>
                      {lastLog ? `${lastLog.joined}/${lastLog.left}` : "00/00"}
                    </h3>
                  </div>
                  <div className="overview_card__MsjbH col-md">
                    <div className="overview_reputation__EabL4">
                      <i className="fas fa-users" />
                      <div>
                        <h5>Total Members</h5>
                      </div>
                    </div>
                    <h3>{lastLog ? lastLog.members : "0"}</h3>
                  </div>
                </div>
                <h5>Charts over</h5>
                <div className=" css-b62m3t-container">
                  <Select
                    options={options}
                    placeholder="Select an option"
                    className="formselect__control"
                    classNamePrefix="formselect"
                    onChange={(selectedOption) => {
                      if (selectedOption) setDays(selectedOption.value);
                    }}
                    defaultValue={options.find(
                      (option) => option.value === days
                    )}
                  />
                </div>

                <div className="row row-cols-1 mt-2 row-cols-lg-2">
                  <div className="col">
                    <div className="black-container" style={{ height: 300 }}>
                      <h5>Memberflow</h5>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={data}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid stroke="none" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="members"
                            stroke="#705be1"
                            fill="#705be1"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="col">
                    <div className="black-container" style={{ height: 300 }}>
                      <h5>Joins / Leaves</h5>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={data}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid stroke="none" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="left"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="joined"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <div className="black-container" style={{ height: 300 }}>
                      <h5>Number of messages (excl. Bots)</h5>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={data}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid stroke="none" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            stroke="#e2409e"
                            dataKey="messages"
                            fill="#e2409e"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

import { getStatistic } from "@/api/query-option";
import TinyLineChart from "@/components/common/TinyLineChart";
import SelectBox from "@/components/custom/SelectBox";
import { BADGE, CROWN, USER } from "@/lib/images";
import { chartFilterOptions } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const stats = [
  {
    label: "Total Users",
    icon: <img src={USER} alt="user" />,
    dataKey: "totalUsers",
  },
  {
    label: "Premium Membership Users",
    icon: <img src={CROWN} alt="crown" />,
    dataKey: "premiumMemberShipUsers",
  },
  {
    label: "Free Trial Users",
    icon: <img src={BADGE} alt="badge" />,
    dataKey: "freeTrialUsers",
  },
];

const Card = ({ children, className }) => (
  <div
    className={`bg-white rounded-[20px] p-5 flex flex-row items-center justify-between gap-4 ${className}`}
  >
    {children}
  </div>
);

const Statistics = () => {
  const [range, setRange] = useState("weekly");

  const statisticsData = useQuery(getStatistic({ type: range }));

  if (statisticsData.isError) return null;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6 rounded-xl sm:flex-row">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="flex-1 flex flex-row items-start justify-between"
          >
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="text-[#7E808C] text-sm font-normal sm:text-base">
                {stat.label}
              </div>
              {statisticsData.isFetching ? (
                <div className="h-8 w-full bg-[#7E808C] opacity-20 rounded-sm animate-pulse" />
              ) : (
                <div className="text-2xl font-semibold text-black sm:text-3xl">
                  {statisticsData.data.data[stat.dataKey]}
                </div>
              )}
            </div>
            <div className="shrink-0 size-[46px] rounded-[6px]">
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-[42px] p-6">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-xl font-semibold text-[#1F1F24]">
            Premium Membership Users Statistics
          </h3>
          <div className="flex items-center gap-6">
            <div className="flex gap-2 items-center">
              <span
                className="w-4 h-4 rounded-[4.32px] bg-main"
                aria-hidden="true"
              />
              <span className="text-sm font-normal text-[#7E808C]">
                Premium Users
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span
                className="w-4 h-4 rounded-[4.32px] bg-[#1E1614]"
                aria-hidden="true"
              />
              <span className="text-sm font-normal text-[#7E808C]">
                Free Trial User
              </span>
            </div>
            <SelectBox
              value={range}
              setValue={setRange}
              options={chartFilterOptions}
            />
          </div>
        </div>
        <TinyLineChart
          chartData={statisticsData.data.data.list}
          filter={range}
          setFilter={setRange}
        />
      </div>
    </div>
  );
};

export default Statistics;

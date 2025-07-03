import TinyLineChart from "@/components/common/TinyLineChart";
import SelectBox from "@/components/custom/SelectBox";
import { BADGE, CROWN, USER } from "@/lib/images";
import { chartFilterOptions } from "@/utils/constants";
import { useEffect, useState } from "react";

const stats = [
  {
    label: "Total Users",
    value: 1000,
    icon: <img src={USER} alt="user" className=""/>,
  },
  {
    label: "Premium Membership Users",
    value: 750,
    icon: <img src={CROWN} alt="crown" />,
  },
  {
    label: "Free Trial Users",
    value: 250,
    icon: <img src={BADGE} alt="badge" />,
  },
];

const Card = ({ children, className }) => (
  <div
    className={`bg-white rounded-[20px] p-5 flex flex-row items-center justify-between gap-4 ${className}`}
  >
    {children}
  </div>
);

const chartDataYear = [
  { label: "JAN", premium: 2, free: 5 },
  { label: "FEB", premium: 3, free: 7 },
  { label: "MAR", premium: 4, free: 2 },
  { label: "APR", premium: 5, free: 3 },
  { label: "MAY", premium: 6, free: 4 },
  { label: "JUN", premium: 7, free: 5 },
  { label: "JUL", premium: 8, free: 6 },
  { label: "AUG", premium: 9, free: 7 },
  { label: "SEP", premium: 10, free: 8 },
  { label: "OCT", premium: 11, free: 9 },
  { label: "NOV", premium: 12, free: 10 },
  { label: "DEC", premium: 13, free: 11 },
];

const chartDataMonth = [
  { label: "1", premium: 2, free: 3 },
  { label: "2", premium: 3, free: 4 },
  { label: "3", premium: 4, free: 2 },
  { label: "4", premium: 5, free: 3 },
  { label: "5", premium: 6, free: 4 },
  { label: "6", premium: 7, free: 5 },
  { label: "7", premium: 8, free: 6 },
  { label: "8", premium: 7, free: 5 },
  { label: "9", premium: 6, free: 4 },
  { label: "10", premium: 5, free: 3 },
  { label: "11", premium: 4, free: 2 },
  { label: "12", premium: 3, free: 4 },
  { label: "13", premium: 2, free: 3 },
  { label: "14", premium: 3, free: 4 },
  { label: "15", premium: 4, free: 2 },
  { label: "16", premium: 5, free: 3 },
  { label: "17", premium: 6, free: 4 },
  { label: "18", premium: 7, free: 5 },
  { label: "19", premium: 8, free: 6 },
  { label: "20", premium: 7, free: 5 },
  { label: "21", premium: 6, free: 4 },
  { label: "22", premium: 5, free: 3 },
  { label: "23", premium: 4, free: 2 },
  { label: "24", premium: 3, free: 4 },
  { label: "25", premium: 2, free: 3 },
  { label: "26", premium: 3, free: 4 },
  { label: "27", premium: 4, free: 2 },
  { label: "28", premium: 5, free: 3 },
  { label: "29", premium: 6, free: 4 },
  { label: "30", premium: 7, free: 5 },
];

const chartDataWeek = [
  { label: "MON", premium: 2, free: 3 },
  { label: "TUE", premium: 3, free: 4 },
  { label: "WED", premium: 4, free: 2 },
  { label: "THU", premium: 5, free: 3 },
  { label: "FRI", premium: 6, free: 4 },
  { label: "SAT", premium: 7, free: 5 },
  { label: "SUN", premium: 8, free: 6 },
];

const Statistics = () => {
  const [range, setRange] = useState("year");
  const [chartData, setChartData] = useState(chartDataYear);

  useEffect(() => {
    if (range === "year") {
      setChartData(chartDataYear);
    } else if (range === "month") {
      setChartData(chartDataMonth);
    } else if (range === "week") {
      setChartData(chartDataWeek);
    }
  }, [range]);

  return (
    <div className="p-6">
      {/* Statistics Cards */}
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
              <div className="text-2xl font-semibold text-black sm:text-3xl">
                {stat.value}
              </div>
            </div>
            <div className="shrink-0 size-[46px] rounded-[6px]">{stat.icon}</div>
          </Card>
        ))}
      </div>

      {/* Line Chart */}
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
              <span className="text-sm font-normal text-[#7E808C]">Premium Users</span>
            </div>
            <div className="flex gap-2 items-center">
              <span
                className="w-4 h-4 rounded-[4.32px] bg-[#1E1614]"
                aria-hidden="true"
              />
              <span className="text-sm font-normal text-[#7E808C]">Free Trial User</span>
            </div>
            <SelectBox
              value={range}
              setValue={setRange}
              options={chartFilterOptions}
            />
          </div>
        </div>
        <TinyLineChart
          chartData={chartData}
          filter={range}
          setFilter={setRange}
        />
      </div>
    </div>
  );
};

export default Statistics;

import { Fragment } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat.jsx";
import { formatCurrency } from "../../utils/helpers.js";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);

  const checkIns = confirmedStays.length;

  const occupation = Math.round(
    (confirmedStays.reduce((acc, cur) => {
      return acc + cur.numNights;
    }, 0) /
      Number(numDays * cabinCount)) *
      100
  );

  return (
    <Fragment>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupation}%`}
      />
    </Fragment>
  );
};

export default Stats;

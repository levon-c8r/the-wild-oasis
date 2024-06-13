import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings.js";
import { useRecentStays } from "./hooks/useRecentStays.js";
import Stats from "./Stats.jsx";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import Spinner from "../../ui/Spinner.jsx";
import { useCabins } from "../cabins/hooks/useCabins.js";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isBookingsLoading, numDays } = useRecentBookings();
  const { confirmedStays, isLoading: isStaysLoading } = useRecentStays();
  const { cabins, isCabinsLoading } = useCabins();

  if (isBookingsLoading || isStaysLoading || isCabinsLoading) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;

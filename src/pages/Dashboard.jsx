import { Fragment } from "react";
import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";
import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";

function Dashboard() {
  return (
    <Fragment>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </Fragment>
  );
}

export default Dashboard;

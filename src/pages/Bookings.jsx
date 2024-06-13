import { Fragment } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";

function Bookings() {
  return (
    <Fragment>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </Fragment>
  );
}

export default Bookings;

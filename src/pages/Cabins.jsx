import { Fragment } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddCabins from "../features/cabins/AddCabins.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";

function Cabins() {
  return (
    <Fragment>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabins />
      </Row>
    </Fragment>
  );
}

export default Cabins;

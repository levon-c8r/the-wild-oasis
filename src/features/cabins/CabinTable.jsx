import { useSearchParams } from "react-router-dom";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./hooks/useCabins.js";
import Spinner from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.jsx";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins?.length) {
    return <Empty resource="cabins" />;
  }

  const filterValue = searchParams.get("discount") ?? "all";

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
  }

  const sortBy = searchParams.get("sortBy") ?? "name-asc";
  const [sortField, sortDirection] = sortBy.split("-");
  const modifier = sortDirection === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => modifier * (a[sortField] - b[sortField])
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;

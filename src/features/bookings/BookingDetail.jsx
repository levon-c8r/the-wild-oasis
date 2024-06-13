import styled from "styled-components";
import { Fragment, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./hooks/useBooking.js";
import { useDeleteBooking } from "./hooks/useDeleteBooking.js";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import Empty from "../../ui/Empty.jsx";
import Spinner from "../../ui/Spinner.jsx";
import { useCheckOut } from "../check-in-out/hooks/useCheckOut.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking(bookingId);
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isLoading: isDeleteLoading } = useDeleteBooking();
  const navigate = useNavigate();

  const deleteHandler = useCallback(() => {
    navigate("/bookings");
    deleteBooking(bookingId);
  }, [deleteBooking, bookingId, navigate]);

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!booking && !isLoading) {
    return <Empty resource="booking" />;
  }

  const { status } = booking;

  return (
    <Fragment>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkIn/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => {
                checkOut(bookingId);
              }}
              disabled={isDeleteLoading || isCheckingOut}
            >
              Check out
            </Button>
          )}
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            onConfirm={deleteHandler}
            resourceName="booking"
            disabled={isDeleteLoading || isCheckingOut}
          />
        </Modal.Window>
      </Modal>
    </Fragment>
  );
}

export default BookingDetail;

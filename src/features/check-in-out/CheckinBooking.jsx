import styled from "styled-components";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCheckIn } from "./hooks/useCheckIn.js";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/hooks/useBooking.js";
import Empty from "../../ui/Empty.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Checkbox from "../../ui/Checkbox.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useSettings } from "../settings/hooks/useSettings.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking(bookingId);
  const { checkIn, isCheckingIn } = useCheckIn();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const moveBack = useMoveBack();

  const { guests, totalPrice, numGuests, hasBreakfast, numNights, isPaid } =
    booking ?? {};

  const optionalBreakfastPrice = settings?.breakfastPrice * numGuests * numNights;

  const handleCheckin = useCallback(() => {
    if (!confirmPaid) {
      return;
    }

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }, [
    checkIn,
    bookingId,
    confirmPaid,
    addBreakfast,
    optionalBreakfastPrice,
    totalPrice,
  ]);

  useEffect(() => setConfirmPaid(isPaid ?? false), [isPaid]);

  useEffect(() => setAddBreakfast(hasBreakfast ?? false), [hasBreakfast]);

  if (isLoading || isSettingsLoading) {
    return <Spinner />;
  }

  if (!booking && !isLoading) {
    return <Empty resource="booking" />;
  }

  return (
    <Fragment>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)}, ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Fragment>
  );
}

export default CheckinBooking;

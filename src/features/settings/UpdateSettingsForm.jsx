import { useCallback } from "react";
import { useSettings } from "./hooks/useSettings.js";
import { useUpdateSetting } from "./hooks/useUpdateSetting.js";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import Spinner from "../../ui/Spinner.jsx";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxNumberGuestsPerBooking,
    breakfastPrice,
  } = settings ?? {};

  const { updateSetting } = useUpdateSetting();

  const handleUpdate = useCallback(
    (e, fieldName) => {
      const value = Number(e.target.value);

      if (!fieldName || settings[fieldName] === value) {
        return;
      }

      updateSetting({ [fieldName]: value });
    },
    [updateSetting, settings]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxNumberGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxNumberGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

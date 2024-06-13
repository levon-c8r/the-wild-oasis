import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useCreateCabin } from "./hooks/useCreateCabin.js";
import { useEditCabin } from "./hooks/useEditCabin.js";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEdit = !!editId;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValue : {},
  });

  const { errors } = formState;

  const { createCabin, isCreateLoading } = useCreateCabin();
  const { editCabin, isEditLoading } = useEditCabin();

  const isLoading = isEditLoading || isCreateLoading;

  const onSubmit = useCallback(
    (data) => {
      const image = typeof data.image === "string" ? data.image : data.image[0];

      if (isEdit) {
        editCabin(
          { newCabinData: { ...data, image }, id: editId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        );
      } else {
        createCabin(
          { ...data, image },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        );
      }
    },
    [createCabin, editCabin, isEdit, editId, reset, onCloseModal]
  );

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>{isEdit ? "Edit" : "Add"} cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

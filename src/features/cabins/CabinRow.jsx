import styled from "styled-components";
import { useCallback } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./hooks/useDeleteCabin.js";
import { useCreateCabin } from "./hooks/useCreateCabin.js";
import { formatCurrency } from "../../utils/helpers.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;
  const { createCabin } = useCreateCabin();

  const { deleteCabin, isLoading } = useDeleteCabin();

  const deleteHandler = useCallback(() => {
    deleteCabin(id);
  }, [id, deleteCabin]);

  const duplicateHandler = useCallback(() => {
    createCabin({
      name: `${name} (copy)`,
      regularPrice,
      maxCapacity,
      discount,
      image,
      description,
    });
  }, [name, regularPrice, maxCapacity, discount, description, createCabin, image]);

  return (
    <Table.Row>
      <Img src={image || null} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button onClick={duplicateHandler} icon={<HiSquare2Stack />}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={deleteHandler}
              resourceName={name}
              disabled={isLoading}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;

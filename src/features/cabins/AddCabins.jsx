import CreateCabinForm from "./CreateCabinForm.jsx";
import { Button } from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";

const AddCabins = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabins;

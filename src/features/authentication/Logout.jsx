import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./hooks/useLogout.js";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;

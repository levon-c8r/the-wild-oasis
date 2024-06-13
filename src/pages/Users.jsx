import { Fragment } from "react";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm.jsx";

function NewUsers() {
  return (
    <Fragment>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </Fragment>
  );
}

export default NewUsers;

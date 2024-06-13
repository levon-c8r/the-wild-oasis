import styled from "styled-components";
import { Fragment } from "react";
import Header from "./Header.jsx";
import { Button } from "./Button.jsx";
import GlobalStyles from "../styles/GlobalStyles.jsx";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Fragment>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Header as="h1">Something went wrong !</Header>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </Fragment>
  );
};

export default ErrorFallback;

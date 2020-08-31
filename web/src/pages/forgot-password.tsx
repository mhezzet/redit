import React, { useState } from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";

import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  AlertDescription,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useForgotPasswordMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

const ForgotPassword: NextPage = () => {
  const [emailSent, setEmailSent] = useState(false);

  const [, forgotPassword] = useForgotPasswordMutation();

  return <Wrapper variant="small">
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values) => {
        await forgotPassword(values);
        setEmailSent(true);
      }}
    >
      {({ isSubmitting }) =>
        emailSent
          ? <Alert mt={6} status="success">
            <AlertIcon />
            <AlertDescription>
              reset password link had been sent to your email
            </AlertDescription>
          </Alert>
          : <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
            />
            <Button
              isLoading={isSubmitting}
              mt={6}
              variantColor="teal"
              type="submit"
            >
              reset password
            </Button>
          </Form>}
    </Formik>
  </Wrapper>;
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

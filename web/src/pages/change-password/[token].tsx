import React, { useState } from "react";
import { NextPage } from "next";
import Wrapper from "../../components/Wrapper";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import {
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

type ChangePasswordProps = {
  token: string;
};

const ChangePassword: NextPage<ChangePasswordProps> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return <Wrapper variant="small">
    <Formik
      initialValues={{ newPassword: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await changePassword({ ...values, token });

        const errors = response.data?.changePassword.errors;
        const user = response.data?.changePassword.user;

        if (errors) {
          const tokenError = errors.find((error) => error.field === "token");
          if (tokenError) setTokenError(tokenError.message);
          setErrors(toErrorMap(errors));
        } else if (user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="newPassword"
            placeholder="new assword"
            type="password"
            label="New Password"
          />
          {tokenError && <Alert mt={6} status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{tokenError}</AlertTitle>
            <CloseButton
              onClick={() => setTokenError("")}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>}
          <Button
            isLoading={isSubmitting}
            mt={6}
            variantColor="teal"
            type="submit"
          >
            Change Password
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>;
};

ChangePassword.getInitialProps = ({ query }) => ({
  token: query.token as string,
});

export default withUrqlClient(createUrqlClient)(ChangePassword);

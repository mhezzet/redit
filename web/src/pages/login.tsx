import React from "react";
import { Formik, Form } from "formik";
import Wrapper from "../components/Wrapper";
import { Button, Box, Flex, Link } from "@chakra-ui/core";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const [, register] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ ...values });

          const errors = response.data?.login.errors;
          const user = response.data?.login.user;

          if (errors) {
            setErrors(toErrorMap(errors));
          } else if (user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username Or Email"
              label="Username Or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="password"
                type="password"
              />
            </Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Button
                isLoading={isSubmitting}
                mt={6}
                mr={6}
                variantColor="teal"
                type="submit"
              >
                Login
              </Button>
              <NextLink href="/forgot-password">
                <Link>Forgot Password</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);

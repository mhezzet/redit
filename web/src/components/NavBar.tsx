import React, { useCallback } from "react";
import { Box, Link, Flex, Spinner, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const [{ data, fetching: getMeFetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const authLinks = useCallback(() => {
    if (data?.me) {
      return (
        <Flex alignItems="baseline">
          <Box color="#1d3557" mr={3}>
            {data.me.username}
          </Box>
          <Button onClick={() => logout()} color="#1d3557" variant="link">
            logout
          </Button>
        </Flex>
      );
    } else if (getMeFetching || logoutFetching) {
      return <Spinner color="#1d3557" size="sm" />;
    } else {
      return (
        <>
          <NextLink href="/login">
            <Link color="#1d3557" mr={3}>
              Login
            </Link>
          </NextLink>
          <NextLink color="#1d3557" href="/register">
            <Link>Register</Link>
          </NextLink>
        </>
      );
    }
  }, [data, logoutFetching, getMeFetching]);

  return (
    <Flex bg="#a8dadc" p={4}>
      <Box ml="auto">{authLinks()}</Box>
    </Flex>
  );
};
export default NavBar;

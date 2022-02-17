import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getEventType } from "../../util";
import styles from "./index.module.css";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";

const EventDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  console.log(location.state);

  const desiredEventList = location.state.desiredEventList;
  const loggedIn = location.state.loggedIn;

  const getEventDetailsByID = (id, events) => {
    const currEvent = events?.filter((event) => event.id == id);
    return currEvent[0];
  };

  const currentEvent = getEventDetailsByID(id, desiredEventList);
  return (
    <>
      <Text m={5}>
        <Link style={{ color: "teal" }} to="/">
          {" "}
          Back to events list page
        </Link>
      </Text>
      <Box
        m={"auto"}
        mt={"5%"}
        className={styles.detailStyle}
        maxW="2xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="#E7F6FC"
      >
        <Text m={6}>
          <strong>Event name:</strong> {currentEvent?.name}
        </Text>
        <Text m={6}>
          <strong>Event type:</strong> {getEventType(currentEvent?.event_type)}
        </Text>
        <Text m={6}>
          <strong>Start time:</strong>{" "}
          {"  " + new Date(currentEvent?.start_time).toUTCString()}
        </Text>
        <Text m={6}>
          <strong>End time:</strong>{" "}
          {"  " + new Date(currentEvent?.end_time).toUTCString()}
        </Text>
        <Text m={6}>
          <strong>Description:</strong> {currentEvent?.description}
        </Text>
        <Text ml={6} mr={3} style={{ display: "inline-block" }}>
          <strong>Links:</strong>
        </Text>
        {currentEvent?.public_url !== "" && (
          <ChakraLink
            mr={2}
            color="teal.500"
            href={currentEvent?.public_url}
            target="_blank"
          >
            YouTube
          </ChakraLink>
        )}
        {loggedIn && currentEvent.private_url !== "" && (
          <ChakraLink
            color="teal.500"
            href={currentEvent?.private_url}
            target="_blank"
          >
            Hopin
          </ChakraLink>
        )}
        <Text m={6}>
          <strong>Related events:</strong>
        </Text>
        {currentEvent?.related_events.map((id) => {
          const relatedEvent = getEventDetailsByID(id, desiredEventList);
          return (
            <Text m={5}>
              <Link
                style={{ color: "teal" }}
                key={id}
                to={`/events/${id}`}
                state={{ desiredEventList, loggedIn }} // https://ui.dev/react-router-pass-props-to-link
              >
                {relatedEvent?.permission === "private" ? (
                  loggedIn && <Text>{relatedEvent?.name}</Text>
                ) : (
                  <Text>{relatedEvent?.name}</Text>
                )}
              </Link>
            </Text>
          );
        })}
      </Box>
    </>
  );
};

export default EventDetail;

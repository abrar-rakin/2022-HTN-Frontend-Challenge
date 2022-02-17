import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Badge } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { getEventType } from "../../util";
import styles from "./index.module.css";

const EventList = ({ desiredEventList, loggedIn }) => {
  return (
    <div>
      {desiredEventList?.map((event) => (
        <Link
          key={event?.id}
          to={`/events/${event?.id}`} // https://ui.dev/react-router-pass-props-to-link
          state={{
            desiredEventList,
            loggedIn,
          }}
        >
          <Box
            className={styles.boxStyle}
            bg="#E7F6FC"
            w="80%"
            p={6}
            borderRadius="md"
          >
            <Text style={{ display: "inline-block" }} fontSize="lg">
              {(event?.name).toUpperCase()}
            </Text>
            <Badge ml="2" borderRadius="full" px="2" colorScheme="teal">
              {getEventType(event?.event_type)}
            </Badge>
            <Badge ml="2" borderRadius="full" px="2" colorScheme="blue">
              <CalendarIcon />
              {"  " + new Date(event?.start_time).toUTCString()}
            </Badge>
          </Box>
        </Link>
      ))}
    </div>
  );
};

export default EventList;

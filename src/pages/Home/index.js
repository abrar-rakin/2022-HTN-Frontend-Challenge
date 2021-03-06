import React, { useEffect, useState } from "react";
import EventList from "../../components/EventList";
import {
  HStack,
  Button,
  Text,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // list of all events - both public and private
  const [allEvents, setAllEvents] = useState([]);
  // determines when to show Alert for wrong email/password
  const [isErrorState, setIsErrorState] = useState(false);
  // ensures only public events are shown when not logged in
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  // filtered events by permission (private/public)
  const [filteredEvents, setFilteredEvents] = useState([]);
  // sorted event list (after filtering)
  const [allSortedEvents, setAllSortedEvents] = useState([]);
  // filtered events by category
  const [filteredEventsByCategory, setFilteredEventsByCategory] = useState([]);
  // determines if user is logged in or not
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setIsInitialLoading(true);
    if (email == "abrar@gmail.com" && password == "abrar1234") {
      setLoggedIn(true);
      setIsErrorState(false);
    } else {
      setIsErrorState(true);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const url = "https://api.hackthenorth.com/v3/events";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setAllEvents(json);
        if (loggedIn) {
          setFilteredEvents(allEvents);
        } else {
          const onlyPublicEvents = allEvents.filter(
            (e) => e.permission === "public"
          );
          setFilteredEvents(onlyPublicEvents);
        }
        const sortedFilteredEvents = filteredEvents.sort(function (x, y) {
          return x.start_time - y.start_time; // sorting by start time
        });
        setAllSortedEvents(sortedFilteredEvents);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [filteredEvents, loggedIn]);

  const handleFiltering = (eventType) => {
    setIsInitialLoading(false);
    if (eventType === "all") {
      setFilteredEventsByCategory(allSortedEvents);
    } else {
      const filtered = allSortedEvents.filter(
        (e) => e.event_type === eventType
      );
      setFilteredEventsByCategory(filtered);
    }
  };

  return (
    <>
      <div>
        {!loggedIn ? (
          <>
            {isErrorState && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Wrong email and/or password.</AlertTitle>
                <AlertDescription>
                  Try abrar@gmail.com and abrar1234.
                </AlertDescription>
              </Alert>
            )}
            <div style={{ marginLeft: "33%" }}>
              <HStack mt={5} spacing={3}>
                <Input
                  style={{ width: "20%" }}
                  size="md"
                  type="text"
                  placeholder="abrar@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  style={{ width: "20%" }}
                  size="md"
                  type="password"
                  placeholder="abrar1234"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  color="#F1F1EE"
                  variant="solid"
                  backgroundColor="#279CCD"
                  type="submit"
                  onClick={handleLogIn}
                >
                  Log in
                </Button>
              </HStack>
            </div>
          </>
        ) : (
          <>
            <Text ml={"45%"} mt={5} fontSize="2xl">
              WELCOME!
            </Text>
          </>
        )}
      </div>
      <div>
        <HStack
          style={{
            overflow: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            justifyContent: "space-around",
            maxWidth: "80%",
            margin: "5% 10%",
          }}
          my="8"
        >
          <Button
            py="1%"
            px="4%"
            variant="outline"
            onClick={() => handleFiltering("all")}
            _hover={{ bg: "#E7F6FC" }}
          >
            SHOW ALL
          </Button>
          <Button
            py="1%"
            px="4%"
            variant="outline"
            onClick={() => handleFiltering("workshop")}
            _hover={{ bg: "#E7F6FC" }}
          >
            WORKSHOP
          </Button>
          <Button
            py="1%"
            px="4%"
            variant="outline"
            onClick={() => handleFiltering("activity")}
            _hover={{ bg: "#E7F6FC" }}
          >
            ACTIVITY
          </Button>
          <Button
            py="1%"
            px="4%"
            variant="outline"
            onClick={() => handleFiltering("tech_talk")}
            _hover={{ bg: "#E7F6FC" }}
          >
            TECH TALK
          </Button>
        </HStack>
      </div>
      {isInitialLoading ? (
        <EventList desiredEventList={allSortedEvents} loggedIn={loggedIn} />
      ) : (
        <EventList
          desiredEventList={filteredEventsByCategory}
          loggedIn={loggedIn}
        />
      )}
    </>
  );
};

export default Home;

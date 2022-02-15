import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Stack, HStack, VStack } from '@chakra-ui/react'

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // ensures only public events are shown when not logged in
  const [filteredEvents, setFilteredEvents] = useState([]); // filtered events by permission
  const [allSortedEvents, setAllSortedEvents] = useState([]); // sorted event list (after filtering)
  const [filteredEventsByCategory, setFilteredEventsByCategory] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogIn = () => {
    setIsInitialLoading(true);
    if (email == "abrar@gmail.com" && password == "abrar1234") {
      setLoggedIn(true);
    } else {
      alert("Wrong email and/or password");
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
          return x.start_time - y.start_time;
        });
        // console.log(json);
        setAllSortedEvents(sortedFilteredEvents);
        // setFilteredEventsByCategory(allSortedEvents);
        // const rtimes = sortedAllEvents.map(function(x) {
        //   return new Date(x.start_time * 1000);
        // });
        // console.log(rtimes)
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
      {/* <Stack direction={['column', 'row']} spacing='24px'>
  <Box w='40px' h='40px' bg='yellow.200'>
    1
  </Box>
  <Box w='40px' h='40px' bg='tomato'>
    2
  </Box>
  <Box w='40px' h='40px' bg='pink.100'>
    3
  </Box>
</Stack> */}
        {!loggedIn ? (
          <>
            <h2>Login to view private hacker events</h2>
            <input
              type="text"
              placeholder="abrar@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="abrar1234"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={handleLogIn}>
              Log in
            </button>
          </>
        ) : (
          <>
            <h2>Welcome!</h2>
            <button
              onClick={() => {
                setLoggedIn(false);
                setIsInitialLoading(true);
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
      <div>
        <button onClick={() => handleFiltering("all")}>SHOW ALL</button>
        <button onClick={() => handleFiltering("workshop")}>WORKSHOP</button>
        <button onClick={() => handleFiltering("activity")}>ACTIVITY</button>
        <button onClick={() => handleFiltering("tech_talk")}>TECH TALK</button>
      </div>
      {isInitialLoading ? (
        <div>
          {allSortedEvents?.map((event) => (
            <Link
              key={event?.id}
              to={`/events/${event?.id}`}
              state={{
                allSortedEvents,
                loggedIn,
              }}
            >
              <p>
                <strong>{event?.name}</strong>
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          {filteredEventsByCategory?.map((event) => (
            <Link
              key={event?.id}
              to={`/events/${event?.id}`}
              state={{
                filteredEventsByCategory,
                loggedIn,
              }}
            >
              <p>
                <strong>{event?.name}</strong>
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;

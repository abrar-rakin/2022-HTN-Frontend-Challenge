import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

const EventDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  // console.log(location.state)
  //   console.log(location.state)
  //   const {
  //     id,
  //     name,
  //     permission,
  //     public_url,
  //     private_url,
  //     description,
  //     event_type,
  //     end_time,
  //     start_time,
  //     related_events,
  //     speakers,
  //   } = location.state.event;

  const allSortedEvents = location.state.allSortedEvents;
  const loggedIn = location.state.loggedIn;
  // console.log(loggedIn)

  const getEventType = (eventType) => {
    if (eventType === "tech_talk") {
      return "Tech Talk"
    } else if (eventType === "activity") {
      return "Activity"
    } else if (eventType === "workshop") {
      return "Workshop"
    }
  }
// console.log(location.state.allSortedEvents)
  const getEventDetailsByID = (id, events) => {
    const currEvent = events?.filter((event) => event.id == id);
    // console.log(currEvent)
    return currEvent[0];
  };

  const currentEvent = getEventDetailsByID(id, allSortedEvents);
  return (
    <>
    <Link to="/">Back to events list page</Link>
    <div>
      <p>Event name: {currentEvent?.name}</p>
      <p>Event type: {getEventType(currentEvent?.event_type)}</p>
      <p>Description: {currentEvent?.description}</p>
      {currentEvent?.public_url !== "" && <a href={currentEvent?.public_url}>YouTube </a>}
      {loggedIn && currentEvent.private_url !== "" && <a href={currentEvent?.private_url}>Hopin</a>}
      </div>
      <div>
        <div>
          <h3>Related events:</h3>
          {currentEvent?.related_events.map((id) => {
            const relatedEvent = getEventDetailsByID(id, allSortedEvents);
            return (
              <Link key={id} to={`/events/${id}`} state={{allSortedEvents, loggedIn}}>
                <p>
                  {relatedEvent?.permission === "private" ? 
                  loggedIn && <strong>{relatedEvent?.name}</strong> : 
                  <strong>{relatedEvent?.name}</strong>}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EventDetail;

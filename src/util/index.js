export const getEventType = (eventType) => {
    if (eventType === "tech_talk") {
      return "Tech Talk"
    } else if (eventType === "activity") {
      return "Activity"
    } else if (eventType === "workshop") {
      return "Workshop"
    }
  }
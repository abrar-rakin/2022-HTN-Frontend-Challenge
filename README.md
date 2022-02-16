# Hack the North Front End Challenge
Live link: # 

## Installation
To get running with the repository, run
```bash
npm install
```
```bash    
npm start
```
Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

## Features

- Display all or some events depending on whether user is logged in or not logged in
- Events sorted by start_time
- A way to link to and view each related event
- Can filter events by type

## Writeup
### Folder Structure
The project has the following folder structure:
```
└───components
    └───EventList
└───pages
    └───EventDetail
    └───Home
└───util
```

### Tools Used
- ChakraUI
  - Easy-to-understand documentation; nice aesthetics

### Design Decisions
- Generally in my other projects I use a combination of useState, prop drilling and context for state management. In this project, I wanted to try out a different way of passing props between pages that I recently discovered (basically done by including a state prop in the React Router's Link component, more about it here - [ui.dev](https://ui.dev/react-router-pass-props-to-link)). Using this method made my code concise, and it is very easy to understand too! 
- Tried to use a similar color combination as [my.hackthenorth.com](https://my.hackthenorth.com/). 
- Did not add the pictures in the EventDetail page in order to maintain consistency, as I saw that some of the events did not have an image.
- Would have preferred to use Typescript and NextJS if I had more time. Typescript reduces the chances of bugs, so it saves time in the long run. NextJS makes site faster with the help of server-side rendering and also helps with SEO. However, considering I am relatively new to both Typescript and NextJS, and had two mid-terms this week, I decided to go with plain ReactJS and Javascript instead.  


### Enhancements/Improvements 
- Use localStorage to persist login state (and possibly filtered events too) even after a page refresh
- Add ability for users to bookmark events and retrieve them using a filter
- Export events to Google calendar
- Add search bar to search for events
- Turn the application into a PWA
- Have a different page for login
- Write custom CSS instead of using Chakra UI to give the site a more unique look
- Make better design. I did not spend a lot of time on designing the app due to time limitations, but I hope what I did does not look too bad :)

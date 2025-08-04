# Web Development Final Project - HobbyHub Cat

Submitted by: **Cinthia Ochoa Torre**

This web app: **HobbyHub Cat** is a lighthearted platform for cat lovers to share photos of cats, along with their thoughts, stories, or guesses about the cat’s species or mood. Users can comment on posts, react to them with likes or dislikes, and interact with a growing feed of cat-related content.

Time spent: **15** hours spent in total

---

## Required Features

The following **required** functionality is completed:

- [x] Web app includes a create form that allows the user to create posts  
  - Title is required  
  - Optional: content, external image URL

- [x] Web app includes a home feed displaying previously created posts  
  - Shows title, creation time (formatted like "5 mins ago"), and like count  
  - Clicking a post opens its full detail page

- [x] Users can view posts in different ways  
  - Sort posts by time or upvotes  
  - Search posts by title

- [x] Users can interact with each post  
  - Post detail page shows full content, image, and comments  
  - Users can leave comments  
  - Users can like/dislike (only once per post)

- [x] Users can edit or delete their own posts

---

## Optional Features

The following **optional** features are implemented:

- [x] Pseudo-authentication  
  - Each session gets a user ID  
  - Only the original user can edit or delete their own posts

- [x] Comment count shown on each post in the home feed  
- [x] Properly resized images on post detail page  
- [x] Friendly homepage description to explain the app

---

## Additional Features

- [x] Real-time relative timestamps (e.g., “2 hours ago”)  
- [x] Post cards on the homepage are clickable and redirect to detail pages  
- [x] Styling with responsive design using Tailwind CSS  
- [x] Smooth navigation with React Router  
- [x] Basic error handling (alerts, console logs)

---

## Video Walkthrough

Here's a walkthrough of implemented features:

[Video Walkthrough](https://imgur.com/a/rmSEvCt.gif)

GIF created with [your tool here]

---

## Notes

Some of the challenges I encountered were:
- Handling Supabase Row-Level Security for comments and posts
- Managing one-like-per-user logic
- Sizing images responsively so they don't overwhelm the layout
- Getting relative timestamps to update properly

Overall, this was a fun and rewarding build!

---

## License

Copyright 2025 Cinthia Ochoa

Licensed under the Apache License, Version 2.0  
http://www.apache.org/licenses/LICENSE-2.0

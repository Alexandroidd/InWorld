# ProjectFour-3d-Peoplez


A readme.md file with:
An embedded screenshot of the app
Explanations of the technologies used
A couple paragraphs about the general approach you took
Installation instructions for any dependencies
Link to your user stories – who are your users, what do they want, and why?
Link to your wireframes – sketches of major views / interfaces in your application
Descriptions of any unsolved problems or major hurdles you had to overcome


![](https://preview.ibb.co/mKcCdF/Screen_Shot_2017_06_02_at_9_21_21_AM.png)
![](https://ibb.co/k8PEsa)



Technologies Used:

-Three.Js
-Firebase
-Express
-Request


For this project I wanted to experiment with Three.js and see if I could make a CRUDable website out of 3d models.
The stretch goal was (and remains) to make a 3d chat room where players can walk around with their avatar and chat
with eachother. 
For this project I had to teach myself the basics behind Three.js, just getting the basic elements going. Then I had
to figure out how to import and manipulate 3d models. Creating text as a 3d object was also difficult and required
learning a little about canvas which I had never used before. After that I went forward and linked up the models with my firebase
database and writing functions that took that data and sculpted the right models and sayings from it.

Simply go to my Heroku to play: https://goatworld.herokuapp.com/


User Stories:
-User can see immersive world
-User can see their avatar on the map
-User Can Choose their own Avatar and 'Saying'
-User can see their saying attached to their avatar
-User can change and update their saying/color/avatar
-User can Delete their Avatar + saying
-User can see other members avatars and sayings updated in real-time

![](https://ibb.co/cfYzsa)


Unsolved: Trying to figure out how to pair avatar objects and their related text objects together so I dont' have to spawn
them near eachother guessing as to their position each time they're created.





  
  

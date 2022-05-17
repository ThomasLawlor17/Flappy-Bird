# Definitely not... FLAPPY BIRD

The game is a simple obstacle avoidance game. Control the player using the spacebar to not make contact with any of the oncoming obstacles. 


![Title Screen](https://i.imgur.com/rqJG9k2.png "Title Screen")


![Game Over](https://i.imgur.com/FC3j2mH.png "game over")

The game is made from a combination of HTML, CSS and JavaScript. The main functions used to create the motion and collision mechanics in the game are: 

- setInterval and setTimeout for the motion of the bird and the creation and motion of the barriers.

- addEventListeners for the keydown and buttons of gameOver and for entering the player name into the highscore list.

- creation of elements and assigning classes in JS to create the barriers continously while the game is in play.

The game is designed to focus on the pixels within the game area and if the pixels of the bird are within the pixels of the barriers or ground the game is over. Similarly the barriers move based on calling a function removing a # of pixels from their left every certain number of seconds.

[Link to game!!!!](https://thomaslawlor17.github.io/Flappy-Bird-2/)

### Next Steps

- build touchscreen compatibility
- make it prettier (better pipes)
- smooth out animation (make it so the motion is not so forced)



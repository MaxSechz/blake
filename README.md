# Blake

This is the classic arcade game Snake modernized and written in JavaScript for the browser!
The goal is to feed Blake as many oranges as possible without running him into himself.
Users control Blake using the arrow keys.
Every time Blake eats an orange he will grow just a little longer.
Blake wants oranges so bad, he will bend space if you run him off the end. He will just keep chugging along from the other side!

###Usage

Just head to maxwell.sechzer.com/blake to play with Blake. Press any key to get started and see how many oranges you can get!

###Features
- Completely DOM based graphics and animations.
- Event listeners for keypresses to generate movement commands.
- Separate classes for Blake, the game board, the view, and the coordinates.
- Zero DOM element removal or addition, all appearance changes are from CSS classes.
- jQuery to toggle classes allowing for varying cell appearance and dynamic animations.
- Uses the class state of each element as data to minimize iteration and memory usage.
- Prevents user from turning Blake backwards on himself.
- Wraps coordinates using modulo to allow Blake to wrap around the board.
- Allows game to restart without requiring a page reload.

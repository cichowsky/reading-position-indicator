import ReadingIndicator from "./readingIndicator/readingIndicator.js";

const
   navigation = document.querySelector('nav'),
   main = document.querySelector('main'),
   article1 = document.querySelector('.article1'),
   article2 = document.querySelector('.article2');

// EXAMPLES 
// 1. navbar static (or none), progress-bar fixed
/* navigation.style.position = "static"
// navigation.style.display = "none"
const indicator = new ReadingIndicator(article1, "fixed");
indicator.run(); */


// 2. navbar static (or none), progress-bar sticky
navigation.style.position = "static"
const indicator = new ReadingIndicator(article2, "sticky");
indicator.run();


// 3. navbar fixed, progress-bar fixed
//article 1
/* navigation.style.position = "fixed"
article1.style.marginTop = "60px"
const indicator = new ReadingIndicator(article1, "fixed", navigation);
indicator.setOffset(0, 60)
indicator.run(); */

//article 2
/* navigation.style.position = "fixed"
const indicator = new ReadingIndicator(article2, "fixed", navigation);
indicator.setOffset(60, 60)
indicator.run(); */


// 4. navbar fixed, progress-bar sticky
//article 1
/* navigation.style.position = "fixed"
article1.style.marginTop = "60px"
const indicator = new ReadingIndicator(article1, "sticky", navigation);
indicator.setOffset(0, 60);
indicator.run(); */

//article 2
// navigation.style.position = "fixed"
// const indicator = new ReadingIndicator(article2, "sticky", navigation);
// indicator.setOffset(60, 60);
// indicator.run();

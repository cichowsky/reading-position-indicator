import ReadingIndicator from "./readingIndicator/readingIndicator.js";

const
   navigation = document.querySelector('nav'),
   article1 = document.querySelector('.article1'),
   article2 = document.querySelector('.article2');

const indicator = new ReadingIndicator(article2, "sticky", navigation);
indicator.setOffset(60, 60)
indicator.run();

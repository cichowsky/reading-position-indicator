/* const
   navigation = document.querySelector('nav'),
   article1 = document.querySelector('.article1'),
   article2 = document.querySelector('.article2');

const createProgressBar = (content) => {
   const progress = document.createElement('progress');
   progress.classList.add(`progress-bar`);
   progress.setAttribute("value", 0);
   content.insertBefore(progress, content.firstChild)
   return progress;
}

const setProgressMax = (progressBar, content, offset) => {
   // const maxValue = content.clientHeight - window.innerHeight + 60; //if navbar is fixed (60 - offset - navheight), but first article has to got 60px
   const maxValue = content.clientHeight - window.innerHeight; //if navbar position is static 
   progressBar.setAttribute("max", maxValue);
}

const calculateProgress = (progressBar, content, nav) => {
   progressBar.setAttribute("value", window.scrollY - content.offsetTop);
   if (progressBar.value <= 0) {
      if (window.getComputedStyle(nav).getPropertyValue("position") === "static") progressBar.style.position = "absolute"
      else if (window.getComputedStyle(nav).getPropertyValue("position") === "fixed") progressBar.style.position = "fixed"
   }
   else if (progressBar.value > 0 && progressBar.value <= progressBar.max) progressBar.style.position = "fixed";
}

//Throttle - limit the amount of times a function is invoked (mousemove, touchmove, scroll, click(anti-spam button) )
const throttle = (callback, limit) => {
   let inThrottle = false;
   return function() {
      const context = this;
      const args = arguments;
      if (!inThrottle) {
         callback.apply(context, args);
         inThrottle = true;
         setTimeout(() => inThrottle = false, limit);
      }
   }
}

//Debounce - invokes a function once after delay (scroll, resize)
const debounce = (callback, delay) => {
   let inDebounce
   return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => callback.apply(context, args), delay)
   }
}

const progressBar = createProgressBar(article2);
setProgressMax(progressBar, article2)
window.addEventListener('scroll', throttle(() => calculateProgress(progressBar, article2, navigation), 80));
window.addEventListener('scroll', debounce(() => calculateProgress(progressBar, article2, navigation), 80)); */


// -----------------------------OOP--------------------------------------
const
   navigation = document.querySelector('nav'),
   article1 = document.querySelector('.article1'),
   article2 = document.querySelector('.article2');


class ReadingIndicator {
   constructor(content, offset = null) {
      this.content = content;
      this.offset = offset;
   }

   createProgressBar(content) {
      const progressBar = document.createElement('progress');
      progressBar.classList.add(`progress-bar`);
      // progressBar.setAttribute("value", 0);
      content.insertBefore(progressBar, content.firstChild)
      return progressBar;
   }

   setProgressMax(progressBar, content, offset) {
      const maxValue = content.clientHeight - window.innerHeight + offset; //if navbar/header position is static then there isn't offset, when is fixed then offset=navbar/header height (but first section after navbar/header should has margin-top = offset)
      progressBar.setAttribute("max", maxValue);
   }

   calculateProgress(progressBar, content, nav) {
      progressBar.setAttribute("value", window.scrollY - content.offsetTop);
      if (progressBar.value <= 0) {
         if (window.getComputedStyle(nav).getPropertyValue("position") === "static") progressBar.style.position = "absolute"
         else if (window.getComputedStyle(nav).getPropertyValue("position") === "fixed") progressBar.style.position = "fixed"
      }
      else if (progressBar.value > 0 && progressBar.value <= progressBar.max) progressBar.style.position = "fixed";
   }

   //Throttle - limit the amount of times a function is invoked (mousemove, touchmove, scroll, click(anti-spam button) )
   throttle(callback, limit) {
      let inThrottle = false;
      return function() {
         const context = this;
         const args = arguments;
         if (!inThrottle) {
            callback.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
         }
      }
   }

   //Debounce - invokes a function once after delay (scroll, resize)
   debounce(callback, delay) {
      let inDebounce
      return function() {
         const context = this;
         const args = arguments;
         clearTimeout(inDebounce);
         inDebounce = setTimeout(() => callback.apply(context, args), delay)
      }
   }

   run() {
      const { content, offset, createProgressBar, setProgressMax, calculateProgress, throttle, debounce } = this;
      const progressBar = createProgressBar(content);

      setProgressMax(progressBar, content, offset);
      window.addEventListener('scroll', throttle(() => calculateProgress(progressBar, content, navigation), 80));
      window.addEventListener('scroll', debounce(() => calculateProgress(progressBar, content, navigation), 120));
      console.log('run');
   }
}

const indicator = new ReadingIndicator(article2).run();


//TO DO:
// calculateProgress - zamist nav dac parametr isFixed
// w progressMax - dokonczyc
// dodac warunek brzegowy - czy pasek w ogole ma sie pojawiac
// zautomatyzowac, aby nie trzeba bylo wklepywac offsetu ręcznie
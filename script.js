const
   article1 = document.querySelector('.article1'),
   article2 = document.querySelector('.article2'),
   progressBar = document.querySelector('.progress-bar');

const setProgressBar = (progressBar, content) => {
   const contentHeight = content.clientHeight;
   const contentTop = content.offsetTop;
   // const maxValue = contentHeight - window.innerHeight + 60; //if navbar is fixed (60 - offset - navheight), but first article have to got 60px
   const maxValue = contentHeight - window.innerHeight; //if navbar position is static 
   progressBar.setAttribute("max", maxValue);
}

const calculateProgress = (progressBar, content) => {
   const contentTop = content.offsetTop;
   // progressBar.setAttribute("value", window.scrollY - contentTop + 60); //if navbar is fixed (60 - offset - navheight), but first article have to got 60px margin top
   progressBar.setAttribute("value", window.scrollY - contentTop); //if navbar position is static
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

setProgressBar(progressBar, article2)
window.addEventListener('scroll', throttle(() => calculateProgress(progressBar, article2), 100));
window.addEventListener('scroll', debounce(() => calculateProgress(progressBar, article2), 100));





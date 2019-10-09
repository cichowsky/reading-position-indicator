class ReadingIndicator {
   constructor(content, behaviour = "sticky") {
      this.content = content;
      this.behaviour = behaviour;
      this.offsetMax = null;
      this.offsetValue = null;
   }

   createProgressBar(content) {
      const progressBar = document.createElement('progress');
      progressBar.classList.add(`progress-bar`);
      content.insertBefore(progressBar, content.firstChild)
      return progressBar;
   }

   setProgressMax(progressBar, content, offsetMax) {
      const maxValue = content.clientHeight - window.innerHeight + offsetMax;
      progressBar.setAttribute("max", maxValue);
   }

   calculateProgress(progressBar, content, behaviour = "fixed", offsetValue) {
      progressBar.setAttribute("value", window.scrollY - content.offsetTop + offsetValue);
      switch (behaviour) {
         case "fixed":
         case 1:
            progressBar.style.position = "fixed";
            break;
         case "sticky":
         case 0:
         default:
            if (progressBar.value <= 0) progressBar.style.position = "absolute";
            else progressBar.style.position = "fixed";
            break;
      }
   }

   setOffsetValue(offsetValue = null) {
      this.offsetValue = offsetValue;
   }

   setOffsetMax(offsetMax = null) {
      this.offsetMax = offsetMax;
   }

   setOffset(offsetValue = null, offsetMax = offsetValue) {
      this.offsetValue = offsetValue;
      this.offsetMax = offsetMax;
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
      const { content, behaviour, offsetMax, offsetValue, createProgressBar, setProgressMax, calculateProgress, throttle, debounce } = this;

      console.log("offsetValue:", offsetValue, "offsetMax:", offsetMax);

      const progressBar = createProgressBar(content);
      setProgressMax(progressBar, content, offsetMax);
      window.addEventListener('scroll', throttle(() => calculateProgress(progressBar, content, behaviour, offsetValue), 80));
      window.addEventListener('scroll', debounce(() => calculateProgress(progressBar, content, behaviour, offsetValue), 120));
   }
}

export default ReadingIndicator;

//TO DO:
// dodac warunek brzegowy - czy pasek w ogole ma sie pojawiac
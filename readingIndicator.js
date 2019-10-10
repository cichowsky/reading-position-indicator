class ReadingIndicator {
   constructor(content, behaviour = "fixed", header = null) {
      this.content = content;
      this.behaviour = behaviour;
      this.header = header;
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
      console.log(progressBar.value, progressBar.max);
      if (window.innerHeight <= content.clientHeight + offsetValue) {
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
      } else {
         progressBar.setAttribute("value", 0);
      }
   }

   setProgressOnScroll = (progressBar, content, behaviour = "fixed", offsetValue) => {
      window.addEventListener('scroll', this.throttle(() => this.calculateProgress(progressBar, content, behaviour, offsetValue), 80));
      window.addEventListener('scroll', this.debounce(() => this.calculateProgress(progressBar, content, behaviour, offsetValue), 120));
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
      const { content, behaviour, header, offsetMax, offsetValue, createProgressBar, setProgressMax, calculateProgress, setProgressOnScroll, throttle, debounce } = this;

      const progressBar = createProgressBar(content);
      setProgressMax(progressBar, content, offsetMax);
      setProgressOnScroll(progressBar, content, behaviour, offsetValue);

      window.addEventListener('resize', debounce(() => {
         setProgressMax(progressBar, content, offsetMax);
         calculateProgress(progressBar, content, behaviour, offsetValue)
      }, 800));
   }
}

export default ReadingIndicator;

//TO DO:
// podzielic na obsluge z navbarem i bez
//naprawic sytuacje sticky i navbar fixed
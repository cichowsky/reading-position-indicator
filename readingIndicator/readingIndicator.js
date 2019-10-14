class ReadingIndicator {
   constructor(content, behaviour = "fixed", navbar = null) {
      this.content = content;
      this.behaviour = behaviour;
      this.navbar = navbar;
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

   calculateProgress(progressBar, content, behaviour, offsetValue) {
      if (window.innerHeight <= content.clientHeight + offsetValue) {
         progressBar.setAttribute("value", window.scrollY - content.offsetTop + offsetValue);

         if (behaviour === "fixed") {
            //if navbar is not fixed (none or static or else (given as parameter or not) -> offset 0
            progressBar.style.position = "fixed";
            //else if navbar is fixed (given as parameter or not) -> add offset, maybe change top property (most results can gain by set offsets or/and top property in css)
         } else if (behaviour === "sticky") {
            //if navbar is not fixed (none or static (given as parameter) or else (not given as parameter) ) -> offset 0
            if (this.navbar === null || window.getComputedStyle(this.navbar).getPropertyValue("position") === "static") {
               if (progressBar.value <= 0) progressBar.style.position = "absolute";
               else progressBar.style.position = "fixed";
            }
            //else if navbar fixed (navbar MUST be given as parameter) 
            else if (window.getComputedStyle(this.navbar).getPropertyValue("position") === "fixed") {
               if (progressBar.value <= 0) {
                  progressBar.style.position = "absolute";
                  progressBar.style.top = 0;
               } else {
                  progressBar.style.position = "fixed";
                  progressBar.style.top = window.getComputedStyle(this.navbar).getPropertyValue("height");
               }
            }
         }

      } else {
         progressBar.setAttribute("value", 0);
      }
   }

   //Event Listeners
   setProgressOnScroll = (progressBar, content, behaviour, offsetValue) => {
      window.addEventListener('scroll', this.throttle(() => this.calculateProgress(progressBar, content, behaviour, offsetValue), 80));
      window.addEventListener('scroll', this.debounce(() => this.calculateProgress(progressBar, content, behaviour, offsetValue), 120));
   }

   setProgressOnResize = (progressBar, content, behaviour, offsetValue, offsetMax) => {
      window.addEventListener('resize', this.debounce(() => {
         this.setProgressMax(progressBar, content, offsetMax);
         this.calculateProgress(progressBar, content, behaviour, offsetValue)
      }, 800));
   };

   //Offset Methods
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
      const { content, behaviour, offsetMax, offsetValue } = this;
      const { createProgressBar, setProgressMax, setProgressOnScroll, setProgressOnResize } = this;

      const progressBar = createProgressBar(content);
      setProgressMax(progressBar, content, offsetMax);
      setProgressOnScroll(progressBar, content, behaviour, offsetValue);
      setProgressOnResize(progressBar, content, behaviour, offsetValue, offsetMax);
   }
}

export default ReadingIndicator;

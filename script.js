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



setProgressBar(progressBar, article2)
window.addEventListener('scroll', () => calculateProgress(progressBar, article2));






# Reading Position Indicator

  This is simple reading indicator. You can choose scope of indicator (html node, e.g. article or section), behaviour of indicator (fixed or sticky) and You can add progress offset.

## Get Starded

+ Copy *readingIndicator* folder into your project.

+ Import *ReadingIndicator* module in html or js file:
  + into your html file:
	```html
	<script  src="path/readingIndicator/readingIndicator.js"></script>
	```
  + into your  js file:
	```javascript
	import  ReadingIndicator  from  'path/ReadingIndicator.js'
	```
+ Link stylesheet to your html (or use sass) :
	 + link in html:
		```html
		<link  rel="stylesheet"  href="path/readingIndicator/readingIndicator.css type="module"">
		```

+ Create instance:

	```javascript
	const  indicator  =  new  ReadingIndicator(<content>*, <behaviour>, <navbar> 
	```
	+ **content** (requiered) - node wherein will be created progress tag (first child), e.g.:
		```javascript
		const article = document.querySelector('article');
		const  indicator  =  new  ReadingIndicator(article);
		``` 
	
		expected:
		```html
		<article>
			
			<progress class="progress-bar"></progress>
				
			<h2>Title</h2>
			<p>Lorem ipsum</p>
		</article>
		``` 
	+ **behaviour** (optional)
		+ "fixed" (default) - progress bar will be fixed (default to upper edge - You can change this in css file - top property)
		+ "sticky" - progress bar will be sticky 
		e.g:
		```javascript
		const article = document.querySelector('article');
		const  indicator  =  new  ReadingIndicator(article, "fixed");
		``` 
  
  	+ **navbar** (optional, but recommended if there is fixed navbar/header and progress bar is sticky) - node corresponding to the navbar/header/toolbar e.t.c.
		e.g:
		```javascript
		const article = document.querySelector('article');
		const toolbar = document.querySelector('.toolbar');
		const  indicator  =  new  ReadingIndicator(article, "sticky", toolbar);
		``` 

+ Set offset of progress (if You need it):
	+ `indicator.setOffsetValue(number)` - increase or decrease progress value
	+ `indicator.setOffsetMax(number)` -  increase or decrease max progress value
	+ `indicator.setOffset(number1, number2)` - increase or decrease progress value (1) and progress max progress value (2)

+ Run indicator - if everything is set, use :  `indicator.run()`

## Examples
You can find a few examples of using reading indicator in *script.js*.

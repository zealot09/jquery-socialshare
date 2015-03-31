# jquery-socialshare
the social share plugin of jquery

##get started
include the `jquery-socialshare.js` to your page after jquery
`<script src='jquery-socialshare.js'></script>`

then define the html structure like this:
```html
	<div id="example" class="socialShare"
	  data-render="lineRight" 
  	data-arcstart="0" 
  	data-delayGap="100"
  	data-radius="100" 
  	data-src="images/share-btn.jpg" 
  	data-share-weibo="images/weibo.png" 
  	data-weibo-url="http://www.baidu.com" 
  	data-share-renren="images/renren.png" 
  	data-renren-url="http://www.baidu.com" 	
  	data-share-douban="images/douban.png" 
  	data-douban-url="http://www.baidu.com" 	
  	data-share-tencent="images/tencent.png" 
  	data-tencent-url="http://www.baidu.com" >
  	</div>
```

the required config is 
`data-src` : the center button user click
`data-share-xxx`: the sns share button icon path, xxx is 'twitter', 'facebook', 'tencent' ...whatever you like. But the next config below, the 'xxx' is the same.
`data-xxx-url`: the share button url varied by xxx sites

the above three  is required, when all is defined, you can juest
`$('#example').socialshare()`

##other config
`data-render`: can be one of `{'line', 'circle', 'lineRight'}`, default is line which the share icons animate up and down straight, `circle` acts like a circle animate, `lineRight` acts as a line left-to-right or right-to-left.

`data-arcstart`: controls the animate direction of share icons go, mainly be the value 0 or 180.

`data-delayGap`: controls the gap of render time, default is 100ms.

`data-radius`: is avalible when render type is `circle`, is the render circle radius.

`data-gap`: the share icons gap

![alt tag](https://raw.githubusercontent.com/zealot09/jquery-socialshare/master/share-line-right.gif)
![alt tag](https://raw.githubusercontent.com/zealot09/jquery-socialshare/master/share-line.gif)
![alt tag](https://raw.githubusercontent.com/zealot09/jquery-socialshare/master/share-circle.gif)

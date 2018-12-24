
		window.onload = function(){
			var up =document.getElementById("up");
			var bottom =document.getElementById("bottom");
			var imgArr =["../images/1.jpg","../images/2.jpg","../images/3.jpg","../images/4.jpg","../images/5.jpg","../images/6.jpg"];
			//获取图片的个数
			var word=document.getElementById("word");
			word.innerHTML="一共"+imgArr.length+"当前是第"+(i+1)+"张";
			var img =document.getElementsByTagName("img")[0];
			var i=0;
			word.innerHTML="一共"+imgArr.length+"当前是第"+(i+1)+"张";
			up.onclick= function(){
				i--;
				if(i<0){
					i=imgArr.length-1;
				}
				img.src=imgArr[i];
				word.innerHTML="一共"+imgArr.length+"当前是第"+(i+1)+"张";
			};

			bottom.onclick= function(){
				i++;
				if(i>imgArr.length-1){
					i=0;
				}
				img.src=imgArr[i];
				word.innerHTML="一共"+imgArr.length+"当前是第"+(i+1)+"张";
			};
		}
	
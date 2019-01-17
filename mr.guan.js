/**
 *
 * @param id
 * @returns {HTMLElement}
 */
function $MyId(id){
    return document.getElementById(id);
}

/**
 *
 * @param Class
 * @returns {HTMLCollectionOf<Element>}
 */
function $MyClass(Class){
    return document.getElementsByClassName(Class);
}

/**
 *
 * @param Tag
 * @returns {HTMLCollectionOf<Element>}
 */
function $MyTag(Tag){
    return  document.getElementsByTagName(Tag);
}

/**
 * 设置文本
 * @param ele
 * @param value
 */
function setInnerText(ele,value){
    if(ele.innerText){
        ele.innerText = value;
    }else{
        ele.textContent = value;
    }
}

/**
 * 获取文本
 * @param ele
 * @returns {*}
 */
function getInnerText(ele){
    if(ele.innerText){
        return ele.innerText;
    }else{
        return ele.textContent;
    }
}

/**
 *
 * @param ele
 * @returns {最后一个子元素（标签）}
 */
function lastElement(ele){
    if(ele.lastElementChild){
        return ele.lastElementChild;
    }else{
        return ele.lastChild;
    }
}

/**
 *+
 * @param ele
 * @returns {第一个子元素（标签）}
 */
function firstElement(ele){
    if(ele.firstElementChild){
        return ele.firstElementChild;
    }else{
        return ele.firstChild;
    }
}

/**
 *
 * @param ele
 * @returns {返回上一个兄弟元素(标签)}
 */
function previousElement(ele){
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }else{
        return ele.previousSibling;
    }
}

/**
 *
 * @param ele
 * @returns {返回下一个兄弟元素（标签）}
 */
function nextElemnt(ele){
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }else{
        return ele.nextSibling;
    }
}
/**
 * 事件绑定的兼容代码
 * @param obj
 * @param event
 * @param fn
 */
function bindEvent(obj,event,fn){
    if(obj.addEventListener){
        obj.addEventListener(event,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent("on"+event,fn);
    }else{
        obj["on"+event] = fn;
    }
}
/**
 * 事件解绑兼容代码
 * @param obj
 * @param event
 * @param fn 必须是命名函数
 */
function  solutionEvent(obj,event,fn) {
    if(obj.removeEventListener){
        obj.removeEventListener(event,fn,false);
    }else if(obj.detachEvent){
        obj.detachEvent(["on"]+event,fn);
    }else{
        obj["on"+event]=null;
    }
}

/**
 * 动画封装(匀速)
 * @param obj
 * @param target
 * @param space
 */
function  animate(obj,target,space){
    //清除定时器
    clearInterval(obj.timeId);
    obj.timeId = setInterval(function(){
        //获取元素位置
        var current = obj.offsetLeft;
        console.log(current);
        //判断速度方向
        space = Math.abs(space);
        if(current>target){
            space = -space;
        }
        current+=space;
        if(Math.abs(target-current)<Math.abs(space)){
            clearInterval(obj.timeId);
            obj.style.left = target+"px";
            console.log(obj.style.left);
        }else{
            obj.style.left = current+"px";
        }
    },30);
}

/**
 * 变速（先快后慢）
 * @param obj
 * @param target
 */
function variableSpeed(obj,json,callback){
    clearInterval(obj.timeId);
    obj.timeId = setInterval(function(){
        var flag =true;
        for(attr in json){
            if(attr == "opacity" ){
                var current = getStyle(obj,attr)*100;
                //目标值
                var target = json[attr]*100;
                var speed =  (target-current)/10;
                speed = speed<0? Math.floor(speed):Math.ceil(speed);
                current+=speed;
                obj.style[attr] = current/100;
            }else if(attr == "zIndex"){
                obj.style[attr] = json[attr]
            }else{
                //当前值
                var current = parseInt(getStyle(obj,attr));
                //目标值
                var target = json[attr];
                var speed =  (target-current)/10;
                speed = speed<0? Math.floor(speed):Math.ceil(speed);
                current+=speed;
                obj.style[attr]=current + "px";
            }

            //是否到达目标
            if(target != current){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timeId);
            if(callback){
                callback();
            }
        }
    },30);
}

/**
 *
 * @param obj
 * @param attr
 * @returns {string}
 */
function getStyle(obj,attr){
    return window.getComputedStyle?window.getComputedStyle(obj,null)[attr]: obj.currentStyle[attr];
}

/**
 * 获取卷曲出去的值
 * @returns {{left: number, top: number}}
 */
function getScroll(){
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}
//兼容事件对象
var event={
    //兼容事件处理参数
    getE: function(e){
        return e || window.event;
    },
    //可视区X
    getClientX: function(e){
        return this.getE(e).clientX;
    },
    //可视区Y
    getClientY: function(e){
        return this.getE(e).clientY;
    },
    //卷曲Left
    getScrollLeft: function(){
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.offsetLeft || 0;
    },
    //卷曲Top
    getScrollTop : function(){
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    },
    //pageX 相对于页面的X
    getPageX: function(e){
        return this.getE(e).pageX?this.getE(e).pageX:this.getClientX(e)+this.getScrollLeft();
    },
    getPageY: function(e){
        return this.getE(e).pageY?this.getE(e).pageY:(this.getClientY(e)+this.getScrollTop());
    }
}
//阻止默认行为
function stop(e){
    e = e || window.event;
    if(e.cancelBubble){
        return e.cancelbubble=true;
    }else{
       return  e.preventDefault();
    }
}
//阻止事件冒泡
function bubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
}

/**
 * 拖拽
 * @param obj
 */
function drag(obj){
    obj.onmousedown =function(e){
        var e = evt.getE(e);
        var left = e.pageX -obj.offsetLeft;
        var top  = e.pageY - obj.offsetTop;
        document.onmousemove = function(e){
            var event = e || window.event;
            var x = event.pageX;
            var y = event.pageY;
            obj.style.top  = y -top + "px";
            obj.style.left = x -left  + "px";
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}

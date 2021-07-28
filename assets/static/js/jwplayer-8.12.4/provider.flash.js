/*!
   JW Player version 8.12.4
   Copyright (c) 2020, JW Player, All Rights Reserved 
   This source code and its use and distribution is subject to the terms 
   and conditions of the applicable license agreement. 
   https://www.jwplayer.com/tos/
   This product includes portions of other software. For the full text of licenses, see
   https://ssl.p.jwpcdn.com/player/v/8.12.4/notice.txt
*/
(window.webpackJsonpjwplayer=window.webpackJsonpjwplayer||[]).push([[12],{144:function(t,e,n){"use strict";function r(t,e,n){if(!t)return"";var r=t.bitrate||t.bandwidth;return function(t,e){var n=null;if(e&&t){var r=Object.keys(t),a=parseFloat(e);r.length&&!isNaN(a)&&(n=t[function(t,e){var n,r=null,i=1/0;Array.isArray(t)&&t.forEach((function(t){(n=Math.abs(t-e))<i&&(r=t,i=n)}));return r}(r,i(a))])}return n}(e,r)||t.label||function(t,e,n){if(!t&&!e)return"";var r="".concat(i(e)," kbps"),a=r;t&&(a="".concat(t,"p"),e&&n&&(a+=" (".concat(r,")")));return a}(t.height,r,n)}function i(t){return Math.floor(t/1e3)}function a(t){return!!Array.isArray(t)&&t.some((function(t){var e=t.height||t.bitrate||t.bandwidth,n=this[e];return this[e]=1,n}),{})}n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return a}))},168:function(t,e,n){"use strict";n.r(e);var r=n(0),i=n(91),a=n(144),s=n(5),u=n(3),c=n(9);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var l="#000000";function d(t,e,n){var r=document.createElement("param");r.setAttribute("name",e),r.setAttribute("value",n),t.appendChild(r)}function h(t,e,n){Object.defineProperty(t,e,{get:function(){return n}})}function f(t,e,n){t instanceof window.HTMLElement&&delete n[e]}var T=n(58),g=n(87),v=n(1),k=0;function m(t,e){var n,m,b,y=null,p=-1,_=-1,x=null,w=-1,C=null,B=!1,j=this,O=function(){return m&&m.__ready},I=function(){m&&m.triggerFlash.apply(m,arguments)};function S(){p=setTimeout((function(){c.a.trigger.call(j,"flashBlocked",{value:!0})}),4e3),m.once("embedded",(function(){E(),c.a.trigger.call(j,"flashBlocked",{value:!1})}),j)}function A(){E(),S()}function E(){clearTimeout(p),window.removeEventListener("focus",A)}function N(t,e){for(var n=0;n<t.length;n++)if(t[n].index===e)return n}Object(r.j)(this,c.a,g.a,{preload:function(t){t.preload&&"none"!==t.preload&&!e.autostart&&(y=t)},load:function(t){y=t,this.setState(u.ob),I("load",t),t.sources.length&&"hls"!==t.sources[0].type&&this.sendMediaType(t.sources)},play:function(){I("play")},pause:function(){I("pause"),this.setState(u.pb)},stop:function(){I("stop"),_=-1,y=null,this.clearTracks(),this.setState(u.nb)},seek:function(t){I("seek",t)},volume:function(t){if(!B&&Object(r.v)(t)){var e=Math.min(Math.max(0,t),100);O()&&I("volume",e)}},mute:function(t){B=t,O()&&I("mute",t)},setState:function(){return T.a.setState.apply(this,arguments)},getSwfObject:function(n){var r=n.querySelector("object");return r?(r.off(null,null,this),r):function(t,e,n,r){var i,a=!0;r=r||"opaque",(i=document.createElement("object")).setAttribute("type","application/x-shockwave-flash"),i.setAttribute("data",t),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("bgcolor",l),i.setAttribute("id",n),i.setAttribute("name",n),d(i,"allowfullscreen","true"),d(i,"allowscriptaccess","always"),d(i,"wmode",r),d(i,"menu","false"),e.appendChild(i,e),i.className="jw-swf jw-reset",i.style.display="block",i.style.position="absolute",i.style.left=0,i.style.right=0,i.style.top=0,i.style.bottom=0,s.Browser.ie&&"PointerEvent"in window&&(i.style.pointerEvents="none");var u=-1;h(i,"on",c.a.on),h(i,"once",c.a.once),h(i,"_eventQueue",[]),h(i,"off",(function(){var t=Array.prototype.slice.call(arguments);return t.length||(i._eventQueue.length=0,clearTimeout(u)),t.length?c.a.off.apply(i,t):(T={},this._events=T,this)})),h(i,"trigger",(function(t,e){var n=i._eventQueue;n.push({type:t,json:e}),u>-1||(u=setTimeout((function(){var t=n.length;for(u=-1;t--;){var e=n.shift();if(e.json){var r=JSON.parse(decodeURIComponent(e.json));c.a.trigger.call(i,e.type,r)}else c.a.trigger.call(i,e.type)}})))}));var T={};return Object.defineProperty(i,"_events",{get:function(){return T},set:function(t){T=t}}),h(i,"triggerFlash",(function(t){if("setupCommandQueue"===t&&(a=!1),"setup"!==t&&a||!i.__externalCall){for(var e=i.__commandQueue,n=e.length;n--;)e[n][0]===t&&e.splice(n,1);return e.push(Array.prototype.slice.call(arguments)),i}var r=Array.prototype.slice.call(arguments,1);try{if(r.length){r.forEach((function(t){t&&"object"===o(t)&&Object.keys(t).forEach((function(e){f(t[e],e,t)}))}));var s=JSON.stringify(r);i.__externalCall(t,s)}else i.__externalCall(t)}catch(e){if(console.error(t,e),"setup"===t)return e.name="Failed to setup flash",e}return i})),h(i,"__commandQueue",[]),i}(e.flashplayer,n,t+"_swf_"+k++,e.wmode)},getContainer:function(){return n},setContainer:function(t){if(n!==t){n=t,m=this.getSwfObject(t),document.hasFocus()?S():window.addEventListener("focus",A),m.once("ready",(function(){E();var t=Object(r.j)({},e),n=m.triggerFlash("setup",t);n===m?m.__ready=!0:this.trigger(u.G,new v.s(v.n,v.k,n)),y&&I("init",y),I("setupCommandQueue",m.__commandQueue),m.__commandQueue.length=0}),this);var i=[u.Q,u.R,"subtitlesTrackChanged","mediaType"],o=[u.D,u.S],l=[u.E];m.on([u.I,u.J].join(" "),(function(t){!function(t){for(var n=t.levels,r=0;r<n.length;r++){var i=n[r];i.index=r,"Auto"!==i.label&&(i.label=Object(a.a)(i,e.qualityLabels))}t.levels=x=function(t){return t.sort((function(t,e){return t.height&&e.height?e.height-t.height:e.bitrate-t.bitrate}))}(t.levels),t.currentQuality=_=N(x,t.currentQuality)}(t),this.trigger(t.type,t)}),this),m.on(u.f,(function(t){w=t.currentTrack,C=t.tracks,this.trigger(t.type,t)}),this),m.on(u.g,(function(t){w=t.currentTrack,C=t.tracks,this.trigger(t.type,t)}),this),m.on(u.bb,(function(t){var e=t.newstate;e!==u.nb&&this.setState(e)}),this),m.on(o.join(" "),(function(t){t.seekRange=t.seekRange||{start:0,end:0},"Infinity"===t.duration?t.duration=1/0:t.seekRange.end=t.seekRange.end||Math.abs(t.duration),t.currentTime=t.currentTime||t.position,this.trigger(t.type,t)}),this),m.on(i.join(" "),(function(t){this.trigger(t.type,t)}),this),m.on(l.join(" "),(function(t){this.trigger(t.type)}),this),m.on(u.B,(function(){this.trigger(u.F)}),this),m.on(u.U,(function(t){var e=0;x.length>1&&(e=N(x,t.level.index+1)),t.level=Object(r.j)(t.level,{index:e}),"initial choice"!==t.reason&&(t.reason=t.reason?"auto":"api"),this.trigger(u.U,t),this.trigger("providerFirstFrame",{})}),this),m.on(u.fb,(function(t){b=t.message,this.trigger(u.fb,t)}),this),m.on(u.w,(function(t){this.trigger(u.G,new v.s(v.o,v.i,t))}),this),m.on(u.G,(function(t){this.trigger(u.G,new v.s(v.o,v.j,t))}),this),m.on("subtitlesTracks",(function(t){this.addTextTracks(t.tracks)}),this),m.on("subtitlesTrackData",(function(t){this.addCuesToTrack(t)}),this),m.on(u.K,(function(t){t&&(t.metadata&&"textdata"===t.metadata.type?this.addCaptionsCue(t.metadata):this.trigger(t.type,t))}),this),function(t){var e=document.createElement("a");e.href=t.flashplayer;var n=e.host===window.location.host;return s.Browser.chrome&&!n}(e)&&m.on("throttle",(function(t){E();var e="resume"!==t.state;"resume"===t.state?(c.a.trigger.call(j,"flashThrottle",{value:e}),c.a.trigger.call(j,"flashBlocked",{value:e})):p=setTimeout((function(){c.a.trigger.call(j,"flashThrottle",{value:e}),c.a.trigger.call(j,"flashBlocked",{value:e})}),250)}),this)}},remove:function(){var t;_=-1,x=null,(t=m)&&t.parentNode&&(t.style.display="none",t.parentNode.removeChild(t),t=null)},setVisibility:function(t){t=!!t,n.style.opacity=t?1:0},resize:function(t,e,n){n&&I("stretch",n)},setControls:function(t){I("setControls",t)},setCurrentQuality:function(t){I("setCurrentQuality",x[t].index)},getCurrentQuality:function(){return _},setSubtitlesTrack:function(t){I("setSubtitlesTrack",t)},getName:function(){return b?{name:"flash_"+b}:{name:"flash"}},getQualityLevels:function(){return(x||y&&y.sources||[]).map((function(t){return Object(i.a)(t)}))},getAudioTracks:function(){return C},getCurrentAudioTrack:function(){return w},setCurrentAudioTrack:function(t){I("setCurrentAudioTrack",t)},detachMedia:function(){this.pause()},destroy:function(){E(),this.remove(),m&&(m.off(),m=null),n=null,y=null,this.off()}})}var b=function(){};b.prototype=T.a,m.prototype=new b,m.getName=function(){return{name:"flash"}};e.default=m},74:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(2);function i(t){var e=[],n=(t=Object(r.i)(t)).split("\r\n\r\n");1===n.length&&(n=t.split("\n\n"));for(var i=0;i<n.length;i++)if("WEBVTT"!==n[i]){var s=a(n[i]);s.text&&e.push(s)}return e}function a(t){var e={},n=t.split("\r\n");1===n.length&&(n=t.split("\n"));var i=1;if(n[0].indexOf(" --\x3e ")>0&&(i=0),n.length>i+1&&n[i+1]){var a=n[i],s=a.indexOf(" --\x3e ");s>0&&(e.begin=Object(r.g)(a.substr(0,s)),e.end=Object(r.g)(a.substr(s+5)),e.text=n.slice(i+1).join("\r\n"))}return e}},77:function(t,e,n){"use strict";var r=window.VTTCue;function i(t){if("string"!=typeof t)return!1;return!!{start:!0,middle:!0,end:!0,left:!0,right:!0}[t.toLowerCase()]&&t.toLowerCase()}if(!r){(r=function(t,e,n){var r=this;r.hasBeenReset=!1;var a="",s=!1,u=t,c=e,o=n,l=null,d="",h=!0,f="auto",T="start",g="auto",v=100,k="middle";Object.defineProperty(r,"id",{enumerable:!0,get:function(){return a},set:function(t){a=""+t}}),Object.defineProperty(r,"pauseOnExit",{enumerable:!0,get:function(){return s},set:function(t){s=!!t}}),Object.defineProperty(r,"startTime",{enumerable:!0,get:function(){return u},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.");u=t,this.hasBeenReset=!0}}),Object.defineProperty(r,"endTime",{enumerable:!0,get:function(){return c},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.");c=t,this.hasBeenReset=!0}}),Object.defineProperty(r,"text",{enumerable:!0,get:function(){return o},set:function(t){o=""+t,this.hasBeenReset=!0}}),Object.defineProperty(r,"region",{enumerable:!0,get:function(){return l},set:function(t){l=t,this.hasBeenReset=!0}}),Object.defineProperty(r,"vertical",{enumerable:!0,get:function(){return d},set:function(t){var e=function(t){return"string"==typeof t&&(!!{"":!0,lr:!0,rl:!0}[t.toLowerCase()]&&t.toLowerCase())}(t);if(!1===e)throw new SyntaxError("An invalid or illegal string was specified.");d=e,this.hasBeenReset=!0}}),Object.defineProperty(r,"snapToLines",{enumerable:!0,get:function(){return h},set:function(t){h=!!t,this.hasBeenReset=!0}}),Object.defineProperty(r,"line",{enumerable:!0,get:function(){return f},set:function(t){if("number"!=typeof t&&"auto"!==t)throw new SyntaxError("An invalid number or illegal string was specified.");f=t,this.hasBeenReset=!0}}),Object.defineProperty(r,"lineAlign",{enumerable:!0,get:function(){return T},set:function(t){var e=i(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");T=e,this.hasBeenReset=!0}}),Object.defineProperty(r,"position",{enumerable:!0,get:function(){return g},set:function(t){if(t<0||t>100)throw new Error("Position must be between 0 and 100.");g=t,this.hasBeenReset=!0}}),Object.defineProperty(r,"size",{enumerable:!0,get:function(){return v},set:function(t){if(t<0||t>100)throw new Error("Size must be between 0 and 100.");v=t,this.hasBeenReset=!0}}),Object.defineProperty(r,"align",{enumerable:!0,get:function(){return k},set:function(t){var e=i(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");k=e,this.hasBeenReset=!0}}),r.displayState=void 0}).prototype.getCueAsHTML=function(){return window.WebVTT.convertCueToDOMTree(window,this.text)}}e.a=r},78:function(t,e,n){"use strict";function r(t,e){var n=t.kind||"cc";return t.default||t.defaulttrack?"default":t._id||t.file||n+e}function i(t,e){var n=t.label||t.name||t.language;return n||(n="Unknown CC",(e+=1)>1&&(n+=" ["+e+"]")),{label:n,unknownCount:e}}n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}))},79:function(t,e,n){"use strict";var r=n(77),i=n(10),a=n(28),s=n(4),u=n(74),c=n(2),o=n(1);function l(t){throw new o.s(null,t)}function d(t,e,r){t.xhr=Object(a.a)(t.file,(function(a){!function(t,e,r,a){var d,h,T=t.responseXML?t.responseXML.firstChild:null;if(T)for("xml"===Object(s.b)(T)&&(T=T.nextSibling);T.nodeType===T.COMMENT_NODE;)T=T.nextSibling;try{if(T&&"tt"===Object(s.b)(T))d=function(t){t||l(306007);var e=[],n=t.getElementsByTagName("p"),r=30,i=t.getElementsByTagName("tt");if(i&&i[0]){var a=parseFloat(i[0].getAttribute("ttp:frameRate"));isNaN(a)||(r=a)}n||l(306005),n.length||(n=t.getElementsByTagName("tt:p")).length||(n=t.getElementsByTagName("tts:p"));for(var s=0;s<n.length;s++){for(var u=n[s],o=u.getElementsByTagName("br"),d=0;d<o.length;d++){var h=o[d];h.parentNode.replaceChild(t.createTextNode("\r\n"),h)}var f=u.innerHTML||u.textContent||u.text||"",T=Object(c.i)(f).replace(/>\s+</g,"><").replace(/(<\/?)tts?:/g,"$1").replace(/<br.*?\/>/g,"\r\n");if(T){var g=u.getAttribute("begin"),v=u.getAttribute("dur"),k=u.getAttribute("end"),m={begin:Object(c.g)(g,r),text:T};k?m.end=Object(c.g)(k,r):v&&(m.end=m.begin+Object(c.g)(v,r)),e.push(m)}}return e.length||l(306005),e}(t.responseXML),h=f(d),delete e.xhr,r(h);else{var g=t.responseText;g.indexOf("WEBVTT")>=0?n.e(18).then(function(t){return n(148).default}.bind(null,n)).catch(Object(i.c)(301131)).then((function(t){var n=new t(window);h=[],n.oncue=function(t){h.push(t)},n.onflush=function(){delete e.xhr,r(h)},n.parse(g)})).catch((function(t){delete e.xhr,a(Object(o.A)(null,o.b,t))})):(d=Object(u.a)(g),h=f(d),delete e.xhr,r(h))}}catch(t){delete e.xhr,a(Object(o.A)(null,o.b,t))}}(a,t,e,r)}),(function(t,e,n,i){r(Object(o.z)(i,o.b))}))}function h(t){t&&t.forEach((function(t){var e=t.xhr;e&&(e.onload=null,e.onreadystatechange=null,e.onerror=null,"abort"in e&&e.abort()),delete t.xhr}))}function f(t){return t.map((function(t){return new r.a(t.begin,t.end,t.text)}))}n.d(e,"c",(function(){return d})),n.d(e,"a",(function(){return h})),n.d(e,"b",(function(){return f}))},81:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return s}));var r={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"};function i(t,e){for(var n,r,i,a=t.length,s="",u=e||0;u<a;)if(0!==(n=t[u++])&&3!==n)switch(n>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:s+=String.fromCharCode(n);break;case 12:case 13:r=t[u++],s+=String.fromCharCode((31&n)<<6|63&r);break;case 14:r=t[u++],i=t[u++],s+=String.fromCharCode((15&n)<<12|(63&r)<<6|(63&i)<<0)}return s}function a(t){var e=function(t){for(var e="0x",n=0;n<t.length;n++)t[n]<16&&(e+="0"),e+=t[n].toString(16);return parseInt(e)}(t);return 127&e|(32512&e)>>1|(8323072&e)>>2|(2130706432&e)>>3}function s(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce((function(t,e){if(!("value"in e)&&"data"in e&&e.data instanceof ArrayBuffer){var n=new Uint8Array(e.data),s=n.length;e={value:{key:"",data:""}};for(var u=10;u<14&&u<n.length&&0!==n[u];)e.value.key+=String.fromCharCode(n[u]),u++;var c=19,o=n[c];3!==o&&0!==o||(o=n[++c],s--);var l=0;if(1!==o&&2!==o)for(var d=c+1;d<s;d++)if(0===n[d]){l=d-c;break}if(l>0){var h=i(n.subarray(c,c+=l),0);if("PRIV"===e.value.key){if("com.apple.streaming.transportStreamTimestamp"===h){var f=1&a(n.subarray(c,c+=4)),T=a(n.subarray(c,c+=4))+(f?4294967296:0);e.value.data=T}else e.value.data=i(n,c+1);e.value.info=h}else e.value.info=h,e.value.data=i(n,c+1)}else{var g=n[c];e.value.data=1===g||2===g?function(t,e){for(var n=t.length-1,r="",i=e||0;i<n;)254===t[i]&&255===t[i+1]||(r+=String.fromCharCode((t[i]<<8)+t[i+1])),i+=2;return r}(n,c+1):i(n,c+1)}}if(r.hasOwnProperty(e.value.key)&&(t[r[e.value.key]]=e.value.data),e.value.info){var v=t[e.value.key];v!==Object(v)&&(v={},t[e.value.key]=v),v[e.value.info]=e.value.data}else t[e.value.key]=e.value.data;return t}),{})}},87:function(t,e,n){"use strict";var r=n(79),i=n(78),a=n(81),s=n(5),u=n(3),c=n(0),o={_itemTracks:null,_textTracks:null,_tracksById:null,_cuesByTrackId:null,_cachedVTTCues:null,_metaCuesByTextTime:null,_currentTextTrackIndex:-1,_unknownCount:0,_activeCues:null,_initTextTracks:function(){this._textTracks=[],this._tracksById={},this._metaCuesByTextTime={},this._cuesByTrackId={},this._cachedVTTCues={},this._unknownCount=0},addTracksListener:function(t,e,n){if(!t)return;if(l(t,e,n),this.instreamMode)return;t.addEventListener?t.addEventListener(e,n):t["on"+e]=n},clearTracks:function(){Object(r.a)(this._itemTracks);var t=this._tracksById&&this._tracksById.nativemetadata;(this.renderNatively||t)&&(g(this.renderNatively,this.video.textTracks),t&&(t.oncuechange=null));this._itemTracks=null,this._textTracks=null,this._tracksById=null,this._cuesByTrackId=null,this._metaCuesByTextTime=null,this._unknownCount=0,this._currentTextTrackIndex=-1,this._activeCues=null,this.renderNatively&&(this.removeTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),g(this.renderNatively,this.video.textTracks))},clearMetaCues:function(){var t=this._tracksById&&this._tracksById.nativemetadata;t&&(g(this.renderNatively,[t]),t.mode="hidden",t.inuse=!0,this._cachedVTTCues[t._id]={})},clearCueData:function(t){var e=this._cachedVTTCues;e&&e[t]&&(e[t]={},this._tracksById&&(this._tracksById[t].data=[]))},disableTextTrack:function(){var t=this.getCurrentTextTrack();if(t){t.mode="disabled";var e=t._id;e&&0===e.indexOf("nativecaptions")&&(t.mode="hidden")}},enableTextTrack:function(){var t=this.getCurrentTextTrack();t&&(t.mode="showing")},getCurrentTextTrack:function(){return this._textTracks&&this._textTracks[this._currentTextTrackIndex]},getSubtitlesTrack:function(){return this._currentTextTrackIndex},removeTracksListener:l,addTextTracks:f,setTextTracks:function(t){if(this._currentTextTrackIndex=-1,!t)return;this._textTracks?(this._unknownCount=0,this._textTracks=this._textTracks.filter((function(t){var e=t._id;return this.renderNatively&&e&&0===e.indexOf("nativecaptions")?(delete this._tracksById[e],!1):(t.name&&0===t.name.indexOf("Unknown")&&this._unknownCount++,!0)}),this),delete this._tracksById.nativemetadata):this._initTextTracks();if(t.length)for(var e=0,n=t.length;e<n;e++){var r=t[e];if(!r._id){if("captions"===r.kind||"metadata"===r.kind){if(r._id="native"+r.kind+e,!r.label&&"captions"===r.kind){var a=Object(i.b)(r,this._unknownCount);r.name=a.label,this._unknownCount=a.unknownCount}}else r._id=Object(i.a)(r,this._textTracks.length);if(this._tracksById[r._id])continue;r.inuse=!0}if(r.inuse&&!this._tracksById[r._id])if("metadata"===r.kind)r.mode="hidden",r.oncuechange=y.bind(this),this._tracksById[r._id]=r;else if(v(r.kind)){var u=r.mode,c=void 0;if(r.mode="hidden",!r.cues.length&&r.embedded)continue;if(r.mode=u,this._cuesByTrackId[r._id]&&!this._cuesByTrackId[r._id].loaded){for(var o=this._cuesByTrackId[r._id].cues;c=o.shift();)T(this.renderNatively,r,c);r.mode=u,this._cuesByTrackId[r._id].loaded=!0}m.call(this,r)}}this.renderNatively&&(this.textTrackChangeHandler=this.textTrackChangeHandler||d.bind(this),this.addTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),(s.Browser.edge||s.Browser.firefox||s.Browser.safari)&&(this.addTrackHandler=this.addTrackHandler||h.bind(this),this.addTracksListener(this.video.textTracks,"addtrack",this.addTrackHandler)));this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks})},setupSideloadedTracks:function(t){if(!this.renderNatively)return;var e=t===this._itemTracks;e||Object(r.a)(this._itemTracks);if(this._itemTracks=t,!t)return;e||(this.disableTextTrack(),b.call(this),this.addTextTracks(t))},setSubtitlesTrack:function(t){if(!this.renderNatively)return void(this.setCurrentSubtitleTrack&&this.setCurrentSubtitleTrack(t-1));if(!this._textTracks)return;0===t&&this._textTracks.forEach((function(t){t.mode=t.embedded?"hidden":"disabled"}));if(this._currentTextTrackIndex===t-1)return;this.disableTextTrack(),this._currentTextTrackIndex=t-1;var e=this.getCurrentTextTrack();e&&(e.mode="showing");this.trigger("subtitlesTrackChanged",{currentTrack:this._currentTextTrackIndex+1,tracks:this._textTracks})},textTrackChangeHandler:null,addTrackHandler:null,addCuesToTrack:function(t){var e=this._tracksById[t.name];if(!e)return;e.source=t.source;for(var n=t.captions||[],i=[],a=!1,s=0;s<n.length;s++){var u=n[s],c=t.name+"_"+u.begin+"_"+u.end;this._metaCuesByTextTime[c]||(this._metaCuesByTextTime[c]=u,i.push(u),a=!0)}a&&i.sort((function(t,e){return t.begin-e.begin}));var o=Object(r.b)(i);Array.prototype.push.apply(e.data,o)},addCaptionsCue:function(t){if(!t.text||!t.begin||!t.end)return;var e,n=t.trackid.toString(),i=this._tracksById&&this._tracksById[n];i||(i={kind:"captions",_id:n,data:[]},this.addTextTracks([i]),this.trigger("subtitlesTracks",{tracks:this._textTracks}));t.useDTS&&(i.source||(i.source=t.source||"mpegts"));e=t.begin+"_"+t.text;var a=this._metaCuesByTextTime[e];if(!a){a={begin:t.begin,end:t.end,text:t.text},this._metaCuesByTextTime[e]=a;var s=Object(r.b)([a])[0];i.data.push(s)}},createCue:function(t,e,n){var r=window.VTTCue||window.TextTrackCue,i=Math.max(e||0,t+.25);return new r(t,i,n)},addVTTCue:function(t,e){this._tracksById||this._initTextTracks();var n=t.track?t.track:"native"+t.type,r=this._tracksById[n],i="captions"===t.type?"Unknown CC":"ID3 Metadata",a=t.cue;if(!r){var s={kind:t.type,_id:n,label:i,embedded:!0};r=k.call(this,s),this.renderNatively||"metadata"===r.kind?this.setTextTracks(this.video.textTracks):f.call(this,[r])}if(p.call(this,r,a,e)){var u=this.renderNatively||"metadata"===r.kind;return u?T(u,r,a):r.data.push(a),a}return null},addVTTCuesToTrack:function(t,e){if(!this.renderNatively)return;var n,r=this._tracksById[t._id];if(!r)return this._cuesByTrackId||(this._cuesByTrackId={}),void(this._cuesByTrackId[t._id]={cues:e,loaded:!1});if(this._cuesByTrackId[t._id]&&this._cuesByTrackId[t._id].loaded)return;this._cuesByTrackId[t._id]={cues:e,loaded:!0};for(;n=e.shift();)T(this.renderNatively,r,n)},triggerActiveCues:function(t){var e=this;if(!t||!t.length)return void(this._activeCues=null);var n=this._activeCues||[],r=Array.prototype.filter.call(t,(function(t){if(n.some((function(e){return r=e,(n=t).startTime===r.startTime&&n.endTime===r.endTime&&n.text===r.text&&n.data===r.data&&n.value===r.value;var n,r})))return!1;if(t.data||t.value)return!0;if(t.text){var r=JSON.parse(t.text),i={metadataTime:t.startTime,metadata:r};r.programDateTime&&(i.programDateTime=r.programDateTime),r.metadataType&&(i.metadataType=r.metadataType,delete r.metadataType),e.trigger(u.K,i)}return!1}));if(r.length){var i=Object(a.a)(r),s=r[0].startTime;this.trigger(u.K,{metadataType:"id3",metadataTime:s,metadata:i})}this._activeCues=Array.prototype.slice.call(t)},renderNatively:!1};function l(t,e,n){t&&(t.removeEventListener?t.removeEventListener(e,n):t["on"+e]=null)}function d(){var t=this.video.textTracks,e=Object(c.k)(t,(function(t){return(t.inuse||!t._id)&&v(t.kind)}));if(this._textTracks&&!_.call(this,e)){for(var n=-1,r=0;r<this._textTracks.length;r++)if("showing"===this._textTracks[r].mode){n=r;break}n!==this._currentTextTrackIndex&&this.setSubtitlesTrack(n+1)}else this.setTextTracks(t)}function h(){this.setTextTracks(this.video.textTracks)}function f(t){var e=this;t&&(this._textTracks||this._initTextTracks(),t.forEach((function(t){if(!t.kind||v(t.kind)){var n=k.call(e,t);m.call(e,n),t.file&&(t.data=[],Object(r.c)(t,(function(t){n.sideloaded=!0,e.addVTTCuesToTrack(n,t)}),(function(t){e.trigger(u.ub,t)})))}})),this._textTracks&&this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks}))}function T(t,e,n){if(s.Browser.ie){var r=n;(t||"metadata"===e.kind)&&(r=new window.TextTrackCue(n.startTime,n.endTime,n.text)),function(t,e){var n=[],r=t.mode;t.mode="hidden";for(var i=t.cues,a=i.length-1;a>=0&&i[a].startTime>e.startTime;a--)n.unshift(i[a]),t.removeCue(i[a]);try{t.addCue(e),n.forEach((function(e){return t.addCue(e)}))}catch(t){console.error(t)}t.mode=r}(e,r)}else try{e.addCue(n)}catch(t){console.error(t)}}function g(t,e){e&&e.length&&Object(c.i)(e,(function(e){if(!(s.Browser.ie&&t&&/^(native|subtitle|cc)/.test(e._id))){s.Browser.ie&&"disabled"===e.mode||(e.mode="disabled",e.mode="hidden");for(var n=e.cues.length;n--;)e.removeCue(e.cues[n]);e.embedded||(e.mode="disabled"),e.inuse=!1}}))}function v(t){return"subtitles"===t||"captions"===t}function k(t){var e,n=Object(i.b)(t,this._unknownCount),r=n.label;if(this._unknownCount=n.unknownCount,this.renderNatively||"metadata"===t.kind){var a=this.video.textTracks;(e=Object(c.m)(a,{label:r}))||(e=this.video.addTextTrack(t.kind,r,t.language||"")),e.default=t.default,e.mode="disabled",e.inuse=!0}else(e=t).data=e.data||[];return e._id||(e._id=Object(i.a)(t,this._textTracks.length)),e}function m(t){this._textTracks.push(t),this._tracksById[t._id]=t}function b(){if(this._textTracks){var t=this._textTracks.filter((function(t){return t.embedded||"subs"===t.groupid}));this._initTextTracks(),t.forEach((function(t){this._tracksById[t._id]=t})),this._textTracks=t}}function y(t){this.triggerActiveCues(t.currentTarget.activeCues)}function p(t,e,n){var r=t.kind;this._cachedVTTCues[t._id]||(this._cachedVTTCues[t._id]={});var i,a=this._cachedVTTCues[t._id];switch(r){case"captions":case"subtitles":i=n||Math.floor(20*e.startTime);var s="_"+e.line,u=Math.floor(20*e.endTime),c=a[i+s]||a[i+1+s]||a[i-1+s];return!(c&&Math.abs(c-u)<=1)&&(a[i+s]=u,!0);case"metadata":var o=e.data?new Uint8Array(e.data).join(""):e.text;return!a[i=n||e.startTime+o]&&(a[i]=e.endTime,!0);default:return!1}}function _(t){if(t.length>this._textTracks.length)return!0;for(var e=0;e<t.length;e++){var n=t[e];if(!n._id||!this._tracksById[n._id])return!0}return!1}e.a=o},91:function(t,e,n){"use strict";function r(t){return{bitrate:t.bitrate,label:t.label,width:t.width,height:t.height}}n.d(e,"a",(function(){return r}))}}]);
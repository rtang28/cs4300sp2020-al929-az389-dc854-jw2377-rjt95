(this.webpackJsonpsite=this.webpackJsonpsite||[]).push([[0],{23:function(e,t,a){},29:function(e,t,a){e.exports=a(41)},37:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(25),l=a.n(r),i=(a(23),a(11)),o=a(12),s=a(15),u=a(14),m=a(13),d=a(5),E=a(17),v=a.n(E),f=a(26),b=a(7),p=a(21),h=function(e){var t=e.keywords,a=e.handleChange,r=Object(n.createRef)(),l=function(e){var n=Object(p.a)(t);n.splice(e,1),a(n)};return c.a.createElement("div",{className:"tag-input"},c.a.createElement("ul",{className:"tag-list"},t.map((function(e,t){return c.a.createElement("li",{key:e},e,c.a.createElement("button",{type:"button",onClick:function(){l(t)}},"x"))})),c.a.createElement("li",{className:"tag-input-field"},c.a.createElement("input",{type:"text",onKeyUp:function(e){var n=e.target.value.toLowerCase();"Enter"===e.key&&n?t.includes(n)||(a([].concat(Object(p.a)(t),[n])),r.current.value=""):"Backspace"!==e.key||n||l(t.length-1)},ref:r,placeholder:t.length?"":"Enter some keywords..."}))))},j=a(18),w=a.n(j),O=function(e){var t=e.locations,a=e.setSelected,r=Object(n.useState)(!1),l=Object(b.a)(r,2),i=l[0],o=l[1],s=Object(n.useState)("Choose Location..."),u=Object(b.a)(s,2),m=u[0],d=u[1];Object(n.useEffect)((function(){return setTimeout((function(){i?window.addEventListener("click",E):window.removeEventListener("click",E)}),0),function(){window.removeEventListener("click",E)}}));var E=function(){o(!1)};return c.a.createElement("div",{className:"dd-wrapper"},c.a.createElement("div",{className:"dd-header",onClick:function(){o(!i)}},c.a.createElement("div",{className:"dd-header-title"},m),i?c.a.createElement(w.a,{name:"angle-up",size:"2x"}):c.a.createElement(w.a,{name:"angle-down",size:"2x"})),i&&c.a.createElement("ul",{className:"dd-list"},t.map((function(e){return c.a.createElement("li",{key:e.id,className:"dd-list-item",onClick:function(){return n=e.id,a(n),E(),void d(t[n].title);var n}},e.title)}))))},k=function(e){var t=e.name,a=e.distance;return c.a.createElement("div",{className:"card"},c.a.createElement("div",{className:"card-body"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"card-title"},c.a.createElement("h5",{className:"card-title mb-0"},t)),c.a.createElement("div",{className:"score"},"score: ",a))))},y=function(e){var t=e.results;return c.a.createElement("div",{className:"results-container"},t&&t.map((function(e){return c.a.createElement(k,{name:e.name,distance:e.distance})})))},g=function(){var e=Object(n.useState)([]),t=Object(b.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(-1),i=Object(b.a)(l,2),o=i[0],s=i[1],u=Object(n.useState)([{name:"mcdonalds",distance:1}]),m=Object(b.a)(u,2),d=m[0],E=m[1],p=function(e,t){var a="".concat(window.location,"search"),n=e.toString().replace(/ /g,"%20"),c="".concat(t);return a+="".concat(e?"?keywords="+n:""),t>=0&&(a+="".concat(e?"&":"?","zip=").concat(c)),a},j=function(){var e=Object(f.a)(v.a.mark((function e(){var t,n,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=p(a,o),e.next=3,fetch(t,{method:"GET"});case 3:return n=e.sent,console.log(n),e.next=7,n.json();case 7:c=e.sent,console.log(c),E(c.data.results);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return c.a.createElement("div",null,c.a.createElement("div",{className:"keyword-search"},c.a.createElement(h,{keywords:a,handleChange:r})),c.a.createElement("div",{className:"location-selector"},c.a.createElement(O,{locations:[{id:0,title:"New York"},{id:1,title:"Dublin"},{id:2,title:"California"},{id:3,title:"Istanbul"},{id:4,title:"Izmir"},{id:5,title:"Oslo"}],selected:o,setSelected:s})),c.a.createElement("button",{onClick:j},"Search!"),c.a.createElement("div",{className:"results"},c.a.createElement(y,{results:d})))},N=(a(37),function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return c.a.createElement(m.a,null,c.a.createElement("nav",null,c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement(m.b,{to:"/"},"Home")),c.a.createElement("li",null,c.a.createElement(m.b,{to:"/about"},"About")))),c.a.createElement(d.c,null,c.a.createElement(d.a,{path:"/about"},c.a.createElement(S,null)),c.a.createElement(d.a,{path:"/"},c.a.createElement(C,null))))}}]),a}(n.Component)),C=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return c.a.createElement(n.Fragment,null,c.a.createElement("h3",null,"Home!"),c.a.createElement(g,null))}}]),a}(n.Component),S=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return c.a.createElement("div",{id:"about-placeholder"})}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.8b798dc0.chunk.js.map
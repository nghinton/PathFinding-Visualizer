(this.webpackJsonppathfinder=this.webpackJsonppathfinder||[]).push([[0],{19:function(e,t,a){e.exports=a(32)},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);a(20);var n=a(0),i=a.n(n),s=a(9),r=a.n(s),o=(a(25),a(7)),l=a(10),c=a(11),u=a(13),d=a(12),h=a(16),v=a.n(h),f=a(17),m=a(6),g=(a(26),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this.props,t=e.col,a=e.isFinish,n=e.isStart,s=e.isWall,r=e.onMouseDown,o=e.onMouseEnter,l=e.onMouseUp,c=e.row,u=a?"node-finish":n?"node-start":s?"node-wall":"";return i.a.createElement("td",{id:"node-".concat(c,"-").concat(t),className:"node ".concat(u),onMouseDown:function(){return r(c,t)},onMouseEnter:function(){return o(c,t)},onMouseUp:function(){return l()}})}}]),a}(n.Component)),p=a(14);function N(e,t,a){var n=[];t.distance=0;for(var i=function(e){var t,a=[],n=Object(p.a)(e);try{for(n.s();!(t=n.n()).done;){var i,s=t.value,r=Object(p.a)(s);try{for(r.s();!(i=r.n()).done;){var o=i.value;a.push(o)}}catch(l){r.e(l)}finally{r.f()}}}catch(l){n.e(l)}finally{n.f()}return a}(e);i.length;){E(i);var s=i.shift();if(!s.isWall){if(s.distance===1/0)return n;if(s.isVisited=!0,n.push(s),s===a)return n;S(s,e)}}}function E(e){e.sort((function(e,t){return e.distance-t.distance}))}function S(e,t){var a,n=function(e,t){var a=[],n=e.col,i=e.row;i>0&&a.push(t[i-1][n]);i<t.length-1&&a.push(t[i+1][n]);n>0&&a.push(t[i][n-1]);n<t[0].length-1&&a.push(t[i][n+1]);return a.filter((function(e){return!e.isVisited}))}(e,t),i=Object(p.a)(n);try{for(i.s();!(a=i.n()).done;){var s=a.value;s.distance=e.distance+1,s.previousNode=e}}catch(r){i.e(r)}finally{i.f()}}a(27);var O=Math.floor(.77*v()(window).innerHeight()/25),k=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={grid:[],START_NODE_ROW:Math.floor(O/2),START_NODE_COL:15,FINISH_NODE_ROW:Math.floor(O/2),FINISH_NODE_COL:45,mouseIsPressed:!1,movingStartNode:!1,movingFinishNode:!1,pathFinding:!1,algorithm:1,algorithmChoice:"Dijkstra's",speed:1,speedChoice:"Average"},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this.getInitialGrid();this.setState({grid:e})}},{key:"refreshPage",value:function(){window.location.reload()}},{key:"handleMouseDown",value:function(e,t){var a=this.state.grid,n=a[e][t];if(n.isStart)this.setState({movingStartNode:!0});else if(n.isFinish)this.setState({movingFinishNode:!0});else{var i=this.getNewGridWithWallToggled(a,e,t);this.setState({grid:i,mouseIsPressed:!0})}}},{key:"handleMouseEnter",value:function(e,t){if(this.state.movingStartNode){var a=this.getNewGridWithNewStart(this.state.grid,e,t);this.setState({grid:a,START_NODE_ROW:e,START_NODE_COL:t})}if(this.state.movingFinishNode){var n=this.getNewGridWithNewFinish(this.state.grid,e,t);this.setState({grid:n,FINISH_NODE_ROW:e,FINISH_NODE_COL:t})}if(this.state.mouseIsPressed){var i=this.getNewGridWithWallToggled(this.state.grid,e,t);this.setState({grid:i})}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1,movingStartNode:!1,movingFinishNode:!1})}},{key:"setSlowSpeed",value:function(){this.setState({speed:2,speedChoice:"Slow"})}},{key:"setAverageSpeed",value:function(){this.setState({speed:1,speedChoice:"Average"})}},{key:"setFastSpeed",value:function(){this.setState({speed:.5,speedChoice:"Fast"})}},{key:"setDijkstra",value:function(){this.setState({algorithm:1})}},{key:"clearBoard",value:function(){this.clearWalls(),this.clearPath();var e=this.getInitialGrid();this.setState({grid:e})}},{key:"clearWalls",value:function(){for(var e=Array.prototype.slice.call(document.getElementsByClassName("node-wall")),t=0;t<e.length;t++)e[t].className="node ";for(var a=this.state.grid,n=0;n<O;n++)for(var i=0;i<60;i++){a[n][i].isWall=!1}}},{key:"clearPath",value:function(){for(var e=Array.prototype.slice.call(document.getElementsByClassName("node-visited")),t=0;t<e.length;t++)e[t].className="node ";for(var a=Array.prototype.slice.call(document.getElementsByClassName("node-shortest-path")),n=0;n<a.length;n++)a[n].className="node ";for(var i=this.state.grid,s=0;s<O;s++)for(var r=0;r<60;r++){var o=i[s][r];o.distance=1/0,o.isVisited=!1,o.previousNode=null}}},{key:"visualizeAlgorithm",value:function(){var e=this;switch(this.clearPath(),this.state.algorithm){case 1:default:this.setState({pathFinding:!0},(function(){return e.visualizeDijkstra()}))}}},{key:"visualizeDijkstra",value:function(){var e=this,t=this.state.grid,a=t[this.state.START_NODE_ROW][this.state.START_NODE_COL],n=t[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL],i=N(t,a,n);console.log(i);var s=function(e){for(var t=[],a=e;null!==a;)t.unshift(a),a=a.previousNode;return t}(n);this.animateDijkstra(i,s),setTimeout((function(){e.setState({pathFinding:!1})}),(10*i.length+50*s.length)*this.state.speed)}},{key:"animateDijkstra",value:function(e,t){for(var a=this,n=function(n){if(n===e.length)return setTimeout((function(){a.animateShortestPath(t)}),10*a.state.speed*n),{v:void 0};setTimeout((function(){var t=e[n];t.isStart||t.isFinish||(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited")}),10*a.state.speed*n)},i=0;i<=e.length;i++){var s=n(i);if("object"===typeof s)return s.v}}},{key:"animateShortestPath",value:function(e){for(var t=this,a=function(a){setTimeout((function(){var t=e[a];t.isStart||t.isFinish||(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-shortest-path")}),50*t.state.speed*a)},n=0;n<e.length;n++)a(n)}},{key:"render",value:function(){var e=this,t=this.state,a=t.grid,n=t.mouseIsPressed,s=t.pathFinding,r=t.algorithmChoice,o=t.speedChoice;return i.a.createElement("div",{className:"app-container"},i.a.createElement(f.a,{fluid:!0},i.a.createElement("div",{className:"navbar"},i.a.createElement("button",{onClick:function(){return e.refreshPage()}},"Pathfinding Visualizer"),i.a.createElement("button",{disabled:!!s,onClick:function(){return e.clearBoard()}},"Clear Board"),i.a.createElement("button",{disabled:!!s,onClick:function(){return e.clearWalls()}},"Clear Walls"),i.a.createElement("button",{disabled:!!s,onClick:function(){return e.clearPath()}},"Clear Path"),i.a.createElement(m.a,null,i.a.createElement(m.a.Toggle,{variant:"success",id:"dropdown-basic"},"Algorithm: ",r),i.a.createElement(m.a.Menu,null,i.a.createElement(m.a.Item,{onClick:function(){return e.setDijkstra()}},"Dijkstra's"))),i.a.createElement("button",{disabled:!!s,onClick:function(){return e.visualizeAlgorithm()}},"Visualize Algorithm"),i.a.createElement(m.a,null,i.a.createElement(m.a.Toggle,{variant:"success",id:"dropdown-basic"},"Speed: ",o),i.a.createElement(m.a.Menu,null,i.a.createElement(m.a.Item,{onClick:function(){return e.setSlowSpeed()}},"Slow"),i.a.createElement(m.a.Item,{onClick:function(){return e.setAverageSpeed()}},"Average"),i.a.createElement(m.a.Item,{onClick:function(){return e.setFastSpeed()}},"Fast"))))),i.a.createElement("div",{id:"mainText"},i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement("div",{class:"start"}),"Start Node"),i.a.createElement("li",null,i.a.createElement("div",{class:"finish"}),"Finish Node"),i.a.createElement("li",null,i.a.createElement("div",{class:"unvisited"}),"Unvisited Nodes"),i.a.createElement("li",null,i.a.createElement("div",{class:"visited"}),"Visited Nodes"),i.a.createElement("li",null,i.a.createElement("div",{class:"shortest-path"}),"Shortest-path Node"),i.a.createElement("li",null,i.a.createElement("div",{class:"wall"}),"Wall Node"))),i.a.createElement("div",{className:"table-container"},i.a.createElement("table",{className:"table"},a.map((function(t,a){return i.a.createElement("tr",{key:a},t.map((function(t,a){var s=t.row,r=t.col,o=t.isFinish,l=t.isStart,c=t.isWall;return i.a.createElement(g,{key:a,col:r,isFinish:o,isStart:l,isWall:c,mouseIsPressed:n,onMouseDown:function(t,a){return e.handleMouseDown(t,a)},onMouseEnter:function(t,a){return e.handleMouseEnter(t,a)},onMouseUp:function(){return e.handleMouseUp()},row:s})})))})))))}},{key:"getInitialGrid",value:function(){for(var e=[],t=0;t<O;t++){for(var a=[],n=0;n<60;n++)a.push(this.createNode(n,t));e.push(a)}return e}},{key:"createNode",value:function(e,t){return{col:e,row:t,isStart:t===this.state.START_NODE_ROW&&e===this.state.START_NODE_COL,isFinish:t===this.state.FINISH_NODE_ROW&&e===this.state.FINISH_NODE_COL,distance:1/0,isVisited:!1,isWall:!1,previousNode:null}}},{key:"getNewGridWithWallToggled",value:function(e,t,a){var n=e.slice(),i=n[t][a],s=Object(o.a)(Object(o.a)({},i),{},{isWall:!i.isWall});return n[t][a]=s,n}},{key:"getNewGridWithNewStart",value:function(e,t,a){e[this.state.START_NODE_ROW][this.state.START_NODE_COL].isStart=!1;var n=e.slice(),i=n[t][a],s=Object(o.a)(Object(o.a)({},i),{},{isStart:!0});return n[t][a]=s,n}},{key:"getNewGridWithNewFinish",value:function(e,t,a){e[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL].isFinish=!1;var n=e.slice(),i=n[t][a],s=Object(o.a)(Object(o.a)({},i),{},{isFinish:!0});return n[t][a]=s,n}}]),a}(n.Component);a(31);var y=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(k,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[19,1,2]]]);
//# sourceMappingURL=main.4ecba99e.chunk.js.map
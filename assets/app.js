(function(){
  var S = window.SERIES || [], PH = window.PHOTOS || {}, BX = window.BOXART || {}, PL = window.PLATFORMS || [];
  var page = document.body.dataset.page;
  var $ = function(s){return document.querySelector(s)};
  function plat(id){return PL.filter(function(p){return p.id===id})[0]}

  // 背景、页头、页脚
  document.body.insertAdjacentHTML("afterbegin",'<div class="bg" aria-hidden="true"><i></i><i></i><i></i><b></b></div>');
  var nav = [["index.html","系列一览","home"],["buy.html","正版购买","buy"],["play.html","模拟器与重编译","play"]];
  $("#top").innerHTML = '<div class="wrap"><a class="logo" href="index.html"><i>入</i><span>任天堂第一方入坑指南</span></a><nav class="nav">' +
    nav.map(function(n){return '<a href="'+n[0]+'"'+(n[2]===page||(page==="series"&&n[2]==="home")?' class="on"':'')+'>'+n[1]+'</a>'}).join("") + '</nav></div>';
  var credits = Object.keys(PH).map(function(k){var p=PH[k];return '<a href="'+p.url+'" target="_blank" rel="noopener">'+(plat(k)||{name:k}).name+'</a>（'+p.artist+'，'+p.license+'）'}).join("、");
  $("#foot").innerHTML = '<div class="wrap">本站为玩家自制的非官方指南，与任天堂株式会社无任何关联。文中游戏名称、角色及商标归各自权利人所有。' +
    '本站不提供任何游戏 ROM、密钥或破解文件的下载。<br>系列插画为本站原创的代码生成图形。' +
    (credits?'主机照片来自 Wikimedia Commons：'+credits+'。':'')+(Object.keys(BX).length?'<br>游戏封面图取自英文维基百科各游戏条目，版权归任天堂及各自权利人所有，本站仅用于介绍与评论；如权利人要求将立即移除。':'')+'<br>内容更新于 '+(window.UPDATED||"")+'，发售日期与价格请以官方信息为准。</div>';

  function slug(t){return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
  function box(o){return o && o.w && BX[slug(o.w)]}
  function firstBox(s){for(var i=0;i<s.order.length;i++){var b=box(s.order[i]);if(b)return b}}
  function cover(s){
    return '<div class="cover">'+window.scene(s.id)+'<span class="en">'+s.en+'</span>' +
      (firstBox(s)?'<img class="case" src="'+firstBox(s).file+'" alt="" loading="lazy">':'')+'<img src="images/'+s.id+'.jpg" alt="" loading="lazy" onerror="this.remove()"></div>';
  }
  function links(list){
    return '<div class="links">'+list.map(function(l){
      return '<a class="lk rv" href="'+l[1]+'" target="_blank" rel="noopener"><span class="tag">'+l[2]+'</span><b>'+l[0]+' ↗</b><span>'+l[3]+'</span></a>';
    }).join("")+'</div>';
  }
  function photo(id, cls){
    var p = PH[id], pl = plat(id) || {emoji:"🎮",name:id};
    return '<div class="hw '+(cls||"")+'">'+(p?'<img src="'+p.file+'" alt="'+pl.name+'" loading="lazy">':'<span>'+pl.emoji+'</span>')+'</div>';
  }

  if(page==="home"){
    // 首屏轮播
    var stage=$("#stage"), k=0;
    stage.innerHTML = S.map(function(s,i){return '<a class="slide'+(i?'':' on')+'" href="series.html?id='+s.id+'">'+window.scene(s.id)+'<span class="cap"><em>'+s.en+'</em><b>'+s.zh+'</b><small>先玩《'+s.order[0].t+'》→</small></span></a>'}).join("") +
      '<div class="dots">'+S.map(function(_,i){return '<i'+(i?'':' class="on"')+'></i>'}).join("")+'</div>';
    var slides=stage.querySelectorAll(".slide"), dots=stage.querySelectorAll(".dots i");
    function go(n){slides[k].classList.remove("on");dots[k].classList.remove("on");k=(n+S.length)%S.length;slides[k].classList.add("on");dots[k].classList.add("on")}
    var timer=setInterval(function(){go(k+1)},4200);
    dots.forEach(function(d,i){d.addEventListener("click",function(){clearInterval(timer);go(i)})});

    var chips=$("#chips"), grid=$("#grid"), cur="全部";
    function draw(){
      chips.innerHTML = window.MOODS.map(function(m){return '<button class="chip'+(m===cur?' on':'')+'" data-m="'+m+'">'+m+'</button>'}).join("");
      var list = S.filter(function(s){return cur==="全部"||s.moods.indexOf(cur)>-1});
      grid.innerHTML = list.map(function(s,i){
        return '<a class="card rv" style="transition-delay:'+(i%4*60)+'ms" href="series.html?id='+s.id+'">'+cover(s)+'<div class="body"><h3>'+s.zh+'</h3><p>'+s.tag+'</p>' +
          '<div class="tags"><span class="tag">'+s.genre+'</span><span class="tag g">先玩：'+s.order[0].t+'</span></div></div></a>';
      }).join("") || '<p class="lead">暂时没有符合的系列，换个标签试试。</p>';
      watch();
    }
    chips.addEventListener("click",function(e){var m=e.target.dataset.m;if(m){cur=m;draw()}});
    draw();
    $("#timeline").innerHTML = PL.map(function(p){return '<div class="tl rv">'+photo(p.id)+'<div class="yr">'+p.year+'</div><b>'+p.name+'</b><p>'+p.born+'</p></div>'}).join("");
    $("#general").innerHTML = links(window.GENERAL||[]);
  }

  if(page==="series"){
    var id = new URLSearchParams(location.search).get("id");
    var i = S.findIndex(function(s){return s.id===id}); if(i<0) i=0;
    var s = S[i], prev=S[(i-1+S.length)%S.length], next=S[(i+1)%S.length];
    var born=(window.BORN||{})[s.id], bp=plat(born);
    document.title = s.zh+"入坑顺序 · 任天堂第一方入坑指南";
    $("#main").innerHTML =
      '<section class="shero">'+window.scene(s.id)+'<div class="shade"></div><div class="wrap"><div><div class="en">'+s.en+'</div><h1>'+s.zh+'</h1><p>'+s.tag+'</p></div>'+(firstBox(s)?'<img class="case" src="'+firstBox(s).file+'" alt="'+s.order[0].t+'">':'')+'</div></section>' +
      '<div class="wrap"><div class="facts">' +
        [["系列诞生",s.since+" 年"],["类型",s.genre],["新手友好度",s.ease],["时间投入",s.time]].map(function(f){return '<div class="fact rv"><b>'+f[0]+'</b>'+f[1]+'</div>'}).join("") +
      '</div>' +
      '<div class="intro"><div><h2 class="sec">这是个什么系列</h2><div class="prose">'+s.intro.map(function(p){return '<p>'+p+'</p>'}).join("")+'</div></div>' +
      (bp?'<aside class="born rv">'+photo(born,"lg")+'<div><small>诞生平台</small><b>'+bp.name+'</b><span>'+bp.year+' 年发售</span></div></aside>':'')+'</div>' +
      '<div class="photo prose"><img src="images/'+s.id+'.jpg" alt="'+s.zh+'" onerror="this.parentNode.remove()"></div>' +
      '<h2 class="sec">推荐入坑顺序</h2><p class="lead">从上往下玩。第一部喜欢了再继续，不喜欢就及时止损。</p>' +
      '<ol class="steps">'+s.order.map(function(o,n){return '<li class="rv">'+(box(o)?'<a class="boxart" href="'+box(o).url+'" target="_blank" rel="noopener" title="图片来源：维基百科"><img src="'+box(o).file+'" alt="《'+o.t+'》封面" loading="lazy"></a>':'')+'<img class="shot" src="images/games/'+s.id+'-'+(n+1)+'.jpg" alt="'+o.t+'" loading="lazy" onerror="this.remove()"><h4>《'+o.t+'》</h4><div class="plat">平台：'+o.plat+'</div><p>'+o.why+'</p></li>'}).join("")+'</ol>' +
      '<div class="note rv"><b>小贴士：</b>'+s.tip+'</div>' +
      '<div class="note rv"><b>近况：</b>'+s.news+'</div>' +
      ((window.LINKS||{})[s.id] ? '<h2 class="sec">相关网站</h2><p class="lead">攻略、资料、工具与模组。均为第三方站点，模组请配合自己拥有的游戏使用。</p>'+links(window.LINKS[s.id]) : '') +
      '<div class="btns" style="margin-top:22px"><a class="btn pri" href="buy.html">怎么买正版 →</a><a class="btn" href="play.html">用自己的卡带在 PC 上玩 →</a></div>' +
      '<div class="pager"><a class="btn" href="series.html?id='+prev.id+'">← '+prev.zh+'</a><a class="btn" href="series.html?id='+next.id+'">'+next.zh+' →</a></div></div>';
  }

  if(page==="play"){
    $("#emus").innerHTML = (window.EMUS||[]).map(function(g){
      var pl=plat(g.plat);
      return '<section class="emu rv"><header>'+(g.plat?photo(g.plat):'<div class="hw"><span>🧰</span></div>')+'<div><h3>'+g.title+'</h3>'+(pl?'<small>'+pl.year+' 年</small>':'')+'</div></header>' +
        (g.warn?'<div class="note warn"><b>注意：</b>'+g.warn+'</div>':'') +
        (g.items.length?'<div class="emus">'+g.items.map(function(e){
          var inner='<b>'+e[0]+(e[1]?' ↗':'')+(e[4]?'<i>首选</i>':'')+'</b><small>'+e[2]+'</small><span>'+e[3]+'</span>';
          return e[1]?'<a class="em" href="'+e[1]+'" target="_blank" rel="noopener">'+inner+'</a>':'<div class="em">'+inner+'</div>';
        }).join("")+'</div>':'')+'</section>';
    }).join("");
    var n=0;
    $("#ports").innerHTML = (window.PORTS||[]).map(function(g){
      n+=g.items.length;
      return '<h3>'+g.group+'</h3><div class="tbl rv"><table><tr><th>游戏</th><th>原平台</th><th>项目</th><th>类型</th><th>说明</th></tr>'+g.items.map(function(p){
        return '<tr><td><b>'+p[0]+'</b></td><td>'+p[1]+'</td><td><a href="'+p[3]+'" target="_blank" rel="noopener">'+p[2]+' ↗</a></td><td><span class="tag'+(p[4].indexOf("重编译")>-1?' g':'')+'">'+p[4]+'</span></td><td>'+p[5]+'</td></tr>';
      }).join("")+'</table></div>';
    }).join("");
    $("#portcount").textContent = n;
    $("#porttools").innerHTML = links(window.PORT_TOOLS||[]);
  }

  // 滚动出现动画
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px"}) : null;
  function watch(){document.querySelectorAll(".rv:not(.in)").forEach(function(el){io?io.observe(el):el.classList.add("in")})}
  document.querySelectorAll(".box,.flow>div,.tbl,.page h2").forEach(function(el){el.classList.add("rv")});
  watch();
})();

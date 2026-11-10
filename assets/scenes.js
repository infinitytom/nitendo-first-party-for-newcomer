// 原创的矢量插画：每个系列一幅带动画的场景，全部由代码生成，不含任何官方美术素材。
(function(){
  var uid = 0;
  function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function sky(a,b,c){var id="g"+(++uid);return '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/>'+(c?'<stop offset=".55" stop-color="'+c+'"/>':'')+'<stop offset="1" stop-color="'+b+'"/></linearGradient></defs><rect width="400" height="250" fill="url(#'+id+')"/>'}
  function stars(r,n,col,maxY){var s="";for(var i=0;i<n;i++)s+='<circle class="tw" style="animation-delay:'+(r()*4).toFixed(2)+'s" cx="'+(r()*400).toFixed(1)+'" cy="'+(r()*(maxY||160)).toFixed(1)+'" r="'+(0.5+r()*1.4).toFixed(2)+'" fill="'+(col||"#fff")+'"/>';return s}
  function hills(r,y,amp,col,op){var d="M0 250 L0 "+y,x=0,py=y;while(x<400){var nx=x+50+r()*60,ny=y+(r()-.5)*amp*2;d+=" Q"+((x+nx)/2).toFixed(1)+" "+(Math.min(py,ny)-amp*r()).toFixed(1)+" "+nx.toFixed(1)+" "+ny.toFixed(1);x=nx;py=ny}return '<path d="'+d+' L400 250Z" fill="'+col+'"'+(op?' opacity="'+op+'"':'')+'/>'}
  function peaks(r,y,amp,col){var d="M0 250 L0 "+y,x=0;while(x<400){x+=22+r()*40;d+=" L"+x.toFixed(1)+" "+(y-r()*amp).toFixed(1);x+=20+r()*36;d+=" L"+x.toFixed(1)+" "+(y+r()*8).toFixed(1)}return '<path d="'+d+' L400 250Z" fill="'+col+'"/>'}
  function cloud(x,y,s,op,dur){return '<g class="drift" style="animation-duration:'+(dur||40)+'s" opacity="'+(op||.9)+'"><g transform="translate('+x+' '+y+') scale('+s+')" fill="#fff"><ellipse cx="0" cy="0" rx="26" ry="11"/><ellipse cx="-14" cy="-7" rx="13" ry="10"/><ellipse cx="6" cy="-11" rx="16" ry="13"/><ellipse cx="22" cy="-3" rx="12" ry="8"/></g></g>'}
  function sun(x,y,rad,col){return '<circle class="pulse" cx="'+x+'" cy="'+y+'" r="'+rad*2.1+'" fill="'+col+'" opacity=".18"/><circle cx="'+x+'" cy="'+y+'" r="'+rad*1.45+'" fill="'+col+'" opacity=".28"/><circle cx="'+x+'" cy="'+y+'" r="'+rad+'" fill="'+col+'"/>'}
  function star5(x,y,R,col,cls,delay){var p="";for(var i=0;i<10;i++){var a=Math.PI/5*i-Math.PI/2,rr=i%2?R*.45:R;p+=(x+Math.cos(a)*rr).toFixed(1)+","+(y+Math.sin(a)*rr).toFixed(1)+" "}return '<polygon class="'+(cls||"")+'" style="animation-delay:'+(delay||0)+'s" points="'+p+'" fill="'+col+'" stroke="'+col+'" stroke-width="3" stroke-linejoin="round"/>'}

  var S = {
    mario:function(r){var s=sky("#2f8ef5","#c9ecff");s+=sun(322,58,20,"#fff3a8")+cloud(40,60,1.2,.95,46)+cloud(210,38,.8,.85,60)+cloud(300,96,1,.9,52);
      s+=hills(r,170,16,"#7ad27f")+hills(r,196,14,"#3fae58")+hills(r,224,8,"#278a43");
      for(var i=0;i<5;i++)s+='<circle class="bob" style="animation-delay:'+(i*.35)+'s" cx="'+(90+i*34)+'" cy="'+(128-Math.sin(i/4*Math.PI)*34)+'" r="7" fill="#ffd23f" stroke="#e8a400" stroke-width="2"/>';return s},
    zelda:function(r){var s=sky("#ffe2a1","#9ad7b3","#ffd08c");s+=sun(292,112,26,"#fff6d6")+cloud(60,56,1,.7,70)+cloud(240,44,.7,.6,90);
      s+=peaks(r,168,74,"#7fae9a")+'<path d="M150 180 L205 62 L226 100 L246 84 L300 180Z" fill="#5c8f7c"/><path d="M205 62 L218 92 L204 86 L196 98Z" fill="#fff" opacity=".8"/>';
      s+=hills(r,186,12,"#3f8560")+hills(r,214,10,"#236a45")+hills(r,236,6,"#124a2e");
      for(var i=0;i<4;i++)s+='<path class="drift" style="animation-duration:'+(26+i*7)+'s" d="M'+(40+i*30)+' '+(70+i*9)+' q5 -6 10 0 q5 -6 10 0" fill="none" stroke="#3b5a4c" stroke-width="1.6" stroke-linecap="round"/>';return s},
    pokemon:function(r){var s=sky("#ffb238","#ffe98c","#ffd257");s+=sun(86,70,22,"#fffbe0")+cloud(250,54,1,.8,56);
      s+=hills(r,176,14,"#9bd65a")+hills(r,204,12,"#62b83c")+hills(r,230,8,"#3b9427");
      s+='<polygon class="flash" points="232,28 196,118 222,118 204,190 262,96 234,96 252,28" fill="#fff" stroke="#ffe14d" stroke-width="5" stroke-linejoin="round"/>';
      for(var i=0;i<9;i++)s+=star5(30+r()*340,30+r()*130,3+r()*4,"#fff","tw",r()*3);return s},
    mariokart:function(r){var s=sky("#1b6cf2","#8fe0ff");s+=cloud(50,50,1,.9,40)+cloud(290,66,.9,.85,52)+hills(r,150,14,"#59c7a0")+hills(r,160,10,"#2f9f77");
      s+='<rect y="158" width="400" height="92" fill="#3fae58"/><polygon points="168,158 232,158 400,250 0,250" fill="#3a3f4b"/><polygon points="168,158 176,158 40,250 0,250" fill="#fff" opacity=".9"/><polygon points="224,158 232,158 400,250 360,250" fill="#fff" opacity=".9"/>';
      s+='<line class="dash" x1="200" y1="160" x2="200" y2="250" stroke="#ffd23f" stroke-width="7" stroke-dasharray="16 14"/>';
      for(var i=0;i<20;i++)s+='<rect x="'+(i*20)+'" y="'+(i%2?0:10)+'" width="20" height="10" fill="#111" opacity=".85"/><rect x="'+(i*20)+'" y="'+(i%2?10:0)+'" width="20" height="10" fill="#fff" opacity=".9"/>';return s},
    smash:function(r){var id="g"+(++uid),s='<defs><radialGradient id="'+id+'"><stop offset="0" stop-color="#ff8a5c"/><stop offset=".5" stop-color="#d6336c"/><stop offset="1" stop-color="#2b1b6b"/></radialGradient></defs><rect width="400" height="250" fill="url(#'+id+')"/><g class="spin" style="transform-origin:200px 125px">';
      for(var i=0;i<14;i++){var a=i/14*Math.PI*2,b=a+.13;s+='<polygon points="200,125 '+(200+Math.cos(a)*420)+','+(125+Math.sin(a)*420)+' '+(200+Math.cos(b)*420)+','+(125+Math.sin(b)*420)+'" fill="#fff" opacity=".1"/>'}
      s+='</g><g class="pulse" style="transform-origin:200px 125px">';var p="";for(var j=0;j<24;j++){var a2=j/24*Math.PI*2,rr=j%2?44:86+r()*18;p+=(200+Math.cos(a2)*rr).toFixed(1)+","+(125+Math.sin(a2)*rr).toFixed(1)+" "}
      s+='<polygon points="'+p+'" fill="#ffd23f"/><circle cx="200" cy="125" r="34" fill="#fff"/></g>'+stars(r,26,"#fff",250);return s},
    animalcrossing:function(r){var s=sky("#8fe3dc","#e8fbf2");s+=sun(70,58,18,"#fff8c9")+cloud(180,50,1.1,.95,58)+cloud(320,84,.8,.9,70);
      s+='<rect y="150" width="400" height="100" fill="#39b3c7"/>';
      for(var i=0;i<5;i++)s+='<path class="wave" style="animation-delay:'+(i*.5)+'s" d="M-20 '+(168+i*17)+' q20 -7 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff" stroke-width="2" opacity=".45"/>';
      s+='<ellipse cx="210" cy="176" rx="120" ry="22" fill="#f4e0a6"/><path d="M110 172 Q210 96 310 172Z" fill="#59c26f"/><path d="M140 172 Q200 122 262 172Z" fill="#3fa85a"/>';
      s+='<g class="sway" style="transform-origin:262px 160px"><path d="M262 160 q6 -34 -2 -62" fill="none" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/><g fill="#2e9b4f"><path d="M260 98 q-34 -14 -52 8 q30 -8 52 -8Z"/><path d="M260 98 q34 -16 54 6 q-30 -8 -54 -6Z"/><path d="M260 98 q-18 -30 -44 -26 q26 6 44 26Z"/><path d="M260 98 q16 -32 44 -28 q-26 6 -44 28Z"/></g></g>';
      s+='<rect x="170" y="140" width="34" height="26" rx="3" fill="#fff5e0"/><polygon points="164,142 187,122 210,142" fill="#e86a5c"/>';return s},
    splatoon:function(r){var s='<rect width="400" height="250" fill="#221046"/>',cols=["#c6f432","#7b2ff7","#ff4fa3","#c6f432","#19d3c5","#7b2ff7"];
      for(var i=0;i<6;i++){var cx=40+i*64+r()*20,cy=50+r()*150,R=34+r()*30;s+='<g class="bob" style="animation-delay:'+(r()*3).toFixed(2)+'s;animation-duration:'+(4+r()*3).toFixed(1)+'s" fill="'+cols[i]+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+R+'"/>';
        for(var j=0;j<7;j++){var a=r()*Math.PI*2,d=R*(.8+r()*.7),rr=4+r()*12;s+='<circle cx="'+(cx+Math.cos(a)*d).toFixed(1)+'" cy="'+(cy+Math.sin(a)*d).toFixed(1)+'" r="'+rr.toFixed(1)+'"/>'}
        s+='<rect x="'+(cx-5)+'" y="'+cy+'" width="10" height="'+(R+20+r()*30)+'" rx="5"/></g>'}return s},
    kirby:function(r){var s=sky("#ff9cc8","#fff3bf","#ffc9de");s+=cloud(60,200,2.6,.95,80)+cloud(250,214,3,.95,95)+cloud(150,70,1.2,.8,60)+cloud(320,50,.9,.7,70);
      for(var i=0;i<9;i++)s+=star5(30+r()*340,26+r()*150,7+r()*12,i%3?"#ffe45c":"#fff","twspin",r()*4);return s},
    metroid:function(r){var s=sky("#040b14","#17404b","#0c2230");s+=stars(r,70,"#cfeeff",250);var id="g"+(++uid);
      s+='<defs><radialGradient id="'+id+'" cx=".35" cy=".3"><stop offset="0" stop-color="#ffb26b"/><stop offset=".6" stop-color="#e8622c"/><stop offset="1" stop-color="#6b1f12"/></radialGradient></defs>';
      s+='<ellipse cx="250" cy="120" rx="128" ry="24" fill="none" stroke="#7fe3d4" stroke-width="5" opacity=".35" transform="rotate(-16 250 120)"/><circle class="bob" style="animation-duration:9s" cx="250" cy="120" r="66" fill="url(#'+id+')"/><path d="M127 157 A128 24 -16 0 0 373 85" fill="none" stroke="#7fe3d4" stroke-width="5" opacity=".9" transform="rotate(0)"/>';
      s+='<circle cx="84" cy="64" r="12" fill="#9fb6c4"/><rect class="scan" width="400" height="3" fill="#7fe3d4" opacity=".35"/>'+peaks(r,236,26,"#02070c");return s},
    fireemblem:function(r){var s=sky("#16296b","#f0b46a","#7a5aa6");s+=sun(200,150,30,"#ffe6b0")+stars(r,30,"#fff",90)+hills(r,190,12,"#3a3470",.9);
      var c="#1a1838";s+='<g fill="'+c+'"><rect x="150" y="120" width="100" height="90"/><rect x="128" y="96" width="30" height="114"/><rect x="242" y="96" width="30" height="114"/><rect x="186" y="74" width="28" height="60"/>';
      [128,138,148,242,252,262].forEach(function(x){s+='<rect x="'+x+'" y="89" width="6" height="8"/>'});[186,197,208].forEach(function(x){s+='<rect x="'+x+'" y="67" width="6" height="8"/>'});
      for(var x=150;x<250;x+=12)s+='<rect x="'+x+'" y="113" width="7" height="8"/>';s+='</g><path d="M190 210 v-30 a10 10 0 0 1 20 0 v30Z" fill="#f0b46a" opacity=".85"/>';
      [[143,96,"#d8344a"],[257,96,"#2f6fe0"],[200,74,"#f2c14e"]].forEach(function(f,i){s+='<line x1="'+f[0]+'" y1="'+f[1]+'" x2="'+f[0]+'" y2="'+(f[1]-30)+'" stroke="'+c+'" stroke-width="2"/><path class="flag" style="animation-delay:'+i*.4+'s;transform-origin:'+f[0]+'px '+(f[1]-24)+'px" d="M'+f[0]+' '+(f[1]-30)+' q10 -4 20 2 q-10 5 -20 10Z" fill="'+f[2]+'"/>'});
      s+=hills(r,216,8,"#12102a");return s},
    xenoblade:function(r){var s=sky("#070f3a","#8a3f9c","#27277a");s+=stars(r,80,"#fff",190)+'<circle cx="300" cy="78" r="92" fill="#cfd8ff" opacity=".16"/><circle cx="300" cy="78" r="70" fill="#dfe6ff" opacity=".9"/><circle cx="278" cy="60" r="12" fill="#b9c4f2" opacity=".6"/><circle cx="322" cy="96" r="18" fill="#b9c4f2" opacity=".5"/>';
      for(var i=0;i<3;i++)s+='<path class="aurora" style="animation-delay:'+i*1.3+'s" d="M-20 '+(90+i*22)+' C80 '+(40+i*20)+' 160 '+(150+i*8)+' 260 '+(86+i*18)+' S 400 '+(70+i*20)+' 430 '+(120+i*14)+'" fill="none" stroke="'+["#5cf2c8","#7fb8ff","#ff7ad9"][i]+'" stroke-width="'+(14-i*3)+'" stroke-linecap="round" opacity=".28"/>';
      s+='<path d="M0 250 L0 150 L28 132 L52 150 L70 120 L96 168 L120 250Z" fill="#150f3a"/><path d="M400 250 L400 170 L372 150 L350 176 L330 160 L300 250Z" fill="#150f3a"/>'+hills(r,222,10,"#2a1856")+hills(r,238,6,"#0d0a26");return s},
    donkeykong:function(r){var s=sky("#ffd35c","#f07a2a","#ffab3d");s+=sun(200,128,40,"#fff3c4")+hills(r,196,14,"#7a4a16",.75);
      function leaf(x,y,rot,sc,col){return '<g class="sway" style="animation-delay:'+(r()*2).toFixed(2)+'s;transform-origin:'+x+'px '+y+'px"><g transform="translate('+x+' '+y+') rotate('+rot+') scale('+sc+')"><path d="M0 0 Q40 -34 110 -6 Q46 22 0 0Z" fill="'+col+'"/><path d="M0 0 Q50 -8 108 -6" fill="none" stroke="#0b3d1e" stroke-width="1.5" opacity=".5"/></g></g>'}
      s+=leaf(-6,40,20,1.5,"#1f7a3a")+leaf(-10,110,-8,1.3,"#17642e")+leaf(-8,180,-30,1.5,"#0f5226")+leaf(406,30,160,1.5,"#1f7a3a")+leaf(410,104,188,1.3,"#17642e")+leaf(408,176,210,1.5,"#0f5226");
      [70,150,250,330].forEach(function(x,i){s+='<path class="sway" style="animation-delay:'+i*.5+'s;transform-origin:'+x+'px 0px" d="M'+x+' 0 q'+(i%2?12:-12)+' '+(40+i*8)+' 0 '+(80+i*14)+'" fill="none" stroke="#2c5a1c" stroke-width="4" stroke-linecap="round"/>'});
      s+=hills(r,226,8,"#3c2208");return s},
    pikmin:function(r){var s=sky("#d9f5b8","#6dbb5a","#a8e08a");
      for(var i=0;i<16;i++)s+='<circle class="tw" style="animation-delay:'+(r()*4).toFixed(2)+'s;animation-duration:5s" cx="'+(r()*400).toFixed(0)+'" cy="'+(r()*170).toFixed(0)+'" r="'+(8+r()*22).toFixed(0)+'" fill="#fff" opacity=".22"/>';
      s+='<path d="M-20 250 Q60 90 190 150 Q90 170 40 250Z" fill="#3f9d48"/><path d="M420 250 Q360 70 220 130 Q330 160 350 250Z" fill="#2f8a3d"/>'+hills(r,214,8,"#6b4a2a")+hills(r,232,5,"#553820");
      for(var j=0;j<7;j++){var x=60+j*46+r()*14,h=30+r()*34,y=220+r()*6;s+='<g class="sway" style="animation-delay:'+(r()*2).toFixed(2)+'s;transform-origin:'+x+'px '+y+'px"><path d="M'+x+' '+y+' q4 -'+(h/2)+' 0 -'+h+'" fill="none" stroke="#e9ffd0" stroke-width="3" stroke-linecap="round"/><path d="M'+x+' '+(y-h)+' q14 -16 26 -4 q-14 8 -26 4Z" fill="#8fe06a"/><path d="M'+x+' '+(y-h)+' q-12 -14 -22 -2 q12 6 22 2Z" fill="#6fcf52"/></g>'}return s}
  };
  window.scene = function(id){
    var seed=0;for(var i=0;i<id.length;i++)seed=seed*31+id.charCodeAt(i)|0;
    var f=S[id]||S.mario;
    return '<svg class="scene" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+f(rng(seed))+'</svg>';
  };
})();

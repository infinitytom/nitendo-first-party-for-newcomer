// 主机平台、模拟器与原生移植项目数据。增删项目只需编辑这个文件。
// 平台照片由 tools/fetch_images.py 从 Wikimedia Commons 下载（自由许可），信息写入 assets/photos.js。
window.PLATFORMS = [
  {id:"fc",    name:"FC / NES",            year:1983, emoji:"🕹️", born:"马力欧、塞尔达、密特罗德、火焰纹章"},
  {id:"gb",    name:"Game Boy",            year:1989, emoji:"🔋", born:"宝可梦、星之卡比"},
  {id:"sfc",   name:"SFC / SNES",          year:1990, emoji:"🎛️", born:"马力欧卡丁车、星际火狐"},
  {id:"n64",   name:"Nintendo 64",         year:1996, emoji:"🧊", born:"大乱斗；3D 马力欧与 3D 塞尔达的起点"},
  {id:"gba",   name:"Game Boy Advance",    year:2001, emoji:"📟", born:"黄金太阳、瓦力欧制造"},
  {id:"gc",    name:"GameCube",            year:2001, emoji:"🟪", born:"皮克敏、路易吉洋馆；动森走向海外"},
  {id:"nds",   name:"Nintendo DS",         year:2004, emoji:"📖", born:"双屏与触摸屏的时代"},
  {id:"wii",   name:"Wii",                 year:2006, emoji:"🪄", born:"异度神剑、马力欧银河"},
  {id:"3ds",   name:"Nintendo 3DS",        year:2011, emoji:"👓", born:"火纹觉醒让系列重生"},
  {id:"wiiu",  name:"Wii U",               year:2012, emoji:"📺", born:"斯普拉遁、马力欧制造"},
  {id:"switch",name:"Nintendo Switch",     year:2017, emoji:"🎮", born:"旷野之息、奥德赛"},
  {id:"switch2",name:"Nintendo Switch 2",  year:2025, emoji:"✨", born:"马力欧卡丁车 世界、蕉力全开"}
];

// 各系列诞生的平台（用于系列页展示照片）
window.BORN = {mario:"fc",zelda:"fc",pokemon:"gb",mariokart:"sfc",smash:"n64",animalcrossing:"gc",splatoon:"wiiu",
  kirby:"gb",metroid:"fc",fireemblem:"fc",xenoblade:"wii",pikmin:"gc"};

// 模拟器：[名称, 官网/仓库（留空则不给链接）, 运行平台, 说明, 是否首选]
window.EMUS = [
  {plat:"fc", title:"FC / NES", items:[
    ["Mesen","https://www.mesen.ca","Win / Mac / Linux","精度最高的选择之一，同时支持 SFC、GB、GBA 等，调试工具强大。",1],
    ["FCEUX","https://fceux.com","Win / Mac / Linux","老牌模拟器，录像与 TAS 工具齐全。"],
    ["Nestopia UE","https://github.com/0ldsk00l/nestopia","Win / Mac / Linux","轻量、高兼容，适合低配设备。"],
    ["puNES","https://github.com/punesemu/puNES","Win / Linux","高精度，滤镜与着色器丰富。"]
  ]},
  {plat:"sfc", title:"SFC / SNES", items:[
    ["bsnes","https://github.com/bsnes-emu/bsnes","Win / Mac / Linux","周期级精确，内置 HD Mode 7，可让《马力欧卡丁车》《F-ZERO》的赛道高清化。",1],
    ["Snes9x","https://github.com/snes9xgit/snes9x","Win / Mac / Linux","速度快、兼容好，老电脑和掌机的首选。"],
    ["Mesen","https://www.mesen.ca","Win / Mac / Linux","同样提供高精度 SFC 核心。"],
    ["ares","https://ares-emu.net","Win / Mac / Linux","多系统高精度模拟器，bsnes 作者项目的延续。"]
  ]},
  {plat:"gb", title:"Game Boy / Game Boy Color", items:[
    ["SameBoy","https://sameboy.github.io","Win / Mac / Linux","GB / GBC 精度标杆，界面简洁。",1],
    ["mGBA","https://mgba.io","全平台","GB / GBC / GBA 一个程序通吃，支持联机交换与存档互通。",1],
    ["Gambatte","https://github.com/pokemon-speedrunning/gambatte-speedrun","Win / Mac / Linux","高精度核心，宝可梦速通社区的指定版本。"],
    ["BGB","https://bgb.bircd.org","Windows","调试器出色，支持通过网络模拟联机线。"]
  ]},
  {plat:"gba", title:"Game Boy Advance", items:[
    ["mGBA","https://mgba.io","全平台","事实上的标准，速度与精度兼顾，支持陀螺仪、太阳能传感器等特殊卡带。",1],
    ["SkyEmu","https://skyemu.app","Win / Mac / Linux / 移动端 / 网页","界面现代的高精度模拟器，同时支持 GB 与 NDS。"],
    ["NanoBoyAdvance","https://github.com/nba-emu/NanoBoyAdvance","Win / Mac / Linux","周期级精确，追求最高还原度。"],
    ["VBA-M","https://github.com/visualboyadvance-m/visualboyadvance-m","Win / Mac / Linux","经典 VisualBoyAdvance 的延续版本，金手指与联机功能齐全。"]
  ]},
  {plat:"n64", title:"Nintendo 64", items:[
    ["ares","https://ares-emu.net","Win / Mac / Linux","开箱即用的高精度 N64 模拟，无需折腾插件。",1],
    ["RMG（Rosalie's Mupen GUI）","https://github.com/Rosalie241/RMG","Win / Linux","基于 mupen64plus 的现代前端，配置简单、兼容性好。",1],
    ["gopher64","https://github.com/gopher64/gopher64","Win / Mac / Linux","Rust 编写的高精度模拟器，内置联机对战。"],
    ["simple64","https://simple64.github.io","Win / Linux","零配置的高精度方案，已停止新功能开发但仍可用。"],
    ["Project64","https://www.pj64-emu.com","Windows","历史最久的 N64 模拟器，金手指和旧插件生态丰富。"],
    ["Mupen64Plus-Next（RetroArch 核心）","https://www.retroarch.com","全平台","掌机和手机上最常用的 N64 方案。"]
  ]},
  {plat:"nds", title:"Nintendo DS / DSi", items:[
    ["melonDS","https://melonds.kuribo64.net","Win / Mac / Linux","高精度，支持提高 3D 分辨率、本地无线联机与 DSi 模式。",1],
    ["DeSmuME","https://desmume.org","Win / Mac / Linux","老牌模拟器，金手指、录像与调试功能丰富。"],
    ["NooDS","https://github.com/Hydr8gon/NooDS","全平台","轻量，移植平台多。"],
    ["SkyEmu","https://skyemu.app","全平台 / 网页","同时支持 GBA 与 NDS 的现代界面模拟器。"]
  ]},
  {plat:"3ds", title:"Nintendo 3DS", items:[
    ["Azahar","https://azahar-emu.org","Win / Mac / Linux / Android","Citra 停更后由 Lime3DS 与 PabloMK7 分支合并而成的继任者，目前的首选。",1],
    ["Panda3DS","https://panda3ds.com","Win / Mac / Linux / Android","从零编写的新模拟器，兼容性持续提升。"],
    ["Mikage","https://mikage.app","Win / Linux / Android","偏底层模拟（LLE）的项目，仍在开发中。"]
  ]},
  {plat:"gc", title:"GameCube / Wii", items:[
    ["Dolphin","https://dolphin-emu.org","Win / Mac / Linux / Android","最成熟的模拟器之一：4K、宽屏补丁、高清材质包、联机（Netplay）。官网有逐个游戏的兼容性列表。",1],
    ["PrimeHack","https://github.com/shiiion/dolphin","Windows / Linux","Dolphin 的分支，为《密特罗德 Prime 三部曲》提供键鼠 FPS 操作。"],
    ["Slippi","https://slippi.gg","Win / Mac / Linux","为《大乱斗 DX》打造的 Dolphin 分支，提供回滚网络对战与录像。"]
  ]},
  {plat:"wiiu", title:"Wii U", items:[
    ["Cemu","https://cemu.info","Win / Mac / Linux","开源、成熟。《旷野之息》《马力欧卡丁车 8》《异度神剑 X》均可高分辨率高帧率运行。",1]
  ]},
  {plat:"switch", title:"Nintendo Switch", items:[
    ["Eden","","Win / Linux / Mac / Android","Yuzu 系社区分支，目前更新最活跃的项目之一。"],
    ["Ryubing","","Win / Linux / Mac","Ryujinx 停更后的社区延续版，偏重精度与稳定性。"],
    ["Citron","","Win / Linux / Android","另一个 Yuzu 系分支。"],
    ["Sudachi / Suyu / Kenji-NX","","—","其他分支，开发放缓或已停滞。"],
    ["MeloNX","","iOS / iPadOS","Ryujinx 系的 iOS 移植，需要开启 JIT。"]
  ], warn:"Yuzu（2024 年 3 月和解关闭）与 Ryujinx（2024 年 10 月停止开发）均已终止；现存项目都是社区分支，2026 年 2 月又有十余个项目收到任天堂的下架通知。状态变化很快，本站不提供这些项目的下载地址，请自行甄别官方渠道，谨防仿冒站。"},
  {plat:"switch2", title:"Nintendo Switch 2", items:[], warn:"目前没有可玩的 Switch 2 模拟器。任何声称能下载「Switch 2 模拟器」的网站都应视为骗局或恶意软件。"},
  {plat:"", title:"其他平台与多合一", items:[
    ["RetroArch","https://www.retroarch.com","全平台","把各老平台的模拟核心整合进同一界面，掌机、手机、客厅电脑的通用方案。",1],
    ["BizHawk","https://tasvideos.org/BizHawk","Win / Linux","多系统模拟器，为录制 TAS 和速通练习而生。"],
    ["MAME","https://www.mamedev.org","Win / Mac / Linux","街机模拟器，初代《Donkey Kong》《Mario Bros.》街机版在这里运行。"],
    ["Mednafen","https://mednafen.github.io","Win / Linux","多系统高精度模拟器，Virtual Boy 的首选核心。"],
    ["Delta","https://deltaemulator.com","iOS / iPadOS","App Store 上架的任天堂掌机与老主机模拟器合集。"],
    ["Lemuroid","https://github.com/Swordfish90/Lemuroid","Android","开源、无广告的安卓多合一前端。"],
    ["EmuDeck","https://www.emudeck.com","Steam Deck / Windows 掌机","一键安装并配置好各平台模拟器。"],
    ["RetroDECK","https://retrodeck.net","Steam Deck / Linux","打包成单个应用的一体化模拟方案。"],
    ["ES-DE","https://es-de.org","Win / Mac / Linux / Android","游戏库前端，用封面墙统一管理所有平台的游戏。"],
    ["MiSTer FPGA","https://github.com/MiSTer-devel/Wiki_MiSTer/wiki","专用硬件","用 FPGA 在电路层面重现 FC、SFC、GB、GBA、N64 等主机，延迟极低。"]
  ]}
];

// 原生移植：[游戏, 原平台, 项目名, 链接, 类型, 说明]
window.PORTS = [
  {group:"超级马力欧", items:[
    ["超级马力欧 64","N64","Ghostship","https://github.com/HarbourMasters/Ghostship","反编译移植","Harbour Masters 出品，解压后选择自己的 ROM 即可，内置模组支持。"],
    ["超级马力欧 64","N64","sm64ex","https://github.com/sm64pc/sm64ex","反编译移植","最早的 PC 移植之一，模组生态最丰富；可用 sm64pcbuilder2 图形化编译。"],
    ["超级马力欧 64","N64","sm64coopdx","https://sm64coopdx.com/","反编译移植 · 联机","多人联机合作版，自带模组库。"],
    ["超级马力欧 64","N64","sm64rt","https://github.com/DarioSamo/sm64rt","反编译移植 · 光追","加入实时光线追踪的实验版本。"],
    ["超级马力欧世界 / 全明星合集","SFC","SMAS Launcher（基于 smw）","https://github.com/qurious-pixel/SMAS_Launcher","逆向重写","用 C 语言重新实现原版逻辑，支持宽屏。"],
    ["马力欧卡丁车 64","N64","SpaghettiKart","https://github.com/HarbourMasters/SpaghettiKart","反编译移植","高帧率、自带赛道编辑器。"],
    ["马力欧卡丁车 64","N64","MarioKart64Recomp","https://github.com/sonicdcer/MarioKart64Recomp","静态重编译","另一种路线，支持模组。"],
    ["纸片马力欧","N64","PaperBoat","https://github.com/HarbourMasters/PaperBoat","反编译移植","基于完整反编译的源码移植。"],
    ["马力欧医生 64","N64","Dr. Mario 64 Recomp Plus","https://github.com/theboy181/drmario64_recomp_plus","静态重编译","四人手柄支持、高帧率插值。"],
    ["马力欧足球 激情四射","Wii","strikers","https://github.com/new-coke/strikers","移植 / 重编译","Wii 平台的早期项目，仍在开发。"]
  ]},
  {group:"塞尔达传说", items:[
    ["时之笛","N64","Ship of Harkinian","https://github.com/HarbourMasters/Shipwright","反编译移植","最成熟的项目：60 帧、自由视角、随机迷宫（Randomizer）、大量便利功能。"],
    ["魔吉拉的面具","N64","Zelda 64: Recompiled","https://github.com/Mr-Wiseguy/Zelda64Recomp","静态重编译","上手最简单，拖入 ROM 即玩；超宽屏、高帧率、陀螺仪瞄准。"],
    ["魔吉拉的面具","N64","2 Ship 2 Harkinian","https://github.com/HarbourMasters/2ship2harkinian","反编译移植","与 Ship of Harkinian 同团队，功能与模组更丰富。"],
    ["众神的三角力量","SFC","Zelda 3 Launcher（基于 zelda3）","https://github.com/RadzPrower/Zelda-3-Launcher","逆向重写","宽屏、道具快捷切换、高清材质支持。"],
    ["缩小帽","GBA","auto-tmc（基于 tmc）","https://github.com/StonedModder/auto-tmc","反编译移植","自动化安装器。"],
    ["风之杖","GameCube","BlueWake","https://github.com/chrissotraidis/bluewake","静态重编译","首批 GameCube 静态重编译之一，需美版 Rev 0 镜像。"],
    ["风之杖 HD","Wii U","ZeldaWWHDRecomp","https://github.com/ZeldaWWHDRecomp/ZeldaWWHDRecomp","静态重编译","Wii U 版的原生重编译，内置模组管理器，支持安卓。"],
    ["黄昏公主","GameCube","dusk","https://github.com/TwilitRealm/dusk","反编译移植","基于 2025 年底完成的反编译工程。"]
  ]},
  {group:"其他任天堂系列", items:[
    ["任天堂明星大乱斗（初代）","N64","BattleShip","https://github.com/JRickey/BattleShip","反编译移植","测试阶段。"],
    ["星际火狐 64","N64","Starship","https://github.com/HarbourMasters/starship","反编译移植","已发布 1.0 正式版，支持模组。"],
    ["星际火狐 大冒险","GameCube","FoxHollow","https://foxhollow.dev/","反编译移植","基于完整反编译，支持 Win / Linux / macOS。"],
    ["超级密特罗德","SFC","Super Metroid Launcher（基于 sm）","https://github.com/RadzPrower/Super-Metroid-Launcher","逆向重写","宽屏与材质支持。"],
    ["咚奇刚 64","N64","Donkey Kong 64: Recompiled","https://github.com/Rainchus/Donkey-Kong-64-Recompiled","静态重编译","即开即玩，高帧率，支持 Steam Deck。"],
    ["动物森友会（初代）","GameCube","ACGC-PC-Port","https://github.com/flyngmt/ACGC-PC-Port","反编译移植","GameCube 版动森的 PC 移植。"],
    ["宝可梦随乐拍","N64","Snap64Recomp","https://github.com/JackandBeans/Snap64Recomp","静态重编译","解压后提供 ROM 即可。"],
    ["黄金太阳","GBA","GSRecomp","https://github.com/Shmargus/GSRecomp","静态重编译","GBA 平台的静态重编译，公开测试阶段。"]
  ]},
  {group:"N64 时代的 Rare 名作（当年由任天堂发行或独占）", items:[
    ["班卓熊大冒险","N64","BanjoRecomp","https://github.com/BanjoRecomp/BanjoRecomp","静态重编译","图形化安装，支持模组。"],
    ["班卓熊大冒险","N64","Lighthouse","https://github.com/HarbourMasters/Lighthouse","反编译移植","内置联机与随机器。"],
    ["班卓熊大冒险 2","N64","Banjo-Tooie: Recompiled","https://github.com/Vidanox/BanjoTooieRecompiled","静态重编译","可完整通关，宽屏高刷。"],
    ["完美黑暗","N64","Perfect Dark port","https://github.com/fgsfdsfgs/perfect_dark","反编译移植","键鼠操作、60 帧，完成度很高。"],
    ["恐龙星球（未发售原型）","N64","Dinosaur Planet: Recompiled","https://github.com/DinosaurPlanetRecomp/dino-recomp","静态重编译","《星际火狐 大冒险》前身的原型版本。"]
  ]},
  {group:"其他 N64 第三方游戏", items:[
    ["炸弹人 64 / 炸弹人英雄","N64","BM64Recomp / BMHeroRecomp","https://github.com/RevoSucks/BM64Recomp","静态重编译",""],
    ["洛克人 64","N64","MegaMan64Recompiled","https://github.com/MegaMan64Recomp/MegaMan64Recompiled","静态重编译",""],
    ["大盗伍佑卫门","N64","Goemon64Recomp","https://github.com/klorfmorf/Goemon64Recomp","静态重编译",""],
    ["Quest 64","N64","Quest64-Recomp","https://github.com/Rainchus/Quest64-Recomp","静态重编译",""],
    ["Snowboard Kids 2","N64","snowboardkids2-recomp","https://github.com/cdlewis/snowboardkids2-recomp","静态重编译",""],
    ["Rocket: Robot on Wheels","N64","Rocket-R","https://github.com/ThatGuyMcd/Rocket-R","静态重编译",""],
    ["Chameleon Twist","N64","Chameleon Twist: Recompiled","https://github.com/Rainchus/ChameleonTwist1-JP-Recomp","静态重编译",""],
    ["Space Station Silicon Valley","N64","SSSV_Recomp","https://github.com/Cellenseres/SSSV_Recomp","静态重编译",""],
    ["Duke Nukem: Zero Hour","N64","DNZHRecomp","https://github.com/sonicdcer/DNZHRecomp","静态重编译",""]
  ]}
];

// 工具链与导航：[名称, 链接, 类别, 说明]
window.PORT_TOOLS = [
  ["N64: Recompiled","https://github.com/N64Recomp/N64Recomp","工具","把 N64 游戏机器码静态翻译为 C 代码的工具，绝大多数 N64 重编译项目的基础。"],
  ["RT64","https://github.com/rt64/rt64","工具","配套的现代渲染器：高分辨率、超宽屏、高帧率插值。"],
  ["libultraship","https://github.com/Kenix3/libultraship","工具","Harbour Masters 系列移植（Ship of Harkinian 等）共用的底层框架。"],
  ["Quiver Launcher","https://quiverlauncher.com/","工具","开源启动器：检索、安装并更新各种社区移植项目。"],
  ["awesome-unofficial-pc-ports","https://github.com/Sebastrion/awesome-unofficial-pc-ports","资料","社区维护的原生移植项目总表，本页清单以它为底整理。"],
  ["decomp.dev","https://decomp.dev","资料","各游戏反编译进度看板，可以看到下一批可能被移植的作品。"],
  ["zeldaret","https://github.com/zeldaret","资料","塞尔达系列反编译工程的大本营。"],
  ["pret","https://github.com/pret","资料","宝可梦系列各代的反汇编/反编译工程（用于研究与改版，没有 PC 移植）。"]
];

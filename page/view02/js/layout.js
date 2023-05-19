// JavaScript Document

$("nav .menu > a").hover(
    function(){
        $('nav').addClass("on");
    },
);
$("nav .menu-inner").mouseleave(function(){
    $('nav').removeClass("on");
});


$("nav .menu > a").hover(
    function(){
        $('.menu').addClass("on")
    });

$("nav .menu-inner").mouseleave(
    function(){
        $('.menu').removeClass("on")
    });


(function() { 
    let yOffset = 0; // javascript의 스크롤탑 window.pageYoffset대신 쓸 값
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 있는 스크롤 높이
    let currentScene = 0; // 현재 씬
    let enterNewScene = false; // 새로운 씬이 시작되면  true

    //  여기서부터는 나중에 표기 
    let acc = 0.2; 
    let delayedYOffset = 0;
    let rafId;
    let rafState;	


    let section01_Point = [
        [0.01, 0.04], //회색배경 나옴. 유지
        [0.04, 0.1], //타이틀 나오는 구간
        [0.12, 0.15], //타이틀 사라지는 구간

        [0.16, 0.28], //l-side01 나오는 구간
        [0.18, 0.28], //mainimg01 나오는 구간
        [0.2, 0.28], //mainimg01 나오는 구간
        [0.30, 0.36], //best01 사라지는 구간 

        [0.36, 0.48], //l-side02 나오는 구간
        [0.38, 0.48], //mainimg02 나오는 구간
        [0.4, 0.48], //mainimg02 나오는 구간
        [0.50, 0.56], //best02 사라지는 구간 

        [0.56, 0.68], //l-side03 나오는 구간
        [0.58, 0.68], //mainimg03 나오는 구간
        [0.6, 0.68], //mainimg03 나오는 구간
        [0.70, 0.76], //best03 사라지는 구간 

        [0.76, 0.88], //l-side04 나오는 구간
        [0.78, 0.88], //mainimg04 나오는 구간
        [0.8, 0.88], //mainimg04 나오는 구간
        [0.90, 0.96], //best04 사라지는 구간 
    ];
    const sceneInfo = [
        { 
            //색션 00
            type : 'sticky',
            heightNum : 4,
            scrollHeight : 0,
            objs : { 				
                container : document.querySelector("#scroll-section-0"),
                menuli01 : document.querySelectorAll("#scroll-section-0 .maintxt > ul > li")[0],
                menuli02 : document.querySelectorAll("#scroll-section-0 .maintxt > ul > li")[1],
                menuli03 : document.querySelectorAll("#scroll-section-0 .maintxt > ul > li")[2],
                sec00Bg : document.querySelector("#scroll-section-0 .blackbg"),
                bgimg : document.querySelector("#scroll-section-0 .bg"),


            },
            values : {
                menuli01opacity: [1,0, {start: 0.05, end: 0.17}],	
                menuli01translateY: [0,-300, {start: 0.05, end: 0.17}],

                menuli02opacity: [1,0, {start: 0.12, end: 0.24}],	
                menuli02translateY: [0,-600, {start: 0.12, end: 0.24}],
                
                menuli03opacity: [1,0, {start: 0.19, end: 0.29}],	
                menuli03translateY: [-40,-800, {start: 0.19, end: 0.29}],

                sec00Bgopacity: [1,0, {start: 0.25, end: 0.37}],
                
                bgimgtranslateX: [0,-151, {start: 0.35, end: 0.6}],
                bgimgopcityout: [1,0, {start: 0.6, end: 0.9}],
            }
        },
        { 
            //색션 01
            type : 'sticky',
            heightNum : 13,
            scrollHeight : 0,
            objs : { 				
                container : document.querySelector("#scroll-section-1"),
                graybg : document.querySelector("#scroll-section-1 .g-bg"),
                tit : document.querySelector("#scroll-section-1 .tit"),

                lside01 : document.querySelectorAll("#scroll-section-1 .best")[0].querySelector(".l-side"),
                mainimg01 : document.querySelectorAll("#scroll-section-1 .best")[0].querySelector(".r-side .mainimg"),
                subimg01 : document.querySelectorAll("#scroll-section-1 .best")[0].querySelector(".r-side .subimg"),

                lside02 : document.querySelectorAll("#scroll-section-1 .best")[1].querySelector(".l-side"),
                mainimg02 : document.querySelectorAll("#scroll-section-1 .best")[1].querySelector(".r-side .mainimg"),
                subimg02 : document.querySelectorAll("#scroll-section-1 .best")[1].querySelector(".r-side .subimg"),

                lside03 : document.querySelectorAll("#scroll-section-1 .best")[2].querySelector(".l-side"),
                mainimg03 : document.querySelectorAll("#scroll-section-1 .best")[2].querySelector(".r-side .mainimg"),
                subimg03 : document.querySelectorAll("#scroll-section-1 .best")[2].querySelector(".r-side .subimg"),

                lside04 : document.querySelectorAll("#scroll-section-1 .best")[3].querySelector(".l-side"),
                mainimg04 : document.querySelectorAll("#scroll-section-1 .best")[3].querySelector(".r-side .mainimg"),
                subimg04 : document.querySelectorAll("#scroll-section-1 .best")[3].querySelector(".r-side .subimg"),


       
            },
            values : {
                graybgopacity : [0,1, {start: section01_Point[0][0], end: section01_Point[0][1]}],	
                graybgtranslateY : [60,0, {start: section01_Point[0][0], end: section01_Point[0][1]}],
                graybgopacityout : [1,0, {start: section01_Point[18][0], end: section01_Point[18][1]}],	
                graybgtranslateYout : [0,-60, {start: section01_Point[18][0], end: section01_Point[18][1]}],	

                titopacity: [0,1, {start: section01_Point[1][0], end: section01_Point[1][1]}],
                tittranslateY: [50,0, {start: section01_Point[1][0], end:  section01_Point[1][1]}],
                titopacityout: [1,0, {start: section01_Point[2][0], end: section01_Point[2][1]}],
                tittranslateYout: [0,-50, {start: section01_Point[2][0], end: section01_Point[2][1]}],

                // 베스트01
                lside01opacity: [0,1, {start:section01_Point[3][0], end: section01_Point[3][1]}],
                lside01translateY: [50,0, {start: section01_Point[3][0], end: section01_Point[3][1]}],
                lside01opacityout: [1,0, {start:section01_Point[6][0], end: section01_Point[6][1]}],
                lside01translateYout: [0,-50, {start:section01_Point[6][0], end: section01_Point[6][1]}],

                mainimg01opacity: [0,1, {start: section01_Point[4][0], end: section01_Point[4][1]}],
                mainimg01translateY: [50,0, {start:section01_Point[4][0], end:section01_Point[4][1]}],
                mainimg01opacityout: [1,0, {start:section01_Point[6][0], end: section01_Point[6][1]}],
                mainimg01translateYout: [0,-50, {start: section01_Point[6][0], end:section01_Point[6][1]}],

                subimg01opacity: [0,1, {start:section01_Point[5][0], end: section01_Point[5][1]}],
                subimg01translateY: [50,0, {start: section01_Point[5][0], end:section01_Point[5][1]}],
                subimg01opacityout: [1,0, {start:section01_Point[6][0], end: section01_Point[6][1]}],
                subimg01translateYout: [0,-50, {start:section01_Point[6][0], end: section01_Point[6][1]}],

                // 베스트02
                lside02opacity: [0,1, {start:section01_Point[7][0], end: section01_Point[7][1]}],
                lside02translateY: [50,0, {start: section01_Point[7][0], end: section01_Point[7][1]}],
                lside02opacityout: [1,0, {start: section01_Point[10][0], end: section01_Point[10][1]}],
                lside02translateYout: [0,-50, {start:section01_Point[10][0], end: section01_Point[10][1]}],

                mainimg02opacity: [0,1, {start: section01_Point[8][0], end: section01_Point[8][1]}],
                mainimg02translateY: [50,0, {start:section01_Point[8][0], end:section01_Point[8][1]}],
                mainimg02opacityout: [1,0, {start: section01_Point[10][0], end:section01_Point[10][1]}],
                mainimg02translateYout: [0,-50, {start: section01_Point[10][0], end: section01_Point[10][1]}],

                subimg02opacity: [0,1, {start:section01_Point[9][0], end: section01_Point[9][1]}],
                subimg02translateY: [50,0, {start: section01_Point[9][0], end:section01_Point[9][1]}],
                subimg02opacityout: [1,0, {start: section01_Point[10][0], end: section01_Point[10][1]}],
                subimg02translateYout: [0,-50, {start: section01_Point[10][0], end: section01_Point[10][1]}],

                // 베스트03
                lside03opacity: [0,1, {start:section01_Point[11][0], end: section01_Point[11][1]}],
                lside03translateY: [50,0, {start: section01_Point[11][0], end: section01_Point[11][1]}],
                lside03opacityout: [1,0, {start: section01_Point[14][0], end: section01_Point[14][1]}],
                lside03translateYout: [0,-50, {start:section01_Point[14][0], end: section01_Point[14][1]}],

                mainimg03opacity: [0,1, {start: section01_Point[12][0], end: section01_Point[12][1]}],
                mainimg03translateY: [50,0, {start:section01_Point[12][0], end:section01_Point[12][1]}],
                mainimg03opacityout: [1,0, {start: section01_Point[14][0], end:section01_Point[14][1]}],
                mainimg03translateYout: [0,-50, {start: section01_Point[14][0], end: section01_Point[14][1]}],

                subimg03opacity: [0,1, {start:section01_Point[13][0], end: section01_Point[13][1]}],
                subimg03translateY: [50,0, {start: section01_Point[13][0], end:section01_Point[13][1]}],
                subimg03opacityout: [1,0, {start: section01_Point[14][0], end: section01_Point[14][1]}],
                subimg03translateYout: [0,-50, {start: section01_Point[14][0], end: section01_Point[14][1]}],

                // 베스트04
                lside04opacity: [0,1, {start:section01_Point[15][0], end: section01_Point[15][1]}],
                lside04translateY: [50,0, {start: section01_Point[15][0], end: section01_Point[15][1]}],
                lside04opacityout: [1,0, {start: section01_Point[18][0], end: section01_Point[18][1]}],
                lside04translateYout: [0,-50, {start:section01_Point[18][0], end: section01_Point[18][1]}],

                mainimg04opacity: [0,1, {start: section01_Point[16][0], end: section01_Point[16][1]}],
                mainimg04translateY: [50,0, {start:section01_Point[16][0], end:section01_Point[16][1]}],
                mainimg04opacityout: [1,0, {start: section01_Point[18][0], end:section01_Point[18][1]}],
                mainimg04translateYout: [0,-50, {start: section01_Point[18][0], end: section01_Point[18][1]}],

                subimg04opacity: [0,1, {start:section01_Point[17][0], end: section01_Point[17][1]}],
                subimg04translateY: [50,0, {start: section01_Point[17][0], end:section01_Point[17][1]}],
                subimg04opacityout: [1,0, {start: section01_Point[18][0], end: section01_Point[18][1]}],
                subimg04translateYout: [0,-50, {start: section01_Point[18][0], end: section01_Point[18][1]}],

            }
        },
        { 
            //색션 02
            type : 'sticky',
            heightNum : 5,
            scrollHeight : 0,
            objs : { 				
                container : document.querySelector("#scroll-section-2"),
                tit2 : document.querySelector("#scroll-section-2 .tit"),
                new : document.querySelector("#scroll-section-2 .newwrap"),
                

            },
            values : {
                tit2opacity: [0,1, {start: 0.02, end:0.2}],
                tit2translateY: [50,0, {start: 0.02, end: 0.2}],
                tit2opacityout: [1,0, {start: 0.22, end: 0.3}],
                tit2translateYout: [0,-50, {start: 0.22, end: 0.3}],

                newopacity : [0,1, {start: 0.3, end:0.4}],
                newtranslateY: [50,0, {start: 0.3, end: 0.4}],
                newtranslateX: [0,-90, {start: 0.42, end: 0.85}],
                newopacityout: [1,0, {start: 0.87, end: 0.95}],
                newtranslateYout: [0,-50, {start: 0.87, end: 0.99}],

            }
        },
        { 
            //색션 03
            type : 'sticky',
            heightNum : 5,
            scrollHeight : 0,
            objs : { 				
                container : document.querySelector("#scroll-section-3"),
                banner : document.querySelector("#scroll-section-3 .banner"),
                promotion01 : document.querySelectorAll("#scroll-section-3 .promotionwrap .promotion")[0],
                promotion02 : document.querySelectorAll("#scroll-section-3 .promotionwrap .promotion")[1],
                promotion03 : document.querySelectorAll("#scroll-section-3 .promotionwrap .promotion")[2],
                promotion : document.querySelector("#scroll-section-3 .promotionwrap"),
            },
            values : {
                banneropacity: [0,1, {start: 0.02, end:0.3}],
                bannertranslateY: [50,0, {start: 0.02, end: 0.3}],
                banneropacityout: [1,0, {start: 0.4, end: 0.5}],
                bannertranslateYout: [0,-50, {start: 0.4, end: 0.5}],

                promotion01opacity: [0,1, {start: 0.55, end:0.7}],
                promotion01translateY: [50,0, {start: 0.55, end:0.7}],

                promotion02opacity: [0,1, {start: 0.58, end:0.7}],
                promotion02translateY: [50,0, {start: 0.58, end:0.7}],

                promotion03opacity: [0,1, {start: 0.61, end:0.7}],
                promotion03translateY: [50,0, {start: 0.61, end:0.7}],

                promotionopacityout : [1,0, {start: 0.75, end:0.95}],
                promotiontranslateYout : [0,-50, {start: 0.75, end:0.95}],

            }
        },

        { 
            //색션 04
            type : 'normal',
            heightNum : 5,
            scrollHeight : 0,
            objs : { 				
                container : document.querySelector("#scroll-section-4"),
      
            },
            values : {
               
            }
        },

];	




    // 레이아웃 설정
    function setLayout() { 		
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
            } else if (sceneInfo[i].type === 'normal')  {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            
        }


        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for(let i = 0; i < sceneInfo.length; i++) { 
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight > yOffset) { 
               currentScene = i;			   	
               break;							   
            }			
        }


        fstScrollTop = document.querySelector('html').scrollTop;

        if(fstScrollTop == 0) { 
            document.querySelectorAll("#scroll-section-0 .maintxt > ul > li")[0].setAttribute("style", "opacity : 1");
            document.querySelectorAll("#scroll-section-0 .maintxt > ul > li")[1].setAttribute("style", "opacity : 1");
            document.querySelectorAll("#scroll-section-0 .maintxt > ul > li")[2].setAttribute("style", "opacity : 1");
        }


        document.body.setAttribute('id', `show-scene-${currentScene}`);
                    
    }

    function calcValues(values, currentYOffset) { 
        let rv;
        //현재씬에서 스크롤된 비율 구하기
        //console.log(values);	
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;					 		
        if(values.length == 3) { 
           //start ~ end 사이 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) { 
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if(currentYOffset < partScrollStart) { 
                rv = values[0];
            } else if(currentYOffset > partScrollEnd) { 
                rv = values[1];
            }

        } else { 
            rv = scrollRatio * (values[1] - values[0]) + values[0];	   
        }


        return rv;
    }

    function totalCalcValue(values, yOffset) { 
        let rv;

        const totalScrollHeight = sceneInfo[0].scrollHeight;
        const totalScrollRatio = yOffset / totalScrollHeight;

        //console.log("totalScrollRatio ===", totalScrollRatio);


        return rv;
    }


    function playAnimation() { 
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight; //yOffset / 현재 씬의 scrollHeight;	

        const totalScrollHeight = sceneInfo[0].scrollHeight;
        const totalScrollRatio = yOffset / totalScrollHeight;

        //const scene01_values = sceneInfo[1].values;
                    
        let txt2_translateY = totalCalcValue(sceneInfo[0].values.txt2_translateY, yOffset);


    

        switch(currentScene) { 
            case 0 : 	
                console.log(scrollRatio)
                let menuli01opacity = calcValues(values.menuli01opacity, currentYOffset);
                let menuli01translateY = calcValues(values.menuli01translateY, currentYOffset);

                let menuli02opacity = calcValues(values.menuli02opacity, currentYOffset);
                let menuli02translateY = calcValues(values.menuli02translateY, currentYOffset);
                
                let menuli03opacity = calcValues(values.menuli03opacity, currentYOffset);
                let menuli03translateY = calcValues(values.menuli03translateY, currentYOffset);

                let sec00Bgopacity = calcValues(values.sec00Bgopacity, currentYOffset);

                let bgimgtranslateX = calcValues(values.bgimgtranslateX, currentYOffset);
                
                let bgimgopcityout = calcValues(values.bgimgopcityout, currentYOffset);


                objs.menuli01.setAttribute("style", 'opacity : ' + menuli01opacity + '; transform : translateY(' + menuli01translateY + 'px)');


                sceneInfo[1].objs.tit.setAttribute("style", "opacity : 0");
                sceneInfo[1].objs.graybg.setAttribute("style", "opacity : 0");

                //console.log("메뉴3의 오파싵 ===", menuli03opacity);
                if(scrollRatio <= 0.05) { 
                    
                } else { 
                    
                };

                    objs.menuli02.setAttribute("style", 'opacity : ' + menuli02opacity + '; transform : translateY(' + menuli02translateY + 'px)');
             
                    objs.menuli03.setAttribute("style", 'opacity : ' + menuli03opacity + '; transform : translateY(' + menuli03translateY + 'px)');
                

                if(scrollRatio <= 0.37) { 
                    objs.sec00Bg.setAttribute("style", 'opacity : ' + sec00Bgopacity + ';');
                } else { 
                    objs.sec00Bg.setAttribute("style", 'opacity : ' + sec00Bgopacity + ';');
                }


                if(scrollRatio <= 0.95) { 
                    objs.bgimg.setAttribute("style", 'opacity : ' + bgimgopcityout + '; transform : translateX(' + bgimgtranslateX + '%)');
                }

                break;

            case 1 : 
                console.log(scrollRatio);

       
                sceneInfo[2].objs.tit2.setAttribute("style", 'opacity : 0; transform : translateY(50px)');
                

                let graybgopacity = calcValues(values.graybgopacity, currentYOffset);
                let graybgtranslateY = calcValues(values.graybgtranslateY, currentYOffset);
                let graybgopacityout = calcValues(values.graybgopacityout, currentYOffset);
                let graybgtranslateYout = calcValues(values.graybgtranslateYout, currentYOffset);

                let titopacity = calcValues(values.titopacity, currentYOffset);
                let tittranslateY = calcValues(values.tittranslateY, currentYOffset);
                let titopacityout = calcValues(values.titopacityout, currentYOffset);
                let tittranslateYout = calcValues(values.tittranslateYout, currentYOffset);
                
                //best01
                let lside01opacity = calcValues(values.lside01opacity, currentYOffset);
                let lside01translateY = calcValues(values.lside01translateY, currentYOffset);
                let lside01opacityout = calcValues(values.lside01opacityout, currentYOffset);
                let lside01translateYout = calcValues(values.lside01translateYout, currentYOffset);

                let mainimg01opacity = calcValues(values.mainimg01opacity, currentYOffset);
                let mainimg01translateY = calcValues(values.mainimg01translateY, currentYOffset);
                let mainimg01opacityout = calcValues(values.mainimg01opacityout, currentYOffset);
                let mainimg01translateYout = calcValues(values.mainimg01translateYout, currentYOffset);

                let subimg01opacity = calcValues(values.subimg01opacity, currentYOffset);
                let subimg01translateY = calcValues(values.subimg01translateY, currentYOffset);
                let subimg01opacityout = calcValues(values.subimg01opacityout, currentYOffset);
                let subimg01translateYout = calcValues(values.subimg01translateYout, currentYOffset);

                //best02
                let lside02opacity = calcValues(values.lside02opacity, currentYOffset);
                let lside02translateY = calcValues(values.lside02translateY, currentYOffset);
                let lside02opacityout = calcValues(values.lside02opacityout, currentYOffset);
                let lside02translateYout = calcValues(values.lside02translateYout, currentYOffset);

                let mainimg02opacity = calcValues(values.mainimg02opacity, currentYOffset);
                let mainimg02translateY = calcValues(values.mainimg02translateY, currentYOffset);
                let mainimg02opacityout = calcValues(values.mainimg02opacityout, currentYOffset);
                let mainimg02translateYout = calcValues(values.mainimg02translateYout, currentYOffset);

                let subimg02opacity = calcValues(values.subimg02opacity, currentYOffset);
                let subimg02translateY = calcValues(values.subimg02translateY, currentYOffset);
                let subimg02opacityout = calcValues(values.subimg02opacityout, currentYOffset);
                let subimg02translateYout = calcValues(values.subimg02translateYout, currentYOffset);

                //best03
                let lside03opacity = calcValues(values.lside03opacity, currentYOffset);
                let lside03translateY = calcValues(values.lside03translateY, currentYOffset);
                let lside03opacityout = calcValues(values.lside03opacityout, currentYOffset);
                let lside03translateYout = calcValues(values.lside03translateYout, currentYOffset);

                let mainimg03opacity = calcValues(values.mainimg03opacity, currentYOffset);
                let mainimg03translateY = calcValues(values.mainimg03translateY, currentYOffset);
                let mainimg03opacityout = calcValues(values.mainimg03opacityout, currentYOffset);
                let mainimg03translateYout = calcValues(values.mainimg03translateYout, currentYOffset);

                let subimg03opacity = calcValues(values.subimg03opacity, currentYOffset);
                let subimg03translateY = calcValues(values.subimg03translateY, currentYOffset);
                let subimg03opacityout = calcValues(values.subimg03opacityout, currentYOffset);
                let subimg03translateYout = calcValues(values.subimg03translateYout, currentYOffset);

                //best04
                let lside04opacity = calcValues(values.lside04opacity, currentYOffset);
                let lside04translateY = calcValues(values.lside04translateY, currentYOffset);
                let lside04opacityout = calcValues(values.lside04opacityout, currentYOffset);
                let lside04translateYout = calcValues(values.lside04translateYout, currentYOffset);

                let mainimg04opacity = calcValues(values.mainimg04opacity, currentYOffset);
                let mainimg04translateY = calcValues(values.mainimg04translateY, currentYOffset);
                let mainimg04opacityout = calcValues(values.mainimg04opacityout, currentYOffset);
                let mainimg04translateYout = calcValues(values.mainimg04translateYout, currentYOffset);

                let subimg04opacity = calcValues(values.subimg04opacity, currentYOffset);
                let subimg04translateY = calcValues(values.subimg04translateY, currentYOffset);
                let subimg04opacityout = calcValues(values.subimg04opacityout, currentYOffset);
                let subimg04translateYout = calcValues(values.subimg04translateYout, currentYOffset);


                //console.log("????=====", titopacity);

                if(scrollRatio <= section01_Point[0][1]) {
                    objs.graybg.setAttribute("style", 'opacity : ' + graybgopacity + '; transform : translateY(' + graybgtranslateY + 'px)');
                } else  {
                    objs.graybg.setAttribute("style", 'opacity : ' + graybgopacityout + '; transform : translateY(' + graybgtranslateYout + 'px)');
                } 

                if(scrollRatio <= section01_Point[1][1]) {
                    objs.tit.setAttribute("style", 'opacity : ' + titopacity + '; transform : translateY(' + tittranslateY + 'px)');
                } else { 
                    objs.tit.setAttribute("style", 'opacity : ' + titopacityout + '; transform : translateY(' + tittranslateYout + 'px)');
                }

                //best01
                if(scrollRatio <= section01_Point[3][1]) {
                    objs.lside01.setAttribute("style", 'opacity : ' + lside01opacity + '; transform : translateY(' + lside01translateY + 'px)');
                } else { 
                    objs.lside01.setAttribute("style", 'opacity : ' + lside01opacityout + '; transform : translateY(' + lside01translateYout + 'px)');
                }

                if(scrollRatio <= section01_Point[4][1]) {
                    objs.mainimg01.setAttribute("style", 'opacity : ' + mainimg01opacity + '; transform : translateY(' + mainimg01translateY + 'px)');
                } else { 
                    objs.mainimg01.setAttribute("style", 'opacity : ' + mainimg01opacityout + '; transform : translateY(' + mainimg01translateYout + 'px)');
                }
                
                if(scrollRatio <= section01_Point[5][1]) {
                    objs.subimg01.setAttribute("style", 'opacity : ' + subimg01opacity + '; transform : translateY(' + subimg01translateY + 'px)');
                } else { 
                    objs.subimg01.setAttribute("style", 'opacity : ' + subimg01opacityout + '; transform : translateY(' + subimg01translateYout + 'px)');
                }

                //best02
                if(scrollRatio <= section01_Point[7][1]) {
                    objs.lside02.setAttribute("style", 'opacity : ' + lside02opacity + '; transform : translateY(' + lside02translateY + 'px)');
                } else { 
                    objs.lside02.setAttribute("style", 'opacity : ' + lside02opacityout + '; transform : translateY(' + lside02translateYout + 'px)');
                }

                if(scrollRatio <= section01_Point[8][1]) {
                    objs.mainimg02.setAttribute("style", 'opacity : ' + mainimg02opacity + '; transform : translateY(' + mainimg02translateY + 'px)');
                } else { 
                    objs.mainimg02.setAttribute("style", 'opacity : ' + mainimg02opacityout + '; transform : translateY(' + mainimg02translateYout + 'px)');
                }
                
                if(scrollRatio <= section01_Point[9][1]) {
                    objs.subimg02.setAttribute("style", 'opacity : ' + subimg02opacity + '; transform : translateY(' + subimg02translateY + 'px)');
                } else { 
                    objs.subimg02.setAttribute("style", 'opacity : ' + subimg02opacityout + '; transform : translateY(' + subimg02translateYout + 'px)');
                }

                //best03
                if(scrollRatio <= section01_Point[11][1]) {
                    objs.lside03.setAttribute("style", 'opacity : ' + lside03opacity + '; transform : translateY(' + lside03translateY + 'px)');
                } else { 
                    objs.lside03.setAttribute("style", 'opacity : ' + lside03opacityout + '; transform : translateY(' + lside03translateYout + 'px)');
                }

                if(scrollRatio <= section01_Point[12][1]) {
                    objs.mainimg03.setAttribute("style", 'opacity : ' + mainimg03opacity + '; transform : translateY(' + mainimg03translateY + 'px)');
                } else { 
                    objs.mainimg03.setAttribute("style", 'opacity : ' + mainimg03opacityout + '; transform : translateY(' + mainimg03translateYout + 'px)');
                }
                
                if(scrollRatio <= section01_Point[13][1]) {
                    objs.subimg03.setAttribute("style", 'opacity : ' + subimg03opacity + '; transform : translateY(' + subimg03translateY + 'px)');
                } else { 
                    objs.subimg03.setAttribute("style", 'opacity : ' + subimg03opacityout + '; transform : translateY(' + subimg03translateYout + 'px)');
                }

                //best04
                if(scrollRatio <= section01_Point[15][1]) {
                    objs.lside04.setAttribute("style", 'opacity : ' + lside04opacity + '; transform : translateY(' + lside04translateY + 'px)');
                } else { 
                    objs.lside04.setAttribute("style", 'opacity : ' + lside04opacityout + '; transform : translateY(' + lside04translateYout + 'px)');
                }

                if(scrollRatio <= section01_Point[16][1]) {
                    objs.mainimg04.setAttribute("style", 'opacity : ' + mainimg04opacity + '; transform : translateY(' + mainimg04translateY + 'px)');
                } else { 
                    objs.mainimg04.setAttribute("style", 'opacity : ' + mainimg04opacityout + '; transform : translateY(' + mainimg04translateYout + 'px)');
                }
                
                if(scrollRatio <= section01_Point[17][1]) {
                    objs.subimg04.setAttribute("style", 'opacity : ' + subimg04opacity + '; transform : translateY(' + subimg04translateY + 'px)');
                } else { 
                    objs.subimg04.setAttribute("style", 'opacity : ' + subimg04opacityout + '; transform : translateY(' + subimg04translateYout + 'px)');
                }


                break;
                
                case 2 : 	
                console.log(scrollRatio)

                sceneInfo[3].objs.banner.setAttribute("style", 'opacity : 0; transform : translateY(50px)');

                let tit2opacity = calcValues(values.tit2opacity, currentYOffset);
                let tit2translateY = calcValues(values.tit2translateY, currentYOffset);
                let tit2opacityout = calcValues(values.tit2opacityout, currentYOffset);
                let tit2translateYout = calcValues(values.tit2translateYout, currentYOffset);

                let newopacity = calcValues(values.newopacity, currentYOffset);
                let newtranslateY = calcValues(values.newtranslateY, currentYOffset);
                let newtranslateX = calcValues(values.newtranslateX, currentYOffset);
                let newopacityout = calcValues(values.newopacityout, currentYOffset);
                let newtranslateYout = calcValues(values.newtranslateYout, currentYOffset);



                if(scrollRatio <= 0.2) {
                    objs.tit2.setAttribute("style", 'opacity : ' + tit2opacity + '; transform : translateY(' + tit2translateY + 'px)');
                } else { 
                    objs.tit2.setAttribute("style", 'opacity : ' + tit2opacityout + '; transform : translateY(' + tit2translateYout + 'px)');
                }

                if(scrollRatio <= 0.4) {
                    objs.new.setAttribute("style", 'opacity : ' + newopacity + '; transform : translateY(' + newtranslateY + 'px)');
                } 

                if(scrollRatio <= 0.85) {
                    objs.new.setAttribute("style", 'opacity : ' + newopacity + '; transform : translateY(' + newtranslateY + 'px) translateX(' + newtranslateX + '%)');
                } else {
                    objs.new.setAttribute("style", 'opacity : ' + newopacityout + '; transform : translateY(' + newtranslateYout + 'px) translateX(' + newtranslateX + '%)');
                }
             

                break;

                case 3 : 	
                console.log(scrollRatio)

                let banneropacity = calcValues(values.banneropacity, currentYOffset);
                let bannertranslateY = calcValues(values.bannertranslateY, currentYOffset);
                let banneropacityout = calcValues(values.banneropacityout, currentYOffset);
                let bannertranslateYout = calcValues(values.bannertranslateYout, currentYOffset);

                let promotion01opacity = calcValues(values.promotion01opacity, currentYOffset);
                let promotion01translateY = calcValues(values.promotion01translateY, currentYOffset);

                let promotion02opacity = calcValues(values.promotion02opacity, currentYOffset);
                let promotion02translateY = calcValues(values.promotion02translateY, currentYOffset);

                let promotion03opacity = calcValues(values.promotion03opacity, currentYOffset);
                let promotion03translateY = calcValues(values.promotion03translateY, currentYOffset);

                let promotionopacityout = calcValues(values.promotionopacityout, currentYOffset);
                let promotiontranslateYout = calcValues(values.promotiontranslateYout, currentYOffset);



                if(scrollRatio <= 0.3) {
                    objs.banner.setAttribute("style", 'opacity : ' + banneropacity + '; transform : translateY(' + bannertranslateY + 'px)');
                } else { 
                    objs.banner.setAttribute("style", 'opacity : ' + banneropacityout + '; transform : translateY(' + bannertranslateYout + 'px)');
                }

                if(scrollRatio <= 0.7) {
                    objs.promotion01.setAttribute("style", 'opacity : ' + promotion01opacity + '; transform : translateY(' + promotion01translateY + 'px)');
                }
                
                if(scrollRatio <= 0.7) {
                   objs.promotion02.setAttribute("style", 'opacity : ' + promotion02opacity + '; transform : translateY(' + promotion02translateY + 'px)');
                }

                if(scrollRatio <= 0.7) {
                    objs.promotion03.setAttribute("style", 'opacity : ' + promotion03opacity + '; transform : translateY(' + promotion03translateY + 'px)');
                }

                if(scrollRatio <= 0.95) {
                    objs.promotion.setAttribute("style", 'opacity : ' + promotionopacityout + '; transform : translateY(' + promotiontranslateYout + 'px)');
                }

                



        }					
                
            

        // 2번째 화면이 윈도우상에서 보이기 시작한 시점부터 애니메이션이 동작해야함 
        
    }

    function scrollLoop() { 
        prevScrollHeight = 0;
        enterNewScene = false
        for(let i = 0; i < currentScene; i++) { 
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        //console.log("prevScrollHeight ==", prevScrollHeight);
        //console.log("현재신의 스크롤하이트 ==", sceneInfo[currentScene].scrollHeight);
        //console.log("yOffset ==", yOffset);


        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { 
            enterNewScene = true;
            currentScene++;		
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight) { 
            enterNewScene = true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        //console.log(yOffset);
        if(enterNewScene) return;
        playAnimation();
    }


    window.addEventListener('scroll', () => { 
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);			 			 
})()

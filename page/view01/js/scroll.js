
(function () {

    let yOffset = 0; // javascript의 스크롤탑 window.pageYoffset대신 쓸 값
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 있는 스크롤 높이
    let currentScene = 0; // 현재 씬
    let enterNewScene = false; // 새로운 씬이 시작되면  true

    //  여기서부터는 나중에 표기 
    let acc = 0.2;
    let delayedYOffset = 0;
    let rafId;
    let rafState;


    const sceneInfo = [
        {
            //색션 00
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-0"),
            },
        },
        {
            //색션 00
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-1"),
            },
        },
        {
            //색션 00
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-2"),
            },
        },
        {
            //색션 00
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-3"),
            },
        },
        {
            //색션 00
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-4"),
            },
        },
        {
            //색션 00
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector("#scroll-section-5"),
            },
        },


    ];

    // 레이아웃 설정
    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅       
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal') {

                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }


            //sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }


        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight > yOffset) {
                currentScene = i;
                break;
            }
        }


        document.body.setAttribute('id', `show-scene-${currentScene}`);

    }



    function playAnimation() {

        // Element.prototype.setAttributes = function (attrs) {
        //     for (var idx in attrs) {
        //         if ((idx == 'styles' || idx == 'style') && typeof attrs[idx] == 'object') {
        //             for (var prop in attrs[idx]){this.style[prop] = attrs[idx][prop]}
        //         } else if (idx == 'html') {
        //             this.innerHTML = attrs[idx]
        //         } else {
        //             this.setAttribute(idx, attrs[idx]);
        //         }
        //     }
        // };



        //console.log(yOffset);
        document.querySelectorAll("[data-ani=fade-up]").forEach(function (element, index) {
            //console.log(element);
            let rect = element.getBoundingClientRect();
            let offset = {
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
            };

            let realWindowHeight = window.innerHeight;

            if ((yOffset - 200) + realWindowHeight > offset.top) {
                element.classList.add("animate-fadeup");

            } else {
                element.classList.remove("animate-fadeup");
            }
        })
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        enterNewScene = false
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        //console.log("prevScrollHeight ==", prevScrollHeight);
        //console.log("현재신의 스크롤하이트 ==", sceneInfo[currentScene].scrollHeight);
        //console.log("yOffset ==", yOffset);


        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        //console.log(yOffset);
        if (enterNewScene) return;
        playAnimation();
    }


    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);



})();














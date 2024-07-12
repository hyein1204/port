// �뚮씪誘명꽣 媛��몄삤湲�
function getParam(sname) {
    let params = location.search.substr(location.search.indexOf("?") + 1);
    let sval = "";
    params = params.split("&");
    for (let i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

const paramType=getParam("type");

//console.log(paramType);

// �ㅽ겕濡� 留됯린
function scrollDisable(){
	$('#wrapper').addClass('scrollDisable').on('scroll touchmove mousewheel', function(e){
		e.preventDefault();
	});
}
// �ㅽ겕濡� ��湲�
function scrollAble(){
	$('#wrapper').removeClass('scrollDisable').off('scroll touchmove mousewheel');
}

scrollDisable();

function scrollMotion_fn(){
    $('.scroll .line_active').animate({'height':'0.52vw'},1500).animate({'height':'5.21vw'},1500,scrollMotion_fn);
}

function loading(){
    let counter = 0;
    let c = 0;
    let i = setInterval(function(){
        $('#counter').html(c);

        counter++;
        c++;
        
        if(counter == 101) {
            clearInterval(i);

            setTimeout(function(){
                $('#loading').fadeOut(500);
                scrollAble();

                // 硫붿씤 .main .sec01 濡쒓퀬 �섑��섍린
                $('#wrap.main .sec01 .big_logo').stop().delay(600).animate({opacity:1},2000);
                scrollMotion_fn();
            },300);
        }
    }, 30);
}

$(document).ready(function(){
    $(window).on('load',function(){
        loading();
    });
    
    // 留덉슦�� 而ㅼ꽌
    const cursor = document.querySelector('#cursor');
    const cursorCircle = cursor.querySelector('.cursor__circle');

    const mouse = { x: 0, y: 0 }; // mouse pointer's coordinates
    const pos = { x: 0, y: 0 }; // cursor's coordinates
    const speed = 0.5; // between 0 and 1

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.1;
        const accelerator = 100;
        return Math.min(distance / accelerator, maxSqueeze);
    }


    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);
        
        pos.x += diffX * speed;
        pos.y += diffY * speed;
        
        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);
        
        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
        const rotate = 'rotate(' + angle +'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    const cursorModifiers = document.querySelectorAll('[cursor-class]');

    cursorModifiers.forEach(curosrModifier => {
        curosrModifier.addEventListener('mouseenter', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.add(className);
        });
        
        curosrModifier.addEventListener('mouseleave', function() {
            const className = this.getAttribute('cursor-class');
            cursor.classList.remove(className);
        });
    });

    let scrollObj = window.Scrollbar.init(document.querySelector('#wrapper'),{thumbMinSize:10, speed:2});

    let swiperStart = false;
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return '<span class="current">0' + current + '</span><span class="total">' + '0' + total + '</span>'; 
            }
        },
        loop: true,
        speed : 1000,
        observer: true,
        observeParents: true
    });
    
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    ScrollTrigger.scrollerProxy('#wrapper',{
        scrollTop: function(value) {
            if (arguments.length) {
                scrollObj.scrollTop = value;
            }
            return scrollObj.scrollTop;
        }
    });
    
    scrollObj.addListener(function(e){
        let _this = this;
        
        ScrollTrigger.update();
        scrollTop = _this.offset.y;
        //console.log(_this);
        
        $('#header').css({'top':_this.offset.y});
        
        // section02 �댄썑 �꾨쾭嫄� 硫붾돱 蹂�寃�
        if(scrollTop >= $('.main .sec01').outerHeight()){
            $('#header').addClass('view');
        }else{
            $('#header').removeClass('view');
        }

        if(scrollTop >= $('#sec05').offset().top){
            swiper.autoplay.start(2000);
            swiperStart = true;
        }
    });
    
    // �ㅽ겕濡� �몃━嫄곌� �몄떇�댁빞�섎뒗 湲곕낯 �ㅽ겕濡� ���곸쓣 SS �뚮윭洹몄씤�쇰줈 蹂�寃쏀빀�덈떎.
    ScrollTrigger.defaults({scroller: document.querySelector('#wrapper')});
    
    $('.h_view li a, .works_noti .worksBtn, .logo').on('click', function(e){
		e.preventDefault();

		var $target = $($(this).attr('href'));
		var targetYpos = '';

        //console.log($target.selector);
        
        if($target.selector == '#contact'){
            targetYpos = scrollObj.limit.y;
        }else{
            targetYpos = $target.position().top;
        }
        
        $('.menu_btn').removeClass('active');
        $('#header .header_wrap .logo, #header .header_wrap ul').removeClass('active');

        scrollObj.scrollTo(0, targetYpos, 1500);
	});

    // 硫붾돱 �닿린
    $(document).on('click','.menu_btn',function(e){
		e.preventDefault();

        if($(this).is('.active')){
            $(this).removeClass('active');
            $('#header .header_wrap .logo, #header .header_wrap ul').removeClass('active');
        }else{
            $(this).addClass('active');
            $('#header .header_wrap .logo, #header.view .header_wrap ul').addClass('active');
        }
    });

    
    // 硫붿씤 .main .sec01 ���댄� �대젮�ㅺ린
    // 硫붿씤 .main .sec01 scroll �띿뒪�� 諛� 紐⑥뀡 �④린湲�
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec01',
            start: 'bottom 100%',
            end: 'bottom 50%',
            scrub: 1,
        }
    })
    .fromTo('#wrap.main .sec01 .title',{y: '0%'},{y: '80vh',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec01 .title h1 .title_1',{width: '49.64vw'},{width: '19.43vw',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec01 .title h1 .title_2',{width: '36.25vw'},{width: '14.17vw',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec01 .title h1.hidden',{opacity: 1},{opacity: 0,ease: 'none',duration: 8},0)
    .fromTo('#wrap.main .sec01 .scroll',{opacity: 1},{opacity: 0,ease: 'none',duration: 8},0)

    // 硫붿씤 .main .sec02 湲��� 泥댁씤吏�
    // 硫붿씤 .main .sec02 �곸긽 100% 梨꾩슦湲�
    // gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '#wrap.main .sec02',
    //         start: 'bottom 100%',
    //         end: 'bottom 70%',
    //         scrub: 1,
    //     }
    // })
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec01',
            start: 'bottom 30%',
            endTrigger: '#wrap.main .sec02',
            end: 'bottom 70%',
            scrub: 1,
        }
    })
    .to('#header .header_wrap .logo',{color: '#000000',ease: 'none',duration: 0},0)
    .to('#header .header_wrap .menu_btn span',{backgroundColor: '#000000',ease: 'none',duration: 0},0)

    .fromTo('#wrap.main .video_wrap',
        {width: '4.69vw',height: '4.69vw','top':'50%','left':'50%','margin-left':'1.30vw','margin-left':'14.58vw'},
        {width: '100%',height: 'auto','min-height': '100%','top':'0','left':'0','margin-left':'0','margin-left':'0',ease: 'none',duration: 8},0)
    .fromTo('#wrap.main .video_wrap video',{scale: 2},{scale: 1,ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .video_wrap',{'border-radius': '100%'},{'border-radius': '0',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec02 .text h1.one',{opacity: 1},{opacity: 0,ease: 'none',duration: 3},3)
    .fromTo('#wrap.main .sec02 .text h1.two',{opacity: 0},{opacity: 1,ease: 'none',duration: 3},3)

    .to('#header .header_wrap .logo',{color:'#F8F8F4',ease: 'none',duration: 0},6)
    .to('#header .header_wrap .menu_btn span',{backgroundColor:'#F8F8F4',ease: 'none',duration: 0},6)
    
    // 硫붿씤 .main .sec03 湲��� �쇱��� 紐⑥뀡 諛� �щ낵 �뚯쟾
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec03',
            start: 'top 50%',
            endTrigger: '#wrap.main .sec03',
            end: 'top -=3000',
            scrub: 1,
        }
    })
    .to('#header .header_wrap .logo',{color: '#000000',ease: 'none',duration: 0},1)
    .to('#header .header_wrap .menu_btn span',{backgroundColor: '#000000',ease: 'none',duration: 0},1)

    .fromTo('#wrap.main .sec03 .text .text_1',{x: '20%'},{x: '-100%',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec03 .text .text_2',{x: '-20%'},{x: '100%',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec03 .text .text_3',{x: '20%',y: '-1vw'},{x: '-80%',y: '-1vw',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec03 .text .text_4',{x: '20%'},{x: '-50%',ease: 'none',duration: 10},0)
    .fromTo('#wrap.main .sec03 .symbol',{rotation: 0},{rotation: -360,ease: 'none',duration: 20},0)
    
    // 硫붿씤 .main .sec04 �대�吏� pin 嫄멸린
    gsap.to('#wrap.main .sec04 .img_wrap',{
        scrollTrigger: {
            trigger: '#wrap.main .img_wrap',
            start: 'top 0%',
            endTrigger: '#wrap.main .sec04 .contBox_1',
            scrub: 1,
            pin: true
        }
    })

    // 硫붿씤 .main .sec04 濡쒓퀬 �됱긽 蹂�寃�
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec04 .text_wrap',
            start: 'top 0%',
            end: 'top 10%',
            scrub: 1,
        }
    })
    .to('#header .header_wrap .logo',{color: '#F8F8F4',ease: 'none',duration: 0.1},0)
    .to('#header .header_wrap .menu_btn span',{backgroundColor: '#000000',ease: 'none',duration: 0.1},0)

    // 硫붿씤 .main .sec05 濡쒓퀬 �됱긽 蹂�寃�
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec05',
            start: 'top 0%',
            end: 'top 10%',
            scrub: 1,
        }
    })
    .to('#header .header_wrap .logo',{color: '#000000',ease: 'none',duration: 0.1},0)
    .to('#header .header_wrap .menu_btn span',{backgroundColor: '#000000',ease: 'none',duration: 0.1},0)

    // 硫붿씤 .main .sec06 ���댄� �대룞
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec05',
            start: 'bottom 80%',
            endTrigger: '#wrap.main .sec06',
            end: 'top 0%',
            scrub: 1
        }
    })
    .fromTo('#wrap.main .sec06 .title .main',{x: '-200%'},{x: '0%',ease: 'none',duration: 5},0)
    .fromTo('#wrap.main .sec06 .title .sub',{x: '170%'},{x: '0%',ease: 'none',duration: 5},0)
    
    // 硫붿씤 .main .sec06 work �대�吏� �꾨줈 �щ씪媛�湲� 諛� 踰꾪듉 �앹꽦
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec06 .cont_wrap',
            start: 'bottom 100%',
            endTrigger: '#wrap.main .sec06',
            end: 'top -=3000',
            scrub: 1,
            pin: true
        }
    })
    // .fromTo('#wrap.main .sec06 .title .main',{x: '-80%'},{x: '0%',ease: 'none',duration: 2},0)
    // .fromTo('#wrap.main .sec06 .title .sub',{x: '50%'},{x: '0%',ease: 'none',duration: 2},0)

    .fromTo('#header .header_wrap .logo',{color:'#000000'},{color:'#F8F8F4',ease: 'none',duration: 0.1},0)
    .fromTo('#header .header_wrap .menu_btn span',{backgroundColor:'#000000'},{backgroundColor:'#F8F8F4',ease: 'none',duration: 0.1},0)
    
    .fromTo('#wrap.main .sec06 .cont_wrap',{backgroundColor: '#F8F8F4'},{backgroundColor: '#000000',ease: 'none',duration: 1},0)
    .fromTo('#wrap.main .sec06 .cont_wrap .title h1',{color: '#000000'},{color: '#F8F8F4',ease: 'none',duration: 1},0)
    .fromTo('#wrap.main .sec06 .works_wrap',{y: '0%'},{y: '-150%',ease: 'none',duration: 5},0)

    .fromTo('#wrap.main .sec06 .title',{y: '3.65vw'},{y: '0',ease: 'none',duration: 1},5.5)
    .fromTo('#wrap.main .sec06 .cont_wrap .title .worksBtn',{opacity: 0,y: '100%'},{opacity: 1,y: '0%',ease: 'none',duration: 1},6)
    
    // 硫붿씤 .main .sec06 諛� �щ낵 �뚯쟾
    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec06',
            start: 'top 20%',
            scrub: 1
        }
    })
    .fromTo('#wrap.main .sec06 .text_wrap .title_1',{y: '15.63vw'},{y: '0px',ease: 'none',duration: 8},10)
    .fromTo('#wrap.main .sec06 .text_wrap .title_2',{y: '15.63vw'},{y: '0px',ease: 'none',duration: 6},10)
    .fromTo('#wrap.main .sec06 .text_wrap .title_3',{y: '15.63vw'},{y: '0px',ease: 'none',duration: 10},10)
    .fromTo('#wrap.main .sec06 .text_wrap .halfCircle',{rotation: 0},{rotation: 360,ease: 'none',duration: 10},10);

    gsap.to('.marquee__inner', {xPercent: -100, repeat: -1, duration: ($('.marquee__inner').outerWidth() * 0.02 / 2), ease: 'linear'}).totalProgress(0.5);
    gsap.set('.marquee__inner', {xPercent: -100});

    // 硫붿씤 .main .sec07 �섏씠吏� ��씠湲� 諛� �띿뒪�� �꾨줈 �섏삤�� 紐⑥뀡
    gsap.utils.toArray('.target_cont').forEach((target, i) => {
        ScrollTrigger.create({
            trigger: target,
            start: 'top top',
            pin: true, 
            pinSpacing: false
        });
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: '#wrap.main .sec07 .cont_2',
            start: 'top 100%',
            scrub: 1
        }
    })
    .fromTo('#wrap.main .sec07 .cont_2',{opacity: 0.5},{opacity: 1,ease: 'none',duration: 5},0)
    .fromTo('#wrap.main .sec07 .cont_2 .subText',{y: '15.63vw'},{y: '0',ease: 'none',duration: 5},3)
    .fromTo('#wrap.main .sec07 .cont_2 .title',{y: '15.63vw'},{y: '0',ease: 'none',duration: 5},3)
    .fromTo('#wrap.main .sec07 .cont_2 .infoBox',{y: '15.63vw'},{y: '0',ease: 'none',duration: 5},3)

    .fromTo('#header .header_wrap .logo',{color:'#F8F8F4'},{color:'#000000',ease: 'none',duration: 0.1},5)
    .fromTo('#header .header_wrap .menu_btn span',{backgroundColor:'#F8F8F4'},{backgroundColor:'#000000',ease: 'none',duration: 0.1},5)
    
    gsap.to('#wrap.main .sec07 .cont_2 .emoji_1', {x: '-0.52vw',y: '-0.52vw',ease: 'none',repeat: -1,yoyo: true,duration: 1,ease: 'none',repeatDelay: 2});
    gsap.to('#wrap.main .sec07 .cont_2 .emoji_3', {x: '0.52vw',y: '0.52vw',ease: 'none',repeat: -1,yoyo: true,duration: 1,ease: 'none',repeatDelay: 2});
    gsap.to('#wrap.main .sec07 .cont_2 .enter', {opacity: 0,repeat: -1,yoyo: true,duration: 0.5,ease: 'none',repeatDelay: 1});
}); // E: jQuery

let slot_screen = document.getElementById("slot-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let stop_btn1 = document.getElementsByClassName("stop-btn1");
let stop_btn2 = document.getElementsByClassName("stop-btn2");
let stop_btn3 = document.getElementsByClassName("stop-btn3");
let start_btn = document.getElementById("start-btn");

let sec = 100;              //slot reel rotation speed (runs per second)
let stopReelFlag =[];       //slot reel stop flag
let reelCounts = [];        //which image to position
let slotFrameHeight;        //frame size
let slotReelsHeight;        //overall reel (image) size
let slotReelItemHeight;     //size of one reel (image)
let slotReelStartHeight;    //initial image value

//initialization
let slot = {
    init:function(){
        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },

    //click event
    start:function(){
        slot.init();
        for (let index = 0 ; index < 3 ; index++) {
            slot.animation(index);
        }
    },

    //stop button click event
    stop1:function() {
        stopReelFlag[0] = true
        if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]){
            start_btn.removeAttribute("disabled");
        }
    },

    stop2:function() {
        stopReelFlag[1] = true
        if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]){
            start_btn.removeAttribute("disabled");
        }
    },

    stop3:function() {
        stopReelFlag[2] = true
        if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]){
            start_btn.removeAttribute("disabled");
        }
    },

    //set first position
    resetLocationInfo:function(){
        slotFrameHeight = slot_screen.offsetHeight;
        slotReelsHeight = reels[0].offsetHeight;
        slotReelItemHeight = reel[0].offsetHeight;
        slotReelStartHeight = -slotReelsHeight;
        slotReelStartHeight += slotFrameHeight
        -(slotFrameHeight /2) + slotReelItemHeight * 3 / 2;
        for(let i = 0; i < reels>length;i++) {
            reels[i].style.top = string(slotReelStartHeight) + "px";
        }
    },

    //move the slot
    animation:function(index) {
        if (reelCounts[index] >= 8) {
            reelCounts[index] = 0;
        }
        $(".reels").eq(index).animate({
            "top":slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)
        },
        {
            duration:sec,
            easing:"linear",
            complete:function(){
                if(stopReelFlag[index]){
                    return;
                }
                reelCounts[index]++;
                slot.animation(index);
            }
        });
    },
};

// window.onload = function() {
//     slot.init();
//     slot.resetLocationInfo();
//     start_btn.addEventListener("click",function(e){
//         e.target.setAttribute("disabled",true)
//         slot.start();
//         for(let i =0;i<stop_btn.length;i++){
//             stop_btn[i].removeAttribute("disabled");
//         }
//     });
//     for(let i=0;i<stop_btn.length;i++){
//         stop_btn[i].addEventListener("click",function(e){
//             slot.stop(e.target.getAttribute("data-val"));
//         })
//     }
// };

document.body.onkeyup = (e) => {
    slot.init();
    slot.resetLocationInfo();
    if (e.keyCode == 32) {
        e.target.setAttribute("disabled",true)
        slot.start();
        for(let i =0;i<stop_btn.length;i++){
            stop_btn1[0].removeAttribute("disabled");
            stop_btn2[1].removeAttribute("disabled");
            stop_btn3[2].removeAttribute("disabled");
        }
    };
    for(let i=0;i<stop_btn1.length;i++){
        if (e.keyCode == 97) {
            slot.stop1(e.target.getAttribute("data-val"));
        }
    }
    for(let i=0;i<stop_btn2.length;i++){
        if (e.keyCode == 98) {
            slot.stop2(e.target.getAttribute("data-val"));
        }
    }
    for(let i=0;i<stop_btn3.length;i++){
        if (e.keyCode == 99) {
            slot.stop3(e.target.getAttribute("data-val"));
        }
    }
};
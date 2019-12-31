const actionList = [ 
    initAuthority,
    introColor,
    introSize,
    introTexture,
    overview,
    highlightTime,
    highlightLocation,
    highlightID,
    empty,//科普
    highlightPerson,
    detail1,
    higlightNight,
    detail2,
    empty,//loacation && id
    empty,//科普
    detail3,
    empty,//建议
];

const backList = [
    introColor_back,
    introSize_back,
    introTexture_back,
    overview_back,
    highlightTime_back,
    highlightLocation_back,
    highlightID_back,
    empty,//科普
    highlightPerson_back,
    detail1_back,
    higlightNight_back,
    detail2_back,
    empty,
    empty,
    detail3_back,
    empty,//建议
]

let currentIndex = 0;
window.onload = function(){
    actionList[0]();
    d3.select("#next").on("click", function(){
        if(currentIndex < actionList.length - 1){
            currentIndex ++;
            actionList[currentIndex]();
        }
    });

    d3.select("#back").on("click", function(){
        if(currentIndex > 0){
            currentIndex --;
            backList[currentIndex]();
        }
    });
}



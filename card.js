let cards = [];

let mpos = {x: 0.1, y: 0.1};

let card_margin = 5;
let card_rotation = 50;

let card_class = "projectimg";

document.addEventListener('mousemove', function(event) {
    mpos.x = event.clientX;
    mpos.y = event.clientY;
});

function update_cards(){
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        
        const tmp = element.style.transform;

        element.style.transform = "";

        let x = element.offsetLeft-card_margin;
        let y = element.offsetTop-card_margin;
        let w = element.offsetWidth+2*card_margin;
        let h = element.offsetHeight+2*card_margin;

        // If any parent has position: absolute;, we need to do this
        let curr_element = element.offsetParent;
        while(curr_element != null){
            x+=curr_element.offsetLeft;
            y+=curr_element.offsetTop;
            curr_element = curr_element.offsetParent;
        }

        const center = {x: x+w/2.0, y: y+h/2.0};
        
        const x_diff = mpos.x-center.x;
        const y_diff = mpos.y-center.y;

        const xang = (x_diff/w)*card_rotation;
        const yang = (y_diff/h)*card_rotation;

        element.style.transform = tmp;

        const isx = mpos.x>(center.x-w/2) && mpos.x<(center.x+w/2);
        const isy = mpos.y>(center.y-h/2) && mpos.y<(center.y+h/2);

        if( isx && isy ){
            element.style.transform = "rotateX("+-yang+"deg) rotateY("+xang+"deg) rotateZ(0deg)";
        }else{
            element.style.transform = "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
        }
    }
    window.requestAnimationFrame(update_cards);
}

function refresh_cards(){
    cards = document.getElementsByClassName(card_class);
}

window.addEventListener('load', function () {
    cards = document.getElementsByClassName(card_class);
    window.requestAnimationFrame(update_cards);
});




/* 
 *
 *
 * Hi if you are reading this from dev tools,
 * i suck at js, im more of a C++ guy 
 *
 * this is one of my first real js things
 * and a reimplementation of my raylib-coollines
 *
 * also i don't know what causes the flickering-
 *
 *
 * */
let w = 1920;
let h = 1080;
const clearing = -50;
const dist = 100;

// This means 1920x1080 is 100 points
const pixels_per_point = 20736;

let points = [];

class point {
    constructor(x, y, vx, vy){
        this.x = x;
        this.y = y; 
        this.vx = vx;
        this.vy = vy; 
    }
}

function get_rand(max){
    return Math.random()*max*2-max;
}

const decimalToHex = dec => dec.toString(16);

function make_point(){
    points.push(new point(Math.random()*w,Math.random()*h,get_rand(.1),get_rand(.1)))
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function update_points(){
    ctx.fillStyle = "black";
    ctx.lineWidth = .3;
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < points.length; index++) {
        let point = points[index];
        
        point.x += point.vx;
        point.y += point.vy;
        if(point.x > w-clearing){
            point.x = clearing;
        }
        if(point.x < clearing){
            point.x = w;
        }
        if(point.y > h-clearing){
            point.y = clearing;
        }
        if(point.y < clearing){
            point.y = h;
        }

        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
        ctx.stroke();

        for (let index2 = 0; index2 < points.length; index2++) {
            let point2 = points[index2];
            const xdiff = point.x-point2.x;
            const ydiff = point.y-point2.y;
            const distance = Math.sqrt(xdiff*xdiff+ydiff*ydiff);
            if(distance < dist){
                const frac = (dist-distance)/dist;
                const brightness = frac*255;
                const c = Math.ceil(brightness).toString(16);

                ctx.strokeStyle = "#"+c+c+c;
                ctx.beginPath();
                ctx.strokeStyle = "#"+c+c+c;
                ctx.moveTo(point.x,point.y);
                ctx.strokeStyle = "#"+c+c+c;
                ctx.lineTo(point2.x,point2.y);
                ctx.strokeStyle = "#"+c+c+c;
                ctx.stroke();
            }
            
        }

    }
    window.requestAnimationFrame(update_points);
}

window.addEventListener('load', function () {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    for( let i = 0; i < 100; i++){
        make_point()
    } 
});

window.addEventListener('resize', function () {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const ideal_num_points = (w*h)/pixels_per_point;
    while (points.length < Math.floor(ideal_num_points)){
        make_point();
    }
    while (points.length > Math.floor(ideal_num_points)){
        points.pop();
    }
});

window.requestAnimationFrame(update_points);

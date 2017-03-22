(function() {



    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width/2;
    var centerY = canvas.height/2;
    var hourHand = [0,1,100];
    var minuteHand = [0,2,200];
    var secondHand = [0,2,300];
    var hand = [hourHand,minuteHand,secondHand];

    window.onload = function() {
        animate(canvas,ctx);
    };

    function timeToRad(time,type) {
        if (type == 1) {
            return time / 6 * Math.PI - Math.PI / 2;
        } else if (type == 2) {
            return time / 30 * Math.PI - Math.PI / 2;
        }
    }

    function timePosition(rad,radius) {
        var result =[];
        var x1 = centerX + Math.cos(rad) * radius;
        var y1 = centerY + Math.sin(rad) * radius;
        result.push(x1,y1);
        return result;
    }

    function drawPosition(timePosition) {
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.lineTo(timePosition[0],timePosition[1]);
        ctx.stroke();
        ctx.closePath();
    }


    function animate(canvas,ctx) {
        var myDate = new Date();
        hand[0][0] = myDate.getHours();
        hand[1][0] = myDate.getMinutes();
        hand[2][0] = myDate.getSeconds();
        var rad = [];
        for (var i = 0; i<=2; i++) {
            hand[i][0] = timeToRad(hand[i][0],hand[i][1]);
        }





        var r = 155;
        var g = 157;
        var b = 191;
        ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + '255)';

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.lineWidth = 10;
        for (var i = 0; i<=2; i++) {
            drawPosition(timePosition(hand[i][0],hand[i][2]));
        }
        window.requestAnimationFrame(function() {
            animate(canvas,ctx);
        });

    }
})();
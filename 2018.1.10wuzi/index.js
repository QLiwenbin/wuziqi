$(function () {
    let qipan = $('.qipan');
    let flag = true;
    let hei = {},
        bai = {},
        blank = {},
        ai = true;

    for(let i = 0;i < 15;i++){
        qipan.append('<i>');
        qipan.append('<b>');
        for(let j = 0;j < 15;j++){
            blank[i+'_'+j]=true;

            $('<span>')
                .appendTo(qipan)
                .addClass('qizi')
                .attr('id',i+'_'+j)
                .data('pos',{x:i,y:j});
        }
    }


    function position() {
        let scoreh = 0 , scoreb = 0 ,posh = null , posb = null;
        for(let i in blank){
            let obj = {x:i.split('_')[0],y:i.split('_')[1]};
            if(isSuccess(obj,hei)>scoreh){
                scoreh = isSuccess(obj,hei);
                posh = obj;
            }
            if(isSuccess(obj,bai)>scoreb){
                scoreb = isSuccess(obj,hei);
                posb = obj;
            }
        }
        return scoreh >= scoreb ? posh : posb ;
    }


    function isSuccess( pos , obj) {
        let hen = 1 , shu  =1 ,  zx = 1 , yx =1 ;
        let x = pos.x , y = pos.y;

        while (obj[x+"_"+(++y)]){
            hen++
        }
        y = pos.y;
        while (obj[x+"_"+(--y)]){
            hen++
        }
        x = pos.x , y = pos.y;
        while (obj[(++x)+"_"+y]){
            shu++
        }
        x = pos.x;
        while (obj[(--x)+"_"+y]){
            shu++
        }

        x = pos.x , y = pos.y;

        while (obj[(--x)+"_"+(--y)]){
            zx++
        }
        x = pos.x , y = pos.y;
        while (obj[(++x)+"_"+(++y)]){
            zx++
        }
        x = pos.x , y = pos.y;
        while (obj[(--x)+"_"+(++y)]){
            yx++
        }
        x = pos.x , y = pos.y;
        while (obj[(++x)+"_"+(--y)]){
            yx++
        }
        return Math.max(hen,shu,zx,yx)
    }



    qipan.on('click','.qizi',function () {
        if($(this).hasClass('hei') || $(this).is('.bai')){
            return;
        }
        let data = $(this).data('pos');
        // delete blank[data.x+'_'+data.y];
        if(flag){
            $(this).addClass('hei');
            hei[data.x+"_"+data.y]=true;
            delete blank[data.x+'_'+data.y];
            if(isSuccess(data,hei)>=5){
                console.log('hei');
                qipan.off();
            }

            if(ai) {
                let pos = position();
                console.log(pos);
                $('#'+ pos.x + '_' + pos.y).addClass('bai');
                bai[pos.x+"_"+pos.y]=true;
                delete blank[pos.x+'_'+pos.y];
                if (isSuccess(pos, bai) >= 5) {
                    console.log('bai');
                    qipan.off();
                }
                return;
            }

        }

        else{
            $(this).addClass('bai');
            bai[data.x+"_"+data.y]=true;
            if(isSuccess(data,bai)>=5){
                console.log('bai');
                qipan.off();
            }
        }
        flag = !flag;
    })
});

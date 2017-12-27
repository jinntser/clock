$(function (){
    $('.clock01').clock();
    $('.clock02').clock({
        tickType: 'roman',
        rotateProps: false
    });
    $('.clock03').clock({
        tickType: 'arabic',
        rotateProps: false
    });
    $('.clock04').clock({
        tickType: 'zodiac',
        rotateProps: false
    });
    $('.clock05').clock({
        tickType: 'chineseZodiac',
        rotateProps: false
    });
    $('.custom-ticks01').clock({
        tickType: 'custom',
        rotateProps: false,
        ticks: ['6','6','6','6','6','6','6','6','6','6','6','6']
    });
    $('.custom-ticks02').clock({
        tickType: 'custom',
        rotateProps: false,
        ticks: ['<i class="fa fa-diamond"></i>','<i class="fa fa-wrench"></i>','<i class="fa fa-hand-peace-o"></i>',
            '<i class="fa fa-bomb"></i>','<i class="fa fa-paw"></i>','<i class="fa fa-hand-paper-o"></i>',
            '<i class="fa fa-motorcycle"></i>','<i class="fa fa-shopping-cart"></i>','<i class="fa fa-television"></i>',
            '<i class="fa fa-bathtub"></i>','<i class="fa fa-meh-o"></i>','<i class="fa fa-bed"></i>']
    });
    $('.custom-ticks03').clock({
        tickType: 'custom',
        rotateProps: false,
        ticks: ['100','120','140','160','180',' ',' ','0','20','40','60','80']
    });
    $('.fancy').clock();
    $('.wheel01').wheel({
        type: 'plate',
        props: 10
    });
    $('.wheel02').wheel({
        type: 'ring',
        props: 15
    });
});
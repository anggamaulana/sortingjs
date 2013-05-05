$(function() {

    /*
     * SortingProphet Simple Game
     * Settings
     */
    var BATASWAKTU = 60; //DETIK
    var BARIS = 4;
    var PANJANGKOTAK=150;
    var LEBARKOTAK=80;
    var background = ["aajj.jpg", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8",
        "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8",
        "#d8d8d8", "#d8d8d8"];




    /*
     * Halaman Pertama Game
     */
    function intro() {
        var start = $('<h3><a>Start</a></h3>');
        start.click(function() {
            $(this).remove();
            $("#play").append($('<div id="area"></div>'));
            $("#play").append($('<div id="timer">Timer <span id="waktu"></span></div>'));
            playGame();

        });
        $("#play").append(start);
    }

    
    /*
     * Halaman Gagal Game
     */
    function fail() {
        var start = $('<h3><a>Start</a></h3>');
        start.click(function() {
            $(this).remove();
            $("#pesan").remove();
            $("#play").append($('<div id="area"></div>'));
            $("#play").append($('<div id="timer">Timer <span id="waktu"></span></div>'));
            playGame();

        });
        $("#play").append("<p id=\"pesan\"><b>Anda Gagal coba Lagi </b> </p>");
        $("#play").append(start);
    }
    
    /*
     * Halaman Berhasil Game
     */
    function finish(Time) {
        var start = $('<h3><a>Start</a></h3>');
        start.click(function() {
            $(this).remove();
            $("#pesan").remove();
            $("#play").append($('<div id="area"></div>'));
            $("#play").append($('<div id="timer">Timer <span id="waktu"></span></div>'));
            playGame();

        });
        $("#play").append("<p id=\"pesan\"><b>Selamat Anda Sukses Menyeleseikan dalam " + Time + " Detik</b> </p>");
        $("#play").append(start);
    }
    
    
    /*
     * Mulai Permainan
     */
    function playGame() {

        var kotak = [];
        var posisikotak = [];
        var mapping = [];

        var max = Math.ceil(25 / BARIS);

        var offsetTop = document.getElementById("area").offsetTop;
        var offsetLeft = document.getElementById("area").offsetLeft;


        var squareWidth = PANJANGKOTAK;
        var squareHeight = LEBARKOTAK;

        var jarakVertikal = 20;
        var jarakHorizontal = 20;

        var j = 1;

        //Pasang area
        for (var k = 0; k < BARIS; k++) {
            for (var i = 0; i < max; i++) {
                var obj = $("<div></div>");
                obj.addClass("square");
                obj.css("width", PANJANGKOTAK+"px");
                obj.css("height", LEBARKOTAK+"px");
                obj.css("background", "#000");
                obj.css("position", "fixed");
               
                posisikotak[j - 1] = [offsetTop + (jarakVertikal + squareHeight) * k, offsetLeft + (jarakHorizontal + squareWidth) * i];
                mapping[j - 1] = j - 1;
                obj.css("top", posisikotak[j - 1][0] + "px");
                obj.css("left", posisikotak[j - 1][1] + "px");
                obj.text(j);
                obj.data("id", j - 1);

                $("#area").append(obj);

                if (j == 25)
                    break;
                j++;

            }
        }

        j = 1;

        //Objek Kotak
        for (var k = 0; k < BARIS; k++) {
            for (var i = 0; i < max; i++) {


                var obj = $("<div></div>");
                obj.addClass("obj");
                obj.css("width", PANJANGKOTAK+"px");
                obj.css("height", LEBARKOTAK+"px");
                obj.css("background", "#d8d8d8");
                obj.css("position", "fixed");
               
                obj.text(j);
                obj.data("id", j);


                kotak[j - 1] = obj;
                if (j == 25)
                    break;
                j++;

            }
        }



        //putar random
        for (i = 0; i < 25; i++) {
            var putar2 = Math.round(Math.random() * 20);
            var tmp = kotak[i];
            kotak[i] = kotak[putar2];
            kotak[putar2] = tmp;




        }


        //pasang random
        for (i = 0; i < 25; i++) {
            kotak[i].css("top", posisikotak[i][0] + "px");
            kotak[i].css("left", posisikotak[i][1] + "px");
            kotak[i].data("idPosisi", i + 1);


            mapping[i] = kotak[i].data("id");
            $("#area").append(kotak[i]);
        }




        //Make it droppable and draggable
        $(".obj").draggable({cursor: 'pointer'});

        $(".square").droppable({
            tolerance: 'intersect',
            hoverClass: 'border',
            drop: function(event, ui) {
                var draggableObj = ui.draggable;
                draggableObj.css("top", $(this).css("top"));
                draggableObj.css("left", $(this).css("left"));

                //tukar
                var objekDrag = draggableObj.data("idPosisi");
                var objekTimpa = kotak[$(this).data("id")].data("idPosisi");


                var tmp = kotak[objekDrag - 1];
                kotak[objekDrag - 1] = kotak[objekTimpa - 1];
                kotak[objekTimpa - 1] = tmp;

                var tmp2 = mapping[objekDrag - 1];
                mapping[objekDrag - 1] = mapping[objekTimpa - 1];
                mapping[objekTimpa - 1] = tmp;

                //hapus semua objek
                for (i = 0; i < 25; i++) {
                    $(kotak[i]).detach();


                }

                //ganti yang baru
                for (i = 0; i < 25; i++) {
                    kotak[i].css("top", posisikotak[i][0] + "px");
                    kotak[i].css("left", posisikotak[i][1] + "px");
                    kotak[i].data("idPosisi", i + 1);
                    $("#area").append(kotak[i]);
                }

                $(".obj").draggable({cursor: 'pointer'});

                if (success()) {
                    clearInterval(Waktu);
                    $("#area").remove();
                    $("#timer").remove();
                    finish(Mulai);
                }

            }


        });

        /*
         * Cek Jumlah Kotak yang terpasang dengan benar
         */
        function success() {
            var match = 0;
            for (var i = 0; i < 25; i++) {
                if (kotak[i].data("id") == kotak[i].data("idPosisi")) {
                    match++;
                }
            }           

            if (match == 25)
                return true;
            else
                return false;
        }

        var Mulai = 0;
        function timer() {
            if (Mulai <= BATASWAKTU) {
                $("#waktu").text(Mulai);
                Mulai++;
            } else {
                clearInterval(Waktu);
                $("#area").remove();
                $("#timer").remove();
                fail();
            }
        }




        var Waktu = setInterval(timer, '1000');
    }


    intro();

});
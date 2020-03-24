$(function () {

    // watch数が0なら赤色に変更
    $(".watch").each(function () {

        let index = $(this).attr("data-index");
        let watch = $(this).text();

        if (watch == 0) {
            $('[data-index=' + index + '].watch').addClass("text-danger");
        }

    })



    //テキストボックスのフォーカスが外れたら発火
    $(document).on("blur", "input", function () {

        // テキストボックスの値を抽出
        var index = $(this).attr("data-index");
        var start_price = $(this).val();
        var buyout_price = Number(start_price) + 2000;

        //開始価格の値を入力
        // $('[data-index=' + index + '].start_price').text(start_price);

        // 即決価格の値を入力
        $('[data-index=' + index + '].buyout_price').text(buyout_price);

    });

});
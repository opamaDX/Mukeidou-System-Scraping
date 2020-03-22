$(function () {
    //テキストボックスのフォーカスが外れたら発火
    $("input").blur(function () {

        // テキストボックスの値を抽出
        var index = $(this).attr("data-index");
        var start_price = $(this).val();
        var buyout_price = Number(start_price) + 2000;

        //開始価格の値を入力
        $('[data-index=' + index + '].start_price').text(start_price);

        // 即決価格の値を入力
        $('[data-index=' + index + '].buyout_price').text(buyout_price);

    });
});
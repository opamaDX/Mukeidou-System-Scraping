$(function() {
    //テキストボックスのフォーカスが外れたら発火
    $("input").blur(function() {

        // テキストボックスの値を抽出
        var start_price = $("#input_price").val();
        var buyout_price = Number( start_price ) + 2000;

        //開始価格の値を入力
        $("#start_price").text(start_price);

        // 即決価格の値を入力
        $("#buyout_price").text(buyout_price);


    });
});
$(function () {

    // watch数が0なら赤色,1から5は黒,6以上は緑に変更
    $(".watch").each(function () {

        let index = $(this).attr("data-index");
        let watch = Number($(this).text());

        if (watch == 0) {
            $('[data-index=' + index + '].watch').addClass("text-danger");
        } else if (watch >= 6) {
            $('[data-index=' + index + '].watch').addClass("text-success");
        }

    })

    // テキストボックスのフォーカスが外れたら発火、数値を入力
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

    // 品番がクリックされたときの処理
    $('li .product_number').on('click', function () {

        // 品番をクリップボードにコピーする
        var clipboard = new ClipboardJS('.product_number');

        // Tooltipの設定
        $(this).tooltip({
            title: 'コピー完了!',
            placement: 'right',
            trigger: 'manual'
        })

        // Tooltip表示後の動作を設定
        $(this).on('shown.bs.tooltip', function () {
            setTimeout((function () {
                $(this).tooltip('hide');
            }).bind(this), 1000);
        })

        // Tooltipを表示する
        $(this).tooltip('show');
    })

    function disp(url){

        window.open(url, "window_name", "width=300,height=200,scrollbars=yes");

    }
});
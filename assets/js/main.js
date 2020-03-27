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

    // 品番がクリックされたときの処理
    $(document).on("click","li .product_number",function () {

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
});
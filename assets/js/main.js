$(function () {

    $(document).on("load", ".watch", function () {
        alert("a");
    })

    // 品番がクリックされたときの処理
    $(document).on("click", "li .product_number", function () {

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

    $('#save').on('click', function() {
        alert("クリックされました");
    });
});
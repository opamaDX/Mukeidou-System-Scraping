$(function () {

    new ClipboardJS('.product_number');

    // 品番がクリックされたときの処理
    $(document).on("click", "li .product_number", function () {

        let index = $(this).attr("data-index");
        console.log(index);

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

    // フォーカスが外れたとき、増減率を算出
    $(document).on("blur", "input", function () {

        let index = $(this).attr("data-index");
        let input_price = $(this).val();
        let buyout_price = $('[data-index=' + index + '].buyout_price').text();
        buyout_price = Number(buyout_price.split(',').join(''));

        // 小数点以下を切り捨てて、増減率を算出
        range = (input_price / buyout_price - 1) * 100;
        range = Math.floor(range);

        // 増減率のテキスト表示
        $('[data-index=' + index + '].range').text(range + "%");

        // 増減率の絶対値が30以上なら、フォームとテキストを赤くする
        if (Math.abs(range) >= 30) {
            $('[data-index=' + index + '].range').addClass("text-danger");
            $('[data-index=' + index + '].input_price').css('background-color', '#FC9592');
        } else {
            $('[data-index=' + index + '].range').removeClass("text-danger");
            $('[data-index=' + index + '].input_price').css('background-color', '');
        }
    })

    // 入力値をjson形式で保存する
    $('#save').on('click', function () {

        // 配列初期化
        var return_items = {};

        // フォームに入力した価格を配列に追加
        $(".input_price").each(function () {
            let index = $(this).attr("data-index");
            let input_price = $(this).val();
            let product_number = $('[data-index=' + index + '].product_number').text();
            let flag = $('[data-index=' + index + '].card_number').attr('data-flag');

            if (flag == 1) {
                return_items[product_number] = {};
                return_items[product_number]["price"] = input_price;
            }
        })

        // セレクト指定した日時を配列に追加
        return_items["date"] = "2020年4月2日（テスト）"

        // json形式に変換
        var json = JSON.stringify(return_items);

        // バイナリデータ作成
        var blob = new Blob([json], { type: "application/json" });

        // IEか他ブラウザの判定
        if (window.navigator.msSaveBlob) {
            // IEなら独自関数使用
            window.navigator.msSaveBlob(blob, "edit.json");
        } else {
            // IE以外はaタグでイベント発火
            var a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = 'edit.json';
            a.click();
        }
    });

    // 画像上部のボタンがクリックされた時の、チェックの付け外し
    $(document).on("click", ".top_image .card_number", function () {

        // カードの管理番号とフラッグを取得
        let index = $(this).attr("data-index");
        let flag = $(this).attr("data-flag");

        if ( flag == 0 ) {
            $('[data-index=' + index + '].card_number').removeClass("btn-danger");
            $('[data-index=' + index + '].card_number').addClass("btn-primary");
            $('[data-index=' + index + '].card_number').attr('data-flag', 1)
        } else { }

        if ( flag == 1 ) {
            $('[data-index=' + index + '].card_number').removeClass("btn-primary");
            $('[data-index=' + index + '].card_number').addClass("btn-danger");
            $('[data-index=' + index + '].card_number').attr('data-flag', 0)
        } else { }
    })
});
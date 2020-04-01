$(function () {

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

    // フォーカスが外れたとき、増減率を算出
    $(document).on("blur", "input", function () {

        let index = $(this).attr("data-index");
        let input_price = $(this).val();
        let buyout_price = $('[data-index=' + index + '].buyout_price').text();
            buyout_price = Number( buyout_price.split(',').join('') );

        // 小数点以下を切り捨てて、増減率を算出
        range = (input_price / buyout_price - 1) * 100;
        range = Math.floor(range);

        // 増減率のテキスト表示
        $('[data-index=' + index + '].range').text(range + "%");

        // 増減率の絶対値が30以上なら、フォームとテキストを赤くする
        if (Math.abs(range) >= 30) {
            $('[data-index=' + index + '].range').addClass("text-danger");
            $('[data-index=' + index + '].input_price').addClass("bg-danger");
        } else {
            $('[data-index=' + index + '].range').removeClass("text-danger");
            $('[data-index=' + index + '].input_price').removeClass("bg-danger");
        }
    })

    // 入力値をjson形式で保存する
    $('#save').on('click', function () {

        var text = "テストテキストデータ";

        $(".input_price").each(function() {

                let index = $(this).attr("data-index");
                let input_price = $(this).val();
                let buyout_price = $('[data-index=' + index + '].buyout_price').text();
                    buyout_price = Number( buyout_price.split(',').join('') );
                let price = $(this).val();

                console.log(index);
        })

        // 配列初期化
        const return_items = {};

        return_items["k440307089"] = {}
        return_items["k440307089"]["price"] = "15800";
        return_items["k440307089"]["url"] = "http://~~~";

        return_items["a"] = {}
        return_items["a"]["price"] = "15800";
        return_items["a"]["url"] = "http://~~~";

        var json = JSON.stringify( return_items );

        console.log( json );

        text = json;

        // バイナリデータ作成
        var blob = new Blob([text], { type: "application/json" });

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
});
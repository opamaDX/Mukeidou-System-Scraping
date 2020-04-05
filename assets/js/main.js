$(function () {

    new ClipboardJS('.product_number');

    // 品番がクリックされたときの処理
    $(document).on("click", "li .product_number", function () {

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

            // 増減率が1つでも赤色の場合、処理を中断
            let range = $('[data-index=' + index + '].range').attr("class");
            if (range.match(/text-danger/)) {
                alert(index + "番目の商品の入力価格を変更してください。")
                javascript_die();
            }

            // チェックが付いている商品だけ配列に追加
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

        if (flag == 0) {
            $('[data-index=' + index + '].card_number').removeClass("btn-danger");
            $('[data-index=' + index + '].card_number').addClass("btn-primary");
            $('[data-index=' + index + '].card_number').attr('data-flag', 1)
        } else { }

        if (flag == 1) {
            $('[data-index=' + index + '].card_number').removeClass("btn-primary");
            $('[data-index=' + index + '].card_number').addClass("btn-danger");
            $('[data-index=' + index + '].card_number').attr('data-flag', 0)
        } else { }
    })

    // プルダウンで選択された時の処理
    $("#sort").change(function () {

        var items = [];

        $(".input_price").each(function () {

            let index          = $(this).attr("data-index");
            let src            = $('[data-index=' + index + '].card-img-top').attr("src");
            let product_name   = $('[data-index=' + index + '].product_name').text();
            let end_time       = $('[data-index=' + index + '].end_time').text();
            let product_number = $('[data-index=' + index + '].product_number').text();
            let access         = $('[data-index=' + index + '].access').text();
            let watch          = $('[data-index=' + index + '].watch').text();
            let buyout_price   = $('[data-index=' + index + '].buyout_price').text();
            let input_price    = $('[data-index=' + index + '].input_price').val();
            let range          = $('[data-index=' + index + '].range').text();

            var item = {
                "index"          :index,
                "src"            :src,
                "product_name"   :product_name,
                "end_time"       :end_time,
                "product_number" :product_number,
                "access"         :access,
                "watch"          :watch,
                "buyout_price"   :buyout_price,
                "input_price"    :input_price,
                "range"          :range
            };

            items.push(item);
        })

        items = JSON.stringify(items);
        localStorage.setItem("items",items);

        items = localStorage.getItem("items");
        items = JSON.parse( items );
        console.log( items[0]["index"] );
    })
});

// "11BR10": {
//     "ID": "o357172611",
//     "product_name": "★【M2】良品♪RG400ガンマ 純正エアダクトset♪RG500♪",
//     "price": "12800",
//     "start_time": "2020-04-03 23:21:07",
//     "end_time": "2020-04-04 13:47:30",
//     "src": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0511/users/936e6f3f69d1730e2ed6e42e1e499ecc06b9bdad/i-img600x450-1574224653rg0nz74980.jpg",
//     "access": "0",
//     "watch": "4",
//     "url": "https://auctions.yahoo.co.jp/pageinfo23/jp/show/resubmit?aID=o357172611"
// },
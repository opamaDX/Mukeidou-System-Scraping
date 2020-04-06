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

    // プルダウンで選択された時、製品をソートして表示
    $("#sort").change(function () {

        // 製品情報を入れる配列定義
        var items = [];

        $(".input_price").each(function () {

            let index = $(this).attr("data-index");
            let src = $('[data-index=' + index + '].card-img-top').attr("src");
            let url = $('[data-index=' + index + '].product_name').attr("data-url");
            let product_name = $('[data-index=' + index + '].product_name').text();
            let end_time = $('[data-index=' + index + '].end_time').text();
            end_time = end_time.replace(/-/g, '/');
            let product_number = $('[data-index=' + index + '].product_number').text();
            let access = $('[data-index=' + index + '].access').text();
            let watch = $('[data-index=' + index + '].watch').text();
            let buyout_price = $('[data-index=' + index + '].buyout_price').text();
            buyout_price = buyout_price.split(',').join('').trim();
            let input_price = $('[data-index=' + index + '].input_price').val();
            let range = $('[data-index=' + index + '].range').text();

            var item = {
                "index": index,
                "src": src,
                "product_name": product_name,
                "end_time": end_time,
                "product_number": product_number,
                "access": access,
                "watch": watch,
                "buyout_price": buyout_price,
                "input_price": input_price,
                "range": range,
                "url":url
            };

            items.push(item);
        })

        // 配列を文字列に変換して、ストレージに保存
        items = JSON.stringify(items);
        localStorage.setItem("items", items);

        // JSON形式でストレージからデータ抽出
        items = localStorage.getItem("items");
        items = JSON.parse(items);

        // ソートの種類を取得して、配列の中身をソート
        sort = $(this).val();
        sort_by(sort, items);

        // htmlを追加する変数を初期化
        var sorting_html = "";
        var cnt = 0;

        // htmlカード挿入
        $.each(items, function (key, value) {
            sorting_html += getRowSorting(cnt, key, items[key]);
            cnt++;
        });

        // ソートした製品を表示
        $("#product").html(sorting_html);

    })

    function sort_by(sort, items) {

        if (sort == "watch") {
            items.sort(function (a, b) {
                return b.watch - a.watch;
            })
        } else if (sort == "access") {
            items.sort(function (a, b) {
                return b.access - a.access;
            })
        } else if (sort == "buyout_price") {
            items.sort(function (a, b) {
                return b.buyout_price - a.buyout_price;
            })
        } else if (sort == "end_time") {
            items.sort(function (a, b) {
                return (a.date < b.date ? 1 : -1);
            })
        }
    }

    // 表示するhtml
    function getRowSorting(cnt, key, item) {
        return `<div class="col-lg-2 col-md-2 col-sm-12 mb-4 mt-4 small">
        <div class="card">
            <div class="top_image" style="position: relative;">
                <img class="card-img-top" src=${item["src"]} data-index=${cnt}>
                <button type="button" tabindex="-1" style="position: absolute; top:0; left: 0;" class="btn btn-primary rounded-0 card_number" data-flag=1 data-index=${cnt}>${cnt}</button>
            </div>
            <div class="card-body p-1">
                <h6 class="card-title text-center py-1 mb-0">
                    <a href="javascript:void(0)" tabindex="-1" class="product_name" data-url=${item["url"]} data-index=${cnt} onClick="window.open('${item["url"]}','sub','width=700,height=400,scrollbars=yes')">${item["product_name"]}</a>
                </h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item py-1">終了日時<span class="end_time float-right" data-index=${cnt} >${item["end_time"].replace(/\//g, '-')}</span></li>
                <li class="list-group-item py-1">管理番号<span class="float-right product_number" data-index=${cnt} data-clipboard-text="${item["product_number"]}">${item["product_number"]}</span></li>
                <li class="list-group-item py-1">アクセス<span class="float-right access" data-index=${cnt}>${item["access"]}</span></li>
                <li class="list-group-item py-1"><span class="">ウォッチ</span><span style="font-size: 1rem;" class="float-right watch font-weight-bold" data-index=${cnt}>${item["watch"]}</span></li>
                <li class="list-group-item py-1"><span class="">即決価格</span><span style="font-size: 1rem;" class="float-right font-weight-bold buyout_price" data-index=${cnt}>${Number(item["buyout_price"]).toLocaleString()}</span></li>
                <li class="list-group-item">
                    <form onsubmit="return false;">
                        <div class="form-group m-0">
                            <input type="text" class="form-control input_price text-right" style="font-weight: bold;" data-index=${cnt} value=${item["input_price"]} placeholder="価格を入力">
                        </div>
                    </form>
                </li>
                <li class="list-group-item py-1">増減率<span class="float-right range" data-index=${cnt}></span></li>
            </ul>
        </div>
    </div>`;
    }
});
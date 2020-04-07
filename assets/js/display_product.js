$(function () {

    // JSONファイルから情報を取得し、製品を表示する
    $.getJSON("items.json", function (items) {
        $.getJSON("price_list.json", function (price_list) {

            // htmlを追加する変数とカウンターを初期化
            var html = "";
            var price = 0;
            var cnt = 0;
            var discount_price = 0;

            // price_list.jsonの長さを取得
            list_length = price_list["prices"].length;

            // html要素を追加
            for (let key in items) {

                // itemsファイルから情報を取得
                price = items[key]["price"];

                last_price = price_list["prices"][list_length - 1];

                // 一段階下げた値段を取得
                for (var list_cnt = 0; list_cnt < list_length; list_cnt++) {
                    if ( price == last_price ) {
                        discount_price = last_price;
                        break;
                    } else if (price == price_list["prices"][list_cnt]) {
                        discount_price = price_list["prices"][list_cnt + 1];
                        break;
                    } else {
                        discount_price = price;
                    }
                }

                // htmlカード挿入
                html += getRow(cnt, key, items[key], discount_price);
                cnt++;
            }

            // htmlを表示
            $("#product").html(html);

            // カードの総数を表示
            items_length = Object.keys(items).length;
            $("#total").text(items_length);

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

            // 増減率の表示
            $(".input_price").each(function () {

                let index = $(this).attr("data-index");
                let input_price = $(this).val();
                let buyout_price = $('[data-index=' + index + '].buyout_price').text();
                buyout_price = Number(buyout_price.split(',').join(''));

                // 小数点以下を切り捨てて、増減率を算出
                range = (input_price / buyout_price - 1) * 100;
                range = Math.floor(range);

                // 増減率のテキスト表示
                $('[data-index=' + index + '].range').text(range + "%");

                // 増減率の絶対値が30以上なら赤、0なら黄色に変更
                if (Math.abs(range) >= 30) {
                    $('[data-index=' + index + '].range').addClass("text-danger");
                    $('[data-index=' + index + '].input_price').css('background-color', '#FC9592');
                } else if (Math.abs(range == 0)) {
                    $('[data-index=' + index + '].input_price').css('background-color','#FFFF00');
                }

            })
        })
    })

    // 表示するhtml
    function getRow(cnt, key, item, discount_price) {
        return `<div class="col-lg-2 col-md-2 col-sm-12 mb-4 mt-4 small">
        <div class="card">
            <div class="top_image" style="position: relative;">
                <img class="card-img-top" src=${item["src"]} data-index=${cnt}>
                <button type="button" tabindex="-1" style="position: absolute; top:0; left: 0;" class="btn btn-primary rounded-0 card_number" data-flag=1 data-index=${cnt}>${cnt}</button>
            </div>
            <div class="card-body p-1">
                <h6 class="card-title text-center py-1 mb-0">
                    <a href="javascript:void(0)" tabindex="-1" class="product_name" data-id=${item["ID"]} data-relist-url=${item["relist_url"]} data-url=${item["detail_URL"]} data-index=${cnt} onClick="window.open('${item["detail_URL"]}','sub','width=700,height=400,scrollbars=yes')">${item["product_name"].slice(0,40)}</a>
                </h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item py-1">終了日時<span class="end_time float-right" data-index=${cnt} >${item["end_time"]}</span></li>
                <li class="list-group-item py-1">管理番号<span class="float-right product_number" data-index=${cnt} data-clipboard-text="${key}">${key}</span></li>
                <li class="list-group-item py-1">アクセス<span class="float-right access" data-index=${cnt}>${item["access"]}</span></li>
                <li class="list-group-item py-1"><span class="">ウォッチ</span><span style="font-size: 1rem;" class="float-right watch font-weight-bold" data-index=${cnt}>${item["watch"]}</span></li>
                <li class="list-group-item py-1"><span class="">即決価格</span><span style="font-size: 1rem;" class="float-right font-weight-bold buyout_price" data-index=${cnt}>${Number(item["price"]).toLocaleString()}</span></li>
                <li class="list-group-item">
                    <form onsubmit="return false;">
                        <div class="form-group m-0">
                            <input type="text" class="form-control input_price text-right" style="font-weight: bold;" data-index=${cnt} value=${discount_price} placeholder="価格を入力">
                        </div>
                    </form>
                </li>
                <li class="list-group-item py-1">増減率<span class="float-right range" data-index=${cnt}></span></li>
            </ul>
        </div>
    </div>`;
    }
});
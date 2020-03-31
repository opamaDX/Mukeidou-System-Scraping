$(function () {

    // JSONファイルから情報を取得し、製品を表示する
    $.getJSON("items.json", function (items) {
        $.getJSON("price_list.json", function (price_list) {

            // htmlを追加する変数とカウンターを初期化
            var html = "";
            var price = 0;
            var cnt = 0;
            var discount_price = 0;

            // html要素を追加
            for (let key in items) {

                // 現在価格を取得
                price = items[key]["price"];

                // リストの長さを取得
                list_length = price_list["prices"].length;

                // 一段階下げた値段を取得
                for (var list_cnt = 0; list_cnt < list_length; list_cnt++) {
                    if (price == 980) {
                        discount_price = price;
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

        })
    })

    // 表示するhtml
    function getRow(cnt, key, item, discount_price) {
        return `<div class="col-lg-2 col-md-2 col-sm-12 mb-4 mt-4 small">
        <div class="card">
            <img class="card-img-top" src="img/parts.jpg">
            <div class="card-body p-1">
                <h6 class="card-title text-center py-1 mb-0">
                    <a href="javascript:void(0)" tabindex="-1" onClick="window.open('https://www.google.com/','sub','width=700,height=400,scrollbars=yes')">商品名(クリックで商品ページに遷移)</a>
                </h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item py-1">終了日時<span class="float-right">${item["end_time"]}</span></li>
                <li class="list-group-item py-1">管理番号<span class="float-right product_number" data-index=${cnt} data-clipboard-text="${key}">${key}</span></li>
                <li class="list-group-item py-1">アクセス<span class="float-right">60</span></li>
                <li class="list-group-item font-weight-bold py-1"><span class="text-danger">ウォッチ</span><span class="float-right watch" data-index=${cnt}>${cnt}</span></li>
                <li class="list-group-item font-weight-bold py-1"><span class="text-danger">即決価格</span><span class="float-right buyout_price" data-index=${cnt}>${item["price"]}</span></li>
                <li class="list-group-item">
                    <form>
                        <div class="form-group m-0">
                            <input type="text" class="form-control input_price" style="font-weight: bold;" data-index=${cnt} value=${discount_price} placeholder="価格を入力">
                        </div>
                    </form>
                </li>
                <li class="list-group-item py-1">増減率<span class="float-right">5%↑</span></li>
            </ul>
        </div>
    </div>`;
    }
});
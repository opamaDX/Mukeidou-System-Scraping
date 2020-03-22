$(function () {
    //テキストボックスのフォーカスが外れたら発火
    $("input").blur(function () {

        // テキストボックスの値を抽出
        var start_price = $("#input_price").val();
        var buyout_price = Number(start_price) + 2000;

        //開始価格の値を入力
        $("#start_price").text(start_price);

        // 即決価格の値を入力
        $("#buyout_price").text(buyout_price);

    });
});

// 動的に生成するHtmlCardを格納
var html_card = `<div class="col-lg-4 col-md-4 col-sm-12 mb-4 mt-4 small">
                    <div class="card">
                        <div class="row">
                            <div class="col-6">
                                <img class="card-img-top" src="img/parts.jpg">
                            </div>
                            <div class="col-6">
                                <div class="card-body p-1">
                                    <h6 class="card-title text-center mt-1">
                                        <a href="https://www.google.com/" tabindex="-1"
                                            target="_blank">★【S】良品♪GPz1100(空冷) 純正フューエルポンプ♪実働車取外♪</a>
                                    </h6>
                                </div>
                            </div>
                        </div>

                        <table class="table mb-0">
                            <tbody>
                                <tr>
                                    <td>品番</td>
                                    <td class="text-right">abcdef</td>
                                    <td>アクセス数</td>
                                    <td class="text-right">60</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>watch数</td>
                                    <td class="text-right">10</td>
                                    <td>現在価格</td>
                                    <td class="text-right">10000円</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>開始価格</td>
                                    <td class="text-right" id="start_price"></td>
                                    <td>即決価格</td>
                                    <td class="text-right" id="buyout_price"></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>開始日時</td>
                                    <td class="text-right">1/1 10:00</td>
                                    <td>終了日時</td>
                                    <td class="text-right">1/3 10:00</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>増減率</td>
                                    <td class="text-right">5%↑</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>

                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <form>
                                    <div class="form-group">
                                        <input type="text" id="input_price" class="form-control form-control-sm" placeholder="変更後の価格を入力">
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
</head>

<body>
    <!-- Cards -->
    <div class="container-fluid">
        <div class="col-md-12 ml-auto mr-auto">
            <div class="row .ml-0 .mr-0">

                <div class="col-lg-4 col-md-4 col-sm-12 mb-4 mt-4 small">
                    <div class="card">
                        <div class="row">
                            <div class="col-6">
                                <img class="card-img-top" src="img/parts.jpg">
                            </div>
                            <div class="col-6">
                                <div class="card-body p-1">
                                    <h6 class="card-title mt-1">
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
                                        <input id="input_price" type="text" class="form-control form-control-sm"
                                            placeholder="変更後の価格を入力">
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-12 mb-4 mt-4 small">
                    <div class="card">
                        <div class="row">
                            <div class="col-6">
                                <img class="card-img-top" src="img/parts.jpg">
                            </div>
                            <div class="col-6">
                                <div class="card-body p-1">
                                    <h6 class="card-title text-center mt-1">
                                        <a href="https://www.google.com/" tabindex="-1"
                                            target="_blank">商品名<br>(クリックで商品ページに遷移)</a>
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
                                    <td class="text-right">5000円</td>
                                    <td>即決価格</td>
                                    <td class="text-right">15000円</td>
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
                                        <input type="text" class="form-control form-control-sm" placeholder="変更後の価格を入力">
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- カード複数表示 -->
                <?php for ($cnt = 0; $cnt <= 30; $cnt++) {?>
                <div class="col-lg-4 col-md-4 col-sm-12 mb-4 mt-4 small">
                    <div class="card">
                        <div class="row">
                            <div class="col-6">
                                <img class="card-img-top" src="img/parts.jpg">
                            </div>
                            <div class="col-6">
                                <div class="card-body p-1">
                                    <h6 class="card-title text-center mt-1">
                                        <a href="https://www.google.com/" tabindex="-1"
                                            target="_blank">商品名<br>(クリックで商品ページに遷移)</a>
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
                                    <td class="text-right">5000円</td>
                                    <td>即決価格</td>
                                    <td class="text-right">15000円</td>
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
                                        <input type="text" class="form-control form-control-sm" placeholder="変更後の価格を入力">
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
                <?php }?>

            </div>
        </div>
    </div>
</body>

</html>

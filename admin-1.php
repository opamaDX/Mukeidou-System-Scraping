<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <!-- Cards -->
    <div class="container-fluid">
        <div class="col-md-12 ml-auto mr-auto">
            <div class="row .ml-0 .mr-0">

                <div class="col-lg-2 col-md-2 col-sm-12 mb-4 mt-4 small">
                    <div class="card">
                        <img class="card-img-top" src="img/parts.jpg">
                        <div class="card-body p-1">
                            <h6 class="card-title text-center">
                                <a href="https://www.google.com/" tabindex="-1" target="_blank">商品名<br>(クリックで商品ページに遷移)</a>
                            </h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">品番<span class="float-right">abcdef</span></li>
                            <li class="list-group-item">アクセス数<span class="float-right">60</span></li>
                            <li class="list-group-item">watch数<span class="float-right">10</span></li>
                            <li class="list-group-item">現在価格<span class="float-right">10000円</span></li>
                            <li class="list-group-item">開始価格<span class="float-right">5000円</span></li>
                            <li class="list-group-item">即決価格<span class="float-right">15000円</span></li>
                            <li class="list-group-item">開始日時<span class="float-right">1/1 10:00</span></li>
                            <li class="list-group-item">終了日時<span class="float-right">1/3 10:00</span></li>
                            <li class="list-group-item">増減率<span class="float-right">5%↑</span></li>
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

                <div class="col-lg-2 col-md-2 col-sm-12 mb-4 mt-4 small">
                    <div class="card">
                        <img class="card-img-top" src="img/parts.jpg">
                        <div class="card-body p-1">
                            <h6 class="card-title text-center">
                                <a href="https://www.google.com/" tabindex="-1" target="_blank">商品名<br>(クリックで商品ページに遷移)</a>
                            </h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">品番<span class="float-right">abcdef</span></li>
                            <li class="list-group-item">アクセス数<span class="float-right">60</span></li>
                            <li class="list-group-item">watch数<span class="float-right">10</span></li>
                            <li class="list-group-item">現在価格<span class="float-right">10000円</span></li>
                            <li class="list-group-item">開始価格<span class="float-right">5000円</span></li>
                            <li class="list-group-item">即決価格<span class="float-right">15000円</span></li>
                            <li class="list-group-item">開始日時<span class="float-right">1/1 10:00</span></li>
                            <li class="list-group-item">終了日時<span class="float-right">1/3 10:00</span></li>
                            <li class="list-group-item">増減率<span class="float-right">5%↑</span></li>
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
                <?php for ( $cnt = 0; $cnt <= 30; $cnt++ ) { ?>
                <div class="col-lg-2 col-md-2 col-sm-12 mb-4 mt-4 small">
                    <div class="card">
                        <img class="card-img-top" src="img/parts.jpg">
                        <div class="card-body p-1">
                            <h6 class="card-title text-center">
                                <a href="https://www.google.com/" tabindex="-1" target="_blank">商品名<br>(クリックで商品ページに遷移)</a>
                            </h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">品番<span class="float-right">abcdef</span></li>
                            <li class="list-group-item">アクセス数<span class="float-right">60</span></li>
                            <li class="list-group-item">watch数<span class="float-right">10</span></li>
                            <li class="list-group-item">現在価格<span class="float-right">10000円</span></li>
                            <li class="list-group-item">開始価格<span class="float-right">5000円</span></li>
                            <li class="list-group-item">即決価格<span class="float-right">15000円</span></li>
                            <li class="list-group-item">開始日時<span class="float-right">1/1 10:00</span></li>
                            <li class="list-group-item">終了日時<span class="float-right">1/3 10:00</span></li>
                            <li class="list-group-item">増減率<span class="float-right">5%↑</span></li>
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
                <?php } ?>

            </div>
        </div>
    </div>
</body>

</html>
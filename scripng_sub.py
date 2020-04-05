from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import time
import json
from time import sleep
from datetime import datetime

driver = webdriver.Chrome()
# driver.get('file:///C:/workspace/mukeidou/必要なもの/code1.html')
driver.get('https://order.auctions.yahoo.co.jp/jp/show/mystatus?select=closed&hasWinner=0')
driver.maximize_window()

driver.find_element_by_id('username').send_keys("mukeidou")
driver.find_element_by_id('btnNext').click()
sleep(2)
driver.find_element_by_id('passwd').send_keys("n@748sps")
driver.find_element_by_id('btnSubmit').click()
sleep(3)

# 使用する変数を定義する
url_lists             = []
table_tr_number       = 2  # xpathのtableのtrが2段落目からなので値を2に設定
product_min_number    = 0
next_page_link_number = 1  # xpathのtableのtdの値が1からなので値を1に設定

# 落札者なしの全件数を取得
product_max_number = int(driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[1]/tbody/tr[2]/td/b[1]').text)

# 自由に時間を設定することができる
current_time = datetime.now()
# first_time   = datetime(current_time.year, current_time.month, current_time.day, 20)
# last_time    = datetime(current_time.year, current_time.month, current_time.day, 21)
first_time   = datetime(2020, 4, 4, 20)
last_time    = datetime(2020, 4, 4, 21)


# 落札者なしで終了日時を20時から21時に条件分岐したurlをすべて取得
# for文で回しても取得することができる可能性がある
# while product_min_number < product_max_number:
while product_min_number < 5:

    # 1ページ目のurl獲得が終了したら次のページに遷移する
    if table_tr_number > 51:
        table_tr_number = 2
        
        next_page_link_url = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[2]/tbody/tr/td[1]/a[' + str(next_page_link_number) + ']')
        next_page_link_url.click()
        sleep(3)
        
        next_page_link_number += 1

    # 終了日時の値をxpathから取得し、条件で絞るためにdatetime型に変換
    end_time          = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[3]/td/form/table[1]/tbody/tr[' + str(table_tr_number) + ']/td[5]').text
    tmp               = str(current_time.year) + '年' + end_time
    within_range_time = datetime.strptime(tmp, '%Y年%m月%d日 %H時%M分')
    
    # 終了日時で当日の20時から21時の条件で絞ったurlを一つずつリストに格納
    # if within_range_time >= first_time and within_range_time <= last_time:

    url_item = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[3]/td/form/table[1]/tbody/tr[' + str(table_tr_number) + ']/td[3]/a').get_attribute('href')
    url_lists.append(url_item)
        
    table_tr_number    += 1
    product_min_number += 1

# 何件失敗したかを表示
error_number = 0
# 辞書の定義
product_lists = {}
# 全角半角の定義
ZEN = "".join(chr(0xff01 + i) for i in range(94))
HAN = "".join(chr(0x21 + i) for i in range(94))

ZEN2HAN = str.maketrans(ZEN, HAN)
HAN2ZEN = str.maketrans(HAN, ZEN)

# 商品のurlにアクセスし、商品の詳細な情報を取得しJSON形式で出力する
# 例外処理が発生した時はその商品のデータを飛ばし次の商品のデータに移行
for url in url_lists:
    try:
        # urlを開く
        driver.get(url)

        # footerを待つ
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.ID, 'footer')))

        # 辞書の定義
        product_list = {}
        # 詳細ページのURL
        detail_URL = url

        # elementの取得

        # value = driver.find_element_by_xpath('//*[@id="modPdtInfoB"]/div[2]/table[1]/tbody/tr/td[2]/div[2]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/p[1]').text.replace("円", "")
        # value = driver.find_element_by_css_selector('.decTxtBuyPrice').text.replace("円", "")

        # JavaScriptから取得
        # 価格
        price      = driver.execute_script("return pageData.items.price")
        # price      = driver.find_element_by_xpath('//*[@id="modPdtInfoB"]/div[2]/table[1]/tbody/tr/td[2]/div/table/tbody/tr[1]/td[2]/table/tbody/tr/td/p[1]').text
        # 開始日時
        start_time = driver.execute_script("return pageData.items.starttime")
        # start_time = driver.find_element_by_xpath('//*[@id="modPdtInfoB"]/div[2]/table[2]/tbody/tr/td[2]/div/table/tbody/tr[4]/td[2]').text
        # 終了日時
        end_time   = driver.execute_script("return pageData.items.endtime")
        # end_time   = driver.find_element_by_xpath('//*[@id="modPdtInfoB"]/div[2]/table[2]/tbody/tr/td[2]/div/table/tbody/tr[5]/td[2]').text
        # オークションID
        ID         = driver.execute_script("return pageData.items.productID")
        # ID         = driver.find_element_by_xpath('//*[@id="modPdtInfoB"]/div[2]/table[2]/tbody/tr/td[2]/div/table/tbody/tr[9]/td[2]').text
        product_name = driver.execute_script("return pageData.items.productName")
        # xpath
        
        # アクセス総数の数値
        access       = driver.find_element_by_xpath('//*[@id="l-sub"]/div[1]/ul/li[2]/dl/dd/ul/li[1]/span[2]').text
        # ウォッチリストに追加された数値
        watch        = driver.find_element_by_xpath('//*[@id="l-sub"]/div[1]/ul/li[2]/dl/dd/ul/li[2]/span[2]').text
        # 再出品URL
        relist_url   = driver.find_element_by_xpath('//*[@id="l-contentsHead"]/div[2]/div[2]/p/a').get_attribute('href')
        # 商品名
        get_product_name = driver.find_element_by_xpath('//*[@id="adoc"]/div[2]/div[2]/div/center/font').text.split('※')[1]
        product_id = get_product_name.translate(ZEN2HAN)
        # 画像のsrc
        src        = driver.find_element_by_xpath('//*[@id="l-main"]/div/div[1]/div[1]/ul/li[1]/div/img').get_attribute('src')
        # 商品の項目ディクショナリ
        product_list["ID"]            = ID
        product_list["product_name"]  = product_name
        product_list["price"]         = price
        product_list["start_time"]    = start_time
        product_list["end_time"]      = end_time
        product_list["src"]           = src
        product_list["access"]        = access
        product_list["watch"]         = watch
        product_list["detail_URL"]    = detail_URL
        product_list["relist_url"]    = relist_url

        # 商品一覧ディクショナリ
        product_lists[product_id] = product_list
        # product_lists[ID] = product_list
        print(product_lists)

        sleep(3)
            
    except:
        # 例外処理が発生した場合にその商品のIDを表示エラー件数を1増やす
        print(ID)
        error_number += 1
        sleep(3)
        pass

# 受け取った値をjson形式のファイルに格納してファイルを閉じる
fw = open('items.json', 'w', encoding = 'utf-8')
json.dump(product_lists, fw, ensure_ascii = False, indent = 4)
fw.close()

print('エラー' + str(error_number) + '件')
driver.quit()
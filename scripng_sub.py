from selenium import webdriver
import time
import json
from time import sleep
from datetime import datetime

driver = webdriver.Chrome()
driver.get('file:///C:/git/必要なもの/code1.html')

# 使用する変数を定義する
url_lists             = []
table_tr_number       = 2
product_min_number    = 0
next_page_link_number = 1

# 落札者なしの全件数を取得
product_max_number = int(driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[1]/tbody/tr[2]/td/b[1]').text)

current_time = datetime.now()
first_time   = datetime(current_time.year, current_time.month, current_time.day, 20)
last_time    = datetime(current_time.year, current_time.month, current_time.day, 21)

# 落札者なしで終了日時を条件分岐したurlをすべて取得
# while product_min_number < product_max_number:
while product_min_number < 5:

    # 1ページ目のurl獲得が終了したら次のページに遷移する
    if table_tr_number > 51:
        table_tr_number = 2
        
        # 次のページに移動
        next_page_link_url = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[2]/tbody/tr/td[1]/a[' + str(next_page_link_number) + ']')
        next_page_link_url.click()
        # 次のページに遷移後、5秒待機
        sleep(3)
        
        next_page_link_number += 1

    # 終了日時の値をxpathから取得
    end_time          = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[3]/td/form/table[1]/tbody/tr[' + str(table_tr_number) + ']/td[5]').text
    # 終了日時の時間を条件で絞るためにdatetime型に変換
    end_time          = str(current_time.year) + '年' + end_time
    within_range_time = datetime.strptime(end_time, '%Y年%m月%d日 %H時%M分')
    
    # 終了日時で当日の20時から21時の条件で絞ったurlを一つずつリストに格納
    # if within_range_time >= first_time and within_range_time <= last_time:
    url_item = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[3]/td/form/table[1]/tbody/tr[' + str(table_tr_number) + ']/td[3]/a').get_attribute('href')
    url_lists.append(url_item)
        
    table_tr_number    += 1
    product_min_number += 1
        
# 辞書の定義
product_lists = {}

for url in url_lists:
    
    # urlを開く
    driver.get(url)
    # urlにアクセスする間前に5秒待機
    sleep(5)

    # 辞書の定義
    product_list = {}

    # img = driver.find_element_by_id('acMdThumPhoto')

    # elementの取得

    # value = driver.find_element_by_xpath('//*[@id="modPdtInfoB"]/div[2]/table[1]/tbody/tr/td[2]/div[2]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/p[1]').text.replace("円", "")
    # value = driver.find_element_by_css_selector('.decTxtBuyPrice').text.replace("円", "")

    # JavaScriptから取得
    # 価格
    price      = driver.execute_script("return pageData.items.price")
    # 開始日時
    start_time = driver.execute_script("return pageData.items.starttime")
    # 終了日時
    end_time   = driver.execute_script("return pageData.items.endtime")

    ID         = driver.execute_script("return pageData.items.productID")
    # xpath
    # # アクセス総数テキスト
    # access_text  = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[1]/th').text
    # # アクセス総数の数値
    # access       = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[1]/td').text.split(' ')[1]
    # # ウォッチリストに追加された数テキスト
    # watch_text   = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[2]/th').text
    # # ウォッチリストに追加された数値
    # watch        = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[2]/td').text.split(' ')[1]
    # # 再出品URL
    # relist_url            = driver.find_element_by_xpath('//*[@id="modAlertBox"]/div/div/div/div/div/div/div/div[1]/p/strong/a').get_attribute('href')
    # 商品名
    # product_name = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[2]/table/tbody/tr[2]/td').text.split(' ')[1]

    # 商品の項目ディクショナリ
    product_list["price"]         = price
    product_list["start_time"]    = start_time
    product_list["end_time"]      = end_time
    # product_list["access_text"] = access_text
    # product_list["access"]      = access
    # product_list["watch_text"]  = watch_text
    # product_list["watch"]       = watch
    # product_list["url"]           = relist_url

    # 商品一覧ディクショナリ
    # product_lists[product_name] = product_list
    product_lists[ID] = product_list

# JSONに出力
fw = open('items.json', 'w', encoding = 'utf-8')
json.dump(product_lists, fw, ensure_ascii = False, indent = 4)
fw.close()
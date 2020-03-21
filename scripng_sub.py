from selenium import webdriver
from time import sleep
import json

driver = webdriver.Chrome()
driver.get('file:///C:/test/scripng/code1.html')

# 使用する変数を定義する
url_lists                 = []
table_tr_number           = 2
number_exhibitions_first  = 0
# b = 1
number_exhibitions_max_value   = int(driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[1]/tbody/tr[2]/td/b[1]').text)

# urlにアクセスしてから5秒待機
sleep(3)

# 落札者なしで終了時間を条件分岐したurlをすべて取得
# while number_exhibitions_first < number_exhibitions_max_value:
while number_exhibitions_first < 50:
    time = ''
    # 1ページ目のurl獲得が終了したら次のページに遷移する
    if table_tr_number > 51:
        table_tr_number = 2
        # a = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[2]/tbody/tr/td[1]/a[' + str(b) + ']')
        # a.click()
        # 次のページに行く前に5秒待機
        sleep(3)
        # b += 1

    # xpathを通して、urlを一つずつリストに格納
    # ここに終了時間の条件分岐を入れる
    # time_limit = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[3]/td/form/table[1]/tbody/tr[' + str(table_tr_number) + ']/td[5]')

    # time_limit = time_limit.text.split()

    # time_limit = time_limit[1]

    # for i in time_limit:
    #     if str.isnumeric(i):
    #         time = time + i
    
    # if len(time) < 4:
    #     number = time[0] + time[1]
    #     if int(number) < 24:
    #         man = float(time) / 10
    #     else:
    #         man = float(time) / 100
    # else:    
    #     man = float(time) / 100
    
    # if man >= 20.00 and man <= 21.00: 
    url_item = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[3]/td/form/table[1]/tbody/tr[' + str(table_tr_number) + ']/td[3]/a').get_attribute('href')
    url_lists.append(url_item)
        
    table_tr_number          += 1
    number_exhibitions_first += 1
        
for url in url_lists:

    driver.get(url)
    # urlにアクセスしてから5秒待機
    sleep(5)
    
    # # 辞書の定義
    product_lists = {}
    product_list = {}

    # img = driver.find_element_by_id('acMdThumPhoto')


    # elementの取得

    # value = driver.find_element_by_xpath('//*[@id="modPdtInfoB"]/div[2]/table[1]/tbody/tr/td[2]/div[2]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/p[1]').text.replace("円", "")
    # value = driver.find_element_by_css_selector('.decTxtBuyPrice').text.replace("円", "")

    # JavaScriptから取得
    # 価格
    price = driver.execute_script("return pageData.items.price")
    # 開始日時
    start_time = driver.execute_script("return pageData.items.starttime")
    # 終了日時
    end_time = driver.execute_script("return pageData.items.endtime")

    ID = driver.execute_script("return pageData.items.productID")
    # xpath
    # # アクセス総数テキスト
    # access_text = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[1]/th').text
    # # アクセス総数の数値
    # access = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[1]/td').text.split(' ')[1]
    # # ウォッチリストに追加された数テキスト
    # watch_text = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[2]/th').text
    # # ウォッチリストに追加された数値
    # watch = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[2]/td').text.split(' ')[1]
    # 商品名
    # product_name = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[2]/table/tbody/tr[2]/td').text.split(' ')[1]

    # 商品の項目ディクショナリ
    product_list["price"] = price
    product_list["start_time"] = start_time
    product_list["end_time"] = end_time
    # product_list["access_text"] = access_text
    # product_list["access"] = access
    # product_list["watch_text"] = watch_text
    # product_list["watch"] = watch

    # 商品一覧ディクショナリ
    # product_lists[product_name] = product_list
    product_lists[ID] = product_list

    # JSONに出力
    fw = open('items.json','a+', encoding = 'utf-8')
    json.dump(product_lists, fw, ensure_ascii=False)
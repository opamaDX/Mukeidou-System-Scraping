from selenium import webdriver
from selenium.webdriver.support.ui import Select
import json
import time

driver = webdriver.Chrome()
driver.get('file:///C:/git/必要なもの/code-出品画面.html')

# 編集したjson形式のファイルを開く
json_file   = open('items.json', 'r', encoding = 'utf-8')
edit_object = json.load(json_file)

for key in edit_object:
    # オークションIDを参照してURLを開く
    # driver.get(edit_object[key]['url'])
    
    # urlを開いてから5秒待機
    time.sleep(5)

    # 初めのボタンクリック
    driver.find_element_by_id('auc_insertion_ok').click()

    #オークションID取得
    ID = driver.find_element_by_name('aID').get_attribute('value')

    # 即決価格を選択
    price = driver.find_element_by_id('auc_BidOrBuyPrice')
    # 即決価格削除
    price.clear()
    # 即決価格修正
    driver.find_element_by_id('auc_BidOrBuyPrice').send_keys(edit_object[ID]["price"])

    #ドロップダウン
    # 普通に取得する
    closing_time = driver.find_element_by_id('ClosingTime')

    # 取得したエレメントをSelectタグに対応したエレメントに変化させる
    closing_time_select = Select(closing_time)

    # 選択したいvalueを指定する
    closing_time_select.select_by_value('21')

    # 確認画面へ
    # driver.find_element_by_id('auc_submit1').click()
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import json
import time

driver = webdriver.Chrome()

# 編集したjson形式のファイルを開く
json_file   = open('edit.json', 'r', encoding = 'utf-8')
edit_object = json.load(json_file)

error_number = 0
auction_id   = ''

for key in edit_object:
    try:
        # オークションIDを参照してURLを開く
        driver.get(edit_object[key]['url'])
        # 画面最大化
        driver.maximize_window()
        
        # ボタンが表示されるまで待機
        wait = WebDriverWait(driver, 10)
        wait.until(EC.element_to_be_clickable((By.ID, 'auc_insertion_ok')))

        # 初めのボタンクリック
        driver.find_element_by_id('auc_insertion_ok').click()
        #オークションID取得
        ID         = driver.find_element_by_name('aID').get_attribute('value')
        auction_id = ID

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
        driver.find_element_by_id('auc_submit1').click()

        time.sleep(3)
    # 今現在全ての例外処理に対応しているので対応した例外処理に変更する
    except:
        print(auction_id)
        error_number += 1
        print('Error : ' + error_number)
        pass

json_file.close()
driver.quit()
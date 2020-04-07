from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import json
import time
from time import sleep

driver = webdriver.Chrome()

# 編集したjson形式のファイルを開く
json_file   = open('edit.json', 'r', encoding = 'utf-8')
edit_object = json.load(json_file)

hour = edit_object["select_value"]
error_number = 0
id_pass = True

# 例外処理が発生した時はその商品のデータを飛ばし次の商品に移行
for key in edit_object:
    if key != "select_value":
        try:
            # オークションIDを参照してURLを開く
            driver.get(edit_object[key]['relist_url'])
            # 画面最大化
            driver.maximize_window()

            if id_pass == True:
                driver.find_element_by_id('username').send_keys("")
                driver.find_element_by_id('btnNext').click()
                sleep(2)
                driver.find_element_by_id('passwd').send_keys("")
                driver.find_element_by_id('btnSubmit').click()
                sleep(3)
            
            # ボタンが表示されるまで待機
            wait = WebDriverWait(driver, 10)
            wait.until(EC.element_to_be_clickable((By.ID, 'auc_insertion_ok')))

            # 初めのボタンクリック
            driver.find_element_by_id('auc_insertion_ok').click()
            #オークションID取得
            # ID         = driver.find_element_by_name('aID').get_attribute('value')

            # 即決価格を選択
            price = driver.find_element_by_id('auc_BidOrBuyPrice')
            # 即決価格削除
            price.clear()
            # 即決価格修正
            driver.find_element_by_id('auc_BidOrBuyPrice').send_keys(edit_object[key]["price"])
            #ドロップダウン
            # 普通に取得する
            closing_time = driver.find_element_by_id('ClosingTime')

            # 取得したエレメントをSelectタグに対応したエレメントに変化させる
            closing_time_select = Select(closing_time)

            # 選択したいvalueを指定する
            closing_time_select.select_by_value(hour)

            # 確認画面へ
            # driver.find_element_by_id('auc_submit1').click()

            id_pass = False
            time.sleep(3)
    # 今現在全ての例外処理に対応しているので対応した例外処理に変更する
        except:
            print(edit_object[key]['id'])
            error_number += 1
            sleep(3)
            pass

json_file.close()
print('エラー' + str(error_number) + '件')
driver.quit()
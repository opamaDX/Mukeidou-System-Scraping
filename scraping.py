from selenium import webdriver
import json

driver = webdriver.Chrome()
driver.get('file:///C:/workspace/mukeidou/必要なもの/code-詳細.html')


# 辞書の定義
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

# xpath
# アクセス総数テキスト
access_text = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[1]/th').text
# アクセス総数の数値
access = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[1]/td').text.split(' ')[1]
# ウォッチリストに追加された数テキスト
watch_text = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[2]/th').text
# ウォッチリストに追加された数値
watch = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[1]/table/tbody/tr[2]/td').text.split(' ')[1]
# 商品名
product_name = driver.find_element_by_xpath('//*[@id="modSellInfoB"]/div[2]/div[2]/table/tbody/tr[2]/td').text.split(' ')[1]

# 商品の項目ディクショナリ
product_list["price"] = price
product_list["start_time"] = start_time
product_list["end_time"] = end_time
product_list["access_text"] = access_text
product_list["access"] = access
product_list["watch_text"] = watch_text
product_list["watch"] = watch

# 商品一覧ディクショナリ
product_lists[product_name] = product_list

# JSONに出力
fw = open('items.json','w', encoding = 'utf-8')
json.dump(product_lists, fw, indent=4, ensure_ascii=False)


# でバック
print(product_lists)

# 閉じる
# driver.close()
# driver.quit()
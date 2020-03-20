from selenium import webdriver
import time
import json

driver = webdriver.Chrome()
driver.get('file:///C:/test/scripng/code1.html')

# HTMLを文字エンコードをUTF-8に変換してから取得する
html = driver.page_source.encode('utf-8')

# 使用する変数を定義する
url_lists                 = []
table_tr_number           = 2
number_exhibitions_first  = 0
# b = 1
number_exhibitions_max_value   = int(driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[1]/tbody/tr[2]/td/b[1]').text)

# 落札者なしで終了時間を条件分岐したurlをすべて取得
# while number_exhibitions_first < number_exhibitions_max_value:
while number_exhibitions_first < 50:
    time = ''
    # 1ページ目のurl獲得が終了したら次のページに遷移する
    if table_tr_number > 51:
        table_tr_number = 2
        # a = driver.find_element_by_xpath('//*[@id="acWrContents"]/div/table/tbody/tr/td/table/tbody/tr[2]/td/table[2]/tbody/tr/td[1]/a[' + str(b) + ']')
        # a.click()
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

print(url_lists)
        
for url in url_lists:
    driver.get(url)
    time.sleep(5)
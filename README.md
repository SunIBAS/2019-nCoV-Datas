# 2019-nCoV-Datas

疫情每日数据记录

> 今日开始加入处理才知道数据获取很难，今后一定要及时掌握数据

- source 是原始数据，数据来源如下

> 其中 all.txt 是项目中的 Wuhan-2019-nCoV.csv 文件，但是根据 ISSUE 反馈，从 1-31 开始数据就出现问题，估计是爬取对象修改了接口

> csvFile 文件为项目的 DXYArea.csv 文件，爬取方式是每天定时爬取，也可以从 commits 中获取历史项目

> jsonFile 是我的服务器每日定时(每十分钟)写一个文件(mm-dd.json)进行覆盖，并每日留有最后一份。

|数据|来源|
|:--|:--|
|all.txt|[GitHub项目：Wuhan-2019-nCoV](https://github.com/canghailan/Wuhan-2019-nCoV)|
|csvFile\所有csv|[GitHub项目：DXY-2019-nCoV-Data](https://github.com/BlankerL/DXY-2019-nCoV-Data)|
|jsonFile\所有json|百度疫情地图|

- 脚本说明

|脚本|说明|
|:--|:--|
|source\dear_all.js|用于处理 all.txt 文件|
|source\dearCsv.js|用于处理 csvFile 中的文件|
|source\dearJson.js|用于处理 jsonFile 中的文件|
|getChinaChange.js|用于获取截至到目前为止最新的疫情统计数据(全国)|
|downCsv.sh|定时任务脚本，但是要自己设定，设定方式在#里|

- [行政代码](http://www.mca.gov.cn/article/sj/xzqh/2019/)

- 最后附带一些其他资料

> [AkShare](https://akshare.readthedocs.io/zh_CN/latest/index.html)

> [AkShare 事件数据](https://github.com/jindaxiang/akshare/blob/4434da3af4ea7a3a7b73d2e95b6a1a654c8f5ae3/docs/source/data/event/event.md)
# 项目名称

（免费资源）基于微信小程序的小说阅读系统设计与实现毕业论文+前后台源码+答辩PPT+运行说明

# 系统介绍
微书是一款基于微信小城序的小说阅读系统，书城数据库使用mongodb存储，书城数据使用nodejs爬虫从网络上爬取，并使用loopback作为后端接口框架。功能上，微信实现以下5个模块，分别是我的书架、书城、个人心中、H5阅读器、登录注册。这些模块中又存在许多子模块，互相连接和配合，为用户提供便捷和舒适的阅读体验，让用户能更简单并且不付费的读到自己想读的书籍。除此之外微书还支持书评以及查看书籍排行榜，帮助用户从浩瀚的书海中找到自己喜欢的书。本论文将介绍所设计的微书，并对本系统进行数据分析和设计。

# 环境需要

1.运行环境：最好是java jdk 1.8，我们在这个平台上运行的。其他版本理论上也可以。\
2.IDE环境：IDEA，Eclipse,Myeclipse都可以。推荐IDEA;\
3.tomcat环境：Tomcat 7.x,8.x,9.x版本均可\
4.硬件环境：windows 7/8/10 1G内存以上；或者 Mac OS； \
5.数据库：MySql 5.7版本；\
6.是否Maven项目：否；

# 技术栈

1. 后端：Spring+SpringMVC+Mybatis\
2. 前端：JSP+CSS+JavaScript+jQuery

# 使用说明

1. 使用Navicat或者其它工具，在mysql中创建对应名称的数据库，并导入项目的sql文件；\
2. 使用IDEA/Eclipse/MyEclipse导入项目，Eclipse/MyEclipse导入时，若为maven项目请选择maven;\
若为maven项目，导入成功后请执行maven clean;maven install命令，然后运行；\
3. 将项目中springmvc-servlet.xml配置文件中的数据库配置改为自己的配置;\
4. 运行项目，在浏览器中输入http://localhost:8080/ 登录

#完整文档演示

https://ym.maptoface.com/archives/17994


​
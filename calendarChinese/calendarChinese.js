/**
 * 农历模块操作 可以进行农历计算 可以运行于各种浏览器
 * **/
var calendarChinese = {
    /**
     * 配置数据及对象
     * **/
    config: {
        time:null,//计算的时间的时间戳,即需要返回农历的时间
        dateJson:null,//返回农历日期json数据
    },
    /**
     * 获取农历年月日及节假日
     * @param time int;//时间戳,不传或为undefined则取当前时间戳
     * return json;
     json = {
      year,//农历年
      month,//农历月
      day,//农历日
      festival,//节日
      week,//周几
      toMDStr,//月日
      toStr //农历年月日
      }
     * **/
    getChineseDate:function (time) {

        var date = time == undefined ? new Date() : new Date(time);
        calendarChinese.config.time = date.getTime();

        var dateJson = {
            time:calendarChinese.config.time,//时间戳
            year:calendarChinese.cnYearofDate(date),//农历年
            month:calendarChinese.cnMonthofDate(date),//农历月
            day:calendarChinese.cnDayofDate(date),//农历日
            week:date.getDay(),//周几
            festival:'',//法定放假节假日
            toStr:'',//农历年月日字符串
            toMDStr:''//农历月日字符串
        };
        dateJson.toMDStr = dateJson.month + dateJson.day;
        dateJson.toStr = dateJson.year + " " + dateJson.month + dateJson.day;
        calendarChinese.config.dateJson = dateJson;

        dateJson.festival = calendarChinese.getFestival(dateJson.toMDStr);

        return dateJson;
    },
    /**
     * 获取法定放假节日
     * @param dateMDString string;//农历月日
     * return 农历节日
     * **/
    getFestival:function (dateMDString) {
        var cdate = new Date(calendarChinese.config.time + 86400000);
        var mDStrG = (cdate.getMonth() + 1) + ":" + (cdate.getDate() - 1);
        var mDStr = calendarChinese.cnMonthofDate(cdate)
            + calendarChinese.cnDayofDate(cdate);

        if(mDStr == "正月初一")
        {
            return "除夕";
        }
        else if(dateMDString == "正月初一"
            || dateMDString == "正月初二"
            || dateMDString == "正月初三"
            || dateMDString == "正月初四"
            || dateMDString == "正月初五"
            || dateMDString == "正月初六"
            || dateMDString == "正月初七")
        {
            return "春节";
        }
        else if(dateMDString == "五月初五")
        {
            return "端午节";
        }
        else if(dateMDString == "八月十五")
        {
            return "中秋节";
        }
        else if(mDStrG == "1:1")
        {
            return "元旦节";
        }
        else if(mDStrG == "5:1")
        {
            return "劳动节";
        }
        else if(mDStrG == "10:1")
        {
            return "国庆节";
        }
        else if(mDStrG == "4:5")
        {
            return "清明节";
        }
        else
        {
            return calendarChinese.getWeekChinese(calendarChinese.config.dateJson.week);
        }

    },
    /**
     * 获取星期几
     * @param tag int,//date对象中星期几的值
     * return 周六/周日的中文，其他时间返回空字符
     * **/
    getWeekChinese:function (tag){

        var d = "";

        switch (tag)
        {
            case 0:
            {
                d = "日";
                break;
            }
            case 6:
            {
                d = "六";
                break;
            }
            default :
            {
                d = '';
                break;
            }
        }

        d = d == "" ? "" : "周" + d;

        return d;
    },


    /**
     * 获取农历时节
     * @param dateGL Date;//传入时间的Date的对象
     * return 农历时节
     * **/
    solarTerm:function(dateGL) {
        var SolarTermStr = new Array(
            "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
            "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
            "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
            "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
        var DifferenceInMonth = new Array(
            1272060, 1275495, 1281180, 1289445, 1299225, 1310355,
            1321560, 1333035, 1342770, 1350855, 1356420, 1359045,
            1358580, 1355055, 1348695, 1340040, 1329630, 1318455,
            1306935, 1297380, 1286865, 1277730, 1274550, 1271556);
        var DifferenceInYear = 31556926;
        var BeginTime = new Date(1901 / 1 / 1);
        BeginTime.setTime(947120460000);
        for (; dateGL.getFullYear() < BeginTime.getFullYear();) {
            BeginTime.setTime(BeginTime.getTime() - DifferenceInYear * 1000);
        }
        for (; dateGL.getFullYear() > BeginTime.getFullYear();) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInYear * 1000);
        }
        for (var M = 0; dateGL.getMonth() > BeginTime.getMonth(); M++) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
        }
        if (dateGL.getDate() > BeginTime.getDate()) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
            M++;
        }
        if (dateGL.getDate() > BeginTime.getDate()) {
            BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
            M == 23 ? M = 0 : M++;
        }
        var JQ;
        if (dateGL.getDate() == BeginTime.getDate()) {
            JQ = "　 今天是<font color='#FF9999'><b>" + SolarTermStr[M] + "</b></font>";
        } else if (dateGL.getDate() == BeginTime.getDate() - 1) {
            JQ = "　 明天是<font color='#FF9999'><b>" + SolarTermStr[M] + "</b></font>";
        } else if (dateGL.getDate() == BeginTime.getDate() - 2) {
            JQ = "　 后天是<font color='#FF9999'><b>" + SolarTermStr[M] + "</b></font>";
        } else {
            JQ = " "
            if (dateGL.getMonth() == BeginTime.getMonth()) {
                JQ += "　 本月";
            } else {
                JQ += "　 下月";
            }
            JQ += BeginTime.getDate() + "日" + "<font color='#FF9999'><b>" + SolarTermStr[M] + "</b></font>";
        }
        return JQ;
    },
    /**
     * 获取农历年月日
     * @param dateGL Date;//传入时间的Date的对象
     * return 农历年月日
     * **/
    cnDateofDateStr:function (dateGL) {
        if (calendarChinese.cnMonthofDate(dateGL) == "零月")
        {
            return "　请调整您的计算机日期!";
        }
        else
        {
            // alert(CnDayofDate(dateGL))
            return "农历：" + calendarChinese.cnYearofDate(dateGL) + " "
                + calendarChinese.cnMonthofDate(dateGL)
                + calendarChinese.cnDayofDate(dateGL);
        }
    },
    /**
     * 获取农历的年份名称
     * @param yyyy int ;//当年距离1864年多少年的数字
     * return 农历的年份名称
     * **/
    cnEra:function (yyyy) {
        var Tiangan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
        // var Dizhi=new Array("子(鼠)","丑(牛)","寅(虎)","卯(兔)","辰(龙)","巳(蛇)",
        // "午(马)","未(羊)","申(猴)","酉(鸡)","戌(狗)","亥(猪)");
        var Dizhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
        return Tiangan[yyyy % 10] + Dizhi[yyyy % 12];
    },
    /**
     * 获取本月的天数（公历）
     * @param dateGL Date;//传入时间的Date的对象
     * return 本月的天数
     * **/
    daysNumberofMonth:function(dateGL) {
        var MM1 = dateGL.getFullYear();
        MM1 < 100 ? MM1 += 1900 : MM1;
        var MM2 = MM1;
        MM1 += "/" + (dateGL.getMonth() + 1);
        MM2 += "/" + (dateGL.getMonth() + 2);
        MM1 += "/1";
        MM2 += "/1";
        return parseInt((Date.parse(MM2) - Date.parse(MM1)) / 86400000);
    },
    /**
     * 获取农历的日子
     * @param dateGL Date;//传入时间的Date的对象
     * return 农历的日子
     * **/
    cnDayofDate:function(dateGL) {
        var CnDayStr = new Array("零",
            "初一", "初二", "初三", "初四", "初五",
            "初六", "初七", "初八", "初九", "初十",
            "十一", "十二", "十三", "十四", "十五",
            "十六", "十七", "十八", "十九", "二十",
            "廿一", "廿二", "廿三", "廿四", "廿五",
            "廿六", "廿七", "廿八", "廿九", "三十");
        var Day;
        Day = (Math.abs(calendarChinese.cnDateofDate(dateGL))) % 100;
        return CnDayStr[Day];
    },
    /**
     * 获取农历的月份
     * @param dateGL Date;//传入时间的Date的对象\
     * return 农历的月份
     * **/
    cnMonthofDate:function(dateGL) {
        var CnMonthStr = new Array("零", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊");
        var Month;
        Month = parseInt(calendarChinese.cnDateofDate(dateGL) / 100);
        if (Month < 0) {
            return "闰" + CnMonthStr[-Month] + "月";
        } else {
            return CnMonthStr[Month] + "月";
        }
    },
    /**
     * 获取农历的年份
     * @param dateGL Date;//传入时间的Date的对象
     * return 农历的年份
     * **/
    cnYearofDate:function(dateGL) {
        var YYYY = dateGL.getFullYear();
        var MM = dateGL.getMonth() + 1;
        var CnMM = parseInt(Math.abs(calendarChinese.cnDateofDate(dateGL)) / 100);
        if (YYYY < 100) YYYY += 1900;
        if (CnMM > MM) YYYY--;
        YYYY -= 1864;
        return calendarChinese.cnEra(YYYY) + "年";
    },
    /**
     * 获取农历的月日
     * @param dateGL Date;//传入时间的Date的对象
     * return 4位或三位的数字，后两位的日，剩下的前两位或一位是月
     * **/
    cnDateofDate:function(dateGL) {
        var CnData = new Array(
            0x16, 0x2a, 0xda, 0x00, 0x83, 0x49, 0xb6, 0x05, 0x0e, 0x64, 0xbb, 0x00, 0x19, 0xb2, 0x5b, 0x00,
            0x87, 0x6a, 0x57, 0x04, 0x12, 0x75, 0x2b, 0x00, 0x1d, 0xb6, 0x95, 0x00, 0x8a, 0xad, 0x55, 0x02,
            0x15, 0x55, 0xaa, 0x00, 0x82, 0x55, 0x6c, 0x07, 0x0d, 0xc9, 0x76, 0x00, 0x17, 0x64, 0xb7, 0x00,
            0x86, 0xe4, 0xae, 0x05, 0x11, 0xea, 0x56, 0x00, 0x1b, 0x6d, 0x2a, 0x00, 0x88, 0x5a, 0xaa, 0x04,
            0x14, 0xad, 0x55, 0x00, 0x81, 0xaa, 0xd5, 0x09, 0x0b, 0x52, 0xea, 0x00, 0x16, 0xa9, 0x6d, 0x00,
            0x84, 0xa9, 0x5d, 0x06, 0x0f, 0xd4, 0xae, 0x00, 0x1a, 0xea, 0x4d, 0x00, 0x87, 0xba, 0x55, 0x04
        );
        var CnMonth = new Array();
        var CnMonthDays = new Array();
        var CnBeginDay;
        var LeapMonth;
        var Bytes = new Array();
        var I;
        var CnMonthData;
        var DaysCount;
        var CnDaysCount;
        var ResultMonth;
        var ResultDay;
        var yyyy = dateGL.getFullYear();
        var mm = dateGL.getMonth() + 1;
        var dd = dateGL.getDate();
        if (yyyy < 100) yyyy += 1900;
        if ((yyyy < 1997) || (yyyy > 2020)) {
            return 0;
        }
        Bytes[0] = CnData[(yyyy - 1997) * 4];
        Bytes[1] = CnData[(yyyy - 1997) * 4 + 1];
        Bytes[2] = CnData[(yyyy - 1997) * 4 + 2];
        Bytes[3] = CnData[(yyyy - 1997) * 4 + 3];
        if ((Bytes[0] & 0x80) != 0) {
            CnMonth[0] = 12;
        } else {
            CnMonth[0] = 11;
        }
        CnBeginDay = (Bytes[0] & 0x7f);
        CnMonthData = Bytes[1];
        CnMonthData = CnMonthData << 8;
        CnMonthData = CnMonthData | Bytes[2];
        LeapMonth = Bytes[3];
        for (I = 15; I >= 0; I--) {
            CnMonthDays[15 - I] = 29;
            if (((1 << I) & CnMonthData) != 0) {
                CnMonthDays[15 - I]++;
            }
            if (CnMonth[15 - I] == LeapMonth) {
                CnMonth[15 - I + 1] = -LeapMonth;
            } else {
                if (CnMonth[15 - I] < 0) {
                    CnMonth[15 - I + 1] = -CnMonth[15 - I] + 1;
                } else {
                    CnMonth[15 - I + 1] = CnMonth[15 - I] + 1;
                }
                if (CnMonth[15 - I + 1] > 12) {
                    CnMonth[15 - I + 1] = 1;
                }
            }
        }
        DaysCount = calendarChinese.daysNumberofDate(dateGL) - 1;
        if (DaysCount <= (CnMonthDays[0] - CnBeginDay)) {
            if ((yyyy > 1901) && (calendarChinese.cnDateofDate(new Date((yyyy - 1) + "/12/31")) < 0)) {
                ResultMonth = -CnMonth[0];
            } else {
                ResultMonth = CnMonth[0];
            }
            ResultDay = CnBeginDay + DaysCount;
        } else {
            CnDaysCount = CnMonthDays[0] - CnBeginDay;
            I = 1;
            while ((CnDaysCount < DaysCount) && (CnDaysCount + CnMonthDays[I] < DaysCount)) {
                CnDaysCount += CnMonthDays[I];
                I++;
            }
            ResultMonth = CnMonth[I];
            ResultDay = DaysCount - CnDaysCount;
        }
        if (ResultMonth > 0) {
            return ResultMonth * 100 + ResultDay;
        } else {
            return ResultMonth * 100 - ResultDay;
        }
    },
    /**
     * 获取本年度已经过了多少天（公历）
     * @param dateGL Date;//传入时间的Date的对象
     * return 本年度已经过了多少天
     * **/
    daysNumberofDate:function(dateGL) {
        return parseInt((Date.parse(dateGL)
            - Date.parse(dateGL.getFullYear() + "/1/1"))
            / 86400000) + 1;
    },
    /**
     * 获取当天的公历年月日 星期几 和 农历的年月日
     * return 当天的公历年月日 星期几 和 农历的年月日
     * **/
    runGLNL:function() {
        var today = new Date();
        var d = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var DDDD = (today.getFullYear() < 100 ?
            today.getFullYear() + 1900 : today.getFullYear()) + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
        DDDD = DDDD + " " + d[today.getDay()];
        DDDD = DDDD + " " + (calendarChinese.cnDateofDateStr(today));
        //DDDD = DDDD+ " " + SolarTerm(today);
        return DDDD;
        document.write(DDDD);
    }
}
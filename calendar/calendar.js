var calendarHtml = {
    timetampSelected:null,//选中时间的时间戳；
    timetampCurrent:null,//当前选择月的时间戳
    timetampCurrentConst:null,//当前选择月的时间戳
    clickDate:null,//点击日期(日子)事件；外部调用
    tagId:null,//当前日历显示位置的标签ID
    /**
     * 点击日期(日子)事件；内部调用
     * @prama timetamp int,//时间戳
     * **/
    clickDateEvent:function (timetamp) {

        var dateTtmp = new Date(timetamp);

        var dateCur = new Date(calendarHtml.timetampCurrent);
        var bool = dateTtmp.getMonth() == dateCur.getMonth()
        && dateTtmp.getFullYear() == dateCur.getFullYear()
            ? true
            : false;

        if(calendarHtml.timetampSelected != null && bool)
        {
            var dateSel = new Date(calendarHtml.timetampSelected);
            if(dateTtmp.getMonth() == dateSel.getMonth()
                && dateTtmp.getFullYear() == dateSel.getFullYear())
            {
                document.getElementById(calendarHtml.timetampSelected).className = "rycle2";
            }

        }

        if(bool)
        {
            calendarHtml.timetampSelected = timetamp;
            document.getElementById(timetamp).className = "rycle";
            // alert(timetamp);
            calendarHtml.clickDate(timetamp);
        }
    },
    /**
     * 绘制日历表格 日历月份切换需要左右滑动，左滑则是进入上一个月，右滑则是进入下一个月
     * @param tgId string,//html标签的ID
     * **/
    drawCalendar : function(tgId) {
        calendarHtml.tagId = tgId;
        var date = new Date();
        if(calendarHtml.timetampCurrent == null)
        {
            calendarHtml.timetampCurrent = date.getTime();
            // timetampSelected = timetampCurrent;
        }

        var yearCurrent = new Date(calendarHtml.timetampCurrent).getFullYear();
        var monthCurrent = new Date(calendarHtml.timetampCurrent).getMonth();
        var weekCurrent = new Date(calendarHtml.timetampCurrent).getDay();
        var dayCurrent = new Date(calendarHtml.timetampCurrent).getDate();

        if(calendarHtml.timetampSelected == null)
        {
            calendarHtml.timetampCurrent = (new Date(yearCurrent,monthCurrent,dayCurrent,0,0,0)).getTime();
            calendarHtml.timetampSelected = calendarHtml.timetampCurrent;
            // alert(moment(timetampCurrent).format("YYYY-MM-DD HH:mm:ss"));
        }

        var tableTile1 = "<div><div class='umar-h12'>" +
            "<table><tbody> <tr> <td align='center'> " +
            "<div class='uinn-a12 tits'><div>";

        // var tableTile1 = "<table><tbody> <tr> <td align='center'> " +
        //     "<div class='uinn-a12'>";

        var tableTile2 = "</div></td></tr>" +
            "</tbody></table></div></div><div>";

        // var tableTile2 = "</div></td></tr>" +
        //     "</tbody></table>";

        // var tableTileText = moment(timetampCurrent).format("YYYY年MM月DD日 星期");
        var tableTileText = yearCurrent + "年" + (monthCurrent + 1) + "月"
            + dayCurrent + "日 星期" +  calendarHtml.weekChinese(weekCurrent);
        var tableTileHtml = tableTile1 + tableTileText + tableTile2;



        var tablebody1 = "<div class='umar-h12'><table  id='dateTable'> <tbody><tr>" +
            "<td align='center'>日</td>" +
            "<td align='center'>一</td>" +
            "<td align='center'>二</td>" +
            "<td align='center'>三</td>" +
            "<td align='center'>四</td>" +
            "<td align='center'>五</td>" +
            "<td align='center'>六</td></tr>";

        var tablebodyDateRow = "";
        var tbWeek = "";
        var monthTmp = monthCurrent;
        var timetampTmpSub =  calendarHtml.timetampCurrent;
        var timetampTmpAdd =  calendarHtml.timetampCurrent + 86400000;
        // alert(new Date(timetampTmpAdd).getDay());
        while (monthTmp == new Date(timetampTmpSub).getMonth()) {
            var dateTmp = new Date(timetampTmpSub);
            // var tb = "<td id='" + timetampTmpSub + "' align='center' onclick='clickDateEvent(this.id)'><button class='rycle2'>" + dateTmp.getDate() + "  " + dateTmp.getDay() + "</button></td>";
            /*var tb = "<td align='center' class='tb' onclick='clickDateEvent(" + timetampTmpSub + ")'><button id='" + timetampTmpSub + "' class='"
             var tb1 = "'>" + dateTmp.getDate() + "</button></td>";

             if(timetampTmpSub == timetampSelected)
             {
             // tb = tb + "rycle" + tb1;
             }
             else
             {
             // tb = tb + "rycle2" + tb1;
             }*/

            var tb = "<td align='center' class='tb' onclick='calendarHtml.clickDateEvent(" + timetampTmpSub + ")'><button id='" + timetampTmpSub + "' class='rycle2'>" + dateTmp.getDate() + "</button></td>";

            switch (dateTmp.getDay()) {
                case 0:
                {
                    //周日
                    tablebodyDateRow = "<tr>" + tb + tablebodyDateRow;
                    break;
                }
                /*case 1:
                 {
                 //周1
                 tbWeek = tb + tbWeek;
                 break;
                 }
                 case 2:
                 {
                 //周2
                 break;
                 }
                 case 3:
                 {
                 //周3
                 break;
                 }
                 case 4:
                 {
                 //周4
                 break;
                 }
                 case 5:
                 {
                 //周5
                 break;
                 }*/
                case 6:
                {
                    //周6
                    tablebodyDateRow = tb + "</tr>" + tablebodyDateRow;
                    break;
                }
                default:
                {
                    tablebodyDateRow = tb + tablebodyDateRow;
                    break;
                }

            }

            timetampTmpSub -= 86400000;
            // alert(new Date(timetampTmpSub).getDay() + "   date: " + moment(timetampTmpSub).format("YYYY年MM月DD日 星期") );
        }

        console.log(tablebodyDateRow);
        var timetampTmpSubTmp = timetampTmpSub;
        var exeBool = true;

        while (6 != new Date(timetampTmpSubTmp).getDay()) {
            var dateTmp = new Date(timetampTmpSubTmp);
            var tb = "<td align='center' class='tb'><button class='rycle2'></button></td>";
            switch (dateTmp.getDay()) {
                case 0:
                {
                    //周日
                    tablebodyDateRow = "<tr>" + tb + tablebodyDateRow;
                    break;
                }
                /*case 1:
                 {
                 //周1
                 tbWeek = tb + tbWeek;
                 break;
                 }
                 case 2:
                 {
                 //周2
                 break;
                 }
                 case 3:
                 {
                 //周3
                 break;
                 }
                 case 4:
                 {
                 //周4
                 break;
                 }
                 case 5:
                 {
                 //周5
                 break;
                 }*/
                case 6:
                {
                    //周6
                    tablebodyDateRow = tb + "</tr>" + tablebodyDateRow;
                    break;
                }
                default:
                {
                    tablebodyDateRow = tb + tablebodyDateRow;
                    break;
                }

            }

            timetampTmpSubTmp -= 86400000;
        }

        while (monthTmp == new Date(timetampTmpAdd).getMonth()) {
            var dateTmp = new Date(timetampTmpAdd);
            // var tb = "<td align='center'><button class='rycle2'>" + dateTmp.getDate() + "</button></td>";
            var tb = "<td align='center' class='tb' onclick='calendarHtml.clickDateEvent(" + timetampTmpAdd + ")'><button  id='" + timetampTmpAdd + "' class='rycle2'>" + dateTmp.getDate() + "</button></td>";
            switch (dateTmp.getDay()) {
                case 0:
                {
                    //周日
                    tablebodyDateRow = tablebodyDateRow + "<tr>" + tb;
                    break;
                }
                /*case 1:
                 {
                 //周1
                 tbWeek = tb + tbWeek;
                 break;
                 }
                 case 2:
                 {
                 //周2
                 break;
                 }
                 case 3:
                 {
                 //周3
                 break;
                 }
                 case 4:
                 {
                 //周4
                 break;
                 }
                 case 5:
                 {
                 //周5
                 break;
                 }*/
                case 6:
                {
                    //周6
                    tablebodyDateRow = tablebodyDateRow + tb + "</tr>";
                    break;
                }
                default:
                {
                    tablebodyDateRow = tablebodyDateRow + tb;
                    break;
                }

            }

            timetampTmpAdd += 86400000;
        }

        var timetampTmpAddTmp = timetampTmpAdd;
        while (0 != new Date(timetampTmpAddTmp).getDay()) {
            var dateTmp = new Date(timetampTmpAddTmp);
            var tb = "<td align='center' class='tb'><button class='rycle2'></button></td>";
            switch (dateTmp.getDay()) {
                case 0:
                {
                    //周日
                    tablebodyDateRow = tablebodyDateRow + "<tr>" + tb;
                    break;
                }
                /*case 1:
                 {
                 //周1
                 tbWeek = tb + tbWeek;
                 break;
                 }
                 case 2:
                 {
                 //周2
                 break;
                 }
                 case 3:
                 {
                 //周3
                 break;
                 }
                 case 4:
                 {
                 //周4
                 break;
                 }
                 case 5:
                 {
                 //周5
                 break;
                 }*/
                case 6:
                {
                    //周6
                    tablebodyDateRow = tablebodyDateRow + tb + "</tr>";
                    break;
                }
                default:
                {
                    tablebodyDateRow = tablebodyDateRow + tb;
                    break;
                }

            }

            timetampTmpAddTmp += 86400000;
        }

        var tablebody12 = "</table></div>"



        var tableHtml = tableTileHtml + tablebody1 + tablebodyDateRow + tablebody12;
        // var tableHtml = tablebody1 + tablebodyDateRow + tablebody12;

        document.getElementById(calendarHtml.tagId).innerHTML = tableHtml;


        $("#dateTable").swipeLeft (function () {
            calendarHtml.timetampCurrent = timetampTmpSub;
            // alert("Ds: " + tagId);
            calendarHtml.drawCalendar(calendarHtml.tagId);
        });

        $("#dateTable").swipeRight (function () {
            calendarHtml.timetampCurrent = timetampTmpAdd;
            // alert("Ds1 : " + tagId);
            calendarHtml.drawCalendar(calendarHtml.tagId);
        });

        calendarHtml.clickDateEvent(calendarHtml.timetampSelected);
    },
    /**
     * 周几的数字转化成中文
     * @param tag int;//周几的数字
     * return 中文周几的汉字
     * **/
    weekChinese:function(tag) {
        switch (tag)
        {
            case 0:
            {
                return "日";
            }
            case 1:
            {
                return "一";
            }
            case 2:
            {
                return "二";
            }
            case 3:
            {
                return "三";
            }
            case 4:
            {
                return "四";
            }
            case 5:
            {
                return "五";
            }
            case 6:
            {
                return "六";
            }

        }
    }
};
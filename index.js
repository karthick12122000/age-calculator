
function findAge() {
    ////////-------------get date
    var dayIn = document.getElementById("day");
    var monthIn = document.getElementById("month");
    var yearIn = document.getElementById("year");
    var dayMS = document.querySelector(".dd");
    var monthMS = document.querySelector(".mm");
    var yearMS = year = document.querySelector(".yy");
    ///////----------------validation
    dayIn.classList.remove("invalid");
    monthIn.classList.remove("invalid");
    yearIn.classList.remove("invalid");
    dayMS.innerText = "";
    monthMS.innerHTML = "";
    yearMS.innerText = "";
    var dd = dayIn.value;
    var mm = monthIn.value;
    var yy = yearIn.value;
    var inputDate = new Date(`${mm}/${dd}/${yy}`);
    var currentDate = new Date();

    let flag = false;

    if (dd == "") {
        flag = true;

        dayMS.innerText = "This field is required";
        dayIn.classList.add("invalid");
    }
    if (mm == "") {
        flag = true;
        monthMS.innerText = "This field is required";
        monthIn.classList.add("invalid");
    }
    if (yy == "") {
        flag = true;
        yearMS.innerText = "This field is required";
        yearIn.classList.add("invalid");

    }
    let dayflag = false;
    if (mm > 12) {
        dayflag = true;
        flag = true;
        monthMS.innerText = "Must be a valid month";
        monthIn.classList.add("invalid");

    }

    if (yy > currentDate.getFullYear()) {
        dayflag = true;
        flag = true;
        yearMS.innerText = "Must be in the past";
        yearIn.classList.add("invalid");

    }


    if (dayflag == false && (dd > 31 || dd > (new Date(yy, mm, 0)).getDate())) {
        flag = true;
        dayMS.innerText = "Must be a valid day";
        dayIn.classList.add("invalid");
    }
    if (yy == currentDate.getFullYear()) {
        if (mm > currentDate.getMonth() + 1) {
            monthMS.innerText = "Must be in the past";
            monthIn.classList.add("invalid");
            flag = true;
        }
        else if (mm == (currentDate.getMonth() + 1) && dd >= currentDate.getDate()) {

            dayMS.innerText = "Must be in the past";
            dayIn.classList.add("invalid");
            flag = true;
        }
    }

    /////////////////////-------------------solution
    if (flag == false) {
        var leafyeardays = 0;
        var totalyears = 0;
        var totalmonths = 0;
        let monthDiv = 0;
        for (i = yy; i <= currentDate.getFullYear(); i++) {
            let currentYearDOB = new Date(`${mm}/${dd}/${currentDate.getFullYear()}`)
            if (i != currentYearDOB.getFullYear() || currentDate > currentYearDOB) {
                if (i % 4 == 0) {
                    leafyeardays += 1;

                }

                totalyears += 1;
                if (i == currentDate.getFullYear()) {
                    let m = currentDate.getMonth();
                    if (dd < currentDate.getDate) {
                        m = currentDate.getMonth() + 1
                    }
                    for (j = currentYearDOB.getMonth() + 1; j <= m; j++) {
                        monthDiv += new Date(currentDate.getFullYear(), j, 0).getDate();

                        totalmonths += 1;
                    }
                }
            }
            else {
                let lastYearDOB = new Date(`${mm}/${dd}/${currentDate.getFullYear() - 1}`)

                for (j = lastYearDOB.getMonth() + 1; j <= 12; j++) {
                    monthDiv += new Date(lastYearDOB.getFullYear(), j, 0).getDate()

                    totalmonths += 1;
                }
                let m = currentDate.getMonth();
                if (dd < currentDate.getDate) {
                    m = currentDate.getMonth() + 1
                }
                for (j = 1; j <= m; j++) {
                    monthDiv += new Date(currentDate.getFullYear(), j, 0).getDate();

                    totalmonths += 1;
                }
            }
        }

        var daysInYear = 365 + (leafyeardays / totalyears)
        var daysInmonth = monthDiv / totalmonths;
        var timebetween = (currentDate.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24);
        var yearBetween = (timebetween) / daysInYear;
        var monthBetween = ((timebetween % daysInYear) / daysInmonth);
        let daysBetween = ((timebetween % daysInYear) % daysInmonth);
        document.getElementById("YearValue").innerText = Math.floor(yearBetween);
        document.getElementById("MonthValue").innerText = Math.floor(monthBetween);
        document.getElementById("DateValue").innerText = Math.floor(daysBetween);


    }

}
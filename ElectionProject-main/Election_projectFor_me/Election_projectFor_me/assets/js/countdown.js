function startCountdown(targetClass, endDate) {
    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    var countDown = new Date(endDate).getTime(),
        x = setInterval(function () {
            var now = new Date().getTime(),
                distance = countDown - now;

            var daysElement = document.querySelector(targetClass + " .days"),
                hoursElement = document.querySelector(targetClass + " .hours"),
                minutesElement = document.querySelector(targetClass + " .minutes"),
                secondsElement = document.querySelector(targetClass + " .seconds");

            if (daysElement && hoursElement && minutesElement && secondsElement) {
                daysElement.innerText = Math.floor(distance / day);
                hoursElement.innerText = Math.floor((distance % day) / hour);
                minutesElement.innerText = Math.floor((distance % hour) / minute);
                secondsElement.innerText = Math.floor((distance % minute) / second);
            }

            if (distance < 0) {
                clearInterval(x);
                document.querySelector(targetClass).innerText = "Countdown Ends";
            }
        }, second);
}

// الحصول على التاريخ الحالي وضبط الوقت ليكون 11 صباحاً
var today = new Date();
today.setHours(11, 0, 0, 0); // ضبط الوقت ليكون الساعة 11:00 صباحاً

// بدء العد التنازلي لجميع العناصر في الساعة 11 صباحاً اليوم
startCountdown(".countdown:nth-child(1)", today);
startCountdown(".countdown:nth-child(2)", today);
startCountdown(".countdown:nth-child(3)", today);
startCountdown(".countdown:nth-child(4)", today);
startCountdown(".countdown:nth-child(5)", today);
startCountdown(".countdown:nth-child(6)", today);
startCountdown(".countdown:nth-child(7)", today);
startCountdown(".countdown:nth-child(8)", today);
startCountdown(".countdown:nth-child(9)", today);
startCountdown(".countdown:nth-child(10)", today);
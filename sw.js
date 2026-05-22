let targetTime = null;
let timerCheck = null;
let currentInterval = 300000; // الافتراضي 5 دقائق
let currentAudio = '1.mp3';

self.addEventListener('message', event => {
    if (event.data.action === 'startTimer') {
        currentInterval = parseInt(event.data.interval);
        currentAudio = event.data.audio;
        
        // تحديد وقت الضرب القادم (الوقت الحالي + الفاصل الزمني)
        targetTime = Date.now() + currentInterval;

        clearInterval(timerCheck);
        
        // حلقة فحص ذكية مستمرة كل ثانية
        timerCheck = setInterval(() => {
            if (Date.now() >= targetTime) {
                // أول ما نوصل للوقت المطلوب.. نضرب الإشعار فوراً
                self.registration.showNotification('ﷺ صلي على محمد', {
                    body: 'حان الآن موعد الذكر',
                    vibrate: [200, 100, 200],
                    tag: 'zekr-notification',
                    renotify: true,
                    data: { audioUrl: currentAudio }
                });

                // تجديد وقت المستهدف للمرة القادمة
                targetTime = Date.now() + currentInterval;
            }
        }, 1000); // يفحص كل ثانية بدون استهلاك للبطارية

    } else if (event.data.action === 'stopTimer') {
        clearInterval(timerCheck);
        targetTime = null;
    }
});
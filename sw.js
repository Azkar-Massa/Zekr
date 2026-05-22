let targetTime = null;
let timerCheck = null;
let currentInterval = 300000; 
let currentAudio = '1.mp3';

self.addEventListener('message', event => {
    if (event.data.action === 'startTimer') {
        currentInterval = parseInt(event.data.interval);
        currentAudio = event.data.audio;
        
        targetTime = Date.now() + currentInterval;
        clearInterval(timerCheck);
        
        timerCheck = setInterval(() => {
            if (Date.now() >= targetTime) {
                
                // هنا الحل: نرسل ملف الصوت مباشرة كـ sound للنظام
                self.registration.showNotification('ﷺ صلي على محمد', {
                    body: 'حان الآن موعد الذكر',
                    vibrate: [200, 100, 200],
                    tag: 'zekr-notification',
                    renotify: true,
                    sound: currentAudio, // تشغيل ملف الـ mp3 كنغمة رسمية للإشعار
                    data: { audioUrl: currentAudio }
                });

                targetTime = Date.now() + currentInterval;
            }
        }, 1000);

    } else if (event.data.action === 'stopTimer') {
        clearInterval(timerCheck);
        targetTime = null;
    }
});
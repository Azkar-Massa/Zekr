let bgTimer = null;

self.addEventListener('message', event => {
    if (event.data.action === 'startTimer') {
        clearInterval(bgTimer);
        
        bgTimer = setInterval(() => {
            // إجبار الأندرويد على إظهار إشعار وتشغيل رنة الصوت المرافقة له غصب عنه والشاشة مقفولة
            self.registration.showNotification('ﷺ صلي على محمد', {
                body: 'حان الآن موعد الذكر اليومي',
                icon: 'icon.png', // حط أي صورة لو عايز أو سيبها
                vibrate: [200, 100, 200],
                tag: 'zekr-notification',
                renotify: true,
                // هنا بنربط الصوت اللي أنت اخترته بالإشعار
                data: { audioUrl: event.data.audio }
            });
        }, event.data.interval);

    } else if (event.data.action === 'stopTimer') {
        clearInterval(bgTimer);
    }
});
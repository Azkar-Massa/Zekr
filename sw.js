let targetTime = null;
let timerCheck = null;
let currentInterval = 300000; 
let currentAudio = '1.mp3';

// كاش محلي لحفظ الأصوات أوفلاين
const CACHE_NAME = 'zekr-v1';
const assets = ['/', '/index.html', '/1.mp3', '/2.mp3', '/3.mp3'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

// إدارة التايمر المستقل في الخلفية العميقة
self.addEventListener('message', event => {
    if (event.data.action === 'startTimer') {
        currentInterval = parseInt(event.data.interval);
        currentAudio = event.data.audio;
        
        targetTime = Date.now() + currentInterval;
        clearInterval(timerCheck);
        
        timerCheck = setInterval(() => {
            if (Date.now() >= targetTime) {
                
                // 1. إظهار الإشعار المرئي على الشاشة المقفولة غصب عن السستم
                self.registration.showNotification('ﷺ صلي على محمد', {
                    body: 'حان الآن موعد الذكر اليومي',
                    vibrate: [300, 100, 300],
                    tag: 'zekr-notification',
                    renotify: true,
                    data: { audioUrl: currentAudio }
                });

                // 2. إرسال أمر فوري للواجهة الأمامية عشان تضرب الصوت من الكاش مباشرة
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            action: 'playSound',
                            audio: currentAudio
                        });
                    });
                });

                // إعادة تعيين وقت التذكير القادم
                targetTime = Date.now() + currentInterval;
            }
        }, 1000); // يفحص كل ثانية بدقة متناهية ولا يستهلك بطارية

    } else if (event.data.action === 'stopTimer') {
        clearInterval(timerCheck);
        targetTime = null;
    }
});
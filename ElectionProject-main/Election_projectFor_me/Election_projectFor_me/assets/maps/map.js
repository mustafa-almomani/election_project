// تعريف أسماء المحافظات والمعلومات الخاصة بها
const provinces = [
    { id: 'amman', name: 'عمان', info: 'عدد الدوائر في عمان هي ثلاث دوائر' },
    { id: 'zarqa', name: 'الزرقاء', info: 'عدد الدوائر في الزرقاء دائرة واحدة' },
    { id: 'irbid', name: 'إربد', info: 'عدد الدوائر في إربد دائرتين' },
    { id: 'ajloun', name: 'عجلون', info: 'عدد الدوائر في عجلون دائرة واحدة' },
    { id: 'mafraq', name: 'المفرق', info: 'عدد الدوائر في المفرق دائرة واحدة' },
    { id: 'madaba', name: 'مادبا', info: 'عدد الدوائر في مادبا دائرة واحدة' },
    { id: 'kark', name: 'الكرك', info: 'عدد الدوائر في الكرك دائرة واحدة' },
    { id: 'tafileh', name: 'الطفيلة', info: 'عدد الدوائر في الطفيلة دائرة واحدة' },
    { id: 'aqaba', name: 'العقبة', info: 'عدد الدوائر في العقبة دائرة واحدة' },
    { id: 'jarash', name: 'جرش', info: 'عدد الدوائر في جرش دائرة واحدة' },
    { id: 'balqa', name: 'البلقاء', info: 'عدد الدوائر في البلقاء دائرة واحدة' },
    { id: 'maan', name: 'معان', info: 'عدد الدوائر في معان دائرة واحدة' }
];

// إضافة العناصر الخاصة بالمحافظات إلى HTML
const mapContainer = document.querySelector('.map');
provinces.forEach(province => {
    const div = document.createElement('div');
    div.className = 'province';
    div.id = province.id;
    div.innerHTML = `<span class="name">${province.name}</span> <i class="fa-solid fa-location-dot mark"></i>`;

    // إضافة مستمعين للأحداث للعرض في infoBox و Popup
    div.addEventListener('mouseover', function () {
        showInfo(province.name);
    });

    div.addEventListener('mouseout', function () {
        hideInfo();
    });

    div.addEventListener('click', function (event) {
        event.stopPropagation(); // منع تأثير النقر على العناصر الأخرى
        toggleActive(this, province.name);
        showPopup(province.name, province.info);
    });

    mapContainer.appendChild(div);
});

// عرض معلومات في infoBox
function showInfo(provinceName) {
    document.getElementById('infoBox').innerText = "معلومات عن " + provinceName;
}

// إخفاء معلومات في infoBox
function hideInfo() {
    document.getElementById('infoBox').innerText = "اختر محافظة لعرض المعلومات";
}

// تبديل الحالة النشطة للمحافظة
function toggleActive(element, provinceName) {
    document.querySelectorAll('.province').forEach(province => {
        province.classList.remove('active'); // إزالة الحالة النشطة من جميع المحافظات
    });
    element.classList.add('active'); // إضافة الحالة النشطة للمحافظة المحددة
}

// عرض Popup في منتصف الشاشة
function showPopup(provinceName, provinceInfo) {
    const popup = document.getElementById('popup');
    popup.innerHTML = `<h2>${provinceName}</h2>
                        <p>${provinceInfo}</p>
                        <button onclick="closePopup()">إغلاق</button>`;
    popup.style.left = '50%';  // تثبيت الموقع في المنتصف
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';  // تصحيح الموقع ليكون في المنتصف
    popup.classList.add('show');
}

// إغلاق Popup
function closePopup() {
    document.getElementById('popup').classList.remove('show');
}

// إغلاق Popup عند النقر في أي مكان آخر
document.addEventListener('click', function (event) {
    if (!document.getElementById('popup').contains(event.target)) {
        closePopup();
    }
});
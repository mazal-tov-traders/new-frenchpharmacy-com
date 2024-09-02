// Находим все элементы с классом 'section-tab'
const tabSections = document.querySelectorAll('.section-tab');

// Проверяем, есть ли такие элементы на странице
if (tabSections.length) {

    const createLayout = () => {
        const main = document.querySelector('main');
        const tabsSectionEl = document.createElement('section');
        const tabsWrapperEl = document.createElement('div');
        const tabsButtonsEl = document.createElement('div');
        const tabsContentEl = document.createElement('div');
    
        tabsSectionEl.classList.add('free-downloads-tabs');
        tabsWrapperEl.classList.add('free-downloads-tabs__wrapper');
        tabsButtonsEl.classList.add('free-downloads-tabs__buttons');
        tabsContentEl.classList.add('free-downloads-tabs__content');
    
        main.append(tabsSectionEl);
        tabsSectionEl.append(tabsWrapperEl);
        tabsWrapperEl.append(tabsButtonsEl, tabsContentEl);
    
        tabSections.forEach((tab, index) => {
            const trigger = tab.querySelector('.tab-trigger');
            const tabContent = tab.querySelector('.inner-tab-content');
            const triggerText = trigger.getAttribute('data');
            const triggerIcon = trigger.getAttribute('data-icon');
    
            // Создаем временный <div>, чтобы получить текст без HTML-разметки
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = triggerText;
            const buttonText = tempDiv.textContent || tempDiv.innerText;
    
            // Обновляем индексы для триггера и контента
            trigger.dataset.tabIndex = `${index}`;
            tabContent.dataset.tabIndex = `${index}`;
    
            // Создаем новый элемент для кнопки таба
            const buttonEl = document.createElement('div');
            buttonEl.classList.add('tab-trigger');
            buttonEl.dataset.tabIndex = `${index}`;
    
            // Сначала добавляем текст кнопки
            buttonEl.textContent = buttonText;
    
            // Проверяем наличие иконки и добавляем её
            if (triggerIcon) {
                const iconEl = document.createElement('img');
                iconEl.classList.add('icon-trigger-tab');
                iconEl.src = triggerIcon;  // Используем корректный URL из data-атрибута
                iconEl.alt = buttonText;   // Альтернативный текст для иконки
                iconEl.width = 36;         // Устанавливаем ширину иконки
    
                // Добавляем иконку перед текстом кнопки
                buttonEl.prepend(iconEl);
            }
    
            // Добавляем контент текущего таба в контейнер контента табов
            tabsContentEl.appendChild(tabContent);
    
            // Добавляем кнопку текущего таба в контейнер кнопок табов
            tabsButtonsEl.appendChild(buttonEl);
        });
    };
    
    

    // Функция для переключения между табами
    const toggleTab = () => {
        // Находим все кнопки табов на десктопе
        const tabButtonsOnDesktop = document.querySelectorAll('.free-downloads-tabs__buttons .tab-trigger');

        // Находим все кнопки табов на мобильных устройствах
        const tabButtonsOnMobile = document.querySelectorAll('.section-tab .tab-trigger');

        // Находим весь контент табов
        const tabContentList = document.querySelectorAll('.free-downloads-tabs__content .inner-tab-content');

        // Логика для переключения табов на мобильных устройствах
        tabButtonsOnMobile.forEach((btn) => {
            btn.addEventListener('click', () => {
                // Переключаем класс 'active' для кнопки, чтобы показать или скрыть её состояние
                btn.classList.toggle('active');

                // Переключаем видимость контента в зависимости от нажатой кнопки
                tabContentList.forEach((tabContent) => {
                    if (tabContent.dataset.tabIndex === btn.dataset.tabIndex) {
                        tabContent.classList.toggle('hidden'); // Показываем или скрываем контент
                    }
                });

                // Плавно прокручиваем к нажатой кнопке
                scrollToElement(btn);
            });
        });

        // Логика для переключения табов на десктопе
        tabButtonsOnDesktop.forEach((btn) => {
            btn.addEventListener('click', () => {
                // Получаем индекс текущей кнопки
                const tabIndex = btn.dataset.tabIndex;

                // Скрываем или показываем контент табов в зависимости от индекса
                tabContentList.forEach((tabContent) => {
                    if (tabContent.dataset.tabIndex !== tabIndex) {
                        tabContent.classList.add('hidden'); // Скрываем контент, если индекс не совпадает
                    } else {
                        tabContent.classList.remove('hidden'); // Показываем контент, если индекс совпадает
                    }
                });

                // Обновляем активное состояние кнопок
                tabButtonsOnDesktop.forEach((button) => {
                    button.classList.remove('active');
                });
                btn.classList.add('active');

                // Плавно прокручиваем к секции табов
                scrollToElement(btn.closest('.free-downloads-tabs'));
            });
        });
    };

    // Функция для плавного прокручивания к элементу
    const scrollToElement = (element) => {
        // Находим элемент заголовка, чтобы учесть его высоту при прокрутке
        const header = document.querySelector('.section-header');

        // Получаем высоту заголовка с учетом отступа
        const headerHeight = header.getBoundingClientRect().height + 10;

        // Получаем положение элемента относительно верхней части экрана
        const top = element.getBoundingClientRect().top;

        // Вычисляем позицию прокрутки, учитывая высоту заголовка и текущую прокрутку страницы
        const y = top + window.pageYOffset - headerHeight;

        // Плавно прокручиваем окно до нужной позиции
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    // Инициализация табов и установка начальных состояний
    const init = () => {
        // Находим все кнопки табов
        const tabButtons = document.querySelectorAll('.tab-trigger');

        // Находим весь контент табов
        const tabContentList = document.querySelectorAll('.free-downloads-tabs__content .inner-tab-content');

        // Получаем индекс первого таба для его активации
        const firstTabIndex = tabContentList[0].dataset.tabIndex;

        // Скрываем все табы, кроме первого
        tabContentList.forEach((tabContent, index) => {
            if (index !== 0) {
                tabContent.classList.add('hidden'); // Добавляем класс 'hidden' для скрытия контента
            }
        });

        // Устанавливаем первый таб как активный
        tabButtons.forEach((btn) => {
            if (btn.dataset.tabIndex === firstTabIndex) {
                btn.classList.add('active'); // Добавляем класс 'active' для активного состояния
            }
        });

        // Запускаем логику переключения табов
        toggleTab();
    };

    // Создаем разметку и инициализируем табы
    createLayout();
    init();
}

// Находим все элементы с классом 'section-tab'
const tabSections = document.querySelectorAll('.section-tab');

// Проверяем, есть ли такие элементы на странице
if (tabSections.length) {
    
    // Функция для создания разметки для табов
    const createLayout = () => {
        // Находим основной элемент <main> на странице, в который будем добавлять секцию табов
        const main = document.querySelector('main');
        
        // Создаем новый элемент <section> для табов
        const tabsSectionEl = document.createElement('section');
        
        // Создаем обертку <div> для табов, в которой будут кнопки и контент
        const tabsWrapperEl = document.createElement('div');
        
        // Создаем <div> для кнопок табов
        const tabsButtonsEl = document.createElement('div');
        
        // Создаем <div> для контента табов
        const tabsContentEl = document.createElement('div');
    
        // Добавляем класс 'free-downloads-tabs' к созданной секции
        tabsSectionEl.classList.add('free-downloads-tabs');
        
        // Добавляем класс 'free-downloads-tabs__wrapper' к обертке табов
        tabsWrapperEl.classList.add('free-downloads-tabs__wrapper');
        
        // Добавляем класс 'free-downloads-tabs__buttons' к контейнеру кнопок табов
        tabsButtonsEl.classList.add('free-downloads-tabs__buttons');
        
        // Добавляем класс 'free-downloads-tabs__content' к контейнеру контента табов
        tabsContentEl.classList.add('free-downloads-tabs__content');
    
        // Добавляем секцию табов в основной элемент <main>
        main.append(tabsSectionEl);
        
        // В секцию табов добавляем обертку табов
        tabsSectionEl.append(tabsWrapperEl);
        
        // В обертку табов добавляем контейнеры для кнопок и контента
        tabsWrapperEl.append(tabsButtonsEl, tabsContentEl);
    
        // Проходим по каждому элементу с классом 'section-tab'
        tabSections.forEach((tab, index) => {
            // Находим элемент, который является триггером (кнопкой) для текущего таба
            const trigger = tab.querySelector('.tab-trigger');
            
            // Находим элемент с контентом текущего таба
            const tabContent = tab.querySelector('.inner-tab-content');
    
            // Получаем текст из атрибута 'data' у триггера
            const triggerText = trigger.getAttribute('data');
            
            // Создаем временный <div>, чтобы получить текст из HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = triggerText;
            
            // Получаем текст без HTML-разметки
            const buttonText = tempDiv.textContent || tempDiv.innerText;
    
            // Устанавливаем атрибут 'data-tab-index' с текущим индексом для триггера (кнопки)
            trigger.dataset.tabIndex = `${index}`;
            
            // Устанавливаем атрибут 'data-tab-index' с текущим индексом для контента таба
            tabContent.dataset.tabIndex = `${index}`;
    
            // Создаем новый <div> для кнопки таба
            const buttonEl = document.createElement('div');
            
            // Добавляем класс 'tab-trigger' для новой кнопки
            buttonEl.classList.add('tab-trigger');
            
            // Устанавливаем атрибут 'data-tab-index' для кнопки
            buttonEl.dataset.tabIndex = `${index}`;
            
            // Устанавливаем текст кнопки, полученный ранее из атрибута 'data'
            buttonEl.textContent = buttonText;
    
            // Добавляем контент текущего таба в контейнер контента табов
            // Не используем cloneNode, чтобы избежать дублирования
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

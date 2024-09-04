const tabSections = document.querySelectorAll('.faq-tabs');

if (tabSections.length) {

    const createLayout = () => {
        const main = document.querySelector('main');
        const tabsSections = document.querySelectorAll('.section.section__faq-tabs');
        const tabsSectionEl = document.createElement('section');
        const tabsWrapperEl = document.createElement('div');
        const tabsButtonsEl = document.createElement('div');
        const tabsContentEl = document.createElement('div');
    
        tabsSectionEl.classList.add('free-faq-tabs');
        tabsWrapperEl.classList.add('free-faq-tabs__wrapper');
        tabsButtonsEl.classList.add('free-faq-tabs__buttons');
        tabsContentEl.classList.add('free-faq-tabs__content');
    
        tabsSectionEl.append(tabsWrapperEl);
        tabsWrapperEl.append(tabsButtonsEl, tabsContentEl);
    
        if (tabsSections.length > 0) {

            const lastTabSection = tabsSections[tabsSections.length - 1];

            lastTabSection.insertAdjacentElement('afterend', tabsSectionEl);
        } else {

            main.appendChild(tabsSectionEl);
        }
    
        tabSections.forEach((tab, index) => {
            const trigger = tab.querySelector('.tab-trigger');
            const tabContent = tab.querySelector('.tab-trigger__wrapper');
            const triggerText = trigger.getAttribute('data');
            const triggerIcon = trigger.getAttribute('data-icon');
    
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = triggerText;
            const buttonText = tempDiv.textContent || tempDiv.innerText;
    
            trigger.dataset.tabIndex = `${index}`;
            tabContent.dataset.tabIndex = `${index}`;
    
            const buttonEl = document.createElement('div');
            buttonEl.classList.add('tab-trigger');
            buttonEl.dataset.tabIndex = `${index}`;
    
            buttonEl.textContent = buttonText;
    
            if (triggerIcon) {
                const iconEl = document.createElement('img');
                iconEl.classList.add('icon-trigger-tab');
                iconEl.src = triggerIcon;
                iconEl.alt = buttonText;
                iconEl.width = 32;
    
                buttonEl.prepend(iconEl);
            }
    
            tabsContentEl.appendChild(tabContent);
            tabsButtonsEl.appendChild(buttonEl);
        });
    };

    const toggleTab = () => {

        const tabButtonsOnDesktop = document.querySelectorAll('.free-faq-tabs__buttons .tab-trigger');

        const tabButtonsOnMobile = document.querySelectorAll('.faq-tabs .tab-trigger');

        const tabContentList = document.querySelectorAll('.free-faq-tabs__content .tab-trigger__wrapper');

        tabButtonsOnMobile.forEach((btn) => {
            btn.addEventListener('click', () => {

                btn.classList.toggle('active');

                tabContentList.forEach((tabContent) => {
                    if (tabContent.dataset.tabIndex === btn.dataset.tabIndex) {
                        tabContent.classList.toggle('hidden'); 
                    }
                });

                scrollToElement(btn);
            });
        });

        tabButtonsOnDesktop.forEach((btn) => {
            btn.addEventListener('click', () => {

                const tabIndex = btn.dataset.tabIndex;

                tabContentList.forEach((tabContent) => {
                    if (tabContent.dataset.tabIndex !== tabIndex) {
                        tabContent.classList.add('hidden');
                    } else {
                        tabContent.classList.remove('hidden');
                    }
                });

                tabButtonsOnDesktop.forEach((button) => {
                    button.classList.remove('active');
                });
                btn.classList.add('active');

                scrollToElement(btn.closest('.free-faq-tabs'));
            });
        });
    };

    const scrollToElement = (element) => {

        const header = document.querySelector('.section-header');

        const headerHeight = header.getBoundingClientRect().height + 10;

        const top = element.getBoundingClientRect().top;

        const y = top + window.pageYOffset - headerHeight;

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    const init = () => {

        const tabButtons = document.querySelectorAll('.tab-trigger');
        const tabContentList = document.querySelectorAll('.free-faq-tabs__content .tab-trigger__wrapper');
        const firstTabIndex = tabContentList[0].dataset.tabIndex;

        tabContentList.forEach((tabContent, index) => {
            if (index !== 0) {
                tabContent.classList.add('hidden'); 
            }
        });

        tabButtons.forEach((btn) => {
            if (btn.dataset.tabIndex === firstTabIndex) {
                btn.classList.add('active'); 
            }
        });

        toggleTab();
    };

    createLayout();
    init();
}



// document.addEventListener('DOMContentLoaded', function () {
//     // Находим все элементы с классом 'section-tab'
//     const tabSections = document.querySelectorAll('.section-tab');

//     // Проверяем, есть ли такие элементы на странице
//     if (tabSections.length) {

//         // Функция для определения текущей ширины экрана
//         const isMobileView = () => window.innerWidth <= 800;

//         const createLayout = () => {
//             const main = document.querySelector('main');
//             const tabsSectionEl = document.createElement('section');
//             const tabsWrapperEl = document.createElement('div');
//             const tabsContentEl = document.createElement('div');

//             if (isMobileView()) {
//                 // Логика для мобильного вида (меню dropdown)
//                 const dropdownEl = document.createElement('div');
//                 const dropdownToggleEl = document.createElement('button');
//                 const dropdownMenuEl = document.createElement('div');

//                 tabsSectionEl.classList.add('free-downloads-tabs');
//                 tabsWrapperEl.classList.add('free-downloads-tabs__wrapper');
//                 tabsContentEl.classList.add('free-downloads-tabs__content');
//                 dropdownEl.classList.add('dropdown');
//                 dropdownToggleEl.classList.add('dropdown-toggle');
//                 dropdownMenuEl.classList.add('dropdown-menu');

//                 main.append(tabsSectionEl);
//                 tabsSectionEl.append(tabsWrapperEl);
//                 tabsWrapperEl.append(dropdownEl, tabsContentEl);
//                 dropdownEl.append(dropdownToggleEl, dropdownMenuEl);

//                 // Создание элементов табов
//                 tabSections.forEach((tab, index) => {
//                     const trigger = tab.querySelector('.tab-trigger');
//                     const tabContent = tab.querySelector('.inner-tab-content');
//                     const triggerText = trigger.getAttribute('data');

//                     const tempDiv = document.createElement('div');
//                     tempDiv.innerHTML = triggerText;
//                     const buttonText = tempDiv.textContent || tempDiv.innerText;

//                     trigger.dataset.tabIndex = `${index}`;
//                     tabContent.dataset.tabIndex = `${index}`;

//                     const buttonEl = document.createElement('div');
//                     buttonEl.classList.add('tab-trigger');
//                     buttonEl.dataset.tabIndex = `${index}`;
//                     buttonEl.textContent = buttonText;

//                     dropdownMenuEl.appendChild(buttonEl);
//                     tabsContentEl.appendChild(tabContent);

//                     if (index === 0) {
//                         dropdownToggleEl.textContent = buttonText;
//                         tabContent.classList.remove('hidden');
//                     } else {
//                         tabContent.classList.add('hidden');
//                     }
//                 });

//                 dropdownToggleEl.addEventListener('click', () => {
//                     dropdownMenuEl.classList.toggle('show');
//                 });

//                 dropdownMenuEl.querySelectorAll('.tab-trigger').forEach((btn) => {
//                     btn.addEventListener('click', () => {
//                         const tabIndex = btn.dataset.tabIndex;

//                         tabsContentEl.querySelectorAll('.inner-tab-content').forEach((content) => {
//                             content.classList.add('hidden');
//                         });

//                         const activeContent = tabsContentEl.querySelector(`.inner-tab-content[data-tab-index='${tabIndex}']`);
//                         if (activeContent) {
//                             activeContent.classList.remove('hidden');
//                         }

//                         dropdownToggleEl.textContent = btn.textContent;
//                         dropdownMenuEl.classList.remove('show');
//                     });
//                 });

//             } else {
//                 // Логика для десктопного вида
//                 const tabsButtonsEl = document.createElement('div');

//                 tabsSectionEl.classList.add('free-downloads-tabs');
//                 tabsWrapperEl.classList.add('free-downloads-tabs__wrapper');
//                 tabsButtonsEl.classList.add('free-downloads-tabs__buttons');
//                 tabsContentEl.classList.add('free-downloads-tabs__content');

//                 main.append(tabsSectionEl);
//                 tabsSectionEl.append(tabsWrapperEl);
//                 tabsWrapperEl.append(tabsButtonsEl, tabsContentEl);

//                 tabSections.forEach((tab, index) => {
//                     const trigger = tab.querySelector('.tab-trigger');
//                     const tabContent = tab.querySelector('.inner-tab-content');
//                     const triggerText = trigger.getAttribute('data');
//                     const triggerIcon = trigger.getAttribute('data-icon');

//                     const tempDiv = document.createElement('div');
//                     tempDiv.innerHTML = triggerText;
//                     const buttonText = tempDiv.textContent || tempDiv.innerText;

//                     trigger.dataset.tabIndex = `${index}`;
//                     tabContent.dataset.tabIndex = `${index}`;

//                     const buttonEl = document.createElement('div');
//                     buttonEl.classList.add('tab-trigger');
//                     buttonEl.dataset.tabIndex = `${index}`;
//                     buttonEl.textContent = buttonText;

//                     if (triggerIcon) {
//                         const iconEl = document.createElement('img');
//                         iconEl.classList.add('icon-trigger-tab');
//                         iconEl.src = triggerIcon;
//                         iconEl.alt = buttonText;
//                         iconEl.width = 36;
//                         buttonEl.prepend(iconEl);
//                     }

//                     tabsContentEl.appendChild(tabContent);
//                     tabsButtonsEl.appendChild(buttonEl);
//                 });
//             }
//         };

//         const toggleTab = () => {
//             if (isMobileView()) {
//                 // Логика переключения табов для мобильной версии
//                 const tabButtonsOnMobile = document.querySelectorAll('.section-tab .tab-trigger');
//                 const tabContentList = document.querySelectorAll('.free-downloads-tabs__content .inner-tab-content');

//                 tabButtonsOnMobile.forEach((btn) => {
//                     btn.addEventListener('click', () => {
//                         const isActive = btn.classList.contains('active');

//                         tabButtonsOnMobile.forEach(button => button.classList.remove('active'));
//                         tabContentList.forEach((tabContent) => {
//                             tabContent.classList.add('hidden');
//                         });

//                         if (!isActive) {
//                             btn.classList.add('active');
//                             const activeContent = document.querySelector(`.free-downloads-tabs__content .inner-tab-content[data-tab-index='${btn.dataset.tabIndex}']`);
//                             if (activeContent) {
//                                 activeContent.classList.remove('hidden');
//                             }

//                             scrollToElement(btn);
//                         }
//                     });
//                 });
//             } else {
//                 // Логика переключения табов для десктопной версии
//                 const tabButtonsOnDesktop = document.querySelectorAll('.free-downloads-tabs__buttons .tab-trigger');
//                 const tabContentList = document.querySelectorAll('.free-downloads-tabs__content .inner-tab-content');

//                 tabButtonsOnDesktop.forEach((btn) => {
//                     btn.addEventListener('click', () => {
//                         const tabIndex = btn.dataset.tabIndex;

//                         tabContentList.forEach((tabContent) => {
//                             if (tabContent.dataset.tabIndex !== tabIndex) {
//                                 tabContent.classList.add('hidden');
//                             } else {
//                                 tabContent.classList.remove('hidden');
//                             }
//                         });

//                         tabButtonsOnDesktop.forEach((button) => {
//                             button.classList.remove('active');
//                         });
//                         btn.classList.add('active');

//                         scrollToElement(btn.closest('.free-downloads-tabs'));
//                     });
//                 });
//             }
//         };

//         const scrollToElement = (element) => {
//             const header = document.querySelector('.section-header');
//             const headerHeight = header ? header.getBoundingClientRect().height + 10 : 0;
//             const top = element.getBoundingClientRect().top;
//             const y = top + window.pageYOffset - headerHeight;
//             window.scrollTo({ top: y, behavior: 'smooth' });
//         };

//         const init = () => {
//             const tabButtons = document.querySelectorAll('.tab-trigger');
//             const tabContentList = document.querySelectorAll('.free-downloads-tabs__content .inner-tab-content');
//             const firstTabIndex = tabContentList[0].dataset.tabIndex;

//             tabContentList.forEach((tabContent, index) => {
//                 if (index !== 0) {
//                     tabContent.classList.add('hidden');
//                 }
//             });

//             tabButtons.forEach((btn) => {
//                 if (btn.dataset.tabIndex === firstTabIndex) {
//                     btn.classList.add('active');
//                 }
//             });

//             toggleTab();
//         };

//         createLayout();
//         init();

//         window.addEventListener('resize', () => {
//             location.reload(); // Обновляем страницу при изменении размера окна, чтобы подстроиться под новый вид
//         });
//     }
// });

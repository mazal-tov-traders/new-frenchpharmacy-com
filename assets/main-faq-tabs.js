const faqTabs = document.querySelectorAll('.faq-tabs');

if (faqTabs.length) {

    const setupLayout = () => {
        const mainElement = document.querySelector('main');
        const faqSections = document.querySelectorAll('.section.section__faq-tabs');
        const sectionElement = document.createElement('section');
        const wrapperElement = document.createElement('div');
        const buttonsElement = document.createElement('div');
        const newsletterElement = document.createElement('div');
        const contentElement = document.createElement('div');

        sectionElement.classList.add('free-faq-tabs');
        wrapperElement.classList.add('free-faq-tabs__wrapper');
        buttonsElement.classList.add('free-faq-tabs__buttons');
        newsletterElement.classList.add('free-faq-tabs__newsletter');
        contentElement.classList.add('free-faq-tabs__content');

        sectionElement.append(wrapperElement);
        wrapperElement.append(buttonsElement, newsletterElement, contentElement);

        if (faqSections.length > 0) {
            faqSections[faqSections.length - 1].insertAdjacentElement('afterend', sectionElement);
        } else {
            mainElement.appendChild(sectionElement);
        }

        const createButton = (text, icon, index) => {
            const buttonElement = document.createElement('div');
            buttonElement.classList.add('tab-trigger');
            buttonElement.dataset.tabIndex = index;
            buttonElement.textContent = text;

            if (icon) {
                const iconElement = document.createElement('img');
                iconElement.classList.add('icon-trigger-tab');
                iconElement.src = icon;
                iconElement.alt = text;
                iconElement.width = 32;
                buttonElement.prepend(iconElement);
            }

            return buttonElement;
        };

        // SVG для кнопки "ALL FAQ" (прямой SVG код)
        const svgMarkup = `
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1001_9319)">
                    <path d="M21.625 19.9375C21.2799 19.9375 21 20.2173 21 20.5625V24.875C21 26.5981 19.5981 28 17.875 28H11.127C10.7819 28 10.5022 28.2796 10.502 28.6246L10.5011 29.8672L9.00937 28.3755C8.91281 28.1538 8.69181 28 8.43619 28H4.375C2.65188 28 1.25 26.5981 1.25 24.875V15.25C1.25 13.5269 2.65188 12.125 4.375 12.125H10.6875C11.0326 12.125 11.3125 11.8452 11.3125 11.5C11.3125 11.1548 11.0326 10.875 10.6875 10.875H4.375C1.96263 10.875 0 12.8376 0 15.25V24.875C0 27.2874 1.96263 29.25 4.375 29.25H8.11613L10.6831 31.8169C10.8026 31.9365 10.9624 32 11.1251 32C11.2056 32 11.2867 31.9844 11.3639 31.9525C11.5975 31.8559 11.7498 31.6281 11.75 31.3754L11.7515 29.25H17.875C20.2874 29.25 22.25 27.2874 22.25 24.875V20.5625C22.25 20.2173 21.9701 19.9375 21.625 19.9375Z" fill="white"/>
                    <path d="M22.9159 0H21.3341C16.3251 0 12.25 4.07512 12.25 9.08412C12.25 14.0931 16.3251 18.1682 21.3341 18.1682H22.9159C23.6977 18.1682 24.4715 18.0689 25.2215 17.8726L27.5582 20.208C27.6777 20.3274 27.8375 20.3909 28.0001 20.3909C28.0807 20.3909 28.1619 20.3754 28.2393 20.3433C28.4727 20.2466 28.625 20.0187 28.625 19.7659V16.1499C29.6143 15.3487 30.4361 14.3367 31.0129 13.2061C31.6679 11.9219 32 10.5351 32 9.08412C32 4.07512 27.9249 0 22.9159 0ZM27.6239 15.3459C27.4672 15.464 27.375 15.6489 27.375 15.8452V18.2577L25.8456 16.7291C25.7266 16.6102 25.5669 16.5461 25.4037 16.5461C25.3424 16.5461 25.2806 16.5552 25.2202 16.5737C24.4763 16.8024 23.701 16.9182 22.9159 16.9182H21.3341C17.0143 16.9182 13.5 13.4039 13.5 9.08412C13.5 4.76437 17.0144 1.25 21.3341 1.25H22.9159C27.2357 1.25 30.75 4.76437 30.75 9.08412C30.75 11.5673 29.6106 13.8497 27.6239 15.3459Z" fill="white"/>
                    <path d="M24.94 6.8388C24.8498 5.53036 23.795 4.47561 22.4865 4.38543C21.7448 4.33449 21.0369 4.58468 20.4951 5.09049C19.9607 5.5893 19.6543 6.29443 19.6543 7.02511C19.6543 7.3703 19.9342 7.65011 20.2793 7.65011C20.6244 7.65011 20.9043 7.3703 20.9043 7.02511C20.9043 6.63393 21.0619 6.27136 21.348 6.0043C21.6339 5.73749 22.0075 5.60543 22.4007 5.63255C23.0899 5.68005 23.6455 6.23561 23.693 6.9248C23.741 7.62086 23.2843 8.23599 22.6072 8.38749C22.0585 8.51024 21.6754 8.98699 21.6754 9.5468V11.0484C21.6754 11.3936 21.9553 11.6734 22.3004 11.6734C22.6456 11.6734 22.9254 11.3936 22.9254 11.0484V9.59674C24.1847 9.29249 25.0297 8.14011 24.94 6.8388Z" fill="white"/>
                    <path d="M22.7417 13.0788C22.6254 12.9625 22.4642 12.8956 22.2998 12.8956C22.1354 12.8956 21.9742 12.9625 21.8579 13.0788C21.7417 13.195 21.6748 13.3563 21.6748 13.5206C21.6748 13.6856 21.7417 13.8469 21.8579 13.9631C21.9742 14.0794 22.1354 14.1456 22.2998 14.1456C22.4642 14.1456 22.6254 14.0794 22.7417 13.9631C22.8579 13.8463 22.9248 13.6856 22.9248 13.5206C22.9248 13.3563 22.8579 13.195 22.7417 13.0788Z" fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_1001_9319">
                        <rect width="32" height="32" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        `;

        // Добавляем кнопку "ALL FAQ" с прямым SVG
        const allFaqButton = document.createElement('div');
        allFaqButton.classList.add('tab-trigger');
        allFaqButton.dataset.tabIndex = 'all';
        allFaqButton.innerHTML = `${svgMarkup} ALL FAQ`;
        buttonsElement.appendChild(allFaqButton);

        // Генерация кнопок для остальных вкладок
        faqTabs.forEach((tab, index) => {
            const triggerElement = tab.querySelector('.tab-trigger');
            const contentWrapper = tab.querySelector('.tab-trigger__wrapper');
            const buttonText = triggerElement.getAttribute('data');
            const buttonIcon = triggerElement.getAttribute('data-icon');

            triggerElement.dataset.tabIndex = `${index}`;
            contentWrapper.dataset.tabIndex = `${index}`;

            // Добавляем кнопку и контент
            buttonsElement.appendChild(createButton(buttonText, buttonIcon, index));
            contentElement.appendChild(contentWrapper);
        });

        // Перемещаем содержимое секции подписки
        const newsletterSection = document.querySelector('.section.faq-newsletter');
        if (newsletterSection) {
            newsletterElement.innerHTML = newsletterSection.innerHTML;
            newsletterSection.innerHTML = '';
            newsletterSection.style.display = 'none';
        }
    };

    const handleTabToggle = () => {
        const buttons = document.querySelectorAll('.free-faq-tabs__buttons .tab-trigger');
        const contentItems = document.querySelectorAll('.free-faq-tabs__content .tab-trigger__wrapper');

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const tabIndex = btn.dataset.tabIndex;

                if (tabIndex === 'all') {
                    contentItems.forEach(content => content.classList.remove('hidden'));
                } else {
                    contentItems.forEach(content => {
                        content.classList.toggle('hidden', content.dataset.tabIndex !== tabIndex);
                    });
                }

                buttons.forEach(button => button.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    };

    const initializeTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-trigger');
        const contentItems = document.querySelectorAll('.free-faq-tabs__content .tab-trigger__wrapper');

        contentItems.forEach(content => content.classList.remove('hidden'));

        tabButtons.forEach((btn) => {
            if (btn.dataset.tabIndex === 'all') {
                btn.classList.add('active');
            }
        });

        handleTabToggle();
    };

    setupLayout();
    initializeTabs();
}

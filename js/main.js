const products = document.querySelectorAll('.product');

function updateProductsOnLoad() {
    let favoriteList = new ProductList('favorite').productList;
    let hiddenList = new ProductList('hidden').productList;
    let compareList = new ProductList('compare').productList;
    products.forEach((product) => {
        if (favoriteList.includes(product.id)) {
            product.querySelector('.icon_favorite').classList.add('product_icon_active');
        }
        if (compareList.includes(product.id)) {
            product.querySelector('.icon_compare').classList.add('product_icon_active');
        }
        if (hiddenList.includes(product.id)) {
            product.querySelector('.icon_hidden').classList.add('product_icon_active');
            product.classList.add('product_transparent');
            product.classList.add('product_hidden_by_checkbox');
        }
    });
}

window.addEventListener('load', updateProductsOnLoad);

function checkForIllegalVisibility(product, listName) {
    const clickedButton = document.querySelector('.product_filters__content-button_clicked');
    if (clickedButton != null && clickedButton.dataset.type === listName) {
        product.classList.add('product_hidden');
    }
}

function clickProductIcon(e, product, listName) {
    const productList = new ProductList(listName);
    const icon = e.target.closest('.product__content-product_icon');
    if (icon.classList.contains('product_icon_active')) {
        icon.classList.remove('product_icon_active');
        productList.remove(product.getAttribute('id'));
        checkForIllegalVisibility(product, listName);
    } else {
        icon.classList.add('product_icon_active');
        productList.add(product.getAttribute('id'));
    }
    productList.saveProductList(listName);
}

function addListenerForProductVisibilityByHiddenIcon(icon, product) {
    icon.addEventListener('click', () => {
        if (product.classList.contains('product_transparent')) {
            product.classList.remove('product_transparent');
            product.classList.remove('product_hidden_by_checkbox');
        } else {
            product.classList.add('product_transparent');
            const checkBox = document.querySelector('.show_hidden_checkbox__input');
            if (checkBox.checked === false) {
                product.classList.add('product_hidden_by_checkbox');
            }
        }
    });
}

products.forEach((product) => {
    const favoriteIcon = product.querySelector('.icon_favorite');
    favoriteIcon.addEventListener('click', (e) => {
        clickProductIcon(e, product, 'favorite');
    });
    const compareIcon = product.querySelector('.icon_compare');
    compareIcon.addEventListener('click', (e) => {
        clickProductIcon(e, product, 'compare');
    });
    const hiddenIcon = product.querySelector('.icon_hidden');
    hiddenIcon.addEventListener('click', (e) => {
        clickProductIcon(e, product, 'hidden');
    });
    addListenerForProductVisibilityByHiddenIcon(hiddenIcon, product);
});

function disableInactiveButtons(filteringButton) {
    if (filteringButton.classList.contains('product_filters__content-button') &&
        !filteringButton.classList.contains('product_filters__content-button_clicked')) {
        document.querySelectorAll('.product_filters__content-button').forEach((button) => {
            button.dataset.type === filteringButton.dataset.type ?
                button.classList.add('product_filters__content-button_clicked') :
                button.classList.remove('product_filters__content-button_clicked');
        })
    }
}

function checkForIconType(product, selector) {
    product.querySelector(selector).classList.contains('product_icon_active') ?
        product.classList.remove('product_hidden') : product.classList.add('product_hidden');
}

document.querySelector('.product_filters__content').addEventListener('click', (e) => {
    const filteringButton = e.target;
    disableInactiveButtons(filteringButton);
    products.forEach((product) => {
        switch (filteringButton.dataset.type) {
            case 'favorite':
                checkForIconType(product, '.icon_favorite');
                break;
            case 'compare':
                checkForIconType(product, '.icon_compare');
                break;
            case 'all':
                product.classList.remove('product_hidden');
                break;
        }
    });
});

function editProductVisibilityByCheckBox(product, e) {
    const checkBox = e.target;
    checkBox.checked ? product.classList.remove('product_hidden_by_checkbox') :
        product.classList.add('product_hidden_by_checkbox');
}

document.querySelector('.show_hidden_checkbox__input').addEventListener('change', (e) => {
    products.forEach((product) => {
        const isHidden = product.querySelector('.icon_hidden').classList.contains('product_icon_active');
        if (isHidden) {
            editProductVisibilityByCheckBox(product, e);
        }
    });
});

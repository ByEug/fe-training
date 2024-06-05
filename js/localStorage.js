class ProductList {
    #productList;

    constructor(listName) {
        this.#productList = localStorage.getItem(listName) ? localStorage.getItem(listName).split(',') : [];
    }

    get productList() {
        return this.#productList;
    }

    saveProductList(listName) {
        localStorage.setItem(listName, this.#productList);
    }

    remove(id) {
        const index = this.#productList.indexOf(id);
        this.#productList.splice(index, 1);
    }

    add(id) {
        if (!this.#productList.includes(id)) {
            this.#productList.push(id);
        }
    }
}

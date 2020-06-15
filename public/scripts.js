//activeMenu

const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

//pagination

function paginate ( selectedPage, totalPages ) {
    
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2

        if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            
            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            
            oldPage = currentPage

            pages.push(currentPage)

        }
    }

    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)
const filter = pagination.dataset.filter

let elements = ""

for ( let page of pages) {

    if (String(page).includes("...")) {

        elements += `<span>${ page }</span>`
    } else {
        if (filter) {
            
            elements += `<a href="?page=${ page }&filter=${ filter }">${ page }</a>`
        } else {
            
            elements += `<a href="?page=${ page }">${ page }</a>`
        }
    }
}

pagination.innerHTML = elements
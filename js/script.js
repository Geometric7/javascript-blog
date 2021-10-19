const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
};
'use strict';

const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    console.log('Link was clicked!');
    console.log('event');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    /*const hrefValue = clickedElement.getAttribute('href').replace('#', '');
    const articleToActivate = document.getElementById(hrefValue);
    articleToActivate.classList.add('active');*/

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);


    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log(targetArticle);
};

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list',
    optAuthorClassCount = 5,
    optAuthorClassPrefix = 'author-size-';

function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE]  for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {
        /* [DONE] get the article id */
        const articleId = article.getAttribute('id');
        /* [DONE] find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* [DONE] get the title from the title element */

        /* [DONE] create HTML of the link */
        /*const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';*/
        const linkHTMLData = {
            id: articleId,
            title: articleTitle
        };
        const linkHTML = templates.articleLink(linkHTMLData);

        html = html + linkHTML;
    }

    /* [DONE] insert link into titleList */
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}


generateTitleLinks();

/* calcTagsParams */
function calculateTagsParams(tags) {
    const params = {
        min: 1,
        max: 5,
    };
    console.log(params);

    for (let tag in tags) {
        console.log(tag + ' is used ' + tags[tag] + 'times');

        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);

        if (tags[tag] > params.max) {
            params.max = tags[tag];
        }
        if (tags[tag] < params.min) {
            params.min = tags[tag];
        }
    }
    return params;
}
/*calculateTagClass*/
function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
}

function generateTags() {

    /* [new] create a new variable allTags with empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll('.post');

    /* START LOOP: for every article: */
    for (let article of articles) {
        console.log(article);


        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        console.log(articleTags);

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');

        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
            console.log(tag);

            /* generate HTML of the link */
            const linkHTML = '<li><a href="#tag-' + '">' + tag + '</a></li>';


            html += linkHTML + ' ';

            if (!allTags[tag]) {
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }

            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
        console.log(html);
        /* END LOOP: for every article: */

    }
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';

    for (let tag in allTags) {
        const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + ' " href="#tag-' + tag + '">' + tag + '</a></li>';
        allTagsHTML += tagLinkHTML;
    }

    tagList.innerHTML = allTagsHTML;
    console.log(allTags);
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    let html = '';
    for (let activeTag of activeTags) {

        /* remove class active */
        activeTag.classList.remove('active');
        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
        /* add class active */
        tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    console.log(addClickListenersToTags);
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
        /* add tagClickHandler as event listener for that link */
        tagLink.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

function calculateAuthorsParams(authors) {
    const params = {
        min: 1,
        max: 5,
    };
    console.log(params);

    for (let author in authors) {
        params.max = Math.max(authors[author], params.max);
        params.min = Math.min(authors[author], params.min);
    }
    return params;
}

/* class */

function calculateAuthorClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optAuthorClassCount - 1) + 1);
    return optAuthorClassPrefix + classNumber;
}

function generateAuthors() {
    let allAuthors = {};

    /*find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* loop */
    for (let article of articles) {
        console.log(article);
        /*f tags wrapper*/
        const authorsWrapper = article.querySelector(optArticleAuthorSelector);
        /*html-empty-string*/
        let html = '';

        const articleAuthors = article.getAttribute('data-author');

        /*insert html of all the links into tags wrapper*/
        const linkHTML = '<a href ="#author-' + articleAuthors + '">' + articleAuthors + '</a>';
        authorsWrapper.insertAdjacentHTML('afterbegin', linkHTML);

        html = html + linkHTML;

        /* check if this is link NOT already in all Tags */
        if (!allAuthors[articleAuthors]) {
            allAuthors[articleAuthors] = 1;
        } else {
            allAuthors[articleAuthors]++;
        }


        /* push generated to html var */
        authorsWrapper.innerHTML = html;
        console.log(html);
    }

    const authorList = document.querySelector(optAuthorsListSelector);
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);

    let allAuthorsHTML = '';

    for (let articleAuthor in allAuthors) {
        const authorLinkHTML = calculateAuthorClass(allAuthors[articleAuthor], authorsParams);
        allAuthorsHTML += '<li><a href="#author-' + articleAuthor + '" class ="' + authorLinkHTML + '">' + articleAuthor + '</a> ' + allAuthors[articleAuthor] + '</li>';
    }
    authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

const authorClickHandler = function(event) {

    event.preventDefault();
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    const author = href.replace('#author-', '');
    console.log('author:', author);

    const activeAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

    for (let activeAuthorLink of activeAuthorLinks) {
        activeAuthorLink.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let tag of tagLinks) {
        tag.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
};

const addClickListenersToAuthors = function() {
    console.log(addClickListenersToAuthors);

    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for (let authorLink of authorLinks) {
        authorLink.addEventListener('click', authorClickHandler);
    }


    addClickListenersToAuthors();

};

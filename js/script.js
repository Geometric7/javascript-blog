'use strict';

const titleClickHandler = function(event) {
    const clickedElement = this;
    event.preventDefault();
    console.log('Link was clicked!');
    console.log('event');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    /*const hrefValue = clickedElement.getAttribute('href').replace('#', '');
    const articleToActivate = document.getElementById(hrefValue);
    articleToActivate.classList.add('active');*/

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);


    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log(targetArticle);
};

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list';

function generateTitleLinks() {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE]  for each article */
    let html = '';

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        console.log(article);

        /* [DONE] get the article id */
        const articleId = article.getAttribute('id');
        /* [DONE] find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* [DONE] get the title from the title element */

        /* [DONE] create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        console.log(linkHTML);
        /* [DONE] insert link into titleList */
        titleList.insertAdjacentHTML('afterbegin', linkHTML);

        html = html + linkHTML;
        console.log(html);
    }
    titleList.innerHTML = html;

    /*[DONE] Debbuging active and clicked article links */
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();

function generateTags() {

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
        console.log(article);


        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleSelector);

        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        const articleTags = clickedElement.getAttribute('data-tags');
        console.log(articleTags);

        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');

        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
            console.log(articleTagsArray);

            /* generate HTML of the link */
            const linkHTML = '"<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>"';
            console.log(linkHTML);
            articleTags.insertAdjacentHTML('afterbegin', linkHTML);

            html = html + linkHTML;
            console.log(html);

            articleTags.innerHTML = html;

            /* add generated code to html variable */
            tagsWrapper.innerHTML = html;
            console.log(html);
            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */

        /* END LOOP: for every article: */
    }
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(tag);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags() {
    /* find all links to tags */

    /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
}

addClickListenersToTags();

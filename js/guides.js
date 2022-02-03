window.addEventListener('hashchange', anchorClicked);

function anchorClicked() {
    showPage(window.location.hash);
}

function showPage(hash) {
    if (hash) {
        const page = document.getElementById(hash.slice(1).split('_')[0]);
        const slide = Number(hash.split('_')[1]);
        const openPage = document.getElementById('active-page');
        if (page) {
            const clone = document.createElement('section');
            clone.appendChild(document.importNode(page.content, true));
            clone.id = 'active-page';

            document.body.appendChild(clone);

            const elems = Array.from(clone.querySelectorAll('[data-src]'));
            hideMainArea();
        } else {
            showMainArea();
        }
        if (openPage) {
            openPage.remove();
        }
        window.scrollTo(0, 0);
    } else {
        try {
            const closingPage = document.getElementById('active-page');
            closingPage.parentNode.removeChild(closingPage);
            showMainArea();
        } catch(err) {
            
        }
    }
}

showPage(window.location.hash);

const loadedSrces = [];

function loadSrces(elems, cb) {
    if (!elems.length) return cb();
    const elem = elems.shift();
    const src = elem.getAttribute('data-src');
    if (elem.tagName === 'img' && !loadedSrces.includes(src)) {
        const dl = new Image();
        dl.onload = dl.onerror = _ => {
            elem.src = src;
            elem.removeAttribute('data-src');
            loadedSrces.push(src);
            loadSrces(elems, cb);
        }
        dl.src = src;
    } else {
        elem.src = src;
        elem.removeAttribute('data-src');
        elem.onload = elem.onerror = _ => {
            loadSrces(elems, cb);
        }
    }
}


function init() {
    document.body.classList.remove('init');
}


function waitForDocumentComplete () {
    document.readyState === 'complete' ? init() : setTimeout(waitForDocumentComplete, 50);
}

function hideMainArea () {
    const mainarea = document.getElementsByTagName("main")[0];
    mainarea.style.display = "none";
}

function showMainArea () {
    const mainarea = document.getElementsByTagName("main")[0];
    mainarea.style.display = "block";
}

waitForDocumentComplete();
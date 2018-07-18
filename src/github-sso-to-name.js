function ssoToName() {
    browser.storage.sync.get([
        'gheidname_apiUrl',
        'gheidname_idPattern'
    ]).then( (items) => {
    
        const apiUrl = items.gheidname_apiUrl;
        const textIDs = [ ... new Set(document.body.innerText.match(new RegExp(items.gheidname_idPattern, 'g')))];
    
        textIDs.forEach( (id) => {
    
            fetch(`${apiUrl}/users/${id}`).then( (response) => {
                return response.json();
            }).then( (json) => {
    
                const name = json.name;
                const elements = document.getElementsByClassName('user-mention');
    
                for (let i = 0; i < elements.length; ++i) {
                    if (elements[i].textContent.indexOf(`${id}`) >= 0) {
                        elements[i].textContent = elements[i].textContent.replace(new RegExp(`${id}`, 'g'), name);
                    }
                }
            });
        });
    });
}

browser.storage.sync.get('gheidname_urlMatch').then( (items) => {
    if(items.gheidname_urlMatch && window.location.href.indexOf(items.gheidname_urlMatch) >= 0) {
        
        window.addEventListener('pageLoadTransition', ssoToName);
        
        let injectedScript = document.createElement('script');
        injectedScript.src = browser.extension.getURL('pjax-handler.js');
        document.head.appendChild(injectedScript);

        ssoToName();
    }
});
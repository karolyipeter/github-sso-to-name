function saveOptions(e) {
    browser.storage.sync.set({
        'gheidname_urlMatch': document.getElementById('urlMatch').value,
        'gheidname_apiUrl': document.getElementById('apiUrl').value,
        'gheidname_idPattern': document.getElementById('idPattern').value,
    }).then( () => {
        document.querySelector('#status').textContent = 'Options saved.';
    });
    e.preventDefault();
}

function restoreOptions() {
    browser.storage.sync.get().then((items) => {
        document.getElementById('urlMatch').value = items.gheidname_urlMatch || '';
        document.getElementById('apiUrl').value = items.gheidname_apiUrl || '';
        document.getElementById('idPattern').value = items.gheidname_idPattern || '';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);
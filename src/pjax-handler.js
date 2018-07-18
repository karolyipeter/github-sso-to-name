document.addEventListener('pjax:success', function() {
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('pageLoadTransition', true, true, null);
    document.dispatchEvent(evt);
});

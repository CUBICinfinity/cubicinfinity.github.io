const tabs = document.querySelector('.tabs');

if (tabs) {
    // Center the active tab in the scrollable strip.
    tabs.querySelector('[aria-current="page"]')
        ?.scrollIntoView({ inline: 'center', block: 'nearest' });

    // Dropdown panel, built from the tab links.
    const panel = document.createElement('nav');
    panel.className = 'menu-panel';
    panel.popover = 'auto';
    panel.setAttribute('aria-label', 'Pages (menu)');
    tabs.querySelectorAll('a').forEach((a) => panel.append(a.cloneNode(true)));

    // Hamburger button; the popover attribute wires up open/close.
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-button';
    button.setAttribute('aria-label', 'Menu');
    button.popoverTargetElement = panel;
    button.innerHTML =
        '<svg viewBox="0 0 31 17" width="31" height="17" aria-hidden="true" focusable="false" fill="currentColor" shape-rendering="crispEdges">' +
        '<rect x="2" y="0" width="27" height="3"/>' +
        '<rect x="2" y="7" width="27" height="3"/>' +
        '<rect x="2" y="14" width="27" height="3"/>' +
        '</svg>';

    // Darken screen with additional layer
    const darkener = document.createElement('div');
    darkener.className = 'darkener';
    darkener.hidden = true;

    panel.addEventListener('toggle', (e) => {
        darkener.hidden = e.newState !== 'open';
    });

    document.body.append(darkener, button, panel);

    // Flag when the tab strip is out of view; CSS does the rest.
    new IntersectionObserver(([entry]) => {
        document.body.classList.toggle('tabs-hidden', !entry.isIntersecting);
        if (entry.isIntersecting && panel.matches(':popover-open')) panel.hidePopover();
    }).observe(tabs);
}
const isNum = function (val) {
    return typeof val === 'number' && !isNaN(val);
};

export default (ev, toElement) => {
    toElement = toElement || ev.currentTarget;

    const toElementBoundingRect = toElement.getBoundingClientRect();
        const orgEv = ev.originalEvent || ev;
        const hasTouches = ev.touches && ev.touches.length;
        let pageX = 0;
        let pageY = 0;

    if (hasTouches) {
        if (isNum(ev.touches[0].pageX) && isNum(ev.touches[0].pageY)) {
            pageX = ev.touches[0].pageX;
            pageY = ev.touches[0].pageY;
        } else if (isNum(ev.touches[0].clientX) && isNum(ev.touches[0].clientY)) {
            pageX = orgEv.touches[0].clientX;
            pageY = orgEv.touches[0].clientY;
        }
    } else if (isNum(ev.pageX) && isNum(ev.pageY)) {
            pageX = ev.pageX;
            pageY = ev.pageY;
        } else if (ev.currentPoint && isNum(ev.currentPoint.x) && isNum(ev.currentPoint.y)) {
            pageX = ev.currentPoint.x;
            pageY = ev.currentPoint.y;
        }

    return {
        x: pageX - toElementBoundingRect.left,
        y: pageY - toElementBoundingRect.top
    };
};
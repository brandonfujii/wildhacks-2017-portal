import _throttle from 'lodash/throttle';

export default function hideHeaderOnCollision(headerElement) {
    document.addEventListener('scroll', _throttle(function() {
        if (window.pageYOffset <= 0) {
            return;
        }

        let collided = false;
        let colliders = document.querySelectorAll('.hide-header');
        
        for (let i = 0; i < colliders.length; i++) {
            let colliderBox = colliders[i].getBoundingClientRect();

            if (window.pageYOffset > colliderBox.top && window.pageYOffset < colliderBox.bottom + colliderBox.height) {
                collided = true;
                headerElement.className = headerElement.className.replace('slide-down', 'slide-up');
                break;
            }
        }

        if (!collided) {
            if (headerElement.className.includes('slide-up')) {
                headerElement.className = headerElement.className.replace('slide-up', 'slide-down');
            } else {
                headerElement.className = headerElement.className.replace('o-0', 'slide-down');
            }
        }
    }, 200, { leading: true }));
}
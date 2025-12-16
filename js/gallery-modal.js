/* ============================================
   GALLERY MODAL JAVASCRIPT - Motions and Emotions
   ============================================

   NEW FILE - Does not affect existing scripts

   This file handles:
   - Opening modal when album card is clicked
   - Masonry grid display of all images
   - Lightbox for full-size image viewing
   - Closing modal (X button, back button, ESC key)
   - Keyboard navigation in lightbox

   SAFE: All selectors use 'pc-' prefix to avoid conflicts

============================================ */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION - Album Images
    // ============================================

    const albumImages = {
        // ==========================================
        // PORTFOLIO ALBUMS (3 cards on portfolio.html)
        // ==========================================

        'chicago-events': [
            // Air Show 2024 - Day 1 (Aug 10) - Non-portrait
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc03950.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc03961.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc03986.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04061.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04113.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04185.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04192.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04233.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04233-2.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04241.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04272.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04293.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04302.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04384.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04412.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04787.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04839.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc04925.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc05013.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-dsc05067.webp', alt: 'Chicago Air Show 2024' },
            // Air Show 2024 - Day 2 (Aug 11) - Non-portrait
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05117.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05129.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05159.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05165.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05168.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05320.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05472.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05525.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05582.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05668.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05671.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05772.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05773.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-dsc05774.webp', alt: 'Chicago Air Show 2024' },
            // Air Show - Portrait/People shots (with -p-)
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-p-dsc03990.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-p-dsc04092.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-p-dsc04097.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-p-dsc05031.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-p-dsc05034.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-p-dsc05097.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240810-p-dsc05098.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-p-dsc05155.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-p-dsc05183.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-p-dsc05341.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-p-dsc05350.webp', alt: 'Chicago Air Show 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240811-p-dsc05351.webp', alt: 'Chicago Air Show 2024' },
            // Other Chicago Events
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240818-dsc06184.webp', alt: 'Chicago Event' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240818-dsc06184-2.webp', alt: 'Chicago Event' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20241115-dsc08537.webp', alt: 'Chicago Event' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/1000024975.webp', alt: 'Chicago Event' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/1000024976.webp', alt: 'Chicago Event' },
            // Skyscrapers & Architecture (March 19-22, 2025)
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240319-dsc00537.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240319-dsc00545.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240319-dsc00546.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240319-dsc00611.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20240319-dsc00678.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250320-dsc08991.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250320-dsc09004.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250321-dsc09188.webp', alt: 'Chicago Architecture' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250321-dsc09203.webp', alt: 'Chicago Architecture' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250321-dsc09206.webp', alt: 'Chicago Architecture' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250322-dsc09345.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250322-dsc09371.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250322-dsc09374.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250322-dsc09446.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20250322-dsc09458.webp', alt: 'Chicago Skyline' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20221015-pxl_211305263.webp', alt: 'Chicago Architecture' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20221015-pxl_211319151.webp', alt: 'Chicago Architecture' },
            { src: 'assets/images/portfolio_use/Portfolio_Chicago_Events_webp/20221015-pxl_211327799.webp', alt: 'Chicago Architecture' }
        ],

        'nature-landscape': [
            // Fall Colors - Featured at top
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/fall_color.webp', alt: 'Fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/fall_color_2.webp', alt: 'Fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241017-dsc08450.webp', alt: 'Fall colors 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241017-dsc08470.webp', alt: 'Fall colors 2024' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241017-dsc08475.webp', alt: 'Fall colors 2024' },
            // Door County Fall Colors
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08198.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08199.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08204.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08204-2.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08207.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08207-2.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08263.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08291.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241014-dsc08324.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08375.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08378.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08383.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08400.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08421.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08430.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08438.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08438-2.webp', alt: 'Door County fall colors' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20241015-dsc08439-2.webp', alt: 'Door County fall colors' },
            // Other Nature & Landscape
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20210904-pxl_210052822.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20210904-pxl_212916422.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20210904-pxl_212920244.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20211008-img_202137.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/20240818-dsc06184-2.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/dsc00537.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/dsc00545.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/dsc00546.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/dsc00932.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/dsc00938.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/dsc00947_1.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/dsc02424.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio_use/Portfolio_Nature_Landscape_webp/1000019342.webp', alt: 'Nature landscape' }
        ],

        'abstract': [
            { src: 'assets/images/portfolio_use/Portfolio_Abstract_webp/20241014-dsc08204.webp', alt: 'Abstract photography' },
            { src: 'assets/images/portfolio_use/Portfolio_Abstract_webp/20241014-dsc08204-2.webp', alt: 'Abstract photography' },
            { src: 'assets/images/portfolio_use/Portfolio_Abstract_webp/20241014-dsc08207.webp', alt: 'Abstract photography' },
            { src: 'assets/images/portfolio_use/Portfolio_Abstract_webp/20241014-dsc08207-2.webp', alt: 'Abstract photography' },
            { src: 'assets/images/portfolio_use/Portfolio_Abstract_webp/20241015-dsc08438.webp', alt: 'Abstract photography' },
            { src: 'assets/images/portfolio_use/Portfolio_Abstract_webp/20241015-dsc08438-2.webp', alt: 'Abstract photography' },
            { src: 'assets/images/portfolio_use/Portfolio_Abstract_webp/20241015-dsc08439.webp', alt: 'Abstract photography' }
        ],

        // ==========================================
        // EVENTS ALBUMS (4 cards on events.html)
        // ==========================================

        'portrait-sessions': [
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-02.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-03.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-04.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-05.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-07.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-08.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-10.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-11.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/baby%201%20-12.webp', alt: 'Portrait session' },
            { src: 'assets/images/portfolio_use/Events_Portrait_Sessions_webp/dsc01840.webp', alt: 'Portrait session' }
        ],

        'private-events': [
            // Landscape images
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/landscape-dsc04855.webp', alt: 'Private event', orientation: 'landscape' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/landscape-ilce-7rm4a-(770).webp', alt: 'Private event', orientation: 'landscape' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/landscape-ilce-7rm4a-(778).webp', alt: 'Private event', orientation: 'landscape' },
            // Portrait images
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -20250322-dsc09463.webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -20250322-dsc09467.webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -dsc02424 copy.webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -dsc04810.webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -dsc04850.webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(422).webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(590).webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(642).webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(662).webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(666).webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(814).webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(822).webp', alt: 'Private event', orientation: 'portrait' },
            { src: 'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(854).webp', alt: 'Private event', orientation: 'portrait' }
        ],

        'grand-gatherings': [
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00697.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00702.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00708.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00714.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00719.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00722.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00726.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00738.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00785.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00789.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00794.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00796.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00956.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00965.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc00970.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01013.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01033.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01042.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01044.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01047.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01069.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01105.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01110.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01119.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01152.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01154.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01175.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01218.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01220.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01224.webp', alt: 'Garba celebration' },
            { src: 'assets/images/portfolio_use/Events_Grand_Gatherings_webp/dsc01271.webp', alt: 'Garba celebration' }
        ],

        'destination-shoots': [
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241014-dsc08308.webp', alt: 'Destination shoot' },
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241014-dsc08330.webp', alt: 'Destination shoot' },
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241014-dsc08332.webp', alt: 'Destination shoot' },
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08376.webp', alt: 'Destination shoot' },
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08377.webp', alt: 'Destination shoot' },
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08405.webp', alt: 'Destination shoot' },
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08426.webp', alt: 'Destination shoot' },
            { src: 'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08445.webp', alt: 'Destination shoot' }
        ]
    };

    const defaultDescriptions = {
        'portfolio': 'Explore this collection of fine art photography.',
        'events': 'Let me capture your special moments.'
    };

    // ============================================
    // DOM ELEMENTS
    // ============================================

    let modal, modalTitle, modalDescription, modalClose, modalBack;
    let galleryContainer;
    let lightbox, lightboxImage, lightboxClose, lightboxPrev, lightboxNext;
    let albumCards;

    // State
    let currentImages = [];
    let currentLightboxIndex = 0;
    let currentAlbum = null;

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Get DOM elements
        modal = document.getElementById('pc-gallery-modal');
        modalTitle = document.getElementById('pc-modal-title');
        modalDescription = document.getElementById('pc-modal-description');
        modalClose = document.getElementById('pc-modal-close');
        modalBack = document.getElementById('pc-modal-back');
        albumCards = document.querySelectorAll('.pc-album-card');

        // Exit if no modal found
        if (!modal) return;

        // Create gallery grid container (replace carousel)
        createGalleryContainer();

        // Create lightbox
        createLightbox();

        // Bind events
        bindEvents();
    }

    // ============================================
    // CREATE GALLERY CONTAINER
    // ============================================

    function createGalleryContainer() {
        // Find and hide old carousel elements
        const oldCarousel = modal.querySelector('.pc-carousel');
        const oldDots = modal.querySelector('.pc-carousel-dots');

        if (oldCarousel) oldCarousel.style.display = 'none';
        if (oldDots) oldDots.style.display = 'none';

        // Create new gallery grid container
        galleryContainer = document.createElement('div');
        galleryContainer.className = 'pc-gallery-grid';
        galleryContainer.innerHTML = '<div class="pc-gallery-masonry" id="pc-gallery-masonry"></div>';

        // Insert after header
        const header = modal.querySelector('.pc-modal-header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(galleryContainer, header.nextSibling);
        }
    }

    // ============================================
    // CREATE LIGHTBOX
    // ============================================

    function createLightbox() {
        lightbox = document.createElement('div');
        lightbox.className = 'pc-lightbox';
        lightbox.id = 'pc-lightbox';
        lightbox.innerHTML = `
            <button class="pc-lightbox-close" id="pc-lightbox-close" aria-label="Close">×</button>
            <button class="pc-lightbox-nav pc-lightbox-prev" id="pc-lightbox-prev" aria-label="Previous">‹</button>
            <img src="" alt="" class="pc-lightbox-image" id="pc-lightbox-image">
            <button class="pc-lightbox-nav pc-lightbox-next" id="pc-lightbox-next" aria-label="Next">›</button>
        `;
        document.body.appendChild(lightbox);

        // Get lightbox elements
        lightboxImage = document.getElementById('pc-lightbox-image');
        lightboxClose = document.getElementById('pc-lightbox-close');
        lightboxPrev = document.getElementById('pc-lightbox-prev');
        lightboxNext = document.getElementById('pc-lightbox-next');
    }

    // ============================================
    // EVENT BINDING
    // ============================================

    function bindEvents() {
        // Album card clicks
        albumCards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });

        // Modal close buttons
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalBack) modalBack.addEventListener('click', closeModal);

        // Lightbox controls
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);
        if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);

        // Lightbox click outside image to close
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);

        // Modal overlay click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    }

    // ============================================
    // MODAL FUNCTIONS
    // ============================================

    function handleCardClick(e) {
        const card = e.currentTarget;
        const albumId = card.dataset.album;
        const albumTitle = card.dataset.title;
        const albumType = card.dataset.type || 'portfolio';
        const albumDescription = card.dataset.description || defaultDescriptions[albumType];

        currentAlbum = albumId;

        // Update modal content
        if (modalTitle) modalTitle.textContent = albumTitle;
        if (modalDescription) modalDescription.textContent = albumDescription;

        // Load images into masonry grid
        loadMasonryGallery(albumId);

        // Open modal
        openModal();
    }

    function openModal() {
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('pc-modal-open');
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('pc-modal-open');
        currentAlbum = null;
        currentImages = [];
    }

    // ============================================
    // MASONRY GALLERY FUNCTIONS
    // ============================================

    // Size patterns for different orientations
    const sizePatterns = {
        // For landscape images - wider, shorter
        landscape: ['wide', 'wide-tall', 'wide', 'lg', 'wide', 'md'],
        // For portrait images - taller, narrower
        portrait: ['xl', 'lg', 'xl', 'md', 'lg', 'xl', 'md', 'lg'],
        // For unknown orientation - mixed
        mixed: [
            'md', 'lg', 'sm', 'xl', 'xs', 'wide', 'md', 'sm',
            'lg', 'xs', 'md', 'wide-tall', 'sm', 'lg', 'md', 'xs',
            'xl', 'sm', 'md', 'lg', 'xs', 'md', 'sm', 'wide',
            'md', 'lg', 'sm', 'xs', 'md', 'lg', 'xl', 'sm'
        ]
    };

    // Get size class based on orientation and index
    function getSizeClass(index, totalImages, orientation) {
        let pattern;

        // Use orientation-specific pattern if provided
        if (orientation === 'landscape') {
            pattern = sizePatterns.landscape;
        } else if (orientation === 'portrait') {
            pattern = sizePatterns.portrait;
        } else {
            pattern = sizePatterns.mixed;
        }

        // Use modulo to cycle through pattern
        const patternIndex = index % pattern.length;
        let size = pattern[patternIndex];

        // Add variation for larger albums
        const positionFactor = Math.floor(index / pattern.length);
        if (positionFactor > 0 && !orientation) {
            const shiftedIndex = (patternIndex + positionFactor * 3) % pattern.length;
            size = pattern[shiftedIndex];
        }

        // Prevent wide items near the end if they won't fit well
        if ((size === 'wide' || size === 'wide-tall') && index >= totalImages - 2) {
            size = orientation === 'landscape' ? 'lg' : 'md';
        }

        return `pc-gallery-item--${size}`;
    }

    // Albums that use simple 4-column CSS columns layout (no cropping)
    const columnsLayoutAlbums = ['grand-gatherings'];

    function loadMasonryGallery(albumId) {
        const masonry = document.getElementById('pc-gallery-masonry');
        if (!masonry) return;

        // Get images for this album
        const images = albumImages[albumId] || [];
        currentImages = images;

        // Clear existing content and classes
        masonry.innerHTML = '';
        masonry.classList.remove('pc-gallery-masonry--columns');

        if (images.length === 0) {
            masonry.innerHTML = '<div class="pc-gallery-placeholder">Images coming soon</div>';
            return;
        }

        // Check if this album uses simple columns layout
        const useColumnsLayout = columnsLayoutAlbums.includes(albumId);

        if (useColumnsLayout) {
            // Apply CSS columns class for natural aspect ratio layout
            masonry.classList.add('pc-gallery-masonry--columns');

            // Create simple gallery items without size classes
            images.forEach((image, index) => {
                const item = document.createElement('div');
                item.className = 'pc-gallery-item';
                item.innerHTML = `
                    <img src="${image.src}"
                         alt="${image.alt}"
                         loading="lazy"
                         onerror="this.parentElement.style.display='none'">
                `;
                item.addEventListener('click', () => openLightbox(index));
                masonry.appendChild(item);
            });
        } else {
            // Use grid layout with orientation-based sizes
            let landscapeIndex = 0;
            let portraitIndex = 0;
            let mixedIndex = 0;

            images.forEach((image, index) => {
                const item = document.createElement('div');
                let sizeClass;

                // Use orientation from image data if available
                if (image.orientation === 'landscape') {
                    sizeClass = getSizeClass(landscapeIndex++, images.length, 'landscape');
                } else if (image.orientation === 'portrait') {
                    sizeClass = getSizeClass(portraitIndex++, images.length, 'portrait');
                } else {
                    // Fall back to mixed pattern for images without orientation
                    sizeClass = getSizeClass(mixedIndex++, images.length, null);
                }

                item.className = `pc-gallery-item ${sizeClass}`;
                item.innerHTML = `
                    <img src="${image.src}"
                         alt="${image.alt}"
                         loading="lazy"
                         onerror="this.parentElement.style.display='none'">
                `;
                item.addEventListener('click', () => openLightbox(index));
                masonry.appendChild(item);
            });
        }
    }

    // ============================================
    // LIGHTBOX FUNCTIONS
    // ============================================

    function openLightbox(index) {
        if (!lightbox || currentImages.length === 0) return;

        currentLightboxIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
    }

    function updateLightboxImage() {
        if (!lightboxImage || currentImages.length === 0) return;

        const image = currentImages[currentLightboxIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        // Update nav button states
        if (lightboxPrev) {
            lightboxPrev.style.opacity = currentLightboxIndex === 0 ? '0.3' : '1';
            lightboxPrev.style.pointerEvents = currentLightboxIndex === 0 ? 'none' : 'auto';
        }
        if (lightboxNext) {
            lightboxNext.style.opacity = currentLightboxIndex >= currentImages.length - 1 ? '0.3' : '1';
            lightboxNext.style.pointerEvents = currentLightboxIndex >= currentImages.length - 1 ? 'none' : 'auto';
        }
    }

    function prevLightboxImage() {
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            updateLightboxImage();
        }
    }

    function nextLightboxImage() {
        if (currentLightboxIndex < currentImages.length - 1) {
            currentLightboxIndex++;
            updateLightboxImage();
        }
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    function handleKeydown(e) {
        // Lightbox is open
        if (lightbox && lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevLightboxImage();
                    break;
                case 'ArrowRight':
                    nextLightboxImage();
                    break;
            }
            return;
        }

        // Modal is open (but not lightbox)
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
    }

    // ============================================
    // AUTOMATIC CARD FLIP SEQUENCE
    // ============================================

    const INITIAL_DELAY = 2000;      // 2 seconds after page load
    const FLIP_INTERVAL = 4000;      // 4 seconds between sequences
    const DOMINO_DELAY = 200;        // 200ms between each card starting (domino effect)
    let flipCards = [];

    function initCardFlipSequence() {
        // Get all flip-enabled cards on the page
        flipCards = Array.from(document.querySelectorAll('.pc-album-card--flip'));

        if (flipCards.length === 0) return;

        // Start the sequence after initial delay
        setTimeout(startFlipSequence, INITIAL_DELAY);
    }

    function startFlipSequence() {
        // Domino effect - each card starts flipping shortly after the previous
        flipCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('flipped');
            }, index * DOMINO_DELAY);
        });

        // Calculate when all cards will be flipped, then wait and restart
        const totalDominoTime = flipCards.length * DOMINO_DELAY;

        setTimeout(() => {
            // Unflip all cards with domino effect
            flipCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, index * DOMINO_DELAY);
            });

            // Wait then start again
            setTimeout(startFlipSequence, FLIP_INTERVAL);
        }, totalDominoTime + FLIP_INTERVAL);
    }

    // ============================================
    // RUN ON DOM READY
    // ============================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            initCardFlipSequence();
        });
    } else {
        init();
        initCardFlipSequence();
    }

})();

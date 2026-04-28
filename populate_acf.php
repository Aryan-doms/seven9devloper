<?php
/**
 * One-time script to populate Global Settings ACF fields via WP-CLI
 */

// 1. Get the ID of the Global Settings page
$page = get_page_by_path('global-settings');

if (!$page) {
    echo "ERROR: 'global-settings' page not found. Please create the page with slug 'global-settings' first.\n";
    exit;
}

$post_id = $page->ID;

echo "Populating data for Page ID: $post_id\n";

// 2. Update Basic Fields
update_field('contact_phone', '+91 77790 02147', $post_id);
update_field('contact_email', 'seven9devconllp@gmail.com', $post_id);
update_field('footer_tagline', 'Transforming the Silvassa region through innovative, sustainable, and intentionally slow building practices since our inception.', $post_id);

// 3. Update Social Links Repeater
$socials = [
    [
        'label' => 'Facebook',
        'url'   => 'https://www.facebook.com/share/19bR8TmrtD/'
    ],
    [
        'label' => 'Instagram',
        'url'   => 'https://www.instagram.com/seven9_developers/'
    ],
    [
        'label' => 'YouTube',
        'url'   => 'http://www.youtube.com/@Seven9_Developers'
    ]
];
update_field('social_links', $socials, $post_id);

// 4. Update Metrics Stats Repeater (Sync with By The Numbers)
$metrics = [
    [
        'stat_value'   => '4+',
        'stat_suffix'  => 'Years Young',
        'stat_subtext' => 'Est. 2021'
    ],
    [
        'stat_value'   => '20+',
        'stat_suffix'  => 'Teammates',
        'stat_subtext' => 'And Growing'
    ],
    [
        'stat_value'   => '5+',
        'stat_suffix'  => 'Industry Awards',
        'stat_subtext' => 'Nationally Recognised'
    ],
    [
        'stat_value'   => '400+',
        'stat_suffix'  => 'Happy Customers',
        'stat_subtext' => 'Across Silvassa'
    ],
    [
        'stat_value'   => '3 L+',
        'stat_suffix'  => 'Sq.ft Ongoing',
        'stat_subtext' => 'Under Construction'
    ],
    [
        'stat_value'   => '67k',
        'stat_suffix'  => 'Sq.ft Delivered',
        'stat_subtext' => 'Successfully Completed'
    ]
];
update_field('metrics_stats', $metrics, $post_id);

echo "SUCCESS: Global Settings populated with exact metrics!\n";

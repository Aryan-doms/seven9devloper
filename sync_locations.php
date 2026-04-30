<?php
/**
 * Script to sync project_location from project_address
 * Run via: wp eval-file sync_locations.php
 */

$projects = get_posts([
    'post_type' => 'projects',
    'posts_per_page' => -1,
]);

echo "Found " . count($projects) . " projects.\n";

foreach ($projects as $project) {
    $id = $project->ID;
    $address = get_field('project_address', $id);
    
    if ($address) {
        // Example: "Naroli Road, opp. Bikaner, Naroli, Silvassa" 
        // We want the part before the last "Silvassa" or specific area name.
        // For simplicity, we'll grab the first part or split by comma.
        
        $parts = explode(',', $address);
        // We usually want the "Area" which is often the 2nd to last or specific part.
        // If address is "Specific Point, Area, Silvassa", we want index 1.
        
        $area = trim($parts[0]); // Default to first part if it's short
        if (count($parts) > 1) {
            $area = trim($parts[count($parts) - 2]); // Usually the Area
        }

        $new_location = $area . ", Silvassa";
        
        update_field('project_location', $new_location, $id);
        echo "✅ Updated [{$project->post_title}]: '{$new_location}'\n";
    } else {
        echo "⚠️ Skipped [{$project->post_title}]: No address found.\n";
    }
}

echo "\nDone! All project locations updated.\n";

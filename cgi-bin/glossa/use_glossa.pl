# Load Glossa module out of the project module directory
use File::Basename ();
use lib File::Basename::dirname(__FILE__) . "/../../pm/"; # $paths{"pm_path"};
use Glossa;

1;

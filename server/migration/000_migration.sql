CREATE TABLE IF NOT EXISTS `toa_migration` (
  `version` INT UNSIGNED NOT NULL DEFAULT 0
) ENGINE = InnoDB;
SHOW WARNINGS;

INSERT INTO `toa_migration` (`version`) SELECT * FROM (SELECT 0) AS tmp WHERE (SELECT COUNT(`version`) FROM `toa_migration`) < 1;
SHOW WARNINGS;

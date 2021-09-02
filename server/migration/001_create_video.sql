SET @migrate_version = 1;  /* YOU MUST EDIT THIS */

DROP PROCEDURE IF EXISTS migrate;
delimiter //
CREATE PROCEDURE migrate(IN v INT, IN is_migratable BOOL)
  BEGIN
    IF is_migratable THEN

      /* -------------------------------------------------*/

      CREATE TABLE IF NOT EXISTS `toa_video` (
        `id` BIGINT NOT NULL DEFAULT 1,
        `name` TEXT NOT NULL,
        `description` TEXT NOT NULL,
        `youtube_id` VARCHAR(32) NOT NULL,
        `published_at` TIMESTAMP NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
      ) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;
      SHOW WARNINGS;

      /* -------------------------------------------------*/

      UPDATE `toa_migration` SET version = v;
      SHOW WARNINGS;

    END IF;
  END
//
delimiter ;
CALL migrate(@migrate_version, (SELECT `version` < @migrate_version FROM `toa_migration` LIMIT 1));
DROP PROCEDURE IF EXISTS migrate;

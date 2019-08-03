<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190726083532 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE etken (id INT AUTO_INCREMENT NOT NULL, ilac_id INT NOT NULL, ad VARCHAR(255) NOT NULL, INDEX IDX_85AFCF97E8B5035B (ilac_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ilac (id INT AUTO_INCREMENT NOT NULL, ad VARCHAR(255) NOT NULL, kod VARCHAR(255) NOT NULL, tur VARCHAR(255) NOT NULL, skt DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE etken ADD CONSTRAINT FK_85AFCF97E8B5035B FOREIGN KEY (ilac_id) REFERENCES ilac (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE etken DROP FOREIGN KEY FK_85AFCF97E8B5035B');
        $this->addSql('DROP TABLE etken');
        $this->addSql('DROP TABLE ilac');
    }
}

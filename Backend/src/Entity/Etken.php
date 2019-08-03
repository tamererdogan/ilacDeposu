<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\EtkenRepository")
 */
class Etken
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $ad;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Ilac", inversedBy="etken")
     * @ORM\JoinColumn(nullable=false)
     */
    private $ilac;

    function Etken(String $ad)
    {
        $this->ad = $ad;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAd(): ?string
    {
        return $this->ad;
    }

    public function setAd(string $ad): self
    {
        $this->ad = $ad;

        return $this;
    }

    public function getIlac(): ?Ilac
    {
        return $this->ilac;
    }

    public function setIlac(?Ilac $ilac): self
    {
        $this->ilac = $ilac;

        return $this;
    }

    public function toJson()
    {
        $json = '{"etkenadi": "'.$this->getAd().'"}';

        return $json;
    }
}

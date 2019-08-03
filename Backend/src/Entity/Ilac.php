<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\IlacRepository")
 */
class Ilac
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
     * @ORM\Column(type="string", length=255)
     */
    private $kod;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tur;

    /**
     * @ORM\Column(type="date")
     */
    private $skt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Etken", mappedBy="ilac", orphanRemoval=true)
     */
    private $etken;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $depoKod;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $resimUrl;

    public function __construct()
    {
        $this->etken = new ArrayCollection();
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

    public function getKod(): ?string
    {
        return $this->kod;
    }

    public function setKod(string $kod): self
    {
        $this->kod = $kod;

        return $this;
    }

    public function getTur(): ?string
    {
        return $this->tur;
    }

    public function setTur(string $tur): self
    {
        $this->tur = $tur;

        return $this;
    }

    public function getSkt(): ?\DateTimeInterface
    {
        return $this->skt;
    }

    public function setSkt(\DateTimeInterface $skt): self
    {
        $this->skt = $skt;

        return $this;
    }

    /**
     * @return Collection|Etken[]
     */
    public function getEtken(): Collection
    {
        return $this->etken;
    }

    public function addEtken(Etken $etken): self
    {
        if (!$this->etken->contains($etken)) {
            $this->etken[] = $etken;
            $etken->setIlac($this);
        }

        return $this;
    }

    public function removeEtken(Etken $etken): self
    {
        if ($this->etken->contains($etken)) {
            $this->etken->removeElement($etken);
            // set the owning side to null (unless already changed)
            if ($etken->getIlac() === $this) {
                $etken->setIlac(null);
            }
        }

        return $this;
    }

    public function getDepoKod(): ?string
    {
        return $this->depoKod;
    }

    public function setDepoKod(string $depoKod): self
    {
        $this->depoKod = $depoKod;

        return $this;
    }

    public function getResimUrl(): ?string
    {
        return $this->resimUrl;
    }

    public function setResimUrl(?string $resimUrl): self
    {
        $this->resimUrl = $resimUrl;

        return $this;
    }
    
    public function toJson()
    {
        $etkenler = $this->getEtken();
        $etkenJson = "";

        foreach ($etkenler as $etken) {            
            $etkenJson .= $etken->toJson().",";
        }

        $etkenJson = rtrim($etkenJson, ",");

        return 
        '{"kodu": "'.$this->getKod().'","resim": "'.$this->getResimUrl().'","adi": "'.$this->getAd().'","turu": "'.$this->getTur().'","skt": "'
        .$this->getSkt()->format("d.m.Y").'","etkenler": ['.$etkenJson.']}';
    }        
}
